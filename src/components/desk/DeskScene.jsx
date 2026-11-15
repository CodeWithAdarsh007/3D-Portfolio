import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { deskObjects } from "../../data/portfolioContent";
import { useDeskTransition } from "../../context/TransitionContext";
import {
  BooksProp, ChipObject, ClockProp, CoffeeProp, DeskObject, DeskSurface,
  EnvelopeObject, FolderObject, GarlandProp, IdCardObject, KeyboardProp,
  LaptopObject, MonitorObject, MouseProp, NeuralPosterProp, NotebookObject,
  PencilCupProp, PlantProp, PosterProp, RugProp, ShelfProp, StickyNoteProp,
  TrophyObject, WindowProp,
} from "./objects";

const EASE = [0.22, 1, 0.36, 1];
const OBJECT_META = Object.fromEntries(deskObjects.map((o) => [o.id, o]));

const DESKTOP_ANCHORS = {
  monitor: { x: 42.5, y: 28.5 },
  laptop: { x: 67.5, y: 42 },
  chip: { x: 16.7, y: 55 },
  notebook: { x: 42, y: 67.5 },
  folder: { x: 82, y: 63.5 },
  idcard: { x: 12, y: 85.5 },
  trophy: { x: 88, y: 50.5 },
  envelope: { x: 57.7, y: 69.5 },
};

