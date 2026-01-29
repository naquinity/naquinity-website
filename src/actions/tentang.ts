'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { getAdminUser } from '@/lib/dal'
import { redirect } from 'next/navigation'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const TABLE_TENTANG = 'tentang_kami'
const TABLE_MASKOT = 'maskot'

export async function updateTentangContent(prevState: any, formData: FormData) {
    const user = await getAdminUser()
    if (!user) return { error: 'Unauthorized' }

    const content = formData.get('content') as string

    if (!content) {
        return { error: 'Content tidak boleh kosong' }
    }

    // Check if exists
    const { data: existing } = await supabase.from(TABLE_TENTANG).select('id').limit(1).single()

    let error
    if (existing) {
        const { error: updateError } = await supabase
            .from(TABLE_TENTANG)
            .update({ content, updated_at: new Date().toISOString() })
            .eq('id', existing.id)
        error = updateError
    } else {
        const { error: insertError } = await supabase
            .from(TABLE_TENTANG)
            .insert({ content })
        error = insertError
    }

    if (error) {
        console.error('Update Tentang Error:', error)
        return { error: 'Gagal memperbarui konten' }
    }

    revalidatePath('/dashboard/tentang')
    revalidatePath('/tentang')
    return { success: 'Tentang Kami berhasil diperbarui!' }
}

export async function updateMaskot(prevState: any, formData: FormData) {
    const user = await getAdminUser()
    if (!user) return { error: 'Unauthorized' }

    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const image = formData.get('image') as File
    const currentImageUrl = formData.get('current_image_url') as string

    const imageSource = formData.get('image_source') as string
    const imageUrlInput = formData.get('image_url_input') as string

    if (!name || !description) {
        return { error: 'Nama dan deskripsi maskot harus diisi' }
    }

    let imageUrl = currentImageUrl

    if (imageSource === 'url' && imageUrlInput) {
        imageUrl = imageUrlInput
    } else if (imageSource === 'upload' && image && image.size > 0 && image.name !== 'undefined') {
        const fileExt = image.name.split('.').pop()
        const fileName = `maskot_${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
            .from('naquinity-files')
            .upload(`maskot/${fileName}`, image)

        if (uploadError) {
            console.error('Upload Maskot Error:', uploadError)
            return { error: 'Gagal upload gambar maskot' }
        }

        const { data: publicData } = supabase.storage
            .from('naquinity-files')
            .getPublicUrl(`maskot/${fileName}`)

        imageUrl = publicData.publicUrl
    }

    // Check if exists
    const { data: existing } = await supabase.from(TABLE_MASKOT).select('id').limit(1).single()

    let error
    if (existing) {
        const { error: updateError } = await supabase
            .from(TABLE_MASKOT)
            .update({
                name,
                description,
                image_url: imageUrl,
                updated_at: new Date().toISOString()
            })
            .eq('id', existing.id)
        error = updateError
    } else {
        const { error: insertError } = await supabase
            .from(TABLE_MASKOT)
            .insert({
                name,
                description,
                image_url: imageUrl
            })
        error = insertError
    }

    if (error) {
        console.error('Update Maskot Error:', error)
        return { error: 'Gagal memperbarui maskot' }
    }

    revalidatePath('/dashboard/tentang')
    revalidatePath('/tentang') // Also update public page if it uses this
    revalidatePath('/') // Homepage uses mascot too
    return { success: 'Maskot berhasil diperbarui!' }
}
