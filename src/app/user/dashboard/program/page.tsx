import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { getUserUser } from '@/lib/dal'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const TABLE_PROGRAM = 'program'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Program | Naquinity',
}

export default async function UserProgramPage() {
    const { data: programs } = await supabase
        .from(TABLE_PROGRAM)
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-teal-700 mb-2">Program Kami</h2>
                <p className="text-slate-600">
                    Daftar program dan kegiatan Naquinity
                </p>
            </div>

            {programs && programs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {programs.map((program) => (
                        <div
                            key={program.id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
                        >
                            {program.logo_url || program.image_url ? (
                                <img
                                    src={program.logo_url || program.image_url}
                                    alt={program.title}
                                    className="w-full h-48 object-cover"
                                />
                            ) : (
                                <div className="w-full h-48 bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-6xl text-white">
                                        view_agenda
                                    </span>
                                </div>
                            )}

                            <div className="p-6">
                                <h3 className="font-bold text-lg text-slate-900 mb-2">
                                    {program.title}
                                </h3>
                                <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                                    {program.description}
                                </p>
                                {(program.start_date || program.date) && (
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <span className="material-symbols-outlined !text-sm">
                                            calendar_today
                                        </span>
                                        <span>
                                            {new Date(
                                                program.start_date || program.date
                                            ).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                    <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
                        view_agenda
                    </span>
                    <p className="text-slate-500">Belum ada program</p>
                </div>
            )}
        </div>
    )
}
