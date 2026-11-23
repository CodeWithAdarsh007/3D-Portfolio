import { useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

export default function ObjectTransition() {
  const { transition, end } = useDeskTransition();
  return transition ? <Opening transition={transition} end={end} /> : null;
}

function Opening({ transition, end }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [stage, setStage] = useState("lift");
  const navigated = useRef(false);

  useLayoutEffect(() => {
    if (location.key !== transition.originKey && !navigated.current) end();
  }, [location.key, transition.originKey, end]);

  const { id, rect, to } = transition;
  const glyph = GLYPH[id] || GLYPH.monitor;
  const field = getAccent(ACCENT[id] || "blue").field;
  const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const cy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
  const dx = window.innerWidth / 2 - cx;
  const dy = window.innerHeight * 0.52 - cy;
  const Glyph = glyph.C;
  const [, , vw, vh] = glyph.vb.split(" ").map(Number);
  const width = Math.min(window.innerWidth * 0.62, window.innerHeight * 0.48 * vw / vh, 360);
  const startScale = rect ? rect.width / width : 0.6;

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
        transition={{ duration: 0.22 }}
      />

      {/* The accent lights up as the object opens and fades over the destination. */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 55%, color-mix(in srgb, ${field} 62%, #ffffff) 0%, ${field} 46%, color-mix(in srgb, ${field} 55%, var(--plum)) 100%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: stage === "open" ? 1 : 0,
        }}
        transition={{ duration: stage === "open" ? 0.3 : 0.18 }}
      />

      {/* the object: pressed, lifted toward the camera, then opened */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: cx, top: cy, width }}
        initial={{ x: 0, y: 0, scale: startScale, rotate: 0, opacity: 1 }}
        animate={
          stage === "lift"
            ? { x: dx, y: dy, scale: 1, rotate: -1, opacity: 1 }
            : stage === "open"
              ? { x: dx, y: dy, scale: 1.06, rotate: 0, opacity: 1 }
              : { x: dx, y: dy, scale: 1.14, rotate: 0, opacity: 0 }
        }
        transition={
          stage === "lift"
            ? { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
            : { duration: (stage === "open" ? 0.3 : 0.24), ease: "easeOut" }
        }
        onAnimationComplete={() => {
          if (stage === "lift") setStage("open");
          else if (stage === "open") openDone();
          else if (stage === "reveal") end();
        }}
      >
        <motion.div
          className="absolute inset-0 -z-10 rounded-full"
          style={{ background: `radial-gradient(circle, ${field} 0%, transparent 70%)` }}
          animate={{ opacity: stage === "lift" ? 0.25 : 0.6, scale: stage === "lift" ? 1 : 1.5 }}
          transition={{ duration: 0.3 }}
        />
        <svg viewBox={glyph.vb} className="h-auto w-full overflow-visible drop-shadow-2xl">
          <Glyph active={stage !== "lift"} screenState="ready" introDone />
        </svg>
        <motion.p
          className="absolute inset-x-0 top-full mt-2 text-center font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-plum"
          animate={{ opacity: stage === "open" ? 1 : 0 }}
          transition={{ duration: 0.18 }}
        >
          {META[id]?.label}
        </motion.p>
      </motion.div>
    </div>
  );
}