import PublicLayout from '@/components/layout/PublicLayout'
import { createClient } from '@/lib/supabase/server'
import type { Pengurus } from '@/types/database'
import { Metadata } from 'next'
import PengurusCard from './PengurusCard'

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
                                <PengurusCard key={p.id} p={p} />
                            ))}
                        </div>
                    )}
                </div>
            </PublicLayout>
        </div>
    )
}
