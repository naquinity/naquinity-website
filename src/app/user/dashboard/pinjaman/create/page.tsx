import Link from 'next/link'
import { Metadata } from 'next'
import { getUserUser } from '@/lib/dal'
import { redirect } from 'next/navigation'
import CreateLoanForm from './ClientForm'

export const metadata: Metadata = {
    title: 'Ajukan Pinjaman | Naquinity',
}

export default async function CreateLoanPage() {
    const user = await getUserUser()
    if (!user) {
        redirect('/user/login')
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-teal-700 mb-2">
                        Ajukan Pinjaman
                    </h2>
                    <p className="text-slate-600">
                        Formulir pengajuan pinjaman keuangan
                    </p>
                </div>
                <Link
                    href="/user/dashboard/pinjaman"
                    className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-teal-700 transition-colors"
                >
                    <span className="material-symbols-outlined">
                        arrow_back
                    </span>
                    <span className="font-bold">Kembali</span>
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <CreateLoanForm />
            </div>
        </div>
    )
}
