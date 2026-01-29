import { createClient } from '@supabase/supabase-js'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Pencapaian | Naquinity',
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const TABLE_PENCAPAIAN = 'pencapaian'

export default async function UserPencapaianPage() {
    const { data: pencapaianList } = await supabase
        .from(TABLE_PENCAPAIAN)
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-teal-700 mb-2">Pencapaian</h2>
                <p className="text-slate-600">Prestasi dan pencapaian Naquinity</p>
            </div>

            {pencapaianList && pencapaianList.length > 0 ? (
                <div className="space-y-6">
                    {pencapaianList.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
                        >
                            <div className="flex items-start gap-6">
                                {item.person_photo_url ? (
                                    <img
                                        src={item.person_photo_url}
                                        alt={item.title}
                                        className="w-32 h-32 rounded-xl object-cover flex-shrink-0"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                                        <span className="material-symbols-outlined text-5xl text-white">
                                            emoji_events
                                        </span>
                                    </div>
                                )}
                                <div className="flex-1 w-full">
                                    <h3 className="font-bold text-xl text-slate-900 mb-2">
                                        {item.title}
                                    </h3>

                                    {/* Person Info */}
                                    {(item.person_name || item.person_nim) && (
                                        <div className="flex items-center gap-2 mb-3 text-sm font-medium text-teal-700 bg-teal-50 w-fit px-3 py-1.5 rounded-lg border border-teal-100">
                                            <span className="material-symbols-outlined !text-base">person</span>
                                            <span>{item.person_name}</span>
                                            {item.person_nim && (
                                                <span className="text-teal-600/70 border-l border-teal-200 pl-2 ml-1">
                                                    {item.person_nim}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    <p className="text-slate-600 mb-3">
                                        {item.description}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <span className="material-symbols-outlined !text-sm">
                                                calendar_today
                                            </span>
                                            <span>
                                                {new Date(
                                                    item.created_at
                                                ).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                    <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
                        emoji_events
                    </span>
                    <p className="text-slate-500">Belum ada pencapaian</p>
                </div>
            )}
        </div>
    )
}
