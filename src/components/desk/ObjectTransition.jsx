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
 * Cinematic desk navigation overlay.
 *  0–120ms   tactile press
 *  120–450ms object lifts off the desk toward the viewer
 *  450–650ms object-specific activation (lid, pages, flap, sparkle…)
 *  650–850ms accent flood expands from the object
 *  850ms     route changes underneath the flood
 *  850–1080ms flood dissolves into the destination entrance
 */
// Dev-only inspection hook: ?slowmo stretches the sequence 4x for frame capture.
const SLOW = import.meta.env.DEV
  ? Number(new URLSearchParams(window.location.search).get("slowmo")) || 1
  : 1;

export default function ObjectTransition() {
  const { transition, end } = useDeskTransition();
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);
  const timers = useRef([]);

  useEffect(() => {
    if (!transition) return undefined;
    setStage(0);
    timers.current.forEach(clearTimeout);
    timers.current = [
      window.setTimeout(() => setStage(1), 430 * SLOW),
      window.setTimeout(() => setStage(2), 640 * SLOW),
      window.setTimeout(() => {
        navigate(transition.to);
        setStage(3);
      }, 850 * SLOW),
      window.setTimeout(() => end(), 1080 * SLOW),
    ];
    return () => timers.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transition?.key]);

  if (!transition) return null;

  const { id, rect } = transition;
  const glyph = GLYPH[id] || GLYPH.monitor;
  const field = getAccent(ACCENT[id] || "blue").field;
  const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const cy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
  const dx = window.innerWidth / 2 - cx;
  const dy = window.innerHeight * 0.52 - cy;
  const Glyph = glyph.C;

  return (
    <div className="fixed inset-0 z-[90]" aria-hidden="true">
      {/* desk dims behind the lifted object */}
      <motion.div
        className="absolute inset-0 bg-plum/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 1 && stage < 3 ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />

      {/* accent flood that becomes the destination reveal */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 55%, color-mix(in srgb, ${field} 62%, #ffffff) 0%, ${field} 46%, color-mix(in srgb, ${field} 55%, var(--plum)) 100%)`,
        }}
        initial={{ clipPath: "circle(0% at 50% 55%)", opacity: 1 }}
        animate={{
          clipPath: stage >= 2 ? "circle(140% at 50% 55%)" : "circle(0% at 50% 55%)",
          opacity: stage >= 3 ? 0 : 1,
        }}
        transition={{
          clipPath: { duration: 0.26 * SLOW, ease: "easeIn" },
          opacity: { duration: 0.23 * SLOW, ease: "easeOut" },
        }}
      />

      {/* the object itself, picked up and brought to the camera */}
      <motion.div
        className="absolute w-[min(46vh,420px)]"
        style={{ left: cx, top: cy, translateX: "-50%", translateY: "-50%" }}
        initial={{ x: 0, y: 0, scale: 0.6, rotate: 0, opacity: 1 }}
        animate={{
          x: [0, 0, dx, dx, dx],
          y: [0, 5, dy, dy, dy],
          scale: [0.6, 0.55, 1.18, 1.34, 1.75],
          rotate: [0, -2.5, 2.5, 0, 0],
          opacity: [1, 1, 1, 1, 0],
        }}
        transition={{ duration: 0.85 * SLOW, times: [0, 0.14, 0.5, 0.76, 1], ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-0 -z-10 rounded-full"
          style={{ background: `radial-gradient(circle, ${field} 0%, transparent 70%)` }}
          animate={{ opacity: stage >= 1 ? 0.55 : 0.2, scale: stage >= 1 ? 1.5 : 1 }}
          transition={{ duration: 0.35 }}
        />
        <svg viewBox={glyph.vb} className="h-auto w-full drop-shadow-2xl">
          <Glyph active={stage >= 1} screenState="ready" introDone />
        </svg>
        <motion.p
          className="mt-2 text-center font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white"
          animate={{ opacity: stage === 1 || stage === 2 ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {META[id]?.label}
        </motion.p>
      </motion.div>
    </div>
  );
}