import { createClient } from '@supabase/supabase-js'
import { getUserUser } from '@/lib/dal'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Dashboard Mahasiswa',
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const TABLE_MAHASISWA = 'mahasiswa'
const TABLE_PROGRAM = 'program'
const TABLE_PENCAPAIAN = 'pencapaian'

async function getDashboardStats() {
    const [
        { count: programCount },
        { count: mahasiswaCount },
        { count: pencapaianCount },
    ] = await Promise.all([
        supabase.from(TABLE_PROGRAM).select('*', { count: 'exact', head: true }),
        supabase.from(TABLE_MAHASISWA).select('*', { count: 'exact', head: true }),
        supabase.from(TABLE_PENCAPAIAN).select('*', { count: 'exact', head: true }),
    ])

    return {
        programCount: programCount || 0,
        mahasiswaCount: mahasiswaCount || 0,
        pencapaianCount: pencapaianCount || 0,
    }
}

export default async function UserDashboardPage() {
    const user = await getUserUser()
    const stats = await getDashboardStats()

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                    Selamat Datang, {user?.name}!
                </h2>
                <p className="text-sm sm:text-base text-slate-600">
                    Dashboard untuk melihat informasi program dan kegiatan Naquinity
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border-l-4 border-teal-500">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="p-2 sm:p-3 bg-teal-100 rounded-xl">
                            <span className="material-symbols-outlined text-xl sm:text-2xl text-teal-600">
                                view_agenda
                            </span>
                        </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mb-1">
                        Total Program
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                        {stats.programCount}
                    </h3>
                </div>

                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border-l-4 border-cyan-500">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="p-2 sm:p-3 bg-cyan-100 rounded-xl">
                            <span className="material-symbols-outlined text-xl sm:text-2xl text-cyan-600">
                                groups
                            </span>
                        </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mb-1">
                        Total Mahasiswa
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                        {stats.mahasiswaCount}
                    </h3>
                </div>

                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border-l-4 border-emerald-500">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="p-2 sm:p-3 bg-emerald-100 rounded-xl">
                            <span className="material-symbols-outlined text-xl sm:text-2xl text-emerald-600">
                                emoji_events
                            </span>
                        </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mb-1">
                        Total Pencapaian
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                        {stats.pencapaianCount}
                    </h3>
                </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6">
                    Akses Cepat
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                    <Link
                        href="/user/dashboard/program"
                        className="p-4 sm:p-6 border-2 border-teal-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition group"
                    >
                        <span className="material-symbols-outlined text-2xl sm:text-3xl text-teal-600 mb-2 block">
                            view_agenda
                        </span>
                        <h4 className="font-bold text-slate-900 mb-1 text-sm sm:text-base">
                            Lihat Program
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600">
                            Jelajahi program kami
                        </p>
                    </Link>
                    <Link
                        href="/user/dashboard/mahasiswa"
                        className="p-4 sm:p-6 border-2 border-cyan-200 rounded-xl hover:border-cyan-500 hover:bg-cyan-50 transition"
                    >
                        <span className="material-symbols-outlined text-2xl sm:text-3xl text-cyan-600 mb-2 block">
                            groups
                        </span>
                        <h4 className="font-bold text-slate-900 mb-1 text-sm sm:text-base">
                            Daftar Mahasiswa
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600">Lihat anggota</p>
                    </Link>
                    <Link
                        href="/user/dashboard/pencapaian"
                        className="p-4 sm:p-6 border-2 border-emerald-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition"
                    >
                        <span className="material-symbols-outlined text-2xl sm:text-3xl text-emerald-600 mb-2 block">
                            emoji_events
                        </span>
                        <h4 className="font-bold text-slate-900 mb-1 text-sm sm:text-base">
                            Pencapaian
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600">Prestasi kami</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
