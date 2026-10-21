// Semua akses localStorage dikumpulkan di sini.
import { berita as beritaAwal } from "@/data/berita";
import { adminAccount } from "@/data/admin";

export const KEY_BERITA = "annajah_admin_berita";
export const KEY_SESSION = "annajah_admin_session";

function storage() {
  try {
    return typeof window !== "undefined" && window.localStorage ? window.localStorage : null;
  } catch {
    return null;
  }
}

/* ---------- Berita ---------- */
export function loadBerita() {
  const ls = storage();
  if (!ls) return beritaAwal;
  try {
    const raw = ls.getItem(KEY_BERITA);
    if (!raw) {
      // Pertama kali dibuka: isi dengan data awal dari src/data/berita.js
      ls.setItem(KEY_BERITA, JSON.stringify(beritaAwal));
      return beritaAwal;
    }
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : beritaAwal;
  } catch {
    return beritaAwal;
  }
}

export function saveBerita(list) {
  const ls = storage();
  if (!ls) return { ok: false, error: "localStorage tidak tersedia di browser ini." };
  try {
    ls.setItem(KEY_BERITA, JSON.stringify(list));
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Penyimpanan penuh. Gunakan foto yang lebih kecil atau hapus berita yang tidak dipakai.",
    };
  }
}

export function resetBerita() {
  saveBerita(beritaAwal);
  return beritaAwal;
}

/* ---------- Sesi login ---------- */
export function login(username, password) {
  const ls = storage();
  if (!ls) return false;
  if (username.trim() === adminAccount.username && password === adminAccount.password) {
    ls.setItem(
      KEY_SESSION,
      JSON.stringify({ username: adminAccount.username, nama: adminAccount.nama, waktu: Date.now() })
    );
    return true;
  }
  return false;
}

export function getSession() {
  const ls = storage();
  if (!ls) return null;
  try {
    const raw = ls.getItem(KEY_SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function logout() {
  const ls = storage();
  if (ls) ls.removeItem(KEY_SESSION);
}
