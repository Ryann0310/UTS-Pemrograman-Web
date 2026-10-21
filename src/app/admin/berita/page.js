"use client";

import { useEffect, useMemo, useState } from "react";
import BeritaForm from "@/components/admin/BeritaForm";
import { useBerita } from "@/lib/useBerita";

const tombolKecil =
  "rounded-full px-4 py-1.5 text-xs font-bold transition-colors";

export default function KelolaBeritaPage() {
  const { items, ready, error, tambah, ubah, hapus, reset } = useBerita();
  const [form, setForm] = useState(null); // null = tertutup, {} = tambah, {item} = edit
  const [hapusItem, setHapusItem] = useState(null);
  const [konfirmReset, setKonfirmReset] = useState(false);
  const [cari, setCari] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [notif, setNotif] = useState("");

  useEffect(() => {
    if (!notif) return;
    const t = setTimeout(() => setNotif(""), 2800);
    return () => clearTimeout(t);
  }, [notif]);

  const kategori = useMemo(() => ["Semua", ...new Set(items.map((b) => b.category))], [items]);

  const tampil = items.filter(
    (b) =>
      (filter === "Semua" || b.category === filter) &&
      b.title.toLowerCase().includes(cari.trim().toLowerCase())
  );

  const simpan = (data) => {
    const ok = form.item ? ubah(form.item.id, data) : tambah(data);
    if (ok) setNotif(form.item ? "Berita berhasil diperbarui." : "Berita berhasil ditambahkan.");
    return ok;
  };

  const konfirmasiHapus = () => {
    if (hapus(hapusItem.id)) setNotif("Berita berhasil dihapus.");
    setHapusItem(null);
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-brand-900">Kelola Berita</h1>
          <p className="mt-1 text-slate-600">Tambah, ubah, atau hapus berita sekolah.</p>
        </div>
        <button
          type="button"
          onClick={() => setForm({})}
          className="rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition duration-200 hover:-translate-y-0.5 hover:bg-brand-700"
        >
          + Tambah Berita
        </button>
      </div>

      {notif && (
        <p role="status" className="mt-6 rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800">
          {notif}
        </p>
      )}
      {error && (
        <p role="alert" className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      {/* Pencarian & filter */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          placeholder="Cari judul berita..."
          aria-label="Cari judul berita"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-600 focus:ring-4 focus:ring-brand-100"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          aria-label="Filter kategori"
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-600 focus:ring-4 focus:ring-brand-100 sm:w-56"
        >
          {kategori.map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>
      </div>

      {/* Daftar */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {!ready && <p className="p-8 text-center text-sm text-slate-500">Memuat data...</p>}
        {ready && tampil.length === 0 && (
          <p className="p-8 text-center text-sm text-slate-500">
            {items.length === 0 ? "Belum ada berita. Klik “Tambah Berita” untuk memulai." : "Tidak ada berita yang cocok."}
          </p>
        )}

        <ul className="divide-y divide-slate-100">
          {tampil.map((b) => (
            <li key={b.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
              <div className="h-40 w-full shrink-0 overflow-hidden rounded-xl bg-brand-100 sm:h-20 sm:w-32">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.image} alt="" className="h-full w-full object-cover" style={{ objectPosition: b.imagePosition }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold leading-snug text-brand-900">{b.title}</p>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="rounded-full bg-brand-50 px-2.5 py-0.5 font-bold text-brand-700">{b.category}</span>
                  <span>{b.date}</span>
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600">{b.excerpt}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button type="button" onClick={() => setForm({ item: b })} className={`${tombolKecil} bg-brand-50 text-brand-700 hover:bg-brand-600 hover:text-white`}>
                  Edit
                </button>
                <button type="button" onClick={() => setHapusItem(b)} className={`${tombolKecil} bg-red-50 text-red-700 hover:bg-red-600 hover:text-white`}>
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
        <p>Menampilkan {tampil.length} dari {items.length} berita</p>
        <button type="button" onClick={() => setKonfirmReset(true)} className="font-semibold text-slate-600 underline-offset-4 hover:text-brand-700 hover:underline">
          Kembalikan ke data awal
        </button>
      </div>

      {/* Modal tambah/edit */}
      {form && (
        <BeritaForm initial={form.item} onSubmit={simpan} onClose={() => setForm(null)} />
      )}

      {/* Konfirmasi hapus */}
      {hapusItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" role="alertdialog" aria-modal="true" aria-labelledby="judul-hapus">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
            <h2 id="judul-hapus" className="text-xl font-extrabold text-brand-900">Hapus berita ini?</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              “{hapusItem.title}” akan dihapus dari data admin. Tindakan ini tidak bisa dibatalkan.
            </p>
            <div className="mt-8 flex justify-end gap-3">
              <button type="button" onClick={() => setHapusItem(null)} className="rounded-full px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100">
                Batal
              </button>
              <button type="button" onClick={konfirmasiHapus} className="rounded-full bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700">
                Ya, hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Konfirmasi reset */}
      {konfirmReset && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" role="alertdialog" aria-modal="true" aria-labelledby="judul-reset">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
            <h2 id="judul-reset" className="text-xl font-extrabold text-brand-900">Kembalikan ke data awal?</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Semua perubahan Anda akan diganti dengan data berita bawaan dari <code>src/data/berita.js</code>.
            </p>
            <div className="mt-8 flex justify-end gap-3">
              <button type="button" onClick={() => setKonfirmReset(false)} className="rounded-full px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100">
                Batal
              </button>
              <button
                type="button"
                onClick={() => { reset(); setKonfirmReset(false); setNotif("Data dikembalikan ke kondisi awal."); }}
                className="rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-700"
              >
                Ya, kembalikan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
