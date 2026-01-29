import PublicLayout from '@/components/layout/PublicLayout'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import type { Pengurus } from '@/types/database'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Pengurus',
}

async function getPengurus() {
    const supabase = await createClient()
    const { data } = await supabase
        .from('pengurus')
        .select('*')
        .order('created_at', { ascending: false }) // Changed to descending

    return (data as Pengurus[]) || []
}

export default async function PengurusPage() {
    const pengurus = await getPengurus()

    return (
        <div className="font-display">
            <PublicLayout>
                {/* Hero */}
                <div className="relative py-20 bg-slate-900 overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage:
                                "url('https://cdn-1.naquinity.web.id/angkatan/IMG_7157.JPG')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900/80" />
                    <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-black mb-4">
                            Pengurus Kami
                        </h1>
                        <p className="text-xl text-slate-300">Pengurus angkatan PSTI 24</p>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {pengurus.length === 0 ? (
                        <div className="text-center py-20">
                            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
                                shield_person
                            </span>
                            <h3 className="text-2xl font-bold text-slate-600 mb-2">
                                Belum ada pengurus
                            </h3>
                            <p className="text-slate-500">
                                Data pengurus akan ditampilkan di sini
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {pengurus.map((p) => (
                                <div
                                    key={p.id}
                                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all group"
                                >
                                    {p.photo_url ? (
                                        <div className="aspect-square bg-slate-100 overflow-hidden relative">
                                            <Image
                                                src={p.photo_url}
                                                alt={p.name}
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
                                        <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-3">
                                            {p.position}
                                        </div>
                                        <h3 className="font-bold text-lg text-slate-900 mb-1">
                                            {p.name}
                                        </h3>
                                        {p.nim && (
                                            <p className="text-xs text-slate-500 font-mono">
                                                {p.nim}
                                            </p>
                                        )}
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
