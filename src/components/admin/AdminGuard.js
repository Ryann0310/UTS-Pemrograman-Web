"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSession, logout } from "@/lib/storage";
import AdminShell from "@/components/admin/AdminShell";

// Penjaga halaman admin: tanpa sesi login, pengunjung diarahkan ke /admin/login.
export default function AdminGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const sesi = getSession();
    setUser(sesi);
    setChecked(true);
    if (!isLogin && !sesi) router.replace("/admin/login");
  }, [pathname, isLogin, router]);

  // Halaman login ditampilkan tanpa sidebar
  if (isLogin) return children;

  if (!checked || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sand">
        <p className="text-sm font-medium text-slate-500">Memeriksa sesi login...</p>
      </div>
    );
  }

  const keluar = () => {
    logout();
    router.replace("/admin/login");
  };

  return (
    <AdminShell user={user} onLogout={keluar}>
      {children}
    </AdminShell>
  );
}
