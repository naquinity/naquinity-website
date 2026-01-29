import { createClient } from '@supabase/supabase-js'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Mahasiswa | Naquinity',
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const TABLE_MAHASISWA = 'mahasiswa'

export default async function UserMahasiswaPage() {
    const { data: mahasiswaList } = await supabase
        .from(TABLE_MAHASISWA)
        .select('*')
        .order('name', { ascending: true })

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-teal-700 mb-2">Daftar Mahasiswa</h2>
                <p className="text-slate-600">Anggota mahasiswa Naquinity</p>
            </div>

            {mahasiswaList && mahasiswaList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mahasiswaList.map((mhs) => (
                        <div
                            key={mhs.id}
                            className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition"
                        >
                            {mhs.photo_url ? (
                                <img
                                    src={mhs.photo_url}
                                    alt={mhs.name}
                                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 mx-auto mb-4 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-4xl text-white">
                                        person
                                    </span>
                                </div>
                            )}

                            <h3 className="font-bold text-slate-900 mb-1">
                                {mhs.name}
                            </h3>
                            <p className="text-sm text-slate-600 mb-2">
                                {mhs.nim}
                            </p>
                            {mhs.email && (
                                <p className="text-xs text-slate-500">
                                    {mhs.email}
                                </p>
                            )}
                            {mhs.quote && (
                                <p className="text-xs text-slate-600 italic mt-3 line-clamp-2">
                                    "{mhs.quote}"
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                    <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
                        groups
                    </span>
                    <p className="text-slate-500">Belum ada data mahasiswa</p>
                </div>
            )}
        </div>
    )
}
