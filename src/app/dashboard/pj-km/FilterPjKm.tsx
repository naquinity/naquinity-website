'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function FilterPjKm() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const semester = searchParams.get('semester') || 'all'
    const role = searchParams.get('role') || 'all'

    const handleFilterChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value === 'all') {
            params.delete(key)
        } else {
            params.set(key, value)
        }
        router.push(`/dashboard/pj-km?${params.toString()}`)
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex flex-wrap items-end gap-4">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Filter Semester</label>
                    <select
                        value={semester}
                        onChange={(e) => handleFilterChange('semester', e.target.value)}
                        className="bg-white px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-w-[150px]"
                    >
                        <option value="all">Semua Semester</option>
                        {[...Array(8)].map((_, i) => (
                            <option key={i + 1} value={String(i + 1)}>Semester {i + 1}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Filter Role</label>
                    <select
                        value={role}
                        onChange={(e) => handleFilterChange('role', e.target.value)}
                        className="bg-white px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-w-[150px]"
                    >
                        <option value="all">Semua Role</option>
                        <option value="PJ Matkul">PJ Matkul</option>
                        <option value="KM Kelas">KM Kelas</option>
                    </select>
                </div>

                {(semester !== 'all' || role !== 'all') && (
                    <div className="flex items-end h-[42px]">
                        <Link href="/dashboard/pj-km" className="px-4 py-2 text-primary hover:underline font-medium flex items-center h-full">
                            Reset Filter
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
