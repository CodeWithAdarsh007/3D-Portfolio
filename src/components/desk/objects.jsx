import { motion } from "motion/react";

/**
 * Original illustrated studio library. Every object is drawn around a local
 * origin (0,0 = base centre) and accepts `active` to play its own opening /
 * activation animation just before navigation. Colours are CSS variables so
 * the whole room re-lights between the cream daylight and plum night themes.
 */

const EASE = [0.22, 1, 0.36, 1];

/* ---------------------------------------------------------------- wrapper */

export function DeskObject({
  id, label, desc, to, delay = 0, introDone, onHover, onActivate,
  haloRx = 62, haloRy = 13, haloY = 2, hitW, hitTop = -70, hitBottom, children,
}) {
  const hw = hitW ?? haloRx;
  const hb = hitBottom ?? haloRy + 2;
  const activate = (e) => onActivate(id, to, e.currentTarget.getBoundingClientRect());

  return (
    <motion.g
      className="desk-object"
      role="button"
      tabIndex={0}
      aria-label={`${label} — ${desc}`}
      initial={introDone ? false : { opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: introDone ? 0 : delay, duration: 0.55, ease: EASE }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      onClick={activate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate(e);
        }
      }}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(id)}
      onBlur={() => onHover(null)}
    >
      <ellipse className="halo" cx="0" cy={haloY} rx={haloRx} ry={haloRy} fill="var(--sunshine)" fillOpacity="0.4" />
      <ellipse className="focus-ring" cx="0" cy={haloY} rx={haloRx + 6} ry={haloRy + 4} fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeDasharray="6 4" />
      {/* stable transparent hit area so hover/tap transforms never move the
          click target out from under the pointer (hollow centres included) */}
      <rect x={-hw} y={hitTop} width={hw * 2} height={hb - hitTop} fill="transparent" stroke="none" />
      {children}
    </motion.g>
  );
}

/* ---------------------------------------------------------------- monitor */

const BOOT_LINES = [
  { text: "tdw-boot v2.0 · studio", fill: "var(--leaf)" },
  { text: "> sunlight .......... ok", fill: "#e8e2f4" },
  { text: "> ai.ml modules ..... ok", fill: "#e8e2f4" },
  { text: "> agent lab ......... ok", fill: "#e8e2f4" },
  { text: "> user: adarsh detected", fill: "var(--sunshine)" },
];

export function MonitorObject({ screenState = "ready", introDone, active }) {
  return (
    <g>
      <ellipse cx="0" cy="2" rx="92" ry="13" fill="var(--plum)" opacity="0.16" />
      <rect x="-48" y="-13" width="96" height="13" rx="6" fill="var(--wood-deep)" />
      <rect x="-10" y="-46" width="20" height="36" rx="5" fill="var(--wood-deep)" />
      <rect x="-142" y="-254" width="284" height="216" rx="16" fill="var(--ink)" />
      <rect x="-136" y="-248" width="272" height="204" rx="12" fill="var(--wood)" opacity="0.25" />
      <rect x="-128" y="-240" width="256" height="182" rx="8" fill="var(--screen)" />
      <circle cx="0" cy="-246" r="2.2" fill="var(--muted)" />
      <circle cx="122" cy="-49" r="3" fill="var(--leaf)" className={screenState === "off" ? "" : "neural-node"} />
      <rect x="-16" y="-52" width="32" height="4" rx="2" fill="var(--muted)" opacity="0.6" />
      <motion.rect
        x="-128" y="-240" width="256" height="182" rx="8" fill="var(--sunshine)"
        animate={{ opacity: active ? [0, 0.35, 0] : 0 }}
        transition={{ duration: 0.3 }}
      />

      {screenState === "off" && (
        <g>
          <polygon points="-128,-240 -40,-240 -128,-120" fill="#ffffff" opacity="0.04" />
          <text x="0" y="-145" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--muted)">
            standby
          </text>
        </g>
      )}

      {screenState === "boot" && (
        <g fontFamily="var(--font-mono)" fontSize="10.5">
          <circle cx="-114" cy="-226" r="3" fill="var(--coral)" />
          <circle cx="-104" cy="-226" r="3" fill="var(--sunshine)" />
          <circle cx="-94" cy="-226" r="3" fill="var(--leaf)" />
          {BOOT_LINES.map((line, i) => (
            <motion.text
              key={line.text} x="-114" y={-202 + i * 22} fill={line.fill}
              initial={introDone ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: introDone ? 0 : 0.15 + i * 0.16, duration: 0.25 }}
            >
              {line.text}
            </motion.text>
          ))}
          <rect x="-114" y="-88" width="7" height="12" fill="var(--leaf)" className="cursor-blink" />
        </g>
      )}

      {screenState === "ready" && (
        <g>
          <circle cx="-114" cy="-226" r="3" fill="var(--coral)" />
          <circle cx="-104" cy="-226" r="3" fill="var(--sunshine)" />
          <circle cx="-94" cy="-226" r="3" fill="var(--leaf)" />
          <text x="-114" y="-192" fontFamily="var(--font-display)" fontWeight="800" fontSize="20" fill="#fff5e6">
            Hello, I&apos;m Adarsh.
          </text>
          <text x="-114" y="-168" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--leaf)">
            AI/ML Student | Aspiring AI Engineer
          </text>
          <text x="-114" y="-152" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--sunshine)">
            Product Builder
          </text>
          <rect x="-114" y="-136" width="150" height="1.5" fill="var(--muted)" opacity="0.6" />
          <text x="-114" y="-118" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--turquoise)">
            ~ explore my workspace
          </text>
          <rect x="20" y="-127" width="7" height="11" fill="var(--turquoise)" className="cursor-blink" />
          <text x="-114" y="-72" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--muted)">
            status: ready · 8 objects online
          </text>
        </g>
      )}
    </g>
  );
}

