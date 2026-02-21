import PublicLayout from '@/components/layout/PublicLayout'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Search Engine',
}

export const dynamic = 'force-dynamic'

async function getSearchResults(query: string) {
    if (!query) return null

    const supabase = await createClient()
    const searchPattern = `%${query}%`

    const [
        newsRes,
        mahasiswaRes,
        pengurusRes,
        pencapaianRes,
        programRes,
        matkulRes
    ] = await Promise.all([
        supabase
            .from('levelup')
            .select('id, title, slug, cover_image_url, created_at')
            .or(`title.ilike.${searchPattern},content.ilike.${searchPattern}`)
            .order('created_at', { ascending: false })
            .limit(10),
        supabase
            .from('mahasiswa')
            .select('id, name, nim, photo_url')
            .or(`name.ilike.${searchPattern},nim.ilike.${searchPattern}`)
            .order('name', { ascending: true })
            .limit(10),
        supabase
            .from('pengurus')
            .select('id, name, position, photo_url')
            .or(`name.ilike.${searchPattern},position.ilike.${searchPattern}`)
            .order('name', { ascending: true })
            .limit(10),
        supabase
            .from('pencapaian')
            .select('id, title, image_url, created_at')
            .ilike('title', searchPattern)
            .order('created_at', { ascending: false })
            .limit(10),
        supabase
            .from('program')
            .select('id, title, description, logo_url')
            .ilike('title', searchPattern)
            .order('created_at', { ascending: false })
            .limit(10),
        supabase
            .from('pj_matkul_km')
            .select('id, subject, lecturer')
            .or(`subject.ilike.${searchPattern},lecturer.ilike.${searchPattern}`)
            .order('subject', { ascending: true })
            .limit(10)
    ])

    return {
        news: newsRes.data || [],
        mahasiswa: mahasiswaRes.data || [],
        pengurus: pengurusRes.data || [],
        pencapaian: pencapaianRes.data || [],
        program: programRes.data || [],
        matkul: matkulRes.data || [],
        total: (newsRes.data?.length || 0) + (mahasiswaRes.data?.length || 0) +
            (pengurusRes.data?.length || 0) + (pencapaianRes.data?.length || 0) +
            (programRes.data?.length || 0) + (matkulRes.data?.length || 0)
    }
}

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>
}) {
    const params = await searchParams
    const query = params.q || ''

    const results = await getSearchResults(query)

    return (
        <div className="font-display">
            <PublicLayout>
                {/* Header / Search Area */}
                <div className="bg-slate-900 py-16 md:py-24 border-b border-slate-800">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10">
                        <span className="material-symbols-outlined text-5xl text-blue-500 mb-4 inline-block">
                            manage_search
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black text-white mb-6">
                            Pencarian Website
                        </h1>
                        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                            Cari data konten yang ada di website Naquinity dengan cepat.
                        </p>

                        <form action="/search" method="GET" className="relative max-w-2xl mx-auto">
                            <input
                                type="text"
                                name="q"
                                defaultValue={query}
                                placeholder="Ketik kata kunci pencarian..."
                                className="w-full h-16 pl-6 pr-16 text-lg rounded-2xl border-2 border-slate-700 bg-slate-800 text-white placeholder-slate-500 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all outline-none shadow-xl"
                                autoComplete="off"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="absolute right-3 top-3 bottom-3 w-10 flex items-center justify-center bg-primary hover:bg-primary-hover text-white rounded-xl transition-colors"
                            >
                                <span className="material-symbols-outlined">search</span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Results Area */}
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[40vh]">
                    {!query ? (
                        /* Empty State (No query) */
                        <div className="text-center py-20">
                            <div className="size-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                                <span className="material-symbols-outlined text-4xl">search</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-700 mb-2">Mulai Pencarian</h3>
                            <p className="text-slate-500 max-w-md mx-auto">
                                Ketik kata kunci pada kolom pencarian di atas untuk menemukan konten yang Anda cari di seluruh web Naquinity.
                            </p>
                        </div>
                    ) : results && results.total === 0 ? (
                        /* No Results Found */
                        <div className="text-center py-20">
                            <div className="size-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-300">
                                <span className="material-symbols-outlined text-4xl">travel_explore</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-700 mb-2">Hasil tidak ditemukan!</h3>
                            <p className="text-slate-500 max-w-md mx-auto">
                                Maaf, kami tidak dapat menemukan hasil apapun untuk pencarian <span className="font-semibold text-slate-800">"{query}"</span>. Coba gunakan kata kunci lain.
                            </p>
                        </div>
                    ) : results ? (
                        /* Results Found */
                        <div className="space-y-16">
                            <div className="pb-4 border-b border-slate-200">
                                <p className="text-slate-500">
                                    Ditemukan <strong>{results.total}</strong> hasil pencarian untuk <span className="text-slate-800 font-semibold">"{query}"</span>
                                </p>
                            </div>

                            {/* News Section */}
                            {results.news.length > 0 && (
                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">article</span>
                                        Siaran Pers
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {results.news.map((item) => (
                                            <Link href={`/news/${item.slug}`} key={item.id} className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all flex flex-col sm:flex-row h-full">
                                                {item.cover_image_url && (
                                                    <div className="w-full sm:w-1/3 aspect-video sm:aspect-auto relative shrink-0">
                                                        <Image src={item.cover_image_url} alt={item.title} fill className="object-cover" />
                                                    </div>
                                                )}
                                                <div className="p-4 flex-1">
                                                    <h3 className="font-bold text-slate-900 group-hover:text-primary transition line-clamp-2 mb-2">{item.title}</h3>
                                                    <p className="text-xs text-slate-500">
                                                        {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Mahasiswa Section */}
                            {results.mahasiswa.length > 0 && (
                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">school</span>
                                        Daftar Mahasiswa
                                    </h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                                        {results.mahasiswa.map((mhs) => (
                                            <Link href="/mahasiswa" key={mhs.id} className="bg-white border border-slate-200 p-4 rounded-xl text-center hover:shadow-md hover:border-primary/30 transition group">
                                                <div className="size-16 mx-auto rounded-full bg-slate-100 mb-3 overflow-hidden border-2 border-white shadow-sm group-hover:border-primary transition relative">
                                                    {mhs.photo_url ? (
                                                        <Image src={mhs.photo_url} alt={mhs.name} fill className="object-cover" />
                                                    ) : (
                                                        <span className="material-symbols-outlined text-3xl text-slate-400 mt-3">person</span>
                                                    )}
                                                </div>
                                                <h4 className="font-bold text-sm text-slate-800 line-clamp-1">{mhs.name}</h4>
                                                <p className="text-xs text-primary font-mono mt-1">{mhs.nim}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Pengurus Section */}
                            {results.pengurus.length > 0 && (
                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">manage_accounts</span>
                                        Daftar Pengurus
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {results.pengurus.map((org) => (
                                            <Link href="/pengurus" key={org.id} className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 hover:shadow-md hover:border-primary/30 transition group">
                                                <div className="size-12 shrink-0 rounded-full bg-slate-100 overflow-hidden relative">
                                                    {org.photo_url ? (
                                                        <Image src={org.photo_url} alt={org.name} fill className="object-cover" />
                                                    ) : (
                                                        <span className="material-symbols-outlined w-full h-full flex items-center justify-center text-slate-400">person</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-primary transition">{org.name}</h4>
                                                    <p className="text-xs text-slate-500 line-clamp-1">{org.position}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Program Section */}
                            {results.program.length > 0 && (
                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">emoji_objects</span>
                                        Program Kami
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {results.program.map((prog) => (
                                            <Link href="/program" key={prog.id} className="bg-white rounded-xl p-5 border border-slate-200 hover:border-primary/30 hover:shadow-md transition group">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="bg-blue-50 p-2 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition">
                                                        <span className="material-symbols-outlined">event</span>
                                                    </div>
                                                </div>
                                                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-primary transition">{prog.title}</h3>
                                                <p className="text-sm text-slate-500 line-clamp-2">{prog.description}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Pencapaian Section */}
                            {results.pencapaian.length > 0 && (
                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">emoji_events</span>
                                        Pencapaian
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {results.pencapaian.map((achieve) => (
                                            <Link href="/pencapaian" key={achieve.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md hover:border-primary/30 transition group">
                                                {achieve.image_url ? (
                                                    <div className="aspect-video relative bg-slate-100">
                                                        <Image src={achieve.image_url} alt={achieve.title} fill className="object-cover" />
                                                    </div>
                                                ) : (
                                                    <div className="aspect-video bg-slate-100 flex items-center justify-center text-slate-400">
                                                        <span className="material-symbols-outlined text-3xl">image</span>
                                                    </div>
                                                )}
                                                <div className="p-3">
                                                    <h4 className="font-bold text-sm text-slate-800 line-clamp-2 group-hover:text-primary transition">{achieve.title}</h4>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* PJ Matkul Section */}
                            {results.matkul.length > 0 && (
                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">menu_book</span>
                                        PJ Mata Kuliah
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {results.matkul.map((mk) => (
                                            <Link href="/pj-matkul-km" key={mk.id} className="bg-white border border-slate-200 p-4 rounded-xl hover:shadow-md hover:border-primary/30 transition group">
                                                <h4 className="font-bold text-slate-800 mb-1 group-hover:text-primary transition">{mk.subject}</h4>
                                                <div className="flex items-center gap-1 text-sm text-slate-500">
                                                    <span className="material-symbols-outlined !text-[16px]">person</span>
                                                    <span>Dosen: {mk.lecturer}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}

                        </div>
                    ) : null}
                </div>
            </PublicLayout>
        </div>
    )
}
