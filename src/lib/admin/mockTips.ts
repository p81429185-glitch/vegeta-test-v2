// Mock tips data
export type TipStatus = "pending" | "won" | "lost" | "void";

export type Tip = {
  id: string;
  date: string;        // ISO
  sport: string;       // Football, Basketball, Tennis...
  league: string;
  match: string;       // "Real Madrid – Barcelona"
  market: string;      // "1X2 — 1"
  pick: string;        // "Real Madrid"
  odds: number;
  stake: number;       // jednostki 1-10
  stakeAmount: number; // zł
  status: TipStatus;
  profit: number;      // zł (po rozliczeniu)
  confidence: 1 | 2 | 3 | 4 | 5;
  note?: string;
};

const SPORTS = ["Piłka nożna", "Koszykówka", "Tenis", "MMA", "Hokej"];
const LEAGUES: Record<string, string[]> = {
  "Piłka nożna": ["La Liga", "Premier League", "Bundesliga", "Serie A", "Ekstraklasa"],
  "Koszykówka": ["NBA", "Euroliga"],
  "Tenis": ["ATP", "WTA"],
  "MMA": ["UFC", "PFL"],
  "Hokej": ["NHL", "KHL"],
};
const MATCHES = [
  "Real Madrid – Barcelona",
  "Man City – Liverpool",
  "Bayern – Dortmund",
  "Juventus – Inter",
  "Legia – Lech",
  "Lakers – Warriors",
  "Celtics – Heat",
  "Djokovic – Alcaraz",
  "Sinner – Medvedev",
  "Adesanya – Pereira",
];
const MARKETS = ["1X2 — 1", "1X2 — 2", "BTTS Tak", "Over 2.5", "Under 2.5", "Handicap -1.5", "Over 220.5"];

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateTips(count: number): Tip[] {
  const rand = mulberry32(42);
  const out: Tip[] = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const sport = SPORTS[Math.floor(rand() * SPORTS.length)];
    const leagues = LEAGUES[sport];
    const league = leagues[Math.floor(rand() * leagues.length)];
    const match = MATCHES[Math.floor(rand() * MATCHES.length)];
    const market = MARKETS[Math.floor(rand() * MARKETS.length)];
    const odds = +(1.4 + rand() * 2.6).toFixed(2);
    const stake = (Math.floor(rand() * 5) + 2) as Tip["stake"];
    const stakeAmount = stake * 50;
    const d = new Date(now);
    d.setDate(d.getDate() - Math.floor(rand() * 90));
    const r = rand();
    let status: TipStatus;
    let profit = 0;
    if (i < 3) {
      status = "pending";
    } else if (r < 0.6) {
      status = "won";
      profit = Math.round(stakeAmount * (odds - 1));
    } else if (r < 0.92) {
      status = "lost";
      profit = -stakeAmount;
    } else {
      status = "void";
    }
    out.push({
      id: `tip_${i + 1000}`,
      date: d.toISOString(),
      sport,
      league,
      match,
      market,
      pick: market.split(" — ")[1] ?? market,
      odds,
      stake,
      stakeAmount,
      status,
      profit,
      confidence: ((Math.floor(rand() * 5) + 1) as Tip["confidence"]),
    });
  }
  return out.sort((a, b) => b.date.localeCompare(a.date));
}

export const mockTips: Tip[] = generateTips(60);
