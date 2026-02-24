'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { useRef } from 'react'

export default function SearchInput({ placeholder, searchPath }: { placeholder: string, searchPath?: string }) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { push } = useRouter()
    const inputRef = useRef<HTMLInputElement>(null)

    const doSearch = (term: string) => {
        const params = new URLSearchParams(searchParams.toString())

        if (term) {
            params.set('q', term)
            params.delete('page')
            push(`${searchPath || '/mahasiswa/search'}?${params.toString()}`)
        } else {
            params.delete('q')
            params.delete('page')
            push(`${searchPath ? pathname : '/mahasiswa'}?${params.toString()}`)
        }
    }

    const handleSearchDebounced = useDebouncedCallback((term: string) => {
        doSearch(term)
    }, 500)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleSearchDebounced.cancel() // cancel pending debounced calls
        if (inputRef.current) {
            doSearch(inputRef.current.value)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto mb-8">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="material-symbols-outlined text-slate-400">search</span>
            </div>
            <input
                ref={inputRef}
                type="text"
                className="block w-full p-4 pl-10 pr-24 text-sm text-slate-900 border border-slate-300 rounded-full bg-white focus:ring-primary focus:border-primary shadow-sm"
                placeholder={placeholder}
                onChange={(e) => handleSearchDebounced(e.target.value)}
                defaultValue={searchParams.get('q')?.toString()}
            />
            <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-primary text-white hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/30 font-medium rounded-full text-sm px-4 py-2 transition-colors flex items-center gap-1"
                title="Cari"
            >
                Cari
            </button>
        </form>
    )
}
