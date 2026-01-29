import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { PengurusDeleteButton } from './PengurusListClient'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function PengurusPage() {
    // Fetch data matching PHP: order by created_at DESC
    const { data: pengurusList } = await supabase
        .from('pengurus')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
                <span className="material-symbols-outlined !text-sm">chevron_right</span>
                <span className="font-bold text-slate-800">Pengurus</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-primary mb-2">Kelola Pengurus</h2>
                    <p className="text-slate-600">Manajemen data pengurus organisasi</p>
                    <a href="/pengurus" target="_blank"
                        className="mt-2 inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline">
                        <span className="material-symbols-outlined !text-base">open_in_new</span>
                        Lihat halaman Pengurus
                    </a>
                </div>
                <Link href="/dashboard/pengurus/create"
                    className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined">add</span>
                    <span>Tambah Pengurus</span>
                </Link>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {!pengurusList || pengurusList.length === 0 ? (
                    <div className="text-center py-16">
                        <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">shield_person</span>
                        <h3 className="text-xl font-bold text-slate-600 mb-2">Belum ada pengurus</h3>
                        <p className="text-slate-500 mb-6">Tambahkan pengurus pertama</p>
                        <Link href="/dashboard/pengurus/create"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition">
                            <span className="material-symbols-outlined">add</span>
                            Tambah Pengurus
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Pengurus</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Jabatan</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {pengurusList.map((p) => (
                                        <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {p.photo_url ? (
                                                        <img src={p.photo_url} alt="Photo"
                                                            className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-primary">person</span>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-bold text-slate-800">{p.name}</p>
                                                        {p.nim && (
                                                            <p className="text-xs text-slate-500 font-mono">{p.nim}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-semibold text-slate-700">{p.position}</p>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={`/dashboard/pengurus/edit/${p.id}`}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/5 transition-all"
                                                        title="Edit">
                                                        <span className="material-symbols-outlined !text-lg">edit</span>
                                                    </Link>
                                                    <PengurusDeleteButton id={p.id} name={p.name} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
                            <p className="text-sm text-slate-500">Total: <strong>{pengurusList.length}</strong> pengurus</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
