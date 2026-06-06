// Mock traffic analytics for /admin/traffic.
// Deterministic — all derived from a single PRNG seed so the dashboard is
// stable between renders. Numbers are tuned to the spec's headline figures.

function mulberry32(seed: number) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Period = "24h" | "7d" | "30d" | "90d" | "12m";

export const PERIODS: { id: Period; label: string }[] = [
  { id: "24h", label: "24h" },
  { id: "7d",  label: "7d"  },
  { id: "30d", label: "30d" },
  { id: "90d", label: "90d" },
  { id: "12m", label: "12m" },
];

// ─── KPI ───────────────────────────────────────────────────────────────────

export type Kpi = {
  id: string;
  label: string;
  value: string;
  rawValue: number;
  delta: string;
  positive: boolean;
  spark: number[];
};

function sparkline(seed: number, points: number, base: number, jitter = 0.25, trend = 0.15) {
  const rand = mulberry32(seed);
  const out: number[] = [];
  for (let i = 0; i < points; i++) {
    const t = i / Math.max(1, points - 1);
    const trendFactor = 1 - trend + trend * t * 2;
    out.push(base * trendFactor * (1 - jitter / 2 + rand() * jitter));
  }
  return out;
}

const KPIS_BY_PERIOD: Record<Period, Kpi[]> = {
  "24h": buildKpis(2147, {
    visits: 1842, uniques: 612, avgTime: 218, bounce: 39.4, perSession: 2.7, conv: 4.4,
    dVisits: 6.2, dUniques: 4.1, dAvgTime: 8, dBounce: -1.2, dPer: 0.1, dConv: 0.2,
  }),
  "7d":  buildKpis(7311, {
    visits: 11247, uniques: 4128, avgTime: 224, bounce: 38.9, perSession: 2.79, conv: 4.5,
    dVisits: 11.3, dUniques: 8.4, dAvgTime: 12, dBounce: -1.6, dPer: 0.2, dConv: 0.5,
  }),
  "30d": buildKpis(30042, {
    visits: 47832, uniques: 12943, avgTime: 227, bounce: 38.2, perSession: 2.84, conv: 4.7,
    dVisits: 18.4, dUniques: 12.1, dAvgTime: 23, dBounce: -2.1, dPer: 0.3, dConv: 0.8,
  }),
  "90d": buildKpis(90015, {
    visits: 132401, uniques: 36218, avgTime: 232, bounce: 39.1, perSession: 2.78, conv: 4.6,
    dVisits: 14.7, dUniques: 9.8, dAvgTime: 14, dBounce: -1.4, dPer: 0.15, dConv: 0.4,
  }),
  "12m": buildKpis(365001, {
    visits: 482910, uniques: 124732, avgTime: 241, bounce: 40.2, perSession: 2.71, conv: 4.4,
    dVisits: 47.2, dUniques: 38.4, dAvgTime: 31, dBounce: -3.7, dPer: 0.42, dConv: 1.2,
  }),
};

type KpiSpec = {
  visits: number; uniques: number; avgTime: number; bounce: number; perSession: number; conv: number;
  dVisits: number; dUniques: number; dAvgTime: number; dBounce: number; dPer: number; dConv: number;
};

