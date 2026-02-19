import PublicLayout from '@/components/layout/PublicLayout'
import { createClient } from '@/lib/supabase/server'
import type { Mahasiswa } from '@/types/database'
import MahasiswaCard from '../MahasiswaCard'
import SearchInput from '@/components/ui/SearchInput'
import Link from 'next/link'
import { Suspense } from 'react';

export const dynamic = 'force-dynamic'

async function getSearchResults(query: string) {
    if (!query) return []

    const supabase = await createClient()
    const { data } = await supabase
        .from('mahasiswa')
        .select('*')
        .or(`name.ilike.%${query}%,nim.ilike.%${query}%`)
        .order('name', { ascending: true })

    return (data as Mahasiswa[]) || []
}

async function SearchResults({ query }: { query: string }) {
    const results = await getSearchResults(query)

    if (results.length === 0) {
        return (
            <div className="text-center py-20">
                <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
                    search_off
                </span>
                <h3 className="text-2xl font-bold text-slate-600 mb-2">
                    Tidak ditemukan
                </h3>
                <p className="text-slate-500">
                    Tidak ada mahasiswa yang cocok dengan kata kunci "{query}"
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {results.map((mhs) => (
                <MahasiswaCard key={mhs.id} mhs={mhs} />
            ))}
        </div>
    )
}

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>
}) {
    const params = await searchParams
    const query = params?.q || ''

    return (
        <div className="font-display">
            <PublicLayout>
                <div className="relative py-20 bg-slate-900 overflow-hidden">
                    <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                        <Link
                            href="/mahasiswa"
                            className="inline-flex items-center text-sm text-slate-400 hover:text-white mb-6 transition-colors"
                        >
                            <span className="material-symbols-outlined text-lg mr-1">arrow_back</span>
                            Kembali ke Daftar Semua
                        </Link>

                        <h1 className="text-3xl md:text-4xl font-black mb-4">
                            Hasil Pencarian
                        </h1>
                        <p className="text-xl text-slate-300 mb-8">
                            Menampilkan hasil untuk "{query}"
                        </p>

                        <Suspense fallback={<div className="w-full max-w-md mx-auto h-12 bg-white/10 rounded-full animate-pulse" />}>
                            <SearchInput placeholder="Cari nama atau NIM..." />
                        </Suspense>
                    </div>
                </div>

                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <Suspense fallback={
                        <div className="w-full h-40 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    }>
                        <SearchResults query={query} />
                    </Suspense>
                </div>
            </PublicLayout>
        </div>
    )
}
