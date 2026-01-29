import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function TestDBPage() {
    const supabase = await createClient()

    // Test 1: Env Vars
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Masking
    const maskedUrl = url ? `${url.substring(0, 15)}...` : 'MISSING'
    const maskedKey = key ? `${key.substring(0, 10)}...${key.substring(key.length - 5)} (Length: ${key.length})` : 'MISSING'

    // Test 2: SDK Connection
    const startSdk = Date.now()
    const { data: sdkData, error: sdkError } = await supabase
        .from('program')
        .select('*')
        .limit(1)
    const sdkTime = Date.now() - startSdk

    // Test 3: Raw Fetch (Bypass SDK)
    let fetchResult = 'Not run'
    let fetchStatus = 0
    let fetchError = null

    if (url && key) {
        try {
            const res = await fetch(`${url}/rest/v1/program?select=*&limit=1`, {
                method: 'GET',
                headers: {
                    'apikey': key,
                    'Authorization': `Bearer ${key}`,
                    'Content-Type': 'application/json'
                },
                cache: 'no-store'
            })
            fetchStatus = res.status
            fetchResult = await res.text()
        } catch (e: any) {
            fetchError = e.message || e.toString()
        }
    }

    return (
        <div className="p-10 font-mono text-sm max-w-3xl mx-auto space-y-8 bg-white min-h-screen">
            <h1 className="text-3xl font-bold text-slate-800 border-b pb-4">Verifying Supabase Connection</h1>

            {/* Env Vars */}
            <div className="space-y-2">
                <h2 className="text-xl font-bold text-slate-700">1. Environment Variables</h2>
                <div className="bg-slate-100 p-4 rounded border">
                    <div className="grid grid-cols-[200px_1fr] gap-2">
                        <div className="font-bold">URL:</div>
                        <div className={url ? "text-green-600" : "text-red-600"}>{maskedUrl}</div>

                        <div className="font-bold">ANON KEY:</div>
                        <div className={key ? "text-green-600" : "text-red-600"}>{maskedKey}</div>
                    </div>
                </div>
            </div>

            {/* SDK Test */}
            <div className="space-y-2">
                <h2 className="text-xl font-bold text-slate-700">2. Supabase SDK Test</h2>
                <div className={`p-4 rounded border ${sdkError ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                    <p><strong>Status:</strong> {sdkError ? 'FAILED ❌' : 'SUCCESS ✅'}</p>
                    <p><strong>Latency:</strong> {sdkTime}ms</p>
                    {sdkError && (
                        <div className="mt-2 text-red-700">
                            <strong>Error Details:</strong>
                            <pre className="mt-1 bg-red-100 p-2 rounded overflow-auto">
                                {JSON.stringify(sdkError, null, 2)}
                            </pre>
                        </div>
                    )}
                    {sdkData && (
                        <div className="mt-2 text-slate-700">
                            <strong>Data Found:</strong> {sdkData.length} rows
                        </div>
                    )}
                </div>
            </div>

            {/* Raw Fetch Test */}
            <div className="space-y-2">
                <h2 className="text-xl font-bold text-slate-700">3. Raw Fetch Test (Direct HTTP)</h2>
                <div className="bg-slate-100 p-4 rounded border overflow-hidden">
                    <p><strong>HTTP Status:</strong> {fetchStatus}</p>
                    {fetchError && <p className="text-red-600"><strong>Fetch Error:</strong> {fetchError}</p>}
                    <div className="mt-2">
                        <strong>Response Body:</strong>
                        <pre className="mt-1 bg-slate-900 text-green-400 p-3 rounded overflow-auto max-h-60 text-xs">
                            {fetchResult}
                        </pre>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 p-4 rounded text-blue-800">
                <strong>Diagnosis Guide:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>If <strong>HTTP Status is 401</strong>: Your ANON KEY is wrong/invalid. Check Vercel Env Vars.</li>
                    <li>If <strong>HTTP Status is 404</strong>: Your URL is wrong.</li>
                    <li>If <strong>HTTP Status is 400</strong>: Bad Request (query error).</li>
                    <li>If <strong>Fetch Error</strong> appears: DNS or Network issue.</li>
                    <li>If <strong>SDK Fails but Raw Fetch Works</strong>: Issue with `@supabase/ssr` config (cookies).</li>
                </ul>
            </div>
        </div>
    )
}
