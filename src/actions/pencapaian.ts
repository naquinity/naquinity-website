'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getAdminUser } from '@/lib/dal'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const TABLE_PENCAPAIAN = 'pencapaian'

export async function createPencapaian(prevState: any, formData: FormData) {
    const user = await getAdminUser()
    if (!user) return { error: 'Unauthorized' }

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const personName = formData.get('person_name') as string
    const personNim = formData.get('person_nim') as string

    // Photo Logic
    const photoMethod = formData.get('photo_method') as string
    const photoUrlInput = formData.get('photo_url_input') as string
    const photoFile = formData.get('person_photo') as File

    if (!title || !description || !personName) {
        return { error: 'Semua field wajib diisi' }
    }

    let photoUrl = ''

    if (photoMethod === 'url' && photoUrlInput) {
        photoUrl = photoUrlInput
    } else if (photoMethod === 'upload' && photoFile && photoFile.size > 0) {
        const fileExt = photoFile.name.split('.').pop()
        const fileName = `pencapaian_${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
            .from('naquinity-files')
            .upload(`pencapaian/${fileName}`, photoFile)

        if (uploadError) {
            console.error('Upload Error:', uploadError)
            return { error: 'Gagal upload foto' }
        }

        const { data: publicData } = supabase.storage
            .from('naquinity-files')
            .getPublicUrl(`pencapaian/${fileName}`)

        photoUrl = publicData.publicUrl
    }

    const { error } = await supabase
        .from(TABLE_PENCAPAIAN)
        .insert({
            title,
            description,
            person_name: personName,
            person_nim: personNim,
            person_photo_url: photoUrl
        })

    if (error) {
        console.error('Create Pencapaian Error:', error)
        return { error: 'Gagal menambahkan pencapaian' }
    }

    revalidatePath('/dashboard/pencapaian')
    redirect('/dashboard/pencapaian')
}

export async function updatePencapaian(id: string, prevState: any, formData: FormData) {
    const user = await getAdminUser()
    if (!user) return { error: 'Unauthorized' }

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const personName = formData.get('person_name') as string
    const personNim = formData.get('person_nim') as string
    const existingPhoto = formData.get('existing_photo') as string

    // Photo Logic
    const photoMethod = formData.get('photo_method') as string
    const photoUrlInput = formData.get('photo_url_input') as string
    const photoFile = formData.get('person_photo') as File

    let photoUrl = existingPhoto

    if (photoMethod === 'url' && photoUrlInput) {
        photoUrl = photoUrlInput
    } else if (photoMethod === 'upload' && photoFile && photoFile.size > 0 && photoFile.name !== 'undefined') {
        const fileExt = photoFile.name.split('.').pop()
        const fileName = `pencapaian_${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
            .from('naquinity-files')
            .upload(`pencapaian/${fileName}`, photoFile)

        if (uploadError) {
            console.error('Upload Error:', uploadError)
            return { error: 'Gagal upload foto' }
        }

        const { data: publicData } = supabase.storage
            .from('naquinity-files')
            .getPublicUrl(`pencapaian/${fileName}`)

        photoUrl = publicData.publicUrl
    }


    const { error } = await supabase
        .from(TABLE_PENCAPAIAN)
        .update({
            title,
            description,
            person_name: personName,
            person_nim: personNim,
            person_photo_url: photoUrl,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)

    if (error) {
        console.error('Update Pencapaian Error:', error)
        return { error: 'Gagal memperbarui pencapaian' }
    }

    revalidatePath('/dashboard/pencapaian')
    revalidatePath(`/dashboard/pencapaian/edit/${id}`)
    redirect('/dashboard/pencapaian')
}

export async function deletePencapaian(id: string) {
    const user = await getAdminUser()
    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase
        .from(TABLE_PENCAPAIAN)
        .delete()
        .eq('id', id)

    if (error) {
        return { error: 'Gagal menghapus pencapaian' }
    }

    revalidatePath('/dashboard/pencapaian')
    return { success: 'Pencapaian berhasil dihapus' }
}
