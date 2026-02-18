import PublicLayout from '@/components/layout/PublicLayout'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import type { Program, Mahasiswa } from '@/types/database'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Beranda | Naquinity',
}

async function getHomeData() {
  const supabase = await createClient()

  const [tentangRes, programsRes, mahasiswaRes, maskotRes, totalMahasiswaRes] = await Promise.all([
    supabase.from('tentang_kami').select('*').limit(1).single(),
    supabase.from('program').select('*').order('created_at', { ascending: false }).limit(4),
    supabase.from('mahasiswa').select('*').order('created_at', { ascending: false }).limit(4),
    supabase.from('maskot').select('*').limit(1).single(),
    supabase.from('mahasiswa').select('*', { count: 'exact', head: true }),
  ])

  return {
    tentang: tentangRes.data,
    programs: (programsRes.data as Program[]) || [],
    mahasiswa: (mahasiswaRes.data as Mahasiswa[]) || [],
    maskot: maskotRes.data,
    totalMahasiswa: totalMahasiswaRes.count || 0,
  }
}

export default async function HomePage() {
  const { tentang, programs, mahasiswa, maskot, totalMahasiswa } = await getHomeData()

  return (
    <div className="font-display">
      <PublicLayout>
        <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden">
          <main className="flex-grow">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="flex flex-col gap-8 text-center lg:text-left order-2 lg:order-1">
                  <div className="space-y-4">
                    <h2 className="text-primary text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter">
                      Navindra <br className="hidden lg:block" />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                        Equinox Unity
                      </span>
                    </h2>
                    <p className="text-secondary-text text-lg sm:text-xl font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                      Dikenal dengan nama Naquinity, kami adalah Pendidikan Sistem dan Teknologi Informasi Angkatan 24
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                    <Link
                      href="/tentang"
                      className="h-14 px-8 bg-primary hover:bg-primary-hover text-white text-base font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center"
                    >
                      Tentang Kami
                    </Link>
                    <Link
                      href="/mahasiswa"
                      className="h-14 px-8 bg-white border-2 border-slate-200 text-slate-700 text-base font-bold rounded-xl hover:border-primary/30 hover:bg-slate-50 transition-all flex items-center justify-center"
                    >
                      Daftar Mahasiswa
                    </Link>
                  </div>
                  <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500 font-medium">
                    <div className="flex -space-x-3">
                      {mahasiswa.slice(0, 3).map((mhs, i) => (
                        <div key={i} className="size-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative">
                          {mhs.photo_url && (
                            <Image
                              src={mhs.photo_url}
                              alt={mhs.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <p>Kami berjumlah {totalMahasiswa}+ Mahasiswa</p>
                  </div>
                </div>
                <div className="order-1 lg:order-2 relative group">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-slate-50 rounded-[2rem] -z-10 rotate-3 group-hover:rotate-2 transition-transform duration-700"></div>
                  <div
                    className="w-full aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden shadow-2xl relative"
                  >
                    <Image
                      src="https://tools.naquinity.web.id/images/logo/nq.png"
                      alt="Naquinity Logo"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section className="py-20 bg-background-light">
              <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-8 md:p-12 rounded-2xl border border-slate-100 shadow-soft">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
                    <div className="max-w-xl space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary text-xs font-bold uppercase tracking-wider">
                        <span className="size-2 rounded-full bg-primary"></span>
                        Tentang Kami
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">Rumah bagi Mahasiswa PSTI 2024</h3>
                      <p className="text-secondary-text leading-relaxed">
                        {tentang?.content
                          ? `${tentang.content.substring(0, 200)}...`
                          : 'Navindra Equinox Unity bukan sekadar angkatan, tapi rumah bagi para mahasiswa PSTI 2024.'}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <Link href="/tentang" className="group flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                        Selengkapnya
                        <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Mascot Section */}
            {maskot && (
              <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="order-2 md:order-1 relative">
                    <div className="aspect-square w-full max-w-md mx-auto bg-slate-50 rounded-[2.5rem] overflow-hidden relative shadow-inner">
                      {maskot.image_url && (
                        <Image
                          src={maskot.image_url}
                          alt={maskot.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="absolute -top-6 -left-6 size-24 bg-primary/5 rounded-full blur-2xl -z-10"></div>
                    <div className="absolute -bottom-6 -right-6 size-32 bg-blue-200/20 rounded-full blur-2xl -z-10"></div>
                  </div>
                  <div className="order-1 md:order-2 flex flex-col gap-6 md:pl-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                      Say HI to {maskot.name || 'Naqy'}!
                    </h2>
                    <p className="text-secondary-text text-lg leading-relaxed whitespace-pre-line">
                      {maskot.description || 'Naqy.'}
                    </p>
                    <div className="grid grid-cols-2 gap-4 py-4">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <span className="material-symbols-outlined text-primary mb-2">sentiment_satisfied</span>
                        <p className="font-bold text-slate-900">Friendly</p>
                        <p className="text-sm text-slate-500">Selalu menyapa</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <span className="material-symbols-outlined text-primary mb-2">bolt</span>
                        <p className="font-bold text-slate-900">Energetic</p>
                        <p className="text-sm text-slate-500">Tak kenal lelah</p>
                      </div>
                    </div>
                    <Link href="/tentang#maskot" className="w-fit flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 px-6 py-3 rounded-lg font-bold transition-colors">
                      <span>Kenalan dengan {maskot.name || 'Naqy'} yuk!</span>
                      <span className="material-symbols-outlined text-sm">arrow_outward</span>
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* Programs Section */}
            <section className="py-20 bg-slate-50">
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Program Kami</h2>
                    <p className="text-slate-500">Program yang diciptakan untuk membangun mahasiswa dan Naquinity</p>
                  </div>
                  <Link className="hidden sm:inline-flex items-center font-bold text-primary hover:underline" href="/program">
                    Lihat semua program
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {programs.map((program) => (
                    <div key={program.id} className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-primary/20 hover:shadow-lg transition-all group">
                      <div className="bg-blue-50 w-fit p-3 rounded-xl text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                        {program.logo_url ? (
                          <div className="relative w-8 h-8">
                            <Image src={program.logo_url} alt={program.title} fill className="object-contain" />
                          </div>
                        ) : (
                          <span className="material-symbols-outlined text-3xl">school</span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{program.title}</h3>
                      <p className="text-slate-500 text-sm mb-6">
                        {program.description.substring(0, 100)}...
                      </p>
                      <Link className="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all" href="/program">
                        Detail <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Mahasiswa Section */}
            <section className="py-20 border-b border-slate-100">
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                  <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold text-slate-900">Daftar Mahasiswa</h2>
                    <p className="text-slate-500 mt-2">Mari melihat wajah-wajah Naquinity</p>
                  </div>
                </div>
                <div className="flex overflow-x-auto hide-scrollbar gap-6 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
                  {mahasiswa.map((mhs) => (
                    <div key={mhs.id} className="min-w-[240px] bg-white border border-slate-100 p-6 rounded-2xl flex flex-col items-center text-center hover:shadow-lg transition-all cursor-pointer group">
                      <div className="size-24 rounded-full bg-slate-100 mb-4 overflow-hidden border-2 border-white shadow-sm group-hover:border-primary transition-colors relative">
                        {mhs.photo_url && (
                          <Image alt={mhs.name} src={mhs.photo_url} fill className="object-cover" />
                        )}
                      </div>
                      <h4 className="font-bold text-slate-900">{mhs.name}</h4>
                      <p className="text-xs text-primary font-semibold mb-2">{mhs.nim}</p>
                      <p className="text-xs text-slate-500 line-clamp-2">"{mhs.quote || ''}"</p>
                    </div>
                  ))}
                  <Link href="/mahasiswa" className="min-w-[240px] bg-slate-50 border border-slate-200 border-dashed p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-slate-100 transition-all cursor-pointer">
                    <div className="size-12 rounded-full bg-slate-200 mb-4 flex items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined">add</span>
                    </div>
                    <h4 className="font-bold text-slate-600">Lihat Semua</h4>
                    <p className="text-xs text-slate-400">{totalMahasiswa}+ Mahasiswa</p>
                  </Link>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
              <div className="max-w-[1280px] mx-auto">
                <div className="bg-primary rounded-3xl p-10 md:p-16 text-center md:text-left relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ingin bekerja sama dengan kami?</h2>
                      <p className="text-blue-100 text-lg max-w-xl">Kami terbuka untuk kolaborasi, media partner, dan lain-lain sesuai kesepakatan.</p>
                    </div>
                    <Link href="https://contact.naquinity.web.id/" target="_blank" className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg whitespace-nowrap">
                      Hubungi Kami
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </PublicLayout>
    </div>
  )
}
