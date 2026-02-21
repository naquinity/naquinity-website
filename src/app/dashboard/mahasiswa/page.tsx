import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import MahasiswaListClient from './MahasiswaListClient'
import Pagination from '@/components/ui/Pagination'

export default async function MahasiswaPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; limit?: string }>
}) {
    const supabase = await createClient()

    const params = await searchParams
    const page = Number(params?.page) || 1
    const limitParam = params?.limit || '30'
    const limit = limitParam === 'all' ? null : Number(limitParam)

    // Fetch total count first
    const { count } = await supabase
        .from('mahasiswa')
        .select('*', { count: 'exact', head: true })

    // Build the query
    let query = supabase
        .from('mahasiswa')
        .select('*')
        .order('name', { ascending: true })

    if (limit !== null) {
        query = query.range((page - 1) * limit, page * limit - 1)
    }

    const { data: mahasiswaList } = await query

    const totalPages = limit !== null ? Math.ceil((count || 0) / limit) : 1

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

            {/* Filters */}
            <div className="flex justify-end mb-4">
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-500 font-medium whitespace-nowrap">Tampilkan:</span>
                    <div className="flex bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                        {['30', '60', '90', '120', 'all'].map((val) => (
                            <Link
                                key={val}
                                href={`/dashboard/mahasiswa?limit=${val}&page=1`}
                                className={`px-4 py-2 font-medium transition-colors ${limitParam === val
                                    ? 'bg-primary text-white'
                                    : 'text-slate-600 hover:bg-slate-50 border-l border-slate-200 first:border-l-0'
                                    }`}
                            >
                                {val === 'all' ? 'Semua' : val}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
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
                            <p className="text-sm text-slate-500">Melihat: <strong>{mahasiswaList.length}</strong> dari total <strong>{count}</strong> mahasiswa</p>
                        </div>
                    </>
                )}
            </div>

            {/* Pagination Controls */}
            {limit !== null && totalPages > 1 && (
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    baseUrl="/dashboard/mahasiswa"
                    searchParams={{ limit }}
                />
            )}
        </div>
    )
}
