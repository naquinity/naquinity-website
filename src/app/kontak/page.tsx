import PublicLayout from '@/components/layout/PublicLayout'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Kontak',
}

export default function KontakPage() {
    return (
        <div className="font-display">
            <PublicLayout>
                {/* Hero */}
                <section className="relative w-full h-[350px] flex flex-col justify-center items-center overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA9Nb3L5DDXWxV7cru38rdFB6jRUN_S7jHMt85LXlz--BZLson3HJBIz3tcrQmWiVP-re6CKgk3sgjXg4ts9kxXB5vqn_dcNSi01tXSRaNSINjIbObdGWC0rLrgudRyAPA7qb1LjTpONN5frLFwsw3AkZkBRm1kMHgcTvybPUf7ekfMwFKHm2iPcnfX6i4jWx6m-ahZEB4dQ9PRl-Mk5nerVBpy09CoU71P9278lRlhlgfs3BBtwhbGRWd5ZxVbv3p0M2-Ghkcj0moS")',
                        }}
                    />
                    <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
                    <div className="relative z-10 px-6 max-w-4xl text-center flex flex-col items-center gap-4">
                        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-[-0.033em]">
                            Hubungi Kami
                        </h1>
                        <p className="text-gray-200 text-base md:text-lg max-w-2xl font-light leading-relaxed">
                            Terhubung dengan tim Navindra Equinox Unity. Apakah Anda calon
                            mahasiswa, anggota aktif, atau mitra, kami siap membantu Anda.
                        </p>
                    </div>
                </section>

                {/* Main Content */}
                <main className="flex-grow w-full max-w-[1200px] mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Left Column - Contact Info */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            <div className="bg-[#F8F9FA] dark:bg-[#1a2430] p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-[0_4px_20px_rgba(0,0,0,0.03)] sticky top-28">
                                <h2 className="text-[#111417] dark:text-white tracking-tight text-2xl font-bold leading-tight mb-6">
                                    Informasi Kontak
                                </h2>
                                <div className="flex flex-col gap-8">
                                    {/* Email */}
                                    <div className="flex gap-4 items-start group">
                                        <div className="flex-shrink-0 size-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-primary dark:text-blue-400 shadow-sm border border-gray-100 dark:border-gray-700 group-hover:scale-105 transition-transform duration-300">
                                            <span className="material-symbols-outlined text-xl">
                                                mail
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">
                                                Email
                                            </p>
                                            <a
                                                className="text-[#111417] dark:text-gray-200 text-sm font-medium hover:text-primary dark:hover:text-blue-400 transition-colors"
                                                href="mailto:info@navindra-equinox.com"
                                            >
                                                info@navindra-equinox.com
                                            </a>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex gap-4 items-start group">
                                        <div className="flex-shrink-0 size-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-primary dark:text-blue-400 shadow-sm border border-gray-100 dark:border-gray-700 group-hover:scale-105 transition-transform duration-300">
                                            <span className="material-symbols-outlined text-xl">
                                                call
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">
                                                WhatsApp / Phone
                                            </p>
                                            <a
                                                className="text-[#111417] dark:text-gray-200 text-sm font-medium hover:text-primary dark:hover:text-blue-400 transition-colors"
                                                href="tel:+6281234567890"
                                            >
                                                +62 812 3456 7890
                                            </a>
                                            <span className="text-gray-400 text-xs">
                                                (Admin - Humas)
                                            </span>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="flex gap-4 items-start group">
                                        <div className="flex-shrink-0 size-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-primary dark:text-blue-400 shadow-sm border border-gray-100 dark:border-gray-700 group-hover:scale-105 transition-transform duration-300">
                                            <span className="material-symbols-outlined text-xl">
                                                location_on
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">
                                                Sekretariat
                                            </p>
                                            <p className="text-[#111417] dark:text-gray-200 text-sm font-medium leading-relaxed">
                                                Gedung Student Center, Lantai 2<br />
                                                Kampus Utama Navindra
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-8" />

                                <div className="flex gap-4">
                                    <a
                                        className="size-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-primary dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                                        href="#"
                                    >
                                        <span className="text-sm font-bold">IG</span>
                                    </a>
                                    <a
                                        className="size-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-primary dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                                        href="#"
                                    >
                                        <span className="text-sm font-bold">LN</span>
                                    </a>
                                    <a
                                        className="size-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-primary dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                                        href="#"
                                    >
                                        <span className="text-sm font-bold">YT</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <div className="lg:col-span-8">
                            <div className="bg-white dark:bg-background-dark p-0 lg:p-4">
                                <div className="mb-8">
                                    <h2 className="text-[#111417] dark:text-white tracking-tight text-[28px] font-bold leading-tight mb-2">
                                        Kirim Pesan
                                    </h2>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Punya pertanyaan atau proposal? Isi formulir di bawah ini dan
                                        kami akan segera menghubungi Anda.
                                    </p>
                                </div>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label
                                                className="block text-sm font-medium text-[#111417] dark:text-gray-300"
                                                htmlFor="name"
                                            >
                                                Nama Lengkap
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                    <span className="material-symbols-outlined text-[20px]">
                                                        person
                                                    </span>
                                                </div>
                                                <input
                                                    className="block w-full pl-10 pr-3 py-3 border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg shadow-sm focus:ring-primary focus:border-primary sm:text-sm transition-colors dark:text-white"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Contoh: Andi Pratama"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label
                                                className="block text-sm font-medium text-[#111417] dark:text-gray-300"
                                                htmlFor="nim"
                                            >
                                                NIM{' '}
                                                <span className="text-gray-400 font-normal">
                                                    (Opsional)
                                                </span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                    <span className="material-symbols-outlined text-[20px]">
                                                        badge
                                                    </span>
                                                </div>
                                                <input
                                                    className="block w-full pl-10 pr-3 py-3 border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg shadow-sm focus:ring-primary focus:border-primary sm:text-sm transition-colors dark:text-white"
                                                    id="nim"
                                                    name="nim"
                                                    placeholder="Contoh: 12345678"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            className="block text-sm font-medium text-[#111417] dark:text-gray-300"
                                            htmlFor="email"
                                        >
                                            Alamat Email
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                <span className="material-symbols-outlined text-[20px]">
                                                    alternate_email
                                                </span>
                                            </div>
                                            <input
                                                className="block w-full pl-10 pr-3 py-3 border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg shadow-sm focus:ring-primary focus:border-primary sm:text-sm transition-colors dark:text-white"
                                                id="email"
                                                name="email"
                                                placeholder="nama@email.com"
                                                type="email"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            className="block text-sm font-medium text-[#111417] dark:text-gray-300"
                                            htmlFor="message"
                                        >
                                            Pesan
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                className="block w-full p-3 border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg shadow-sm focus:ring-primary focus:border-primary sm:text-sm transition-colors dark:text-white resize-none"
                                                id="message"
                                                name="message"
                                                placeholder="Bagaimana kami bisa membantu Anda?"
                                                rows={5}
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-2">
                                        <button
                                            className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-sm font-bold rounded-lg shadow-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 w-full md:w-auto"
                                            type="button"
                                        >
                                            <span className="mr-2">Kirim Pesan</span>
                                            <span className="material-symbols-outlined text-[18px]">
                                                send
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </PublicLayout>
        </div>
    )
}
