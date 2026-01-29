'use client'

import { createTransaction } from '@/actions/keuangan'
import Link from 'next/link'
import { useActionState } from 'react'

export default function CreateKeuanganPage() {
    const [state, action] = useActionState(createTransaction, null)

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
                <span className="font-bold text-slate-800">Tambah Transaksi</span>
            </div>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-primary mb-2">
                        Tambah Transaksi
                    </h2>
                    <p className="text-slate-600">
                        Tambah data transaksi keuangan baru
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

            {state?.error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-600">error</span>
                    <p className="text-sm text-red-800 font-medium">{state.error}</p>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <form action={action} className="space-y-6">
                    {/* Type Selection */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">Tipe Transaksi</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label className="relative cursor-pointer">
                                <input type="radio" name="type" value="masuk" className="peer sr-only" required defaultChecked />
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
                                <input type="radio" name="type" value="keluar" className="peer sr-only" required />
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
                            defaultValue={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-primary/20"
                        >
                            Simpan Transaksi
                        </button>
                        <Link
                            href="/dashboard/keuangan"
                            className="px-6 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
