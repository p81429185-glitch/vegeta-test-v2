import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";
import {
  EASE,
  DUR,
  reducedRevealVariants,
  revealVariants,
} from "./variants";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  amount?: number;
  /** When true, the element does not act as its own viewport trigger.
   * Use this for items inside a <RevealGroup> so the parent orchestrates. */
  asItem?: boolean;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "variants" | "initial" | "animate" | "whileInView" | "viewport">;

/**
 * Reveal — standard intro for any block.
 * - Animates opacity + y + light blur on enter once.
 * - Respects prefers-reduced-motion (degrades to opacity only).
 * - When asItem, lets a parent <RevealGroup> drive timing.
 */
export function Reveal({
  children,
  delay = 0,
  amount = 0.2,
  asItem = false,
  className,
  ...rest
}: RevealProps) {
  const prefersReduced = useReducedMotion();
  const variants = prefersReduced ? reducedRevealVariants : revealVariants;

  // Custom transition with optional delay
  const transition = prefersReduced
    ? { duration: 0.2, ease: "linear" as const, delay }
    : { duration: DUR.base, ease: EASE, delay };


  if (asItem) {
    return (
      <motion.div
        className={className}
        variants={variants}
        transition={transition}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin: "0px 0px -10% 0px" }}
      transition={transition}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
