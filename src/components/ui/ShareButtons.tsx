'use client'

import { useState, useEffect } from 'react'

export default function ShareButtons({ title }: { title: string }) {
    const [url, setUrl] = useState('')
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        setUrl(window.location.href)
    }, [])

    const handleCopy = () => {
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }



    const shareLinks = [
        {
            name: 'WhatsApp',
            url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
            color: 'bg-[#25D366]',
            icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
        },
        {
            name: 'Telegram',
            url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
            color: 'bg-[#0088cc]',
            icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z" /></svg>
        },
        {
            name: 'Twitter / X',
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
            color: 'bg-black',
            icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        },
        {
            name: 'Facebook',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            color: 'bg-[#1877F2]',
            icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
        },
        {
            name: 'Threads',
            url: `https://www.threads.net/intent/post?text=${encodeURIComponent(title + ' ' + url)}`,
            color: 'bg-black',
            icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.74 3.064c-1.78-.96-3.86-1.503-6.075-1.503C5.232 1.56.88 5.673.88 11.905c0 6.136 4.379 10.749 11.238 10.749 3.51 0 6.643-1.398 8.658-3.64l-2.03-2.126c-1.63 1.63-3.855 2.656-6.494 2.656-4.698 0-7.794-3.13-7.794-7.585 0-4.636 3.255-7.726 8.017-7.726 3.12 0 5.163 1.49 5.869 3.99H11.08v3.08h7.94c.046.465.07.96.07 1.487 0 3.32-1.353 5.842-4.103 5.842-1.896 0-3.078-1.066-3.078-3.07 0-1.868 1.346-3.766 4.413-3.766 1.258 0 2.336.326 3.033.725l1.633-2.48c-1.22-.845-2.85-1.325-4.707-1.325-4.888 0-7.398 3.06-7.398 6.726 0 3.342 2.378 5.815 6.16 5.815 4.378 0 7.37-3.414 7.37-8.38 0-3.029-.757-5.541-2.924-7.83zm-4.108 12.008c-1.55 0-2.316-.948-2.316-2.222 0-1.46 1.054-2.857 2.895-2.857.733 0 1.436.236 2.03.623-.23 3.085-1.203 4.456-2.609 4.456z" /></svg>
        },
    ]

    const manualShare = [
        {
            name: 'Instagram',
            url: 'https://instagram.com',
            color: 'bg-[#E1306C]',
            icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
        },
        {
            name: 'TikTok',
            url: 'https://tiktok.com',
            color: 'bg-black',
            icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.65-1.58-1.02v10.95c0 4.97-5.53 7.6-9.15 4.73-3.23-2.5-3.35-7.66.44-10.29 1.94-1.35 4.54-1.16 6.55.15v4.2c-1.06-.8-2.58-.93-3.8-.39-1.63.7-2.18 2.68-1.18 4.1 1.05 1.53 3.25 1.55 4.39.06.67-.88.94-1.92.93-3.03V.02z" /></svg>
        },
    ]

    return (
        <div className="py-8 border-t border-slate-100 mt-12">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">share</span>
                Bagikan Artikel
            </h3>

            <div className="flex flex-wrap gap-3">
                {shareLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-white ${link.color} hover:opacity-90 transition-opacity font-medium text-sm`}
                    >
                        {link.icon}
                        {link.name}
                    </a>
                ))}

                {/* Manual Share Platforms */}
                {manualShare.map((platform) => (
                    <a
                        key={platform.name}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleCopy}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-white ${platform.color} hover:opacity-90 transition-opacity font-medium text-sm`}
                        title="Salin Link & Buka Aplikasi"
                    >
                        {platform.icon}
                        {platform.name}
                    </a>
                ))}

                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors font-medium text-sm"
                >
                    <span className="material-symbols-outlined !text-lg">{copied ? 'check' : 'content_copy'}</span>
                    {copied ? 'Link Disalin!' : 'Salin Link'}
                </button>
            </div>

            {/* Helper Text */}
            <p className="mt-4 text-xs text-slate-400 italic">
                *Untuk Instagram & TikTok: Link akan disalin otomatis, lalu buka aplikasi untuk memposting.
            </p>
        </div>
    )
}
