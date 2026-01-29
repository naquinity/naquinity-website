'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { format } from 'date-fns'
import type { Program } from '@/types/database'

export default function UserProgramCard({ program }: { program: Program }) {
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Simple heuristic: if description is long enough to likely be clamped
    const isLongDescription = program.description && program.description.length > 150

    return (
        <>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:shadow-teal-900/5 transition-all group flex flex-col h-full border border-slate-100">
                {program.logo_url || program.cover_image_url ? (
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                        <img
                            src={program.logo_url || program.cover_image_url}
                            alt={program.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                ) : (
                    <div className="h-48 bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                        <span className="material-symbols-outlined text-6xl text-white">
                            view_agenda
                        </span>
                    </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                        <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                            {program.title}
                        </h3>
                        <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                            {program.description}
                        </p>

                        {program.start_date && (
                            <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                                <span className="material-symbols-outlined !text-sm">
                                    calendar_today
                                </span>
                                <span>
                                    {new Date(program.start_date).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </span>
                            </div>
                        )}
                    </div>

                    {isLongDescription && (
                        <button
                            onClick={() => setIsOpen(true)}
                            className="text-teal-600 font-bold text-sm flex items-center gap-1 hover:underline mt-auto self-start"
                        >
                            <span>Baca Selengkapnya</span>
                            <span className="material-symbols-outlined !text-sm">
                                arrow_forward
                            </span>
                        </button>
                    )}
                </div>
            </div>

            {/* Modal Portal */}
            {isOpen && mounted && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    {/* Content */}
                    <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">

                        {/* Header Image */}
                        <div className="relative h-48 sm:h-64 bg-slate-100 flex-shrink-0">
                            {program.logo_url || program.cover_image_url ? (
                                <img
                                    src={program.logo_url || program.cover_image_url}
                                    alt={program.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-6xl text-white">
                                        view_agenda
                                    </span>
                                </div>
                            )}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition backdrop-blur-md"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="p-6 sm:p-8">
                            {/* Date Badge */}
                            {program.start_date && (
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-4 border border-teal-100">
                                    <span className="material-symbols-outlined !text-base">
                                        calendar_today
                                    </span>
                                    <span>
                                        {new Date(program.start_date).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </span>
                                </div>
                            )}

                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                                {program.title}
                            </h2>

                            <div className="prose prose-slate max-w-none text-slate-600">
                                <p className="whitespace-pre-wrap leading-relaxed">
                                    {program.description}
                                </p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    )
}
