import { motion, useReducedMotion } from "motion/react";

/** Consistent page wrapper with enter/exit transition. */
export default function PageTransition({ children, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.main
      id="main-content"
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`flex-1 ${className}`}
    >
      {children}
    </motion.main>
  );
}