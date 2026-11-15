import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import useMediaQuery from "./useMediaQuery";

const SEEN_KEY = "tdw-intro-seen";

function hasSeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* session-only fallback */
  }
}

/**
 * Intro choreography (~3.6s):
 *   0 room appears · 1 sunlight + garland · 2 desk & objects assemble
 *   3 monitor boots · 4 terminal greeting types · 5 workspace ready
 * Skippable, replayable on demand, never auto-replayed on navigation,
 * instant under prefers-reduced-motion, shortened on mobile.
 */
export default function useIntro() {
  const reduce = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [step, setStep] = useState(() => (hasSeen() || reduce ? 5 : 0));
  const timers = useRef([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const start = useCallback(() => {
    clearTimers();
    if (reduce) {
      setStep(5);
      markSeen();
      return;
    }
    const schedule = isMobile
      ? [[0, 0], [300, 1], [600, 2], [1100, 4], [1900, 5]]
      : [[0, 0], [400, 1], [800, 2], [1700, 3], [2600, 4], [3600, 5]];
    schedule.forEach(([t, s]) => {
      timers.current.push(window.setTimeout(() => setStep(s), t));
    });
  }, [clearTimers, isMobile, reduce]);

  useEffect(() => {
    if (!hasSeen() && !reduce) start();
    else markSeen();
    return clearTimers;
  }, [start, reduce, clearTimers]);

  useEffect(() => {
    if (step >= 5) markSeen();
  }, [step]);

  const skip = useCallback(() => {
    clearTimers();
    setStep(5);
    markSeen();
  }, [clearTimers]);

  const replay = useCallback(() => {
    clearTimers();
    setStep(0);
    start();
  }, [clearTimers, start]);

  return {
    step,
    introDone: step >= 5,
    skip,
    replay,
    screenState: step < 3 ? "off" : step === 3 ? "boot" : "ready",
  };
}