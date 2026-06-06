import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "@/components/motion/variants";
import logoVegeta from "@/assets/logo-vegeta.png";

export function FloatingLogo() {
  const [scrollY, setScrollY] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const translateX = -Math.min(scrollY * 1.2, 400);
  const opacity = Math.max(0, 1 - scrollY / 300);

  return (
    <motion.div
      className="fixed left-4 top-2 z-50 hidden md:block"
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={reduced ? { duration: 0.2 } : { duration: 0.7, ease: EASE, delay: 0.3 }}
      style={{ pointerEvents: opacity < 0.1 ? "none" : undefined }}
    >
      <Link
        to="/"
        aria-label="Vegeta Typuje — strona główna"
        className="block transition-transform duration-200 ease-out hover:scale-[1.03]"
        style={{
          transform: `translateX(${translateX}px)`,
          opacity,
        }}
      >
        <img
          src={logoVegeta}
          alt="Vegeta Typuje"
          className="h-28 w-auto object-contain drop-shadow-[0_6px_24px_rgba(255,214,10,0.35)]"
        />
      </Link>
    </motion.div>
  );
}
