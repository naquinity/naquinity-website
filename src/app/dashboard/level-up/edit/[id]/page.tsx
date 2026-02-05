import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import EditLevelUpForm from './EditLevelUpForm'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function EditLevelUpPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    // Fetch Data
    const { data: article } = await supabase
        .from('levelup')
        .select('*')
        .eq('id', id)
        .single()

    if (!article) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <Link href="/dashboard" className="hover:text-primary">
                    Dashboard
                </Link>
                <span className="material-symbols-outlined !text-sm">chevron_right</span>
                <Link href="/dashboard/level-up" className="hover:text-primary">
                    Level-up
                </Link>
                <span className="material-symbols-outlined !text-sm">chevron_right</span>
                <span className="font-bold text-slate-800">Edit Artikel</span>
            </div>

            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-primary mb-2">
                        Edit Artikel
                    </h2>
                    <p className="text-slate-600">
                        Buat konten edukatif untuk anggota komunitas
                    </p>
                </div>
                <Link
                    href="/dashboard/level-up"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-600 font-bold rounded-lg hover:bg-slate-50 transition"
                >
                    <span className="material-symbols-outlined">close</span>
                    Batal
                </Link>
            </div>

            {/* Form */}
            <EditLevelUpForm article={article} />
        </div>
    )
}