/* ----------------------------------------------------------------- laptop */

export function LaptopObject({ active }) {
  return (
    <g>
      <ellipse cx="0" cy="3" rx="116" ry="12" fill="var(--plum)" opacity="0.16" />
      <motion.g
        style={{ originX: "0px", originY: "-22px" }}
        animate={active ? { rotate: [0, -7, 0], scaleY: [1, 1.05, 1] } : { rotate: 0, scaleY: 1 }}
        transition={{ duration: 0.3 }}
      >
        <rect x="-85" y="-142" width="170" height="120" rx="10" fill="var(--ink)" />
        <rect x="-77" y="-134" width="154" height="100" rx="6" fill="var(--screen)" />
        <rect x="-77" y="-134" width="154" height="16" rx="6" fill="var(--blue)" />
        <text x="-68" y="-123" fontFamily="var(--font-mono)" fontSize="8" fill="var(--on-blue)">
          projects/
        </text>
        {[
          { x: -68, fill: "var(--leaf)" },
          { x: -20, fill: "var(--tangerine)" },
          { x: 28, fill: "var(--coral)" },
        ].map((c) => (
          <g key={c.x}>
            <rect x={c.x} y="-108" width="42" height="30" rx="5" fill={c.fill} />
            <rect x={c.x + 5} y="-72" width="32" height="3.5" rx="1.75" fill="var(--muted)" />
            <rect x={c.x + 5} y="-64" width="22" height="3.5" rx="1.75" fill="var(--muted)" opacity="0.6" />
          </g>
        ))}
        <rect x="-68" y="-52" width="136" height="4" rx="2" fill="var(--muted)" opacity="0.5" />
      </motion.g>
      <polygon points="-100,-22 100,-22 118,0 -118,0" fill="var(--desk-edge)" />
      <polygon points="-100,-22 100,-22 104,-16 -104,-16" fill="var(--raised)" opacity="0.5" />
      <rect x="-88" y="-14" width="176" height="4" rx="2" fill="var(--plum)" opacity="0.2" />
      <rect x="-80" y="-8" width="160" height="4" rx="2" fill="var(--plum)" opacity="0.15" />
      <rect x="-24" y="-3" width="48" height="4" rx="2" fill="var(--plum)" opacity="0.2" />
    </g>
  );
}

/* --------------------------------------------------------------- AI chip */

