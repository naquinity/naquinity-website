import PublicLayout from '@/components/layout/PublicLayout'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import type { Pencapaian } from '@/types/database'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Pencapaian',
}

async function getPencapaian() {
    const supabase = await createClient()
    const { data } = await supabase
        .from('pencapaian')
        .select('*')
        .order('created_at', { ascending: false })

    return (data as Pencapaian[]) || []
}

export default async function PencapaianPage() {
    const pencapaian = await getPencapaian()

    return (
        <div className="font-display">
            <PublicLayout>
                {/* Hero */}
                <div className="relative py-20 bg-slate-900 overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage:
                                "url('https://cdn-1.naquinity.web.id/angkatan/IMG_7173.JPG')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900/80" />
                    <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-black mb-4">Pencapaian</h1>
                        <p className="text-xl text-slate-300">
                            Prestasi dan pencapaian yang diraih oleh anggota Naquinity
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {pencapaian.length === 0 ? (
                        <div className="text-center py-20">
                            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
                                trophy
                            </span>
                            <h3 className="text-2xl font-bold text-slate-600 mb-2">
                                Belum ada pencapaian
                            </h3>
                            <p className="text-slate-500">
                                Pencapaian akan ditampilkan di sini
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {pencapaian.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all group"
                                >
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            {item.person_photo_url ? (
                                                <Image
                                                    src={item.person_photo_url}
                                                    alt={item.person_name}
                                                    width={64}
                                                    height={64}
                                                    className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                                                    <span className="material-symbols-outlined text-2xl text-primary">
                                                        person
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <p className="font-bold text-slate-900">
                                                    {item.person_name}
                                                </p>
                                                {item.person_nim && (
                                                    <p className="text-xs text-slate-500">
                                                        {item.person_nim}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold mb-3">
                                                <span className="material-symbols-outlined !text-sm">
                                                    trophy
                                                </span>
                                                Pencapaian
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition">
                                                {item.title}
                                            </h3>
                                            <p className="text-slate-600 text-sm line-clamp-3">
                                                {item.description}
                                            </p>
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
