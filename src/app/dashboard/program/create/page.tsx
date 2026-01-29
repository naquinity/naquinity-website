'use client'

import { createProgram } from '@/actions/program'
import Link from 'next/link'
import { useState, useRef, useActionState } from 'react'
import Image from 'next/image'

// Form State Interface - Optional/Implicit

export default function CreateProgramPage() {
    const [state, action] = useActionState(createProgram, null)
    const [uploadMethod, setUploadMethod] = useState<'upload' | 'url'>('upload')
    const [preview, setPreview] = useState<string | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setPreview(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        } else {
            setPreview(null)
        }
    }

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPreview(e.target.value)
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <Link href="/dashboard" className="hover:text-primary">
                    Dashboard
                </Link>
                <span className="material-symbols-outlined !text-sm">chevron_right</span>
                <Link href="/dashboard/program" className="hover:text-primary">
                    Program Kami
                </Link>
                <span className="material-symbols-outlined !text-sm">chevron_right</span>
                <span className="font-bold text-slate-800">Tambah Program</span>
            </div>

            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-primary mb-2">
                        Tambah Program
                    </h2>
                    <p className="text-slate-600">
                        Lengkapi detail untuk program komunitas
                    </p>
                </div>
                <Link
                    href="/dashboard/program"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-600 font-bold rounded-lg hover:bg-slate-50 transition"
                >
                    <span className="material-symbols-outlined">close</span>
                    Batal
                </Link>
            </div>

            {state?.error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-600">error</span>
                    <p className="text-sm text-red-800 font-medium">{state.error}</p>
                </div>
            )}

            {/* Form */}
            <form action={action} className="space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                    Nama Program
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm"
                                    placeholder="Contoh: Navindra Hackathon 2024"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                    Tanggal Mulai
                                </label>
                                <input
                                    type="date"
                                    name="start_date"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                                // required - made optional per user request
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                    Tanggal Selesai
                                </label>
                                <input
                                    type="date"
                                    name="end_date"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                                />
                            </div>


                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                    Upload Logo Program
                                </label>

                                {/* Method Selection */}
                                <div className="flex gap-4 mb-3">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="logo_method"
                                            value="upload"
                                            checked={uploadMethod === 'upload'}
                                            onChange={() => setUploadMethod('upload')}
                                            className="text-primary focus:ring-primary"
                                        />
                                        <span className="text-sm text-slate-700">Upload File</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="logo_method"
                                            value="url"
                                            checked={uploadMethod === 'url'}
                                            onChange={() => setUploadMethod('url')}
                                            className="text-primary focus:ring-primary"
                                        />
                                        <span className="text-sm text-slate-700">URL Link</span>
                                    </label>
                                </div>

                                {/* Upload Section */}
                                {uploadMethod === 'upload' && (
                                    <div>
                                        <input
                                            type="file"
                                            name="image"
                                            id="image"
                                            accept="image/*"
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                        />
                                        <p className="text-xs text-slate-500 mt-1">
                                            PNG, JPG (Maks. 2MB)
                                        </p>
                                    </div>
                                )}

                                {/* URL Section */}
                                {uploadMethod === 'url' && (
                                    <div>
                                        <input
                                            type="url"
                                            name="logo_url"
                                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm"
                                            placeholder="https://example.com/logo.png"
                                            onChange={handleUrlChange}
                                        />
                                        <p className="text-xs text-slate-500 mt-1">
                                            Paste URL logo
                                        </p>
                                    </div>
                                )}

                                {/* Preview */}
                                {preview && (
                                    <div className="mt-3">
                                        <p className="text-xs font-bold text-slate-700 mb-2">
                                            Preview:
                                        </p>
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="max-h-24 rounded-lg border border-slate-200"
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                    Deskripsi Program
                                </label>
                                <textarea
                                    name="description"
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm resize-none"
                                    placeholder="Jelaskan tujuan dan detail program..."
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                    <Link
                        href="/dashboard/program"
                        className="px-6 py-3 text-slate-600 font-bold text-sm hover:bg-slate-100 rounded-lg transition"
                    >
                        Batal
                    </Link>
                    <button
                        type="submit"
                        className="px-8 py-3 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition flex items-center gap-2 group"
                    >
                        <span className="material-symbols-outlined">save</span>
                        Simpan Program
                    </button>
                </div>
            </form>
        </div>
    )
}
