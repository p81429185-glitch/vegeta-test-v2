import { mockTips } from "./mockTips";

// Aggregations derived from mockTips for the Stats page.

export type MonthlyPoint = {
  month: string;
  profit: number;
  roi: number;
  picks: number;
};

function monthKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function getMonthlyPerformance(): MonthlyPoint[] {
  const byMonth = new Map<string, { profit: number; staked: number; picks: number }>();
  for (const t of mockTips) {
    const k = monthKey(new Date(t.date));
    const cur = byMonth.get(k) ?? { profit: 0, staked: 0, picks: 0 };
    cur.profit += t.profit;
    cur.staked += t.stakeAmount;
    cur.picks += 1;
    byMonth.set(k, cur);
  }
  return Array.from(byMonth.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, v]) => ({
      month: month.slice(5) + "." + month.slice(2, 4),
      profit: v.profit,
      roi: v.staked > 0 ? +((v.profit / v.staked) * 100).toFixed(1) : 0,
      picks: v.picks,
    }));
}

export type SportPerf = { sport: string; winRate: number; roi: number; picks: number };

export function getBySport(): SportPerf[] {
  const map = new Map<string, { wins: number; settled: number; profit: number; staked: number; picks: number }>();
  for (const t of mockTips) {
    const cur = map.get(t.sport) ?? { wins: 0, settled: 0, profit: 0, staked: 0, picks: 0 };
    cur.picks += 1;
    cur.profit += t.profit;
    cur.staked += t.stakeAmount;
    if (t.status === "won" || t.status === "lost") {
      cur.settled += 1;
      if (t.status === "won") cur.wins += 1;
    }
    map.set(t.sport, cur);
  }
  return Array.from(map.entries())
    .map(([sport, v]) => ({
      sport,
      winRate: v.settled > 0 ? Math.round((v.wins / v.settled) * 100) : 0,
      roi: v.staked > 0 ? +((v.profit / v.staked) * 100).toFixed(1) : 0,
      picks: v.picks,
    }))
    .sort((a, b) => b.picks - a.picks);
}

export type OddsBucket = { bucket: string; picks: number; winRate: number };

export function getByOddsBucket(): OddsBucket[] {
  const buckets = [
    { label: "1.40–1.70", min: 1.4, max: 1.7 },
    { label: "1.70–2.00", min: 1.7, max: 2.0 },
    { label: "2.00–2.50", min: 2.0, max: 2.5 },
    { label: "2.50–3.00", min: 2.5, max: 3.0 },
    { label: "3.00+",     min: 3.0, max: Infinity },
  ];
  return buckets.map((b) => {
    const inB = mockTips.filter((t) => t.odds >= b.min && t.odds < b.max);
    const settled = inB.filter((t) => t.status === "won" || t.status === "lost");
    const wins = settled.filter((t) => t.status === "won").length;
    return {
      bucket: b.label,
      picks: inB.length,
      winRate: settled.length > 0 ? Math.round((wins / settled.length) * 100) : 0,
    };
  });
}

export type StatusDist = { name: string; value: number; color: string };

export function getStatusDistribution(): StatusDist[] {
  const counts = { won: 0, lost: 0, pending: 0, void: 0 };
  for (const t of mockTips) counts[t.status] += 1;
  return [
    { name: "Wygrane",   value: counts.won,     color: "#00D26A" },
    { name: "Przegrane", value: counts.lost,    color: "#FF3B30" },
    { name: "Oczekujące", value: counts.pending, color: "#FFD60A" },
    { name: "Anulowane", value: counts.void,    color: "#F5F7FF40" },
  ];
}
