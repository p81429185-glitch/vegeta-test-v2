import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/motion/variants";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 3.5 2.5 11l5.5 2 2 6 3.5-4 5 4 3-15.5z" />
    <path d="m10 13 8-6.5L11 14" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

type SocialItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const SOCIALS: SocialItem[] = [
  { label: "Instagram", href: "https://www.instagram.com/bukmacherkazvegeta/", icon: <InstagramIcon /> },
  { label: "X", href: "https://x.com/betwithvegeta?lang=pl", icon: <XIcon /> },
  { label: "Telegram", href: "https://t.me/+XXotHR56-BhhYzA0", icon: <TelegramIcon /> },
  { label: "Facebook", href: "https://www.facebook.com/p/Vegeta-Typuje-100076257271034/", icon: <FacebookIcon /> },
];

export function FloatingSocials() {
  const [scrollY, setScrollY] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const translateX = Math.min(scrollY * 1.2, 400);
  const opacity = Math.max(0, 1 - scrollY / 300);

  return (
    <motion.div
      className="fixed right-4 top-[66px] z-40 hidden flex-col gap-[10px] transition-transform duration-200 ease-out md:flex"
      aria-label="Social media"
      style={{
        transform: `translateX(${translateX}px)`,
        opacity,
        pointerEvents: opacity < 0.1 ? "none" : undefined,
      }}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : 0.06,
            delayChildren: reduced ? 0 : 0.6,
          },
        },
      }}
    >
      {SOCIALS.map((s) => (
        <motion.a
          key={s.label}
          href={s.href}
          title={s.label}
          aria-label={s.label}
          target="_blank"
          rel="noopener noreferrer"
          data-track={`footer-${s.label.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "")}`}
          data-track-label={s.label}
          className="liquid-glass flex h-[52px] w-[52px] items-center justify-center rounded-[14px] text-saiyan-white/85 transition-all duration-200 hover:scale-105 hover:bg-white/10 hover:text-energy-yellow"
          variants={{
            hidden: reduced ? { opacity: 0 } : { opacity: 0, x: 40 },
            visible: reduced
              ? { opacity: 1, transition: { duration: 0.2 } }
              : { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
          }}
        >
          {s.icon}
        </motion.a>
      ))}
    </motion.div>
  );
}
