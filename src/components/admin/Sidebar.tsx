'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminSidebar({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}) {
    const pathname = usePathname()

    const isActive = (path: string) => {
        if (path === '/dashboard') {
            return pathname === '/dashboard'
        }
        return pathname === path || pathname.startsWith(`${path}/`)
    }

    const menuItems = [
        { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
        { href: '/dashboard/tentang', label: 'Tentang Kami', icon: 'info' },
        { href: '/dashboard/program', label: 'Program Kami', icon: 'calendar_month' },
        { href: '/dashboard/pencapaian', label: 'Pencapaian', icon: 'trophy' },
        { href: '/dashboard/news', label: 'Siaran Pers', icon: 'trending_up' },
        { href: '/dashboard/keuangan', label: 'Keuangan', icon: 'account_balance' },
        { href: '/dashboard/mahasiswa', label: 'Mahasiswa', icon: 'groups' },
        { href: '/dashboard/pj-km', label: 'PJ Matkul-KM', icon: 'school' },
        { href: '/dashboard/pengurus', label: 'Pengurus', icon: 'shield_person' },
    ]

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-45 lg:hidden ${isOpen ? 'block' : 'hidden'
                    }`}
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 p-4 lg:h-full overflow-y-auto transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                <nav className="space-y-1">
                    {menuItems.map((item, index) => {
                        // Divider before Mahasiswa (index 6) to match PHP
                        const isDivider = index === 6
                        const active = isActive(item.href)

                        return (
                            <div key={item.href}>
                                {isDivider && (
                                    <div className="my-3 border-t border-slate-200"></div>
                                )}
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${active
                                        ? 'bg-primary text-white'
                                        : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <span
                                        className={`material-symbols-outlined ${active ? '' : 'text-slate-400'
                                            }`}
                                    >
                                        {item.icon}
                                    </span>
                                    <span className={`text-sm ${active ? 'font-bold' : 'font-medium'}`}>
                                        {item.label}
                                    </span>
                                </Link>
                            </div>
                        )
                    })}
                </nav>
            </aside>
        </>
    )
}
