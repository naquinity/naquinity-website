'use client'

import { logoutUser } from '@/actions/auth'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function UserHeader({
    toggleSidebar,
    user,
}: {
    toggleSidebar: () => void
    user: { name: string; email: string }
}) {
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const pathname = usePathname()

    const getPageTitle = (path: string) => {
        if (path === '/user/dashboard') return 'Dashboard'
        if (path.startsWith('/user/dashboard/program')) return 'Program'
        if (path.startsWith('/user/dashboard/mahasiswa')) return 'Mahasiswa'
        if (path.startsWith('/user/dashboard/pencapaian')) return 'Pencapaian'
        if (path.startsWith('/user/dashboard/pj-km')) return 'PJ Matkul-KM'
        if (path.startsWith('/user/dashboard/keuangan')) return 'Keuangan'
        if (path.startsWith('/user/dashboard/pinjaman')) return 'Pinjaman'
        return 'Dashboard'
    }

    const pageTitle = getPageTitle(pathname)

    return (
        <>
            <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 sticky top-0 z-40">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Mobile menu toggle */}
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition"
                        >
                            <span className="material-symbols-outlined text-slate-600">
                                menu
                            </span>
                        </button>

                        <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                            {pageTitle}
                        </h1>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold text-slate-800 leading-none">
                                {user.name}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">{user.email}</p>
                        </div>
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-teal-100 border-2 border-teal-200 flex items-center justify-center text-teal-700 font-bold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <button
                            onClick={() => setShowLogoutModal(true)}
                            className="px-2 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-bold"
                        >
                            <span className="hidden sm:inline">Logout</span>
                            <span className="sm:hidden material-symbols-outlined !text-sm">logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
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
                        <p className="text-slate-700 mb-6">
                            Anda akan keluar dari dashboard dan akan diarahkan ke halaman Login.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="flex-1 px-4 py-2 border-2 border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                Batal
                            </button>
                            <form action={logoutUser} className="flex-1">
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors text-center"
                                >
                                    Logout
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
