"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram, Send, Facebook, Mail, ArrowUp, ShieldAlert, ChevronDown, Building2 } from "lucide-react";
import logoVegeta from "@/assets/logo-vegeta.png";

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
.vf-wrap { -webkit-font-smoothing: antialiased; }
@keyframes vf-shine { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes vf-heartbeat { 0%,100% { transform: scale(1); } 15%,45% { transform: scale(1.25); } 30% { transform: scale(1); } }
@keyframes vf-pulse-ring { 0% { box-shadow: 0 0 0 0 hsl(var(--primary) / 0.5); } 100% { box-shadow: 0 0 0 20px hsl(var(--primary) / 0); } }
.vf-shine { background: linear-gradient(110deg, transparent 30%, hsl(var(--primary-foreground) / 0.35) 50%, transparent 70%); background-size: 200% 100%; animation: vf-shine 3s linear infinite; }
.vf-heartbeat { animation: vf-heartbeat 1.6s cubic-bezier(0.25,1,0.5,1) infinite; }
.vf-grid { background-size: 48px 48px; background-image: linear-gradient(to right, hsl(var(--foreground) / 0.04) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground) / 0.04) 1px, transparent 1px); mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%); -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%); }
.vf-giant { font-size: clamp(120px, 22vw, 360px); line-height: 0.8; font-weight: 900; letter-spacing: -0.06em; color: transparent; -webkit-text-stroke: 1px hsl(var(--primary) / 0.18); background: linear-gradient(180deg, hsl(var(--primary) / 0.12) 0%, transparent 70%); -webkit-background-clip: text; background-clip: text; }
.vf-cta-glow { box-shadow: 0 20px 60px -15px hsl(var(--primary) / 0.6), inset 0 1px 0 hsl(var(--primary-foreground) / 0.4); }
.vf-link { position: relative; transition: color .25s ease; }
.vf-link::after { content: ''; position: absolute; left: 0; bottom: -2px; width: 100%; height: 1px; background: hsl(var(--primary)); transform: scaleX(0); transform-origin: right; transition: transform .35s cubic-bezier(.7,0,.3,1); }
.vf-link:hover { color: hsl(var(--primary)); }
.vf-link:hover::after { transform: scaleX(1); transform-origin: left; }
.vf-social { transition: all .3s cubic-bezier(.7,0,.3,1); }
.vf-social:hover { color: hsl(var(--primary)); transform: translateY(-3px); border-color: hsl(var(--primary) / 0.5); background: hsl(var(--primary) / 0.08); }
.vf-pulse { animation: vf-pulse-ring 2s cubic-bezier(0.66, 0, 0, 1) infinite; }
.vf-collapse { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .5s cubic-bezier(.7,0,.3,1), opacity .35s ease, margin-top .35s ease; opacity: 0; margin-top: 0; }
.vf-collapse > div { overflow: hidden; }
.vf-collapse.open { grid-template-rows: 1fr; opacity: 1; margin-top: 1rem; }
`;

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const [companyOpen, setCompanyOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(giantTextRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: { trigger: wrapperRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <footer ref={wrapperRef} className="vf-wrap relative w-full overflow-hidden bg-background text-foreground border-t border-primary/20">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[300px] bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.18),transparent_70%)]" />
        <div className="vf-grid absolute inset-0 pointer-events-none" />

        {/* CTA STRIP */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16">
          <div className="vf-cta-glow relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-yellow-400 to-primary p-8 md:p-12">
            <div className="vf-shine absolute inset-0 pointer-events-none" />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-4xl font-black text-primary-foreground tracking-tight">
                  Gotowy, by zacząć grać jak VEGETA?
                </h3>
                <p className="mt-2 text-primary-foreground/80 text-sm md:text-base font-medium">
                  Wybierz sprawdzone miejsce już dziś i przestań w końcu martwić się o tipsera.
                </p>
              </div>
              <a
                href="#pricing"
                className="group inline-flex items-center gap-2 rounded-full bg-background px-8 py-4 text-sm md:text-base font-bold text-foreground hover:bg-background/90 transition-all hover:scale-105 shrink-0 shadow-xl"
              >
                Dołącz do GOLD
                <ArrowUp className="w-4 h-4 rotate-45 group-hover:rotate-90 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <img src={logoVegeta} alt="Vegeta Tips" className="w-44 h-44 object-contain" />
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Premium typy bukmacherskie od najskuteczniejszego polskiego tipstera.
              Transparentne wyniki, długoterminowy profit, społeczność na poziomie.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: "https://www.instagram.com/bukmacherkazvegeta/", label: "Instagram" },
                { icon: XIcon, href: "https://x.com/betwithvegeta?lang=pl", label: "X" },
                { icon: Send, href: "https://t.me/+XXotHR56-BhhYzA0", label: "Telegram" },
                { icon: Facebook, href: "https://www.facebook.com/p/Vegeta-Typuje-100076257271034/", label: "Facebook" },
                { icon: Mail, href: "mailto:kontakt@vegeta-typuje.pl", label: "E-mail" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="vf-social w-11 h-11 rounded-full border border-border/60 bg-card/40 flex items-center justify-center text-muted-foreground"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Produkt */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold text-primary mb-5">Produkt</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#pricing" className="vf-link">Cennik</a></li>
              <li><a href="#opinie" className="vf-link">Opinie</a></li>
              <li><a href="#jak-zaczac" className="vf-link">Jak zacząć</a></li>
              <li><a href="#statystyki" className="vf-link">Statystyki</a></li>

            </ul>
          </div>

          {/* Wsparcie */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold text-primary mb-5">Wsparcie</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#faq" className="vf-link">FAQ</a></li>
              <li><a href="/regulamin" className="vf-link">Regulamin</a></li>
              <li><a href="/polityka-prywatnosci" className="vf-link">Polityka prywatności</a></li>
            </ul>
          </div>

          {/* Dane firmy — collapsible */}
          <div className="lg:col-span-4">
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold text-primary mb-5">Dane firmy</h4>
            <div className="rounded-2xl border border-border/60 bg-card/40 overflow-hidden">
              <button
                type="button"
                onClick={() => setCompanyOpen((v) => !v)}
                aria-expanded={companyOpen}
                aria-controls="vf-company-data"
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-card/70 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground">Dane firmy</div>
                    <div className="text-xs text-muted-foreground">
                      {companyOpen ? "Kliknij, aby zwinąć" : "Kliknij, aby rozwinąć"}
                    </div>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground group-hover:text-primary transition-transform duration-500 ${companyOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div id="vf-company-data" className={`vf-collapse px-5 ${companyOpen ? "open pb-5" : ""}`}>
                <div>
                  <div className="pt-1 border-t border-border/60 text-sm text-muted-foreground leading-relaxed space-y-3">
                    <p className="pt-4">Sklep Internetowy prowadzony jest przez:</p>
                    <p className="font-bold text-foreground">JANIK Daniel Janicki</p>
                    <p>
                      Adres wykonywania działalności:<br />
                      Jarosławiec 400/6, 22-424 Sitno
                    </p>
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div>
                        <div className="text-muted-foreground/60 uppercase tracking-wider text-[10px]">NIP</div>
                        <div className="font-mono font-semibold text-foreground">9222825711</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground/60 uppercase tracking-wider text-[10px]">REGON</div>
                        <div className="font-mono font-semibold text-foreground">522597577</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground/60 uppercase tracking-wider text-[10px]">E-mail</div>
                      <a href="mailto:kontakt@vegeta-typuje.pl" className="font-semibold vf-link text-foreground">
                        kontakt@vegeta-typuje.pl
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 18+ WARNING */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-12">
          <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-5 md:p-6 flex flex-col sm:flex-row items-start gap-5">
            <div className="shrink-0 w-20 h-20 rounded-xl bg-primary flex flex-col items-center justify-center text-primary-foreground relative">
              <div className="absolute inset-2 rounded-full border-[3px] border-destructive" />
              <span className="relative font-black text-2xl leading-none">18+</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="w-4 h-4 text-destructive" />
                <span className="text-destructive font-bold uppercase tracking-wider text-xs">Uwaga!</span>
              </div>
              <div className="h-px bg-destructive/40 mb-3 w-full" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Hazard stwarza ryzyko problemów finansowych oraz zdrowotnych. Strona przeznaczona jest dla osób
                powyżej 18 roku życia. Graj odpowiedzialnie! Serwis Vegeta Typuje ma charakter informacyjny,
                nie zachęcamy do uprawiania hazardu.
              </p>
            </div>
          </div>
        </div>

        {/* GIANT TEXT */}
        <div ref={giantTextRef} className="vf-giant relative z-0 text-center select-none pointer-events-none -mb-8 md:-mb-16">
          VEGETA
        </div>

        {/* BOTTOM BAR */}
        <div className="relative z-10 border-t border-border/40 bg-background/80 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-center">
            <div className="text-[11px] md:text-xs text-muted-foreground/80 font-medium tracking-wide text-center">
              © 2026 Vegeta Tips Wszelkie prawa zastrzeżone
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
