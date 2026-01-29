'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getAdminUser } from '@/lib/dal'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const TABLE_MAHASISWA = 'mahasiswa'

export async function createMahasiswa(prevState: any, formData: FormData) {
    const user = await getAdminUser()
    if (!user) return { error: 'Unauthorized' }

    const name = formData.get('name') as string
    const nim = formData.get('nim') as string
    const email = formData.get('email') as string
    const quote = formData.get('quote') as string

    // Photo Logic
    const photoMethod = formData.get('photo_method') as string
    const photoUrlInput = formData.get('photo_url_input') as string
    const photoFile = formData.get('photo') as File

    if (!name || !nim) {
        return { error: 'Nama dan NIM harus diisi' }
    }

    let photoUrl = ''

    if (photoMethod === 'url' && photoUrlInput) {
        photoUrl = photoUrlInput
    } else if (photoMethod === 'upload' && photoFile && photoFile.size > 0) {
        const fileExt = photoFile.name.split('.').pop()
        const fileName = `mahasiswa_${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
            .from('naquinity-files')
            .upload(`mahasiswa/${fileName}`, photoFile)

        if (uploadError) {
            console.error('Upload Error:', uploadError)
            return { error: 'Gagal upload foto' }
        }

        const { data: publicData } = supabase.storage
            .from('naquinity-files')
            .getPublicUrl(`mahasiswa/${fileName}`)

        photoUrl = publicData.publicUrl
    }

    const { error } = await supabase
        .from(TABLE_MAHASISWA)
        .insert({
            name,
            nim,
            email,
            quote,
            photo_url: photoUrl
        })

    if (error) {
        console.error('Create Mahasiswa Error:', error)
        return { error: 'Gagal menambahkan mahasiswa' }
    }

    revalidatePath('/dashboard/mahasiswa')
    redirect('/dashboard/mahasiswa')
}

export async function updateMahasiswa(id: string, prevState: any, formData: FormData) {
    const user = await getAdminUser()
    if (!user) return { error: 'Unauthorized' }

    const name = formData.get('name') as string
    const nim = formData.get('nim') as string
    const email = formData.get('email') as string
    const quote = formData.get('quote') as string
    const existingPhoto = formData.get('existing_photo') as string

    // Photo Logic
    const photoMethod = formData.get('photo_method') as string
    const photoUrlInput = formData.get('photo_url_input') as string
    const photoFile = formData.get('photo') as File

    let photoUrl = existingPhoto

    if (photoMethod === 'url' && photoUrlInput) {
        photoUrl = photoUrlInput
    } else if (photoMethod === 'upload' && photoFile && photoFile.size > 0 && photoFile.name !== 'undefined') {
        const fileExt = photoFile.name.split('.').pop()
        const fileName = `mahasiswa_${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
            .from('naquinity-files')
            .upload(`mahasiswa/${fileName}`, photoFile)

        if (uploadError) {
            console.error('Upload Error:', uploadError)
            return { error: 'Gagal upload foto' }
        }

        const { data: publicData } = supabase.storage
            .from('naquinity-files')
            .getPublicUrl(`mahasiswa/${fileName}`)

        photoUrl = publicData.publicUrl
    }

    const { error } = await supabase
        .from(TABLE_MAHASISWA)
        .update({
            name,
            nim,
            email,
            quote,
            photo_url: photoUrl,
        })
        .eq('id', id)

    if (error) {
        console.error('Update Mahasiswa Error:', error)
        return { error: 'Gagal memperbarui mahasiswa' }
    }

    revalidatePath('/dashboard/mahasiswa')
    revalidatePath(`/dashboard/mahasiswa/edit/${id}`)
    redirect('/dashboard/mahasiswa')
}

export async function deleteMahasiswa(id: string) {
    const user = await getAdminUser()
    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase
        .from(TABLE_MAHASISWA)
        .delete()
        .eq('id', id)

    if (error) {
        return { error: 'Gagal menghapus mahasiswa' }
    }

    revalidatePath('/dashboard/mahasiswa')
    return { success: 'Mahasiswa berhasil dihapus' }
}
