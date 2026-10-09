import Link from "next/link";

// Banner judul untuk halaman About & Berita
export default function PageHeader({ title, description, crumbs = [] }) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-800">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600" />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <nav aria-label="Breadcrumb" className="soft-fade text-sm text-brand-200">
          <Link href="/" className="transition hover:text-white">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label}>
              <span className="mx-2">/</span>
              {c.href ? (
                <Link href={c.href} className="transition hover:text-white">{c.label}</Link>
              ) : (
                <span className="text-white">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="soft-fade mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="soft-fade mt-4 max-w-2xl text-base leading-relaxed text-brand-100 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
