import PublicLayout from '@/components/layout/PublicLayout'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Halaman Tidak Ditemukan | Naquinity',
}

export default function NotFound() {
    return (
        <div className="font-display">
            <PublicLayout>
                <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 bg-slate-50 text-center">
                    {/* Illustration / Icon Area */}
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-blue-100 blur-3xl rounded-full opacity-50 scale-150 -z-10 animate-pulse"></div>
                        <span className="material-symbols-outlined text-9xl text-slate-300 drop-shadow-md">
                            sentiment_dissatisfied
                        </span>
                        {/* 404 Badge */}
                        <div className="absolute -bottom-4 -right-4 bg-white border-4 border-slate-50 text-slate-800 font-black text-2xl px-4 py-1 rounded-2xl shadow-xl rotate-12">
                            404
                        </div>
                    </div>

                    {/* Text Context */}
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                        Yah Eror:(
                    </h1>
                    <p className="text-slate-500 text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed">
                        Halaman yang Anda tuju sepertinya terhapus, atau memang tidak pernah ada. Coba cek lagi URL-nya ya!
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined !text-[1.2rem]">home</span>
                            Kembali ke Beranda
                        </Link>
                    </div>
                </div>
            </PublicLayout>
        </div>
    )
}
