import Image from "next/image";
import Link from "next/link";

export default function BeritaCard({ item }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/10">
      <div className="relative aspect-[3/2] overflow-hidden bg-brand-100">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
          style={{ objectPosition: item.imagePosition }}
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-brand-700 shadow">
          {item.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <time className="text-sm font-medium text-slate-500">{item.date}</time>
        <h3 className="mt-2 text-lg font-bold leading-snug text-brand-900 transition-colors group-hover:text-brand-600">
          {item.title}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
          {item.excerpt}
        </p>
        <Link
          href={`/berita/${item.id}`}
          className="mt-5 inline-flex items-center gap-2 self-start text-sm font-bold text-brand-600 transition-colors hover:text-brand-800"
        >
          Baca Selengkapnya
          <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="currentColor" aria-hidden="true">
            <path d="M10.3 4.3a1 1 0 011.4 0l5 5a1 1 0 010 1.4l-5 5a1 1 0 01-1.4-1.4L13.6 11H4a1 1 0 110-2h9.6l-3.3-3.3a1 1 0 010-1.4z" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
