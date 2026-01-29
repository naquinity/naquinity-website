import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { deleteProgram } from '@/actions/program'
import ProgramListClient from './ProgramListClient' // Client component for delete action

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function ProgramPage() {
    const { data: programs } = await supabase
        .from('program')
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
                <span className="font-bold text-slate-800">Program Kami</span>
            </div>

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-primary mb-2">
                        Kelola Program Kami
                    </h2>
                    <p className="text-slate-600">
                        Atur dan pantau semua program serta event komunitas
                    </p>
                    <a
                        href="/program"
                        target="_blank"
                        className="mt-2 inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline"
                    >
                        <span className="material-symbols-outlined !text-base">
                            open_in_new
                        </span>
                        Lihat halaman Program Kami
                    </a>
                </div>
                <Link
                    href="/dashboard/program/create"
                    className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20"
                >
                    <span className="material-symbols-outlined">add</span>
                    <span>Tambah Program Baru</span>
                </Link>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {!programs || programs.length === 0 ? (
                    <div className="text-center py-16">
                        <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
                            calendar_month
                        </span>
                        <h3 className="text-xl font-bold text-slate-600 mb-2">
                            Belum ada program
                        </h3>
                        <p className="text-slate-500 mb-6">
                            Tambahkan program pertama Anda
                        </p>
                        <Link
                            href="/dashboard/program/create"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition"
                        >
                            <span className="material-symbols-outlined">add</span>
                            Tambah Program
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        Nama Program
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        Tanggal
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {programs.map((program) => (
                                    <tr
                                        key={program.id}
                                        className="hover:bg-slate-50/50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {program.logo_url ? (
                                                    <img
                                                        src={program.logo_url}
                                                        alt="Logo"
                                                        className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-primary">
                                                            calendar_month
                                                        </span>
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-bold text-slate-800">
                                                        {program.title}
                                                    </p>
                                                    <p className="text-xs text-slate-500 line-clamp-1">
                                                        {program.description?.substring(0, 60)}...
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-slate-600">
                                                {program.start_date
                                                    ? new Date(program.start_date).toLocaleDateString(
                                                        'id-ID',
                                                        {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        }
                                                    )
                                                    : '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Edit Action - Placeholder for now until Edit page exists */}
                                                <Link
                                                    href={`/dashboard/program/edit/${program.id}`}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/5 transition-all"
                                                    title="Edit"
                                                >
                                                    <span className="material-symbols-outlined !text-lg">
                                                        edit
                                                    </span>
                                                </Link>
                                                <ProgramListClient id={program.id} name={program.title} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {programs && programs.length > 0 && (
                    <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
                        <p className="text-sm text-slate-500">Total: <strong>{programs.length}</strong> program</p>
                    </div>
                )}
            </div>
        </div>
    )
}
