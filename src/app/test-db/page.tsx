import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function TestDBPage() {
    const supabase = await createClient()

    // Test 1: Check Env Vars (Safe check)
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const hasUrl = !!url
    const maskedUrl = url ? `${url.substring(0, 10)}...` : 'MISSING'

    // Test 2: Connection
    const { data, error, count } = await supabase
        .from('program')
        .select('*', { count: 'exact', head: true })

    // Test 3: Data Fetch
    const { data: programs } = await supabase.from('program').select('id, title').limit(5)

    return (
        <div className="p-10 font-mono text-sm max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Database Connection Test</h1>

            <div className="p-4 border rounded bg-slate-50">
                <h2 className="font-bold mb-2">Environment Variables</h2>
                <p>NEXT_PUBLIC_SUPABASE_URL: {hasUrl ? '✅ FOUND' : '❌ MISSING'}</p>
                <p>Value: {maskedUrl}</p>
            </div>

            <div className="p-4 border rounded bg-slate-50">
                <h2 className="font-bold mb-2">Connection Status</h2>
                {error ? (
                    <div className="text-red-600">
                        <p>❌ ERROR</p>
                        <pre className="mt-2 whitespace-pre-wrap">{JSON.stringify(error, null, 2)}</pre>
                    </div>
                ) : (
                    <div className="text-green-600">
                        <p>✅ SUCCESS</p>
                        <p>Table 'program' exists and is accessible.</p>
                        <p>Total Rows: {count}</p>
                    </div>
                )}
            </div>

            <div className="p-4 border rounded bg-slate-50">
                <h2 className="font-bold mb-2">Sample Data</h2>
                {programs && programs.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {programs.map((p) => (
                            <li key={p.id}>{p.title} ({p.id})</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-orange-500">No data found (or empty table)</p>
                )}
            </div>
        </div>
    )
}
