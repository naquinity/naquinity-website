'use client'

import { deletePjKm } from '@/actions/pj-km'

import { useState } from 'react'
import DeleteModal from '@/components/admin/DeleteModal'

export function PjKmDeleteButton({ id, name, role }: { id: string, name: string, role: string }) {
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const handleDelete = async () => {
        setLoading(true)
        await deletePjKm(id)
        setLoading(false)
        setShowModal(false)
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setShowModal(true)}
                disabled={loading}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Hapus"
            >
                <span className="material-symbols-outlined !text-xl">
                    {loading ? 'hourglass_empty' : 'delete'}
                </span>
            </button>

            <DeleteModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                title={`Hapus ${role}`}
                message={`Apakah Anda yakin ingin menghapus ${role} atas nama`}
                itemName={name}
                isDeleting={loading}
            />
        </>
    )
}
