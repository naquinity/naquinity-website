import { createSession } from '@/lib/session'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error || !code) {
        return redirect('/admin/login?error=oauth_failed')
    }

    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET

    // Dynamic Redirect URI (Must match the one sent in the auth request)
    let redirectUri = process.env.GOOGLE_REDIRECT_URI

    if (!redirectUri) {
        const protocol = request.nextUrl.protocol
        const host = request.nextUrl.host
        redirectUri = `${protocol}//${host}/api/auth/google/callback`
    }

    // 1. Exchange code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            code,
            client_id: clientId!,
            client_secret: clientSecret!,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code',
        }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenData.access_token) {
        return redirect('/admin/login?error=token_failed')
    }

    // 2. Get user info
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
    })

    const userInfo = await userResponse.json()

    if (!userInfo.id) {
        return redirect('/admin/login?error=userinfo_failed')
    }

    const { id: googleId, email, name } = userInfo

    // Supabase Setup
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const TABLE_ADMIN = 'admin_users'

    // Strategy 1: Check by Google ID
    const { data: existingUser } = await supabase
        .from(TABLE_ADMIN)
        .select('*')
        .eq('google_id', googleId)
        .single()

    if (existingUser) {
        await createSession(existingUser.id.toString(), 'admin')
        return redirect('/dashboard')
    }

    // Strategy 2: Check by Email (Account Linking)
    const { data: userByEmail } = await supabase
        .from(TABLE_ADMIN)
        .select('*')
        .eq('email', email)
        .single()

    if (userByEmail) {
        // Link Account
        await supabase
            .from(TABLE_ADMIN)
            .update({ google_id: googleId })
            .eq('id', userByEmail.id)

        await createSession(userByEmail.id.toString(), 'admin')
        return redirect('/dashboard')
    }

    // Strategy 3: New User -> Redirect to Complete Profile
    // Store temp data in a temporary cookie
    const tempUserData = JSON.stringify({ googleId, email, name })

    // Set cookie compatible with next/headers
    // Note: middleware or server actions usually handle cookies better, 
    // but here we can set it on the response or use the cookies() helper if allowed in Route Handlers (yes in App Dir)
    const cookieStore = await cookies()
    cookieStore.set('google_temp', tempUserData, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 10 // 10 minutes
    })

    return redirect('/admin/google-complete')
}