function buildKpis(seed: number, s: KpiSpec): Kpi[] {
  return [
    {
      id: "visits",
      label: "Odwiedzin",
      value: "",
      rawValue: s.visits,
      delta: `+${s.dVisits.toFixed(1)}%`,
      positive: true,
      spark: sparkline(seed + 1, 24, s.visits / 30),
    },
    {
      id: "uniques",
      label: "Unikalni",
      value: "",
      rawValue: s.uniques,
      delta: `+${s.dUniques.toFixed(1)}%`,
      positive: true,
      spark: sparkline(seed + 2, 24, s.uniques / 30),
    },
    {
      id: "avgTime",
      label: "Średni czas na stronie",
      value: "",
      rawValue: s.avgTime,
      delta: `+0:${Math.abs(s.dAvgTime).toString().padStart(2, "0")}`,
      positive: s.dAvgTime >= 0,
      spark: sparkline(seed + 3, 24, s.avgTime, 0.18, 0.1),
    },
    {
      id: "bounce",
      label: "Bounce rate",
      value: "",
      rawValue: s.bounce,
      delta: `${s.dBounce.toFixed(1)}% (lepiej)`,
      positive: s.dBounce < 0,
      spark: sparkline(seed + 4, 24, s.bounce, 0.12, -0.1),
    },
    {
      id: "perSession",
      label: "Stron / sesję",
      value: "",
      rawValue: s.perSession,
      delta: `+${s.dPer.toFixed(2)}`,
      positive: true,
      spark: sparkline(seed + 5, 24, s.perSession, 0.15, 0.12),
    },
    {
      id: "conv",
      label: "Konwersja",
      value: "",
      rawValue: s.conv,
      delta: `+${s.dConv.toFixed(1)}%`,
      positive: true,
      spark: sparkline(seed + 6, 24, s.conv, 0.2, 0.18),
    },
  ];
}

export function getKpis(period: Period): Kpi[] {
  return KPIS_BY_PERIOD[period];
}

// ─── Traffic series ────────────────────────────────────────────────────────

export type TrafficMetric = "visits" | "uniques" | "conversions" | "bounce";

export const METRIC_LABELS: Record<TrafficMetric, string> = {
  visits: "Odwiedziny",
  uniques: "Unikalni",
  conversions: "Konwersje",
  bounce: "Bounce rate",
};

export type SeriesPoint = {
  label: string;        // X-axis display ("21:00", "12.05", "Mar")
  ts: number;           // ms timestamp at bucket start
  value: number;
  prev: number;         // value from previous period for comparison
  isPeak?: boolean;
};

const DAY_MS = 86_400_000;

function bucketSpec(period: Period): { count: number; stepMs: number; formatter: (d: Date) => string } {
  switch (period) {
    case "24h":
      return { count: 24, stepMs: 3_600_000, formatter: (d) => `${d.getHours().toString().padStart(2, "0")}:00` };
    case "7d":
      return { count: 7, stepMs: DAY_MS, formatter: (d) => ["Nd","Pon","Wt","Śr","Czw","Pt","Sob"][d.getDay()] };
    case "30d":
      return { count: 30, stepMs: DAY_MS, formatter: (d) => `${d.getDate().toString().padStart(2,"0")}.${(d.getMonth()+1).toString().padStart(2,"0")}` };
    case "90d":
      return { count: 13, stepMs: 7 * DAY_MS, formatter: (d) => `Tydz ${weekOfYear(d)}` };
    case "12m":
      return { count: 12, stepMs: 30 * DAY_MS, formatter: (d) => ["Sty","Lut","Mar","Kwi","Maj","Cze","Lip","Sie","Wrz","Paź","Lis","Gru"][d.getMonth()] };
  }
}

function weekOfYear(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d.getTime() - start.getTime()) / DAY_MS + start.getDay() + 1) / 7);
}

// Hour-of-day weight: peak 18-23 = 40%, 12-14 = 20%, trough 03-06 = 2%.
const HOUR_WEIGHTS = [
  0.6, 0.4, 0.3, 0.2, 0.2, 0.3, // 0-5
  0.5, 0.7, 1.0, 1.1, 1.2, 1.4, // 6-11
  2.1, 2.4, 2.0, 1.4, 1.5, 1.7, // 12-17
  2.6, 3.4, 4.1, 4.6, 3.8, 2.5, // 18-23
];
// Day-of-week weight (Mon=0..Sun=6).
const DOW_WEIGHTS = [0.85, 0.8, 1.0, 1.05, 1.1, 1.35, 1.45];

