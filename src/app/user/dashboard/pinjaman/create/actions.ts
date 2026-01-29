'use server'

import { createClient } from '@supabase/supabase-js'
import { getUserUser } from '@/lib/dal'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const TABLE_PINJAMAN = 'pinjaman'

export type ActionState = {
    error?: string
    success?: boolean
}

export async function submitLoan(prevState: ActionState, formData: FormData) {
    const user = await getUserUser()
    if (!user) {
        return { error: 'Unauthorized' }
    }

    const amount = formData.get('amount') as string
    const deadline = formData.get('deadline') as string
    const accountNumber = formData.get('account_number') as string
    const description = formData.get('description') as string

    // Validation
    if (!amount || !accountNumber || !description) {
        return { error: 'Semua field harus diisi' }
    }

    const amountNum = parseInt(amount)
    if (isNaN(amountNum) || amountNum < 1) {
        return { error: 'Jumlah pinjaman minimal Rp 1' }
    }

    if (description.length < 10) {
        return { error: 'Deskripsi minimal 10 karakter' }
    }

    const deadlineMonths = deadline === 'semampunya' ? null : parseInt(deadline)

    const loanData = {
        user_name: user.name,
        user_email: user.email,
        user_nim: user.nim || null,
        amount: amountNum,
        deadline_months: deadlineMonths,
        account_number: accountNumber.trim(),
        description: description.trim(),
        purpose: 'Kebutuhan Pribadi',
        approval_status: 'pending',
        repayment_status: 'unpaid',
    }

    const { error } = await supabase.from(TABLE_PINJAMAN).insert(loanData)

    if (error) {
        console.error('Loan submission error:', error)
        return { error: 'Gagal mengajukan pinjaman. Silakan coba lagi.' }
    }

    revalidatePath('/user/dashboard/pinjaman')
    redirect('/user/dashboard/pinjaman?success=1')
}
