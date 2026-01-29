'use client'

import { updatePencapaian } from '@/actions/pencapaian'
import Link from 'next/link'
import { useActionState, useState, useRef } from 'react'

export default function EditPencapaianForm({ pencapaian }: { pencapaian: any }) {
    const [state, action] = useActionState(updatePencapaian.bind(null, pencapaian.id), null)
    const [uploadMethod, setUploadMethod] = useState<'upload' | 'url'>('upload')
    const [preview, setPreview] = useState<string | null>(pencapaian.person_photo_url)

    const fileInputRef = useRef<HTMLInputElement>(null)
    const urlInputRef = useRef<HTMLInputElement>(null)

    const handleMethodChange = (method: 'upload' | 'url') => {
        setUploadMethod(method)
        // Don't auto-clear preview when switching back to upload if it was original
        if (method === 'upload' && !fileInputRef.current?.files?.length && !urlInputRef.current?.value) {
            // We keep the original image as preview if nothing new is selected
            // But if user was in URL mode and typed something, then switched, we might want to reset?
            // Actually, standard behavior: if switching to upload, clear URL input. If switching to URL, clear file input.
            // Preview stays as is until new input.
        }

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
                            Judul Pencapaian
                        </label>
                        <input
                            type="text"
                            name="title"
                            defaultValue={pencapaian.title}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm"
                            placeholder="Contoh: Juara 1 Hackathon Nasional 2024"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                            Deskripsi Pencapaian
                        </label>
                        <textarea
                            name="description"
                            defaultValue={pencapaian.description}
                            rows={4}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm resize-none"
                            placeholder="Jelaskan detail pencapaian..."
                            required
                        ></textarea>
                    </div>

                    <div className="border-t border-slate-200 pt-6">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">person</span>
                            Informasi Penerima
                        </h3>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Nama Penerima</label>
                                <input type="text" name="person_name"
                                    defaultValue={pencapaian.person_name}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm"
                                    placeholder="Nama lengkap" required />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">NIM (Opsional)</label>
                                <input type="text" name="person_nim"
                                    defaultValue={pencapaian.person_nim}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm"
                                    placeholder="NIM mahasiswa" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Upload Foto Penerima</label>

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
                                        name="person_photo"
                                        id="person_photo"
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
                                        name="photo_url_input"
                                        id="photo_url_input"
                                        ref={urlInputRef}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm"
                                        placeholder="https://example.com/photo.jpg"
                                        onChange={handleUrlChange}
                                    />
                                    <p className="text-xs text-slate-500 mt-1">
                                        Paste URL foto
                                    </p>
                                </div>
                            )}

                            {/* Hidden input to keep existing photo */}
                            <input type="hidden" name="existing_photo" value={pencapaian.person_photo_url || ''} />

                            {/* Preview */}
                            {preview && (
                                <div className="mt-3">
                                    <p className="text-xs font-bold text-slate-700 mb-2">
                                        Preview / Saat Ini:
                                    </p>
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
            </div>

            <div className="flex items-center justify-end gap-3">
                <Link
                    href="/dashboard/pencapaian"
                    className="px-6 py-3 text-slate-600 font-bold text-sm hover:bg-slate-100 rounded-lg transition"
                >
                    Batal
                </Link>
                <button
                    type="submit"
                    className="px-8 py-3 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition flex items-center gap-2 group"
                >
                    <span className="material-symbols-outlined">save</span>
                    Simpan Perubahan
                </button>
            </div>
        </form>
    )
}
