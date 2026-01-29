'use client'

import { registerAdminFromGoogle } from '@/actions/auth'
import Image from 'next/image'
import { useActionState } from 'react'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function GoogleCompletePage() {
    const [state, action] = useActionState(registerAdminFromGoogle, null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // We cannot access cookies directly in client component during render to show name/email
    // But we can just show a generic message or fetch it via server component/props if needed.
    // For simplicity, we just show the form. The cookie is verified in the server action.

    return (
        <div className="bg-[#f8fafc] text-slate-800 font-display antialiased min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-4xl text-green-600">check_circle</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Hampir Selesai!</h2>
                    <p className="text-slate-600 text-sm">
                        Lengkapi data Anda untuk mengakses dashboard
                    </p>
                </div>

                {state?.error && (
                    <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-red-600 !text-lg">
                                error
                            </span>
                            <p className="text-sm text-red-800 font-medium">{state.error}</p>
                        </div>
                    </div>
                )}

                <form action={action} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="name">Nama Lengkap</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">badge</span>
                            <input
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                id="name"
                                name="name"
                                placeholder="Nama Lengkap"
                                type="text"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="username">Username</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">person</span>
                            <input
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                id="username"
                                name="username"
                                placeholder="Username untuk login manual"
                                type="text"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="password">Password</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                            <input
                                className="w-full pl-10 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                id="password"
                                name="password"
                                placeholder="Minimal 6 karakter"
                                type={showPassword ? 'text' : 'password'}
                                required
                            />
                            <button
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <span className="material-symbols-outlined !text-[18px]">
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="confirm_password">Konfirmasi Password</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                            <input
                                className="w-full pl-10 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                id="confirm_password"
                                name="confirm_password"
                                placeholder="Ulangi password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                required
                            />
                            <button
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <span className="material-symbols-outlined !text-[18px]">
                                    {showConfirmPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group mt-6"
                    >
                        <span>Lanjutkan ke Dashboard</span>
                        <span className="material-symbols-outlined !text-sm group-hover:translate-x-1 transition-transform">
                            arrow_forward
                        </span>
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <a href="/admin/login" className="text-sm text-slate-500 hover:text-primary">
                        ← Kembali ke login
                    </a>
                </div>
            </div>
        </div>
    )
}
