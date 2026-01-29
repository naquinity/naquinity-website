'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getAdminUser } from '@/lib/dal'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const TABLE_PJ_KM = 'pj_km'

export async function createPjKm(prevState: any, formData: FormData) {
    const user = await getAdminUser()
    if (!user) return { error: 'Unauthorized' }

    const name = formData.get('name') as string
    const nim = formData.get('nim') as string
    const kelas = formData.get('kelas') as string
    const role = formData.get('role') as string
    const matkul = formData.get('matkul') as string // Optional based on role
    const semester = formData.get('semester') as string

    // Photo Logic
    const photoMethod = formData.get('photo_method') as string
    const photoUrlInput = formData.get('photo_url_input') as string
    const photoFile = formData.get('photo') as File

    if (!name || !nim || !kelas || !role || !semester) {
        return { error: 'Semua field wajib diisi' }
    }

    if (role === 'PJ Matkul' && !matkul) {
        return { error: 'Mata Kuliah wajib diisi untuk PJ Matkul' }
    }

    let photoUrl = ''

    if (photoMethod === 'url' && photoUrlInput) {
        photoUrl = photoUrlInput
    } else if (photoMethod === 'upload' && photoFile && photoFile.size > 0) {
        const fileExt = photoFile.name.split('.').pop()
        const fileName = `pj_km_${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
            .from('naquinity-files')
            .upload(`pj-km/${fileName}`, photoFile)

        if (uploadError) {
            console.error('Upload Error:', uploadError)
            return { error: 'Gagal upload foto' }
        }

        const { data: publicData } = supabase.storage
            .from('naquinity-files')
            .getPublicUrl(`pj-km/${fileName}`)

        photoUrl = publicData.publicUrl
    }

    const { error } = await supabase
        .from(TABLE_PJ_KM)
        .insert({
            name,
            nim,
            kelas,
            role,
            matkul: role === 'PJ Matkul' ? matkul : null,
            semester: parseInt(semester),
            photo_url: photoUrl
        })

    if (error) {
        console.error('Create PJ-KM Error:', error)
        return { error: 'Gagal menambahkan data' }
    }

    revalidatePath('/dashboard/pj-km')
    redirect('/dashboard/pj-km')
}

export async function updatePjKm(id: string, prevState: any, formData: FormData) {
    const user = await getAdminUser()
    if (!user) return { error: 'Unauthorized' }

    const name = formData.get('name') as string
    const nim = formData.get('nim') as string
    const kelas = formData.get('kelas') as string
    const role = formData.get('role') as string
    const matkul = formData.get('matkul') as string
    const semester = formData.get('semester') as string
    const existingPhoto = formData.get('existing_photo') as string

    // Photo Logic
    const photoMethod = formData.get('photo_method') as string
    const photoUrlInput = formData.get('photo_url_input') as string
    const photoFile = formData.get('photo') as File

    if (!name || !nim || !kelas || !role || !semester) {
        return { error: 'Semua field wajib diisi' }
    }

    if (role === 'PJ Matkul' && !matkul) {
        return { error: 'Mata Kuliah wajib diisi untuk PJ Matkul' }
    }

    let photoUrl = existingPhoto

    if (photoMethod === 'url' && photoUrlInput) {
        photoUrl = photoUrlInput
    } else if (photoMethod === 'upload' && photoFile && photoFile.size > 0 && photoFile.name !== 'undefined') {
        const fileExt = photoFile.name.split('.').pop()
        const fileName = `pj_km_${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
            .from('naquinity-files')
            .upload(`pj-km/${fileName}`, photoFile)

        if (uploadError) {
            console.error('Upload Error:', uploadError)
            return { error: 'Gagal upload foto' }
        }

        const { data: publicData } = supabase.storage
            .from('naquinity-files')
            .getPublicUrl(`pj-km/${fileName}`)

        photoUrl = publicData.publicUrl
    }

    const { error } = await supabase
        .from(TABLE_PJ_KM)
        .update({
            name,
            nim,
            kelas,
            role,
            matkul: role === 'PJ Matkul' ? matkul : null,
            semester: parseInt(semester),
            photo_url: photoUrl,
        })
        .eq('id', id)

    if (error) {
        console.error('Update PJ-KM Error:', error)
        return { error: 'Gagal memperbarui data' }
    }

    revalidatePath('/dashboard/pj-km')
    revalidatePath(`/dashboard/pj-km/edit/${id}`)
    redirect('/dashboard/pj-km')
}

export async function deletePjKm(id: string) {
    const user = await getAdminUser()
    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase
        .from(TABLE_PJ_KM)
        .delete()
        .eq('id', id)

    if (error) {
        return { error: 'Gagal menghapus data' }
    }

    revalidatePath('/dashboard/pj-km')
    return { success: 'Data berhasil dihapus' }
}
