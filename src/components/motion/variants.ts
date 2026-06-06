import type { Variants, Transition } from "framer-motion";

// One language of motion across the whole landing.
// Expo-out curve, calm timing, modest stagger.
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DUR = {
  fast: 0.4,
  base: 0.6,
  slow: 0.9,
} as const;

export const STAGGER = {
  tight: 0.04,
  base: 0.07,
  loose: 0.1,
} as const;

export const baseTransition: Transition = {
  duration: DUR.base,
  ease: EASE,
};

// Standard entrance: opacity + y + tiny blur.
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: baseTransition,
  },
};

// Reduced-motion fallback: opacity only.
export const reducedRevealVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: "linear" } },
};

export const groupVariants = (stagger: number = STAGGER.base, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});
