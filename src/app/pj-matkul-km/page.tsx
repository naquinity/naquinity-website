import PublicLayout from '@/components/layout/PublicLayout'
import { createClient } from '@/lib/supabase/server'
import type { PjKm } from '@/types/database'
import { Metadata } from 'next'
import PjKmCard from './PjKmCard'

export const metadata: Metadata = {
    title: 'PJ Matkul & KM',
}

import Pagination from '@/components/ui/Pagination'

const ITEMS_PER_PAGE = 20

async function getPjKm(semester: string, page: number = 1) {
    const supabase = await createClient()

    // Base query
    let query = supabase
        .from('pj_km')
        .select('*', { count: 'exact' })

    if (semester !== 'all') {
        query = query.eq('semester', parseInt(semester))
    }

    // Get count first
    const { count } = await query

    // Get paginated data
    let dataQuery = supabase
        .from('pj_km')
        .select('*')
        .order('semester', { ascending: true })
        .order('role', { ascending: true })
        .order('name', { ascending: true })

    if (semester !== 'all') {
        dataQuery = dataQuery.eq('semester', parseInt(semester))
    }

    const { data } = await dataQuery.range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1)

    return {
        data: (data as PjKm[]) || [],
        totalPages: Math.ceil((count || 0) / ITEMS_PER_PAGE),
        currentPage: page,
        totalItems: count || 0
    }
}

export default async function PjMatkulKmPage({
    searchParams,
}: {
    searchParams: Promise<{ semester?: string; page?: string }>
}) {
    const { semester, page = '1' } = await searchParams
    const currentPage = parseInt(page)
    const selectedSemester = semester ? parseInt(semester) : null

    // Only fetch data if a specific semester is selected
    const { data: pjKmList, totalPages } = selectedSemester
        ? await getPjKm(semester!, currentPage)
        : { data: [], totalPages: 0 }

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
                            <span className="text-sm font-bold text-slate-700 px-2">Pilih Semester:</span>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                                <a
                                    key={sem}
                                    href={`/pj-matkul-km?semester=${sem}`}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedSemester === sem ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-primary'
                                        }`}
                                >
                                    Sem {sem}
                                </a>
                            ))}
                        </div>
                    </div>

                    {!selectedSemester ? (
                        <div className="text-center py-20 animate-in fade-in zoom-in-95 duration-500">
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6">
                                <span className="material-symbols-outlined text-5xl text-primary">
                                    library_books
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">
                                Silakan Pilih Semester
                            </h3>
                            <p className="text-slate-500 max-w-md mx-auto text-lg">
                                Pilih salah satu semester di atas untuk melihat daftar PJ Matkul dan KM Kelas.
                            </p>
                        </div>
                    ) : pjKmList.length === 0 ? (
                        <div className="text-center py-20">
                            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
                                school
                            </span>
                            <h3 className="text-2xl font-bold text-slate-600 mb-2">
                                Belum ada data
                            </h3>
                            <p className="text-slate-500">
                                Data PJ Matkul dan KM Kelas untuk semester ini belum tersedia.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12 animate-in fade-in duration-500">
                                {pjKmList.map((item) => (
                                    <PjKmCard key={item.id} item={item} />
                                ))}
                            </div>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                baseUrl="/pj-matkul-km"
                                searchParams={{ semester: String(selectedSemester) }}
                            />
                        </>
                    )}
                </div>
            </PublicLayout>
        </div>
    )
}
