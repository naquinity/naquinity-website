import PublicLayout from '@/components/layout/PublicLayout'
import { createClient } from '@/lib/supabase/server'
import type { Pencapaian } from '@/types/database'
import { Metadata } from 'next'
import PencapaianCard from './PencapaianCard'

export const metadata: Metadata = {
    title: 'Pencapaian',
}

async function getPencapaian() {
    const supabase = await createClient()
    const { data } = await supabase
        .from('pencapaian')
        .select('*')
        .order('created_at', { ascending: false })

    return (data as Pencapaian[]) || []
}

export default async function PencapaianPage() {
    const pencapaian = await getPencapaian()

    return (
        <div className="font-display">
            <PublicLayout>
                {/* Hero section ... */}

                {/* Content */}
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {pencapaian.length === 0 ? (
                        <div className="text-center py-20">
                            {/* Empty state ... */}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {pencapaian.map((item) => (
                                <PencapaianCard key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </div>
            </PublicLayout>
        </div>
    )
}
