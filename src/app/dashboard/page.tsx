import { createClient } from '@supabase/supabase-js'
import { getAdminUser } from '@/lib/dal'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Dashboard Admin',
}

// Create a Supabase client for data fetching (server-side)
// Note: We bypass RLS here assuming Admin has full access, similar to PHP config using service key or just public access?
// But PHP config used the same anon key. If RLS is on, this might fail unless authenticated.
// For parity with PHP which used `supabaseGet` (REST API), we can use the same approach or the Client.
// Since we are server-side, we can use the same credential approach.
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const TABLE_MAHASISWA = 'mahasiswa'
const TABLE_PROGRAM = 'program'
const TABLE_LEVELUP = 'levelup'
const TABLE_PENCAPAIAN = 'pencapaian'
const TABLE_PENGURUS = 'pengurus'

async function getDashboardStats() {
    // Parallel fetching
    const [
        { count: totalMahasiswa },
        { count: totalProgramAktif },
        { count: totalArtikel },
        { count: totalPencapaian },
        { count: totalPengurus },
        { data: recentPrograms },
        { data: recentPencapaian },
        { data: recentArtikel },
    ] = await Promise.all([
        supabase.from(TABLE_MAHASISWA).select('*', { count: 'exact', head: true }),
        supabase.from(TABLE_PROGRAM).select('*', { count: 'exact', head: true }),
        supabase.from(TABLE_LEVELUP).select('*', { count: 'exact', head: true }),
        supabase.from(TABLE_PENCAPAIAN).select('*', { count: 'exact', head: true }),
        supabase.from(TABLE_PENGURUS).select('*', { count: 'exact', head: true }),
        supabase.from(TABLE_PROGRAM).select('*').order('created_at', { ascending: false }).limit(2),
        supabase.from(TABLE_PENCAPAIAN).select('*').order('created_at', { ascending: false }).limit(2),
        supabase.from(TABLE_LEVELUP).select('*').order('created_at', { ascending: false }).limit(1),
    ])

    // Process Recent Activities
    const activities = [
        ...(recentPrograms?.map(p => ({
            type: 'program',
            title: 'Program baru ditambahkan',
            description: p.title,
            time: p.created_at,
            icon: 'calendar_month',
            color: 'blue'
        })) || []),
        ...(recentPencapaian?.map(p => ({
            type: 'pencapaian',
            title: 'Pencapaian baru',
            description: p.title,
            time: p.created_at,
            icon: 'trophy',
            color: 'green'
        })) || []),
        ...(recentArtikel?.map(a => ({
            type: 'artikel',
            title: 'Artikel baru dipublikasikan',
            description: a.title,
            time: a.created_at,
            icon: 'article',
            color: 'orange'
        })) || [])
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
        .slice(0, 5)

    return {
        totalMahasiswa: totalMahasiswa || 0,
        totalProgramAktif: totalProgramAktif || 0,
        totalArtikel: totalArtikel || 0,
        totalPencapaian: totalPencapaian || 0,
        totalPengurus: totalPengurus || 0,
        recentActivities: activities
    }
}

// Stats Card Component
function StatsCard({ title, value, label, icon, gradient, color }: any) {
    return (
        <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow`}>
            <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">{icon}</span>
                </div>
                <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">{label}</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{value.toLocaleString()}</h3>
            <p className={`text-${color}-100 text-sm`}>{title}</p>
        </div>
    )
}

function timeAgo(dateString: string) {
    const seconds = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " tahun yang lalu";

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " bulan yang lalu";

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " hari yang lalu";

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " jam yang lalu";

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " menit yang lalu";

    return "Baru saja";
}

export default async function DashboardPage() {
    const user = await getAdminUser()
    const stats = await getDashboardStats()

    return (
        <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-primary mb-2">
                    Selamat Datang, {user?.name}! 👋
                </h2>
                <p className="text-slate-600">
                    Berikut adalah ringkasan aktivitas Naquinity hari ini.
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    title="Total Mahasiswa"
                    value={stats.totalMahasiswa}
                    label="Total"
                    icon="groups"
                    gradient="from-blue-500 to-blue-600"
                    color="blue"
                />
                <StatsCard
                    title="Program Tersedia"
                    value={stats.totalProgramAktif}
                    label="Aktif"
                    icon="calendar_month"
                    gradient="from-green-500 to-green-600"
                    color="green"
                />
                <StatsCard
                    title="Artikel Level-up"
                    value={stats.totalArtikel}
                    label="Published"
                    icon="article"
                    gradient="from-orange-500 to-orange-600"
                    color="orange"
                />
                <StatsCard
                    title="Pencapaian"
                    value={stats.totalPencapaian}
                    label="Total"
                    icon="trophy"
                    gradient="from-purple-500 to-purple-600"
                    color="purple"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activities */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-lg text-slate-900">
                                Aktivitas Terbaru
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">
                                Update terkini dari database
                            </p>
                        </div>
                    </div>
                    <div className="p-6">
                        {stats.recentActivities.length === 0 ? (
                            <div className="text-center py-12">
                                <span className="material-symbols-outlined text-5xl text-slate-300 mb-3">
                                    inbox
                                </span>
                                <p className="text-slate-500">Belum ada aktivitas</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {stats.recentActivities.map((activity, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-lg transition">
                                        <div className={`w-10 h-10 rounded-full bg-${activity.color}-100 flex items-center justify-center flex-shrink-0`}>
                                            <span className={`material-symbols-outlined text-${activity.color}-600 !text-lg`}>
                                                {activity.icon}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-slate-900">
                                                {activity.title}
                                            </p>
                                            <p className="text-sm text-slate-600 mt-1">
                                                {activity.description}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-2">
                                                {timeAgo(activity.time)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="p-6 border-b border-slate-200">
                        <h3 className="font-bold text-lg text-slate-900">Quick Actions</h3>
                        <p className="text-sm text-slate-500 mt-1">Akses cepat menu utama</p>
                    </div>
                    <div className="p-6 space-y-3">
                        <Link href="/dashboard/program" className="flex items-center gap-3 p-4 bg-primary hover:bg-primary-hover text-white rounded-xl transition group">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <span className="material-symbols-outlined">add</span>
                            </div>
                            <div>
                                <p className="font-bold text-sm">Tambah Program</p>
                                <p className="text-xs opacity-80">Buat event komunitas baru</p>
                            </div>
                        </Link>

                        <Link href="/dashboard/tentang" className="flex items-center gap-3 p-4 border-2 border-slate-200 hover:border-primary rounded-xl transition group">
                            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                <span className="material-symbols-outlined text-slate-600">edit</span>
                            </div>
                            <div>
                                <p className="font-bold text-sm text-slate-900">Update Tentang Kami</p>
                                <p className="text-xs text-slate-500">Kelola informasi profil</p>
                            </div>
                        </Link>

                        <Link href="/dashboard/mahasiswa" className="flex items-center gap-3 p-4 border-2 border-slate-200 hover:border-primary rounded-xl transition group">
                            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                <span className="material-symbols-outlined text-slate-600">groups</span>
                            </div>
                            <div>
                                <p className="font-bold text-sm text-slate-900">Kelola Mahasiswa</p>
                                <p className="text-xs text-slate-500">Atur data anggota: {stats.totalMahasiswa} orang</p>
                            </div>
                        </Link>

                        <Link href="/dashboard/pengurus" className="flex items-center gap-3 p-4 border-2 border-slate-200 hover:border-primary rounded-xl transition group">
                            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                <span className="material-symbols-outlined text-slate-600">shield_person</span>
                            </div>
                            <div>
                                <p className="font-bold text-sm text-slate-900">Kelola Pengurus</p>
                                <p className="text-xs text-slate-500">Total: {stats.totalPengurus} pengurus</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