export function ChipObject({ active }) {
  return (
    <g>
      <ellipse cx="0" cy="0" rx="48" ry="10" fill="var(--plum)" opacity="0.16" />
      <g stroke="var(--lavender)" strokeWidth="2" className="flow-dash">
        <line x1="-24" y1="-52" x2="-46" y2="-72" />
        <line x1="24" y1="-52" x2="46" y2="-78" />
        <line x1="0" y1="-58" x2="0" y2="-94" />
      </g>
      <motion.circle
        cx="0" cy="-56" r="40" fill="none" stroke="var(--lavender)" strokeWidth="2.5"
        animate={active ? { scale: [1, 1.7], opacity: [0.9, 0] } : { scale: 1, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ originX: "0px", originY: "-56px" }}
      />
      <circle cx="-46" cy="-72" r="5" fill="var(--leaf)" className="neural-node" />
      <circle cx="46" cy="-78" r="5" fill="var(--tangerine)" className="neural-node" />
      <circle cx="0" cy="-94" r="5" fill="var(--turquoise)" className="neural-node" />
      {[-20, -8, 4, 16].map((x) => (
        <g key={x} fill="var(--wood-deep)">
          <rect x={x} y="-62" width="4" height="8" rx="1" />
          <rect x={x} y="-2" width="4" height="8" rx="1" />
        </g>
      ))}
      {[-44, -32, -20].map((y) => (
        <g key={y} fill="var(--wood-deep)">
          <rect x="-36" y={y} width="8" height="4" rx="1" />
          <rect x="28" y={y} width="8" height="4" rx="1" />
        </g>
      ))}
      <rect x="-28" y="-56" width="56" height="56" rx="10" fill="var(--ink)" />
      <rect x="-19" y="-47" width="38" height="38" rx="6" fill="var(--lavender)" />
      <g stroke="#fff5e6" strokeWidth="1.6" opacity="0.9" fill="none">
        <path d="M-12 -38 h8 v8 h8" />
        <path d="M-12 -22 h6 v-6" />
        <circle cx="10" cy="-34" r="2.2" fill="#fff5e6" />
      </g>
      <text x="0" y="-14" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="700" fontSize="9" fill="var(--on-accent)">
        AI
      </text>
    </g>
  );
}

/* --------------------------------------------------------------- notebook */

export function NotebookObject({ active }) {
  return (
    <g>
      <ellipse cx="0" cy="0" rx="90" ry="11" fill="var(--plum)" opacity="0.14" />
      <polygon points="-84,-4 -4,-12 -4,-62 -78,-54" fill="var(--coral)" />
      <polygon points="84,-4 4,-12 4,-62 78,-54" fill="var(--coral)" />
      <polygon points="-78,-8 -8,-15 -8,-58 -72,-51" fill="var(--paper)" />
      <motion.g
        style={{ originX: "8px", originY: "-15px" }}
        animate={active ? { rotate: [0, -16, 0], scaleX: [1, 0.7, 1] } : { rotate: 0, scaleX: 1 }}
        transition={{ duration: 0.3 }}
      >
        <polygon points="78,-8 8,-15 8,-58 72,-51" fill="var(--paper)" />
        <g stroke="var(--turquoise)" strokeWidth="1.4" opacity="0.7">
          <line x1="16" y1="-49" x2="66" y2="-44" />
          <line x1="16" y1="-39" x2="66" y2="-34" />
        </g>
        <g stroke="var(--blue)" strokeWidth="1.8" fill="none" opacity="0.9">
          <path d="M24 -30 l10 -8 l10 8 l-10 8 z" />
          <circle cx="54" cy="-30" r="2.6" fill="var(--leaf)" stroke="none" />
        </g>
      </motion.g>
      <g stroke="var(--turquoise)" strokeWidth="1.4" opacity="0.7">
        <line x1="-66" y1="-44" x2="-16" y2="-49" />
        <line x1="-66" y1="-34" x2="-16" y2="-39" />
        <line x1="-66" y1="-24" x2="-40" y2="-27" />
      </g>
      {[-52, -42, -32, -22, -12].map((y) => (
        <circle key={y} cx="0" cy={y - 3} r="2.8" fill="none" stroke="var(--wood-deep)" strokeWidth="1.8" />
      ))}
      <g transform="translate(34 -14) rotate(-16)">
        <rect x="-34" y="-4" width="62" height="7" rx="2" fill="var(--sunshine)" />
        <polygon points="28,-4 38,-0.5 28,3" fill="var(--ink)" />
        <rect x="-40" y="-4" width="7" height="7" rx="2" fill="var(--coral)" />
      </g>
    </g>
  );
}

/* ----------------------------------------------------------------- folder */

