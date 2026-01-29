import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { TransactionDeleteButton, LoanActions } from './KeuanganClient'
import { getAdminUser } from '@/lib/dal'
import { redirect } from 'next/navigation'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function formatCurrency(amount: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount)
}

export default async function KeuanganPage() {
    const user = await getAdminUser()
    if (!user) redirect('/admin/login')

    // Fetch transactions
    const { data: transactionList } = await supabase
        .from('keuangan')
        .select('*')
        .order('transaction_date', { ascending: false })

    // Fetch loans
    const { data: loanList } = await supabase
        .from('pinjaman')
        .select('*')
        .order('requested_at', { ascending: false })

    // Calculate summaries
    let totalMasuk = 0
    let totalKeluar = 0
    let transaksiBulanIni = 0
    const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM

    if (transactionList) {
        transactionList.forEach((t) => {
            if (t.type === 'masuk') totalMasuk += t.amount
            else totalKeluar += t.amount

            if (t.transaction_date.startsWith(currentMonth)) transaksiBulanIni++
        })
    }

    const saldo = totalMasuk - totalKeluar

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
                <span className="material-symbols-outlined !text-sm">chevron_right</span>
                <span className="font-bold text-slate-800">Keuangan</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-primary mb-2">Kelola Keuangan</h2>
                    <p className="text-slate-600">Manajemen laporan keuangan Naquinity</p>
                </div>
                <Link href="/dashboard/keuangan/create"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-colors shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined">add</span>
                    <span>Tambah Transaksi</span>
                </Link>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-100 rounded-xl">
                            <span className="material-symbols-outlined text-2xl text-green-600">trending_up</span>
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">Total Uang Masuk</p>
                    <h3 className="text-2xl font-bold text-slate-900">{formatCurrency(totalMasuk)}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-500">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-red-100 rounded-xl">
                            <span className="material-symbols-outlined text-2xl text-red-600">trending_down</span>
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">Total Uang Keluar</p>
                    <h3 className="text-2xl font-bold text-slate-900">{formatCurrency(totalKeluar)}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <span className="material-symbols-outlined text-2xl text-blue-600">account_balance</span>
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">Saldo</p>
                    <h3 className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(saldo)}
                    </h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-100 rounded-xl">
                            <span className="material-symbols-outlined text-2xl text-purple-600">receipt_long</span>
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">Transaksi Bulan Ini</p>
                    <h3 className="text-2xl font-bold text-slate-900">{transaksiBulanIni}</h3>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                    <h3 className="text-xl font-bold text-slate-900">Riwayat Transaksi</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Tanggal</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Tipe</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Kategori</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Deskripsi</th>
                                <th className="px-6 py-4 text-right text-sm font-bold text-slate-700">Jumlah</th>
                                <th className="px-6 py-4 text-right text-sm font-bold text-slate-700">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {!transactionList || transactionList.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                        <div className="flex flex-col items-center gap-3">
                                            <span className="material-symbols-outlined text-5xl text-slate-300">receipt_long</span>
                                            <p>Belum ada transaksi</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                transactionList.map((trans) => (
                                    <tr key={trans.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-slate-700">
                                            {new Date(trans.transaction_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-4">
                                            {trans.type === 'masuk' ? (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                                    <span className="material-symbols-outlined !text-sm">arrow_downward</span>
                                                    Masuk
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                                                    <span className="material-symbols-outlined !text-sm">arrow_upward</span>
                                                    Keluar
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-700">{trans.category || '-'}</td>
                                        <td className="px-6 py-4 text-sm text-slate-700">{trans.description}</td>
                                        <td className="px-6 py-4 text-right">
                                            <span className={`font-bold ${trans.type === 'masuk' ? 'text-green-600' : 'text-red-600'}`}>
                                                {formatCurrency(trans.amount)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/dashboard/keuangan/edit/${trans.id}`}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/5 transition-all"
                                                    title="Edit">
                                                    <span className="material-symbols-outlined !text-lg">edit</span>
                                                </Link>
                                                <TransactionDeleteButton id={trans.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Loan Requests Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-8">
                <div className="p-6 border-b border-slate-200">
                    <h3 className="text-xl font-bold text-slate-900">Pengajuan Pinjaman</h3>
                    <p className="text-sm text-slate-600 mt-1">Kelola persetujuan dan pelunasan pinjaman</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Peminjam</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Jumlah</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Keperluan</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Tenggat</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Rekening</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Pembayaran</th>
                                <th className="px-6 py-4 text-right text-sm font-bold text-slate-700">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {!loanList || loanList.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                                        <div className="flex flex-col items-center gap-3">
                                            <span className="material-symbols-outlined text-5xl text-slate-300">request_quote</span>
                                            <p>Belum ada pengajuan pinjaman</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                loanList.map((loan) => (
                                    <tr key={loan.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-bold text-slate-900">{loan.user_name}</p>
                                                <p className="text-sm text-slate-500">{loan.user_email || '-'}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-900">
                                            {formatCurrency(loan.amount)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-700">{loan.description || loan.purpose || '-'}</td>
                                        <td className="px-6 py-4 text-sm text-slate-700">
                                            {loan.deadline_months ? `${loan.deadline_months} Bulan` : <span className="text-slate-400">Semampunya</span>}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-700">{loan.account_number || '-'}</td>
                                        <td className="px-6 py-4">
                                            {loan.approval_status === 'pending' && (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                                                    <span className="material-symbols-outlined !text-sm">schedule</span> Pending
                                                </span>
                                            )}
                                            {loan.approval_status === 'approved' && (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                                    <span className="material-symbols-outlined !text-sm">check_circle</span> Disetujui
                                                </span>
                                            )}
                                            {loan.approval_status === 'rejected' && (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                                                    <span className="material-symbols-outlined !text-sm">cancel</span> Ditolak
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {loan.approval_status === 'approved' ? (
                                                loan.repayment_status === 'paid' ? (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                                        <span className="material-symbols-outlined !text-sm">paid</span> Lunas
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                                                        <span className="material-symbols-outlined !text-sm">hourglass_empty</span> Belum Lunas
                                                    </span>
                                                )
                                            ) : (
                                                <span className="text-slate-400 text-sm">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <LoanActions loan={loan} adminName={user.name} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
