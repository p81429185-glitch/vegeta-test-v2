import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import glowAsset from "@/assets/vegeta-glow.png.asset.json";

type Part = { text: string; bold?: boolean };

type Review = {
  name: string;
  initials: string;
  color: string;
  reviewCount: number;
  date: string;
  parts: Part[];
};

const REVIEWS: Review[] = [
  {
    name: "Kamil W.",
    initials: "KW",
    color: "#3BB7FF",
    reviewCount: 12,
    date: "2 tygodnie temu",
    parts: [
      { text: "Gram na typach Vegety od kilku tygodni i jestem mega zadowolony. Wreszcie ktoś, kto faktycznie zna się na rzeczy, a nie pseudotyper. " },
      { text: "Saldo rośnie, a kupony wchodzą regularnie.", bold: true },
      { text: " Polecam każdemu!" },
    ],
  },
  {
    name: "Michał K.",
    initials: "MK",
    color: "#FFD60A",
    reviewCount: 8,
    date: "3 tygodnie temu",
    parts: [
      { text: "Najlepsza decyzja od dawna. Zacząłem od małych stawek po 50 zł i " },
      { text: "prawie wszystkie kupony weszły.", bold: true },
      { text: " Profesjonalne podejście, świetna komunikacja i realne wyniki. Dzięki, Vegeta!" },
    ],
  },
  {
    name: "Patryk S.",
    initials: "PS",
    color: "#a855f7",
    reviewCount: 19,
    date: "miesiąc temu",
    parts: [
      { text: "Pakiet VIP to zupełnie inny poziom. Typy live i przedmeczowe, wszystko podane na czas i z konkretnym uzasadnieniem. Czuję, że trafiłem do " },
      { text: "najlepszej grupy nadawczej w Polsce.", bold: true },
    ],
  },
  {
    name: "Tomasz L.",
    initials: "TL",
    color: "#00D26A",
    reviewCount: 6,
    date: "5 tygodni temu",
    parts: [
      { text: "Sceptycznie podchodziłem do tego typu usług, ale Vegeta totalnie zmienił moje zdanie. " },
      { text: "Skuteczność na najwyższym poziomie", bold: true },
      { text: ", a kursy potrafią wejść nawet powyżej 6.0. Robota wykonana perfekcyjnie." },
    ],
  },
  {
    name: "Krzysztof M.",
    initials: "KM",
    color: "#3BB7FF",
    reviewCount: 14,
    date: "miesiąc temu",
    parts: [
      { text: "Już pierwszego dnia z VIP-em " },
      { text: "zwróciły mi się koszty pakietu.", bold: true },
      { text: " Wreszcie zarabiam, zamiast tracić jak wcześniej u przypadkowych typerów. Strategia stawkowania z ebooka to złoto. Polecam w 100%." },
    ],
  },
  {
    name: "Adrian P.",
    initials: "AP",
    color: "#FFD60A",
    reviewCount: 9,
    date: "6 tygodni temu",
    parts: [
      { text: "Mega profesjonalizm i indywidualne podejście. Można dopytać o każdy mecz i zawsze dostaje się rzetelną odpowiedź. " },
      { text: "Czuć, że to ktoś, kto pracuje w branży od lat.", bold: true },
      { text: " Zdecydowanie warto." },
    ],
  },
  {
    name: "Bartek N.",
    initials: "BN",
    color: "#a855f7",
    reviewCount: 21,
    date: "2 miesiące temu",
    parts: [
      { text: "Saldo po wygranych kuponach mówi samo za siebie, " },
      { text: "ponad 4000 zł na plusie.", bold: true },
      { text: " Typy live wchodzą jeden po drugim. Najlepsza grupa, do jakiej dołączyłem. Dziękuję!" },
    ],
  },
  {
    name: "Dawid R.",
    initials: "DR",
    color: "#00D26A",
    reviewCount: 7,
    date: "2 miesiące temu",
    parts: [
      { text: "Świetna, konkretna grupa bez zbędnego spamu. Mecze dobrze przeanalizowane, a typy podawane z wyprzedzeniem. " },
      { text: "Wreszcie czuję, że typowanie ma sens i przynosi realny zysk.", bold: true },
    ],
  },
  {
    name: "Łukasz G.",
    initials: "ŁG",
    color: "#3BB7FF",
    reviewCount: 16,
    date: "3 miesiące temu",
    parts: [
      { text: "Vegeta to klasa sama w sobie. Regularne wygrane, uczciwe podejście i pełne wsparcie. " },
      { text: "Z małych stawek robi się realny kapitał.", bold: true },
      { text: " Każdą złotówkę wydaną na pakiet uważam za inwestycję." },
    ],
  },
  {
    name: "Sebastian J.",
    initials: "SJ",
    color: "#FFD60A",
    reviewCount: 11,
    date: "3 miesiące temu",
    parts: [
      { text: "Po miesiącu w grupie mogę śmiało powiedzieć, warto. " },
      { text: "Skuteczność, komunikacja i atmosfera na najwyższym poziomie.", bold: true },
      { text: " Polecam zarówno początkującym, jak i tym z większym doświadczeniem." },
    ],
  },
];

