import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { createClient } from '@/lib/supabase/server'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (!user.email) return false

            const supabase = await createClient()

            // Check if user exists
            const { data: existingUser } = await supabase
                .from('users')
                .select('*')
                .eq('email', user.email)
                .single()

            if (!existingUser) {
                // Create new user
                await supabase.from('users').insert({
                    email: user.email,
                    name: user.name || '',
                    username: user.email.split('@')[0],
                    photo_url: user.image,
                    role: 'user',
                })
            }

            return true
        },
        async session({ session, token }) {
            if (session.user && token.sub) {
                const supabase = await createClient()
                const { data } = await supabase
                    .from('users')
                    .select('id, role, username')
                    .eq('email', session.user.email!)
                    .single()

                if (data) {
                    session.user.id = data.id
                    session.user.role = data.role
                    session.user.username = data.username
                }
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id
            }
            return token
        },
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
