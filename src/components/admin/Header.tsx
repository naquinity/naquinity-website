'use client'

import { logoutAdmin } from '@/actions/auth'
import Image from 'next/image'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'

export default function AdminHeader({
    toggleSidebar,
    user,
}: {
    toggleSidebar: () => void
    user: { name: string; email: string }
}) {
    const [showLogoutModal, setShowLogoutModal] = useState(false)

    return (
        <>
            <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Mobile menu toggle */}
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition"
                        >
                            <span className="material-symbols-outlined text-slate-600">
                                menu
                            </span>
                        </button>
                        <Image
                            src="https://tools.naquinity.web.id/images/logo/100kb.png"
                            alt="Naquinity Logo"
                            width={40}
                            height={40}
                            className="h-8 sm:h-10 w-auto"
                        />
                        <div className="hidden sm:block">
                            <h1 className="font-bold text-base sm:text-lg text-primary">
                                Naquinity
                            </h1>
                            <p className="text-xs text-slate-500">Dashboard Admin</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold text-slate-800 leading-none">
                                {user.name}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">{user.email}</p>
                        </div>
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <button
                            onClick={() => setShowLogoutModal(true)}
                            className="px-2 sm:px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm font-semibold flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined !text-base">
                                logout
                            </span>
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                                <span className="material-symbols-outlined text-red-600 text-2xl">
                                    logout
                                </span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">
                                    Konfirmasi Logout
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Anda yakin ingin keluar?
                                </p>
                            </div>
                        </div>
                        <p className="text-slate-600 mb-6">
                            Anda akan dialihkan ke halaman login.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition"
                            >
                                Batal
                            </button>
                            <form action={logoutAdmin} className="flex-1">
                                <LogoutButton />
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

function LogoutButton() {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full px-4 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition text-center flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
            {pending ? (
                <>
                    <span className="material-symbols-outlined animate-spin !text-lg">progress_activity</span>
                    <span>Keluar...</span>
                </>
            ) : (
                'Ya, Logout'
            )}
        </button>
    )
}
