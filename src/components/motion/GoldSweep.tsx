import { motion, useReducedMotion } from "framer-motion";

type GoldSweepProps = {
  delay?: number;
  className?: string;
};

/**
 * GoldSweep — single-shot golden shimmer that pulls left-to-right
 * across its parent. Use absolutely-positioned over a heading or card.
 * GPU-friendly (transform + opacity only).
 */
export function GoldSweep({ delay = 0.15, className }: GoldSweepProps) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <motion.span
      aria-hidden
      className={
        "pointer-events-none absolute inset-0 overflow-hidden " +
        (className ?? "")
      }
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.2, delay }}
    >
      <motion.span
        className="absolute inset-y-0 -left-1/3 block w-1/3"
        style={{
          background:
            "linear-gradient(100deg, transparent 0%, rgba(255,214,10,0.0) 30%, rgba(255,214,10,0.55) 50%, rgba(255,214,10,0.0) 70%, transparent 100%)",
          filter: "blur(6px)",
          mixBlendMode: "screen",
        }}
        initial={{ x: "0%" }}
        whileInView={{ x: "450%" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      />
    </motion.span>
  );
}
