import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import NewsCarousel from "@/components/NewsCarousel";
import { berita } from "@/data/berita";
import { statistik, nilaiPendidikan, tentangSingkat, kontak } from "@/data/sekolah";

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-brand-600" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Statistik sederhana */}
      <section className="relative z-10 -mt-16 px-4 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl bg-slate-200 shadow-xl shadow-brand-900/10 lg:grid-cols-4">
          {statistik.map((s) => (
            <div key={s.label} className="bg-white px-6 py-7 text-center">
              <p className="text-3xl font-extrabold text-brand-600 sm:text-4xl">{s.nilai}</p>
              <p className="mt-1 text-sm text-slate-600">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tentang singkat */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-3xl shadow-xl shadow-brand-900/15 lg:max-w-none">
              <Image src="/kegiatan.jpg" alt="Gedung SMA Islam Annajah, Jakarta" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" style={{ objectPosition: "50% 50%" }} />
            </div>
            <div className="absolute -bottom-6 -right-2 hidden rounded-2xl bg-brand-600 px-6 py-5 text-white shadow-xl sm:block">
              <p className="text-2xl font-extrabold">22 November 2010</p>
              <p className="text-sm text-brand-100">Annajah lahir</p>
            </div>
          </div>

          <div>
            <SectionHeading align="left" title="Mengenal Annajah" description="Annajah berkomitmen membimbing siswa menjadi bagian masyarakat yang membanggakan, dengan pendidikan yang berpijak pada nilai Islam." />
            <ul className="mt-8 space-y-5">
              {tentangSingkat.map((t) => (
                <li key={t.judul} className="flex gap-3">
                  <CheckIcon />
                  <div>
                    <h3 className="font-bold text-brand-900">{t.judul}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{t.isi}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/about" className="mt-10 inline-flex rounded-full bg-brand-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition duration-200 hover:-translate-y-0.5 hover:bg-brand-700">
              Kenali Annajah
            </Link>
          </div>
        </div>
      </section>

      {/* Nilai pendidikan */}
      <section className="bg-sand py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading title="Nilai-nilai Pendidikan" description="Nilai yang diterapkan di Annajah untuk membangun karakter siswa agar kelak berperan positif dalam kehidupan bermasyarakat." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {nilaiPendidikan.map((n) => (
              <div key={n.nama} className="group rounded-2xl border border-brand-100 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-900/10">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                    <path d="M12 1.5l2.6 4.4 5-.9-.9 5 4.3 2.6-4.3 2.6.9 5-5-.9L12 22.5l-2.6-4.4-5 .9.9-5L1 13.1l4.3-2.6-.9-5 5 .9L12 1.5z" />
                  </svg>
                </span>
                <h3 className="mt-5 text-xl font-bold text-brand-900">{n.nama}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{n.deskripsi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Berita terbaru: auto slider */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <SectionHeading title="Berita Terbaru" description="Kabar kegiatan, acara, dan liputan terbaru dari lingkungan Annajah." />
        <div className="mt-12">
          <NewsCarousel items={berita} />
        </div>
        <div className="mt-10 text-center">
          <Link href="/berita" className="inline-flex rounded-full border-2 border-brand-600 px-7 py-3 text-sm font-bold text-brand-700 transition duration-200 hover:bg-brand-600 hover:text-white">
            Lihat Semua Berita
          </Link>
        </div>
      </section>

      {/* Jelajahi: Ekstrakurikuler & Prestasi */}
      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <div className="grid items-stretch gap-6 md:grid-cols-5">
          <Link href="/about#ekstrakurikuler" className="group relative isolate block min-h-[300px] overflow-hidden rounded-3xl md:col-span-3">
            <Image
              src="/ekstrakurikuler.jpg"
              alt="Pertandingan basket Annajah Cup Vol 3 2026"
              fill
              sizes="(min-width: 768px) 680px, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
              style={{ objectPosition: "50% 25%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-900/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <h3 className="text-2xl font-extrabold text-white">Ekstrakurikuler</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-brand-100">Dari olahraga, sains, hingga seni, setiap siswa dapat menemukan pilihan yang sesuai minatnya.</p>
            </div>
          </Link>

          <Link href="/about#prestasi" className="group relative isolate block aspect-[688/808] overflow-hidden rounded-3xl md:col-span-2 md:aspect-auto">
            <Image
              src="/prestasi.png"
              alt="Prestasi siswa SMA Islam Annajah: Juara 2 Olimpiade Bahasa Arab tingkat provinsi 2026"
              fill
              sizes="(min-width: 768px) 450px, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-1.5 text-sm font-bold text-brand-700 shadow">Prestasi</span>
          </Link>
        </div>
      </section>

      {/* Ajakan bergabung */}
      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl bg-brand-600 px-6 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="text-2xl font-extrabold text-white sm:text-4xl">Siap untuk mulai belajar di Annajah?</h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-100">
            Informasi pendaftaran tersedia di situs resmi. Hubungi kami di {kontak.telepon} pada jam {kontak.jam}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {}
            <a href={kontak.ppdb} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-brand-700 transition duration-200 hover:-translate-y-0.5 hover:bg-brand-50">
              Info PPDB Online
            </a>
            <Link href="/about#alamat" className="rounded-full border border-white/60 px-7 py-3.5 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/10">
              Lihat Alamat Sekolah
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
