'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function UserSidebar({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}) {
    const pathname = usePathname()

    const isActive = (path: string) => {
        // Exact match for dashboard home, prefix match for others
        if (path === '/user/dashboard') {
            return pathname === path
        }
        return pathname.startsWith(path)
    }

    const menuItems = [
        { href: '/user/dashboard', label: 'Dashboard', icon: 'dashboard' },
        { href: '/user/dashboard/program', label: 'Program', icon: 'view_agenda' },
        { href: '/user/dashboard/mahasiswa', label: 'Mahasiswa', icon: 'groups' },
        { href: '/user/dashboard/pencapaian', label: 'Pencapaian', icon: 'emoji_events' },
        { href: '/user/dashboard/pj-km', label: 'PJ Matkul-KM', icon: 'school' },
    ]

    const transactionItems = [
        { href: '/user/dashboard/keuangan', label: 'Keuangan', icon: 'account_balance' },
        { href: '/user/dashboard/pinjaman', label: 'Pinjaman', icon: 'request_quote' },
    ]

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-45 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Sidebar */}
            <aside
                id="sidebar"
                className={`fixed top-0 left-0 z-50 h-screen w-64 bg-gradient-to-b from-teal-700 to-teal-800 text-white border-r border-teal-600/20 overflow-y-auto transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                <div className="p-6 border-b border-teal-600">
                    <Image
                        src="https://tools.naquinity.web.id/images/logo/100kb.png"
                        alt="Naquinity"
                        width={48}
                        height={48}
                        className="h-12 w-auto mx-auto mb-2"
                    />
                    <h2 className="text-center font-bold">Naquinity</h2>
                </div>

                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => {
                        const active = isActive(item.href)

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${active
                                    ? 'bg-white text-teal-700 font-bold'
                                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <span className="material-symbols-outlined">
                                    {item.icon}
                                </span>
                                <span className="font-medium">
                                    {item.label}
                                </span>
                            </Link>
                        )
                    })}

                    <div className="my-3 border-t border-teal-600" />

                    {transactionItems.map((item) => {
                        const active = isActive(item.href)

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${active
                                    ? 'bg-white text-teal-700 font-bold'
                                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <span className="material-symbols-outlined">
                                    {item.icon}
                                </span>
                                <span className="font-medium">
                                    {item.label}
                                </span>
                            </Link>
                        )
                    })}
                </nav>
            </aside>
        </>
    )
}
