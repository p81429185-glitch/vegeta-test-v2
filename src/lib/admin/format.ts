// Polish formatting helpers shared across the admin panel.

const THIN_SPACE = "\u202F";

export function formatPL(n: number): string {
  if (!Number.isFinite(n)) return "0";
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(Math.round(n));
  const s = abs.toString();
  let out = "";
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 === 0) out += THIN_SPACE;
    out += s[i];
  }
  return sign + out;
}

export function formatPct(n: number, digits = 1): string {
  return `${n >= 0 ? "" : ""}${n.toFixed(digits)}%`;
}

export function formatDuration(seconds: number): string {
  const s = Math.max(0, Math.round(seconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

export function formatDurationSigned(seconds: number): string {
  const sign = seconds < 0 ? "-" : "+";
  return sign + formatDuration(Math.abs(seconds));
}

export function formatRelativePL(date: Date | number): string {
  const t = typeof date === "number" ? date : date.getTime();
  const diff = Math.max(0, Math.round((Date.now() - t) / 1000));
  if (diff < 5) return "właśnie teraz";
  if (diff < 60) return `${diff}s temu`;
  const m = Math.floor(diff / 60);
  if (m < 60) return `${m} min temu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} h temu`;
  const d = Math.floor(h / 24);
  return `${d} dni temu`;
}

export function formatHourPL(hour: number): string {
  return `${hour.toString().padStart(2, "0")}:00`;
}
