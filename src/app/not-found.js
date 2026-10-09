import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-extrabold text-brand-900">Halaman tidak ditemukan</h1>
      <p className="mt-3 text-slate-600">
        Alamat yang Anda buka tidak tersedia atau berita sudah dipindahkan.
      </p>
      <Link
        href="/berita"
        className="mt-8 inline-flex rounded-full bg-brand-600 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-brand-700"
      >
        Kembali ke Berita
      </Link>
    </section>
  );
}
