"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, login } from "@/lib/storage";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lihat, setLihat] = useState(false);
  const [error, setError] = useState("");

  // Sudah login? langsung ke dashboard
  useEffect(() => {
    if (getSession()) router.replace("/admin");
  }, [router]);

  const kirim = (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Username dan password wajib diisi.");
      return;
    }
    if (login(username, password)) {
      router.replace("/admin");
    } else {
      setError("Username atau password salah.");
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Panel brand */}
      <div className="relative isolate hidden overflow-hidden bg-brand-900 lg:block">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600" />
        <div className="flex h-full flex-col justify-between p-14">
          <Image src="/logo-putih.png" alt="Annajah Islamic School Jakarta" width={1080} height={250} priority className="h-14 w-auto self-start" />
          <div>
            <h1 className="text-4xl font-extrabold leading-tight text-white">
              Panel Admin
              <br />
              SMA Islam Annajah
            </h1>
            <p className="mt-4 max-w-md text-brand-100">
              Kelola berita dan informasi sekolah dari satu tempat.
            </p>
          </div>
          <p className="text-sm text-brand-300">© 2026 SMA Islam Annajah</p>
        </div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center bg-sand px-4 py-12">
        <div className="w-full max-w-md">
          <Image src="/logo.png" alt="Annajah Islamic School Jakarta" width={1080} height={250} priority className="mx-auto h-12 w-auto lg:hidden" />

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-brand-900/5 sm:p-10 lg:mt-0">
            <h2 className="text-2xl font-extrabold text-brand-900">Masuk ke Dashboard</h2>
            <p className="mt-2 text-sm text-slate-600">Gunakan akun admin untuk melanjutkan.</p>

            <form onSubmit={kirim} className="mt-8 space-y-5" noValidate>
              <div>
                <label htmlFor="username" className="text-sm font-semibold text-slate-700">Username</label>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(""); }}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-600 focus:ring-4 focus:ring-brand-100"
                  placeholder="Masukkan username"
                />
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</label>
                <div className="relative mt-2">
                  <input
                    id="password"
                    type={lihat ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-4 pr-20 text-sm text-slate-800 outline-none transition focus:border-brand-600 focus:ring-4 focus:ring-brand-100"
                    placeholder="Masukkan password"
                  />
                  <button
                    type="button"
                    onClick={() => setLihat((v) => !v)}
                    className="absolute inset-y-0 right-2 my-auto h-9 rounded-lg px-3 text-xs font-bold text-brand-700 transition hover:bg-brand-50"
                  >
                    {lihat ? "Sembunyikan" : "Tampilkan"}
                  </button>
                </div>
              </div>

              {error && (
                <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-full bg-brand-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition duration-200 hover:-translate-y-0.5 hover:bg-brand-700"
              >
                Masuk
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm">
            <Link href="/" className="font-semibold text-brand-700 hover:text-brand-800">
              ← Kembali ke website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
