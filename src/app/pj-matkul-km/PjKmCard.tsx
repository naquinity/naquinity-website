'use client'

import React from 'react'
import Image from 'next/image'
import type { PjKm } from '@/types/database'

export default function PjKmCard({ item }: { item: PjKm }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all group">
            {item.photo_url ? (
                <div className="aspect-square bg-slate-100 overflow-hidden relative">
                    <Image
                        src={item.photo_url}
                        alt={item.name}
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
                {/* Role Badge */}
                {item.role === 'PJ Matkul' ? (
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold mb-3">
                        <span className="material-symbols-outlined !text-sm">book</span>
                        <span>PJ Matkul</span>
                    </div>
                ) : (
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold mb-3">
                        <span className="material-symbols-outlined !text-sm">groups</span>
                        <span>KM Kelas</span>
                    </div>
                )}

                <h3 className="font-bold text-lg text-slate-900 mb-1">
                    {item.name}
                </h3>
                <p className="text-xs text-slate-500 font-mono mb-4">
                    {item.nim}
                </p>

                {/* Additional Info */}
                <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-2 text-slate-600">
                        <span className="material-symbols-outlined !text-base">school</span>
                        <span>Kelas {item.kelas}</span>
                    </div>
                    {item.matkul && (
                        <div className="flex items-center justify-center gap-2 text-slate-600">
                            <span className="material-symbols-outlined !text-base">menu_book</span>
                            <span className="font-medium">{item.matkul}</span>
                        </div>
                    )}
                    <div className="inline-flex items-center justify-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium mt-3">
                        <span>Semester {item.semester}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
