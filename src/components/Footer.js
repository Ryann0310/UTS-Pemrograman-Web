import Image from "next/image";
import Link from "next/link";
import { identitas, kontak } from "@/data/sekolah";

export default function Footer() {
  return (
    <footer className="mt-24 bg-brand-900 text-brand-100">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-12">
        {/* Identitas */}
        <div className="md:col-span-5">
          <Image
            src="/logo-putih.png"
            alt="Logo Annajah Islamic School Jakarta"
            width={1080}
            height={250}
            className="h-12 w-auto"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-brand-200">
            {identitas.nama} ({identitas.namaEn}). {identitas.deskripsi}
          </p>
        </div>

        {/* Navigasi */}
        <div className="md:col-span-2">
          <h3 className="text-sm font-bold text-white">Menu</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link href="/" className="transition hover:text-white">Home</Link>
            </li>
            <li>
              <Link href="/about" className="transition hover:text-white">About</Link>
            </li>
            <li>
              <Link href="/berita" className="transition hover:text-white">Berita</Link>
            </li>
          </ul>
        </div>

        {/* Kontak */}
        <div className="md:col-span-5">
          <h3 className="text-sm font-bold text-white">Hubungi Kami</h3>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="text-brand-300">Alamat</dt>
              <dd className="mt-0.5 leading-relaxed">{kontak.alamat}</dd>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-brand-300">{kontak.teleponKet}</dt>
                <dd className="mt-0.5">{kontak.telepon}</dd>
              </div>
              <div>
                <dt className="text-brand-300">Jam operasional</dt>
                <dd className="mt-0.5">{kontak.jam}</dd>
              </div>
            </div>
            <div>
              <dt className="text-brand-300">Email</dt>
              <dd className="mt-0.5">{kontak.email}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-6 text-xs text-brand-300 sm:flex-row sm:justify-start sm:px-6">
          <p>© 2026 SMA Islam Annajah. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
