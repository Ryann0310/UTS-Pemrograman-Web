import PageHeader from "@/components/PageHeader";
import BeritaCard from "@/components/BeritaCard";
import { berita } from "@/data/berita";

export const metadata = {
  title: "Berita",
  description: "Berita, acara, dan liputan kegiatan SMA Islam Annajah.",
};

export default function BeritaPage() {
  return (
    <>
      <PageHeader title="Berita & Kegiatan Sekolah" description="Ikuti acara, liputan kegiatan, dan kabar terbaru dari lingkungan Annajah." crumbs={[{ label: "Berita" }]} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="mb-8 text-sm text-slate-500">Menampilkan {berita.length} berita</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {berita.map((item) => (
            <BeritaCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}