export function FolderObject({ active }) {
  return (
    <g>
      <ellipse cx="0" cy="0" rx="74" ry="11" fill="var(--plum)" opacity="0.14" />
      <rect x="-58" y="-72" width="116" height="70" rx="7" fill="var(--tangerine)" />
      <rect x="-58" y="-82" width="46" height="16" rx="6" fill="var(--tangerine)" />
      <motion.g animate={active ? { y: -14 } : { y: 0 }} transition={{ duration: 0.3 }}>
        <rect x="-50" y="-78" width="100" height="12" rx="2" fill="var(--paper)" />
        <rect x="-44" y="-70" width="88" height="10" rx="2" fill="var(--paper)" opacity="0.9" />
        <rect x="-36" y="-74" width="52" height="3" rx="1.5" fill="var(--blue)" opacity="0.7" />
      </motion.g>
      <motion.g
        style={{ originX: "-64px", originY: "0px" }}
        animate={active ? { rotate: -12 } : { rotate: -2 }}
        transition={{ duration: 0.3 }}
      >
        <rect x="-64" y="-58" width="128" height="58" rx="8" fill="var(--sunshine)" />
        <rect x="-40" y="-44" width="80" height="19" rx="4" fill="var(--paper)" />
        <text x="0" y="-31" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="700" fontSize="8.5" fill="var(--art-ink)">
          PROJECTS
        </text>
        <rect x="-40" y="-18" width="52" height="3.5" rx="1.75" fill="var(--tangerine)" opacity="0.8" />
      </motion.g>
    </g>
  );
}

/* ---------------------------------------------------------------- ID card */

export function IdCardObject({ active }) {
  return (
    <motion.g
      style={{ originX: "0px", originY: "60px" }}
      animate={active ? { scaleX: [1, 0.15, 1] } : { scaleX: 1 }}
      transition={{ duration: 0.3 }}
    >
      <path d="M0 0 C 9 18 -9 38 0 54" stroke="var(--coral)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <rect x="-7" y="52" width="14" height="9" rx="2.5" fill="var(--ink)" />
      <rect x="-31" y="60" width="62" height="82" rx="8" fill="var(--paper)" stroke="var(--art-ink)" strokeWidth="2" />
      <path d="M-31 68 a8 8 0 0 1 8 -8 h46 a8 8 0 0 1 8 8 v10 h-62 z" fill="var(--blue)" />
      <text x="0" y="73" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="700" fontSize="6.5" fill="var(--on-blue)">
        DEV WORKSPACE
      </text>
      <circle cx="0" cy="94" r="11" fill="var(--sunshine)" />
      <circle cx="0" cy="90" r="4" fill="var(--art-ink)" />
      <path d="M-7 102 a7 6 0 0 1 14 0 z" fill="var(--art-ink)" />
      <rect x="-18" y="112" width="36" height="4" rx="2" fill="var(--art-ink)" opacity="0.8" />
      <rect x="-13" y="120" width="26" height="3" rx="1.5" fill="var(--art-muted)" />
      <text x="0" y="135" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="700" fontSize="7.5" fill="var(--art-blue)">
        ADARSH
      </text>
    </motion.g>
  );
}

/* ----------------------------------------------------------------- trophy */

export function TrophyObject({ active }) {
  return (
    <g>
      <ellipse cx="0" cy="0" rx="36" ry="9" fill="var(--plum)" opacity="0.16" />
      <rect x="-24" y="-9" width="48" height="9" rx="3" fill="var(--ink)" />
      <rect x="-16" y="-15" width="32" height="6" rx="2" fill="var(--wood-deep)" />
      <rect x="-5" y="-32" width="10" height="18" rx="3" fill="var(--wood-deep)" />
      <path d="M-25 -76 C -25 -46 -11 -35 0 -33 C 11 -35 25 -46 25 -76 Z" fill="var(--sunshine)" />
      <path d="M-25 -76 C -25 -60 -18 -48 -8 -42 C -16 -52 -18 -64 -18 -76 Z" fill="#ffffff" opacity="0.45" />
      <rect x="-28" y="-82" width="56" height="9" rx="4.5" fill="var(--tangerine)" />
      <path d="M-25 -70 C -38 -68 -38 -52 -22 -50" stroke="var(--tangerine)" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M25 -70 C 38 -68 38 -52 22 -50" stroke="var(--tangerine)" strokeWidth="5" fill="none" strokeLinecap="round" />
      <polygon points="0,-66 3,-59 10,-59 4.5,-54 6.5,-47 0,-51 -6.5,-47 -4.5,-54 -10,-59 -3,-59" fill="var(--coral)" />
      <motion.g
        fill="var(--sunshine)"
        animate={active ? { scale: [1, 1.8], opacity: [1, 0] } : { scale: 1, opacity: 0.9 }}
        transition={{ duration: 0.3 }}
        style={{ originX: "0px", originY: "-70px" }}
      >
        <path d="M34 -92 l2 4 4 2 -4 2 -2 4 -2 -4 -4 -2 4 -2 z" />
        <path d="M-38 -88 l1.5 3 3 1.5 -3 1.5 -1.5 3 -1.5 -3 -3 -1.5 3 -1.5 z" />
        <path d="M0 -104 l1.5 3 3 1.5 -3 1.5 -1.5 3 -1.5 -3 -3 -1.5 3 -1.5 z" />
      </motion.g>
    </g>
  );
}

