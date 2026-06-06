import { ArrowRight, BarChart3 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import heroBgVegeta from "@/assets/hero-bg.jpg";
import { Emoji } from "@/components/ui/Emoji";
import { EASE, DUR } from "@/components/motion/variants";
import { GoldSweep } from "@/components/motion/GoldSweep";

const PARTICLES = Array.from({ length: 14 }, (_, i) => {
  // Deterministic pseudo-random so SSR + client match.
  const seed = (i * 9301 + 49297) % 233280;
  const left = (seed % 100);
  const delay = (i * 0.7) % 8;
  const duration = 9 + ((i * 1.3) % 7);
  const size = 2 + (i % 3);
  return { left, delay, duration, size, id: i };
});

function Particles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 block rounded-full bg-energy-yellow"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            boxShadow: "0 0 8px 1px rgba(255, 214, 10, 0.7)",
            animation: `particleRise ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function LivePickCard({ delay }: { delay: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="hidden lg:block absolute left-0 top-8 xl:-left-4 w-[260px] animate-float-slow rounded-2xl border border-saiyan-white/10 bg-navy-mid/40 p-4 shadow-card-premium backdrop-blur-xl"
      style={{ transform: "rotate(-3deg)" }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, x: -60, rotate: -8 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0, rotate: -3 }}
      transition={
        reduced
          ? { duration: 0.2, delay }
          : { duration: 0.9, ease: EASE, delay }
      }
    >
      <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-wider text-saiyan-white/50">
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-win-green opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-win-green" />
          </span>
          Nowy typ
        </span>
        <span className="font-mono-stat">20:45</span>
      </div>
      <div className="mt-3 font-display text-sm font-semibold text-saiyan-white">
        Hiszpania handicap
      </div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-mono-stat text-lg font-bold text-energy-yellow">@ 3.90</span>
      </div>
      <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-win-green/15 px-2.5 py-1 text-[11px] font-semibold text-win-green ring-1 ring-win-green/30">
        <Emoji size={12}>✅</Emoji> WYGRANA
      </div>
    </motion.div>
  );
}

function ProfitGraphCard({ delay }: { delay: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="hidden lg:block absolute bottom-10 right-0 xl:-right-2 w-[280px] animate-float-med rounded-2xl border border-saiyan-white/10 bg-navy-mid/40 p-4 shadow-card-premium backdrop-blur-xl"
      style={{ transform: "rotate(2.5deg)" }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, x: 60, rotate: 8 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0, rotate: 2.5 }}
      transition={
        reduced
          ? { duration: 0.2, delay }
          : { duration: 0.9, ease: EASE, delay }
      }
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-wider text-saiyan-white/50">
          Profit · 30 dni
        </span>
        <span className="font-mono-stat text-xs font-semibold text-win-green">
          +47.2j
        </span>
      </div>
      <svg viewBox="0 0 240 80" className="mt-3 h-20 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="profitFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00D26A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00D26A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,65 L30,60 L60,62 L90,50 L120,52 L150,38 L180,32 L210,18 L240,6 L240,80 L0,80 Z"
          fill="url(#profitFill)"
        />
        <motion.path
          d="M0,65 L30,60 L60,62 L90,50 L120,52 L150,38 L180,32 L210,18 L240,6"
          fill="none"
          stroke="#00D26A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={
            reduced
              ? { duration: 0.2 }
              : { duration: 1.2, ease: EASE, delay: delay + 0.2 }
          }
        />
      </svg>
      <div className="mt-2 flex items-end justify-between font-mono-stat text-[11px] text-saiyan-white/50">
        <span>01.05</span>
        <span className="text-saiyan-white font-semibold">+47.2 jednostek</span>
        <span>30.05</span>
      </div>
    </motion.div>
  );
}

function TelegramNotifCard({ delay }: { delay: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="hidden xl:flex absolute right-2 top-24 w-[280px] animate-float-fast items-start gap-3 rounded-2xl border border-saiyan-white/10 bg-navy-mid/50 p-3 shadow-card-premium backdrop-blur-xl"
      style={{ transform: "rotate(-1.5deg)" }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduced
          ? { duration: 0.2, delay }
          : { duration: 0.8, ease: EASE, delay }
      }
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-saiyan-blue to-energy-yellow font-display text-sm font-bold text-navy-deep">
        V
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between">
          <span className="font-display text-sm font-semibold text-saiyan-white">
            VEGETA WRZUCIŁ NOWĄ ANALIZĘ
          </span>
          <span className="font-mono-stat text-[10px] text-saiyan-white/50">teraz</span>
        </div>
        <p className="mt-0.5 text-xs leading-snug text-saiyan-white/85">
          <Emoji size={12}>🔥</Emoji> <span className="font-semibold">PSG – Mbappe</span>{" "}
          <span className="font-mono-stat text-energy-yellow">@ 3.40</span>
        </p>
      </div>
    </motion.div>
  );
}

// Per-word entrance for the headline. Each word in a clip-overflow span.
function WordsReveal({
  words,
  baseDelay,
  className,
  wordClassName,
}: {
  words: string[];
  baseDelay: number;
  className?: string;
  wordClassName?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.1em" }}
        >
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            initial={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, y: "100%", filter: "blur(10px)" }
            }
            animate={
              reduced
                ? { opacity: 1 }
                : { opacity: 1, y: "0%", filter: "blur(0px)" }
            }
            transition={
              reduced
                ? { duration: 0.2, delay: baseDelay }
                : { duration: DUR.slow, ease: EASE, delay: baseDelay + i * 0.08 }
            }
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}


export function Hero() {
  const reduced = useReducedMotion();
  // Background zoom-out
  const bgInitial = reduced ? { opacity: 0 } : { opacity: 0, scale: 1.06 };
  const bgAnimate = reduced ? { opacity: 0.5 } : { opacity: 0.5, scale: 1 };

  return (
    <section
      id="hero"
      className="relative isolate min-h-[92vh] w-full overflow-hidden bg-black"
    >
      {/* Vegeta background image at 50% opacity over black */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${heroBgVegeta})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        initial={bgInitial}
        animate={bgAnimate}
        transition={reduced ? { duration: 0.3 } : { duration: 1.1, ease: EASE }}
      />
      <Particles />

      <div className="relative mx-auto flex min-h-[92vh] w-full max-w-[1280px] flex-col items-center justify-center px-5 py-20 sm:px-8 lg:px-12">
        {/* Floating glass cards (desktop only) */}
        <LivePickCard delay={0.85} />
        <ProfitGraphCard delay={0.95} />
        <TelegramNotifCard delay={1.05} />

        {/* Badge */}
        <motion.div
          className="flex justify-center"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduced
              ? { duration: 0.2 }
              : { duration: DUR.base, ease: EASE, delay: 0.05 }
          }
        >
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md border border-white/20 bg-white/10 text-xs sm:text-sm text-white/90 flex-wrap">
            <BarChart3 className="h-4 w-4 text-energy-yellow" />
            <span className="font-medium">NieSprawiedliwa Przewaga, Analiza, Wiedza</span>
          </div>
        </motion.div>

        {/* Headline — per-word reveal */}
        <h1 className="max-w-4xl text-center font-display text-4xl font-bold leading-[1.05] tracking-tight text-saiyan-white sm:text-5xl md:text-6xl lg:text-7xl">
          <WordsReveal words={["Zweryfikowane", "Analizy"]} baseDelay={0.15} />
          <br />
          <span className="relative inline-block">
            <WordsReveal
              words={["Polskiej", "Legendy", "Typerów"]}
              baseDelay={0.35}
              wordClassName="bg-gradient-to-b from-energy-yellow to-[#FFB800] bg-clip-text text-transparent"
            />
            <GoldSweep delay={1.0} />
          </span>

        </h1>

        {/* Subheadline */}
        <motion.p
          className="mt-6 max-w-2xl text-center text-base text-slate-300 md:text-xl"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={
            reduced
              ? { duration: 0.2, delay: 0.4 }
              : { duration: DUR.base, ease: EASE, delay: 0.65 }
          }
        >
          Matematycznie zgodne analizy sportowe poparte wiedzą byłego analityka
          dokładności oraz ruchu kursów dla firm bukmacherskich.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex w-full max-w-md flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: reduced ? 0 : 0.1,
                delayChildren: reduced ? 0 : 0.85,
              },
            },
          }}
        >
          <motion.a
            href="#jak-zaczac"
            data-track="hero-cta-primary"
            data-track-label="Dowiedz się wszystkiego"
            className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-energy-yellow px-6 py-4 font-display text-base font-semibold text-navy-deep transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep sm:text-lg"
            variants={{
              hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 20 },
              visible: reduced
                ? { opacity: 1, transition: { duration: 0.2 } }
                : { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
            }}
          >
            Dowiedz się wszystkiego
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </motion.a>

          <motion.a
            href="#pricing"
            data-track="hero-cta-secondary"
            data-track-label="Sprawdź Ofertę"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-saiyan-white/25 bg-transparent px-6 py-4 font-display text-base font-semibold text-saiyan-white transition-all duration-200 hover:border-saiyan-white/60 hover:bg-saiyan-white/5 sm:text-lg"
            variants={{
              hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 20 },
              visible: reduced
                ? { opacity: 1, transition: { duration: 0.2 } }
                : {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", damping: 14, stiffness: 180 },
                  },
            }}
          >
            Sprawdź Ofertę
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
