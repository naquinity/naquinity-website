'use client'

import { loginAdmin } from '@/actions/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useActionState } from 'react'
import { useState } from 'react'

export default function AdminLoginForm() {
    const [state, action] = useActionState(loginAdmin, null)
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="bg-[#f8fafc] text-slate-800 font-display antialiased min-h-screen flex items-center justify-center p-4 relative z-0">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.05),0_10px_10px_-5px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col md:flex-row min-h-[550px] relative z-10">
                {/* Left Side */}
                <div className="md:w-5/12 bg-primary p-10 flex flex-col justify-center text-white relative overflow-hidden">
                    <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <div className="mb-6">
                            <Image
                                src="https://tools.naquinity.web.id/images/logo/100kb.png"
                                alt="Naquinity Logo"
                                width={64}
                                height={64}
                                className="mb-4 w-16 h-16"
                            />
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight mb-4 leading-tight">
                            Naquinity
                        </h2>
                        <p className="text-white/80 text-sm max-w-xs leading-relaxed">
                            Selamat datang kembali. Masuk untuk mengakses dashboard admin.
                        </p>
                    </div>
                    <div className="mt-auto relative z-10 pt-10">
                        <div className="flex items-center gap-2 text-xs font-medium text-white/50">
                            <span>V 3.0.1</span>
                            <span className="w-1 h-1 rounded-full bg-white/20"></span>
                            <span>Naquinity Website</span>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="md:w-7/12 p-8 md:p-14 flex flex-col justify-center">
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-slate-900 mb-1">Login</h3>
                        <p className="text-slate-500 text-sm">
                            Silakan masukkan akun Anda untuk melanjutkan.
                        </p>
                    </div>

                    {state?.error && (
                        <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-red-600 !text-lg">
                                    error
                                </span>
                                <p className="text-sm text-red-800 font-medium">
                                    {state.error}
                                </p>
                            </div>
                        </div>
                    )}

                    <form action={action} className="space-y-5">
                        <div>
                            <label
                                className="block text-sm font-bold text-slate-700 mb-1.5"
                                htmlFor="identity"
                            >
                                Email atau Username
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    person
                                </span>
                                <input
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                    id="identity"
                                    name="identity"
                                    placeholder="namakamu@email.com"
                                    type="text"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label
                                    className="block text-sm font-bold text-slate-700"
                                    htmlFor="password"
                                >
                                    Kata Sandi
                                </label>
                            </div>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    lock
                                </span>
                                <input
                                    className="w-full pl-10 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
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
                        <div className="flex items-center">
                            <input
                                className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded"
                                id="remember-me"
                                type="checkbox"
                                name="remember"
                            />
                            <label
                                className="ml-2 block text-sm text-slate-600"
                                htmlFor="remember-me"
                            >
                                Ingat saya di perangkat ini
                            </label>
                        </div>
                        <button
                            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
                            type="submit"
                        >
                            <span>Masuk</span>
                            <span className="material-symbols-outlined !text-sm group-hover:translate-x-1 transition-transform">
                                arrow_forward
                            </span>
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 border-t border-slate-200"></div>
                        <span className="text-sm text-slate-500">atau</span>
                        <div className="flex-1 border-t border-slate-200"></div>
                    </div>

                    {/* Google Login */}
                    <Link
                        href="/api/auth/google"
                        className="w-full bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-3 group"
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
                        <span>Login dengan Google</span>
                    </Link>

                    <div className="mt-10 pt-6 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-500">
                            Belum memiliki akun?{' '}
                            <Link
                                className="text-primary font-bold hover:underline"
                                href="/admin/register"
                            >
                                Daftar
                            </Link>{' '}
                            sekarang!
                        </p>
                    </div>
                </div>
            </div>

            {/* Background Shapes */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[80px]"></div>
            </div>
        </div>
    )
}