/* --------------------------------------------------------------- envelope */

export function EnvelopeObject({ active }) {
  return (
    <g>
      <ellipse cx="0" cy="0" rx="60" ry="10" fill="var(--plum)" opacity="0.14" />
      <g transform="rotate(-3)">
        <motion.rect
          x="-30" y="-52" width="60" height="40" rx="4" fill="var(--paper)" stroke="var(--line)" strokeWidth="1.5"
          animate={active ? { y: -18 } : { y: 0 }}
          transition={{ duration: 0.3 }}
        />
        <polygon points="-52,-4 52,-4 44,-42 -44,-42" fill="var(--turquoise)" stroke="var(--ink)" strokeWidth="2" />
        <line x1="-52" y1="-4" x2="-14" y2="-22" stroke="var(--ink)" strokeWidth="1.4" opacity="0.5" />
        <line x1="52" y1="-4" x2="14" y2="-22" stroke="var(--ink)" strokeWidth="1.4" opacity="0.5" />
        <motion.g
          style={{ originX: "0px", originY: "-42px" }}
          animate={active ? { scaleY: -0.7 } : { scaleY: 1 }}
          transition={{ duration: 0.3 }}
        >
          <polygon points="-44,-42 44,-42 0,-18" fill="var(--turquoise)" stroke="var(--ink)" strokeWidth="2" />
        </motion.g>
        <circle cx="0" cy="-20" r="10" fill="var(--coral)" stroke="var(--ink)" strokeWidth="2" />
        <text x="0" y="-16.5" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="700" fontSize="10" fill="var(--on-accent)">
          @
        </text>
      </g>
    </g>
  );
}

/* ------------------------------------------------------- decorative props */

export function KeyboardProp() {
  const accentKeys = { "0-2": "var(--coral)", "1-5": "var(--sunshine)", "2-8": "var(--turquoise)", "0-9": "var(--leaf)" };
  return (
    <g>
      <rect x="-110" y="-30" width="220" height="30" rx="8" fill="var(--raised)" stroke="var(--ink)" strokeWidth="2" />
      {[0, 1, 2].map((row) =>
        Array.from({ length: 12 }).map((_, col) => (
          <rect
            key={`${row}-${col}`}
            x={-100 + col * 17} y={-26 + row * 8} width="13" height="5.5" rx="1.5"
            fill={accentKeys[`${row}-${col}`] || "var(--bg-desk)"}
          />
        )),
      )}
    </g>
  );
}

