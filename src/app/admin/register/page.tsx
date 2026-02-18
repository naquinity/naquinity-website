'use client'

import { registerAdmin } from '@/actions/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useActionState } from 'react'
import { useState } from 'react'

export default function AdminRegisterPage() {
    const [state, action, isPending] = useActionState(registerAdmin, null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <div className="bg-[#f8fafc] text-slate-800 font-display antialiased min-h-screen flex items-center justify-center p-4">
            {/* ... keeping previous outer structure unchanged ... */}
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.05),0_10px_10px_-5px_rgba(0,0,0,0.02)] overflow-hidden">
                <div className="p-8 md:p-12">
                    <div className="text-center mb-8">
                        {/* ... keeping header content ... */}
                        <div className="mx-auto mb-4">
                            <Image
                                src="https://tools.naquinity.web.id/images/logo/100kb.png"
                                alt="Naquinity Logo"
                                width={64}
                                height={64}
                                className="w-16 h-16 mx-auto"
                            />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-1">Daftar Akun</h3>
                        <p className="text-slate-500 text-sm">
                            Buat akun untuk mengelola website
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

                    {state?.success && (
                        <div className="mb-5 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-green-600 !text-lg">
                                    check_circle
                                </span>
                                <p className="text-sm text-green-800 font-medium">{state.success}</p>
                            </div>
                            <div className="mt-3">
                                <Link href="/admin/login" className="text-sm text-green-700 font-bold hover:underline">
                                    → Login sekarang
                                </Link>
                            </div>
                        </div>
                    )}

                    <form action={action} className="space-y-4">
                        <div>
                            <label
                                className="block text-sm font-bold text-slate-700 mb-1.5"
                                htmlFor="name"
                            >
                                Nama Lengkap
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    badge
                                </span>
                                <input
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                    id="name"
                                    name="name"
                                    placeholder="Nama Kamu"
                                    type="text"
                                    required
                                    defaultValue={!state?.success ? undefined : ''}
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                className="block text-sm font-bold text-slate-700 mb-1.5"
                                htmlFor="username"
                            >
                                Username
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    person
                                </span>
                                <input
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                    id="username"
                                    name="username"
                                    placeholder="namakamu"
                                    type="text"
                                    required
                                    defaultValue={!state?.success ? undefined : ''}
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                className="block text-sm font-bold text-slate-700 mb-1.5"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    mail
                                </span>
                                <input
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                    id="email"
                                    name="email"
                                    placeholder="namakamu@email.com"
                                    type="email"
                                    required
                                    defaultValue={!state?.success ? undefined : ''}
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                className="block text-sm font-bold text-slate-700 mb-1.5"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    lock
                                </span>
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
                            <label
                                className="block text-sm font-bold text-slate-700 mb-1.5"
                                htmlFor="confirm_password"
                            >
                                Konfirmasi Password
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    lock
                                </span>
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
                            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin !text-lg">progress_activity</span>
                                    <span>Memproses...</span>
                                </>
                            ) : (
                                <>
                                    <span>Daftar Akun</span>
                                    <span className="material-symbols-outlined !text-sm group-hover:translate-x-1 transition-transform">
                                        arrow_forward
                                    </span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 border-t border-slate-200"></div>
                        <span className="text-sm text-slate-500">atau</span>
                        <div className="flex-1 border-t border-slate-200"></div>
                    </div>

                    {/* Google Register - Placeholder */}
                    <button
                        type="button"
                        className="w-full bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-3"
                        onClick={() => alert('Fitur Daftar dengan Google belum tersedia')}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 48 48">
                            <path
                                fill="#EA4335"
                                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                            ></path>
                            <path
                                fill="#4285F4"
                                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                            ></path>
                            <path
                                fill="#FBBC05"
                                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                            ></path>
                            <path
                                fill="#34A853"
                                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                            ></path>
                        </svg>
                        <span>Daftar dengan Google</span>
                    </button>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-500">
                            Sudah memiliki akun?{' '}
                            <Link
                                className="text-primary font-bold hover:underline"
                                href="/admin/login"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
