'use client'

import UserHeader from '@/components/user/Header'
import UserSidebar from '@/components/user/Sidebar'
import { useState } from 'react'

export default function UserLayoutShell({
    children,
    user,
}: {
    children: React.ReactNode
    user: { name: string; email: string }
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen bg-slate-50 font-display">
            <UserSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="lg:ml-64 min-h-screen flex flex-col transition-all duration-300">
                <UserHeader
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    user={user}
                />
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
