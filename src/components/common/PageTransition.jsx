import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import usePageMeta from "../../hooks/usePageMeta";

export default function PageTransition({ children, className = "" }) {
  const { pathname, hash, key } = useLocation();
  const initialAddress = useRef(key === "default" ? pathname + hash : null);
  const main = useRef(null);
  const reduce = useReducedMotion();
  usePageMeta(pathname);

  useLayoutEffect(() => {
    if (!hash && initialAddress.current === pathname) return;
    initialAddress.current = null;
    const target = hash && document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView({ behavior: "instant" });
    else window.scrollTo({ top: 0, behavior: "instant" });

    if (!document.activeElement?.closest('[role="dialog"]')) {
      (target || main.current).focus({ preventScroll: true });
    }
  }, [pathname, hash]);

  return (
    <motion.main
      id="main-content"
      ref={main}
      tabIndex={-1}
      initial={reduce || pathname === "/" ? false : { opacity: 0.85, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={`flex-1 ${className}`}
    >
      {children}
    </motion.main>
  );
}
