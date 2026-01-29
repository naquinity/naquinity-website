'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getAdminUser } from '@/lib/dal'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const TABLE_KEUANGAN = 'keuangan'
const TABLE_PINJAMAN = 'pinjaman'

export async function createTransaction(prevState: any, formData: FormData) {
    const user = await getAdminUser()
    if (!user) return { error: 'Unauthorized' }

    const type = formData.get('type') as string
    const amount = Number(formData.get('amount'))
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const transactionDate = formData.get('transaction_date') as string

    if (!type || !amount || !description || !transactionDate) {
        return { error: 'Semua field wajib diisi kecuali kategori' }
    }

    if (type !== 'masuk' && type !== 'keluar') {
        return { error: 'Tipe transaksi tidak valid' }
    }

    if (amount <= 0) {
        return { error: 'Jumlah harus berupa angka positif' }
    }

    const { error } = await supabase
        .from(TABLE_KEUANGAN)
        .insert({
            type,
            amount,
            description,
            category: category || null,
            transaction_date: transactionDate
        })

    if (error) {
        console.error('Create Transaction Error:', error)
        return { error: 'Gagal menambahkan transaksi' }
    }

    revalidatePath('/dashboard/keuangan')
    redirect('/dashboard/keuangan')
}

export async function updateTransaction(id: string, prevState: any, formData: FormData) {
    const user = await getAdminUser()
    if (!user) return { error: 'Unauthorized' }

    const type = formData.get('type') as string
    const amount = Number(formData.get('amount'))
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const transactionDate = formData.get('transaction_date') as string

    if (!type || !amount || !description || !transactionDate) {
        return { error: 'Semua field wajib diisi kecuali kategori' }
    }

    if (type !== 'masuk' && type !== 'keluar') {
        return { error: 'Tipe transaksi tidak valid' }
    }

    const { error } = await supabase
        .from(TABLE_KEUANGAN)
        .update({
            type,
            amount,
            description,
            category: category || null,
            transaction_date: transactionDate,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)

    if (error) {
        console.error('Update Transaction Error:', error)
        return { error: 'Gagal memperbarui transaksi' }
    }

    revalidatePath('/dashboard/keuangan')
    revalidatePath(`/dashboard/keuangan/edit/${id}`)
    redirect('/dashboard/keuangan')
}

export async function deleteTransaction(id: string) {
    const user = await getAdminUser()
    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase
        .from(TABLE_KEUANGAN)
        .delete()
        .eq('id', id)

    if (error) {
        return { error: 'Gagal menghapus transaksi' }
    }

    revalidatePath('/dashboard/keuangan')
    return { success: 'Transaksi berhasil dihapus' }
}

// LOAN ACTIONS
export async function approveLoan(loanId: string, adminName: string) {
    const user = await getAdminUser()
    if (!user) return { error: 'Unauthorized' }

    // 1. Get Loan Details
    const { data: loan, error: fetchError } = await supabase
        .from(TABLE_PINJAMAN)
        .select('*')
        .eq('id', loanId)
        .single()

    if (fetchError || !loan) return { error: 'Pinjaman tidak ditemukan' }
    if (loan.approval_status !== 'pending') return { error: 'Pinjaman sudah diproses sebelumnya' }

    // 2. Create Expense Transaction
    const { data: transaction, error: transError } = await supabase
        .from(TABLE_KEUANGAN)
        .insert({
            type: 'keluar',
            amount: loan.amount,
            description: `Pinjaman untuk ${loan.user_name}`,
            category: 'Pinjaman',
            transaction_date: new Date().toISOString().split('T')[0]
        })
        .select()
        .single()

    if (transError || !transaction) {
        console.error('Create Loan Transaction Error:', transError)
        return { error: 'Gagal membuat transaksi pengeluaran' }
    }

    // 3. Update Loan Status
    const { error: updateError } = await supabase
        .from(TABLE_PINJAMAN)
        .update({
            approval_status: 'approved',
            approved_at: new Date().toISOString(),
            approved_by: adminName,
            loan_transaction_id: transaction.id
        })
        .eq('id', loanId)

    if (updateError) {
        // Rollback transaction if update fails? (Ideally yes, but omitted for simplicity/matching PHP behavior which likely didn't have full transactions)
        console.error('Update Loan Error:', updateError)
        return { error: 'Gagal mengupdate status pinjaman' }
    }

    revalidatePath('/dashboard/keuangan')
    return { success: 'Pinjaman berhasil disetujui dan transaksi dibuat!' }
}

export async function rejectLoan(loanId: string, notes: string) {
    const user = await getAdminUser()
    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase
        .from(TABLE_PINJAMAN)
        .update({
            approval_status: 'rejected',
            rejected_at: new Date().toISOString(),
            notes: notes || 'Ditolak oleh admin'
        })
        .eq('id', loanId)

    if (error) {
        console.error('Reject Loan Error:', error)
        return { error: 'Gagal menolak pinjaman' }
    }

    revalidatePath('/dashboard/keuangan')
    return { success: 'Pinjaman berhasil ditolak' }
}

export async function markLoanAsPaid(loanId: string) {
    const user = await getAdminUser()
    if (!user) return { error: 'Unauthorized' }

    // 1. Get Loan Details
    const { data: loan, error: fetchError } = await supabase
        .from(TABLE_PINJAMAN)
        .select('*')
        .eq('id', loanId)
        .single()

    if (fetchError || !loan) return { error: 'Pinjaman tidak ditemukan' }
    if (loan.approval_status !== 'approved' || loan.repayment_status !== 'unpaid') {
        return { error: 'Pinjaman tidak dapat dilunaskan (status tidak valid)' }
    }

    // 2. Create Income Transaction
    const { data: transaction, error: transError } = await supabase
        .from(TABLE_KEUANGAN)
        .insert({
            type: 'masuk',
            amount: loan.amount, // Assuming full repayment
            description: `Pelunasan pinjaman dari ${loan.user_name}`,
            category: 'Pembayaran Pinjaman',
            transaction_date: new Date().toISOString().split('T')[0]
        })
        .select()
        .single()

    if (transError || !transaction) {
        console.error('Create Loan Repayment Transaction Error:', transError)
        return { error: 'Gagal membuat transaksi pelunasan' }
    }

    // 3. Update Loan Status
    const { error: updateError } = await supabase
        .from(TABLE_PINJAMAN)
        .update({
            repayment_status: 'paid',
            paid_at: new Date().toISOString(),
            repayment_transaction_id: transaction.id
        })
        .eq('id', loanId)

    if (updateError) {
        console.error('Update Loan Paid Error:', updateError)
        return { error: 'Gagal mengupdate status pelunasan' }
    }

    revalidatePath('/dashboard/keuangan')
    return { success: 'Pinjaman berhasil dilunaskan!' }
}
