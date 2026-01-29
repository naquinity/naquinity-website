import UserLayoutShell from '@/components/user/LayoutShell'
import { getUserUser } from '@/lib/dal'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getUserUser()

    if (!user) {
        redirect('/user/login')
    }

    return <UserLayoutShell user={user}>{children}</UserLayoutShell>
}
