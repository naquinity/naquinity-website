'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getAdminUser } from '@/lib/dal'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const TABLE_PENGURUS = 'pengurus'

export async function createPengurus(prevState: any, formData: FormData) {
    const user = await getAdminUser()
    if (!user) return { error: 'Unauthorized' }

    const name = formData.get('name') as string
    const position = formData.get('position') as string
    const nim = formData.get('nim') as string // Optional

    // Photo Logic
    const photoMethod = formData.get('photo_method') as string
    const photoUrlInput = formData.get('photo_url_input') as string
    const photoFile = formData.get('photo') as File

    if (!name || !position) {
        return { error: 'Nama dan jabatan harus diisi' }
    }

    let photoUrl = ''

    if (photoMethod === 'url' && photoUrlInput) {
        photoUrl = photoUrlInput
    } else if (photoMethod === 'upload' && photoFile && photoFile.size > 0) {
        const fileExt = photoFile.name.split('.').pop()
        const fileName = `pengurus_${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
            .from('naquinity-files')
            .upload(`pengurus/${fileName}`, photoFile)

        if (uploadError) {
            console.error('Upload Error:', uploadError)
            return { error: 'Gagal upload foto' }
        }

        const { data: publicData } = supabase.storage
            .from('naquinity-files')
            .getPublicUrl(`pengurus/${fileName}`)

        photoUrl = publicData.publicUrl
    }

    const { error } = await supabase
        .from(TABLE_PENGURUS)
        .insert({
            name,
            position,
            nim: nim || null,
            photo_url: photoUrl
        })

    if (error) {
        console.error('Create Pengurus Error:', error)
        return { error: 'Gagal menambahkan pengurus' }
    }

    revalidatePath('/dashboard/pengurus')
    redirect('/dashboard/pengurus')
}

export async function updatePengurus(id: string, prevState: any, formData: FormData) {
    const user = await getAdminUser()
    if (!user) return { error: 'Unauthorized' }

    const name = formData.get('name') as string
    const position = formData.get('position') as string
    const nim = formData.get('nim') as string
    const existingPhoto = formData.get('existing_photo') as string

    // Photo Logic
    const photoMethod = formData.get('photo_method') as string
    const photoUrlInput = formData.get('photo_url_input') as string
    const photoFile = formData.get('photo') as File

    if (!name || !position) {
        return { error: 'Nama dan jabatan harus diisi' }
    }

    let photoUrl = existingPhoto

    if (photoMethod === 'url' && photoUrlInput) {
        photoUrl = photoUrlInput
    } else if (photoMethod === 'upload' && photoFile && photoFile.size > 0 && photoFile.name !== 'undefined') {
        const fileExt = photoFile.name.split('.').pop()
        const fileName = `pengurus_${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
            .from('naquinity-files')
            .upload(`pengurus/${fileName}`, photoFile)

        if (uploadError) {
            console.error('Upload Error:', uploadError)
            return { error: 'Gagal upload foto' }
        }

        const { data: publicData } = supabase.storage
            .from('naquinity-files')
            .getPublicUrl(`pengurus/${fileName}`)

        photoUrl = publicData.publicUrl
    }

    const { error } = await supabase
        .from(TABLE_PENGURUS)
        .update({
            name,
            position,
            nim: nim || null,
            photo_url: photoUrl,
        })
        .eq('id', id)

    if (error) {
        console.error('Update Pengurus Error:', error)
        return { error: 'Gagal memperbarui pengurus' }
    }

    revalidatePath('/dashboard/pengurus')
    revalidatePath(`/dashboard/pengurus/edit/${id}`)
    redirect('/dashboard/pengurus')
}

export async function deletePengurus(id: string) {
    const user = await getAdminUser()
    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase
        .from(TABLE_PENGURUS)
        .delete()
        .eq('id', id)

    if (error) {
        return { error: 'Gagal menghapus pengurus' }
    }

    revalidatePath('/dashboard/pengurus')
    return { success: 'Pengurus berhasil dihapus' }
}