function hourFactor(d: Date) { return HOUR_WEIGHTS[d.getHours()]; }
function dowFactor(d: Date)  { return DOW_WEIGHTS[(d.getDay() + 6) % 7]; }

export function getTrafficSeries(period: Period, metric: TrafficMetric): SeriesPoint[] {
  const { count, stepMs, formatter } = bucketSpec(period);
  const kpi = KPIS_BY_PERIOD[period];
  const totalForMetric =
    metric === "visits"      ? kpi[0].rawValue :
    metric === "uniques"     ? kpi[1].rawValue :
    metric === "conversions" ? Math.round(kpi[1].rawValue * (kpi[5].rawValue / 100)) :
    /* bounce */               kpi[3].rawValue;

  const rand = mulberry32(7777 + metric.length * 31 + period.length);
  const now = Date.now();
  const start = now - count * stepMs;

  // Build raw weights per bucket.
  const weights: number[] = [];
  for (let i = 0; i < count; i++) {
    const t = start + i * stepMs;
    const d = new Date(t);
    let w = 1;
    if (period === "24h") w = hourFactor(d);
    else                  w = dowFactor(d) * (1 + (rand() - 0.5) * 0.25);
    w *= 1 - 0.18 + rand() * 0.36; // noise
    weights.push(w);
  }
  const wSum = weights.reduce((a, b) => a + b, 0);

  const points: SeriesPoint[] = [];
  let max = -Infinity;
  let peakIdx = 0;
  for (let i = 0; i < count; i++) {
    const t = start + i * stepMs;
    const d = new Date(t);
    let value: number;
    if (metric === "bounce") {
      value = totalForMetric + (rand() - 0.5) * 6; // jitter around bounce%
    } else {
      value = Math.round((weights[i] / wSum) * totalForMetric);
    }
    const prev = metric === "bounce"
      ? value + 1.5 + (rand() - 0.5) * 3
      : Math.round(value * (0.82 + rand() * 0.15));
    if (value > max) { max = value; peakIdx = i; }
    points.push({ label: formatter(d), ts: t, value, prev });
  }
  if (metric !== "bounce") points[peakIdx].isPeak = true;
  return points;
}

// ─── Heatmap 7×24 ──────────────────────────────────────────────────────────

export const DAYS_PL = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"];

export type HeatmapCell = { day: number; hour: number; value: number };

export type HeatmapData = {
  cells: HeatmapCell[];
  max: number;
  peakDay: string;
  peakHour: string;
  worstSlot: string;
};

let HEATMAP_CACHE: HeatmapData | null = null;
export function getHeatmap(): HeatmapData {
  if (HEATMAP_CACHE) return HEATMAP_CACHE;
  const rand = mulberry32(424242);
  const cells: HeatmapCell[] = [];
  let max = 0;
  let peakValue = 0;
  let peakDay = 6, peakHour = 21;
  let worstValue = Infinity;
  let worstDay = 1, worstHour = 6;

  for (let d = 0; d < 7; d++) {
    for (let h = 0; h < 24; h++) {
      const base = HOUR_WEIGHTS[h] * DOW_WEIGHTS[d] * 120;
      const value = Math.max(2, Math.round(base * (0.8 + rand() * 0.4)));
      cells.push({ day: d, hour: h, value });
      if (value > max) max = value;
      if (value > peakValue) { peakValue = value; peakDay = d; peakHour = h; }
      if (value < worstValue) { worstValue = value; worstDay = d; worstHour = h; }
    }
  }
  HEATMAP_CACHE = {
    cells, max,
    peakDay: ["Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota","Niedziela"][peakDay],
    peakHour: `${peakHour.toString().padStart(2,"0")}:00`,
    worstSlot: `${["Pon","Wt","Śr","Czw","Pt","Sob","Nd"][worstDay]} ${worstHour.toString().padStart(2,"0")}:00`,
  };
  return HEATMAP_CACHE;
}

// ─── Top pages ─────────────────────────────────────────────────────────────

