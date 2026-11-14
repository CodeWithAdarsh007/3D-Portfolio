import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { deskObjects } from "../../data/portfolioContent";
import {
  BooksProp,
  ChipObject,
  ClockProp,
  CoffeeProp,
  DeskObject,
  DeskSurface,
  EnvelopeObject,
  FolderObject,
  IdCardObject,
  KeyboardProp,
  LaptopObject,
  MonitorObject,
  MouseProp,
  NotebookObject,
  PlantProp,
  PosterProp,
  ShelfProp,
  StickyNoteProp,
  TrophyObject,
  WindowProp,
} from "./objects";

const EASE = [0.22, 1, 0.36, 1];

const OBJECT_META = Object.fromEntries(deskObjects.map((o) => [o.id, o]));

/** Floating tooltip anchors, percentage of each scene's viewBox. */
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
          className="pointer-events-none absolute z-10 w-max max-w-[230px] -translate-x-1/2 -translate-y-full rounded-xl border border-line bg-raised px-3.5 py-2.5 text-center shadow-lift"
          style={{ left: `${anchor.x}%`, top: `${anchor.y}%` }}
          role="status"
        >
          <p className="text-sm font-extrabold text-ink">{meta.label}</p>
          <p className="text-xs font-medium text-muted">{meta.desc}</p>
          <p className="mt-1 font-mono text-[10px] tracking-wide text-blue-ink">click to open ↵</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function RoomBackdrop({ introDone }) {
  return (
    <motion.g
      initial={introDone ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <rect x="0" y="0" width="1200" height="472" fill="var(--bg)" />
      <rect x="0" y="466" width="1200" height="8" fill="var(--line)" opacity="0.6" />
      <polygon className="window-light" points="70,290 235,290 420,585 130,585" fill="var(--amber)" opacity="0.07" />
      <g transform="translate(150 170)">
        <WindowProp />
      </g>
      <g transform="translate(352 118)">
        <PosterProp />
      </g>
      <g transform="translate(690 110)">
        <ClockProp />
      </g>
      <g transform="translate(1000 150)">
        <ShelfProp />
      </g>
    </motion.g>
  );
}

export function DesktopDesk({ screenState, introDone }) {
  const [hovered, setHovered] = useState(null);
  const obj = (id) => ({
    id,
    label: OBJECT_META[id].label,
    desc: OBJECT_META[id].desc,
    to: OBJECT_META[id].to,
    introDone,
    onHover: setHovered,
  });

  return (
    <div className="relative">
      <svg
        viewBox="0 0 1200 760"
        className="h-auto w-full"
        role="group"
        aria-label="Adarsh's interactive developer desk. Eight objects open portfolio sections; the same links are available in the navigation bar and the object list below."
      >
        <RoomBackdrop introDone={introDone} />

        <motion.g
          initial={introDone ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: introDone ? 0 : 0.1, ease: EASE }}
        >
          <g transform="translate(600 585)">
            <DeskSurface />
          </g>
        </motion.g>

        {/* decorative props */}
        <motion.g
          initial={introDone ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: introDone ? 0 : 0.85, duration: 0.5 }}
        >
          <g transform="translate(300 468)">
            <PlantProp />
          </g>
          <g transform="translate(975 468)">
            <BooksProp />
          </g>
          <g transform="translate(515 505)">
            <KeyboardProp />
          </g>
          <g transform="translate(688 512)">
            <MouseProp />
          </g>
          <g transform="translate(330 524)">
            <CoffeeProp />
          </g>
        </motion.g>

        {/* interactive objects */}
        <g transform="translate(510 470)">
          <DeskObject {...obj("monitor")} delay={0.45} haloRx={92} haloRy={14}>
            <MonitorObject screenState={screenState} introDone={introDone} />
          </DeskObject>
        </g>
        <g transform="translate(810 465)">
          <DeskObject {...obj("laptop")} delay={0.62} haloRx={112} haloRy={12}>
            <LaptopObject />
          </DeskObject>
        </g>
        <g transform="translate(1068 468)">
          <DeskObject {...obj("trophy")} delay={0.78} haloRx={40} haloRy={9}>
            <TrophyObject />
          </DeskObject>
        </g>
        <g transform="translate(200 516)">
          <DeskObject {...obj("chip")} delay={0.92} haloRx={48} haloRy={10}>
            <ChipObject />
          </DeskObject>
        </g>
        <g transform="translate(505 578)">
          <DeskObject {...obj("notebook")} delay={1.05} haloRx={90} haloRy={11}>
            <NotebookObject />
          </DeskObject>
        </g>
        <g transform="translate(692 572)">
          <DeskObject {...obj("envelope")} delay={1.16} haloRx={60} haloRy={10}>
            <EnvelopeObject />
          </DeskObject>
        </g>
        <g transform="translate(985 568)">
          <DeskObject {...obj("folder")} delay={1.26} haloRx={74} haloRy={11}>
            <FolderObject />
          </DeskObject>
        </g>
        <g transform="translate(85 592)">
          <DeskObject {...obj("idcard")} delay={1.36} haloRx={40} haloRy={9} haloY={-2}>
            <IdCardObject />
          </DeskObject>
        </g>

        <motion.g
          initial={introDone ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: introDone ? 0 : 1.5, duration: 0.4 }}
        >
          <g transform="translate(632 436)">
            <StickyNoteProp />
          </g>
        </motion.g>
      </svg>
      <Tooltip hovered={hovered} />
    </div>
  );
}

