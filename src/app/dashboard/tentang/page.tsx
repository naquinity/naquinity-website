import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import TentangForm from './TentangForm'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function TentangPage() {
    // Fetch Data
    const { data: tentangData } = await supabase
        .from('tentang_kami')
        .select('*')
        .limit(1)
        .single()

    const { data: maskotData } = await supabase
        .from('maskot')
        .select('*')
        .limit(1)
        .single()

    return (
        <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <Link href="/dashboard" className="hover:text-primary">
                    Dashboard
                </Link>
                <span className="material-symbols-outlined !text-sm">chevron_right</span>
                <span className="font-bold text-slate-800">Tentang Kami</span>
            </div>

            {/* Page Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-primary mb-2">Kelola Tentang Kami</h2>
                <p className="text-slate-600">Kelola konten halaman Tentang Kami dan informasi maskot</p>
                <a
                    href="/tentang"
                    target="_blank"
                    className="mt-3 inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline"
                >
                    <span className="material-symbols-outlined !text-base">open_in_new</span>
                    Lihat halaman Tentang Kami
                </a>
            </div>

            {/* Client Form Component */}
            <TentangForm initialTentang={tentangData} initialMaskot={maskotData} />
        </div>
    )
}
