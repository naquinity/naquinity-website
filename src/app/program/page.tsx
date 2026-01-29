import PublicLayout from '@/components/layout/PublicLayout'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import type { Program } from '@/types/database'
import { format } from 'date-fns'
import { Metadata } from 'next'

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
                                <div
                                    key={program.id}
                                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all group"
                                >
                                    {program.logo_url ? (
                                        <div className="aspect-video bg-slate-100 overflow-hidden relative">
                                            <Image
                                                src={program.logo_url}
                                                alt={program.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    ) : (
                                        <div className="aspect-video bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-6xl text-white">
                                                calendar_month
                                            </span>
                                        </div>
                                    )}

                                    <div className="p-6">
                                        <div className="mb-4">
                                            {program.start_date && (
                                                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                                                    <span className="material-symbols-outlined !text-base">
                                                        calendar_today
                                                    </span>
                                                    <span>
                                                        {format(new Date(program.start_date), 'd MMM yyyy')}
                                                    </span>
                                                    {program.end_date &&
                                                        program.end_date !== program.start_date && (
                                                            <span>
                                                                -{' '}
                                                                {format(new Date(program.end_date), 'd MMM yyyy')}
                                                            </span>
                                                        )}
                                                </div>
                                            )}

                                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition">
                                                {program.title}
                                            </h3>
                                            <p className="text-slate-600 text-sm line-clamp-3">
                                                {program.description}
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
