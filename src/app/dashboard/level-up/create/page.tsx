'use client'

import { createLevelUp } from '@/actions/level-up'
import Link from 'next/link'
import { useActionState, useState, useRef } from 'react'

export default function CreateLevelUpPage() {
    const [state, action, isPending] = useActionState(createLevelUp, null)
    const [uploadMethod, setUploadMethod] = useState<'upload' | 'url'>('upload')
    const [preview, setPreview] = useState<string | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)
    const urlInputRef = useRef<HTMLInputElement>(null)

    const handleMethodChange = (method: 'upload' | 'url') => {
        setUploadMethod(method)
        setPreview(null)
        if (method === 'upload') {
            if (urlInputRef.current) urlInputRef.current.value = ''
        } else {
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

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
        const url = e.target.value
        if (url) {
            setPreview(url)
        } else {
            setPreview(null)
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <Link href="/dashboard" className="hover:text-primary">
                    Dashboard
                </Link>
                <span className="material-symbols-outlined !text-sm">chevron_right</span>
                <Link href="/dashboard/level-up" className="hover:text-primary">
                    Level-up
                </Link>
                <span className="material-symbols-outlined !text-sm">chevron_right</span>
                <span className="font-bold text-slate-800">Tambah Artikel</span>
            </div>

            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-primary mb-2">
                        Tambah Artikel
                    </h2>
                    <p className="text-slate-600">
                        Buat konten edukatif untuk anggota komunitas
                    </p>
                </div>
                <Link
                    href="/dashboard/level-up"
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
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Judul Artikel
                            </label>
                            <input
                                type="text"
                                name="title"
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm"
                                placeholder="Contoh: 5 Tips Meningkatkan Produktivitas"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Nama Penulis
                            </label>
                            <input
                                type="text"
                                name="author_name"
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm"
                                placeholder="Nama penulis artikel"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Cover Image</label>

                            {/* Method Selection */}
                            <div className="flex gap-4 mb-3">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="cover_method"
                                        value="upload"
                                        checked={uploadMethod === 'upload'}
                                        onChange={() => handleMethodChange('upload')}
                                        className="text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm text-slate-700">Upload File</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="cover_method"
                                        value="url"
                                        checked={uploadMethod === 'url'}
                                        onChange={() => handleMethodChange('url')}
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
                                        name="cover_image"
                                        id="cover_image"
                                        accept="image/*"
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                    />
                                    <p className="text-xs text-slate-500 mt-1">
                                        PNG atau JPG, maks 3MB (Rasio 16:9 recommended)
                                    </p>
                                </div>
                            )}

                            {/* URL Section */}
                            {uploadMethod === 'url' && (
                                <div>
                                    <input
                                        type="url"
                                        name="cover_url_input"
                                        id="cover_url_input"
                                        ref={urlInputRef}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm"
                                        placeholder="https://example.com/cover.jpg"
                                        onChange={handleUrlChange}
                                    />
                                    <p className="text-xs text-slate-500 mt-1">
                                        Paste URL cover image
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
                                        className="max-h-32 rounded-lg border border-slate-200"
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Konten Artikel
                            </label>
                            <textarea
                                name="content"
                                rows={12}
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm resize-none"
                                placeholder="Tulis konten artikel di sini..."
                                required
                            ></textarea>
                            <p className="text-xs text-slate-500 mt-1">Gunakan paragraf untuk memudahkan pembaca</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                    <Link
                        href="/dashboard/level-up"
                        className="px-6 py-3 text-slate-600 font-bold text-sm hover:bg-slate-100 rounded-lg transition"
                    >
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="px-8 py-3 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition flex items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isPending ? (
                            <>
                                <span className="material-symbols-outlined animate-spin !text-lg">progress_activity</span>
                                <span>Menyimpan...</span>
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined">save</span>
                                <span>Publish Artikel</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}
