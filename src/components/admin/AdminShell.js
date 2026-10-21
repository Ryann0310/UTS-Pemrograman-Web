"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Ikon = {
  dashboard: (
    <path d="M4 13h6V4H4v9zm0 7h6v-5H4v5zm10 0h6V11h-6v9zm0-16v5h6V4h-6z" />
  ),
  berita: (
    <path d="M5 4h11a2 2 0 012 2v12a2 2 0 01-2 2H7a3 3 0 01-3-3V5a1 1 0 011-1zm2 4v2h8V8H7zm0 4v2h8v-2H7zm0 4v2h5v-2H7z" />
  ),
  web: (
    <path d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" />
  ),
  keluar: (
    <path d="M10 3H5a2 2 0 00-2 2v14a2 2 0 002 2h5v-2H5V5h5V3zm6.600 4.600L15.200 9l2 2H9v2h8.200l-2 2 1.400 1.400L21 12l-4.400-4.400z" />
  ),
};

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden="true">
      {Ikon[name]}
    </svg>
  );
}

const menu = [
  { href: "/admin", label: "Dashboard", icon: "dashboard", exact: true },
  { href: "/admin/berita", label: "Kelola Berita", icon: "berita" },
];

export default function AdminShell({ user, onLogout, children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const aktif = (m) => (m.exact ? pathname === m.href : pathname.startsWith(m.href));

  return (
    <div className="min-h-screen bg-sand">
      {/* Top bar (mobile) */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white px-4 shadow-sm lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Buka menu"
          className="flex h-11 w-11 items-center justify-center rounded-xl text-brand-700 hover:bg-brand-50"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        <Image src="/logo.png" alt="Annajah" width={1080} height={250} className="h-9 w-auto" />
        <span className="w-11" />
      </header>

      {/* Overlay mobile */}
      {open && (
        <button
          type="button"
          aria-label="Tutup menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-brand-900 text-brand-100 transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 pb-6 pt-7">
          <Image src="/logo-putih.png" alt="Annajah Islamic School Jakarta" width={1080} height={250} className="h-11 w-auto" />
          <p className="mt-3 text-xs font-semibold text-brand-300">Panel Admin</p>
        </div>

        <nav className="flex-1 space-y-1 px-3" aria-label="Menu admin">
          {menu.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              onClick={() => setOpen(false)}
              aria-current={aktif(m) ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                aktif(m) ? "bg-white text-brand-700" : "text-brand-100 hover:bg-white/10"
              }`}
            >
              <Icon name={m.icon} />
              {m.label}
            </Link>
          ))}
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-brand-100 transition-colors hover:bg-white/10"
          >
            <Icon name="web" />
            Lihat Website
          </Link>
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 px-2 pb-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-sm font-bold text-brand-900">
              {user.nama?.[0] ?? "A"}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">{user.nama}</p>
              <p className="truncate text-xs text-brand-300">@{user.username}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <Icon name="keluar" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Konten */}
      <div className="lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-10">{children}</div>
      </div>
    </div>
  );
}
