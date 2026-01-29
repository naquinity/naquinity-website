import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    // Social media links - these could be fetched from database if needed
    const socialLinks = [
        { name: 'YouTube', abbr: 'YT', url: 'https://www.youtube.com/@naquinity' },
        { name: 'Instagram', abbr: 'IG', url: 'https://www.instagram.com/naquinity' },
        { name: 'TikTok', abbr: 'TT', url: 'https://www.tiktok.com/@naquinity' },
        { name: 'Threads', abbr: 'TH', url: 'https://www.threads.com/@naquinity' },
        { name: 'Twitter', abbr: 'TW', url: 'https://www.twitter.com/naquinity' },
    ]

    return (
        <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <Image
                                src="https://tools.naquinity.web.id/images/logo/100kb.png"
                                alt="Naquinity Logo"
                                width={32}
                                height={32}
                                className="h-8 w-auto"
                            />
                            <h3 className="font-bold text-lg text-slate-900">
                                Navindra Equinox Unity
                            </h3>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Angkatan 24 Pendidikan Sistem dan Teknologi Informasi - UPI
                            Purwakarta.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Halaman</h4>
                        <ul className="space-y-3 text-sm text-slate-500">
                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-primary transition-colors"
                                >
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tentang"
                                    className="hover:text-primary transition-colors"
                                >
                                    Tentang Kami
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/program"
                                    className="hover:text-primary transition-colors"
                                >
                                    Program Kami
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/pencapaian"
                                    className="hover:text-primary transition-colors"
                                >
                                    Pencapaian
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Komunitas</h4>
                        <ul className="space-y-3 text-sm text-slate-500">
                            <li>
                                <Link
                                    href="/level-up"
                                    className="hover:text-primary transition-colors"
                                >
                                    Level-up
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/mahasiswa"
                                    className="hover:text-primary transition-colors"
                                >
                                    Daftar Mahasiswa
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/pengurus"
                                    className="hover:text-primary transition-colors"
                                >
                                    Pengurus Angkatan
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://contact.naquinity.web.id/"
                                    className="hover:text-primary transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Hubungi Kami
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Ikuti Kami</h4>
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={social.name}
                                    className="size-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-all"
                                >
                                    <span className="font-bold text-xs">{social.abbr}</span>
                                </a>
                            ))}
                        </div>
                        <div className="mt-4">
                            <Link
                                href="/medsos"
                                className="text-sm text-primary font-bold hover:underline"
                            >
                                Lihat Semua →
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm">
                        © {currentYear} Naquinity.
                    </p>
                    <div className="flex gap-6 text-sm text-slate-400">
                        <a
                            href="https://contact.naquinity.web.id/"
                            className="hover:text-slate-600"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Kontak
                        </a>
                        <Link href="/medsos" className="hover:text-slate-600">
                            Sosial Media
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
