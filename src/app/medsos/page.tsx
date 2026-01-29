import PublicLayout from '@/components/layout/PublicLayout'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Media Sosial',
}

export default function MedsosPage() {
    return (
        <div className="font-display">
            <PublicLayout>
                {/* Hero */}
                <div
                    className="w-full relative bg-cover bg-center min-h-[400px] flex items-center justify-center mb-10 overflow-hidden"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(10, 43, 77, 0.7), rgba(10, 43, 77, 0.85)), url("https://cdn-1.naquinity.web.id/angkatan/IMG_7080.JPG")',
                    }}
                >
                    <div className="flex flex-col max-w-[800px] p-6 text-center z-10 gap-6">
                        <div className="flex flex-col gap-3">
                            <span className="text-blue-200 text-sm font-bold uppercase tracking-widest">
                                Connect With Us
                            </span>
                            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight">
                                Terhubung Dengan Kami
                            </h1>
                            <p className="text-gray-200 text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
                                Ikuti Naquinity di berbagai platform untuk terus terhubung dengan
                                kami.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="w-full max-w-[960px] px-4 md:px-6 pb-20 -mt-20 z-20 mx-auto relative">
                    <div className="bg-white dark:bg-[#1a2632] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 md:p-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {/* YouTube */}
                            <a
                                className="group flex flex-col p-5 rounded-xl bg-slate-50 dark:bg-gray-800 border border-transparent hover:border-primary/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                href="https://www.youtube.com/@naquinity"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-white dark:bg-gray-700 rounded-full text-primary dark:text-white shadow-sm group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined icon-filled">
                                            smart_display
                                        </span>
                                    </div>
                                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">
                                        arrow_outward
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-bold text-[#111417] dark:text-white">
                                        YouTube
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                        @naquinity
                                    </p>
                                </div>
                            </a>

                            {/* Instagram */}
                            <a
                                className="group flex flex-col p-5 rounded-xl bg-slate-50 dark:bg-gray-800 border border-transparent hover:border-primary/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                href="https://www.instagram.com/naquinity"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-white dark:bg-gray-700 rounded-full text-primary dark:text-white shadow-sm group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined icon-filled">
                                            photo_camera
                                        </span>
                                    </div>
                                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">
                                        arrow_outward
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-bold text-[#111417] dark:text-white">
                                        Instagram
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                        @naquinity
                                    </p>
                                </div>
                            </a>

                            {/* TikTok */}
                            <a
                                className="group flex flex-col p-5 rounded-xl bg-slate-50 dark:bg-gray-800 border border-transparent hover:border-primary/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                href="https://www.tiktok.com/@naquinity"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-white dark:bg-gray-700 rounded-full text-primary dark:text-white shadow-sm group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined icon-filled">
                                            music_note
                                        </span>
                                    </div>
                                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">
                                        arrow_outward
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-bold text-[#111417] dark:text-white">
                                        TikTok
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                        @naquinity
                                    </p>
                                </div>
                            </a>

                            {/* Threads */}
                            <a
                                className="group flex flex-col p-5 rounded-xl bg-slate-50 dark:bg-gray-800 border border-transparent hover:border-primary/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                href="https://www.threads.com/@naquinity"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-white dark:bg-gray-700 rounded-full text-primary dark:text-white shadow-sm group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined icon-filled">
                                            alternate_email
                                        </span>
                                    </div>
                                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">
                                        arrow_outward
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-bold text-[#111417] dark:text-white">
                                        Threads
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                        @naquinity
                                    </p>
                                </div>
                            </a>

                            {/* Facebook */}
                            <a
                                className="group flex flex-col p-5 rounded-xl bg-slate-50 dark:bg-gray-800 border border-transparent hover:border-primary/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                href="https://www.facebook.com/naquinity"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-white dark:bg-gray-700 rounded-full text-primary dark:text-white shadow-sm group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined icon-filled">
                                            groups
                                        </span>
                                    </div>
                                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">
                                        arrow_outward
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-bold text-[#111417] dark:text-white">
                                        Facebook
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                        Naquinity
                                    </p>
                                </div>
                            </a>

                            {/* Twitter */}
                            <a
                                className="group flex flex-col p-5 rounded-xl bg-slate-50 dark:bg-gray-800 border border-transparent hover:border-primary/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                href="https://www.twitter.com/naquinity"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-white dark:bg-gray-700 rounded-full text-primary dark:text-white shadow-sm group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined icon-filled">
                                            newspaper
                                        </span>
                                    </div>
                                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">
                                        arrow_outward
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-bold text-[#111417] dark:text-white">
                                        Twitter / X
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                        @naquinity
                                    </p>
                                </div>
                            </a>

                            {/* Official Website */}
                            <a
                                className="group flex flex-col p-5 rounded-xl bg-primary/5 dark:bg-primary/20 border border-primary/20 hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 sm:col-span-2 md:col-span-3 flex-row items-center gap-4"
                                href="https://landing.naquinity.web.id"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="p-3 bg-primary rounded-full text-white shadow-sm group-hover:scale-110 transition-transform shrink-0">
                                    <span className="material-symbols-outlined">language</span>
                                </div>
                                <div className="flex flex-col flex-1">
                                    <h3 className="text-lg font-bold text-primary dark:text-blue-300">
                                        Landing Page
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        Kunjungi landing.naquinity.web.id untuk akses semuanya
                                    </p>
                                </div>
                                <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
                                    arrow_forward
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </PublicLayout>
        </div>
    )
}
