import type { Metadata } from 'next'
import { Manrope, Noto_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-display',
})

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://naquinity.web.id'),
  title: {
    template: '%s | Naquinity',
    default: 'Naquinity',
  },
  description: 'Website resmi Naquinity | Pendidikan Sistem dan Teknologi Informasi - UPI Kampus Purwakarta',
  keywords: ['Naquinity', 'PSTI 24', 'Navindra Equinox Unity', 'Mahasiswa', 'Teknologi Informasi', 'Organisasi Mahasiswa', 'Kampus'],
  authors: [{ name: 'Naquinity Tech Team' }],
  creator: 'Naquinity',
  publisher: 'Naquinity',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: {
      template: '%s | Naquinity',
      default: 'Naquinity - Navindra Equinox Unity',
    },
    description: 'Website resmi Naquinity | Pendidikan Sistem dan Teknologi Informasi - UPI Kampus Purwakarta',
    url: 'https://naquinity.web.id',
    siteName: 'Naquinity',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://tools.naquinity.web.id/images/logo/100kb.png',
        width: 800,
        height: 600,
        alt: 'Naquinity Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      template: '%s | Naquinity',
      default: 'Naquinity',
    },
    description: 'Website resmi Naquinity | Pendidikan Sistem dan Teknologi Informasi - UPI Kampus Purwakarta',
    images: ['https://tools.naquinity.web.id/images/logo/100kb.png'],
    creator: '@naquinity',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: 'https://tools.naquinity.web.id/images/logo/100kb.png',
    shortcut: 'https://tools.naquinity.web.id/images/logo/100kb.png',
    apple: 'https://tools.naquinity.web.id/images/logo/100kb.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${manrope.variable} ${notoSans.variable} font-body bg-white text-slate-900 antialiased selection:bg-primary/20 selection:text-primary`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
