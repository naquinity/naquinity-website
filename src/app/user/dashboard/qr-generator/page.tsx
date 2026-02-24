import { Metadata } from 'next'
import QRGeneratorClient from '@/components/user/QRGeneratorClient'

export const metadata: Metadata = {
    title: 'QR Code Generator | Naquinity',
}

export default function QRGeneratorPage() {
    return <QRGeneratorClient />
}
