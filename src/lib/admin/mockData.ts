// Mock data for the admin panel (no backend yet).

export type Kpi = {
  id: string;
  label: string;
  value: string;
  delta: number; // percentage points or %
  deltaLabel: string;
  trend: "up" | "down";
};

export const kpis: Kpi[] = [
  {
    id: "subs",
    label: "Aktywni subskrybenci",
    value: "247",
    delta: 5.1,
    deltaLabel: "+12 w tym miesiącu",
    trend: "up",
  },
  {
    id: "roi",
    label: "ROI (bieżący miesiąc)",
    value: "+18,4%",
    delta: 3.2,
    deltaLabel: "+3,2 pp vs poprzedni",
    trend: "up",
  },
  {
    id: "winrate",
    label: "Win rate (30 dni)",
    value: "64%",
    delta: -1.5,
    deltaLabel: "-1,5 pp vs poprzedni",
    trend: "down",
  },
  {
    id: "mrr",
    label: "Przychód MRR",
    value: "74 950 zł",
    delta: 8.0,
    deltaLabel: "+8% mies/mies",
    trend: "up",
  },
];

export type ProfitPoint = { date: string; profit: number };

function buildSeries(days: number, seed = 1): ProfitPoint[] {
  const out: ProfitPoint[] = [];
  let cum = 0;
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const start = new Date();
  start.setDate(start.getDate() - days);
  for (let i = 0; i <= days; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const drift = (rand() - 0.42) * 280;
    cum += drift;
    out.push({
      date: d.toISOString().slice(0, 10),
      profit: Math.round(cum),
    });
  }
  return out;
}

export const profitSeries = {
  d30: buildSeries(30, 7),
  d90: buildSeries(90, 13),
  d365: buildSeries(365, 23),
};

export type ActivityItem = {
  id: string;
  time: string;
  type: "tip" | "sub" | "payment" | "msg";
  text: string;
  amount?: string;
  positive?: boolean;
};

export const recentActivity: ActivityItem[] = [
  { id: "1", time: "12 min temu", type: "tip", text: "Dodano typ: Real Madrid – Barcelona  1X @ 1.85", amount: "+220 zł", positive: true },
  { id: "2", time: "38 min temu", type: "sub", text: "Nowy subskrybent: kacper.w@gmail.com (GOLD VEGETA 30d)" },
  { id: "3", time: "1 godz temu", type: "payment", text: "Płatność zaksięgowana — GOLD VEGETA 30d 259 zł", amount: "+259 zł", positive: true },
  { id: "4", time: "2 godz temu", type: "tip", text: "Rozliczono: Bayern – Dortmund BTTS — przegrana", amount: "-150 zł", positive: false },
  { id: "5", time: "4 godz temu", type: "msg", text: "Nowa wiadomość od subskrybenta @adam12" },
  { id: "6", time: "wczoraj", type: "tip", text: "Dodano typ: Lakers – Warriors Over 220.5 @ 1.92", amount: "+180 zł", positive: true },
];

export type MarketRow = {
  market: string;
  picks: number;
  winRate: number;
  roi: number;
};

export const topMarkets: MarketRow[] = [
  { market: "1X2 — faworyt",   picks: 128, winRate: 68, roi: 21.4 },
  { market: "BTTS — Tak",      picks: 94,  winRate: 61, roi: 14.2 },
  { market: "Over 2.5",        picks: 81,  winRate: 57, roi: 11.8 },
  { market: "Handicap azjat.", picks: 46,  winRate: 65, roi: 18.9 },
  { market: "Over 220.5 NBA",  picks: 38,  winRate: 71, roi: 26.1 },
];
