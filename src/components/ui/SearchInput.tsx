'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export default function SearchInput({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { push } = useRouter()

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)

        if (term) {
            params.set('q', term)
            push(`/mahasiswa/search?${params.toString()}`)
        } else {
            push('/mahasiswa')
        }
    }, 500)

    return (
        <div className="relative w-full max-w-md mx-auto mb-8">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="material-symbols-outlined text-slate-400">search</span>
            </div>
            <input
                type="text"
                className="block w-full p-4 pl-10 text-sm text-slate-900 border border-slate-300 rounded-full bg-white focus:ring-primary focus:border-primary shadow-sm"
                placeholder={placeholder}
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('q')?.toString()}
            />
        </div>
    )
}
