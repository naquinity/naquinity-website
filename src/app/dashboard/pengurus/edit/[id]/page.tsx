import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import EditPengurusForm from './EditPengurusForm'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function EditPengurusPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    // Fetch Data
    const { data: pengurus } = await supabase
        .from('pengurus')
        .select('*')
        .eq('id', id)
        .single()

    if (!pengurus) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
                <span className="material-symbols-outlined !text-sm">chevron_right</span>
                <Link href="/dashboard/pengurus" className="hover:text-primary">Pengurus</Link>
                <span className="material-symbols-outlined !text-sm">chevron_right</span>
                <span className="font-bold text-slate-800">Edit Pengurus</span>
            </div>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-primary mb-2">Edit Pengurus</h2>
                    <p className="text-slate-600">Perbarui data pengurus organisasi</p>
                </div>
            </div>

            <EditPengurusForm pengurus={pengurus} />
        </div>
    )
}
