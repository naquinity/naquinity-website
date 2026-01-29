'use client'

import { createPjKm } from '@/actions/pj-km'
import Link from 'next/link'
import { useActionState, useState, useRef } from 'react'

export default function CreatePjKmPage() {
    const [state, action] = useActionState(createPjKm, null)

    // State for Role & Matkul Logic
    const [role, setRole] = useState<'PJ Matkul' | 'KM Kelas' | ''>('')
    const isPjMatkul = role === 'PJ Matkul'

    // State for Photo Upload
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
                <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
                <span className="material-symbols-outlined !text-sm">chevron_right</span>
                <Link href="/dashboard/pj-km" className="hover:text-primary">PJ Matkul-KM</Link>
                <span className="material-symbols-outlined !text-sm">chevron_right</span>
                <span className="font-bold text-slate-800">Tambah Data</span>
            </div>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-primary mb-2">Tambah PJ Matkul-KM Kelas</h2>
                    <p className="text-slate-600">Tambahkan data PJ Matkul atau KM Kelas</p>
                </div>
                <Link href="/dashboard/pj-km"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-600 font-bold rounded-lg hover:bg-slate-50 transition">
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

            <div className="bg-white rounded-xl shadow-md p-8">
                <form action={action} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                            Nama Lengkap <span className="text-red-500">*</span>
                        </label>
                        <input type="text" name="name" required
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            placeholder="Masukkan nama lengkap" />
                    </div>

                    {/* NIM */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                            NIM <span className="text-red-500">*</span>
                        </label>
                        <input type="text" name="nim" required
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            placeholder="Masukkan NIM" />
                    </div>

                    {/* Kelas */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                            Kelas <span className="text-red-500">*</span>
                        </label>
                        <input type="text" name="kelas" required
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
                                <p className="text-xs font-bold text-slate-700 mb-2">Preview:</p>
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
                            Simpan Data
                        </button>
                        <Link href="/dashboard/pj-km"
                            className="px-6 py-3 border-2 border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors">
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