export function MouseProp() {
  return (
    <g>
      <rect x="-34" y="-26" width="68" height="26" rx="10" fill="var(--lavender)" opacity="0.55" />
      <rect x="-11" y="-24" width="22" height="22" rx="10" fill="var(--raised)" stroke="var(--ink)" strokeWidth="1.8" />
      <line x1="0" y1="-22" x2="0" y2="-15" stroke="var(--coral)" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

export function CoffeeProp() {
  return (
    <g>
      <ellipse cx="0" cy="0" rx="27" ry="6" fill="var(--plum)" opacity="0.14" />
      <path d="M-20 -34 L-16 0 L16 0 L20 -34 Z" fill="var(--coral)" />
      <rect x="-22" y="-38" width="44" height="7" rx="3.5" fill="var(--coral-ink)" />
      <path d="M20 -30 C 32 -28 32 -12 18 -10" stroke="var(--coral-ink)" strokeWidth="4.5" fill="none" />
      <ellipse cx="0" cy="-35" rx="17" ry="3" fill="var(--wood-deep)" />
      <rect x="-12" y="-24" width="24" height="10" rx="5" fill="var(--sunshine)" opacity="0.9" />
      <g className="steam" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6">
        <path d="M-6 -44 c 3 -4 -3 -7 0 -11" />
        <path d="M2 -44 c 3 -4 -3 -7 0 -11" />
        <path d="M9 -44 c 3 -4 -3 -7 0 -11" />
      </g>
    </g>
  );
}

export function PlantProp() {
  return (
    <g>
      <ellipse cx="0" cy="0" rx="27" ry="6" fill="var(--plum)" opacity="0.14" />
      <g stroke="var(--leaf-ink)" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M0 -22 C 0 -44 -14 -50 -18 -62" />
        <path d="M0 -22 C 2 -48 14 -52 16 -66" />
        <path d="M0 -22 C -2 -40 6 -56 2 -70" />
      </g>
      <g fill="var(--leaf)">
        <ellipse cx="-19" cy="-64" rx="7" ry="10" transform="rotate(-24 -19 -64)" />
        <ellipse cx="17" cy="-68" rx="7" ry="10" transform="rotate(20 17 -68)" />
        <ellipse cx="2" cy="-73" rx="6.5" ry="10" />
      </g>
      <path d="M-18 -22 L-14 0 L14 0 L18 -22 Z" fill="var(--tangerine)" />
      <rect x="-20" y="-26" width="40" height="6" rx="3" fill="var(--tangerine-ink)" />
      <rect x="-10" y="-16" width="20" height="4" rx="2" fill="var(--sunshine)" opacity="0.8" />
    </g>
  );
}

export function BooksProp() {
  const books = [
    { y: -14, w: 74, fill: "var(--blue)" },
    { y: -28, w: 66, fill: "var(--coral)" },
    { y: -42, w: 70, fill: "var(--leaf)" },
  ];
  return (
    <g>
      <ellipse cx="0" cy="0" rx="43" ry="7" fill="var(--plum)" opacity="0.14" />
      {books.map((b) => (
        <g key={b.y}>
          <rect x={-b.w / 2} y={b.y} width={b.w} height="14" rx="3" fill={b.fill} stroke="var(--ink)" strokeWidth="1.5" />
          <rect x={-b.w / 2 + 6} y={b.y + 4} width={b.w - 24} height="2.5" rx="1.25" fill="#fff5e6" opacity="0.75" />
        </g>
      ))}
    </g>
  );
}

export function PencilCupProp() {
  return (
    <g>
      <ellipse cx="0" cy="0" rx="20" ry="5" fill="var(--plum)" opacity="0.14" />
      <g strokeLinecap="round">
        <line x1="-6" y1="-24" x2="-10" y2="-46" stroke="var(--sunshine)" strokeWidth="5" />
        <line x1="0" y1="-24" x2="0" y2="-50" stroke="var(--coral)" strokeWidth="5" />
        <line x1="6" y1="-24" x2="10" y2="-44" stroke="var(--turquoise)" strokeWidth="5" />
      </g>
      <path d="M-15 -26 L-12 0 L12 0 L15 -26 Z" fill="var(--lavender)" stroke="var(--ink)" strokeWidth="2" />
    </g>
  );
}

export function StickyNoteProp({ fill = "var(--sunshine)", text = "ship it" }) {
  return (
    <g transform="rotate(4)">
      <rect x="-18" y="-18" width="36" height="36" rx="3" fill={fill} stroke="var(--ink)" strokeWidth="1.5" />
      <polygon points="18,10 18,18 10,18" fill="var(--ink)" opacity="0.15" />
      <text x="0" y="2" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" fontWeight="700" fill="#302744">
        {text}
      </text>
    </g>
  );
}

/* ------------------------------------------------------------ room pieces */

export function WindowProp() {
  return (
    <g>
      <rect x="-96" y="-116" width="192" height="232" rx="14" fill="var(--wood-deep)" />
      <rect x="-84" y="-104" width="168" height="208" rx="10" fill="var(--turquoise)" />
      <rect x="-84" y="-104" width="168" height="104" rx="10" fill="var(--blue)" opacity="0.35" />
      <circle cx="-36" cy="-58" r="22" fill="var(--sunshine)" />
      <g stroke="var(--sunshine)" strokeWidth="4" strokeLinecap="round" opacity="0.85">
        <line x1="-36" y1="-92" x2="-36" y2="-84" />
        <line x1="-36" y1="-32" x2="-36" y2="-24" />
        <line x1="-70" y1="-58" x2="-62" y2="-58" />
        <line x1="-10" y1="-58" x2="-2" y2="-58" />
      </g>
      <g fill="#ffffff" opacity="0.9">
        <ellipse cx="34" cy="-30" rx="26" ry="9" />
        <ellipse cx="52" cy="-38" rx="16" ry="7" />
        <ellipse cx="-40" cy="24" rx="22" ry="8" />
      </g>
      <rect x="-4" y="-104" width="8" height="208" fill="var(--wood-deep)" />
      <rect x="-84" y="-4" width="168" height="8" fill="var(--wood-deep)" />
      <rect x="-104" y="116" width="208" height="12" rx="6" fill="var(--wood)" />
      <g transform="translate(64 104) scale(0.5)">
        <PlantProp />
      </g>
    </g>
  );
}

export function PosterProp() {
  return (
    <g>
      <rect x="-68" y="-58" width="136" height="116" rx="10" fill="var(--paper)" stroke="var(--coral)" strokeWidth="4" />
      <circle cx="-26" cy="-26" r="14" fill="var(--sunshine)" />
      <polygon points="10,-40 34,-12 -14,-12" fill="var(--turquoise)" />
      <rect x="14" y="-34" width="26" height="26" rx="6" fill="var(--lavender)" transform="rotate(12 27 -21)" />
      <text x="0" y="22" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="800" fontSize="14" fill="var(--art-ink)">
        BUILD · LEARN
      </text>
      <text x="0" y="42" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="800" fontSize="14" fill="var(--art-coral)">
        SHIP
      </text>
    </g>
  );
}

export function NeuralPosterProp() {
  return (
    <g>
      <rect x="-52" y="-44" width="104" height="88" rx="10" fill="var(--lavender)" stroke="var(--ink)" strokeWidth="3" />
      <g stroke="#fff5e6" strokeWidth="2" fill="none">
        <line x1="-26" y1="-18" x2="0" y2="-28" />
        <line x1="0" y1="-28" x2="26" y2="-14" />
        <line x1="-26" y1="-18" x2="-6" y2="6" />
        <line x1="26" y1="-14" x2="-6" y2="6" />
        <line x1="-6" y1="6" x2="20" y2="16" />
      </g>
      <g fill="var(--sunshine)">
        <circle cx="-26" cy="-18" r="5" />
        <circle cx="0" cy="-28" r="5" />
        <circle cx="26" cy="-14" r="5" />
        <circle cx="-6" cy="6" r="5" />
        <circle cx="20" cy="16" r="5" />
      </g>
      <text x="0" y="34" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fontWeight="700" fill="#fff5e6">
        think in graphs
      </text>
    </g>
  );
}

export function ClockProp() {
  return (
    <g>
      <circle cx="0" cy="0" r="30" fill="var(--paper)" stroke="var(--tangerine)" strokeWidth="4" />
      <circle cx="0" cy="0" r="2.6" fill="var(--ink)" />
      <line x1="0" y1="0" x2="-9" y2="-12" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      <line x1="0" y1="0" x2="12" y2="-6" stroke="var(--coral)" strokeWidth="2.4" strokeLinecap="round" />
      {[0, 90, 180, 270].map((deg) => (
        <line key={deg} x1="0" y1="-22" x2="0" y2="-26" stroke="var(--muted)" strokeWidth="2" transform={`rotate(${deg})`} />
      ))}
    </g>
  );
}

export function ShelfProp() {
  return (
    <g>
      <rect x="-140" y="0" width="280" height="11" rx="5.5" fill="var(--wood-deep)" />
      <rect x="-120" y="-46" width="13" height="46" rx="2" fill="var(--blue)" />
      <rect x="-104" y="-38" width="12" height="38" rx="2" fill="var(--coral)" />
      <rect x="-89" y="-50" width="13" height="50" rx="2" fill="var(--sunshine)" />
      <rect x="-70" y="-40" width="11" height="40" rx="2" fill="var(--leaf)" transform="rotate(8 -64 0)" />
      <rect x="10" y="-40" width="44" height="40" rx="5" fill="var(--paper)" stroke="var(--turquoise)" strokeWidth="3" />
      <circle cx="32" cy="-26" r="7" fill="var(--tangerine)" />
      <path d="M14 -8 l12 -10 8 6 10 -8 v12 z" fill="var(--leaf)" opacity="0.9" />
      <g transform="translate(96 -2)">
        <path d="M-12 0 L-9 -16 L9 -16 L12 0 Z" fill="var(--lavender)" />
        <g stroke="var(--leaf-ink)" strokeWidth="2.4" fill="none" strokeLinecap="round">
          <path d="M0 -16 C 0 -30 -8 -32 -10 -40" />
          <path d="M0 -16 C 2 -32 10 -34 12 -42" />
        </g>
        <ellipse cx="-11" cy="-42" rx="5" ry="7" fill="var(--leaf)" transform="rotate(-20 -11 -42)" />
        <ellipse cx="13" cy="-44" rx="5" ry="7" fill="var(--leaf)" transform="rotate(18 13 -44)" />
      </g>
    </g>
  );
}


export function PinboardProp() {
  return (
    <g>
      <rect x="-72" y="-52" width="144" height="104" rx="10" fill="var(--wood)" stroke="var(--wood-deep)" strokeWidth="4" />
      <rect x="-58" y="-38" width="116" height="62" rx="4" fill="var(--paper)" transform="rotate(-2)" />
      <circle cx="-52" cy="-32" r="4" fill="var(--coral)" />
      <circle cx="52" cy="-34" r="4" fill="var(--turquoise)" />
      <text x="0" y="-12" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="800" fontSize="20" fill="var(--art-ink)" transform="rotate(-2)">
        ADARSH
      </text>
      <text x="0" y="6" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" fontWeight="700" fill="var(--art-muted)" transform="rotate(-2)">
        ai/ml · agents · products
      </text>
      <rect x="-40" y="30" width="80" height="14" rx="3" fill="var(--sunshine)" transform="rotate(1.5)" />
      <text x="0" y="40" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fontWeight="700" fill="#302744" transform="rotate(1.5)">
        welcome to my studio
      </text>
    </g>
  );
}

export function GarlandProp() {
  const bulbs = ["var(--coral)", "var(--sunshine)", "var(--turquoise)", "var(--lavender)", "var(--leaf)", "var(--tangerine)", "var(--coral)", "var(--sunshine)"];
  return (
    <g>
      <path d="M40 34 Q 400 92 800 44 Q 1200 92 1560 34" fill="none" stroke="var(--ink)" strokeWidth="2.5" opacity="0.7" />
      {bulbs.map((c, i) => {
        const x = 100 + i * 190;
        const y = i % 2 === 0 ? 62 : 70;
        return (
          <g key={i}>
            <line x1={x} y1={y - 10} x2={x} y2={y} stroke="var(--ink)" strokeWidth="2" opacity="0.7" />
            <circle cx={x} cy={y + 6} r="7" fill={c} className="neural-node" />
          </g>
        );
      })}
    </g>
  );
}

export function RugProp() {
  return (
    <g>
      <ellipse cx="0" cy="0" rx="430" ry="42" fill="var(--coral)" opacity="0.8" />
      <ellipse cx="0" cy="0" rx="360" ry="32" fill="none" stroke="var(--sunshine)" strokeWidth="5" strokeDasharray="18 12" opacity="0.9" />
      <ellipse cx="0" cy="0" rx="280" ry="22" fill="var(--tangerine)" opacity="0.55" />
    </g>
  );
}

export function DeskSurface({ width = 1140 }) {
  const half = width / 2;
  return (
    <g>
      <ellipse cx="0" cy="140" rx={half - 40} ry="26" fill="var(--plum)" opacity="0.12" />
      <polygon points={`${-half + 30},-130 ${half - 30},-130 ${half},0 ${-half},0`} fill="var(--wood)" />
      <polygon points={`${-half + 30},-130 ${half - 30},-130 ${half - 26},-116 ${-half + 26},-116`} fill="var(--raised)" opacity="0.4" />
      <g stroke="var(--wood-deep)" strokeWidth="2" opacity="0.35">
        <path d={`M${-half + 80},-90 Q 0,-70 ${half - 80},-95`} fill="none" />
        <path d={`M${-half + 60},-50 Q 0,-30 ${half - 60},-55`} fill="none" />
      </g>
      <rect x={-half} y="0" width={width} height="22" rx="7" fill="var(--wood-deep)" />
      <g transform={`translate(${half - 210} 22)`}>
        <rect x="0" y="0" width="150" height="112" rx="8" fill="var(--wood)" stroke="var(--wood-deep)" strokeWidth="3" />
        <rect x="12" y="12" width="126" height="40" rx="6" fill="var(--desk-edge)" />
        <rect x="12" y="60" width="126" height="40" rx="6" fill="var(--desk-edge)" />
        <circle cx="75" cy="32" r="5" fill="var(--coral)" />
        <circle cx="75" cy="80" r="5" fill="var(--turquoise)" />
      </g>
      <polygon points={`${-half + 90},22 ${-half + 130},22 ${-half + 122},140 ${-half + 98},140`} fill="var(--desk-leg)" />
      <rect x={-half + 122} y="96" width={width - 400} height="10" rx="5" fill="var(--desk-leg)" opacity="0.8" />
    </g>
  );
}