/** Compact composition for small screens — not a shrunk desktop scene. */
export function MobileDesk({ screenState, introDone }) {
  const [hovered, setHovered] = useState(null);
  const obj = (id) => ({
    id,
    label: OBJECT_META[id].label,
    desc: OBJECT_META[id].desc,
    to: OBJECT_META[id].to,
    introDone,
    onHover: setHovered,
  });
  const meta = hovered ? OBJECT_META[hovered] : null;

  return (
    <div>
      <svg
        viewBox="0 0 640 620"
        className="h-auto w-full"
        role="group"
        aria-label="Adarsh's compact interactive desk. Tap an object to open its section."
      >
        <motion.g
          initial={introDone ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <rect x="0" y="0" width="640" height="304" fill="var(--bg)" />
          <rect x="0" y="298" width="640" height="6" fill="var(--line)" opacity="0.6" />
          <g transform="translate(95 105) scale(0.55)">
            <WindowProp />
          </g>
        </motion.g>

        <motion.g
          initial={introDone ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: introDone ? 0 : 0.1 }}
        >
          <g transform="translate(320 430)">
            <DeskSurface width={600} />
          </g>
        </motion.g>

        <motion.g
          initial={introDone ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: introDone ? 0 : 0.5, duration: 0.45 }}
        >
          <g transform="translate(60 310) scale(0.62)">
            <PlantProp />
          </g>
          <g transform="translate(320 352) scale(0.62)">
            <KeyboardProp />
          </g>
          <g transform="translate(215 368) scale(0.7)">
            <CoffeeProp />
          </g>
          <g transform="translate(425 360) scale(0.7)">
            <MouseProp />
          </g>
        </motion.g>

        <g transform="translate(320 308) scale(0.72)">
          <DeskObject {...obj("monitor")} delay={0.3} haloRx={92} haloRy={14}>
            <MonitorObject screenState={screenState} introDone={introDone} />
          </DeskObject>
        </g>
        <g transform="translate(505 315) scale(0.6)">
          <DeskObject {...obj("laptop")} delay={0.4} haloRx={112} haloRy={12}>
            <LaptopObject />
          </DeskObject>
        </g>
        <g transform="translate(598 320) scale(0.55)">
          <DeskObject {...obj("trophy")} delay={0.5} haloRx={42} haloRy={10}>
            <TrophyObject />
          </DeskObject>
        </g>
        <g transform="translate(140 360) scale(0.75)">
          <DeskObject {...obj("chip")} delay={0.55} haloRx={50} haloRy={11}>
            <ChipObject />
          </DeskObject>
        </g>
        <g transform="translate(255 425) scale(0.72)">
          <DeskObject {...obj("notebook")} delay={0.6} haloRx={92} haloRy={12}>
            <NotebookObject />
          </DeskObject>
        </g>
        <g transform="translate(400 428) scale(0.75)">
          <DeskObject {...obj("envelope")} delay={0.65} haloRx={62} haloRy={11}>
            <EnvelopeObject />
          </DeskObject>
        </g>
        <g transform="translate(545 420) scale(0.68)">
          <DeskObject {...obj("folder")} delay={0.7} haloRx={76} haloRy={12}>
            <FolderObject />
          </DeskObject>
        </g>
        <g transform="translate(55 452) scale(0.72)">
          <DeskObject {...obj("idcard")} delay={0.75} haloRx={42} haloRy={10} haloY={-2}>
            <IdCardObject />
          </DeskObject>
        </g>
      </svg>

      <div
        className="mx-auto -mt-2 flex h-12 max-w-sm items-center justify-center rounded-full border border-line bg-raised px-4 text-center shadow-lift"
        aria-live="polite"
      >
        {meta ? (
          <p className="text-xs font-bold text-ink">
            {meta.label} <span className="font-medium text-muted">— {meta.desc}</span>
          </p>
        ) : (
          <p className="font-mono text-[11px] tracking-wide text-muted">
            tap an object to explore the workspace
          </p>
        )}
      </div>
    </div>
  );
}