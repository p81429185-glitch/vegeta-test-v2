/**
 * VEGETA TYPUJE — single source of truth for subscription plans.
 * Both the public PricingSection and the admin panel read from here,
 * so prices/names never drift apart.
 */

export type PlanId = "gold-30" | "gold-60" | "ultravip";
export type PlanAccent = "blue" | "gold" | "purple";

export type Plan = {
  id: PlanId;
  /** Display name including duration suffix, e.g. "GOLD VEGETA 30d". */
  displayName: string;
  /** Short label for compact UI (badges, table cells). */
  shortLabel: string;
  /** Bare name without duration. */
  name: string;
  durationDays: 30 | 60;
  /** One-time price (zł). */
  price: number;
  /** Subscription price = price * 0.95, rounded to 2 decimals. */
  subscriptionPrice: number;
  /** Normalized monthly value, used for MRR maths. */
  monthlyValue: number;
  accent: PlanAccent;
  /** Optional capacity cap (ULTRAVIP). */
  slotLimit?: number;
  /** Marketing features (mirror of PricingSection). */
  features: string[];
};

const sub = (price: number) => Math.round(price * 0.95 * 100) / 100;

export const PLANS: Record<PlanId, Plan> = {
  "gold-30": {
    id: "gold-30",
    displayName: "GOLD VEGETA 30d",
    shortLabel: "GOLD 30d",
    name: "GOLD VEGETA",
    durationDays: 30,
    price: 259,
    subscriptionPrice: sub(259),
    monthlyValue: 259,
    accent: "blue",
    features: [
      "Ebook — strategia stawkowania",
      "Członkostwo w grupie nadawczej",
      "Średnio 60–70 typów / miesiąc",
      "Typy live oraz przedmeczowe",
      "Dostęp do typera: Vegeta",
    ],
  },
  "gold-60": {
    id: "gold-60",
    displayName: "GOLD VEGETA 60d",
    shortLabel: "GOLD 60d",
    name: "GOLD VEGETA",
    durationDays: 60,
    price: 449,
    subscriptionPrice: sub(449),
    monthlyValue: 224.5,
    accent: "gold",
    features: [
      "Ebook — strategia stawkowania",
      "Członkostwo w grupie nadawczej",
      "Średnio 60–70 typów / miesiąc",
      "Typy live oraz przedmeczowe",
      "Dostęp do typera: Vegeta",
    ],
  },
  ultravip: {
    id: "ultravip",
    displayName: "ULTRAVIP VEGETA 30d",
    shortLabel: "ULTRAVIP",
    name: "ULTRAVIP VEGETA",
    durationDays: 30,
    price: 599.99,
    subscriptionPrice: sub(599.99),
    monthlyValue: 599.99,
    accent: "purple",
    slotLimit: 30,
    features: [
      "Ebook — strategia stawkowania",
      "Członkostwo w grupie nadawczej",
      "Średnio 20–30 typów / miesiąc",
      "Typy live oraz przedmeczowe",
      "Dostęp do wspólnego czatu z subskrybentami",
      "Dostęp do typera: Vegeta",
    ],
  },
};

export const PLAN_IDS: PlanId[] = ["gold-30", "gold-60", "ultravip"];

/** Format a złoty amount with Polish formatting (e.g. 599,99 zł, 13 243,92 zł, 449 zł). */
export function formatPLN(amount: number): string {
  const hasFraction = Math.round(amount * 100) % 100 !== 0;
  const formatted = new Intl.NumberFormat("pl-PL", {
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: hasFraction ? 2 : 0,
  }).format(amount);
  return `${formatted} zł`;
}