function Tooltip({ hovered }) {
  const meta = hovered ? OBJECT_META[hovered] : null;
  const anchor = hovered ? DESKTOP_ANCHORS[hovered] : null;
  return (
    <AnimatePresence>
      {meta && anchor && (
        <motion.div
          key={hovered}
          initial={{ opacity: 0, y: 6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.97 }}
          transition={{ duration: 0.18, ease: EASE }}
          className="pointer-events-none absolute z-10 w-max max-w-[230px] -translate-x-1/2 -translate-y-full rounded-xl border-2 border-ink bg-raised px-3.5 py-2.5 text-center shadow-sticker-sm"
          style={{ left: `${anchor.x}%`, top: `${anchor.y}%` }}
          role="status"
        >
          <p className="font-display text-sm font-extrabold text-ink">{meta.label}</p>
          <p className="text-xs font-semibold text-muted">{meta.desc}</p>
          <p className="mt-1 font-mono text-[10px] tracking-wide text-blue-ink">click to open ↵</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Activation hands off to the cinematic overlay: the object lifts off the
 * desk, plays its own animation, and floods into the destination page.
 * Reduced motion navigates immediately.
 */
function useActivation() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const { begin, transition } = useDeskTransition();
  const onActivate = (id, to, rect) => {
    if (reduce) navigate(to);
    else begin(id, to, rect);
  };
  return { activating: transition?.id ?? null, onActivate };
}

function Wall({ step, introDone }) {
  return (
    <motion.g
      initial={introDone ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <defs>
        <linearGradient id="wall-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--sunshine)" stopOpacity="0.28" />
          <stop offset="0.55" stopColor="var(--coral)" stopOpacity="0.14" />
          <stop offset="1" stopColor="var(--lavender)" stopOpacity="0.16" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="1200" height="478" fill="var(--bg)" />
      <rect x="0" y="0" width="1200" height="478" fill="url(#wall-grad)" />
      <rect x="0" y="404" width="1200" height="74" fill="var(--bg-desk)" />
      <g stroke="var(--line)" strokeWidth="3" opacity="0.8">
        {[100, 300, 500, 700, 900, 1100].map((x) => (
          <line key={x} x1={x} y1="410" x2={x} y2="472" />
        ))}
      </g>
      <rect x="0" y="400" width="1200" height="8" fill="var(--wood)" />

      <motion.g
        initial={introDone ? false : { opacity: 0 }}
        animate={{ opacity: step >= 1 ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <polygon className="window-light" points="70,300 240,300 430,590 130,590" fill="var(--sunshine)" opacity="0.14" />
        <g transform="translate(150 180)">
          <WindowProp />
        </g>
        <GarlandProp />
      </motion.g>

      <g transform="translate(352 122)">
        <PosterProp />
      </g>
      <g transform="translate(762 112)">
        <NeuralPosterProp />
      </g>
      <g transform="translate(906 108)">
        <ClockProp />
      </g>
      <g transform="translate(1020 162)">
        <ShelfProp />
      </g>
    </motion.g>
  );
}

export function DesktopDesk({ screenState, introDone, step }) {
  const [hovered, setHovered] = useState(null);
  const { activating, onActivate } = useActivation();
  const obj = (id) => ({
    id,
    label: OBJECT_META[id].label,
    desc: OBJECT_META[id].desc,
    to: OBJECT_META[id].to,
    introDone,
    onHover: setHovered,
    onActivate,
  });
  const assembled = introDone || step >= 2;

  return (
    <div className="relative">
      <svg
        viewBox="0 0 1200 780"
        className="h-auto w-full"
        role="group"
        aria-label="Adarsh's illustrated creative studio. Eight objects open portfolio sections; the same links are available in the navigation bar and the object list below."
      >
        <Wall step={step} introDone={introDone} />

        <motion.g
          initial={introDone ? false : { opacity: 0, y: 24 }}
          animate={assembled ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <g transform="translate(600 742)">
            <RugProp />
          </g>
          <g transform="translate(600 585)">
            <DeskSurface />
          </g>
        </motion.g>

        <motion.g
          initial={introDone ? false : { opacity: 0 }}
          animate={{ opacity: assembled ? 1 : 0 }}
          transition={{ delay: introDone ? 0 : 0.35, duration: 0.5 }}
        >
          <g transform="translate(300 468)"><PlantProp /></g>
          <g transform="translate(940 468)"><BooksProp /></g>
          <g transform="translate(515 505)"><KeyboardProp /></g>
          <g transform="translate(688 512)"><MouseProp /></g>
          <g transform="translate(330 524)"><CoffeeProp /></g>
          <g transform="translate(860 520)"><PencilCupProp /></g>
        </motion.g>

        <g transform="translate(510 470)">
          <DeskObject {...obj("monitor")} delay={0.15} haloRx={92} haloRy={14} hitW={145} hitTop={-258}>
            <MonitorObject screenState={screenState} introDone={introDone} active={activating === "monitor"} />
          </DeskObject>
        </g>
        <g transform="translate(810 465)">
          <DeskObject {...obj("laptop")} delay={0.3} haloRx={112} haloRy={12} hitW={118} hitTop={-146}>
            <LaptopObject active={activating === "laptop"} />
          </DeskObject>
        </g>
        <g transform="translate(1068 468)">
          <DeskObject {...obj("trophy")} delay={0.45} haloRx={40} haloRy={9} hitW={44} hitTop={-108}>
            <TrophyObject active={activating === "trophy"} />
          </DeskObject>
        </g>
        <g transform="translate(200 516)">
          <DeskObject {...obj("chip")} delay={0.55} haloRx={48} haloRy={10} hitW={52} hitTop={-100}>
            <ChipObject active={activating === "chip"} />
          </DeskObject>
        </g>
        <g transform="translate(505 578)">
          <DeskObject {...obj("notebook")} delay={0.65} haloRx={90} haloRy={11} hitW={90} hitTop={-66}>
            <NotebookObject active={activating === "notebook"} />
          </DeskObject>
        </g>
        <g transform="translate(692 572)">
          <DeskObject {...obj("envelope")} delay={0.75} haloRx={60} haloRy={10} hitW={62} hitTop={-60}>
            <EnvelopeObject active={activating === "envelope"} />
          </DeskObject>
        </g>
        <g transform="translate(985 568)">
          <DeskObject {...obj("folder")} delay={0.85} haloRx={74} haloRy={11} hitW={76} hitTop={-86}>
            <FolderObject active={activating === "folder"} />
          </DeskObject>
        </g>
        <g transform="translate(85 592)">
          <DeskObject {...obj("idcard")} delay={0.95} haloRx={40} haloRy={9} haloY={-2} hitW={36} hitTop={-6} hitBottom={146}>
            <IdCardObject active={activating === "idcard"} />
          </DeskObject>
        </g>

        <motion.g
          initial={introDone ? false : { opacity: 0 }}
          animate={{ opacity: assembled ? 1 : 0 }}
          transition={{ delay: introDone ? 0 : 1, duration: 0.4 }}
        >
          <g transform="translate(632 436)"><StickyNoteProp /></g>
          <g transform="translate(392 452)"><StickyNoteProp fill="var(--coral)" text="ideas" /></g>
        </motion.g>
      </svg>
      <Tooltip hovered={hovered} />
    </div>
  );
}

/** Compact colourful composition for small screens — not a shrunk desktop. */
export function MobileDesk({ screenState, introDone, step }) {
  const [hovered, setHovered] = useState(null);
  const { activating, onActivate } = useActivation();
  const obj = (id) => ({
    id,
    label: OBJECT_META[id].label,
    desc: OBJECT_META[id].desc,
    to: OBJECT_META[id].to,
    introDone,
    onHover: setHovered,
    onActivate,
  });
  const meta = hovered ? OBJECT_META[hovered] : null;
  const assembled = introDone || step >= 2;

  return (
    <div>
      <svg
        viewBox="0 0 640 620"
        className="h-auto w-full"
        role="group"
        aria-label="Adarsh's compact illustrated studio. Tap an object to open its section."
      >
        <defs>
          <linearGradient id="wall-grad-m" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--sunshine)" stopOpacity="0.3" />
            <stop offset="1" stopColor="var(--coral)" stopOpacity="0.16" />
          </linearGradient>
        </defs>
        <motion.g initial={introDone ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <rect x="0" y="0" width="640" height="304" fill="var(--bg)" />
          <rect x="0" y="0" width="640" height="304" fill="url(#wall-grad-m)" />
          <rect x="0" y="298" width="640" height="6" fill="var(--wood)" />
          <g transform="translate(95 105) scale(0.55)"><WindowProp /></g>
          <g transform="translate(520 90) scale(0.7)"><NeuralPosterProp /></g>
        </motion.g>

        <motion.g
          initial={introDone ? false : { opacity: 0, y: 18 }}
          animate={assembled ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.55 }}
        >
          <g transform="translate(320 560) scale(0.72)"><RugProp /></g>
          <g transform="translate(320 430)"><DeskSurface width={600} /></g>
        </motion.g>

        <motion.g initial={introDone ? false : { opacity: 0 }} animate={{ opacity: assembled ? 1 : 0 }} transition={{ delay: introDone ? 0 : 0.25, duration: 0.45 }}>
          <g transform="translate(60 310) scale(0.62)"><PlantProp /></g>
          <g transform="translate(320 352) scale(0.62)"><KeyboardProp /></g>
          <g transform="translate(215 368) scale(0.7)"><CoffeeProp /></g>
          <g transform="translate(425 360) scale(0.7)"><MouseProp /></g>
        </motion.g>

        <g transform="translate(320 308) scale(0.72)">
          <DeskObject {...obj("monitor")} delay={0.1} haloRx={92} haloRy={14} hitW={145} hitTop={-258}>
            <MonitorObject screenState={screenState} introDone={introDone} active={activating === "monitor"} />
          </DeskObject>
        </g>
        <g transform="translate(505 315) scale(0.6)">
          <DeskObject {...obj("laptop")} delay={0.2} haloRx={112} haloRy={12} hitW={118} hitTop={-146}>
            <LaptopObject active={activating === "laptop"} />
          </DeskObject>
        </g>
        <g transform="translate(598 320) scale(0.55)">
          <DeskObject {...obj("trophy")} delay={0.3} haloRx={42} haloRy={10} hitW={44} hitTop={-108}>
            <TrophyObject active={activating === "trophy"} />
          </DeskObject>
        </g>
        <g transform="translate(140 360) scale(0.75)">
          <DeskObject {...obj("chip")} delay={0.35} haloRx={50} haloRy={11} hitW={52} hitTop={-100}>
            <ChipObject active={activating === "chip"} />
          </DeskObject>
        </g>
        <g transform="translate(255 425) scale(0.72)">
          <DeskObject {...obj("notebook")} delay={0.4} haloRx={92} haloRy={12} hitW={90} hitTop={-66}>
            <NotebookObject active={activating === "notebook"} />
          </DeskObject>
        </g>
        <g transform="translate(400 428) scale(0.75)">
          <DeskObject {...obj("envelope")} delay={0.45} haloRx={62} haloRy={11} hitW={62} hitTop={-60}>
            <EnvelopeObject active={activating === "envelope"} />
          </DeskObject>
        </g>
        <g transform="translate(545 420) scale(0.68)">
          <DeskObject {...obj("folder")} delay={0.5} haloRx={76} haloRy={12} hitW={76} hitTop={-86}>
            <FolderObject active={activating === "folder"} />
          </DeskObject>
        </g>
        <g transform="translate(55 452) scale(0.72)">
          <DeskObject {...obj("idcard")} delay={0.55} haloRx={42} haloRy={10} haloY={-2} hitW={36} hitTop={-6} hitBottom={146}>
            <IdCardObject active={activating === "idcard"} />
          </DeskObject>
        </g>
      </svg>

      <div
        className="mx-auto mt-3 flex h-12 max-w-sm items-center justify-center rounded-full border-2 border-ink bg-sunshine px-4 text-center shadow-sticker-sm"
        aria-live="polite"
      >
        {meta ? (
          <p className="text-xs font-extrabold text-plum">
            {meta.label} <span className="font-semibold text-plum/70">— {meta.desc}</span>
          </p>
        ) : (
          <p className="font-mono text-[11px] font-bold tracking-wide text-plum">
            tap an object to explore the studio
          </p>
        )}
      </div>
    </div>
  );
}