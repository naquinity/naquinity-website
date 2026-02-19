'use client'

import React from 'react'
import Image from 'next/image'
import type { Pengurus } from '@/types/database'

export default function PengurusCard({ p }: { p: Pengurus }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all group">
            {p.photo_url ? (
                <div className="aspect-square bg-slate-100 overflow-hidden relative">
                    <Image
                        src={p.photo_url}
                        alt={p.name}
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
                        person
                    </span>
                </div>
            )}

            <div className="p-6 text-center">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-3">
                    {p.position}
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-1">
                    {p.name}
                </h3>
                {p.nim && (
                    <p className="text-xs text-slate-500 font-mono">
                        {p.nim}
                    </p>
                )}
            </div>
        </div>
    )
}
