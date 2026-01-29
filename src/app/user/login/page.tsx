import LoginForm from './LoginForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Login Mahasiswa',
}

export default function UserLoginPage() {
    return <LoginForm />
}
