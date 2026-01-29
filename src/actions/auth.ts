'use server'

import { createSession, deleteSession } from '@/lib/session'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

// Supabase client for server-side usage (bypassing RLS if needed for auth verification)
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Table names from PHP config
const TABLE_ADMIN = 'admin_users'
const TABLE_USERS = 'users'

export async function loginAdmin(prevState: any, formData: FormData) {
    const identity = formData.get('identity') as string
    const password = formData.get('password') as string

    if (!identity || !password) {
        return { error: 'Email/username dan password harus diisi' }
    }

    try {
        // Check by username
        let { data: users, error } = await supabase
            .from(TABLE_ADMIN)
            .select('*')
            .eq('username', identity)
            .limit(1)

        // If not found by username, check by email
        if (!users || users.length === 0) {
            const { data: usersByEmail, error: emailError } = await supabase
                .from(TABLE_ADMIN)
                .select('*')
                .eq('email', identity)
                .limit(1)

            if (usersByEmail && usersByEmail.length > 0) {
                users = usersByEmail
            }
        }

        if (!users || users.length === 0) {
            return { error: 'Akun tidak ditemukan' }
        }

        const user = users[0]

        // Verify password
        // Note: PHP password_hash uses bcrypt by default usually. 
        // We try to verify using bcryptjs.
        const valid = await bcrypt.compare(password, user.password_hash)

        if (!valid) {
            return { error: 'Password salah' }
        }

        // Create session
        await createSession(user.id.toString(), 'admin')
    } catch (error) {
        console.error('Login error:', error)
        return { error: 'Terjadi kesalahan saat login' }
    }

    redirect('/dashboard')
}

export async function loginUser(prevState: any, formData: FormData) {
    const identity = formData.get('identity') as string
    const password = formData.get('password') as string

    if (!identity || !password) {
        return { error: 'Email/username dan password harus diisi' }
    }

    try {
        // Check by username
        let { data: users, error } = await supabase
            .from(TABLE_USERS)
            .select('*')
            .eq('username', identity)
            .limit(1)

        // If not found by username, check by email
        if (!users || users.length === 0) {
            const { data: usersByEmail, error: emailError } = await supabase
                .from(TABLE_USERS)
                .select('*')
                .eq('email', identity)
                .limit(1)

            if (usersByEmail && usersByEmail.length > 0) {
                users = usersByEmail
            }
        }

        if (!users || users.length === 0) {
            return { error: 'Username/email atau password salah' }
        }

        const user = users[0]

        // Verify password
        const valid = await bcrypt.compare(password, user.password_hash)

        if (!valid) {
            return { error: 'Username/email atau password salah' }
        }

        // Create session
        await createSession(user.id.toString(), 'user')
    } catch (error) {
        console.error('Login error:', error)
        return { error: 'Terjadi kesalahan saat login' }
    }

    redirect('/user/dashboard')
}

export async function logout() {
    await deleteSession()
    redirect('/')
}

export async function logoutAdmin() {
    await deleteSession()
    redirect('/admin/login')
}

export async function logoutUser() {
    await deleteSession()
    redirect('/user/login')
}

export async function registerAdmin(prevState: any, formData: FormData) {
    const name = formData.get('name') as string
    const username = formData.get('username') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirm_password') as string

    if (!name || !username || !email || !password) {
        return { error: 'Semua field harus diisi' }
    }

    if (password !== confirmPassword) {
        return { error: 'Password dan konfirmasi password tidak cocok' }
    }

    if (password.length < 6) {
        return { error: 'Password minimal 6 karakter' }
    }

    try {
        // Check if username exists
        const { data: existingUser, error: checkError } = await supabase
            .from(TABLE_ADMIN)
            .select('id')
            .eq('username', username)
            .single()

        if (existingUser) {
            return { error: 'Username sudah digunakan' }
        }

        // Check if email exists
        const { data: existingEmail, error: checkEmailError } = await supabase
            .from(TABLE_ADMIN)
            .select('id')
            .eq('email', email)
            .single()

        if (existingEmail) {
            return { error: 'Email sudah terdaftar' }
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10)

        // Create user
        const { error: insertError } = await supabase
            .from(TABLE_ADMIN)
            .insert({
                name,
                username,
                email,
                password_hash: passwordHash,
            })

        if (insertError) {
            console.error('Registration error:', insertError)
            return { error: 'Gagal membuat akun' }
        }
    } catch (error) {
        console.error('Registration error:', error)
        return { error: 'Terjadi kesalahan saat mendaftar' }
    }

    return { success: 'Akun berhasil dibuat! Silakan login.' }
}

