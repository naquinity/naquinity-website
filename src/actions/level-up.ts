'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getAdminUser } from '@/lib/dal'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const TABLE_LEVELUP = 'levelup'

export async function createLevelUp(prevState: any, formData: FormData) {
    const user = await getAdminUser()
    if (!user) return { error: 'Unauthorized' }

    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const authorName = formData.get('author_name') as string

    // Cover Image Logic
    const coverMethod = formData.get('cover_method') as string
    const coverUrlInput = formData.get('cover_url_input') as string
    const coverFile = formData.get('cover_image') as File

    if (!title || !content || !authorName) {
        return { error: 'Title, konten, dan nama penulis harus diisi' }
    }

    let coverImageUrl = ''

    if (coverMethod === 'url' && coverUrlInput) {
        coverImageUrl = coverUrlInput
    } else if (coverMethod === 'upload' && coverFile && coverFile.size > 0) {
        const fileExt = coverFile.name.split('.').pop()
        const fileName = `levelup_${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
            .from('naquinity-files')
            .upload(`levelup/${fileName}`, coverFile)

        if (uploadError) {
            console.error('Upload Error:', uploadError)
            return { error: 'Gagal upload cover image' }
        }

        const { data: publicData } = supabase.storage
            .from('naquinity-files')
            .getPublicUrl(`levelup/${fileName}`)

        coverImageUrl = publicData.publicUrl
    }

    const { error } = await supabase
        .from(TABLE_LEVELUP)
        .insert({
            title,
            content,
            author_name: authorName,
            cover_image_url: coverImageUrl
        })

    if (error) {
        console.error('Create LevelUp Error:', error)
        return { error: 'Gagal menambahkan artikel' }
    }

    revalidatePath('/dashboard/level-up')
    redirect('/dashboard/level-up')
}

export async function updateLevelUp(id: string, prevState: any, formData: FormData) {
    const user = await getAdminUser()
    if (!user) return { error: 'Unauthorized' }

    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const authorName = formData.get('author_name') as string
    const existingCover = formData.get('existing_cover') as string

    // Cover Image Logic
    const coverMethod = formData.get('cover_method') as string
    const coverUrlInput = formData.get('cover_url_input') as string
    const coverFile = formData.get('cover_image') as File

    let coverImageUrl = existingCover

    if (coverMethod === 'url' && coverUrlInput) {
        coverImageUrl = coverUrlInput
    } else if (coverMethod === 'upload' && coverFile && coverFile.size > 0 && coverFile.name !== 'undefined') {
        const fileExt = coverFile.name.split('.').pop()
        const fileName = `levelup_${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
            .from('naquinity-files')
            .upload(`levelup/${fileName}`, coverFile)

        if (uploadError) {
            console.error('Upload Error:', uploadError)
            return { error: 'Gagal upload cover image' }
        }

        const { data: publicData } = supabase.storage
            .from('naquinity-files')
            .getPublicUrl(`levelup/${fileName}`)

        coverImageUrl = publicData.publicUrl
    }


    const { error } = await supabase
        .from(TABLE_LEVELUP)
        .update({
            title,
            content,
            author_name: authorName,
            cover_image_url: coverImageUrl,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)

    if (error) {
        console.error('Update LevelUp Error:', error)
        return { error: 'Gagal memperbarui artikel' }
    }

    revalidatePath('/dashboard/level-up')
    revalidatePath(`/dashboard/level-up/edit/${id}`)
    redirect('/dashboard/level-up')
}

export async function deleteLevelUp(id: string) {
    const user = await getAdminUser()
    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase
        .from(TABLE_LEVELUP)
        .delete()
        .eq('id', id)

    if (error) {
        return { error: 'Gagal menghapus artikel' }
    }

    revalidatePath('/dashboard/level-up')
    return { success: 'Artikel berhasil dihapus' }
}
