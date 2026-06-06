import { useState, useMemo, useRef, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, BarChart3, ArrowRight } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const hl = (text: string) => (
  <span className="text-white font-semibold">{text}</span>
);

type Currency = "EUR" | "PLN" | "USD";

const CURRENCY_SYMBOL: Record<Currency, string> = {
  EUR: "€",
  PLN: "zł",
  USD: "$",
};

const monthlyData: { month: string; value: number; currency: Currency }[] = [
  { month: "09/2023", value: 5601, currency: "EUR" },
  { month: "10/2023", value: 7486, currency: "EUR" },
  { month: "11/2023", value: 7495, currency: "EUR" },
  { month: "12/2023", value: -294, currency: "EUR" },
  { month: "01/2024", value: 6512, currency: "PLN" },
  { month: "02/2024", value: 5905, currency: "PLN" },
  { month: "03/2024", value: 3869, currency: "PLN" },
  { month: "04/2024", value: 4122, currency: "PLN" },
  { month: "06/2025", value: 5595, currency: "PLN" },
  { month: "08/2025", value: 9777, currency: "PLN" },
  { month: "09/2025", value: 5204, currency: "USD" },
  { month: "10/2025", value: 9047, currency: "USD" },
  { month: "11/2025", value: 6090, currency: "USD" },
  { month: "12/2025", value: 3707, currency: "USD" },
  { month: "01/2026", value: 12445, currency: "USD" },
  { month: "02/2026", value: 9472, currency: "USD" },
  { month: "03/2026", value: 10305, currency: "USD" },
  { month: "04/2026", value: 19556, currency: "USD" },
  { month: "05/2026", value: 961, currency: "USD" },
];

const FX_TO_PLN: Record<Currency, number> = {
  EUR: 4.3,
  USD: 4.0,
  PLN: 1,
};

const monthlyDataPLN = monthlyData.map((d) => ({
  month: d.month,
  value: Math.round(d.value * FX_TO_PLN[d.currency]),
}));

const totalPLN = monthlyDataPLN.reduce((sum, d) => sum + d.value, 0);

// UltraVIP — ~1.5× Gold per month (deterministic mock, replace with real data later)
const ULTRA_MULTIPLIERS = [
  1.55, 1.42, 1.61, 1.48, 1.52, 1.38, 1.66, 1.45,
  1.58, 1.5, 1.62, 1.4, 1.55, 1.47, 1.53, 1.6,
  1.44, 1.57, 1.49,
];
const monthlyDataPLNUltra = monthlyDataPLN.map((d, i) => ({
  month: d.month,
  value: Math.round(d.value * (ULTRA_MULTIPLIERS[i] ?? 1.5)),
}));
const totalPLNUltra = monthlyDataPLNUltra.reduce((sum, d) => sum + d.value, 0);


const formatNum = (value: number) =>
  new Intl.NumberFormat("pl-PL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

const formatPLNShort = (value: number) =>
  new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 }).format(value);


/* ---------- Animated neural canvas background ---------- */
const NeuralCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const NODES = 90;
    const MAX_D = 150;
    const MOUSE_R = 180;

    type P = { x: number; y: number; vx: number; vy: number };
    let particles: P[] = [];
    const mouse = { x: -9999, y: -9999, active: false };

    const init = () => {
      particles = Array.from({ length: NODES }, () => ({
        x: Math.random() * w,
        // Bias initial Y toward upper 2/3 so they don't cluster low
        y: Math.pow(Math.random(), 1.3) * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      }));
    };


    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particles.length === 0) init();
    };

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active =
        mouse.x >= 0 && mouse.x <= w && mouse.y >= 0 && mouse.y <= h;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // update
      for (const p of particles) {
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < MOUSE_R && d > 0.1) {
            const f = ((MOUSE_R - d) / MOUSE_R) * 0.6;
            p.vx += (dx / d) * f * 0.15;
            p.vy += (dy / d) * f * 0.15;
          }
        }
        p.x += p.vx;
        p.y += p.vy;
        // very light friction so they keep drifting and don't settle
        p.vx *= 0.998;
        p.vy *= 0.998;
        // constant brownian jitter
        p.vx += (Math.random() - 0.5) * 0.03;
        p.vy += (Math.random() - 0.5) * 0.03;
        // cap velocity
        const vmax = 0.9;
        if (p.vx > vmax) p.vx = vmax;
        if (p.vx < -vmax) p.vx = -vmax;
        if (p.vy > vmax) p.vy = vmax;
        if (p.vy < -vmax) p.vy = -vmax;
        // bounce — kick back from bottom so they don't pool
        if (p.x < 0) {
          p.x = 0;
          p.vx = Math.abs(p.vx);
        } else if (p.x > w) {
          p.x = w;
          p.vx = -Math.abs(p.vx);
        }
        if (p.y < 0) {
          p.y = 0;
          p.vy = Math.abs(p.vy);
        } else if (p.y > h) {
          p.y = h;
          p.vy = -Math.abs(p.vy) - 0.15;
        }
      }


      // edges between particles
      ctx.lineWidth = 0.7;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < MAX_D) {
            const op = (1 - d / MAX_D) * 0.35;
            ctx.strokeStyle = `rgba(255, 214, 10, ${op})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // edges to mouse
      if (mouse.active) {
        for (const p of particles) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < MOUSE_R) {
            const op = (1 - d / MOUSE_R) * 0.6;
            ctx.strokeStyle = `rgba(255, 214, 10, ${op})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // nodes with glow
      ctx.shadowColor = "#FFD60A";
      ctx.shadowBlur = 8;
      ctx.fillStyle = "#FFD60A";
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(tick);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{
        maskImage:
          "radial-gradient(ellipse 95% 110% at 50% 40%, #000 60%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 95% 110% at 50% 40%, #000 60%, transparent 100%)",
      }}

    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-70"
      />
    </div>
  );
};

