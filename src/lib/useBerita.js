"use client";

import { useCallback, useEffect, useState } from "react";
import { loadBerita, saveBerita, resetBerita } from "@/lib/storage";

// Hook CRUD berita: data dibaca dari & disimpan ke localStorage.
export function useBerita() {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setItems(loadBerita());
    setReady(true);
  }, []);

  const commit = useCallback((next) => {
    const hasil = saveBerita(next);
    if (!hasil.ok) {
      setError(hasil.error);
      return false;
    }
    setError("");
    setItems(next);
    return true;
  }, []);

  const tambah = (data) => {
    const id = items.reduce((m, b) => Math.max(m, Number(b.id) || 0), 0) + 1;
    return commit([{ ...data, id }, ...items]);
  };

  const ubah = (id, data) =>
    commit(items.map((b) => (b.id === id ? { ...b, ...data, id } : b)));

  const hapus = (id) => commit(items.filter((b) => b.id !== id));

  const reset = () => {
    setItems(resetBerita());
    setError("");
  };

  return { items, ready, error, tambah, ubah, hapus, reset };
}
