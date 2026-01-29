import PublicLayout from '@/components/layout/PublicLayout'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import type { Program } from '@/types/database'
import { format } from 'date-fns'
import { Metadata } from 'next'
import ProgramCard from './ProgramCard'

export const metadata: Metadata = {
    title: 'Program',
}

async function getPrograms() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('program')
        .select('*')
        .order('start_date', { ascending: false })

    if (error) {
        console.error('Error fetching programs:', error)
    }

    return (data as Program[]) || []
}

export default async function ProgramPage() {
    const programs = await getPrograms()

    return (
        <div className="font-display">
            <PublicLayout>
                {/* Hero */}
                <div className="relative py-20 bg-slate-900 overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage:
                                "url('https://cdn-1.naquinity.web.id/angkatan/IMG_6265.JPG')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900/80" />
                    <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-black mb-4">
                            Program Kami
                        </h1>
                        <p className="text-xl text-slate-300">
                            Program dan event Naquinity
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {programs.length === 0 ? (
                        <div className="text-center py-20">
                            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
                                calendar_month
                            </span>
                            <h3 className="text-2xl font-bold text-slate-600 mb-2">
                                Belum ada program
                            </h3>
                            <p className="text-slate-500">Program akan ditampilkan di sini</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {programs.map((program) => (
                                <ProgramCard key={program.id} program={program} />
                            ))}
                        </div>
                    )}
                </div>
            </PublicLayout>
        </div>
    )
}
