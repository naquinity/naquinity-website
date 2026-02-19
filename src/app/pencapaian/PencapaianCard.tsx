'use client'

import React from 'react'
import Image from 'next/image'
import type { Pencapaian } from '@/types/database'

export default function PencapaianCard({ item }: { item: Pencapaian }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all group">
            {item.person_photo_url ? (
                <div className="aspect-square bg-slate-100 overflow-hidden relative">
                    <Image
                        src={item.person_photo_url}
                        alt={item.person_name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                        trophy
                    </span>
                </div>
            )}

            <div className="p-6 text-center">
                <h3 className="font-bold text-lg text-slate-900 mb-1">
                    {item.person_name}
                </h3>
                {item.person_nim && (
                    <p className="text-xs text-slate-500 font-mono mb-4">
                        {item.person_nim}
                    </p>
                )}

                <div className="border-t border-slate-100 pt-4 mt-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold mb-3">
                        <span className="material-symbols-outlined !text-sm">
                            trophy
                        </span>
                        Pencapaian
                    </div>
                    <h4 className="text-base font-bold text-slate-800 mb-2 leading-tight group-hover:text-primary transition">
                        {item.title}
                    </h4>
                    <p className="text-slate-600 text-sm line-clamp-3">
                        {item.description}
                    </p>
                </div>
            </div>
        </div>
    )
}
