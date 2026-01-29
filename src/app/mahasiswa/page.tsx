import PublicLayout from '@/components/layout/PublicLayout'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import type { Mahasiswa } from '@/types/database'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Mahasiswa',
}

async function getMahasiswa() {
    const supabase = await createClient()
    const { data } = await supabase
        .from('mahasiswa')
        .select('*')
        .order('name', { ascending: true })

    return (data as Mahasiswa[]) || []
}

export default async function MahasiswaPage() {
    const mahasiswa = await getMahasiswa()

    return (
        <div className="font-display">
            <PublicLayout>
                {/* Hero */}
                <div className="relative py-20 bg-slate-900 overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage:
                                "url('https://cdn-1.naquinity.web.id/angkatan/IMG_6267.JPG')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900/80" />
                    <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-black mb-4">
                            Anggota Naquinity
                        </h1>
                        <p className="text-xl text-slate-300">
                            Berikut ini adalah daftar mahasiswa PSTI 24
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {mahasiswa.length === 0 ? (
                        <div className="text-center py-20">
                            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
                                groups
                            </span>
                            <h3 className="text-2xl font-bold text-slate-600 mb-2">
                                Belum ada mahasiswa
                            </h3>
                            <p className="text-slate-500">
                                Data mahasiswa akan ditampilkan di sini
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {mahasiswa.map((mhs) => (
                                <div
                                    key={mhs.id}
                                    className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:border-primary/30 transition-all text-center group"
                                >
                                    {mhs.photo_url ? (
                                        <div className="relative w-24 h-24 mx-auto mb-4">
                                            <Image
                                                src={mhs.photo_url}
                                                alt={mhs.name}
                                                fill
                                                className="object-cover rounded-full border-2 border-slate-200 group-hover:border-primary transition"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border-2 border-primary/20">
                                            <span className="material-symbols-outlined text-5xl text-primary">
                                                person
                                            </span>
                                        </div>
                                    )}

                                    <h3 className="font-bold text-slate-900 mb-1">
                                        {mhs.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 font-mono mb-2">
                                        {mhs.nim}
                                    </p>

                                    {mhs.quote && (
                                        <p className="text-slate-500 text-sm italic text-center mt-3 line-clamp-2">
                                            "{mhs.quote}"
                                        </p>
                                    )}

                                    {mhs.email && (
                                        <a
                                            href={`mailto:${mhs.email}`}
                                            className="text-xs text-primary hover:underline flex items-center justify-center gap-1 mt-3"
                                        >
                                            <span className="material-symbols-outlined !text-sm">
                                                email
                                            </span>
                                            Email
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </PublicLayout>
        </div>
    )
}