const AUTO_ADVANCE_MS = 5000;

function GoogleLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

function StarRating({ filled = 5, size = "sm" }: { filled?: number; size?: "sm" | "md" }) {
  const cls = size === "md" ? "h-[18px] w-[18px]" : "h-4 w-4";
  return (
    <div className="flex items-center gap-1" aria-label={`${filled} z 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < filled
              ? `${cls} fill-[#FBBC04] text-[#FBBC04]`
              : `${cls} fill-saiyan-white/15 text-saiyan-white/15`
          }
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, dimmed = false }: { review: Review; dimmed?: boolean }) {
  return (
    <div
      className={
        "group relative flex h-full flex-col rounded-2xl border bg-gradient-to-br from-[#0c0f18] via-[#0a0d15] to-[#070a10] p-6 md:p-7 transition-all duration-500 " +
        (dimmed
          ? "border-saiyan-white/[0.05]"
          : "border-energy-yellow/25 shadow-[0_0_80px_-10px_rgba(255,214,10,0.45),0_40px_80px_-20px_rgba(0,0,0,0.9)]")
      }
    >
      {/* Subtle inner top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-energy-yellow/30 to-transparent" />

      <div className="flex items-start gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-bold text-navy-deep ring-2 ring-energy-yellow/20"
          style={{ backgroundColor: review.color }}
        >
          {review.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-semibold leading-tight tracking-tight text-saiyan-white">
            {review.name}
          </div>
          <div className="mt-0.5 text-[12.5px] text-saiyan-white/45">
            {review.reviewCount} recenzji · {review.date}
          </div>
        </div>
        <GoogleLogo className="mt-0.5 h-5 w-5 shrink-0" />
      </div>

      <div className="mt-4">
        <StarRating size="md" />
      </div>

      <div className="mt-4 border-t border-saiyan-white/[0.06] pt-4">
        <p className="text-[15px] leading-[1.65] text-saiyan-white/75">
          {review.parts.map((p, i) =>
            p.bold ? (
              <strong key={i} className="font-semibold text-energy-yellow">
                {p.text}
              </strong>
            ) : (
              <span key={i}>{p.text}</span>
            ),
          )}
        </p>
      </div>
    </div>
  );
}

function ArrowButton({
  dir,
  onClick,
  size = "lg",
}: {
  dir: "left" | "right";
  onClick: () => void;
  size?: "sm" | "lg";
}) {
  const dim = size === "lg" ? "h-14 w-14" : "h-11 w-11";
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Poprzednia opinia" : "Następna opinia"}
      className={
        `group/arrow relative flex ${dim} shrink-0 items-center justify-center rounded-full ` +
        "bg-gradient-to-br from-energy-yellow via-[#F59E0B] to-saiyan-blue p-[1.5px] " +
        "shadow-[0_8px_30px_-8px_rgba(255,214,10,0.55)] transition-transform duration-300 hover:scale-110 active:scale-95"
      }
    >
      <span className="flex h-full w-full items-center justify-center rounded-full bg-navy-deep transition-colors duration-300 group-hover/arrow:bg-[#0d1330]">
        {dir === "left" ? (
          <ChevronLeft className="h-6 w-6 text-energy-yellow" />
        ) : (
          <ChevronRight className="h-6 w-6 text-energy-yellow" />
        )}
      </span>
    </button>
  );
}

function ProgressBar({
  count,
  active,
  paused,
  onSelect,
}: {
  count: number;
  active: number;
  paused: boolean;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="relative mt-10 flex flex-col items-center gap-3 px-2 sm:mt-10 sm:block sm:flex-row">
      <div className="flex items-center justify-center gap-1.5 flex-wrap">
        {Array.from({ length: count }).map((_, i) => {
          const isActive = i === active;
          const isPast = i < active;
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              aria-label={`Opinia ${i + 1} z ${count}`}
              className="group/dot relative h-1.5 w-6 sm:w-8 overflow-hidden rounded-full bg-saiyan-white/10 transition-all hover:bg-saiyan-white/20"
            >
              {isPast && (
                <span className="absolute inset-0 bg-gradient-to-r from-energy-yellow to-saiyan-blue" />
              )}
              {isActive && (
                <span
                  key={`${active}-${paused ? "p" : "r"}`}
                  className={
                    "absolute inset-y-0 left-0 bg-gradient-to-r from-energy-yellow to-saiyan-blue " +
                    (paused ? "w-1/2" : "animate-progress-fill")
                  }
                />
              )}
            </button>
          );
        })}
      </div>
      <div className="font-mono text-sm tabular-nums sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2">
        <span className="text-energy-yellow">{String(active + 1).padStart(2, "0")}</span>
        <span className="mx-1.5 text-saiyan-white/30">/</span>
        <span className="text-saiyan-white/50">{String(count).padStart(2, "0")}</span>
      </div>
    </div>
  );
}

/* ───────────────────────── DESKTOP COVERFLOW ───────────────────────── */

function ReviewsCoverflow({
  active,
  setActive,
  paused,
  setPaused,
}: {
  active: number;
  setActive: (n: number | ((p: number) => number)) => void;
  paused: boolean;
  setPaused: (b: boolean) => void;
}) {
  const n = REVIEWS.length;
  const prev = () => setActive((p) => (p - 1 + n) % n);
  const next = () => setActive((p) => (p + 1) % n);

  return (
    <div
      className="relative mt-12 hidden lg:block"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative left-1/2 h-[600px] w-screen -translate-x-1/2 overflow-hidden perspective-1400">
        <div className="preserve-3d relative h-full w-full">
          {REVIEWS.map((review, i) => {
            let offset = i - active;
            if (offset > n / 2) offset -= n;
            if (offset < -n / 2) offset += n;

            const abs = Math.abs(offset);
            const visible = abs <= 1;
            const isCenter = offset === 0;

            const translateX = offset * 560;
            const rotateY = offset * -14;
            const translateZ = isCenter ? 0 : -220;
            const scale = isCenter ? 1 : 0.78;
            const opacity = isCenter ? 1 : visible ? 0.35 : 0;

            return (
              <div
                key={review.name}
                className="absolute left-1/2 top-1/2 w-[640px] transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform: `translate3d(-50%, -50%, 0) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  pointerEvents: visible ? "auto" : "none",
                  zIndex: isCenter ? 30 : 20 - abs,
                  backfaceVisibility: "hidden",
                  WebkitFontSmoothing: "antialiased",
                  willChange: "transform",
                }}
                onClick={() => !isCenter && setActive(i)}
                role={isCenter ? undefined : "button"}
                aria-hidden={!visible}
              >
                <div className={isCenter ? "" : "cursor-pointer"}>
                  <ReviewCard review={review} dimmed={!isCenter} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Arrows absolutely positioned — never affect card centering */}
        <div className="absolute left-2 top-1/2 z-40 -translate-y-1/2">
          <ArrowButton dir="left" onClick={prev} />
        </div>
        <div className="absolute right-2 top-1/2 z-40 -translate-y-1/2">
          <ArrowButton dir="right" onClick={next} />
        </div>
      </div>


      <ProgressBar count={n} active={active} paused={paused} onSelect={(i) => setActive(i)} />
    </div>
  );
}

/* ───────────────────────── MOBILE / TABLET CAROUSEL ───────────────────────── */

function ReviewsCarousel({
  active,
  setActive,
  paused,
  setPaused,
}: {
  active: number;
  setActive: (n: number | ((p: number) => number)) => void;
  paused: boolean;
  setPaused: (b: boolean) => void;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const isProgrammatic = useRef(false);
  const n = REVIEWS.length;

  // observe which card is centered (only when user is scrolling)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammatic.current) return;
        let bestIdx = -1;
        let bestRatio = 0;
        entries.forEach((e) => {
          const idx = Number((e.target as HTMLElement).dataset.idx);
          if (e.intersectionRatio > bestRatio) {
            bestRatio = e.intersectionRatio;
            bestIdx = idx;
          }
        });
        if (bestIdx >= 0 && bestRatio > 0.6) setActive(bestIdx);
      },
      { root: track, threshold: [0.6, 0.9] },
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [setActive]);

  // sync horizontal scroll within the track only — never affect page scroll
  useEffect(() => {
    const track = trackRef.current;
    const el = cardRefs.current[active];
    if (!track || !el) return;
    isProgrammatic.current = true;
    const left = el.offsetLeft - (track.clientWidth - el.clientWidth) / 2;
    track.scrollTo({ left, behavior: "smooth" });
    const t = setTimeout(() => {
      isProgrammatic.current = false;
    }, 700);
    return () => clearTimeout(t);
  }, [active]);

  const prev = () => setActive((p) => (p - 1 + n) % n);
  const next = () => setActive((p) => (p + 1) % n);

  return (
    <div
      className="relative mt-10 lg:hidden"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div className="flex items-center gap-3">
        <div className="hidden sm:block">
          <ArrowButton dir="left" onClick={prev} size="sm" />
        </div>

        <div
          ref={trackRef}
          className="scrollbar-hide -mx-5 flex flex-1 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 sm:mx-0 sm:px-0"
        >
          {REVIEWS.map((review, i) => {
            const isActive = i === active;
            return (
              <div
                key={review.name}
                ref={(el) => { cardRefs.current[i] = el; }}
                data-idx={i}
                className={
                  "snap-center shrink-0 w-[88%] sm:w-[65%] transition-opacity duration-500 " +
                  (isActive ? "opacity-100" : "opacity-80")
                }
              >
                <ReviewCard review={review} dimmed={!isActive} />
              </div>
            );
          })}
        </div>

        <div className="hidden sm:block">
          <ArrowButton dir="right" onClick={next} size="sm" />
        </div>
      </div>

      <ProgressBar count={n} active={active} paused={paused} onSelect={(i) => setActive(i)} />
    </div>
  );
}

/* ───────────────────────── SECTION ───────────────────────── */

export default function ReviewsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = REVIEWS.length;

  // auto-advance
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setActive((p) => (p + 1) % n), AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [active, paused, n]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setActive((p) => (p - 1 + n) % n);
      if (e.key === "ArrowRight") setActive((p) => (p + 1) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [n]);

  return (
    <section
      id="opinie"
      className="relative isolate overflow-hidden pt-4 pb-20 md:pt-6 md:pb-28"
      style={{
        background:
          "linear-gradient(180deg, #060a1a 0%, #0a1230 50%, #060a1a 100%)",
      }}
    >
      {/* Dome glow background (uploaded asset) */}
      <img
        src={glowAsset.url}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 w-[140%] max-w-none -translate-x-1/2 select-none opacity-90 mix-blend-screen md:w-[110%]"
      />

      {/* Top divider */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,214,10,0.6) 50%, transparent 100%)",
        }}
      />

      {/* Bottom fade — clean transition to next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-[5]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, #060a1a 60%, #060a1a 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px z-[6]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,214,10,0.55) 50%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] z-[6] blur-[3px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,214,10,0.35) 50%, transparent 100%)",
        }}
      />


      <div className="relative z-10 mx-auto max-w-[1600px] px-5 md:px-6">
        {/* Header */}
        <div className="relative text-center">



          <div className="relative">
            <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-energy-yellow md:text-sm">
              <span className="h-px w-8 bg-energy-yellow/40" />
              Opinie z Google
              <span className="h-px w-8 bg-energy-yellow/40" />
            </p>
            <h2
              className="mt-4 bg-gradient-to-b from-[#FFE873] via-[#FFD60A] to-[#F59E0B] bg-clip-text font-display text-[40px] font-black uppercase leading-[1.02] tracking-tight text-transparent sm:text-6xl md:text-7xl lg:text-8xl"
              style={{
                filter:
                  "drop-shadow(0 0 40px rgba(255,214,10,0.35)) drop-shadow(0 0 80px rgba(30,64,255,0.2))",
              }}
            >
              Co mówią osoby<br className="sm:hidden" /> które tam były?
            </h2>
            <div className="mt-6 flex flex-col items-center justify-center gap-1.5">
              <div className="flex items-center gap-3">
                <StarRating filled={5} size="md" />
                <span className="text-base font-bold tracking-wide text-energy-yellow md:text-lg">
                  4.7 NA GOOGLE
                </span>
              </div>
              <p className="text-xs text-saiyan-white/45 md:text-sm">
                Na podstawie 127 opinii
              </p>
            </div>
          </div>
        </div>




        {/* Carousels */}
        <ReviewsCoverflow
          active={active}
          setActive={setActive}
          paused={paused}
          setPaused={setPaused}
        />
        <ReviewsCarousel
          active={active}
          setActive={setActive}
          paused={paused}
          setPaused={setPaused}
        />
      </div>
    </section>
  );
}
