import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import { identitas, kontak, sejarah, visi, visiPoin, misi, tujuan, kurikulum, nilaiPendidikan, fasilitasFoto, fasilitasLain, ekstrakurikuler, pimpinan, pengajar } from "@/data/sekolah";

export const metadata = {
  title: "About",
  description: "Profil, sejarah, visi, misi, tujuan, kurikulum, fasilitas, ekstrakurikuler, pimpinan, dan alamat SMA Islam Annajah.",
};

const subMenu = [
  ["profil", "Profil"],
  ["visi", "Visi"],
  ["misi", "Misi"],
  ["tujuan", "Tujuan"],
  ["kurikulum", "Kurikulum"],
  ["nilai", "Nilai"],
  ["fasilitas", "Fasilitas"],
  ["ekstrakurikuler", "Ekstrakurikuler"],
  ["prestasi", "Prestasi"],
  ["pimpinan", "Pimpinan"],
  ["alamat", "Alamat"],
];

function inisial(nama) {
  const kata = nama.replace(/,.*$/, "").split(" ").filter(Boolean);
  return (kata[0][0] + (kata[1] ? kata[1][0] : "")).toUpperCase();
}

function Bullet({ children }) {
  return (
    <li className="flex gap-3">
      <svg viewBox="0 0 20 20" className="mt-1 h-5 w-5 shrink-0 text-brand-600" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" clipRule="evenodd" />
      </svg>
      <span className="leading-relaxed text-slate-700">{children}</span>
    </li>
  );
}

