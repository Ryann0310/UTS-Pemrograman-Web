"use client";

import Image from "next/image";
import Link from "next/link";
import { useBerita } from "@/lib/useBerita";

function StatCard({ label, nilai, catatan }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-brand-600">{nilai}</p>
      {catatan && <p className="mt-1 text-xs text-slate-500">{catatan}</p>}
    </div>
  );
}

export default function DashboardPage() {
  const { items, ready } = useBerita();

  const perKategori = items.reduce((acc, b) => {
    acc[b.category] = (acc[b.category] || 0) + 1;
    return acc;
  }, {});
  const kategori = Object.entries(perKategori).sort((a, b) => b[1] - a[1]);
  const maks = Math.max(1, ...kategori.map(([, n]) => n));
  const terbaru = items.slice(0, 5);
  const ukuranKb = ready ? Math.max(1, Math.round(new Blob([JSON.stringify(items)]).size / 1024)) : 0;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-brand-900">Dashboard</h1>
          <p className="mt-1 text-slate-600">Ringkasan data website SMA Islam Annajah.</p>
        </div>
        <Link
          href="/admin/berita"
          className="rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition duration-200 hover:-translate-y-0.5 hover:bg-brand-700"
        >
          Kelola Berita
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total berita" nilai={ready ? items.length : "-"} />
        <StatCard label="Kategori" nilai={ready ? kategori.length : "-"} />
        <StatCard
          label="Berita terbaru"
          nilai={ready && terbaru[0] ? terbaru[0].date : "-"}
          catatan="Berdasarkan urutan teratas"
        />
        <StatCard label="Ukuran data" nilai={ready ? `${ukuranKb} KB` : "-"} catatan="dari ± 5.000 KB localStorage" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* Berita terbaru */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-brand-900">Berita terbaru</h2>
            <Link href="/admin/berita" className="text-sm font-bold text-brand-600 hover:text-brand-800">
              Lihat semua
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-slate-100">
            {!ready && <li className="py-6 text-sm text-slate-500">Memuat data...</li>}
            {ready && terbaru.length === 0 && (
              <li className="py-6 text-sm text-slate-500">Belum ada berita.</li>
            )}
            {terbaru.map((b) => (
              <li key={b.id} className="flex items-center gap-4 py-3">
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-brand-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.image} alt="" className="h-full w-full object-cover" style={{ objectPosition: b.imagePosition }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-brand-900">{b.title}</p>
                  <p className="text-xs text-slate-500">
                    {b.date} · {b.category}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Per kategori */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-brand-900">Berita per kategori</h2>
          <ul className="mt-5 space-y-4">
            {kategori.map(([nama, n]) => (
              <li key={nama}>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-slate-700">{nama}</span>
                  <span className="text-slate-500">{n}</span>
                </div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-brand-50">
                  <div className="h-full rounded-full bg-brand-600 transition-all duration-500" style={{ width: `${(n / maks) * 100}%` }} />
                </div>
              </li>
            ))}
            {ready && kategori.length === 0 && <li className="text-sm text-slate-500">Belum ada data.</li>}
          </ul>
        </section>
      </div>

      <div className="mt-8 rounded-2xl bg-brand-50 p-6">
        <Image src="/logo.png" alt="" width={1080} height={250} className="h-8 w-auto opacity-90" />
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          Data admin disimpan di <strong>localStorage</strong> browser ini. Data tidak dikirim ke server
          dan tidak ikut terlihat di perangkat lain.
        </p>
      </div>
    </>
  );
}
