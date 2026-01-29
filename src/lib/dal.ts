import 'server-only'

import { createClient } from '@supabase/supabase-js'
import { cache } from 'react'
import { getSession } from './session'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const TABLE_ADMIN = 'admin_users'
const TABLE_USERS = 'users'

export const verifySession = cache(async () => {
    const session = await getSession()

    if (!session?.userId) {
        console.log('verifySession: No session or userId found')
        return null
    }

    return { isAuth: true, userId: session.userId, role: session.role }
})

export const getAdminUser = cache(async () => {
    const session = await verifySession()
    if (!session) {
        console.log('getAdminUser: Session verification failed')
        return null
    }

    if (session.role !== 'admin') {
        console.log('getAdminUser: Role mismatch', session.role)
        return null
    }

    try {
        const { data: user, error } = await supabase
            .from(TABLE_ADMIN)
            .select('name, email, username')
            .eq('id', session.userId)
            .single()

        if (error) {
            console.error('getAdminUser: Supabase query error', error)
            return null
        }

        return user
    } catch (error) {
        console.error('Failed to fetch user:', error)
        return null
    }
})

export const getUserUser = cache(async () => {
    const session = await verifySession()
    if (!session || session.role !== 'user') return null

    try {
        const { data: user } = await supabase
            .from(TABLE_USERS)
            .select('name, email, username, nim')
            .eq('id', session.userId)
            .single()

        return user
    } catch (error) {
        console.error('Failed to fetch user:', error)
        return null
    }
})
