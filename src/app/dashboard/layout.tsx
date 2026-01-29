import AdminLayoutShell from '@/components/admin/LayoutShell'
import { getAdminUser } from '@/lib/dal'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getAdminUser()

    if (!user) {
        redirect('/admin/login')
    }

    return <AdminLayoutShell user={user}>{children}</AdminLayoutShell>
}
