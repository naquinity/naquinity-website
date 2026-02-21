import PublicLayout from '@/components/layout/PublicLayout'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { LevelUp } from '@/types/database'
import { Metadata } from 'next'
import ShareButtons from '@/components/ui/ShareButtons'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params
    const supabase = await createClient()
    const { data: article } = await supabase
        .from('levelup')
        .select('title')
        .eq('slug', slug)
        .single()

    return {
        title: article?.title || 'Level Up Detail',
    }
}

export default async function LevelUpDetailPage({ params }: { params: Params }) {
    const { slug } = await params
    const supabase = await createClient()

    const { data: article, error } = await supabase
        .from('levelup')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error) {
        console.error('[LevelUpDetail] Error fetching article:', error)
    }

    if (!article) {
        notFound()
    }

    const levelUpArticle = article as LevelUp

    return (
        <div className="font-display">
            <PublicLayout>
                <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                        <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
                        <span className="material-symbols-outlined !text-sm">chevron_right</span>
                        <Link href="/news" className="hover:text-primary transition-colors">News</Link>
                        <span className="material-symbols-outlined !text-sm">chevron_right</span>
                        <span className="font-semibold text-slate-800 line-clamp-1">{levelUpArticle.title}</span>
                    </div>

                    <article>
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                                {levelUpArticle.title}
                            </h1>

                            <div className="flex items-center gap-4 text-sm text-slate-600 border-b border-slate-100 pb-8">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined !text-lg text-primary">person</span>
                                    <span className="font-medium">{levelUpArticle.author_name}</span>
                                </div>
                                <span className="text-slate-300">•</span>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined !text-lg text-primary">calendar_today</span>
                                    <span>{new Date(levelUpArticle.created_at).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}</span>
                                </div>
                            </div>
                        </div>

                        {/* Cover Image */}
                        {levelUpArticle.cover_image_url && (
                            <div className="mb-10 rounded-2xl overflow-hidden shadow-lg">
                                <div className="relative aspect-video">
                                    <Image
                                        src={levelUpArticle.cover_image_url}
                                        alt={levelUpArticle.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1000px) 100vw, 1000px"
                                        priority
                                    />
                                </div>
                            </div>
                        )}

                        {/* Content */}
                        <div className="prose prose-lg prose-slate max-w-none">
                            <div className="whitespace-pre-wrap leading-relaxed text-slate-700">
                                {levelUpArticle.content}
                            </div>
                        </div>

                        {/* Share Buttons */}
                        <ShareButtons title={levelUpArticle.title} />

                        {/* Back Button */}
                        <div className="mt-12 pt-8 border-t border-slate-200">
                            <Link
                                href="/news"
                                className="inline-flex items-center gap-2 text-primary font-bold hover:underline transition-all group"
                            >
                                <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
                                Kembali ke News
                            </Link>
                        </div>
                    </article>
                </div>
            </PublicLayout>
        </div>
    )
}
