'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { Mahasiswa } from '@/types/database'
import { createPortal } from 'react-dom'

interface MahasiswaDetailModalProps {
    isOpen: boolean
    onClose: () => void
    mhs: Mahasiswa
}

export default function MahasiswaDetailModal({ isOpen, onClose, mhs }: MahasiswaDetailModalProps) {
    const [mounted, setMounted] = useState(false)
    const [imgError, setImgError] = useState(false)

    useEffect(() => {
        setMounted(true)
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    if (!mounted || !isOpen) return null

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content - ID Card Style */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
                >
                    <span className="material-symbols-outlined text-slate-700">close</span>
                </button>

                <div className="flex flex-col md:flex-row h-full">
                    {/* Left Side: Details */}
                    <div className="relative flex-1 p-8 flex flex-col justify-center order-2 md:order-1 bg-white overflow-hidden">
                        {/* Background Logo Silhouette */}
                        <div className="absolute -left-12 -bottom-12 w-80 h-80 opacity-20 pointer-events-none select-none grayscale-[0.5]">
                            <Image
                                src="https://tools.naquinity.web.id/images/logo/100kb.png"
                                alt="Logo Silhouette"
                                fill
                                className="object-contain"
                                unoptimized
                            />
                        </div>

                        <div className="relative z-10 mb-6">
                            <h3 className="text-2xl font-black text-slate-900 mb-2 font-display">
                                {mhs.name}
                            </h3>
                            <div className="inline-block px-3 py-1 bg-primary/10 rounded-full">
                                <p className="text-sm font-bold text-primary tracking-wide font-mono">
                                    {mhs.nim}
                                </p>
                            </div>
                        </div>

                        {mhs.quote && (
                            <div className="mb-8 relative">
                                <span className="absolute -top-4 -left-2 text-6xl text-slate-100 font-serif leading-none select-none">"</span>
                                <p className="text-slate-600 italic relative z-10 leading-relaxed">
                                    {mhs.quote}
                                </p>
                            </div>
                        )}

                        <div className="relative z-10">
                            {mhs.email && (
                                <a
                                    href={`mailto:${mhs.email}`}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors font-semibold shadow-lg shadow-primary/20"
                                >
                                    <span className="material-symbols-outlined text-xl">
                                        email
                                    </span>
                                    Kirim Email
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Right Side: Photo */}
                    <div className="w-full md:w-2/5 relative min-h-[300px] md:min-h-full bg-slate-100 order-1 md:order-2">
                        {mhs.photo_url && !imgError ? (
                            <>
                                <Image
                                    src={mhs.photo_url}
                                    alt={mhs.name}
                                    fill
                                    className="object-cover"
                                    onError={() => setImgError(true)}
                                    sizes="(max-width: 768px) 100vw, 40vw"
                                    unoptimized
                                    onContextMenu={(e) => e.preventDefault()}
                                    draggable={false}
                                />
                                {/* Overlay gradient for text readability on mobile if needed, or style */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden" />

                                {/* Protection overlay */}
                                <div
                                    className="absolute inset-0 z-10"
                                    onContextMenu={(e) => e.preventDefault()}
                                />
                            </>
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                                <span className="material-symbols-outlined text-9xl text-white/20">
                                    person
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}
