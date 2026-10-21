const BULAN = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

// "2026-02-03" -> "3 Februari 2026"
export function toIndo(iso) {
  const [y, m, d] = (iso || "").split("-");
  if (!y || !m || !d) return "";
  return `${Number(d)} ${BULAN[Number(m) - 1]} ${y}`;
}

// "3 Februari 2026" -> "2026-02-03" (untuk <input type="date">)
export function toIso(teks) {
  const m = /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/.exec((teks || "").trim());
  if (!m) return "";
  const i = BULAN.findIndex((b) => b.toLowerCase() === m[2].toLowerCase());
  if (i < 0) return "";
  return `${m[3]}-${String(i + 1).padStart(2, "0")}-${m[1].padStart(2, "0")}`;
}

export function todayIso() {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
