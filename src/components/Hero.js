import Image from "next/image";
import Link from "next/link";
import { identitas } from "@/data/sekolah";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-900">
      {/* Foto latar + overlay agar teks mudah dibaca */}
      <Image
        src="/sekolah.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-900/95 via-brand-900/80 to-brand-800/40" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-brand-900/70 to-transparent" />

      <div className="mx-auto flex min-h-[600px] max-w-6xl flex-col justify-center px-4 pb-36 pt-20 sm:px-6 lg:min-h-[700px]">
        <Image
          src="/logo-putih.png"
          alt="Logo Annajah Islamic School Jakarta"
          width={1080}
          height={250}
          priority
          className="hero-rise h-14 w-auto self-start sm:h-16"
          style={{ animationDelay: "0.05s" }}
        />

        <h1
          className="hero-rise mt-10 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.2s" }}
        >
          {identitas.nama}
        </h1>

        <p
          className="hero-rise mt-3 text-lg font-semibold text-gold sm:text-2xl"
          style={{ animationDelay: "0.3s" }}
        >
          {identitas.namaEn}
        </p>

        <p
          className="hero-rise mt-8 max-w-2xl text-xl font-medium leading-snug text-white sm:text-2xl"
          style={{ animationDelay: "0.4s" }}
        >
          {identitas.slogan}
        </p>

        <p
          className="hero-rise mt-4 max-w-xl text-base leading-relaxed text-brand-100 sm:text-lg"
          style={{ animationDelay: "0.5s" }}
        >
          {identitas.deskripsi}
        </p>

        <div
          className="hero-rise mt-10 flex flex-wrap gap-3"
          style={{ animationDelay: "0.6s" }}
        >
          <Link
            href="/about"
            className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-brand-700 shadow-lg shadow-black/20 transition duration-200 hover:-translate-y-0.5 hover:bg-brand-50 sm:text-base"
          >
            Tentang Sekolah
          </Link>
          <Link
            href="/berita"
            className="rounded-full border border-white/50 px-7 py-3.5 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/10 sm:text-base"
          >
            Lihat Berita
          </Link>
        </div>
      </div>
    </section>
  );
}
