import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import EditKeuanganForm from './EditKeuanganForm'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function EditKeuanganPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    // Fetch Data
    const { data: transaction } = await supabase
        .from('keuangan')
        .select('*')
        .eq('id', id)
        .single()

    if (!transaction) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <Link href="/dashboard" className="hover:text-primary">
                    Dashboard
                </Link>
                <span className="material-symbols-outlined !text-sm">chevron_right</span>
                <Link href="/dashboard/keuangan" className="hover:text-primary">
                    Keuangan
                </Link>
                <span className="material-symbols-outlined !text-sm">chevron_right</span>
                <span className="font-bold text-slate-800">Edit Transaksi</span>
            </div>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-primary mb-2">
                        Edit Transaksi
                    </h2>
                    <p className="text-slate-600">
                        Perbarui data transaksi keuangan
                    </p>
                </div>
                <Link
                    href="/dashboard/keuangan"
                    className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-primary transition-colors"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                    <span className="font-bold">Kembali</span>
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <EditKeuanganForm transaction={transaction} />
            </div>
        </div>
    )
}