function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`scroll-mt-32 py-16 md:py-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHeader title="Tentang SMA Islam Annajah" description="Mengenal profil, sejarah, visi dan misi, kurikulum, fasilitas, serta tim pengajar Annajah." crumbs={[{ label: "About" }]} />

      {/* Navigasi cepat antar bagian */}
      <nav aria-label="Bagian halaman" className="sticky top-16 z-40 border-b border-slate-200 bg-white/95 backdrop-blur sm:top-20">
        <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 sm:px-6">
          {subMenu.map(([id, label]) => (
            <li key={id} className="shrink-0">
              <Link href={`#${id}`} className="block rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 1-2. Profil & Sejarah */}
      <Section id="profil">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" title="Profil Sekolah" />
            <p className="mt-6 leading-relaxed text-slate-700">
              {identitas.nama} ({identitas.namaEn}) adalah jenjang sekolah menengah atas di bawah naungan Annajah. {identitas.deskripsi}
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-4">
              {[
                ["Nama sekolah", identitas.nama],
                ["Berdiri", identitas.tahunBerdiri],
                ["Lokasi", "Jakarta Selatan"],
                ["Luas lahan", "± 1,3 hektar"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <dt className="text-xs text-slate-500">{k}</dt>
                  <dd className="mt-1 font-bold text-brand-900">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-3xl bg-brand-50 p-8 sm:p-10">
            <h3 className="text-2xl font-extrabold text-brand-900">Sejarah Singkat</h3>
            <p className="mt-5 leading-relaxed text-slate-700">{sejarah}</p>
          </div>
        </div>
      </Section>

      {/* 3. Visi */}
      <section id="visi" className="scroll-mt-32 bg-brand-800 py-16 text-white md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-extrabold sm:text-4xl">Visi</h2>
              <p className="mt-6 text-2xl font-bold leading-snug text-gold sm:text-3xl">{visi}</p>
            </div>
            <div className="lg:col-span-3">
              <p className="text-sm font-semibold text-brand-200">Visi ini diwujudkan dengan:</p>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {visiPoin.map((p) => (
                  <li key={p} className="rounded-2xl bg-white/10 p-5 text-sm leading-relaxed text-brand-50">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Misi */}
      <Section id="misi">
        <SectionHeading title="Misi" description="Langkah yang ditempuh SMA Annajah untuk mewujudkan visinya." />
        <ul className="mx-auto mt-12 max-w-3xl space-y-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          {misi.map((m) => (
            <Bullet key={m}>{m}</Bullet>
          ))}
        </ul>
      </Section>

      {/* 5. Tujuan */}
      <Section id="tujuan" className="bg-sand">
        <SectionHeading title="Tujuan Sekolah" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {tujuan.map((t) => (
            <div key={t} className="rounded-2xl border border-brand-100 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-900/10">
              <p className="text-lg font-semibold leading-snug text-brand-900">{t}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 6. Kurikulum */}
      <Section id="kurikulum">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <SectionHeading align="left" title="Kurikulum" />
            <div className="mt-6 space-y-4 leading-relaxed text-slate-700">
              {kurikulum.paragraf.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-brand-50 p-8">
              <h3 className="text-xl font-extrabold text-brand-900">Keterampilan abad 21 (4C)</h3>
              <ul className="mt-5 space-y-3">
                {kurikulum.empatC.map((c) => (
                  <li key={c.nama} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 font-semibold text-brand-800 shadow-sm">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">C</span>
                    {c.nama}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* 7. Nilai-nilai pendidikan */}
      <Section id="nilai" className="bg-sand">
        <SectionHeading title="Nilai-nilai Pendidikan" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nilaiPendidikan.map((n) => (
            <div key={n.nama} className="rounded-2xl border border-brand-100 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-900/10">
              <h3 className="text-lg font-bold text-brand-700">{n.nama}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{n.deskripsi}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 8. Fasilitas */}
      <Section id="fasilitas">
        <SectionHeading title="Fasilitas" description="Annajah berdiri di atas lahan seluas kurang lebih 1,3 hektar dengan fasilitas yang dirancang untuk mendukung perjalanan pendidikan siswa." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {fasilitasFoto.map((f) => (
            <figure key={f.nama} className="group relative isolate overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3]">
                <Image src={f.image} alt={f.nama} fill sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-transparent to-transparent" />
                <figcaption className="absolute bottom-0 p-5 text-lg font-bold text-white">{f.nama}</figcaption>
              </div>
            </figure>
          ))}
        </div>
        <div className="mt-10">
          <h3 className="text-center text-sm font-semibold text-slate-500">Fasilitas dan layanan lainnya</h3>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {fasilitasLain.map((f) => (
              <li key={f} className="rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-800">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 9. Ekstrakurikuler */}
      <Section id="ekstrakurikuler" className="bg-sand">
        <SectionHeading title="Ekstrakurikuler" description="Kegiatan ekstrakurikuler memiliki waktu khusus dan menjadi komponen penting penilaian akademik maupun non-akademik." />
        <figure className="mx-auto mt-12 max-w-xl">
          <div className="relative aspect-[492/445] overflow-hidden rounded-3xl shadow-lg">
            <Image src="/ekstrakurikuler.jpg" alt="Pertandingan basket Annajah Cup Vol 3 2026" fill sizes="(min-width: 640px) 576px, 100vw" className="object-cover" />
          </div>
          <figcaption className="mt-3 text-center text-sm text-slate-500">Annajah Cup Vol 3 2026 (hari ke-4)</figcaption>
        </figure>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ekstrakurikuler.map((e) => (
            <div key={e.nama} className="rounded-2xl border border-brand-100 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-900/10">
              <p className="text-xs font-medium text-brand-600">{e.kategori}</p>
              <h3 className="mt-1 text-base font-bold text-brand-900">{e.nama}</h3>
            </div>
          ))}
        </div>
      </Section>

      {/* Prestasi */}
      <Section id="prestasi">
        <SectionHeading title="Prestasi" description="Annajah telah menerima berbagai penghargaan, baik tingkat dalam negeri maupun internasional." />
        <div className="mx-auto mt-12 grid max-w-4xl items-center gap-8 md:grid-cols-2">
          <div className="relative mx-auto aspect-[688/808] w-full max-w-sm overflow-hidden rounded-3xl shadow-xl shadow-brand-900/15">
            <Image src="/prestasi.png" alt="Muhammad Fahri Amnas, Juara 2 Olimpiade Bahasa Arab ke-9 tingkat provinsi 2026" fill sizes="(min-width: 768px) 384px, 100vw" className="object-cover" />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-brand-900">Juara 2 Olimpiade Bahasa Arab</h3>
            <p className="mt-4 leading-relaxed text-slate-700">Muhammad Fahri Amnas, siswa kelas XI-1, meraih Juara 2 tingkat provinsi pada Olimpiade Bahasa Arab ke-9 tahun 2026 dan melaju ke tingkat nasional.</p>
          </div>
        </div>
      </Section>

      {/* 10. Pimpinan & Pengajar */}
      <Section id="pimpinan" className="bg-sand">
        <SectionHeading title="Pimpinan & Pengajar" description="Tim profesional yang berdedikasi mencetak pemimpin berkarakter Islami." />

        <h3 className="mt-12 text-xl font-bold text-brand-900">Pimpinan SMA Annajah</h3>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pimpinan.map((p) => (
            <div key={p.nama} className="rounded-2xl border border-slate-200 bg-white p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-900/10">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-xl font-bold text-white">{inisial(p.nama)}</span>
              <h4 className="mt-4 font-bold text-brand-900">{p.nama}</h4>
              <p className="mt-1 text-sm text-slate-600">{p.jabatan}</p>
            </div>
          ))}
        </div>

        <h3 className="mt-14 text-xl font-bold text-brand-900">Pengajar & Staf</h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pengajar.map((p) => (
            <div key={p.nama} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700">{inisial(p.nama)}</span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-brand-900">{p.nama}</p>
                <p className="truncate text-xs text-slate-600">{p.jabatan}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 11. Alamat */}
      <Section id="alamat">
        <SectionHeading title="Alamat Sekolah" />
        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:col-span-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-500">Alamat</h3>
              <p className="mt-1 font-semibold leading-relaxed text-brand-900">{kontak.alamat}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-500">{kontak.teleponKet}</h3>
              <p className="mt-1 font-semibold text-brand-900">{kontak.telepon}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-500">Email</h3>
              <p className="mt-1 font-semibold text-brand-900">{kontak.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-500">Jam operasional</h3>
              <p className="mt-1 font-semibold text-brand-900">{kontak.jam}</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-sm lg:col-span-3">
            <iframe title="Peta lokasi SMA Islam Annajah" src={kontak.peta} className="h-80 w-full border-0 lg:h-full lg:min-h-[360px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </Section>
    </>
  );
}
