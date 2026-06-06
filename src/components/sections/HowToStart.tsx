import { useEffect, useRef, useState, type ReactNode } from "react";
import { HelpCircle, Package, CreditCard, Mail, Trophy } from "lucide-react";

const hl = (text: string) => <span className="font-semibold text-white">{text}</span>;

type Step = {
  number: number;
  icon: typeof Package;
  title: ReactNode;
  highlight?: boolean;
};

const steps: Step[] = [
  {
    number: 1,
    icon: Package,
    title: (
      <>
        Wybierz pakiet {hl("dopasowany")} do {hl("Twoich celów")}
      </>
    ),
  },
  {
    number: 2,
    icon: CreditCard,
    title: (
      <>
        Zainwestuj w pakiet i {hl("uzyskaj")} dostęp do {hl("analiz")}
      </>
    ),
  },
  {
    number: 3,
    icon: Mail,
    title: (
      <>
        {hl("Odbieraj i kopiuj")} analizy na {hl("mailu")} lub {hl("aplikacji")}
      </>
    ),
  },
  {
    number: 4,
    icon: Trophy,
    title: (
      <>
        {hl("Wykorzystaj")} analizy u {hl("swojego")} bukmachera
      </>
    ),
    highlight: true,
  },
];

const HowToStart = () => {
  const [visible, setVisible] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          steps.forEach((_, i) => setTimeout(() => setVisible((p) => [...p, i]), i * 150));
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="jak-zaczac"
      className="relative w-full overflow-hidden py-20 sm:py-28"
      style={{
        background: "linear-gradient(180deg, #060a1a 0%, #0a1230 50%, #060a1a 100%)",
      }}
    >
      {/* === Spotlight beam (top) — gold brand colors === */}
      {/* Thin glowing line */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,214,10,0.7) 50%, transparent 100%)",
          boxShadow: "0 0 12px rgba(255,214,10,0.5)",
        }}
      />
      {/* Trapezoid light beam */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "82%",
          height: "180px",
          clipPath: "polygon(12% 0, 88% 0, 100% 100%, 0 100%)",
          background: "linear-gradient(180deg, rgba(255,214,10,0.28) 0%, rgba(255,214,10,0.08) 55%, transparent 100%)",
        }}
      />
      {/* Soft diffused glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "70%",
          height: "260px",
          background: "radial-gradient(ellipse 60% 70% at 50% 0%, rgba(255,214,10,0.18) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* subtle background radial */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255,214,10,0.05) 0%, transparent 70%)",
        }}
      />

      <div ref={sectionRef} className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFD60A]/30 bg-[#FFD60A]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#FFD60A]">
            <HelpCircle className="h-3.5 w-3.5" />
            Jak to działa?
          </div>

          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Jak dokładnie{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #FFD60A 0%, #fff3a6 45%, #FFD60A 60%, #c9a800 100%)",
              }}
            >
              zacząć z nami grać?
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-400 md:text-base">
            Cały proces zajmuje {hl("kilka minut")} od zakupu pakietu po postawienie pierwszego, {hl("wartościowego")}{" "}
            zakładu.
          </p>
        </div>

        {/* Vertical stack of large cards */}
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isVisible = visible.includes(i);
            const isGlow = step.highlight;
            return (
              <div
                key={step.number}
                className={`group relative flex items-center gap-6 overflow-hidden rounded-2xl border bg-[hsl(222,20%,8%)]/60 p-8 backdrop-blur-sm sm:gap-10 sm:p-10 md:p-12 hover:-translate-y-1.5 motion-safe:hover:scale-[1.01] hover:shadow-[0_18px_50px_-12px_rgba(255,214,10,0.45),inset_0_1px_0_rgba(255,214,10,0.18)] ${
                  isGlow
                    ? "border-[#FFD60A]/60 animate-pulse-gold-glow"
                    : "border-white/10 hover:border-[#FFD60A]/55"
                }`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  transition:
                    "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease, box-shadow 0.5s ease",
                }}
              >
                {/* Gold tint overlay on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 100% at 0% 50%, rgba(255,214,10,0.10) 0%, transparent 60%)",
                  }}
                />
                {/* Diagonal gold sweep on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full motion-safe:group-hover:translate-x-full transition-transform duration-[900ms] ease-out"
                  style={{
                    background:
                      "linear-gradient(110deg, transparent 35%, rgba(255,214,10,0.18) 50%, transparent 65%)",
                  }}
                />

                {/* Big number watermark — left side */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-2 top-1/2 -translate-y-1/2 select-none leading-none transition-colors duration-500"
                  style={{
                    fontFamily: '"Sora", system-ui, sans-serif',
                    fontWeight: 900,
                    fontSize: "clamp(7rem, 14vw, 11rem)",
                    color: isGlow ? "rgba(255,214,10,0.12)" : "rgba(255,255,255,0.04)",
                    letterSpacing: "-0.05em",
                  }}
                >
                  <span className={isGlow ? "" : "group-hover:!text-[rgba(255,214,10,0.18)] transition-colors duration-500"}>
                    0{step.number}
                  </span>
                </span>

                {/* Icon */}
                <div
                  className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl transition-all duration-500 motion-safe:group-hover:scale-110 sm:h-20 sm:w-20 ${
                    isGlow
                      ? "bg-[#FFD60A]/20 shadow-[0_0_30px_rgba(255,214,10,0.45)]"
                      : "bg-[#FFD60A]/10 group-hover:bg-[#FFD60A]/20 group-hover:shadow-[0_0_28px_rgba(255,214,10,0.4)]"
                  }`}
                >
                  <Icon className={`h-8 w-8 transition-colors duration-500 sm:h-10 sm:w-10 ${isGlow ? "text-[#FFD60A]" : "text-[#FFD60A]/80 group-hover:text-[#FFD60A]"}`} />
                </div>

                {/* Text */}
                <div className="relative z-10 flex-1">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#FFD60A]/80 transition-colors duration-500 group-hover:text-[#FFD60A] sm:text-sm">
                    Krok {step.number}
                  </p>
                  <p className="text-xl leading-snug text-slate-200 sm:text-2xl md:text-3xl">{step.title}</p>
                </div>
              </div>
            );

          })}
        </div>
      </div>
    </section>
  );
};

export default HowToStart;
