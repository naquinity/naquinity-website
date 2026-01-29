'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getAdminUser } from '@/lib/dal'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const TABLE_PROGRAM = 'program'

export async function createProgram(prevState: any, formData: FormData) {
    console.log('createProgram: Action started')
    const user = await getAdminUser()
    if (!user) {
        console.log('createProgram: User check failed')
        return { error: 'Unauthorized' }
    }
    console.log('createProgram: User authenticated', user.email)

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const start_date = formData.get('start_date') as string
    const end_date = formData.get('end_date') as string
    const link = formData.get('link') as string
    const logo_url = formData.get('logo_url') as string
    const image = formData.get('image') as File // Handle image upload if implemented, or URL

    // Note: Original PHP might utilize file upload. 
    // Next.js Server Actions with FormData can handle file uploads, but we need to upload to Supabase Storage.
    // For simplicity parity first, let's assume image URL input if the PHP version used it, or file upload if it used it.
    // The original PHP likely used file upload.
    // I will inspect the PHP file content (in next steps) to see if it receives a file or string.

    if (!title || !description) {
        return { error: 'Data wajib diisi' }
    }

    let imageUrl = logo_url // Fallback if no file uploaded but URL provided?

    // File upload logic placeholder - will refine after reading PHP file
    if (image && image.size > 0 && image.name !== 'undefined') {
        const fileExt = image.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('naquinity-files')
            .upload(`program/${fileName}`, image)

        if (uploadError) {
            return { error: 'Gagal upload gambar' }
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
            .from('naquinity-files')
            .getPublicUrl(`program/${fileName}`)

        imageUrl = publicUrlData.publicUrl
    }

    try {
        const { error } = await supabase.from(TABLE_PROGRAM).insert({
            title,
            description,
            start_date: start_date || null,
            end_date: end_date || null,
            logo_url: imageUrl,
        })

        if (error) {
            console.error('Create Program Error:', error)
            return { error: 'Gagal membuat program' }
        }
    } catch (error) {
        return { error: 'Terjadi kesalahan' }
    }

    revalidatePath('/dashboard/program')
    revalidatePath('/program') // Revalidate public page too
    redirect('/dashboard/program')
}

export async function deleteProgram(id: number) {
    const user = await getAdminUser()
    if (!user) return

    await supabase.from(TABLE_PROGRAM).delete().eq('id', id)
    revalidatePath('/dashboard/program')
    revalidatePath('/program')
}

export async function updateProgram(id: number, prevState: any, formData: FormData) {
    const user = await getAdminUser()
    if (!user) {
        return { error: 'Unauthorized' }
    }

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const start_date = formData.get('start_date') as string
    const end_date = formData.get('end_date') as string
    const link = formData.get('link') as string
    const logo_url = formData.get('logo_url') as string
    const image = formData.get('image') as File

    if (!title || !description) {
        return { error: 'Data wajib diisi' }
    }

    let imageUrl = logo_url

    if (image && image.size > 0 && image.name !== 'undefined') {
        const fileExt = image.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('naquinity-files')
            .upload(`program/${fileName}`, image)

        if (uploadError) {
            return { error: 'Gagal upload gambar' }
        }

        const { data: publicUrlData } = supabase.storage
            .from('naquinity-files')
            .getPublicUrl(`program/${fileName}`)

        imageUrl = publicUrlData.publicUrl
    }

    try {
        const { error } = await supabase
            .from(TABLE_PROGRAM)
            .update({
                title,
                description,
                start_date: start_date || null,
                end_date: end_date || null,
                logo_url: imageUrl,
            })
            .eq('id', id)

        if (error) {
            console.error('Update Program Error:', error)
            return { error: 'Gagal mengupdate program' }
        }
    } catch (error) {
        return { error: 'Terjadi kesalahan' }
    }

    revalidatePath('/dashboard/program')
    revalidatePath('/program')
    redirect('/dashboard/program')
}
