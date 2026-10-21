# SMA Islam Annajah – Website Profil Sekolah (UTS Pemrograman Web)

Frontend saja: **Next.js (App Router) + JavaScript + Tailwind CSS v4**.
Tanpa TypeScript, database, API, backend, maupun autentikasi.

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Struktur route

| URL                  | File                          |
| -------------------- | ----------------------------- |
| `/`                  | `src/app/page.js`             |
| `/about`             | `src/app/about/page.js`       |
| `/berita`            | `src/app/berita/page.js`      |
| `/berita/[id]` (1–5) | `src/app/berita/[id]/page.js` |

`Navbar` dan `Footer` dipasang satu kali di `src/app/layout.js`.

## Component

`Navbar`, `Footer`, `Hero`, `BeritaCard`, `NewsCarousel` (auto-slide, client component), `SectionHeading`, `PageHeader`.

## Data

- `src/data/berita.js` – satu sumber data berita (Home, /berita, /berita/[id])
- `src/data/sekolah.js` – profil, visi, misi, fasilitas, ekstrakurikuler, pimpinan, kontak

## Gambar

- `logo.png` adalah logo asli Annajah; `logo-putih.png` adalah logo yang sama dalam warna putih untuk latar gelap.
- Foto asli: `berita1-6.jpg`, `kegiatan.jpg`, `ekstrakurikuler.jpg`, `prestasi.png`.
- `fasilitas-*.jpg` masih berupa ilustrasi; ganti dengan foto asli memakai nama file yang sama bila sudah ada.

## Dashboard Admin

- Login: `/admin/login` (akun demo di `src/data/admin.js`: username `admin`, password `annajah2026`)
- Dashboard: `/admin` — ringkasan data berita
- Kelola Berita: `/admin/berita` — tambah, edit, hapus berita (disimpan di localStorage browser)
- Penjaga login: `src/components/admin/AdminGuard.js`; penyimpanan: `src/lib/storage.js`
