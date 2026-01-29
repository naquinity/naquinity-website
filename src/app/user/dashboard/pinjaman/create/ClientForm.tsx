'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { submitLoan } from './actions'

export default function CreateLoanForm() {
    const [state, action, isPending] = useActionState(submitLoan, { error: '' })

    return (
        <form action={action} className="space-y-6">
            {state.error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-red-600">
                            error
                        </span>
                        <p className="text-sm text-red-800 font-medium">
                            {state.error}
                        </p>
                    </div>
                </div>
            )}

            {/* Amount */}
            <div>
                <label
                    className="block text-sm font-bold text-slate-700 mb-2"
                    htmlFor="amount"
                >
                    Jumlah Pinjaman
                </label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">
                        Rp
                    </span>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        required
                        step="1"
                        min="1"
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                        placeholder="1000000"
                    />
                </div>
                <p className="text-sm text-slate-500 mt-1">Minimal Rp 1</p>
            </div>

            {/* Deadline */}
            <div>
                <label
                    className="block text-sm font-bold text-slate-700 mb-2"
                    htmlFor="deadline"
                >
                    Tenggat Waktu Pelunasan
                </label>
                <select
                    id="deadline"
                    name="deadline"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                >
                    <option value="">-- Pilih Tenggat --</option>
                    <option value="1">1 Bulan</option>
                    <option value="3">3 Bulan</option>
                    <option value="6">6 Bulan</option>
                    <option value="12">12 Bulan</option>
                    <option value="24">24 Bulan</option>
                    <option value="semampunya">Semampunya</option>
                </select>
            </div>

            {/* Account Number */}
            <div>
                <label
                    className="block text-sm font-bold text-slate-700 mb-2"
                    htmlFor="account_number"
                >
                    Nomor Rekening / E-Wallet
                </label>
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        account_balance_wallet
                    </span>
                    <input
                        type="text"
                        id="account_number"
                        name="account_number"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                        placeholder="BCA: 1234567890 atau GoPay: 08123456789"
                    />
                </div>
                <p className="text-sm text-slate-500 mt-1">
                    Nomor rekening bank atau e-wallet untuk pencairan dana
                </p>
            </div>

            {/* Description */}
            <div>
                <label
                    className="block text-sm font-bold text-slate-700 mb-2"
                    htmlFor="description"
                >
                    Deskripsi Keperluan
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all resize-none"
                    placeholder="Jelaskan keperluan dana pinjaman dengan detail..."
                ></textarea>
                <p className="text-sm text-slate-500 mt-1">
                    Minimal 10 karakter
                </p>
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-teal-600">
                        info
                    </span>
                    <p className="text-sm text-teal-800">
                        Pengajuan pinjaman akan diproses oleh admin. Anda akan
                        mendapat notifikasi setelah pengajuan disetujui atau
                        ditolak.
                    </p>
                </div>
            </div>

            <div className="flex gap-4 pt-4">
                <button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-teal-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? 'Memproses...' : 'Ajukan Pinjaman'}
                </button>
                <Link
                    href="/user/dashboard/pinjaman"
                    className="px-6 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors text-center"
                >
                    Batal
                </Link>
            </div>
        </form>
    )
}
