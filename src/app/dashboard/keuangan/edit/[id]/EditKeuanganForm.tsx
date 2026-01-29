'use client'

import { updateTransaction } from '@/actions/keuangan'
import Link from 'next/link'
import { useActionState } from 'react'

export default function EditKeuanganForm({ transaction }: { transaction: any }) {
    const [state, action, isPending] = useActionState(updateTransaction.bind(null, transaction.id), null)

    return (
        <form action={action} className="space-y-6">
            {state?.error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-600">error</span>
                    <p className="text-sm text-red-800 font-medium">{state.error}</p>
                </div>
            )}

            {/* Type Selection */}
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Tipe Transaksi</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="relative cursor-pointer">
                        <input
                            type="radio"
                            name="type"
                            value="masuk"
                            className="peer sr-only"
                            required
                            defaultChecked={transaction.type === 'masuk'}
                        />
                        <div className="p-4 border-2 border-slate-200 rounded-xl peer-checked:border-green-500 peer-checked:bg-green-50 transition-all">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <span className="material-symbols-outlined text-green-600">arrow_downward</span>
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">Uang Masuk</p>
                                    <p className="text-sm text-slate-600">Pemasukan/Donasi</p>
                                </div>
                            </div>
                        </div>
                    </label>

                    <label className="relative cursor-pointer">
                        <input
                            type="radio"
                            name="type"
                            value="keluar"
                            className="peer sr-only"
                            required
                            defaultChecked={transaction.type === 'keluar'}
                        />
                        <div className="p-4 border-2 border-slate-200 rounded-xl peer-checked:border-red-500 peer-checked:bg-red-50 transition-all">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <span className="material-symbols-outlined text-red-600">arrow_upward</span>
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">Uang Keluar</p>
                                    <p className="text-sm text-slate-600">Pengeluaran/Biaya</p>
                                </div>
                            </div>
                        </div>
                    </label>
                </div>
            </div>

            {/* Amount */}
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="amount">Jumlah</label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">Rp</span>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        required
                        step="0.01"
                        min="0"
                        defaultValue={transaction.amount}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="1000000"
                    />
                </div>
                <p className="text-sm text-slate-500 mt-1">Masukkan jumlah dalam Rupiah (tanpa titik atau koma)</p>
            </div>

            {/* Category */}
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="category">
                    Kategori <span className="text-slate-400 font-normal">(Opsional)</span>
                </label>
                <select
                    id="category"
                    name="category"
                    defaultValue={transaction.category || ''}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                >
                    <option value="">-- Pilih Kategori --</option>
                    <option value="Donasi">Donasi</option>
                    <option value="Event">Event</option>
                    <option value="Operasional">Operasional</option>
                    <option value="Konsumsi">Konsumsi</option>
                    <option value="Transportasi">Transportasi</option>
                    <option value="Perlengkapan">Perlengkapan</option>
                    <option value="Lainnya">Lainnya</option>
                </select>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="description">Deskripsi</label>
                <textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                    defaultValue={transaction.description}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                    placeholder="Jelaskan detail penggunaan/sumber dana..."
                ></textarea>
            </div>

            {/* Transaction Date */}
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="transaction_date">Tanggal Transaksi</label>
                <input
                    type="date"
                    id="transaction_date"
                    name="transaction_date"
                    required
                    defaultValue={transaction.transaction_date.slice(0, 10)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
            </div>

            <div className="flex gap-4 pt-4">
                <button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isPending ? (
                        <>
                            <span className="material-symbols-outlined animate-spin !text-lg">progress_activity</span>
                            <span>Menyimpan...</span>
                        </>
                    ) : (
                        "Perbarui Transaksi"
                    )}
                </button>
                <Link
                    href="/dashboard/keuangan"
                    className="px-6 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors"
                >
                    Batal
                </Link>
            </div>
        </form>
    )
}
