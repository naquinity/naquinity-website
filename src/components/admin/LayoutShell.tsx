'use client'

import AdminHeader from '@/components/admin/Header'
import AdminSidebar from '@/components/admin/Sidebar'
import { useState } from 'react'

export default function AdminLayoutShell({
    children,
    user,
}: {
    children: React.ReactNode
    user: { name: string; email: string }
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="h-screen flex flex-col bg-slate-50 font-display overflow-hidden">
            <AdminHeader
                toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                user={user}
            />
            <div className="flex flex-1 overflow-hidden">
                <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    )
}
