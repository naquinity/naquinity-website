import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import MahasiswaListClient from './MahasiswaListClient'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function MahasiswaPage() {
    // Fetch all students (matching PHP query: order by name ASC)
    const { data: mahasiswaList } = await supabase
        .from('mahasiswa')
        .select('*')
        .order('name', { ascending: true })

    return (
        <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <Link href="/dashboard" className="hover:text-primary">
                    Dashboard
                </Link>
                <span className="material-symbols-outlined !text-sm">chevron_right</span>
                <span className="font-bold text-slate-800">Mahasiswa</span>
            </div>

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-primary mb-2">Kelola Mahasiswa</h2>
                    <p className="text-slate-600">Manajemen data anggota mahasiswa</p>
                    <a href="/mahasiswa" target="_blank"
                        className="mt-2 inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline">
                        <span className="material-symbols-outlined !text-base">open_in_new</span>
                        Lihat halaman Mahasiswa
                    </a>
                </div>
                <Link href="/dashboard/mahasiswa/create"
                    className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined">add</span>
                    <span>Tambah Mahasiswa</span>
                </Link>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {!mahasiswaList || mahasiswaList.length === 0 ? (
                    <div className="text-center py-16">
                        <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">groups</span>
                        <h3 className="text-xl font-bold text-slate-600 mb-2">Belum ada mahasiswa</h3>
                        <p className="text-slate-500 mb-6">Tambahkan mahasiswa pertama</p>
                        <Link href="/dashboard/mahasiswa/create"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition">
                            <span className="material-symbols-outlined">add</span>
                            Tambah Mahasiswa
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Mahasiswa</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">NIM</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Quote</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {mahasiswaList.map((mhs) => (
                                        <tr key={mhs.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {mhs.photo_url ? (
                                                        <img src={mhs.photo_url} alt="Photo"
                                                            className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-primary">person</span>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-bold text-slate-800">{mhs.name}</p>
                                                        {mhs.email && (
                                                            <p className="text-xs text-slate-500">{mhs.email}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-slate-700 font-mono">{mhs.nim}</p>
                                            </td>
                                            <td className="px-6 py-4 max-w-xs">
                                                <p className="text-sm text-slate-600 italic line-clamp-2">
                                                    "{mhs.quote || '-'}"
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={`/dashboard/mahasiswa/edit/${mhs.id}`}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/5 transition-all"
                                                        title="Edit">
                                                        <span className="material-symbols-outlined !text-lg">edit</span>
                                                    </Link>
                                                    <MahasiswaListClient id={mhs.id} name={mhs.name} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
                            <p className="text-sm text-slate-500">Total: <strong>{mahasiswaList.length}</strong> mahasiswa</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
