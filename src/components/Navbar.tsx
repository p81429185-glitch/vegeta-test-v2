import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE } from "@/components/motion/variants";
import logoVegeta from "@/assets/logo-vegeta.png";

const NAV_LINKS = [
  { label: "Statystyki", href: "#statystyki" },
  { label: "Jak to działa", href: "#jak-zaczac" },
  { label: "Cennik", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;


function LogoMark({ onClick, className }: { onClick?: () => void; className?: string }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={cn("inline-flex items-center", className)}
      aria-label="Vegeta Typuje — strona główna"
    >
      <img
        src={logoVegeta}
        alt="Vegeta Typuje"
        className="h-9 w-auto object-contain drop-shadow-[0_2px_8px_rgba(255,214,10,0.25)]"
      />
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (!open) {
        if (y > lastY && y > 80) setHidden(true);
        else if (y < lastY) setHidden(false);
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <>
      <motion.header
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0.2 } : { duration: 0.6, ease: EASE, delay: 0.1 }}
        className={cn(
          "fixed inset-x-0 top-4 z-50 flex justify-center px-4 transition-transform duration-300 ease-out",
          hidden && !open && "-translate-y-[150%]",
        )}
        aria-label="Główna nawigacja"
      >

        <nav
          className={cn(
            "liquid-glass flex w-full max-w-[980px] items-center gap-2 rounded-full px-3 py-2 transition-all duration-300 md:w-auto",
            scrolled && "shadow-[0_12px_40px_rgba(0,0,0,0.45)]",
          )}
        >
          {/* Mobile-only logo inside pill */}
          <LogoMark className="pl-2 md:hidden" />

          {/* Center links — desktop */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative inline-flex items-center px-4 py-2 font-display text-sm font-medium text-saiyan-white/80 transition-colors hover:text-energy-yellow"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right CTAs — desktop */}
          <div className="hidden items-center gap-2 md:flex">
            <a
              href="/admin"
              data-track="navbar-login"
              data-track-label="Zaloguj się"
              className="rounded-full px-4 py-2 text-sm font-medium text-saiyan-white/80 transition-colors hover:bg-white/5 hover:text-saiyan-white"
            >
              Zaloguj się
            </a>
            <a
              href="#pricing"

              data-track="navbar-join"
              data-track-label="Dołącz teraz"
              className="inline-flex items-center justify-center rounded-full bg-energy-yellow px-5 py-2 text-sm font-semibold text-navy-deep transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
            >
              Dołącz teraz
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full text-saiyan-white hover:bg-white/5 md:hidden"
            aria-label="Otwórz menu"
            aria-expanded={open}
            aria-controls="mobile-drawer"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile full-screen drawer */}
      <div
        id="mobile-drawer"
        className={cn(
          "fixed inset-0 z-[60] transition-opacity duration-200 md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-navy-deep/95 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        />
        <div className="relative flex h-full flex-col px-5 pb-10 pt-4 sm:px-8">
          <div className="flex h-16 items-center justify-between">
            <LogoMark onClick={() => setOpen(false)} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-saiyan-white hover:bg-saiyan-white/5"
              aria-label="Zamknij menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <ul className="mt-10 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-4 font-display text-2xl font-semibold text-saiyan-white transition-colors hover:bg-saiyan-white/5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-3">
            <a
              href="/admin"
              onClick={() => setOpen(false)}
              className="inline-flex h-12 items-center justify-center rounded-xl border border-saiyan-white/15 px-4 text-sm font-medium text-saiyan-white transition-colors hover:bg-saiyan-white/5"
            >
              Zaloguj się
            </a>
            <a
              href="#pricing"

              onClick={() => setOpen(false)}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-energy-yellow px-4 text-base font-semibold text-navy-deep shadow-glow-yellow"
            >
              Dołącz teraz
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
