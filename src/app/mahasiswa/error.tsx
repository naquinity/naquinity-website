'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
            <div className="text-center max-w-md">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
                    <span className="material-symbols-outlined text-3xl text-red-600">
                        error
                    </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Terjadi Kesalahan
                </h2>
                <p className="text-slate-600 mb-8">
                    Maaf, terjadi kesalahan saat memuat data mahasiswa. Silakan coba muat ulang halaman.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => reset()}
                        className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors"
                    >
                        Coba Lagi
                    </button>
                    <Link
                        href="/"
                        className="px-6 py-2.5 bg-white text-slate-700 font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
                    >
                        Kembali ke Beranda
                    </Link>
                </div>
                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-8 p-4 bg-red-50 rounded-lg text-left overflow-auto max-h-48 text-xs font-mono text-red-800 border border-red-200">
                        <p className="font-bold mb-1">Error details:</p>
                        {error.message}
                    </div>
                )}
            </div>
        </div>
    )
}
