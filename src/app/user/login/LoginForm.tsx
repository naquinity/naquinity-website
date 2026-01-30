'use client'

import { loginUser } from '@/actions/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useActionState } from 'react'
import { useState } from 'react'

export default function UserLoginForm() {
    const [state, action, isPending] = useActionState(loginUser, null)
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="bg-[#f0fdfa] text-slate-800 font-display antialiased min-h-screen flex items-center justify-center p-4 relative z-0">
            {/* ... outer structure ... */}
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.05),0_10px_10px_-5px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col md:flex-row min-h-[550px] relative z-10">
                {/* Left Side */}
                <div className="md:w-5/12 bg-teal-600 p-10 flex flex-col justify-center text-white relative overflow-hidden">
                    {/* ... left side content ... */}
                    <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
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
                        <p className="text-teal-50 text-sm max-w-xs leading-relaxed">
                            Selamat datang kembali. Masuk untuk mengakses dashboard.
                        </p>
                    </div>
                    <div className="mt-auto relative z-10 pt-10">
                        <div className="flex items-center gap-2 text-xs font-medium text-teal-200">
                            <span>V 3.0.1</span>
                            <span className="w-1 h-1 rounded-full bg-teal-200/50"></span>
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
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm"
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
                                    className="w-full pl-10 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm"
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

                        <button
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
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
                                    <span>Masuk</span>
                                    <span className="material-symbols-outlined !text-sm group-hover:translate-x-1 transition-transform">
                                        arrow_forward
                                    </span>
                                </>
                            )}
                        </button>

                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t border-slate-200"></div>
                            <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-bold uppercase">
                                Atau
                            </span>
                            <div className="flex-grow border-t border-slate-200"></div>
                        </div>

                        <a
                            href="/api/auth/google?type=user"
                            className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-3 relative group"
                        >
                            <div className="w-5 h-5 relative">
                                <Image
                                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                                    alt="Google"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span>Masuk dengan Google</span>
                        </a>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-500">
                            Belum memiliki akun?{' '}
                            <Link
                                className="text-teal-600 font-bold hover:underline"
                                href="/user/register"
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
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-600/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-teal-600/5 rounded-full blur-[80px]"></div>
            </div>
        </div>
    )
}
