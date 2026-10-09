"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const INTERVAL = 3500; // ms

export default function NewsCarousel({ items }) {
  const total = items.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  // Autoplay: setiap kali slide berganti (otomatis/manual) timer dimulai ulang.
  useEffect(() => {
    if (paused || total < 2) return;
    const timer = setTimeout(next, INTERVAL);
    return () => clearTimeout(timer);
  }, [index, paused, next, total]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Berita terbaru"
    >
      <div className="overflow-hidden rounded-3xl bg-brand-900 shadow-2xl shadow-brand-900/20">
        {/* Track slide */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((item, i) => (
            <div
              key={item.id}
              className="relative h-[460px] min-w-full sm:h-[500px] lg:h-[540px]"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} dari ${total}`}
              aria-hidden={i !== index}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority={i === 0}
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="object-cover"
                style={{ objectPosition: item.imagePosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/95 via-brand-900/55 to-brand-900/10" />

              <div className="absolute inset-x-0 bottom-0 p-6 pb-14 sm:p-10 sm:pb-16 lg:p-14 lg:pb-16">
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-brand-900">
                    {item.category}
                  </span>
                  <time className="font-medium text-brand-100">{item.date}</time>
                </div>
                <h3 className="mt-4 max-w-3xl text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-relaxed text-brand-100 sm:text-base">
                  {item.excerpt}
                </p>
                <Link
                  href={`/berita/${item.id}`}
                  tabIndex={i === index ? 0 : -1}
                  className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-700 transition duration-200 hover:-translate-y-0.5 hover:bg-brand-50"
                >
                  Baca Selengkapnya
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tombol Previous / Next */}
      <button
        type="button"
        onClick={prev}
        aria-label="Berita sebelumnya"
        className="absolute left-3 top-1/3 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-brand-700 shadow-lg transition hover:scale-105 hover:bg-white sm:left-5 sm:h-12 sm:w-12"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Berita berikutnya"
        className="absolute right-3 top-1/3 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-brand-700 shadow-lg transition hover:scale-105 hover:bg-white sm:right-5 sm:h-12 sm:w-12"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicator dots */}
      <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2 sm:bottom-6" role="tablist" aria-label="Pilih berita">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Tampilkan berita ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-gold" : "w-2.5 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
