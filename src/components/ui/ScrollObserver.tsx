'use client'

import { useEffect } from 'react'

export default function ScrollObserver() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible')
                        // Optional: Unobserve after revealing to animate only once
                        // observer.unobserve(entry.target) 
                    }
                })
            },
            {
                threshold: 0.1, // Trigger when 10% of the element is visible
                rootMargin: '0px 0px -50px 0px', // Offset to trigger slightly before bottom
            }
        )

        // Select elements to animate
        const elements = document.querySelectorAll(
            '.scroll-reveal > * > *, .scroll-reveal .grid > *, .scroll-reveal tbody tr, .scroll-reveal .space-y-4 > *, .scroll-reveal .space-y-6 > *, .scroll-reveal .flex-col > *, .scroll-reveal section > *'
        )

        elements.forEach((el) => {
            // Exclude header and nav to prevent hydration mismatch on sticky elements
            if (el.tagName !== 'HEADER' && el.tagName !== 'NAV') {
                observer.observe(el)
            }
        })

        return () => observer.disconnect()
    }, []) // Run once on mount (and re-run if path changes? Next.js handles this via Template remounting)

    return null
}