export type TopPage = {
  path: string;
  title: string;
  views: number;
  uniques: number;
  avgTime: number;
  bounce: number;
};

export const TOP_PAGES: TopPage[] = [
  { path: "/",          title: "Strona główna", views: 18432, uniques: 6821, avgTime: 252, bounce: 28.4 },
  { path: "/pricing",   title: "Cennik",        views: 8947,  uniques: 4102, avgTime: 218, bounce: 22.1 },
  { path: "/history",   title: "Historia",      views: 6234,  uniques: 2891, avgTime: 347, bounce: 18.3 },
  { path: "/about",     title: "O mnie",        views: 4102,  uniques: 2134, avgTime: 171, bounce: 41.2 },
  { path: "/login",     title: "Logowanie",     views: 3821,  uniques: 1982, avgTime: 83,  bounce: 8.7  },
  { path: "/register",  title: "Rejestracja",   views: 2947,  uniques: 1743, avgTime: 138, bounce: 12.4 },
  { path: "/faq",       title: "FAQ",           views: 1832,  uniques: 1102, avgTime: 182, bounce: 38.9 },
  { path: "/dashboard", title: "Dashboard",     views: 1521,  uniques: 982,  avgTime: 393, bounce: 4.2  },
];

// ─── Top clicks ────────────────────────────────────────────────────────────

export type TopClick = {
  elementId: string;
  label: string;
  clicks: number;
  conversion: number;
};

export const TOP_CLICKS: TopClick[] = [
  { elementId: "hero-cta-primary",         label: "Odbierz dzisiejsze typy",        clicks: 3842, conversion: 7.4 },
  { elementId: "navbar-join",              label: "Dołącz teraz",                   clicks: 2631, conversion: 5.8 },
  { elementId: "pricing-elite-buy",        label: "Wybieram Elite",                 clicks: 1947, conversion: 18.2 },
  { elementId: "pricing-saiyan-buy",       label: "Wybieram Saiyan",                clicks: 1432, conversion: 12.1 },
  { elementId: "about-cta-stats",          label: "Sprawdź mnie na statystykach",   clicks: 1203, conversion: 3.2 },
  { elementId: "hero-cta-secondary",       label: "Zobacz statystyki na żywo",      clicks: 1102, conversion: 4.1 },
  { elementId: "history-cta-all",          label: "Zobacz wszystkie typy z historii", clicks: 947, conversion: 2.8 },
  { elementId: "pricing-super-saiyan-buy", label: "Wybieram Super Saiyan",          clicks: 821,  conversion: 9.4 },
  { elementId: "navbar-login",             label: "Zaloguj się",                    clicks: 632,  conversion: 24.1 },
];

// ─── Funnel ────────────────────────────────────────────────────────────────

export type FunnelStage = {
  label: string;
  count: number;
  pctOfTotal: number;
  pctFromPrev: number;
  dropoff: number;
};

export function getFunnel(): FunnelStage[] {
  const stages = [
    { label: "Odwiedzili stronę",           count: 12943 },
    { label: "Doszli do cennika",           count: 4102  },
    { label: "Kliknęli „Wybieram plan”",    count: 1947  },
    { label: "Założyli konto",              count: 743   },
    { label: "Opłacili subskrypcję",        count: 612   },
  ];
  const total = stages[0].count;
  return stages.map((s, i) => ({
    label: s.label,
    count: s.count,
    pctOfTotal: (s.count / total) * 100,
    pctFromPrev: i === 0 ? 100 : (s.count / stages[i - 1].count) * 100,
    dropoff: i === 0 ? 0 : stages[i - 1].count - s.count,
  }));
}

// ─── Sources / referrers ───────────────────────────────────────────────────

export type Source = { name: string; pct: number; count: number; color: string };
export type Referrer = { domain: string; count: number };

const TOTAL_UNIQUES_30D = 12943;

