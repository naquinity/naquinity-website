import LoginForm from './LoginForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Login Admin',
}

export default function AdminLoginPage() {
    return <LoginForm />
}
