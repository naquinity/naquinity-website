import { redirect } from 'next/navigation'

export async function GET() {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback'
    console.log('[GoogleAuth] Client ID:', clientId)
    console.log('[GoogleAuth] Redirect URI:', redirectUri)

    const params = new URLSearchParams({
        client_id: clientId!,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: 'email profile',
        access_type: 'online',
        prompt: 'select_account',
    })

    // Redirect to Google
    redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`)
}
