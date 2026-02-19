import PublicLayout from '@/components/layout/PublicLayout'
import { createClient } from '@/lib/supabase/server'

import type { Mahasiswa } from '@/types/database'
import MahasiswaCard from './MahasiswaCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Mahasiswa',
}

const ITEMS_PER_PAGE = 20

import { Suspense } from 'react'
import SearchInput from '@/components/ui/SearchInput'

// ... imports

async function getMahasiswa(page: number = 1) {
    const supabase = await createClient()

    // Get total count
    const { count } = await supabase
        .from('mahasiswa')
        .select('*', { count: 'exact', head: true })

    // Get paginated data
    const { data } = await supabase
        .from('mahasiswa')
        .select('*')
        .order('name', { ascending: true })
        .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1)

    return {
        data: (data as Mahasiswa[]) || [],
        totalPages: Math.ceil((count || 0) / ITEMS_PER_PAGE),
        currentPage: page,
        totalItems: count || 0
    }
}

export default async function MahasiswaPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>
}) {
    const params = await searchParams
    const page = Number(params?.page) || 1
    const { data: mahasiswa, totalPages, currentPage } = await getMahasiswa(page)

    return (
        <div className="font-display">
            <PublicLayout>
                {/* Hero */}
                <div className="relative py-20 bg-slate-900 overflow-hidden">
                    {/* ... hero content ... */}
                    <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-black mb-4">
                            Anggota Naquinity
                        </h1>
                        <p className="text-xl text-slate-300 mb-8">
                            Berikut ini adalah daftar mahasiswa PSTI 24
                        </p>

                        {/* Search Input */}
                        <Suspense fallback={<div className="w-full max-w-md mx-auto h-12 bg-white/10 rounded-full animate-pulse" />}>
                            <SearchInput placeholder="Cari berdasarkan nama atau NIM..." />
                        </Suspense>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {mahasiswa.length === 0 ? (
                        <div className="text-center py-20">
                            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
                                search_off
                            </span>
                            <h3 className="text-2xl font-bold text-slate-600 mb-2">
                                Data tidak ditemukan
                            </h3>
                            <p className="text-slate-500">
                                Coba cari dengan kata kunci lain
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                                {mahasiswa.map((mhs) => (
                                    <MahasiswaCard key={mhs.id} mhs={mhs} />
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-12">
                                    {/* Previous Button */}
                                    {currentPage > 1 ? (
                                        <a
                                            href={`/mahasiswa?page=${currentPage - 1}`}
                                            className="px-3 py-1 text-sm text-primary hover:underline font-medium"
                                        >
                                            Sebelumnya
                                        </a>
                                    ) : (
                                        <span className="px-3 py-1 text-sm text-slate-400 font-medium cursor-default">
                                            Sebelumnya
                                        </span>
                                    )}

                                    {/* Page Numbers */}
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                            <a
                                                key={pageNum}
                                                href={`/mahasiswa?page=${pageNum}`}
                                                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all ${currentPage === pageNum
                                                    ? 'bg-primary text-white'
                                                    : 'text-primary hover:bg-primary/10'
                                                    }`}
                                            >
                                                {pageNum}
                                            </a>
                                        ))}
                                    </div>

                                    {/* Next Button */}
                                    {currentPage < totalPages ? (
                                        <a
                                            href={`/mahasiswa?page=${currentPage + 1}`}
                                            className="px-3 py-1 text-sm text-primary hover:underline font-medium"
                                        >
                                            Berikutnya
                                        </a>
                                    ) : (
                                        <span className="px-3 py-1 text-sm text-slate-400 font-medium cursor-default">
                                            Berikutnya
                                        </span>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </PublicLayout>
        </div>
    )
}
