"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/berita", label: "Berita" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm shadow-slate-900/5">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6"
        aria-label="Navigasi utama"
      >
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="Logo Annajah Islamic School Jakarta"
            width={1080}
            height={250}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-2 md:flex">
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-200 ${
                  isActive(item.href)
                    ? "bg-brand-600 text-white"
                    : "text-slate-600 hover:bg-brand-50 hover:text-brand-700"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Tombol menu mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-brand-700 transition hover:bg-brand-50 md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        className={`grid overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 md:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] border-transparent opacity-0"
        }`}
      >
        <ul className="min-h-0 space-y-1 px-4 pb-4 pt-3">
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                tabIndex={open ? 0 : -1}
                className={`block rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                  isActive(item.href)
                    ? "bg-brand-600 text-white"
                    : "text-slate-700 hover:bg-brand-50"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
