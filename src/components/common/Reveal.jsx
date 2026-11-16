import { motion, useReducedMotion } from "motion/react";

/** Scroll-triggered reveal that fully respects prefers-reduced-motion. */
export default function Reveal({ as = "div", children, delay = 0, y = 22, className = "" }) {
  const reduce = useReducedMotion();
  const M = motion[as] || motion.div;
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}