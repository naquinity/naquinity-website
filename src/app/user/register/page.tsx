'use client'

import { registerUser } from '@/actions/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useActionState } from 'react'
import { useState } from 'react'

export default function UserRegisterPage() {
    const [state, action, isPending] = useActionState(registerUser, null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <div className="bg-[#f0fdfa] text-slate-800 font-display antialiased min-h-screen flex items-center justify-center p-4">
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
                            Buat akun untuk mengakses dashboard
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
                                <Link href="/user/login" className="text-sm text-green-700 font-bold hover:underline">
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
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm"
                                    id="name"
                                    name="name"
                                    placeholder="Nama Lengkap"
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
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
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
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm"
                                    id="email"
                                    name="email"
                                    placeholder="email@mahasiswa.com"
                                    type="email"
                                    required
                                    defaultValue={!state?.success ? undefined : ''}
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                className="block text-sm font-bold text-slate-700 mb-1.5"
                                htmlFor="nim"
                            >
                                NIM <span className="text-slate-400 font-normal">(Opsional)</span>
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    numbers
                                </span>
                                <input
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm"
                                    id="nim"
                                    name="nim"
                                    placeholder="Nomor Induk Mahasiswa"
                                    type="text"
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
                                    className="w-full pl-10 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm"
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
                                    className="w-full pl-10 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm"
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
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 group mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
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
                                    <span>Daftar Sekarang</span>
                                    <span className="material-symbols-outlined !text-sm group-hover:translate-x-1 transition-transform">
                                        arrow_forward
                                    </span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-500">
                            Sudah memiliki akun?{' '}
                            <Link
                                className="text-teal-600 font-bold hover:underline"
                                href="/user/login"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Background Shapes */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-600/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-teal-600/5 rounded-full blur-[80px]"></div>
            </div>
        </div>
    )
}
