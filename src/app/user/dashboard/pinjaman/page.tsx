import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { Metadata } from 'next'
import { getUserUser } from '@/lib/dal'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: 'Pinjaman | Naquinity',
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const TABLE_PINJAMAN = 'pinjaman'

export default async function UserPinjamanPage() {
    const user = await getUserUser()
    if (!user) {
        redirect('/user/login')
    }

    // Fetch user's loan requests (filter by email)
    const { data: loanList } = await supabase
        .from(TABLE_PINJAMAN)
        .select('*')
        .eq('user_email', user.email)
        .order('requested_at', { ascending: false })

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-teal-700 mb-2">
                        Pinjaman
                    </h2>
                    <p className="text-slate-600">
                        Daftar dan status pengajuan pinjaman saya
                    </p>
                </div>
                <Link
                    href="/user/dashboard/pinjaman/create"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-colors shadow-lg"
                >
                    <span className="material-symbols-outlined">add</span>
                    <span>Ajukan Pinjaman</span>
                </Link>
            </div>

            <div className="mb-8 bg-teal-50 border border-teal-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-teal-600 text-2xl">
                        info
                    </span>
                    <div>
                        <h4 className="font-bold text-teal-900 mb-1">Informasi</h4>
                        <p className="text-sm text-teal-800">
                            Ini adalah halaman pinjaman uang yang disediakan oleh bendahara angkatan. Jika kamu membutuhkan dana untuk keperluan perkuliahan,
                            kamu dapat menggunakan fitur ini dengan catatan konfirmasi terlebih dahulu kepada ketua angkatan atau wakil ketua angkatan.
                        </p>
                    </div>
                </div>
            </div>

            {/* List or Empty State */}
            {!loanList || loanList.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                    <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
                        request_quote
                    </span>
                    <p className="text-slate-500 mb-4">
                        Anda belum memiliki pengajuan pinjaman
                    </p>
                    <Link
                        href="/user/dashboard/pinjaman/create"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition"
                    >
                        <span className="material-symbols-outlined">add</span>
                        <span>Ajukan Pinjaman</span>
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                                        Jumlah
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                                        Tenggat
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                                        Keperluan
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                                        Tanggal
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                                        Pembayaran
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {loanList.map((loan) => (
                                    <tr
                                        key={loan.id}
                                        className="hover:bg-slate-50"
                                    >
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-slate-900">
                                                Rp{' '}
                                                {new Intl.NumberFormat(
                                                    'id-ID'
                                                ).format(loan.amount)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-700">
                                            {loan.deadline_months
                                                ? `${loan.deadline_months} Bulan`
                                                : 'Semampunya'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-700">
                                            {loan.purpose || loan.description}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-700">
                                            {new Date(
                                                loan.requested_at
                                            ).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </td>
                                        <td className="px-6 py-4">
                                            {loan.approval_status ===
                                                'pending' && (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                                                        <span className="material-symbols-outlined !text-sm">
                                                            schedule
                                                        </span>
                                                        Pending
                                                    </span>
                                                )}
                                            {loan.approval_status ===
                                                'approved' && (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                                        <span className="material-symbols-outlined !text-sm">
                                                            check_circle
                                                        </span>
                                                        Disetujui
                                                    </span>
                                                )}
                                            {loan.approval_status ===
                                                'rejected' && (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                                                        <span className="material-symbols-outlined !text-sm">
                                                            cancel
                                                        </span>
                                                        Ditolak
                                                    </span>
                                                )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {loan.approval_status ===
                                                'approved' ? (
                                                loan.repayment_status ===
                                                    'paid' ? (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                                        <span className="material-symbols-outlined !text-sm">
                                                            paid
                                                        </span>
                                                        Lunas
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                                                        <span className="material-symbols-outlined !text-sm">
                                                            hourglass_empty
                                                        </span>
                                                        Belum Lunas
                                                    </span>
                                                )
                                            ) : (
                                                <span className="text-slate-400">
                                                    -
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
