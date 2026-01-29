import PublicLayout from '@/components/layout/PublicLayout'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Tentang Kami',
}

async function getTentangData() {
    const supabase = await createClient()

    const [tentangRes, maskotRes] = await Promise.all([
        supabase.from('tentang_kami').select('*').limit(1).single(),
        supabase.from('maskot').select('*').limit(1).single(),
    ])

    return {
        tentang: tentangRes.data,
        maskot: maskotRes.data,
    }
}

export default async function TentangPage() {
    const { tentang, maskot } = await getTentangData()

    return (
        <div className="font-display">
            <PublicLayout>
                {/* Hero */}
                <div className="relative py-20 bg-slate-900 overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage:
                                "url('https://cdn-1.naquinity.web.id/angkatan/IMG_7080.JPG')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900/80" />
                    <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-black mb-4">
                            Tentang Kami
                        </h1>
                        <p className="text-xl text-slate-300">
                            Mengenal lebih dekat Navindra Equinox Unity
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {/* Tentang Kami Section */}
                    <div className="max-w-4xl mx-auto mb-20">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-12">
                            <div className="mb-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                                    <span className="size-2 rounded-full bg-primary" />
                                    Tentang Kami
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                                    Siapa Kami?
                                </h2>
                            </div>

                            {tentang?.content ? (
                                <div className="prose prose-slate max-w-none">
                                    <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line">
                                        {tentang.content}
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
                                        info
                                    </span>
                                    <p className="text-slate-500">
                                        Konten Tentang Kami belum tersedia
                                    </p>
                                    <p className="text-sm text-slate-400 mt-2">
                                        Silakan tambahkan konten terlebih dahulu
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Maskot Section */}
                    {maskot && (
                        <div id="maskot" className="py-20 lg:py-28">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="order-2 md:order-1 relative">
                                    <div className="aspect-square w-full max-w-md mx-auto bg-slate-50 rounded-[2.5rem] overflow-hidden relative shadow-xl">
                                        {maskot.image_url ? (
                                            <Image
                                                src={maskot.image_url}
                                                alt={maskot.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-slate-100">
                                                <span className="material-symbols-outlined text-8xl text-slate-300">
                                                    emoji_nature
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute -top-6 -left-6 size-24 bg-primary/5 rounded-full blur-2xl -z-10" />
                                    <div className="absolute -bottom-6 -right-6 size-32 bg-blue-200/20 rounded-full blur-2xl -z-10" />
                                </div>

                                <div className="order-1 md:order-2 flex flex-col gap-6 md:pl-10">
                                    <div>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                                            <span className="size-2 rounded-full bg-primary" />
                                            Maskot Kami
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                            Say HI to {maskot.name}!
                                        </h2>
                                    </div>

                                    <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line">
                                        {maskot.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 py-4">
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <span className="material-symbols-outlined text-primary mb-2">
                                                sentiment_satisfied
                                            </span>
                                            <p className="font-bold text-slate-900">Friendly</p>
                                            <p className="text-sm text-slate-500">Selalu menyapa</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <span className="material-symbols-outlined text-primary mb-2">
                                                bolt
                                            </span>
                                            <p className="font-bold text-slate-900">Energetic</p>
                                            <p className="text-sm text-slate-500">Tak kenal lelah</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CTA Section */}
                    <div className="mt-20">
                        <div className="bg-primary rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
                            <div
                                className="absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage:
                                        'radial-gradient(#ffffff 1px, transparent 1px)',
                                    backgroundSize: '24px 24px',
                                }}
                            />
                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    Ingin bekerja sama dengan kami?
                                </h2>
                                <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
                                    Jangan sungkan untuk bertanya apabila Anda memiliki pertanyaan.
                                </p>
                                <div className="flex flex-wrap items-center justify-center gap-4">
                                    <Link
                                        href="/mahasiswa"
                                        className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition shadow-lg"
                                    >
                                        Lihat Anggota
                                    </Link>
                                    <a
                                        href="https://contact.naquinity.web.id/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition"
                                    >
                                        Hubungi Kami
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PublicLayout>
        </div>
    )
}
