import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import GoogleCompleteForm from './GoogleCompleteForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Lengkapi Data Akun',
}

export default async function UserGoogleCompletePage() {
    const cookieStore = await cookies()
    const tempCookie = cookieStore.get('google_temp_user')

    if (!tempCookie || !tempCookie.value) {
        redirect('/user/login?error=invalid_session')
    }

    const { name, email } = JSON.parse(tempCookie.value)

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50 font-display">
            {/* Left Side - Form */}
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-20">
                <div className="max-w-md w-full mx-auto space-y-8">
                    {/* Header */}
                    <div className="text-center sm:text-left">
                        <Link href="/" className="inline-block mb-8 hover:opacity-80 transition-opacity">
                            <span className="text-2xl font-black bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent">
                                NAQUINITY
                            </span>
                        </Link>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Satu Langkah Lagi!</h1>
                        <p className="text-slate-500">
                            Silakan lengkapi data berikut untuk menyelesaikan pendaftaran akun Anda menggunakan Google.
                        </p>
                    </div>

                    <GoogleCompleteForm initialData={{ name, email }} />
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:block relative bg-slate-900">
                <div className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage: "url('https://cdn-1.naquinity.web.id/angkatan/IMG_7173.JPG')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-slate-900/60" />
                <div className="relative h-full flex flex-col justify-end p-20 text-white">
                    <h2 className="text-4xl font-bold mb-4">Selamat Datang di Dashboard Naquinity</h2>
                    <p className="text-lg text-slate-200">
                        Akses informasi keuangan, kegiatan, dan pencapaian dalam satu tempat.
                    </p>
                </div>
            </div>
        </div>
    )
}