export async function registerUser(prevState: any, formData: FormData) {
    const name = formData.get('name') as string
    const username = formData.get('username') as string
    const email = formData.get('email') as string
    const nim = formData.get('nim') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirm_password') as string

    if (!name || !username || !email || !password) {
        return { error: 'Semua field harus diisi kecuali NIM' }
    }

    if (password !== confirmPassword) {
        return { error: 'Password dan konfirmasi password tidak cocok' }
    }

    if (password.length < 6) {
        return { error: 'Password minimal 6 karakter' }
    }

    try {
        // Check if username exists
        const { data: existingUser, error: checkError } = await supabase
            .from(TABLE_USERS)
            .select('id')
            .eq('username', username)
            .single()

        if (existingUser) {
            return { error: 'Username sudah digunakan' }
        }

        // Check if email exists
        const { data: existingEmail, error: checkEmailError } = await supabase
            .from(TABLE_USERS)
            .select('id')
            .eq('email', email)
            .single()

        if (existingEmail) {
            return { error: 'Email sudah terdaftar' }
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10)

        // Create user
        const { error: insertError } = await supabase
            .from(TABLE_USERS)
            .insert({
                name,
                username,
                email,
                nim: nim || null,
                password_hash: passwordHash,
            })

        if (insertError) {
            console.error('Registration error:', insertError)
            return { error: 'Gagal membuat akun' }
        }
    } catch (error) {
        console.error('Registration error:', error)
        return { error: 'Terjadi kesalahan saat mendaftar' }
    }

    return { success: 'Akun berhasil dibuat! Silakan login.' }
}

export async function registerAdminFromGoogle(prevState: any, formData: FormData) {
    const name = formData.get('name') as string
    const username = formData.get('username') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirm_password') as string

    // Get temp data from cookie
    const cookieStore = await cookies()
    const tempCookie = cookieStore.get('google_temp')

    if (!tempCookie || !tempCookie.value) {
        return { error: 'Sesi Google tidak valid. Silakan login ulang.' }
    }

    const { googleId, email } = JSON.parse(tempCookie.value)

    if (!name || !username || !password) {
        return { error: 'Semua field harus diisi' }
    }

    if (password !== confirmPassword) {
        return { error: 'Password dan konfirmasi password tidak cocok' }
    }

    if (password.length < 6) {
        return { error: 'Password minimal 6 karakter' }
    }

    try {
        // Check if username exists
        const { data: existingUser } = await supabase
            .from(TABLE_ADMIN)
            .select('id')
            .eq('username', username)
            .single()

        if (existingUser) {
            return { error: 'Username sudah digunakan' }
        }

        const passwordHash = await bcrypt.hash(password, 10)

        // Insert user
        const { data: newUser, error: insertError } = await supabase
            .from(TABLE_ADMIN)
            .insert({
                name,
                username,
                email,
                password_hash: passwordHash,
                google_id: googleId
            })
            .select()
            .single()

        if (insertError) {
            console.error('Registration error:', insertError)
            return { error: 'Gagal membuat akun' }
        }

        if (newUser) {
            // Create session
            await createSession(newUser.id.toString(), 'admin')

            // Clear cookie
            cookieStore.delete('google_temp')
        }

    } catch (error) {
        console.error('Registration error:', error)
        return { error: 'Terjadi kesalahan saat mendaftar' }
    }

    redirect('/dashboard')
}
