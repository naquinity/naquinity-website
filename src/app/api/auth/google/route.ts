import { NextRequest, NextResponse } from 'next/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
    const clientId = process.env.GOOGLE_CLIENT_ID

    // Dynamic Redirect URI
    // 1. Priority: Environment Variable
    // 2. Fallback: Dynamic Origin from Request
    let redirectUri = process.env.GOOGLE_REDIRECT_URI

    if (!redirectUri) {
        const protocol = request.nextUrl.protocol
        const host = request.nextUrl.host
        redirectUri = `${protocol}//${host}/api/auth/google/callback`
    }

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
    return redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`)
}