export function getSources(): { sources: Source[]; referrers: Referrer[] } {
  const sources: Source[] = [
    { name: "Direct",   pct: 38.4, count: Math.round(TOTAL_UNIQUES_30D * 0.384), color: "var(--color-saiyan-blue)" },
    { name: "Social",   pct: 24.7, count: Math.round(TOTAL_UNIQUES_30D * 0.247), color: "var(--color-energy-yellow)" },
    { name: "Search",   pct: 21.3, count: Math.round(TOTAL_UNIQUES_30D * 0.213), color: "var(--color-win-green)" },
    { name: "Referral", pct: 9.8,  count: Math.round(TOTAL_UNIQUES_30D * 0.098), color: "#94a3b8" },
    { name: "Email",    pct: 5.8,  count: Math.round(TOTAL_UNIQUES_30D * 0.058), color: "var(--color-loss-red)" },
  ];
  const referrers: Referrer[] = [
    { domain: "google.pl",      count: 2247 },
    { domain: "instagram.com",  count: 1834 },
    { domain: "telegram.org",   count: 1142 },
    { domain: "facebook.com",   count: 873  },
    { domain: "tiktok.com",     count: 642  },
  ];
  return { sources, referrers };
}

// ─── Devices ───────────────────────────────────────────────────────────────

export type DeviceRow = { name: string; pct: number; count: number };
export type BrowserRow = { name: string; pct: number };

export function getDevices(): { devices: DeviceRow[]; browsers: BrowserRow[] } {
  return {
    devices: [
      { name: "Mobile",  pct: 68.4, count: 4521 },
      { name: "Desktop", pct: 26.1, count: 1723 },
      { name: "Tablet",  pct: 5.5,  count: 361 },
    ],
    browsers: [
      { name: "Chrome",  pct: 62 },
      { name: "Safari",  pct: 24 },
      { name: "Firefox", pct: 8 },
      { name: "Edge",    pct: 4 },
      { name: "Inne",    pct: 2 },
    ],
  };
}

// ─── Geography ─────────────────────────────────────────────────────────────

export type Country = { flag: string; name: string; count: number; pct: number };
export type CityRow = { name: string; count: number };

export function getGeo(): { countries: Country[]; plCities: CityRow[] } {
  const countries: Country[] = [
    { flag: "🇵🇱", name: "Polska",            count: 11432, pct: 88.3 },
    { flag: "🇬🇧", name: "Wielka Brytania",   count: 521,   pct: 4.0  },
    { flag: "🇩🇪", name: "Niemcy",            count: 412,   pct: 3.2  },
    { flag: "🇳🇱", name: "Holandia",          count: 203,   pct: 1.6  },
    { flag: "🇮🇪", name: "Irlandia",          count: 187,   pct: 1.4  },
    { flag: "🇺🇸", name: "USA",               count: 92,    pct: 0.7  },
    { flag: "🌍", name: "Inne",              count: 96,    pct: 0.8  },
  ];
  const plCities: CityRow[] = [
    { name: "Warszawa", count: 3102 },
    { name: "Kraków",   count: 1847 },
    { name: "Poznań",   count: 1203 },
    { name: "Wrocław",  count: 1102 },
    { name: "Gdańsk",   count: 947  },
    { name: "Łódź",     count: 632  },
    { name: "Katowice", count: 521  },
    { name: "Inne",     count: 1878 },
  ];
  return { countries, plCities };
}

// ─── Live now + Live feed ──────────────────────────────────────────────────

export function getLiveNow(): number {
  // Pseudo-stable count derived from the current minute.
  const minute = Math.floor(Date.now() / 60_000);
  const rand = mulberry32(minute);
  return 42 + Math.floor(rand() * 28); // 42..69
}

export type LiveEvent = {
  id: string;
  kind: "session" | "click" | "pageview" | "conversion" | "end";
  icon: string;
  text: string;
  ts: number;
};

