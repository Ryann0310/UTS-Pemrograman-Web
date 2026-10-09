// Judul section + pembatas ornamen bintang (motif geometris Islami sederhana)
export default function SectionHeading({ title, description, align = "center" }) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <h2 className="text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
        {title}
      </h2>

      <div
        className={`mt-5 flex items-center gap-3 ${center ? "justify-center" : "justify-start"}`}
        aria-hidden="true"
      >
        <span className="h-px w-12 bg-brand-200" />
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="currentColor">
          <path d="M12 1.5l2.6 4.4 5-.9-.9 5 4.3 2.6-4.3 2.6.9 5-5-.9L12 22.5l-2.6-4.4-5 .9.9-5L1 13.1l4.3-2.6-.9-5 5 .9L12 1.5z" />
        </svg>
        <span className="h-px w-12 bg-brand-200" />
      </div>

      {description && (
        <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
