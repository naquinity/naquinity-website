'use client'

import { motion } from 'framer-motion'
import ScrollObserver from '@/components/ui/ScrollObserver'
import { usePathname } from 'next/navigation'

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isDashboard = pathname?.startsWith('/dashboard') || pathname?.startsWith('/user/dashboard')

    if (isDashboard) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {children}
            </motion.div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <ScrollObserver />
            <div className="scroll-reveal">
                {children}
            </div>
        </motion.div>
    )
}