const EVENT_TEMPLATES: ((rand: () => number) => Omit<LiveEvent, "id" | "ts">)[] = [
  (r) => {
    const cities = [
      ["🇵🇱", "Warszawa"], ["🇵🇱", "Kraków"], ["🇵🇱", "Wrocław"], ["🇵🇱", "Gdańsk"],
      ["🇬🇧", "Londyn"], ["🇩🇪", "Berlin"], ["🇳🇱", "Amsterdam"],
    ];
    const devices = ["Mobile, Chrome", "Mobile, Safari", "Desktop, Chrome", "Desktop, Firefox"];
    const [flag, city] = cities[Math.floor(r() * cities.length)];
    const dev = devices[Math.floor(r() * devices.length)];
    return { kind: "session", icon: "👁️", text: `Nowa sesja z ${flag} ${city} (${dev})` };
  },
  (r) => {
    const ctas = [
      ["Wybieram Elite", "/pricing"],
      ["Wybieram Saiyan", "/pricing"],
      ["Odbierz dzisiejsze typy", "/"],
      ["Dołącz teraz", "/"],
      ["Sprawdź mnie na statystykach", "/about"],
    ];
    const [label, path] = ctas[Math.floor(r() * ctas.length)];
    return { kind: "click", icon: "🖱️", text: `Kliknięcie „${label}” na ${path}` };
  },
  (r) => {
    const paths = ["/history", "/pricing", "/about", "/faq", "/"];
    const users = ["user_kamil_88", "user_marek_24", "anonim", "user_anna_91", "user_piotr_07"];
    const path = paths[Math.floor(r() * paths.length)];
    const user = users[Math.floor(r() * users.length)];
    return { kind: "pageview", icon: "📄", text: `Wyświetlenie ${path} (${user})` };
  },
  (r) => {
    const cities = [["🇵🇱", "Warszawa"], ["🇵🇱", "Kraków"], ["🇵🇱", "Poznań"], ["🇵🇱", "Wrocław"]];
    const plans = ["Saiyan", "Elite", "Super Saiyan"];
    const [flag, city] = cities[Math.floor(r() * cities.length)];
    const plan = plans[Math.floor(r() * plans.length)];
    return { kind: "conversion", icon: "🎯", text: `Konwersja: nowy subskrybent ${plan} z ${flag} ${city}` };
  },
  (r) => {
    const dur = 60 + Math.floor(r() * 540);
    const pages = 2 + Math.floor(r() * 8);
    const m = Math.floor(dur / 60);
    const s = (dur % 60).toString().padStart(2, "0");
    return { kind: "end", icon: "👋", text: `Sesja zakończona, czas: ${m}:${s}, ${pages} stron` };
  },
];

function makeEvent(seed: number, ageSeconds: number): LiveEvent {
  const rand = mulberry32(seed);
  const tmpl = EVENT_TEMPLATES[Math.floor(rand() * EVENT_TEMPLATES.length)];
  // Conversions/sessions are rarer — bias toward clicks/pageviews on average.
  // Already random via template index; that's fine for the mock.
  const evt = tmpl(rand);
  return {
    id: `ev-${seed}`,
    ts: Date.now() - ageSeconds * 1000,
    ...evt,
  };
}

export function getInitialFeed(): LiveEvent[] {
  const out: LiveEvent[] = [];
  let age = 0;
  for (let i = 0; i < 18; i++) {
    age += 8 + Math.floor(mulberry32(i * 7 + 1)() * 30);
    out.push(makeEvent(1000 + i, age));
  }
  return out;
}

let LIVE_COUNTER = 50_000;
export function pollLiveEvents(): LiveEvent[] {
  const n = 1 + Math.floor(mulberry32(Date.now() & 0xffff)() * 2); // 1-2 new events
  const out: LiveEvent[] = [];
  for (let i = 0; i < n; i++) {
    LIVE_COUNTER += 1;
    out.push(makeEvent(LIVE_COUNTER, i));
  }
  return out;
}
