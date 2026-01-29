import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import PencapaianListClient from './PencapaianListClient'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function PencapaianPage() {
    // Fetch data
    const { data: pencapaianList } = await supabase
        .from('pencapaian')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <Link href="/dashboard" className="hover:text-primary">
                    Dashboard
                </Link>
                <span className="material-symbols-outlined !text-sm">chevron_right</span>
                <span className="font-bold text-slate-800">Pencapaian</span>
            </div>

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-primary mb-2">Kelola Pencapaian</h2>
                    <p className="text-slate-600">Dokumentasikan prestasi dan pencapaian anggota komunitas</p>
                    <a href="/pencapaian" target="_blank"
                        className="mt-2 inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline">
                        <span className="material-symbols-outlined !text-base">open_in_new</span>
                        Lihat halaman Pencapaian
                    </a>
                </div>
                <Link href="/dashboard/pencapaian/create"
                    className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined">add</span>
                    <span>Tambah Pencapaian</span>
                </Link>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {!pencapaianList || pencapaianList.length === 0 ? (
                    <div className="text-center py-16">
                        <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">trophy</span>
                        <h3 className="text-xl font-bold text-slate-600 mb-2">Belum ada pencapaian</h3>
                        <p className="text-slate-500 mb-6">Tambahkan pencapaian pertama Anda</p>
                        <Link href="/dashboard/pencapaian/create"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition">
                            <span className="material-symbols-outlined">add</span>
                            Tambah Pencapaian
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Pencapaian</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Penerima</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {pencapaianList.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-slate-800">{item.title}</p>
                                                <p className="text-xs text-slate-500 line-clamp-1">{item.description?.substring(0, 60)}...</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {item.person_photo_url ? (
                                                        <img src={item.person_photo_url} alt="Photo"
                                                            className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-primary">person</span>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-semibold text-slate-800 text-sm">{item.person_name}</p>
                                                        {item.person_nim && (
                                                            <p className="text-xs text-slate-500">{item.person_nim}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={`/dashboard/pencapaian/edit/${item.id}`}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/5 transition-all"
                                                        title="Edit">
                                                        <span className="material-symbols-outlined !text-lg">edit</span>
                                                    </Link>
                                                    <PencapaianListClient id={item.id} name={item.title} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
                            <p className="text-sm text-slate-500">Total: <strong>{pencapaianList.length}</strong> pencapaian</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
