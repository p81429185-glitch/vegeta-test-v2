import { PLANS, type PlanId } from "@/lib/plans";

export type SubPlan = PlanId;
export type SubStatus = "active" | "trial" | "canceled" | "expired";

export type Subscriber = {
  id: string;
  name: string;
  email: string;
  avatar: string;     // initials color seed
  plan: SubPlan;
  status: SubStatus;
  joinedAt: string;   // ISO
  renewsAt: string;   // ISO
  ltv: number;        // zł
  mrr: number;        // zł / mies (znormalizowany do miesiąca dla planów 60d)
  country: string;
  lastActive: string;
  notes?: string;
};

const FIRST = ["Kacper", "Adam", "Michał", "Tomasz", "Jakub", "Patryk", "Bartek", "Krzysztof", "Marcin", "Damian", "Filip", "Wojtek", "Piotr", "Łukasz", "Mateusz"];
const LAST  = ["Nowak", "Kowalski", "Wiśniewski", "Wójcik", "Kowalczyk", "Kamiński", "Lewandowski", "Zieliński", "Szymański", "Woźniak", "Dąbrowski", "Kozłowski"];
const COUNTRIES = ["PL", "DE", "UK", "NL", "IE"];

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

function pickPlan(r: number): SubPlan {
  // gold-30 55%, gold-60 30%, ultravip 15% (capped at slot limit later)
  if (r < 0.55) return "gold-30";
  if (r < 0.85) return "gold-60";
  return "ultravip";
}

function gen(count: number): Subscriber[] {
  const rand = mulberry32(99);
  const out: Subscriber[] = [];
  const now = new Date();
  let ultravipActive = 0;
  for (let i = 0; i < count; i++) {
    const f = FIRST[Math.floor(rand() * FIRST.length)];
    const l = LAST[Math.floor(rand() * LAST.length)];
    let plan = pickPlan(rand());
    // Respect ULTRAVIP 30-seat cap among active accounts.
    if (plan === "ultravip" && ultravipActive >= 7) plan = "gold-30";
    if (plan === "ultravip") ultravipActive++;

    const sr = rand();
    const status: SubStatus = sr < 0.78 ? "active" : sr < 0.86 ? "trial" : sr < 0.94 ? "canceled" : "expired";
    const joined = new Date(now);
    joined.setDate(joined.getDate() - Math.floor(rand() * 540));
    const renews = new Date(now);
    renews.setDate(renews.getDate() + Math.floor(rand() * 30) - 5);
    const monthsActive = Math.max(1, Math.floor((now.getTime() - joined.getTime()) / (1000 * 60 * 60 * 24 * 30)));
    const lastActive = new Date(now);
    lastActive.setHours(lastActive.getHours() - Math.floor(rand() * 240));

    const monthly = PLANS[plan].monthlyValue;
    const ltv = Math.round(monthly * monthsActive);
    const mrr = status === "active" ? Math.round(monthly) : 0;

    out.push({
      id: `sub_${1000 + i}`,
      name: `${f} ${l}`,
      email: `${f.toLowerCase()}.${l.toLowerCase()}@gmail.com`,
      avatar: f[0] + l[0],
      plan,
      status,
      joinedAt: joined.toISOString(),
      renewsAt: renews.toISOString(),
      ltv,
      mrr,
      country: COUNTRIES[Math.floor(rand() * COUNTRIES.length)],
      lastActive: lastActive.toISOString(),
    });
  }
  return out.sort((a, b) => b.joinedAt.localeCompare(a.joinedAt));
}

export const mockSubscribers: Subscriber[] = gen(48);
