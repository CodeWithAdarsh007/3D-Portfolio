import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useDeskTransition } from "../../context/TransitionContext";
import { deskObjects } from "../../data/portfolioContent";
import { getAccent } from "../../lib/accents";
import {
  ChipObject, EnvelopeObject, FolderObject, IdCardObject, LaptopObject,
  MonitorObject, NotebookObject, TrophyObject,
} from "./objects";

const META = Object.fromEntries(deskObjects.map((o) => [o.id, o]));

const ACCENT = {
  monitor: "blue",
  laptop: "tangerine",
  chip: "lavender",
  notebook: "leaf",
  folder: "sunshine",
  idcard: "coral",
  trophy: "sunshine",
  envelope: "turquoise",
};

const GLYPH = {
  monitor: { vb: "-150 -262 300 272", C: MonitorObject },
  laptop: { vb: "-125 -150 250 160", C: LaptopObject },
  chip: { vb: "-60 -105 120 115", C: ChipObject },
  notebook: { vb: "-95 -70 190 80", C: NotebookObject },
  folder: { vb: "-75 -90 150 100", C: FolderObject },
  idcard: { vb: "-40 -8 80 158", C: IdCardObject },
  trophy: { vb: "-48 -112 96 122", C: TrophyObject },
  envelope: { vb: "-65 -80 130 90", C: EnvelopeObject },
};

/**
 * Cinematic desk navigation, driven by animation completion callbacks:
 *   idle → pressed/lift (0.40s) → object-opening (0.30s, flood expands)
 *   → navigate the instant the opening completes → page-reveal (0.24s)
 * No setTimeout postpones the route change; a safety net only exists to
 * recover if a completion callback is ever missed.
 */
// Dev-only inspection hook: ?slowmo=N stretches the sequence for frame capture.
const SLOW = import.meta.env.DEV
  ? Number(new URLSearchParams(window.location.search).get("slowmo")) || 1
  : 1;

export default function ObjectTransition() {
  const { transition, end } = useDeskTransition();
  const navigate = useNavigate();
  const [stage, setStage] = useState("lift");
  const navigated = useRef(false);
  const safety = useRef(null);

  useEffect(() => {
    if (!transition) return undefined;
    navigated.current = false;
    setStage("lift");
    safety.current = window.setTimeout(() => {
      if (!navigated.current) {
        navigated.current = true;
        navigate(transition.to);
      }
      end();
    }, 3000 * SLOW);
    return () => window.clearTimeout(safety.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transition?.key]);

  if (!transition) return null;

  const { id, rect, to } = transition;
  const glyph = GLYPH[id] || GLYPH.monitor;
  const field = getAccent(ACCENT[id] || "blue").field;
  const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const cy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
  const dx = window.innerWidth / 2 - cx;
  const dy = window.innerHeight * 0.52 - cy;
  const Glyph = glyph.C;

  const openDone = () => {
    if (stage !== "open" || navigated.current) return;
    navigated.current = true;
    navigate(to);
    setStage("reveal");
  };

  return (
    <div className="fixed inset-0 z-[90]" aria-hidden="true">
      {/* the room dims behind the lifted object */}
      <motion.div
        className="absolute inset-0 bg-plum/55"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === "reveal" ? 0 : 1 }}
        transition={{ duration: 0.22 * SLOW }}
      />

      {/* accent flood: expands while the object opens, dissolves into the page */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 55%, color-mix(in srgb, ${field} 62%, #ffffff) 0%, ${field} 46%, color-mix(in srgb, ${field} 55%, var(--plum)) 100%)`,
        }}
        initial={{ clipPath: "circle(0% at 50% 55%)", opacity: 1 }}
        animate={{
          clipPath: stage === "lift" ? "circle(0% at 50% 55%)" : "circle(140% at 50% 55%)",
          opacity: stage === "reveal" ? 0 : 1,
        }}
        transition={{
          clipPath: { duration: 0.3 * SLOW, ease: "easeIn" },
          opacity: { duration: 0.24 * SLOW, ease: "easeOut" },
        }}
        onAnimationComplete={openDone}
      />

      {/* the object: pressed, lifted toward the camera, then opened */}
      <motion.div
        className="absolute w-[min(46vh,420px)]"
        style={{ left: cx, top: cy, translateX: "-50%", translateY: "-50%" }}
        initial={{ x: 0, y: 0, scale: 0.6, rotate: 0, opacity: 1 }}
        animate={
          stage === "lift"
            ? { x: [0, 0, dx], y: [0, 6, dy], scale: [0.6, 0.54, 1.22], rotate: [0, -2.5, 2], opacity: 1 }
            : stage === "open"
              ? { x: dx, y: dy, scale: 1.42, rotate: 0, opacity: 1 }
              : { x: dx, y: dy, scale: 1.8, rotate: 0, opacity: 0 }
        }
        transition={
          stage === "lift"
            ? { duration: 0.4 * SLOW, times: [0, 0.3, 1], ease: [0.22, 1, 0.36, 1] }
            : { duration: (stage === "open" ? 0.3 : 0.24) * SLOW, ease: "easeOut" }
        }
        onAnimationComplete={() => {
          if (stage === "lift") setStage("open");
          else if (stage === "reveal") end();
        }}
      >
        <motion.div
          className="absolute inset-0 -z-10 rounded-full"
          style={{ background: `radial-gradient(circle, ${field} 0%, transparent 70%)` }}
          animate={{ opacity: stage === "lift" ? 0.25 : 0.6, scale: stage === "lift" ? 1 : 1.5 }}
          transition={{ duration: 0.3 * SLOW }}
        />
        <svg viewBox={glyph.vb} className="h-auto w-full drop-shadow-2xl">
          <Glyph active={stage !== "lift"} screenState="ready" introDone />
        </svg>
        <motion.p
          className="mt-2 text-center font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white"
          animate={{ opacity: stage === "open" ? 1 : 0 }}
          transition={{ duration: 0.18 * SLOW }}
        >
          {META[id]?.label}
        </motion.p>
      </motion.div>
    </div>
  );
}