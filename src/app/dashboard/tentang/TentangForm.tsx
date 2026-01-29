'use client'

import { updateTentangContent, updateMaskot } from '@/actions/tentang'
import { useActionState, useState, useEffect } from 'react'

export default function TentangForm({ initialTentang, initialMaskot }: { initialTentang: any, initialMaskot: any }) {
    // Separate states for two forms
    const [tentangState, tentangAction] = useActionState(updateTentangContent, null)
    const [maskotState, maskotAction] = useActionState(updateMaskot, null)

    const [previewImage, setPreviewImage] = useState<string | null>(initialMaskot?.image_url || null)
    const [imageSource, setImageSource] = useState<'upload' | 'url'>('upload')

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="space-y-8">
            {/* Tentang Kami Form */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-6 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">description</span>
                        <h3 className="font-bold text-lg text-slate-800">Tentang Navindra Equinox Unity</h3>
                    </div>
                </div>

                <form action={tentangAction} className="p-6">
                    {tentangState?.success && (
                        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
                            <span className="material-symbols-outlined">check_circle</span>
                            <span className="text-sm font-medium">{tentangState.success}</span>
                        </div>
                    )}
                    {tentangState?.error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                            <span className="material-symbols-outlined">error</span>
                            <span className="text-sm font-medium">{tentangState.error}</span>
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Konten Tentang Kami</label>
                        <textarea
                            name="content"
                            rows={8}
                            defaultValue={initialTentang?.content || ''}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            placeholder="Tuliskan deskripsi tentang Navindra Equinox Unity..."
                            required
                        ></textarea>
                        <p className="text-xs text-slate-500 mt-2">Konten ini akan ditampilkan di halaman Tentang Kami</p>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition flex items-center gap-2">
                            <span className="material-symbols-outlined !text-lg">save</span>
                            Simpan Tentang Kami
                        </button>
                    </div>
                </form>
            </div>

            {/* Maskot Form */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-6 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">emoji_nature</span>
                        <h3 className="font-bold text-lg text-slate-800">Informasi Maskot</h3>
                    </div>
                </div>

                <form action={maskotAction} className="p-6">
                    {maskotState?.success && (
                        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
                            <span className="material-symbols-outlined">check_circle</span>
                            <span className="text-sm font-medium">{maskotState.success}</span>
                        </div>
                    )}
                    {maskotState?.error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                            <span className="material-symbols-outlined">error</span>
                            <span className="text-sm font-medium">{maskotState.error}</span>
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Nama Maskot</label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={initialMaskot?.name || ''}
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                placeholder="Contoh: Equi"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Gambar Maskot</label>

                            {/* Toggle Source */}
                            <div className="flex bg-slate-100 p-1 rounded-lg mb-3 inline-flex">
                                <button
                                    type="button"
                                    onClick={() => setImageSource('upload')}
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${imageSource === 'upload' ? 'bg-white shadow text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    Upload File
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setImageSource('url')}
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${imageSource === 'url' ? 'bg-white shadow text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    Link URL
                                </button>
                            </div>

                            {imageSource === 'upload' ? (
                                <div>
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer"
                                    />
                                    <p className="text-xs text-slate-500 mt-1">PNG atau JPG, maks 3MB</p>
                                </div>
                            ) : (
                                <div>
                                    <input
                                        type="url"
                                        name="image_url_input"
                                        placeholder="https://example.com/image.png"
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                        onChange={(e) => setPreviewImage(e.target.value)}
                                    />
                                    <p className="text-xs text-slate-500 mt-1">Pastikan link gambar dapat diakses publik</p>
                                </div>
                            )}

                            {/* Hidden input to keep old URL */}
                            <input type="hidden" name="current_image_url" value={initialMaskot?.image_url || ''} />
                            <input type="hidden" name="image_source" value={imageSource} />
                        </div>
                    </div>

                    {previewImage && (
                        <div className="mb-4">
                            <p className="text-sm font-bold text-slate-700 mb-2">Gambar Saat Ini:</p>
                            <div className="w-32 h-32 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center p-1">
                                <img src={previewImage} alt="Maskot" className="max-w-full max-h-full object-contain rounded" />
                            </div>
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Deskripsi Maskot</label>
                        <textarea
                            name="description"
                            rows={5}
                            defaultValue={initialMaskot?.description || ''}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            placeholder="Ceritakan tentang maskot..."
                            required
                        ></textarea>
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition flex items-center gap-2">
                            <span className="material-symbols-outlined !text-lg">save</span>
                            Simpan Maskot
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
