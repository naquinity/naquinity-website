'use client'

import { registerUserFromGoogle } from '@/actions/auth'
import Link from 'next/link'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-teal-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
            {pending ? (
                <>
                    <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                    <span>Memproses...</span>
                </>
            ) : (
                'Selesaikan Pendaftaran'
            )}
        </button>
    )
}

export default function GoogleCompleteForm({
    initialData
}: {
    initialData: { name: string; email: string }
}) {
    const [state, action] = useActionState(registerUserFromGoogle, null)

    return (
        <form action={action} className="space-y-5">
            {state?.error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-200">
                    <div className="flex items-center gap-2 mb-1 font-bold">
                        <span className="material-symbols-outlined">error</span>
                        Permintaan Gagal
                    </div>
                    {state.error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Nama Lengkap</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-400">person</span>
                    </div>
                    <input
                        type="text"
                        name="name"
                        defaultValue={initialData.name}
                        placeholder="Nama Lengkap"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">NIM (Opsional)</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-400">badge</span>
                    </div>
                    <input
                        type="text"
                        name="nim"
                        placeholder="Nomor Induk Mahasiswa"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-mono"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Username</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-400">alternate_email</span>
                    </div>
                    <input
                        type="text"
                        name="username"
                        placeholder="Buat username unik"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Buat Password</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-400">lock</span>
                    </div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Minimal 6 karakter"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        required
                        minLength={6}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Konfirmasi Password</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-400">lock_reset</span>
                    </div>
                    <input
                        type="password"
                        name="confirm_password"
                        placeholder="Ulangi password"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        required
                        minLength={6}
                    />
                </div>
            </div>

            <div className="pt-2">
                <SubmitButton />
            </div>

            <p className="text-center text-sm text-slate-500 mt-6">
                Email Anda: <strong>{initialData.email}</strong>
            </p>
        </form>
    )
}
