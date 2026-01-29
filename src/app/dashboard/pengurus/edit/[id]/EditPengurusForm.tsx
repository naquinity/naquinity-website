'use client'

import { updatePengurus } from '@/actions/pengurus'
import Link from 'next/link'
import { useActionState, useState, useRef } from 'react'

export default function EditPengurusForm({ pengurus }: { pengurus: any }) {
    const [state, action, isPending] = useActionState(updatePengurus.bind(null, pengurus.id), null)

    // State for Photo Upload
    const [uploadMethod, setUploadMethod] = useState<'upload' | 'url'>('upload')
    const [preview, setPreview] = useState<string | null>(pengurus.photo_url)
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
            setPreview(pengurus.photo_url)
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
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
                        <input type="text" name="name" required
                            defaultValue={pengurus.name}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm"
                            placeholder="Nama lengkap pengurus" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Jabatan</label>
                        <input type="text" name="position" required
                            defaultValue={pengurus.position}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm"
                            placeholder="Contoh: Ketua" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">NIM (Opsional)</label>
                        <input type="text" name="nim"
                            defaultValue={pengurus.nim || ''}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm font-mono"
                            placeholder="123456789" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Upload Foto</label>

                        {/* Method Selection */}
                        <div className="flex gap-4 mb-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="photo_method"
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
                                    name="photo_method"
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
                                    name="photo"
                                    id="photo"
                                    accept="image/*"
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />
                                <input type="hidden" name="existing_photo" value={pengurus.photo_url || ''} />
                                <p className="text-xs text-slate-500 mt-1">
                                    PNG atau JPG, maks 2MB
                                </p>
                            </div>
                        )}

                        {/* URL Section */}
                        {uploadMethod === 'url' && (
                            <div>
                                <input
                                    type="url"
                                    name="photo_url_input"
                                    id="photo_url_input"
                                    ref={urlInputRef}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm"
                                    placeholder="https://example.com/photo.jpg"
                                    onChange={handleUrlChange}
                                />
                                <p className="text-xs text-slate-500 mt-1">
                                    Paste URL foto (contoh: dari Google Drive, Imgur, dll)
                                </p>
                            </div>
                        )}

                        {/* Preview */}
                        {preview && (
                            <div className="mt-3">
                                <p className="text-xs font-bold text-slate-700 mb-2">Preview / Foto Saat Ini:</p>
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-24 h-24 rounded-full object-cover border-2 border-slate-200"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-3">
                <Link
                    href="/dashboard/pengurus"
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
                            <span>Update Pengurus</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    )
}
