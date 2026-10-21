"use client";

import { usePathname } from "next/navigation";

// Menyembunyikan Navbar/Footer website publik di halaman /admin.
export default function HideOnAdmin({ children }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return children;
}
