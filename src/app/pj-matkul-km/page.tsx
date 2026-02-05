import PublicLayout from '@/components/layout/PublicLayout'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import type { PjKm } from '@/types/database'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'PJ Matkul & KM',
}

async function getPjKm(semester: string) {
    const supabase = await createClient()
    let query = supabase
        .from('pj_km')
        .select('*')
        .order('semester', { ascending: true })
        .order('role', { ascending: true })
        .order('name', { ascending: true })

    if (semester !== 'all') {
        query = query.eq('semester', parseInt(semester))
    }

    const { data } = await query
    return (data as PjKm[]) || []
}

export default async function PjMatkulKmPage({
    searchParams,
}: {
    searchParams: Promise<{ semester?: string }>
}) {
    const { semester = 'all' } = await searchParams
    const pjKmList = await getPjKm(semester)

    return (
        <div className="font-display">
            <PublicLayout>
                {/* Hero */}
                <div className="relative py-20 bg-slate-900 overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage:
                                "url('https://cdn-1.naquinity.web.id/angkatan/IMG_6273.JPG  ')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900/80" />
                    <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-black mb-4">
                            PJ Matkul & KM Kelas
                        </h1>
                        <p className="text-xl text-slate-300">
                            Penanggung Jawab Mata Kuliah dan Kepala Mahasiswa Kelas PSTI 24
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {/* Filter */}
                    <div className="mb-8 flex justify-center">
                        <div className="flex flex-wrap justify-center items-center gap-2 bg-white rounded-xl border border-slate-200 p-2 shadow-sm">
                            <span className="text-sm font-bold text-slate-700 px-2">Filter Semester:</span>
                            <a href="/pj-matkul-km?semester=all"
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${semester === 'all' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-primary'
                                    }`}>
                                Semua
                            </a>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                                <a
                                    key={sem}
                                    href={`/pj-matkul-km?semester=${sem}`}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${parseInt(semester) === sem ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-primary'
                                        }`}
                                >
                                    Sem {sem}
                                </a>
                            ))}
                        </div>
                    </div>

                    {pjKmList.length === 0 ? (
                        <div className="text-center py-20">
                            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
                                school
                            </span>
                            <h3 className="text-2xl font-bold text-slate-600 mb-2">
                                Belum ada data
                            </h3>
                            <p className="text-slate-500">
                                Data PJ Matkul dan KM Kelas akan ditampilkan di sini
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {pjKmList.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all group"
                                >
                                    {item.photo_url ? (
                                        <div className="aspect-square bg-slate-100 overflow-hidden relative">
                                            <Image
                                                src={item.photo_url}
                                                alt={item.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    ) : (
                                        <div className="aspect-square bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-8xl text-white">
                                                person
                                            </span>
                                        </div>
                                    )}

                                    <div className="p-6 text-center">
                                        {/* Role Badge */}
                                        {item.role === 'PJ Matkul' ? (
                                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold mb-3">
                                                <span className="material-symbols-outlined !text-sm">book</span>
                                                <span>PJ Matkul</span>
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold mb-3">
                                                <span className="material-symbols-outlined !text-sm">groups</span>
                                                <span>KM Kelas</span>
                                            </div>
                                        )}

                                        <h3 className="font-bold text-lg text-slate-900 mb-1">
                                            {item.name}
                                        </h3>
                                        <p className="text-xs text-slate-500 font-mono mb-4">
                                            {item.nim}
                                        </p>

                                        {/* Additional Info */}
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center justify-center gap-2 text-slate-600">
                                                <span className="material-symbols-outlined !text-base">school</span>
                                                <span>Kelas {item.kelas}</span>
                                            </div>
                                            {item.matkul && (
                                                <div className="flex items-center justify-center gap-2 text-slate-600">
                                                    <span className="material-symbols-outlined !text-base">menu_book</span>
                                                    <span className="font-medium">{item.matkul}</span>
                                                </div>
                                            )}
                                            <div className="inline-flex items-center justify-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium mt-3">
                                                <span>Semester {item.semester}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </PublicLayout>
        </div>
    )
}
