import PublicLayout from '@/components/layout/PublicLayout'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import type { LevelUp } from '@/types/database'
import { Metadata } from 'next'
import Pagination from '@/components/ui/Pagination'

export const metadata: Metadata = {
    title: 'Siaran Pers',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

const ITEMS_PER_PAGE = 12

async function getLevelUp(page: number = 1) {
    const supabase = await createClient()
    console.log('Fetching news articles...')

    // Get total count
    const { count } = await supabase
        .from('levelup')
        .select('*', { count: 'exact', head: true })

    // Get paginated data
    const { data, error } = await supabase
        .from('levelup')
        .select('*')
        .order('created_at', { ascending: false })
        .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1)

    if (error) {
        console.error('Error fetching news:', error)
    }

    return {
        data: (data as LevelUp[]) || [],
        totalPages: Math.ceil((count || 0) / ITEMS_PER_PAGE),
        currentPage: page,
        totalItems: count || 0
    }
}

export default async function LevelUpPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>
}) {
    const params = await searchParams
    const page = Number(params?.page) || 1
    const { data: articles, totalPages, currentPage } = await getLevelUp(page)

    return (
        <div className="font-display">
            <PublicLayout>
                {/* Hero */}
                <div className="relative py-20 bg-slate-900 overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage:
                                "url('https://cdn-1.naquinity.web.id/angkatan/IMG_6277.JPG')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900/80" />
                    <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-black mb-4">Siaran Pers</h1>
                        <p className="text-xl text-slate-300">
                            Berita terbaru seputar Naquinity
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {articles.length === 0 ? (
                        <div className="text-center py-20">
                            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">
                                article
                            </span>
                            <h3 className="text-2xl font-bold text-slate-600 mb-2">
                                Belum ada artikel
                            </h3>
                            <p className="text-slate-500">Artikel akan ditampilkan di sini</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                {articles.map((article) => (
                                    <article
                                        key={article.id}
                                        className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all group"
                                    >
                                        {article.cover_image_url ? (
                                            <div className="relative aspect-video bg-slate-100 overflow-hidden">
                                                <Image
                                                    src={article.cover_image_url}
                                                    alt={article.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        ) : (
                                            <div className="aspect-video bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-6xl text-white">
                                                    article
                                                </span>
                                            </div>
                                        )}

                                        <div className="p-6">
                                            <div className="mb-4">
                                                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                                                    <span className="material-symbols-outlined !text-sm">
                                                        person
                                                    </span>
                                                    <span>{article.author_name}</span>
                                                </div>

                                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition line-clamp-2">
                                                    {article.title}
                                                </h3>
                                                <p className="text-slate-600 text-sm line-clamp-3">
                                                    {article.content.substring(0, 150)}...
                                                </p>
                                            </div>

                                            <div className="pt-4 border-t border-slate-100">
                                                <div className="pt-4 border-t border-slate-100">
                                                    <Link href={`/news/${article.slug}`} className="text-primary font-semibold text-sm hover:underline cursor-pointer">
                                                        Baca selengkapnya →
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                baseUrl="/news"
                            />
                        </>
                    )}
                </div>
            </PublicLayout>
        </div>
    )
}
