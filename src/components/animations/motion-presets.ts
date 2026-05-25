import type { Variants, Transition } from "framer-motion";

const defaultTransition: Transition = {
  ease: [0.22, 1, 0.36, 1] as any,
  duration: 0.85,
};

export const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { ...defaultTransition, delay } },
});

export const textReveal = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { ...defaultTransition, delay, duration: 0.95 } },
});

export const staggerReveal: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

export const hoverGlow = {
  whileHover: {
    scale: 1.01,
    boxShadow: "0 25px 90px rgba(255, 140, 64, 0.18)",
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as any },
  },
};
