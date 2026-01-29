'use client'

import { updatePjKm } from '@/actions/pj-km'
import Link from 'next/link'
import { useActionState, useState, useRef } from 'react'

export default function EditPjKmForm({ pjkm }: { pjkm: any }) {
    const [state, action] = useActionState(updatePjKm.bind(null, pjkm.id), null)

    // State for Role & Matkul Logic
    const [role, setRole] = useState<'PJ Matkul' | 'KM Kelas' | ''>(pjkm.role as any)
    const isPjMatkul = role === 'PJ Matkul'

    // State for Photo Upload
    const [uploadMethod, setUploadMethod] = useState<'upload' | 'url'>('upload')
    const [preview, setPreview] = useState<string | null>(pjkm.photo_url)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const urlInputRef = useRef<HTMLInputElement>(null)

    const handleMethodChange = (method: 'upload' | 'url') => {
        setUploadMethod(method)
        // Don't clear preview immediately on toggle, behavior preference
        // But resetting inputs is good
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
            setPreview(pjkm.photo_url)
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

            {/* Name */}
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                    Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input type="text" name="name" required
                    defaultValue={pjkm.name}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Masukkan nama lengkap" />
            </div>

            {/* NIM */}
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                    NIM <span className="text-red-500">*</span>
                </label>
                <input type="text" name="nim" required
                    defaultValue={pjkm.nim}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Masukkan NIM" />
            </div>

            {/* Kelas */}
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                    Kelas <span className="text-red-500">*</span>
                </label>
                <input type="text" name="kelas" required
                    defaultValue={pjkm.kelas}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Contoh: A, B, 1A, 2B" />
            </div>

            {/* Role */}
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">
                    Sebagai <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="role" value="PJ Matkul" required
                            checked={role === 'PJ Matkul'}
                            onChange={(e) => setRole(e.target.value as any)}
                            className="w-4 h-4 text-primary focus:ring-primary" />
                        <span className="font-medium">PJ Matkul</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="role" value="KM Kelas" required
                            checked={role === 'KM Kelas'}
                            onChange={(e) => setRole(e.target.value as any)}
                            className="w-4 h-4 text-primary focus:ring-primary" />
                        <span className="font-medium">KM Kelas</span>
                    </label>
                </div>
            </div>

            {/* Matkul (Conditional) */}
            {isPjMatkul && (
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                        Nama Mata Kuliah <span className="text-red-500">*</span>
                    </label>
                    <input type="text" name="matkul" required
                        defaultValue={pjkm.matkul || ''}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        placeholder="Contoh: Kalkulus, Pemrograman Web" />
                    <p className="text-sm text-slate-500 mt-1">Khusus untuk PJ Matkul</p>
                </div>
            )}

            {/* Semester */}
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                    Semester <span className="text-red-500">*</span>
                </label>
                <select name="semester" required
                    defaultValue={pjkm.semester}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                    <option value="">Pilih Semester</option>
                    {[...Array(8)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
                    ))}
                </select>
            </div>

            {/* Photo */}
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Foto</label>

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
                        <input type="hidden" name="existing_photo" value={pjkm.photo_url || ''} />
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

            <div className="flex gap-4 pt-6 border-t border-slate-200">
                <button type="submit"
                    className="flex-1 bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-primary/20">
                    Perbarui Data
                </button>
                <Link href="/dashboard/pj-km"
                    className="px-6 py-3 border-2 border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors">
                    Batal
                </Link>
            </div>
        </form>
    )
}
