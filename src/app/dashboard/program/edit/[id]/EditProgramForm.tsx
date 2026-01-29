'use client'

import { updateProgram } from '@/actions/program'
import Link from 'next/link'
import { useActionState, useState, useRef } from 'react'

export default function EditProgramForm({ program }: { program: any }) {
    const [state, action] = useActionState(updateProgram.bind(null, program.id), null)
    const [uploadMethod, setUploadMethod] = useState<'upload' | 'url'>('upload')
    const [preview, setPreview] = useState<string | null>(program.logo_url)

    const fileInputRef = useRef<HTMLInputElement>(null)

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
        setPreview(e.target.value)
    }

    return (
        <form action={action} className="space-y-6">
            {state?.error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-600">error</span>
                    <p className="text-sm text-red-800 font-medium">{state.error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                            Nama Program
                        </label>
                        <input
                            type="text"
                            name="title"
                            defaultValue={program.title}
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
                            defaultValue={program.start_date}
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
                            defaultValue={program.end_date}
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
                                    defaultValue={program.logo_url}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm"
                                    placeholder="https://example.com/logo.png"
                                    onChange={handleUrlChange}
                                />
                                <p className="text-xs text-slate-500 mt-1">
                                    Paste URL logo
                                </p>
                            </div>
                        )}

                        {/* Hidden input to keep old URL if no new file is uploaded and method is upload */}
                        {uploadMethod === 'upload' && (
                            <input type="hidden" name="logo_url" value={program.logo_url || ''} />
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
                            defaultValue={program.description}
                            rows={6}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm resize-none"
                            placeholder="Jelaskan tujuan dan detail program..."
                            required
                        ></textarea>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
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
                    Simpan Perubahan
                </button>
            </div>
        </form>
    )
}
