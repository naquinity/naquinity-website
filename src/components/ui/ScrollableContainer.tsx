'use client'

import { useRef, useState, useEffect } from 'react'

interface ScrollableContainerProps {
    children: React.ReactNode
    className?: string
}

export default function ScrollableContainer({ children, className = '' }: ScrollableContainerProps) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)

    const checkScroll = () => {
        if (!scrollRef.current) return

        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
        setCanScrollLeft(scrollLeft > 0)
        // Add a small threshold (1px) to prevent precision issues
        setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth)
    }

    useEffect(() => {
        checkScroll()
        window.addEventListener('resize', checkScroll)
        return () => window.removeEventListener('resize', checkScroll)
    }, [])

    // Also check on interval to handle dynamic content loads
    useEffect(() => {
        const interval = setInterval(checkScroll, 1000)
        return () => clearInterval(interval)
    }, [])

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return

        const scrollAmount = 200 // pixels to scroll by
        const currentScroll = scrollRef.current.scrollLeft

        scrollRef.current.scrollTo({
            left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
            behavior: 'smooth'
        })
    }

    return (
        <div className={`relative flex items-center min-w-0 w-full group ${className}`}>
            {canScrollLeft && (
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 z-10 p-1.5 -ml-3 bg-white border border-slate-200 text-slate-500 rounded-full shadow-md hover:bg-slate-50 hover:text-slate-700 transition-all opacity-0 sm:group-hover:opacity-100 focus:opacity-100 flex items-center justify-center"
                    aria-label="Geser ke kiri"
                >
                    <span className="material-symbols-outlined text-lg">chevron_left</span>
                </button>
            )}

            <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex-1 overflow-x-auto hide-scrollbar scroll-smooth px-1"
            >
                {children}
            </div>

            {canScrollRight && (
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 z-10 p-1.5 -mr-3 bg-white border border-slate-200 text-slate-500 rounded-full shadow-md hover:bg-slate-50 hover:text-slate-700 transition-all opacity-0 sm:group-hover:opacity-100 focus:opacity-100 flex items-center justify-center"
                    aria-label="Geser ke kanan"
                >
                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                </button>
            )}
        </div>
    )
}
