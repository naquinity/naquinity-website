import { createClient } from '@supabase/supabase-js'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Keuangan | Naquinity',
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const TABLE_KEUANGAN = 'keuangan'

function formatCurrency(amount: number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount)
}

export default async function UserKeuanganPage() {
    // Fetch all transactions
    const { data: transactionList } = await supabase
        .from(TABLE_KEUANGAN)
        .select('*')
        .order('transaction_date', { ascending: false })

    // Calculate totals
    let totalMasuk = 0
    let totalKeluar = 0

    if (transactionList) {
        transactionList.forEach((t) => {
            if (t.type === 'masuk') {
                totalMasuk += t.amount
            } else {
                totalKeluar += t.amount
            }
        })
    }

    const saldo = totalMasuk - totalKeluar

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-teal-700 mb-2">
                    Ringkasan Keuangan
                </h2>
                <p className="text-slate-600">
                    Laporan keuangan Naquinity
                </p>
            </div>

            <div className="mb-8 bg-teal-50 border border-teal-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-teal-600 text-2xl">
                        info
                    </span>
                    <div>
                        <h4 className="font-bold text-teal-900 mb-1">Informasi</h4>
                        <p className="text-sm text-teal-800">
                            Ini adalah ringkasan keuangan Naquinity secara keseluruhan dari awal sampai saat ini. Transparansi uang keluar, masuk, dan total saldo, semua ada di sini.
                        </p>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Masuk */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-100 rounded-xl">
                            <span className="material-symbols-outlined text-2xl text-green-600">
                                trending_up
                            </span>
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">Total Uang Masuk</p>
                    <h3 className="text-2xl font-bold text-slate-900">
                        {formatCurrency(totalMasuk)}
                    </h3>
                </div>

                {/* Total Keluar */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-500">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-red-100 rounded-xl">
                            <span className="material-symbols-outlined text-2xl text-red-600">
                                trending_down
                            </span>
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">Total Uang Keluar</p>
                    <h3 className="text-2xl font-bold text-slate-900">
                        {formatCurrency(totalKeluar)}
                    </h3>
                </div>

                {/* Saldo */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-teal-500">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-teal-100 rounded-xl">
                            <span className="material-symbols-outlined text-2xl text-teal-600">
                                account_balance
                            </span>
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">Saldo</p>
                    <h3
                        className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}
                    >
                        {formatCurrency(saldo)}
                    </h3>
                </div>
            </div>


            {/* Transaction History Table */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="text-xl font-bold text-slate-800">Riwayat Transaksi</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Tanggal</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Keterangan</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Kategori</th>
                                <th className="px-6 py-4 text-right text-sm font-bold text-slate-700">Jumlah</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {transactionList?.map((t) => {
                                // CENSOR LOGIC: If it's a loan transaction, hide the name
                                let displayDescription = t.description
                                if (
                                    t.category === 'Pinjaman' ||
                                    t.description.toLowerCase().startsWith('pinjaman untuk') ||
                                    t.description.toLowerCase().startsWith('pelunasan pinjaman')
                                ) {
                                    displayDescription = 'Transaksi Pinjaman Anggota (Privasi)'
                                }

                                const isMasuk = t.type === 'masuk'

                                return (
                                    <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                                            {new Date(t.transaction_date).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                                            {displayDescription}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                                                {t.category || 'Umum'}
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 text-sm font-bold text-right whitespace-nowrap ${isMasuk ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {isMasuk ? '+ ' : '- '}
                                            {formatCurrency(t.amount)}
                                        </td>
                                    </tr>
                                )
                            })}
                            {(!transactionList || transactionList.length === 0) && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                        Belum ada riwayat transaksi
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
