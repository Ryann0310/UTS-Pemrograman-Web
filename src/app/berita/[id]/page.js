import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BeritaCard from "@/components/BeritaCard";
import { berita, getBeritaById } from "@/data/berita";

// Satu Dynamic Route untuk semua berita: /berita/1 ... /berita/6
export function generateStaticParams() {
  return berita.map((item) => ({ id: String(item.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = getBeritaById(id);
  return {
    title: item ? item.title : "Berita tidak ditemukan",
    description: item?.excerpt,
  };
}

function Isi({ content }) {
  return content.split("\n\n").map((blok, i) => {
    if (blok.startsWith("## ")) {
      return (
        <h2 key={i} className="mt-10 text-2xl font-bold text-brand-900">
          {blok.replace("## ", "")}
        </h2>
      );
    }
    return (
      <p key={i} className="mt-5 text-base leading-8 text-slate-700 sm:text-lg sm:leading-8">
        {blok}
      </p>
    );
  });
}

export default async function DetailBeritaPage({ params }) {
  const { id } = await params;
  const item = getBeritaById(id);

  if (!item) notFound();

  const lainnya = berita.filter((b) => b.id !== item.id).slice(0, 3);

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 pb-6 pt-10 sm:px-6 sm:pt-14">
        <Link
          href="/berita"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 transition hover:text-brand-800"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M9.7 15.7a1 1 0 01-1.4 0l-5-5a1 1 0 010-1.4l5-5a1 1 0 011.4 1.4L6.4 9H16a1 1 0 110 2H6.4l3.3 3.3a1 1 0 010 1.4z" />
          </svg>
          Kembali ke Berita
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full bg-brand-50 px-3 py-1 font-bold text-brand-700">
            {item.category}
          </span>
          <time className="text-slate-500">{item.date}</time>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-brand-900 sm:text-4xl">
          {item.title}
        </h1>

        <div className="relative mt-8 aspect-[3/2] overflow-hidden rounded-3xl bg-brand-100 shadow-lg">
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            style={{ objectPosition: item.imagePosition }}
          />
        </div>

        <div className="mt-8">
          <Isi content={item.content} />
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8">
          <Link
            href="/berita"
            className="inline-flex rounded-full bg-brand-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition duration-200 hover:-translate-y-0.5 hover:bg-brand-700"
          >
            Kembali ke Berita
          </Link>
        </div>
      </article>

      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-extrabold text-brand-900">Berita lainnya</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lainnya.map((b) => (
            <BeritaCard key={b.id} item={b} />
          ))}
        </div>
      </section>
    </>
  );
}
