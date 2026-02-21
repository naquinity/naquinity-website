export interface Program {
    id: string
    title: string
    description: string
    cover_image_url?: string
    logo_url?: string
    start_date?: string     // Added new field
    end_date?: string       // Added new field
    created_at: string
}

export interface Mahasiswa {
    id: string
    name: string
    nim: string
    kelas: string
    angkatan: number
    photo_url?: string
    quote?: string
    email?: string          // Added new field
    created_at: string
}

export interface Pencapaian {
    id: string
    person_name: string
    person_nim?: string
    person_photo_url?: string
    title: string
    description: string
    created_at: string
}

export interface Pengurus {
    id: string
    name: string
    nim?: string            // Added new field
    position: string
    division?: string
    photo_url?: string
    created_at: string
}

export interface LevelUp {
    id: string
    slug: string
    title: string
    content: string
    author_name: string
    cover_image_url?: string
    created_at: string
}

export interface PjKm {
    id: string
    name: string
    nim: string
    role: 'PJ Matkul' | 'KM Kelas'
    kelas: string
    matkul?: string
    semester: number
    photo_url?: string
    created_at: string
}

export interface Keuangan {
    id: string
    transaction_type: 'income' | 'expense'
    title: string
    amount: number
    description?: string
    date: string
    created_at: string
}

export interface Pinjaman {
    id: string
    user_id: string
    amount: number
    reason: string
    status: 'pending' | 'approved' | 'rejected' | 'returned'
    request_date: string
    approval_date?: string
    return_date?: string
    created_at: string
}

export interface User {
    id: string
    email: string
    name: string
    username: string
    photo_url?: string
    role: 'user' | 'admin'
    created_at: string
}
