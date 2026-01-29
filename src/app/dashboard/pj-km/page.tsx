import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { PjKmDeleteButton } from './PjKmListClient'
import { redirect } from 'next/navigation'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function DashboardPjKmPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const semester = typeof params.semester === 'string' ? params.semester : 'all'
    const role = typeof params.role === 'string' ? params.role : 'all'

    // Build Query
    let query = supabase
        .from('pj_km')
        .select('*')
        .order('semester', { ascending: true })
        .order('name', { ascending: true })

    if (semester !== 'all') {
        const semesterInt = parseInt(semester)
        if (!isNaN(semesterInt)) {
            query = query.eq('semester', semesterInt)
        }
    }

    if (role !== 'all') {
        query = query.eq('role', role)
    }

    const { data: pjKmList } = await query

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
                <span className="material-symbols-outlined !text-sm">chevron_right</span>
                <span className="font-bold text-slate-800">PJ Matkul-KM Kelas</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-primary mb-2">Kelola PJ Matkul-KM Kelas</h2>
                    <p className="text-slate-600">Manajemen PJ Matkul dan KM Kelas per semester</p>
                </div>
                <Link href="/dashboard/pj-km/create"
                    className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined">add</span>
                    <span>Tambah Data</span>
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <form className="flex flex-wrap gap-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Filter Semester</label>
                        <select
                            name="semester"
                            defaultValue={semester}
                            // Auto-submit on change is handled via client-side usually, but for server component we use a button or client component wrapper. 
                            // To match PHP 'onchange' behavior simply, we can use a client component for the filter controls.
                            // For now, let's use a standard submit or just links. But better: Client Component wrapper.
                            // I will use a simple form with auto-submit script or button. 
                            // Let's use a simple button "Terapkan" or just Links which is cleaner for NextJS.
                            className="bg-white px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-w-[150px]"
                        >
                            <option value="all">Semua Semester</option>
                            {[...Array(8)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Filter Role</label>
                        <select
                            name="role"
                            defaultValue={role}
                            className="bg-white px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-w-[150px]"
                        >
                            <option value="all">Semua Role</option>
                            <option value="PJ Matkul">PJ Matkul</option>
                            <option value="KM Kelas">KM Kelas</option>
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button type="submit" className="px-5 py-2.5 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors">
                            Filter
                        </button>
                    </div>
                    {(semester !== 'all' || role !== 'all') && (
                        <div className="flex items-end">
                            <Link href="/dashboard/pj-km" className="px-4 py-2 text-primary hover:underline font-medium">
                                Reset Filter
                            </Link>
                        </div>
                    )}
                </form>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-sm font-bold text-slate-700">Foto</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-700">Nama</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-700">NIM</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-700">Kelas</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-700">Role</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-700">Matkul</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-700">Semester</th>
                            <th className="px-6 py-4 text-right text-sm font-bold text-slate-700">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {!pjKmList || pjKmList.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <span className="material-symbols-outlined text-6xl text-slate-300">school</span>
                                        <p className="text-slate-500 font-medium">Belum ada data PJ Matkul-KM Kelas</p>
                                        <Link href="/dashboard/pj-km/create"
                                            className="mt-2 flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-bold text-sm transition-all">
                                            <span className="material-symbols-outlined !text-base">add</span>
                                            <span>Tambah Data Pertama</span>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            pjKmList.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        {item.photo_url ? (
                                            <img src={item.photo_url} alt={item.name} className="w-12 h-12 rounded-full object-cover border-2 border-slate-200" />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center border-2 border-primary/20">
                                                <span className="material-symbols-outlined text-primary">person</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-slate-900">{item.name}</span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-700">{item.nim}</td>
                                    <td className="px-6 py-4 text-slate-700">{item.kelas}</td>
                                    <td className="px-6 py-4">
                                        {item.role === 'PJ Matkul' ? (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                                <span className="material-symbols-outlined !text-sm">book</span>
                                                PJ Matkul
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                                <span className="material-symbols-outlined !text-sm">groups</span>
                                                KM Kelas
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-slate-700">
                                        {item.matkul || <span className="text-slate-400">-</span>}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-slate-900">Semester {item.semester}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/dashboard/pj-km/edit/${item.id}`}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                                <span className="material-symbols-outlined !text-xl">edit</span>
                                            </Link>
                                            <PjKmDeleteButton id={item.id} name={item.name} role={item.role} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
