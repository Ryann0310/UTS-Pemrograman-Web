"use client";

import { useEffect, useRef, useState } from "react";
import { opsiGambar, opsiKategori } from "@/data/admin";
import { toIndo, toIso, todayIso } from "@/lib/tanggal";
import { fileToDataUrl } from "@/lib/gambar";

const input =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-600 focus:ring-4 focus:ring-brand-100";

function Field({ label, error, hint, children, htmlFor }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {hint && !error && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

export default function BeritaForm({ initial, onSubmit, onClose }) {
  const edit = Boolean(initial);
  const fileRef = useRef(null);

  const [form, setForm] = useState(() => ({
    title: initial?.title ?? "",
    tanggal: (initial && toIso(initial.date)) || todayIso(),
    category: initial?.category ?? opsiKategori[0],
    image: initial?.image ?? opsiGambar[0].value,
    excerpt: initial?.excerpt ?? "",
    content: initial?.content ?? "",
  }));
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Esc untuk menutup + kunci scroll halaman di belakang modal
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const lama = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = lama;
    };
  }, [onClose]);

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const pilihFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      set("image", await fileToDataUrl(file));
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const kirim = (e) => {
    e.preventDefault();
    const err = {};
    if (form.title.trim().length < 5) err.title = "Judul minimal 5 karakter.";
    if (!form.tanggal) err.tanggal = "Tanggal wajib diisi.";
    if (!form.category.trim()) err.category = "Kategori wajib diisi.";
    if (form.excerpt.trim().length < 10) err.excerpt = "Ringkasan minimal 10 karakter.";
    if (form.content.trim().length < 20) err.content = "Isi berita minimal 20 karakter.";
    setErrors(err);
    if (Object.keys(err).length) return;

    const ok = onSubmit({
      title: form.title.trim(),
      date: toIndo(form.tanggal),
      category: form.category.trim(),
      image: form.image,
      imagePosition: initial?.imagePosition ?? "50% 50%",
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
    });
    if (ok) onClose();
  };

  const adaDiOpsi = opsiGambar.some((o) => o.value === form.image);
  const daftarGambar = adaDiOpsi
    ? opsiGambar
    : [
        { value: form.image, label: form.image.startsWith("data:") ? "Foto yang diunggah" : `Saat ini (${form.image})` },
        ...opsiGambar,
      ];

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="judul-form">
      <div className="flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <h2 id="judul-form" className="text-xl font-extrabold text-brand-900">
            {edit ? "Edit Berita" : "Tambah Berita"}
          </h2>
          <button type="button" onClick={onClose} aria-label="Tutup" className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <form onSubmit={kirim} noValidate className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
          <Field label="Judul berita" htmlFor="f-judul" error={errors.title}>
            <input id="f-judul" className={input} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Judul berita" />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Tanggal" htmlFor="f-tanggal" error={errors.tanggal}>
              <input id="f-tanggal" type="date" className={input} value={form.tanggal} onChange={(e) => set("tanggal", e.target.value)} />
            </Field>
            <Field label="Kategori" htmlFor="f-kategori" error={errors.category}>
              <input id="f-kategori" list="daftar-kategori" className={input} value={form.category} onChange={(e) => set("category", e.target.value)} />
              <datalist id="daftar-kategori">
                {opsiKategori.map((k) => (
                  <option key={k} value={k} />
                ))}
              </datalist>
            </Field>
          </div>

          <Field label="Gambar" htmlFor="f-gambar" hint="Pilih gambar yang sudah ada di website, atau unggah foto baru (otomatis dikecilkan).">
            <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
              <div className="aspect-[3/2] overflow-hidden rounded-xl bg-brand-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.image} alt="Pratinjau gambar" className="h-full w-full object-cover" />
              </div>
              <div className="space-y-3">
                <select id="f-gambar" className={input} value={form.image} onChange={(e) => set("image", e.target.value)}>
                  {daftarGambar.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <input ref={fileRef} type="file" accept="image/*" onChange={pilihFile} className="hidden" />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="rounded-full border-2 border-brand-600 px-5 py-2 text-sm font-bold text-brand-700 transition hover:bg-brand-600 hover:text-white disabled:opacity-50"
                >
                  {uploading ? "Memproses..." : "Unggah foto"}
                </button>
                {uploadError && <p className="text-xs font-medium text-red-600">{uploadError}</p>}
              </div>
            </div>
          </Field>

          <Field label="Ringkasan" htmlFor="f-ringkasan" error={errors.excerpt} hint={`${form.excerpt.length}/220 karakter. Tampil di kartu berita dan carousel.`}>
            <textarea id="f-ringkasan" rows={3} maxLength={220} className={input} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} placeholder="Ringkasan singkat berita" />
          </Field>

          <Field label="Isi berita" htmlFor="f-isi" error={errors.content} hint="Pisahkan paragraf dengan satu baris kosong. Awali baris dengan “## ” untuk membuat subjudul.">
            <textarea id="f-isi" rows={10} className={`${input} font-mono`} value={form.content} onChange={(e) => set("content", e.target.value)} placeholder="Tulis isi berita di sini" />
          </Field>

          <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5">
            <button type="button" onClick={onClose} className="rounded-full px-6 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100">
              Batal
            </button>
            <button type="submit" className="rounded-full bg-brand-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition duration-200 hover:-translate-y-0.5 hover:bg-brand-700">
              {edit ? "Simpan Perubahan" : "Tambah Berita"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
