import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import EditMahasiswaForm from './EditMahasiswaForm'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function EditMahasiswaPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    // Fetch data directly on the server
    const { data: mahasiswa } = await supabase
        .from('mahasiswa')
        .select('*')
        .eq('id', id)
        .single()

    if (!mahasiswa) {
        return (
            <div className="p-8 text-center bg-white rounded-xl shadow-sm border border-slate-200 mt-8">
                <span className="material-symbols-outlined text-4xl text-red-500 mb-2">error</span>
                <h3 className="text-xl font-bold text-slate-800 mb-1">Data mahasiswa tidak ditemukan</h3>
                <p className="text-slate-500 mb-6">Mahasiswa dengan ID tersebut tidak ada di database.</p>
                <Link href="/dashboard/mahasiswa" className="text-primary hover:underline font-bold">
                    &larr; Kembali ke Daftar Mahasiswa
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
                <span className="material-symbols-outlined !text-sm">chevron_right</span>
                <Link href="/dashboard/mahasiswa" className="hover:text-primary">Mahasiswa</Link>
                <span className="material-symbols-outlined !text-sm">chevron_right</span>
                <span className="font-bold text-slate-800">Edit Mahasiswa</span>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">Edit Data Mahasiswa</h1>
                    <p className="text-slate-600">Perbarui informasi mahasiswa</p>
                </div>

                <EditMahasiswaForm mahasiswa={mahasiswa} />
            </div>
        </div>
    )
}
