import { useEffect, useMemo, useState, memo } from "react";
import { Check, Crown, Flame, Sparkles, ShieldCheck, Lock, Zap, ArrowRight } from "lucide-react";
import vegetaChibi from "@/assets/vegeta-chibi.png";

// ============================================================
// FloatingVegetas — chibi twarze Vegety latające w tle
// ============================================================
const FLOATERS = Array.from({ length: 18 }).map((_, i) => {
  const seed = (n: number) => (Math.sin(i * 9.13 + n) + 1) / 2;
  const size = 48 + Math.floor(seed(1) * 90); // 48–138 px
  const left = Math.floor(seed(2) * 100); // 0–100 %
  const dur = 18 + Math.floor(seed(3) * 16); // 18–34s
  const delay = -Math.floor(seed(4) * dur); // negative for staggered start
  const rot = Math.floor((seed(5) - 0.5) * 40); // -20..20 deg
  const op = 0.06 + seed(6) * 0.07; // 0.06–0.13
  const sway = 16 + Math.floor(seed(7) * 40); // 16–56 px
  return { size, left, dur, delay, rot, op, sway, id: i };
});

const FloatingVegetas = memo(function FloatingVegetas() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {FLOATERS.map((f) => (
        <img
          key={f.id}
          src={vegetaChibi}
          alt=""
          loading="lazy"
          width={f.size}
          height={f.size}
          className="vegeta-float"
          style={
            {
              left: `${f.left}%`,
              width: f.size,
              height: f.size,
              opacity: f.op,
              filter: "drop-shadow(0 8px 24px rgba(30,64,255,0.4))",
              ["--dur" as string]: `${f.dur}s`,
              ["--delay" as string]: `${f.delay}s`,
              ["--rot" as string]: `${f.rot}deg`,
              ["--op" as string]: f.op,
              ["--sway" as string]: `${f.sway}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
});

// ============================================================
// Countdown — do najbliższego piątku 23:59
// ============================================================
function nextFridayDeadline() {
  const now = new Date();
  const target = new Date(now);
  const day = now.getDay(); // 0 Sun .. 6 Sat
  let diff = (5 - day + 7) % 7;
  if (diff === 0 && now.getHours() >= 24) diff = 7;
  target.setDate(now.getDate() + diff);
  target.setHours(23, 59, 0, 0);
  if (target.getTime() <= now.getTime()) target.setDate(target.getDate() + 7);
  return target;
}

function useCountdown() {
  const deadline = useMemo(() => nextFridayDeadline(), []);
  const [now, setNow] = useState(() => Date.now());
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!mounted) return { d: 0, h: 0, m: 0, s: 0 };
  const diff = Math.max(0, deadline.getTime() - now);
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { d, h, m, s };
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="liquid-glass-strong rounded-2xl px-3 py-3 md:px-7 md:py-5 min-w-[64px] md:min-w-[160px] text-center">
        <span className="font-mono-stat text-3xl md:text-7xl font-bold text-[#FFD60A]">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="mt-2 md:mt-3 text-[10px] md:text-sm uppercase tracking-widest text-white/50">{label}</span>
    </div>
  );
}

// ============================================================
// LinkPayButton — zielony przycisk Stripe-Link
// ============================================================
function LinkPayButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="link-btn-shine group relative w-full overflow-hidden rounded-xl bg-[#00D66F] px-6 py-4 text-base font-bold text-black transition-all hover:bg-[#00E477] hover:shadow-[0_0_30px_-5px_rgba(0,214,111,0.7)] active:scale-[0.98]"
    >
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        Zapłać z
        <span className="inline-flex items-center gap-1">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-black">
            <svg viewBox="0 0 24 24" className="h-3 w-3 fill-[#00D66F]">
              <polygon points="9,6 9,18 18,12" />
            </svg>
          </span>
          <span className="font-extrabold tracking-tight">link</span>
        </span>
      </span>
    </button>
  );
}

// ============================================================
// PlanCard
// ============================================================
const HIGHLIGHT_COLORS = {
  blue: "text-[#3BB7FF]",
  purple: "text-[#c084fc]",
  gold: "text-[#FFD60A]",
  green: "text-[#00D26A]",
} as const;

type HighlightColor = keyof typeof HIGHLIGHT_COLORS;

type FeatureRich = {
  text: string;
  highlights?: { word: string; color: HighlightColor }[];
};

type Plan = {
  id: string;
  name: string;
  duration: string;
  price: number;
  hook?: string;
  badge?: string;
  features: FeatureRich[];
  accent: "blue" | "purple" | "gold";
  isPrimary?: boolean;
  Icon: React.ComponentType<{ className?: string }>;
};

function renderFeature(f: FeatureRich) {
  const highlights = f.highlights ?? [];
  if (!highlights.length) return f.text;
  const pattern = new RegExp(
    `(${highlights.map((h) => h.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi",
  );
  const parts = f.text.split(pattern);
  return parts.map((part, i) => {
    const match = highlights.find((h) => h.word.toLowerCase() === part.toLowerCase());
    if (match) {
      return (
        <span key={i} className={`font-semibold ${HIGHLIGHT_COLORS[match.color]}`}>
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

const ACCENTS = {
  blue: {
    text: "text-[#3BB7FF]",
    bg: "bg-[#3BB7FF]/10",
    border: "border-[#3BB7FF]/30",
    hoverBorder: "hover:border-[#3BB7FF]/50",
    glow: "hover:shadow-[0_0_60px_-10px_rgba(59,183,255,0.55)]",
    ring: "ring-[#3BB7FF]/30",
    grad: "from-[#3BB7FF] to-[#1E40FF]",
    gradFull: "from-[#3BB7FF] via-[#2563EB] to-[#1E40FF]",
    ctaShadow: "shadow-[0_18px_50px_-12px_rgba(59,183,255,0.55)]",
    iconShadow: "shadow-[0_10px_30px_-8px_rgba(59,183,255,0.6)]",
    primaryShadow: "shadow-[0_0_60px_-5px_rgba(59,183,255,0.4)]",
    rgb: "59,183,255",
    hex: "#3BB7FF",
  },
  purple: {
    text: "text-[#c084fc]",
    bg: "bg-[#a855f7]/10",
    border: "border-[#a855f7]/30",
    hoverBorder: "hover:border-[#a855f7]/50",
    glow: "hover:shadow-[0_0_60px_-10px_rgba(168,85,247,0.6)]",
    ring: "ring-[#a855f7]/30",
    grad: "from-[#c084fc] to-[#7c3aed]",
    gradFull: "from-[#c084fc] via-[#a855f7] to-[#7c3aed]",
    ctaShadow: "shadow-[0_18px_50px_-12px_rgba(168,85,247,0.6)]",
    iconShadow: "shadow-[0_10px_30px_-8px_rgba(168,85,247,0.6)]",
    primaryShadow: "shadow-[0_0_60px_-5px_rgba(168,85,247,0.45)]",
    rgb: "168,85,247",
    hex: "#a855f7",
  },
  gold: {
    text: "text-[#FFD60A]",
    bg: "bg-[#FFD60A]/10",
    border: "border-[#FFD60A]/40",
    hoverBorder: "hover:border-[#FFD60A]/60",
    glow: "hover:shadow-[0_0_70px_-5px_rgba(255,214,10,0.6)]",
    ring: "ring-[#FFD60A]/40",
    grad: "from-[#FFD60A] to-[#F59E0B]",
    gradFull: "from-[#FFE873] via-[#FFD60A] to-[#F59E0B]",
    ctaShadow: "shadow-[0_18px_50px_-12px_rgba(255,214,10,0.6)]",
    iconShadow: "shadow-[0_10px_30px_-8px_rgba(255,214,10,0.6)]",
    primaryShadow: "shadow-[0_0_60px_-5px_rgba(255,214,10,0.4)]",
    rgb: "255,214,10",
    hex: "#FFD60A",
  },
};

function PlanCard({
  plan,
  billing,
  onSelect,
}: {
  plan: Plan;
  billing: "onetime" | "subscription";
  onSelect: (planId: string) => void;
}) {
  const accent = ACCENTS[plan.accent];
  const displayPrice = billing === "subscription" ? Math.round(plan.price * 0.95 * 100) / 100 : plan.price;

  const badgeStyles =
    plan.accent === "blue"
      ? "bg-gradient-to-r from-[#3BB7FF] to-[#1E40FF] text-white border border-white/20 shadow-[0_8px_24px_-6px_rgba(59,183,255,0.6)]"
      : plan.accent === "gold"
        ? "bg-gradient-to-r from-[#FFD60A] to-[#F59E0B] text-black border border-white/30 shadow-[0_8px_24px_-6px_rgba(255,214,10,0.6)]"
        : "bg-gradient-to-r from-[#a855f7] to-[#6d28d9] text-white border border-white/20 shadow-[0_8px_24px_-6px_rgba(168,85,247,0.6)]";

  const durationDaysMatch = plan.duration.match(/(\d+)/);
  const days = durationDaysMatch ? parseInt(durationDaysMatch[1], 10) : 30;
  const pricePerDay = displayPrice / days;

  return (
    <div
      className={[
        "group relative flex flex-col rounded-3xl border bg-gradient-to-br from-[#0c0f18] via-[#0a0d15] to-[#070a10] p-8 md:p-10 min-h-[680px] transition-all duration-500 ease-out will-change-transform",
        accent.border,
        accent.hoverBorder,
        accent.glow,
        plan.isPrimary
          ? `ring-2 ${accent.ring} ${accent.primaryShadow} md:-translate-y-3 md:scale-[1.03] hover:-translate-y-5 hover:scale-[1.05]`
          : "hover:-translate-y-2 hover:scale-[1.015]",
      ].join(" ")}
    >
      {/* Animated border beam (visible on hover) */}
      <span aria-hidden className="border-beam" style={{ ["--beam-color" as string]: accent.hex }} />

      {/* Diagonal shine sweep across the surface on hover */}
      <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
        <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-[1400ms] ease-out group-hover:translate-x-full" />
      </span>

      {/* Hover-only radial glow in accent color */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 0%, rgba(${accent.rgb}, 0.18), transparent 70%)`,
        }}
      />

      {/* Clipped decoration layer — keeps badge unclipped */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
        <div
          className={`absolute -top-2 -left-2 h-28 w-28 bg-gradient-to-br ${accent.grad} opacity-80`}
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
        />
        <div
          className={`absolute -top-10 -left-10 h-40 w-40 rounded-full bg-gradient-to-br ${accent.grad} opacity-20 blur-3xl`}
        />
        <div className={`absolute bottom-6 right-6 ${accent.text} opacity-[0.07]`}>
          <plan.Icon className="h-32 w-32 rotate-12" />
        </div>
      </div>

      {plan.badge && (
        <div
          className={[
            "animate-badge-float animate-badge-glow absolute -top-3 md:-top-3.5 left-1/2 z-20 inline-flex max-w-[calc(100%-1.5rem)] md:max-w-none items-center gap-1 md:gap-1.5 rounded-full px-2.5 py-0.5 md:px-5 md:py-1.5 text-[9px] md:text-xs font-extrabold uppercase tracking-normal md:tracking-wider whitespace-nowrap",
            badgeStyles,
          ].join(" ")}
          style={{ ["--badge-glow-color" as string]: `rgba(${accent.rgb}, 0.55)` }}
        >
          <Sparkles className="h-2.5 w-2.5 md:h-3.5 md:w-3.5 shrink-0" />
          {plan.badge}
        </div>
      )}

      <div className="relative z-10 flex flex-1 flex-col">
        {/* Title */}
        <div className="text-center pt-4">
          <h3
            className={`font-display text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-[0.95] bg-gradient-to-br ${accent.gradFull} bg-clip-text text-transparent transition-all duration-500`}
            style={{
              filter: "drop-shadow(0 2px 20px rgba(255,255,255,0.06))",
            }}
          >
            {plan.name}
          </h3>
          <div className="mt-4 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm font-medium text-white/80">
            ({plan.duration})
          </div>
        </div>

        {/* Circular gradient icon */}
        <div className="mt-6 flex justify-center">
          <div className="relative">
            <span
              aria-hidden
              className={`icon-ring-pulse pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br ${accent.grad} opacity-0`}
            />
            <div
              className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${accent.grad} ${accent.iconShadow} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
            >
              <plan.Icon className="h-8 w-8 text-white transition-transform duration-500 group-hover:animate-wiggle" />
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="mt-6 text-center">
          <div className="flex items-baseline justify-center gap-2 whitespace-nowrap">
            <span
              key={`${plan.id}-${billing}`}
              className="font-mono-stat text-4xl md:text-5xl font-bold text-white/90 animate-price-pop tracking-tight"
            >
              {displayPrice.toFixed(2).replace(".", ",")}
            </span>
            <span className="text-sm text-white/55">zł / {plan.duration.toLowerCase()}</span>
          </div>
          <div className={`mt-3 inline-flex items-center gap-1.5 text-sm md:text-base font-semibold ${accent.text}`}>
            <Zap className="h-4 w-4 fill-current" />≈ {pricePerDay.toFixed(2).replace(".", ",")} zł / dzień
          </div>
          {billing === "subscription" && (
            <div className="mt-2">
              <span className="animate-savings-pop inline-block rounded-full bg-[#00D26A]/15 px-2.5 py-1 text-xs font-semibold text-[#00D26A]">
                Oszczędzasz 5% z subskrypcją
              </span>
            </div>
          )}
          {plan.hook && <p className={`mt-4 text-base font-medium leading-relaxed ${accent.text}`}>{plan.hook}</p>}
        </div>

        {/* Divider */}
        <div className="my-7 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* Features */}
        <ul className="flex-1 space-y-3.5">
          {plan.features.map((f, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-base md:text-lg text-white/85 leading-relaxed transition-transform duration-300 ease-out group-hover:translate-x-1"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span
                className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${accent.grad} ${accent.iconShadow} transition-transform duration-300 group-hover:scale-110`}
              >
                <Check className="h-4 w-4 text-white" strokeWidth={3} />
              </span>
              <span>{renderFeature(f)}</span>
            </li>
          ))}
        </ul>

        {/* Gradient CTA */}
        <div className="mt-8">
          <button
            onClick={() => onSelect(plan.id)}
            className={`cta-btn animate-cta-pulse relative w-full overflow-hidden rounded-full bg-gradient-to-r ${accent.gradFull} ${accent.ctaShadow} px-6 py-4 text-base font-extrabold uppercase tracking-wider text-white transition-all hover:scale-[1.04] active:scale-[0.99]`}
          >
            <span className="relative z-10 inline-flex w-full items-center justify-center gap-2">
              Dołącz teraz
              <ArrowRight className="cta-arrow h-5 w-5" />
            </span>
            <span
              aria-hidden
              className="cta-shine pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700"
            />
          </button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-white/40">
            <Lock className="h-3 w-3" />
            Bezpieczna płatność · szyfrowanie SSL
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PricingSection
// ============================================================
const PLANS: Plan[] = [
  {
    id: "gold-30",
    name: "GOLD VEGETA",
    duration: "30 dni",
    price: 259.0,
    accent: "blue",
    Icon: Sparkles,
    hook: "Największy współczynnik przedłużania pakietu",
    badge: "Najczęściej wybierany",
    features: [
      { text: "Ebook – strategia stawkowania", highlights: [{ word: "Ebook", color: "blue" }] },
      { text: "Członkostwo w grupie nadawczej", highlights: [{ word: "Członkostwo", color: "blue" }] },
      { text: "Średnio 60–70 typów / miesiąc", highlights: [{ word: "60–70 typów", color: "gold" }] },
      {
        text: "Typy live oraz przedmeczowe",
        highlights: [
          { word: "live", color: "green" },
          { word: "przedmeczowe", color: "blue" },
        ],
      },
      { text: "Dostęp do typera: Vegeta", highlights: [{ word: "Vegeta", color: "gold" }] },
    ],
  },
  {
    id: "gold-60",
    name: "GOLD VEGETA",
    duration: "60 dni",
    price: 449.0,
    accent: "gold",
    Icon: Crown,
    hook: "Najkorzystniejszy cenowo, oszczędzasz 69 zł",
    badge: "2 miesiące taniej",
    features: [
      { text: "Ebook – strategia stawkowania", highlights: [{ word: "Ebook", color: "gold" }] },
      { text: "Członkostwo w grupie nadawczej", highlights: [{ word: "Członkostwo", color: "gold" }] },
      { text: "Średnio 60–70 typów / miesiąc", highlights: [{ word: "60–70 typów", color: "gold" }] },
      {
        text: "Typy live oraz przedmeczowe",
        highlights: [
          { word: "live", color: "green" },
          { word: "przedmeczowe", color: "gold" },
        ],
      },
      { text: "Dostęp do typera: Vegeta", highlights: [{ word: "Vegeta", color: "gold" }] },
    ],
  },
  {
    id: "ultravip",
    name: "ULTRAVIP VEGETA",
    duration: "30 dni",
    price: 599.99,
    accent: "purple",
    isPrimary: true,
    Icon: Flame,
    hook: "Pakiet z najwyższą skutecznością · tylko 30 miejsc / miesiąc",
    badge: "Limit 30 miejsc",
    features: [
      { text: "Ebook – strategia stawkowania", highlights: [{ word: "Ebook", color: "purple" }] },
      { text: "Członkostwo w grupie nadawczej", highlights: [{ word: "Członkostwo", color: "purple" }] },
      { text: "Średnio 20–30 typów / miesiąc", highlights: [{ word: "20–30 typów", color: "purple" }] },
      {
        text: "Typy live oraz przedmeczowe",
        highlights: [
          { word: "live", color: "green" },
          { word: "przedmeczowe", color: "purple" },
        ],
      },
      {
        text: "Dostęp do wspólnego czatu z subskrybentami",
        highlights: [{ word: "wspólnego czatu", color: "purple" }],
      },
      { text: "Dostęp do typera: Vegeta", highlights: [{ word: "Vegeta", color: "purple" }] },
    ],
  },
];

export default function PricingSection() {
  const [billing, setBilling] = useState<"onetime" | "subscription">("onetime");
  const { d, h, m, s } = useCountdown();

  const handleSelectPlan = (planId: string) => {
    // TODO: route /checkout dorobimy później jak ci sie spodoba strona
    window.location.href = `/checkout?plan=${planId}&billing=${billing}`;
  };

  return (
    <section
      id="pricing"
      className="relative isolate overflow-hidden py-24 md:py-32"
      style={{
        background: "linear-gradient(180deg, #060a1a 0%, #0a1230 50%, #060a1a 100%)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-[1600px] px-4 md:px-6">
        <div
          className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.06] p-8 md:p-14 lg:p-16 shadow-[0_30px_120px_-20px_rgba(0,0,0,0.9)]"
          style={{
            background: "linear-gradient(135deg, #0d1018 0%, #14171f 50%, #07090d 100%)",
          }}
        >
          <FloatingVegetas />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,255,255,0.06), transparent 70%), radial-gradient(ellipse 80% 60% at 50% 100%, rgba(168,85,247,0.08), transparent 70%)",
            }}
          />
          <div className="relative z-10">
            {/* Header */}
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-white md:text-6xl">
                Wybierz swój{" "}
                <span className="bg-gradient-to-r from-[#FFD60A] via-[#a855f7] to-[#3BB7FF] bg-clip-text text-transparent">
                  poziom mocy
                </span>
              </h2>
              <p className="mt-4 text-base md:text-lg text-white/65">
                Trzy pakiety zaprojektowane tak, żebyś trafił idealnie w swoje tempo i bankroll. Dołącz do graczy,
                którzy już wygrywają.
              </p>
            </div>

            {/* Countdown */}
            <div className="mt-10 flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 md:gap-5">
                <CountdownBox value={d} label="dni" />
                <span className="text-2xl md:text-5xl font-bold text-white/30">:</span>
                <CountdownBox value={h} label="godz" />
                <span className="text-2xl md:text-5xl font-bold text-white/30">:</span>
                <CountdownBox value={m} label="min" />
                <span className="text-2xl md:text-5xl font-bold text-white/30">:</span>
                <CountdownBox value={s} label="sek" />
              </div>
            </div>

            {/* Billing toggle */}
            <div className="mt-8 flex flex-col items-center gap-2">
              <div className="liquid-glass-strong inline-flex rounded-full p-1">
                <button
                  onClick={() => setBilling("onetime")}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                    billing === "onetime" ? "bg-white text-black" : "text-white/70 hover:text-white"
                  }`}
                >
                  Jednorazowo
                </button>
                <button
                  onClick={() => setBilling("subscription")}
                  className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                    billing === "subscription" ? "bg-white text-black" : "text-white/70 hover:text-white"
                  }`}
                >
                  Subskrypcja
                  <span className="ml-2 rounded-full bg-[#00D26A]/20 px-1.5 py-0.5 text-[10px] font-bold text-[#00D26A]">
                    -5%
                  </span>
                </button>
              </div>
              <p className="text-xs text-white/45">Podepnij kartę i płać automatycznie — taniej o 5%.</p>
            </div>

            {/* Cards */}
            <div className="mt-14 grid gap-8 lg:gap-10 lg:grid-cols-3 lg:items-stretch">
              {PLANS.map((plan) => (
                <PlanCard key={plan.id} plan={plan} billing={billing} onSelect={handleSelectPlan} />
              ))}
            </div>

            {/* Trust bar */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-white/60">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#00D66F]" />
                Płatność SSL
              </span>
              <span className="inline-flex items-center gap-2">
                <Lock className="h-4 w-4 text-[#FFD60A]" />
                Dane szyfrowane
              </span>
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#a855f7]" />
                Dostęp w 60 sekund
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
