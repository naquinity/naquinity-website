'use client'

import { updateLevelUp } from '@/actions/level-up'
import Link from 'next/link'
import { useActionState, useState, useRef } from 'react'

export default function EditLevelUpForm({ article }: { article: any }) {
    const [state, action, isPending] = useActionState(updateLevelUp.bind(null, article.id), null)
    const [uploadMethod, setUploadMethod] = useState<'upload' | 'url'>('upload')
    const [dateOption, setDateOption] = useState<'keep' | 'custom'>('keep')
    const [preview, setPreview] = useState<string | null>(article.cover_image_url)

    const fileInputRef = useRef<HTMLInputElement>(null)
    const urlInputRef = useRef<HTMLInputElement>(null)

    const handleMethodChange = (method: 'upload' | 'url') => {
        setUploadMethod(method)
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
        <form action={action} className="space-y-6">
            {state?.error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-600">error</span>
                    <p className="text-sm text-red-800 font-medium">{state.error}</p>
                </div>
            )}

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                            Judul Artikel
                        </label>
                        <input
                            type="text"
                            name="title"
                            defaultValue={article.title}
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
                            defaultValue={article.author_name}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm"
                            placeholder="Nama penulis artikel"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                            Jadwal Publikasi
                        </label>
                        <div className="text-sm text-slate-500 mb-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                            Tanggal saat ini: <span className="font-semibold text-slate-700">{new Date(article.created_at).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}</span>
                        </div>

                        <div className="flex gap-4 mb-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="date_option"
                                    value="keep"
                                    checked={dateOption === 'keep'}
                                    onChange={() => setDateOption('keep')}
                                    className="text-primary focus:ring-primary"
                                />
                                <span className="text-sm text-slate-700">Otomatis</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="date_option"
                                    value="custom"
                                    checked={dateOption === 'custom'}
                                    onChange={() => setDateOption('custom')}
                                    className="text-primary focus:ring-primary"
                                />
                                <span className="text-sm text-slate-700">Ubah Tanggal</span>
                            </label>
                        </div>

                        {dateOption === 'custom' && (
                            <input
                                type="datetime-local"
                                name="custom_date"
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm"
                                required
                            />
                        )}
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

                        {/* Hidden input to keep existing photo */}
                        <input type="hidden" name="existing_cover" value={article.cover_image_url || ''} />

                        {/* Preview */}
                        {preview && (
                            <div className="mt-3">
                                <p className="text-xs font-bold text-slate-700 mb-2">
                                    Preview / Saat Ini:
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
                            defaultValue={article.content}
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
                            <span>Update Artikel</span>
                        </>
                    )}
                </button>
            </div>
        </form >
    )
}
