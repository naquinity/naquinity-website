'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import type { Mahasiswa } from '@/types/database'

export default function MahasiswaCard({ mhs }: { mhs: Mahasiswa }) {
    const [imgError, setImgError] = useState(false)

    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all group h-full flex flex-col">
            {mhs.photo_url && !imgError ? (
                <div className="aspect-square bg-slate-100 overflow-hidden relative">
                    <Image
                        src={mhs.photo_url}
                        alt={mhs.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={() => setImgError(true)}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        unoptimized
                        onContextMenu={(e) => e.preventDefault()}
                        draggable={false}
                    />
                    {/* Transparent overlay for extra protection */}
                    <div
                        className="absolute inset-0 z-10"
                        onContextMenu={(e) => e.preventDefault()}
                    />
                </div>
            ) : (
                <div className="aspect-square bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-8xl text-white">
                        person
                    </span>
                </div>
            )}

            <div className="p-6 text-center flex flex-col flex-1">
                <h3 className="font-bold text-lg text-slate-900 mb-1 line-clamp-1" title={mhs.name}>
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

                <div className="mt-auto">
                    {mhs.email && (
                        <a
                            href={`mailto:${mhs.email}`}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-full transition-colors"
                        >
                            <span className="material-symbols-outlined !text-sm">
                                email
                            </span>
                            Email
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}
