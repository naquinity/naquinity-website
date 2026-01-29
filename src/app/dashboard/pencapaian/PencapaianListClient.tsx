'use client'

import { deletePencapaian } from '@/actions/pencapaian'

import { useState } from 'react'
import DeleteModal from '@/components/admin/DeleteModal'

export default function PencapaianListClient({ id, name }: { id: string, name: string }) {
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const handleDelete = async () => {
        setLoading(true)
        await deletePencapaian(id)
        setLoading(false)
        setShowModal(false)
    }

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                disabled={loading}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                title="Hapus"
            >
                <span className="material-symbols-outlined !text-lg">
                    {loading ? 'hourglass_empty' : 'delete'}
                </span>
            </button>

            <DeleteModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                title="Hapus Pencapaian"
                message="Apakah Anda yakin ingin menghapus pencapaian"
                itemName={name}
                isDeleting={loading}
            />
        </>
    )
}
