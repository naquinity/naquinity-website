import Link from 'next/link'

interface PaginationProps {
    currentPage: number
    totalPages: number
    baseUrl: string
    searchParams?: Record<string, string | number>
}

export default function Pagination({ currentPage, totalPages, baseUrl, searchParams = {} }: PaginationProps) {
    if (totalPages <= 1) return null

    // Helper to build URL with existing search params
    const createPageUrl = (page: number) => {
        const params = new URLSearchParams()
        Object.entries(searchParams).forEach(([key, value]) => {
            if (value) params.set(key, String(value))
        })
        params.set('page', String(page))
        return `${baseUrl}?${params.toString()}`
    }

    return (
        <div className="flex justify-center items-center gap-2 mt-12">
            {/* Previous Button */}
            {currentPage > 1 ? (
                <Link
                    href={createPageUrl(currentPage - 1)}
                    className="px-3 py-1 text-sm text-primary hover:underline font-medium"
                >
                    Sebelumnya
                </Link>
            ) : (
                <span className="px-3 py-1 text-sm text-slate-400 font-medium cursor-default">
                    Sebelumnya
                </span>
            )}

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    // Show first, last, current, and surrounding pages
                    // Simple logic: if many pages, maybe show ellipsis, but for now specific request was "1 2 3 4" style
                    // If total pages is huge, we might need more complex logic, but let's stick to the requested style first.
                    // Given the user expectation "1 2 3 4", rendering all page numbers is fine for now unless it gets too large.

                    return (
                        <Link
                            key={pageNum}
                            href={createPageUrl(pageNum)}
                            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all ${currentPage === pageNum
                                ? 'bg-primary text-white'
                                : 'text-primary hover:bg-primary/10'
                                }`}
                        >
                            {pageNum}
                        </Link>
                    )
                })}
            </div>

            {/* Next Button */}
            {currentPage < totalPages ? (
                <Link
                    href={createPageUrl(currentPage + 1)}
                    className="px-3 py-1 text-sm text-primary hover:underline font-medium"
                >
                    Berikutnya
                </Link>
            ) : (
                <span className="px-3 py-1 text-sm text-slate-400 font-medium cursor-default">
                    Berikutnya
                </span>
            )}
        </div>
    )
}
