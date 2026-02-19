'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import type { Mahasiswa } from '@/types/database'
import MahasiswaDetailModal from './MahasiswaDetailModal'

export default function MahasiswaCard({ mhs }: { mhs: Mahasiswa }) {
    const [imgError, setImgError] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all group h-full flex flex-col">
                {mhs.photo_url && !imgError ? (
                    <div className="aspect-square bg-slate-100 overflow-hidden relative" onClick={() => setIsModalOpen(true)}>
                        <Image
                            src={mhs.photo_url}
                            alt={mhs.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                            onError={() => setImgError(true)}
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            unoptimized
                            onContextMenu={(e) => e.preventDefault()}
                            draggable={false}
                        />
                        {/* Transparent overlay for extra protection */}
                        <div
                            className="absolute inset-0 z-10 cursor-pointer"
                            onContextMenu={(e) => e.preventDefault()}
                            onClick={() => setIsModalOpen(true)}
                        />
                    </div>
                ) : (
                    <div
                        className="aspect-square bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <span className="material-symbols-outlined text-8xl text-white">
                            person
                        </span>
                    </div>
                )}

                <div className="p-6 text-center flex flex-col flex-1">
                    <h3
                        className="font-bold text-lg text-slate-900 mb-1 line-clamp-1 cursor-pointer hover:text-primary transition-colors"
                        title={mhs.name}
                        onClick={() => setIsModalOpen(true)}
                    >
                        {mhs.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono mb-3">
                        {mhs.nim}
                    </p>

                    {mhs.quote && (
                        <p className="text-slate-500 text-sm italic line-clamp-3 mb-4 flex-1">
                            "{mhs.quote}"
                        </p>
                    )}

                    <div className="mt-auto flex justify-center">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-primary transition-colors bg-slate-50 hover:bg-slate-100 px-4 py-2 rounded-full border border-slate-200"
                        >
                            <span className="material-symbols-outlined !text-sm">
                                id_card
                            </span>
                            Lihat Kartu
                        </button>
                    </div>
                </div>
            </div>

            <MahasiswaDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mhs={mhs}
            />
        </>
    )
}
