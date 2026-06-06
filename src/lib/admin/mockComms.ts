import { PLANS, type PlanId } from "@/lib/plans";

export type Message = {
  id: string;
  from: string;
  email: string;
  avatar: string;
  preview: string;
  body: string;
  time: string;
  unread: boolean;
};

export const mockMessages: Message[] = [
  {
    id: "m1",
    from: "Adam Nowak",
    email: "adam.nowak@gmail.com",
    avatar: "AN",
    preview: "Cześć, kiedy będzie typ na dzisiejszy mecz Realu?",
    body: "Cześć Vegeta!\n\nKiedy planujesz wrzucić typ na dzisiejszy mecz Realu z Barceloną? Czekam z niecierpliwością. Pozdrawiam!",
    time: "8 min temu",
    unread: true,
  },
  {
    id: "m2",
    from: "Kacper Wójcik",
    email: "kacper.w@gmail.com",
    avatar: "KW",
    preview: "Mam pytanie odnośnie pakietu ULTRAVIP — czy obejmuje też...",
    body: "Hej!\n\nZastanawiam się nad upgradem do ULTRAVIP. Czy obejmuje on również typy na sporty wirtualne i Live? Daj znać.",
    time: "42 min temu",
    unread: true,
  },
  {
    id: "m3",
    from: "Michał Lewandowski",
    email: "m.lewandowski@gmail.com",
    avatar: "ML",
    preview: "Dzięki za świetny miesiąc! ROI +24%, biorę GOLD 60d.",
    body: "Vegeta, jesteś legenda. Najlepszy miesiąc odkąd zacząłem grać. Przedłużam — tym razem GOLD VEGETA 60 dni!",
    time: "2 godz temu",
    unread: false,
  },
  {
    id: "m4",
    from: "Patryk Kamiński",
    email: "patryk.k@gmail.com",
    avatar: "PK",
    preview: "Faktura za listopad — czy mogę dostać NIP firmy?",
    body: "Cześć, potrzebuję faktury VAT za listopad z moim NIP-em firmy: 1234567890. Dzięki!",
    time: "wczoraj",
    unread: false,
  },
  {
    id: "m5",
    from: "Tomasz Kowalczyk",
    email: "tomasz.k@gmail.com",
    avatar: "TK",
    preview: "Anulowałem subskrypcję — informacja zwrotna",
    body: "Anulowałem subskrypcję, ale chciałem dać znać że typy były super. Wracam za miesiąc gdy dostanę wypłatę.",
    time: "3 dni temu",
    unread: false,
  },
];

export type Payment = {
  id: string;
  date: string;
  customer: string;
  email: string;
  plan: PlanId;
  amount: number;
  status: "paid" | "pending" | "failed" | "refunded";
  method: "Card" | "BLIK" | "Przelewy24";
};

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

const NAMES = [
  ["Kacper", "Wójcik", "KW"],
  ["Adam", "Nowak", "AN"],
  ["Michał", "Lewandowski", "ML"],
  ["Tomasz", "Kowalczyk", "TK"],
  ["Patryk", "Kamiński", "PK"],
  ["Jakub", "Zieliński", "JZ"],
  ["Bartek", "Szymański", "BS"],
  ["Damian", "Woźniak", "DW"],
  ["Filip", "Dąbrowski", "FD"],
  ["Wojtek", "Kozłowski", "WK"],
];

const METHODS: Payment["method"][] = ["Card", "BLIK", "Przelewy24"];

function pickPlan(r: number): PlanId {
  if (r < 0.55) return "gold-30";
  if (r < 0.85) return "gold-60";
  return "ultravip";
}

function genPayments(count: number): Payment[] {
  const rand = mulberry32(7);
  const out: Payment[] = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const [f, l] = NAMES[Math.floor(rand() * NAMES.length)];
    const plan = pickPlan(rand());
    const sr = rand();
    const status: Payment["status"] =
      sr < 0.82 ? "paid" : sr < 0.9 ? "pending" : sr < 0.96 ? "failed" : "refunded";
    const d = new Date(now);
    d.setDate(d.getDate() - Math.floor(rand() * 90));
    d.setHours(Math.floor(rand() * 24));
    out.push({
      id: `pay_${10000 + i}`,
      date: d.toISOString(),
      customer: `${f} ${l}`,
      email: `${f.toLowerCase()}.${l.toLowerCase()}@gmail.com`,
      plan,
      amount: PLANS[plan].price,
      status,
      method: METHODS[Math.floor(rand() * METHODS.length)],
    });
  }
  return out.sort((a, b) => b.date.localeCompare(a.date));
}

export const mockPayments: Payment[] = genPayments(40);
