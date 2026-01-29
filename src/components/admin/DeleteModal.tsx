'use client'

import { useState } from 'react'

interface DeleteModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    message: string
    itemName: string
    isDeleting?: boolean
}

export default function DeleteModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    itemName,
    isDeleting = false
}: DeleteModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 transform transition-all text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-red-600 text-3xl">
                        delete
                    </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {title}
                </h3>
                <p className="text-slate-600 mb-6 text-sm">
                    {message} <strong>{itemName}</strong>? <br />
                    Data yang dihapus tidak dapat dikembalikan.
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition disabled:opacity-50"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition text-center flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isDeleting ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                <span>Menghapus...</span>
                            </>
                        ) : (
                            'Ya, Hapus'
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