/* ---------- Tooltip ---------- */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const val = payload[0].value as number;
  return (
    <div className="bg-[hsl(222,20%,10%)] border border-white/15 rounded-xl px-4 py-2.5 shadow-xl">
      <p className="text-xs text-white/60 mb-1">{label}</p>
      <p
        className={`text-sm font-bold whitespace-nowrap ${
          val >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"
        }`}
      >
        {val >= 0 ? "+" : ""}
        {formatPLNShort(val)} zł
      </p>


    </div>
  );
};


/* ---------- One profit card (chart + slider) ---------- */
type Accent = {
  color: string;
  colorDark: string;
  gradientId: string;
  shadow: string;
};

type Tier = {
  name: string;
  subtitle: string;
  titleGradient: string;
};

const ProfitCard = ({
  tier,
  stake,
  accent,
  data,
  total,
}: {
  tier: Tier;
  stake: number;
  accent: Accent;
  data: { month: string; value: number }[];
  total: number;
}) => {
  const chartData = useMemo(
    () =>
      data.map((d) => ({ ...d, value: (d.value * stake) / 100 })),
    [stake, data],
  );

  const totalScaled = (total * stake) / 100;


  return (
    <div className="rounded-2xl border border-white/10 bg-[hsl(222,20%,8%)]/60 pt-6 sm:pt-7 px-5 pb-5 sm:px-6 sm:pb-6 backdrop-blur-sm flex flex-col animate-fade-in">
      {/* Tier title */}
      <div className="mb-5 text-center">
        <h3
          className="profit-shimmer bg-clip-text text-transparent text-3xl sm:text-4xl"
          style={{
            backgroundImage: tier.titleGradient,
            fontFamily: '"Sora", system-ui, sans-serif',
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          {tier.name}
        </h3>
        <div
          className="mx-auto mt-4 h-px w-3/4"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${accent.color}66 50%, transparent 100%)`,
          }}
        />
      </div>


      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-wider text-white/50">
          Łączny zysk
        </p>
        <span className="text-sm font-bold" style={{ color: accent.color }}>
          {stake} zł / zakład
        </span>
      </div>

      <div className="mb-4 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-4 text-center">
        <span
          className="profit-shimmer bg-clip-text text-transparent text-3xl sm:text-4xl"
          style={{
            backgroundImage: `linear-gradient(90deg, ${accent.color}, #ffffff, ${accent.color})`,
            fontFamily: '"Sora", system-ui, sans-serif',
            fontWeight: 900,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          +{formatNum(totalScaled)} zł
        </span>
        <p className="mt-2 text-[11px] text-white/50">
          łączny zysk od 09/2023
        </p>
      </div>




      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={accent.gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accent.color} stopOpacity={0.35} />
                <stop offset="100%" stopColor={accent.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
            <XAxis
              dataKey="month"
              tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={90}
              tickFormatter={(v) => `${formatPLNShort(v).replace(/\s/g, "\u00A0")}\u00A0zł`}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={accent.color}
              strokeWidth={2}
              fill={`url(#${accent.gradientId})`}
              activeDot={{
                r: 6,
                stroke: accent.color,
                strokeWidth: 2,
                fill: "hsl(222,20%,12%)",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>

  );
};

const ACCENT_PURPLE: Accent = {
  color: "#A855F7",
  colorDark: "#7C3AED",
  gradientId: "profitFillPurple",
  shadow: "rgba(168,85,247,0.55)",
};
const ACCENT_YELLOW: Accent = {
  color: "#FFD60A",
  colorDark: "#c9a800",
  gradientId: "profitFillYellow",
  shadow: "rgba(255,214,10,0.5)",
};

const TIER_GOLD: Tier = {
  name: "GOLD VEGETA",
  subtitle: "Premium pakiet — sprawdzona skuteczność",
  titleGradient:
    "linear-gradient(135deg, #FFD60A 0%, #fff3a6 45%, #FFD60A 60%, #c9a800 100%)",
};

const TIER_ULTRAVIP: Tier = {
  name: "ULTRAVIP VEGETA",
  subtitle: "Najwyższy tier — pełen value",
  titleGradient:
    "linear-gradient(135deg, #7C3AED 0%, #C084FC 30%, #FFFFFF 50%, #C084FC 70%, #7C3AED 100%)",
};



const ProfitSection = () => {
  const [stake, setStake] = useState(100);
  const pct = (stake - 10) / (500 - 10); // 0..1 for thumb glow color
  const thumbColor = pct <= 0.5 ? "#FFD60A" : "#A855F7";


  return (
    <section
      id="statystyki"
      className="relative w-full py-20 sm:py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #060a1a 0%, #0a1230 50%, #060a1a 100%)",
      }}
    >
      <NeuralCanvas />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-10 text-center">

          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            GRAMY{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #FFD60A 0%, #fff3a6 45%, #FFD60A 60%, #c9a800 100%)",
              }}
            >
              ANALITYCZNIE
            </span>{" "}
            I{" "}
            <span className="bg-gradient-to-r from-[#A855F7] to-[#7C3AED] bg-clip-text text-transparent">
              EFEKTYWNIE
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-400 md:text-base">
            Od {hl("2023")} nie mieliśmy ostrych minusów ani potknięć —
            <br />
            każdy zakład jest dokładnie {hl("wyselekcjonowany")}.
          </p>

        </div>

        {/* Two charts side-by-side */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <ProfitCard tier={TIER_GOLD} stake={stake} accent={ACCENT_YELLOW} data={monthlyDataPLN} total={totalPLN} />
          <ProfitCard tier={TIER_ULTRAVIP} stake={stake} accent={ACCENT_PURPLE} data={monthlyDataPLNUltra} total={totalPLNUltra} />
        </div>

        {/* Shared stake slider */}
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <p className="text-sm uppercase tracking-wider text-white/50">
              Stawka na zakład
            </p>
            <p className="text-2xl font-bold text-white sm:text-3xl">
              {stake} <span className="text-white/60 text-lg">zł</span>
            </p>
          </div>
          <Slider
            value={[stake]}
            onValueChange={(val) => setStake(val[0])}
            min={10}
            max={500}
            step={10}
            className="dual-slider w-full"
            style={
              { ["--thumb-color" as any]: thumbColor } as React.CSSProperties
            }
          />
          <div className="mt-3 flex justify-between text-xs text-white/40">
            <span>10 zł</span>
            <span>500 zł</span>
          </div>
          <style>{`
            .dual-slider [data-radix-slider-track]{
              position: relative;
              background: linear-gradient(90deg,
                #FFD60A 0%, #FFD60A 42%,
                #F5C76B 48%, #C084FC 52%,
                #A855F7 58%, #7C3AED 100%) !important;
              height: 12px !important;
              border-radius: 9999px;
              box-shadow: 0 0 20px rgba(255,214,10,0.25), 0 0 28px rgba(168,85,247,0.45);
              overflow: hidden;
            }
            .dual-slider [data-radix-slider-track]::after{
              content: "";
              position: absolute;
              inset: 0;
              left: 50%;
              border-radius: 9999px;
              background: linear-gradient(90deg,
                transparent 0%,
                rgba(255,255,255,0.22) 50%,
                transparent 100%);
              background-size: 200% 100%;
              animation: divine-shimmer 3.5s ease-in-out infinite;
              pointer-events: none;
              mix-blend-mode: screen;
            }
            @keyframes divine-shimmer {
              0%   { background-position: 200% 0; }
              100% { background-position: -100% 0; }
            }
            .dual-slider [data-radix-slider-range]{
              background: transparent !important;
            }
            .dual-slider [data-radix-slider-thumb]{
              height: 28px !important;
              width: 28px !important;
              background: #ffffff !important;
              border: 3px solid ${thumbColor} !important;
              box-shadow: 0 0 22px ${thumbColor}cc, 0 0 40px ${thumbColor}66, 0 2px 6px rgba(0,0,0,0.45) !important;
              transition: border-color 0.2s, box-shadow 0.2s;
            }
          `}</style>
        </div>




        {/* WOW link */}
        <div className="mx-auto mt-8 max-w-xl">
          <a
            href="https://app.bet-analytix.com/bankroll/1759745"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-[#FFD60A]/40 hover:bg-white/[0.06]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFD60A]/10">
                <BarChart3 className="h-5 w-5 text-[#FFD60A]" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">
                  Chcesz zobaczyć dokładne mecze?
                </p>
                <p className="text-xs text-white/50">
                  Tutaj możesz zobaczyć dokładne rynki
                </p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-white/50 transition group-hover:translate-x-1 group-hover:text-[#FFD60A]" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProfitSection;
