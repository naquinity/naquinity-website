'use client'

import { deleteTransaction, approveLoan, rejectLoan, markLoanAsPaid } from '@/actions/keuangan'
import { useState } from 'react'

export function TransactionDeleteButton({ id }: { id: string }) {
    const [showModal, setShowModal] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        setIsDeleting(true)
        await deleteTransaction(id)
        setIsDeleting(false)
        setShowModal(false)
    }

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                title="Hapus"
            >
                <span className="material-symbols-outlined !text-lg">delete</span>
            </button>

            {/* Delete Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all scale-100 opacity-100">
                        <div className="flex flex-col items-center __text-center">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined text-red-600 text-2xl">delete_forever</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Hapus Transaksi?</h3>
                            <p className="text-sm text-slate-500 text-center mb-6">
                                Apakah Anda yakin ingin menghapus data transaksi ini? Tindakan ini tidak dapat dibatalkan.
                            </p>
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => setShowModal(false)}
                                    disabled={isDeleting}
                                    className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition disabled:opacity-50"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition disabled:opacity-50 flex justify-center items-center gap-2"
                                >
                                    {isDeleting ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            <span>Menghapus...</span>
                                        </>
                                    ) : (
                                        'Ya, Hapus'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export function LoanActions({ loan, adminName }: { loan: any, adminName: string }) {
    const [isLoading, setIsLoading] = useState(false)
    const [modalConfig, setModalConfig] = useState<{ type: 'approve' | 'reject' | 'pay', title: string, message: string } | null>(null)
    const [rejectReason, setRejectReason] = useState('Ditolak oleh admin')

    const handleAction = async () => {
        if (!modalConfig) return
        setIsLoading(true)

        let res
        if (modalConfig.type === 'approve') {
            res = await approveLoan(loan.id, adminName)
        } else if (modalConfig.type === 'reject') {
            res = await rejectLoan(loan.id, rejectReason)
        } else if (modalConfig.type === 'pay') {
            res = await markLoanAsPaid(loan.id)
        }

        setIsLoading(false)
        setModalConfig(null)

        if (res?.error) {
            alert(res.error) // Keep error alert or use toast if available (sticking to alert for errors for now as requested for confirmation pops)
        }
    }

    const openApprove = () => setModalConfig({
        type: 'approve',
        title: 'Setujui Pinjaman',
        message: `Setujui pinjaman Rp ${loan.amount.toLocaleString('id-ID')} untuk ${loan.user_name}?`
    })

    const openReject = () => setModalConfig({
        type: 'reject',
        title: 'Tolak Pinjaman',
        message: `Apakah Anda yakin ingin menolak pinjaman ini?`
    })

    const openPay = () => setModalConfig({
        type: 'pay',
        title: 'Konfirmasi Pelunasan',
        message: `Tandai pelunasan Rp ${loan.amount.toLocaleString('id-ID')} dari ${loan.user_name}?`
    })

    if (isLoading && !modalConfig) return <span className="text-xs text-slate-400">Processing...</span>

    return (
        <>
            {loan.approval_status === 'pending' && (
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={openApprove}
                        className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-lg transition-colors"
                    >
                        Setujui
                    </button>
                    <button
                        onClick={openReject}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors"
                    >
                        Tolak
                    </button>
                </div>
            )}

            {loan.approval_status === 'approved' && loan.repayment_status === 'unpaid' && (
                <button
                    onClick={openPay}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-1 ml-auto"
                >
                    <span className="material-symbols-outlined !text-sm">paid</span>
                    Tandai Lunas
                </button>
            )}

            {(loan.approval_status !== 'pending' && !(loan.approval_status === 'approved' && loan.repayment_status === 'unpaid')) && (
                <span className="text-slate-400 text-sm">-</span>
            )}

            {/* Action Confirmation Modal */}
            {modalConfig && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all scale-100 opacity-100 animate-in fade-in zoom-in duration-200">
                        <div className="flex flex-col items-center text-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${modalConfig.type === 'approve' ? 'bg-green-100 text-green-600' :
                                    modalConfig.type === 'reject' ? 'bg-red-100 text-red-600' :
                                        'bg-blue-100 text-blue-600'
                                }`}>
                                <span className="material-symbols-outlined text-2xl">
                                    {modalConfig.type === 'approve' ? 'check_circle' :
                                        modalConfig.type === 'reject' ? 'cancel' : 'paid'}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{modalConfig.title}</h3>
                            <p className="text-sm text-slate-500 text-center mb-4">
                                {modalConfig.message}
                            </p>

                            {modalConfig.type === 'reject' && (
                                <div className="w-full mb-4 text-left">
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Alasan Penolakan</label>
                                    <textarea
                                        value={rejectReason}
                                        onChange={(e) => setRejectReason(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        rows={2}
                                    />
                                </div>
                            )}

                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => setModalConfig(null)}
                                    disabled={isLoading}
                                    className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition disabled:opacity-50"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleAction}
                                    disabled={isLoading}
                                    className={`flex-1 px-4 py-2 text-white font-bold rounded-lg transition disabled:opacity-50 flex justify-center items-center gap-2 ${modalConfig.type === 'approve' ? 'bg-green-600 hover:bg-green-700' :
                                            modalConfig.type === 'reject' ? 'bg-red-600 hover:bg-red-700' :
                                                'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            <span>Proses...</span>
                                        </>
                                    ) : (
                                        'Konfirmasi'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
