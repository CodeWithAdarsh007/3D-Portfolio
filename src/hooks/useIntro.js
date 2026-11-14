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
 * Intro choreography:
 *   step 0 — workspace arrival (wall + desk)
 *   step 1 — objects assemble
 *   step 2 — monitor boots with terminal lines
 *   step 3 — greeting types in
 *   step 4 — workspace ready, everything interactive
 *
 * Skippable at any moment, replayable on demand, never auto-replayed on
 * navigation (sessionStorage), instant under prefers-reduced-motion,
 * shortened on mobile.
 */
export default function useIntro() {
  const reduce = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [step, setStep] = useState(() => (hasSeen() || reduce ? 4 : 0));
  const timers = useRef([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const start = useCallback(() => {
    clearTimers();
    if (reduce) {
      setStep(4);
      markSeen();
      return;
    }
    const schedule = isMobile
      ? [[0, 0], [350, 1], [1000, 3], [1900, 4]]
      : [[0, 0], [450, 1], [1500, 2], [2500, 3], [3600, 4]];
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
    if (step >= 4) markSeen();
  }, [step]);

  const skip = useCallback(() => {
    clearTimers();
    setStep(4);
    markSeen();
  }, [clearTimers]);

  const replay = useCallback(() => {
    clearTimers();
    setStep(0);
    start();
  }, [clearTimers, start]);

  return {
    step,
    introDone: step >= 4,
    skip,
    replay,
    screenState: step < 2 ? "off" : step === 2 ? "boot" : "ready",
  };
}