'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function QRGeneratorClient() {
    const [inputValue, setInputValue] = useState('')
    const [qrValue, setQrValue] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Base URL for the QR Code API
    const QR_API_BASEUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data='

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputValue.trim()) return

        setIsGenerating(true)
        // Simulate a tiny delay for better UX
        setTimeout(() => {
            setQrValue(inputValue.trim())
            setIsModalOpen(true)
            setIsGenerating(false)
        }, 500)
    }

    const handleDownload = async () => {
        if (!qrValue) return

        try {
            const qrImageUrl = `${QR_API_BASEUrl}${encodeURIComponent(qrValue)}`

            // Fetch the image as a blob
            const response = await fetch(qrImageUrl)
            const blob = await response.blob()

            // Create a local object URL
            const url = window.URL.createObjectURL(blob)

            // Trigger download
            const link = document.createElement('a')
            link.href = url
            // suggest a filename based on the input text, truncated to a safe length
            const safeName = qrValue.replace(/[^a-z0-9]/gi, '_').toLowerCase().substring(0, 30)
            link.download = `qr_${safeName || 'code'}.png`
            document.body.appendChild(link)
            link.click()

            // Cleanup
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Failed to download QR code:', error)
            alert('Gagal mengunduh QR code. Silakan coba lagi.')
        }
    }

    return (
        <div className="max-w-4xl mx-auto pb-12">
            {/* Header */}
            <div className="mb-8 p-6 md:p-8 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-3xl text-white shadow-lg overflow-hidden relative">
                <div className="relative z-10">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-2 flex items-center gap-3">
                        <span className="material-symbols-outlined text-3xl md:text-4xl">qr_code_scanner</span>
                        QR Code Generator
                    </h1>
                    <p className="text-teal-50 max-w-2xl">
                        Buat QR Code dengan mudah dan cepat. Masukkan tautan (URL) atau teks apa pun, dan kami akan membuatkan QR Code yang bisa Anda unduh.
                    </p>
                </div>
                {/* Decorative background circle */}
                <div className="absolute -right-16 -top-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute right-32 -bottom-32 w-80 h-80 bg-teal-900/10 rounded-full blur-3xl pointer-events-none"></div>
            </div>

            <div className="w-full space-y-8">
                {/* Input Form (Center Column) */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8">
                    <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-teal-600">edit_document</span>
                        Masukan Data
                    </h2>

                    <form onSubmit={handleGenerate} className="space-y-6">
                        <div>
                            <label htmlFor="qr-input" className="block text-sm font-semibold text-slate-700 mb-2">
                                Teks atau URL <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="qr-input"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Contoh: https://naquinity.web.id atau teks apa saja..."
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all resize-none h-40"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!inputValue.trim() || isGenerating}
                            className={`w-full py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-md ${inputValue.trim() && !isGenerating
                                ? 'bg-teal-600 hover:bg-teal-700 text-white hover:shadow-lg'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                                }`}
                        >
                            {isGenerating ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin">refresh</span>
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined">qr_code</span>
                                    Buat QR Code
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Mobile: Inline Result */}
                <div className="lg:hidden bg-white rounded-3xl shadow-xl border border-slate-100 p-6 flex flex-col min-h-[400px]">
                    <h2 className="text-lg font-bold text-slate-800 mb-8 flex items-center gap-2 w-full border-b border-slate-100 pb-4">
                        <span className="material-symbols-outlined text-teal-600">visibility</span>
                        Hasil QR Code
                    </h2>

                    {qrValue ? (
                        <div className="flex flex-col items-center justify-center flex-1 w-full animate-in fade-in zoom-in-95 duration-500">
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 relative w-full max-w-[256px] aspect-square flex justify-center items-center">
                                <Image
                                    src={`${QR_API_BASEUrl}${encodeURIComponent(qrValue)}`}
                                    alt="Generated QR Code"
                                    fill
                                    className="object-contain p-2 rounded-xl"
                                    unoptimized
                                />
                            </div>

                            <button
                                onClick={handleDownload}
                                className="w-full px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined">download</span>
                                <span className="text-sm">Unduh File (PNG)</span>
                            </button>
                            <p className="mt-4 text-xs text-slate-400 text-center max-w-sm">
                                Pastikan sudah mengunduh kode QR sebelum keluar dari halaman ini.
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center flex-1 text-center text-slate-400 p-8 w-full">
                            <span className="material-symbols-outlined text-7xl mb-4 opacity-30">qr_code_scanner</span>
                            <p className="font-medium text-slate-500">Belum ada QR Code</p>
                            <p className="text-sm mt-1 max-w-xs">
                                Masukkan teks atau URL di atas lalu klik tombol "Buat QR Code" untuk menampilkan hasilnya di sini.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Desktop: Modal Result */}
            {isModalOpen && qrValue && (
                <div className="hidden lg:flex fixed inset-0 z-50 items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative animate-in zoom-in-95 duration-300">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 hover:bg-slate-100 w-10 h-10 rounded-full transition-colors flex items-center justify-center"
                        >
                            <span className="material-symbols-outlined text-xl">close</span>
                        </button>

                        <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2 w-full border-b border-slate-100 pb-4 pr-10">
                            <span className="material-symbols-outlined text-teal-600">visibility</span>
                            Hasil QR Code
                        </h2>

                        <div className="flex flex-col items-center justify-center w-full">
                            <div className="bg-slate-50 p-4 rounded-2xl shadow-inner border border-slate-200 mb-6 relative w-full h-[256px] flex justify-center items-center">
                                <Image
                                    src={`${QR_API_BASEUrl}${encodeURIComponent(qrValue)}`}
                                    alt="Generated QR Code"
                                    fill
                                    className="object-contain p-2 rounded-xl"
                                    unoptimized
                                />
                            </div>

                            <button
                                onClick={handleDownload}
                                className="w-full px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined">download</span>
                                <span>Unduh File (PNG)</span>
                            </button>
                            <p className="mt-4 text-xs text-slate-400 text-center">
                                Pastikan sudah mengunduh kode QR sebelum menutup popup ini.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
