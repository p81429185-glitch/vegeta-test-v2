import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";
import { STAGGER, groupVariants } from "./variants";

type RevealGroupProps = {
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
  amount?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "variants" | "initial" | "animate" | "whileInView" | "viewport">;

/**
 * RevealGroup — orchestrates a sequence of <Reveal asItem /> children
 * with a single IntersectionObserver. Cheap and consistent.
 */
export function RevealGroup({
  children,
  stagger = STAGGER.base,
  delayChildren = 0,
  amount = 0.15,
  className,
  ...rest
}: RevealGroupProps) {
  const prefersReduced = useReducedMotion();
  const variants = groupVariants(prefersReduced ? 0 : stagger, prefersReduced ? 0 : delayChildren);

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin: "0px 0px -10% 0px" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
