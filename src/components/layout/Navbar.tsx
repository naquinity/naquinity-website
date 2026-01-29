'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/tentang', label: 'Tentang Kami' },
    { href: '/program', label: 'Program' },
    { href: '/pencapaian', label: 'Pencapaian' },
    { href: '/level-up', label: 'Level-up' },
    { href: '/mahasiswa', label: 'Mahasiswa' },
    { href: '/pengurus', label: 'Pengurus' },
    { href: '/pj-matkul-km', label: 'PJ Matkul-KM' },
    { href: '/medsos', label: 'Sosial Media' },
]

export default function Navbar() {
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === '/'
        }
        return pathname.startsWith(href)
    }

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false)
            }
        }

        if (isMobileMenuOpen) {
            document.addEventListener('click', handleClickOutside)
        }

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [isMobileMenuOpen])

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="https://tools.naquinity.web.id/images/logo/100kb.png"
                            alt="Naquinity Logo"
                            width={40}
                            height={40}
                            className="h-10 w-auto"
                        />
                        <h1 className="text-primary text-xl font-bold hidden md:block">
                            Naquinity
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`transition ${isActive(link.href)
                                    ? 'text-primary font-bold'
                                    : 'hover:text-primary'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition"
                        aria-label="Toggle mobile menu"
                    >
                        <span className="material-symbols-outlined text-primary">
                            menu
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                ref={menuRef}
                className={`${isMobileMenuOpen ? 'block' : 'hidden'
                    } lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl`}
            >
                <nav className="max-w-[1280px] mx-auto px-4 py-4 space-y-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`block px-4 py-3 rounded-lg transition ${isActive(link.href)
                                ? 'bg-primary text-white font-bold'
                                : 'hover:bg-slate-50'
                                }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    )
}
