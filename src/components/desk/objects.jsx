import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

/**
 * Original 2.5D illustration library for the workspace desk.
 * Every object is drawn around a local origin (0,0 = its base centre) so the
 * same artwork can be composed into the desktop and mobile scenes.
 * Colors come from CSS variables, so the whole desk re-lights with the theme.
 */

const EASE = [0.22, 1, 0.36, 1];

/* ---------------------------------------------------------------- wrapper */

export function DeskObject({
  id,
  label,
  desc,
  to,
  delay = 0,
  introDone,
  onHover,
  haloRx = 62,
  haloRy = 13,
  haloY = 2,
  children,
}) {
  const navigate = useNavigate();
  const activate = () => navigate(to);

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
          activate();
        }
      }}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(id)}
      onBlur={() => onHover(null)}
    >
      <ellipse className="halo" cx="0" cy={haloY} rx={haloRx} ry={haloRy} fill="var(--blue)" fillOpacity="0.16" />
      <ellipse
        className="focus-ring"
        cx="0"
        cy={haloY}
        rx={haloRx + 6}
        ry={haloRy + 4}
        fill="none"
        stroke="var(--blue)"
        strokeWidth="2"
        strokeDasharray="5 4"
      />
      {children}
    </motion.g>
  );
}

/* ---------------------------------------------------------------- monitor */

const BOOT_LINES = [
  { text: "tdw-boot v1.0", fill: "var(--sage)" },
  { text: "> mounting workspace ......... ok", fill: "#c8d2e4" },
  { text: "> loading ai.ml modules ...... ok", fill: "#c8d2e4" },
  { text: "> agent reliability lab ...... ok", fill: "#c8d2e4" },
  { text: "> user: adarsh detected", fill: "var(--amber)" },
];

export function MonitorObject({ screenState = "ready", introDone }) {
  return (
    <g>
      <ellipse cx="0" cy="0" rx="86" ry="12" fill="var(--ink)" opacity="0.1" />
      <rect x="-46" y="-12" width="92" height="12" rx="6" fill="var(--desk-leg)" />
      <rect x="-9" y="-44" width="18" height="36" rx="4" fill="var(--desk-leg)" />
      <rect x="-140" y="-252" width="280" height="214" rx="14" fill="var(--ink)" />
      <rect x="-128" y="-240" width="256" height="182" rx="8" fill="var(--screen)" />
      <circle cx="0" cy="-246" r="2.2" fill="#3a445c" />
      <circle cx="122" cy="-49" r="2.6" fill="var(--sage)" className={screenState === "off" ? "" : "neural-node"} />
      <rect x="-16" y="-52" width="32" height="4" rx="2" fill="#3a445c" />

      {screenState === "off" && (
        <g>
          <polygon points="-128,-240 -40,-240 -128,-120" fill="#ffffff" opacity="0.03" />
          <text x="0" y="-145" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#8a93a8">
            standby
          </text>
        </g>
      )}

      {screenState === "boot" && (
        <g fontFamily="var(--font-mono)" fontSize="10.5">
          <circle cx="-114" cy="-226" r="3" fill="#e08a84" />
          <circle cx="-104" cy="-226" r="3" fill="#e0b36a" />
          <circle cx="-94" cy="-226" r="3" fill="#8fc4a8" />
          {BOOT_LINES.map((line, i) => (
            <motion.text
              key={line.text}
              x="-114"
              y={-202 + i * 22}
              fill={line.fill}
              initial={introDone ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: introDone ? 0 : 0.15 + i * 0.18, duration: 0.25 }}
            >
              {line.text}
            </motion.text>
          ))}
          <rect x="-114" y="-88" width="7" height="12" fill="var(--sage)" className="cursor-blink" />
        </g>
      )}

      {screenState === "ready" && (
        <g>
          <circle cx="-114" cy="-226" r="3" fill="#e08a84" />
          <circle cx="-104" cy="-226" r="3" fill="#e0b36a" />
          <circle cx="-94" cy="-226" r="3" fill="#8fc4a8" />
          <text x="-114" y="-192" fontFamily="var(--font-sans)" fontWeight="800" fontSize="19" fill="#f5f1e9">
            Hello, I&apos;m Adarsh.
          </text>
          <text x="-114" y="-168" fontFamily="var(--font-mono)" fontSize="9.5" fill="#8fc4a8">
            AI/ML Student | Aspiring AI Engineer
          </text>
          <text x="-114" y="-152" fontFamily="var(--font-mono)" fontSize="9.5" fill="#e4b98a">
            Product Builder
          </text>
          <rect x="-114" y="-136" width="150" height="1.5" fill="#3a445c" />
          <text x="-114" y="-118" fontFamily="var(--font-mono)" fontSize="9.5" fill="#93bef2">
            ~ explore my workspace
          </text>
          <rect x="16" y="-127" width="7" height="11" fill="#93bef2" className="cursor-blink" />
          <text x="-114" y="-72" fontFamily="var(--font-mono)" fontSize="8.5" fill="#8a93a8">
            status: ready · 8 objects online
          </text>
        </g>
      )}
    </g>
  );
}

/* ----------------------------------------------------------------- laptop */

export function LaptopObject() {
  return (
    <g>
      <ellipse cx="0" cy="2" rx="112" ry="11" fill="var(--ink)" opacity="0.1" />
      <rect x="-85" y="-142" width="170" height="120" rx="9" fill="var(--ink)" />
      <rect x="-77" y="-134" width="154" height="100" rx="5" fill="#16233a" />
      <rect x="-77" y="-134" width="154" height="16" rx="5" fill="var(--blue-ink)" />
      <text x="-68" y="-123" fontFamily="var(--font-mono)" fontSize="8" fill="var(--raised)">
        projects/
      </text>
      {[
        { x: -68, fill: "var(--sage)" },
        { x: -20, fill: "var(--amber)" },
        { x: 28, fill: "var(--blue)" },
      ].map((c) => (
        <g key={c.x}>
          <rect x={c.x} y="-108" width="42" height="30" rx="4" fill={c.fill} opacity="0.85" />
          <rect x={c.x + 5} y="-72" width="32" height="3.5" rx="1.75" fill="#8a93a8" />
          <rect x={c.x + 5} y="-64" width="22" height="3.5" rx="1.75" fill="#5d6880" />
        </g>
      ))}
      <rect x="-68" y="-52" width="136" height="4" rx="2" fill="#3a445c" />
      <polygon points="-100,-22 100,-22 118,0 -118,0" fill="var(--desk-edge)" />
      <rect x="-88" y="-18" width="176" height="4" rx="2" fill="var(--ink)" opacity="0.18" />
      <rect x="-80" y="-11" width="160" height="4" rx="2" fill="var(--ink)" opacity="0.14" />
      <rect x="-24" y="-5" width="48" height="4" rx="2" fill="var(--ink)" opacity="0.18" />
    </g>
  );
}

/* --------------------------------------------------------------- AI chip */

export function ChipObject() {
  return (
    <g>
      <ellipse cx="0" cy="0" rx="46" ry="9" fill="var(--ink)" opacity="0.1" />
      <g stroke="var(--line)" strokeWidth="1.5">
        <line x1="-24" y1="-52" x2="-46" y2="-72" />
        <line x1="24" y1="-52" x2="46" y2="-78" />
        <line x1="0" y1="-58" x2="0" y2="-94" />
      </g>
      <circle cx="-46" cy="-72" r="4.5" fill="var(--sage)" className="neural-node" />
      <circle cx="46" cy="-78" r="4.5" fill="var(--amber)" className="neural-node" />
      <circle cx="0" cy="-94" r="4.5" fill="var(--blue)" className="neural-node" />
      {[-20, -8, 4, 16].map((x) => (
        <g key={x} fill="var(--desk-leg)">
          <rect x={x} y="-62" width="4" height="8" rx="1" />
          <rect x={x} y="-2" width="4" height="8" rx="1" />
        </g>
      ))}
      {[-44, -32, -20].map((y) => (
        <g key={y} fill="var(--desk-leg)">
          <rect x="-36" y={y} width="8" height="4" rx="1" />
          <rect x="28" y={y} width="8" height="4" rx="1" />
        </g>
      ))}
      <rect x="-28" y="-56" width="56" height="56" rx="9" fill="var(--ink)" />
      <rect x="-19" y="-47" width="38" height="38" rx="5" fill="var(--blue-ink)" />
      <g stroke="#f5f1e9" strokeWidth="1.4" opacity="0.75" fill="none">
        <path d="M-12 -38 h8 v8 h8" />
        <path d="M-12 -22 h6 v-6" />
        <circle cx="10" cy="-34" r="2" fill="#f5f1e9" />
      </g>
      <text x="0" y="-14" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="700" fontSize="9" fill="var(--raised)">
        AI
      </text>
    </g>
  );
}

/* --------------------------------------------------------------- notebook */

export function NotebookObject() {
  return (
    <g>
      <ellipse cx="0" cy="0" rx="88" ry="10" fill="var(--ink)" opacity="0.08" />
      <polygon points="-84,-4 -4,-12 -4,-62 -78,-54" fill="var(--wood)" />
      <polygon points="84,-4 4,-12 4,-62 78,-54" fill="var(--wood)" />
      <polygon points="-78,-8 -8,-15 -8,-58 -72,-51" fill="var(--paper)" />
      <polygon points="78,-8 8,-15 8,-58 72,-51" fill="var(--paper)" />
      <g stroke="var(--line)" strokeWidth="1.4">
        <line x1="-66" y1="-44" x2="-16" y2="-49" />
        <line x1="-66" y1="-34" x2="-16" y2="-39" />
        <line x1="-66" y1="-24" x2="-40" y2="-27" />
        <line x1="16" y1="-49" x2="66" y2="-44" />
        <line x1="16" y1="-39" x2="66" y2="-34" />
      </g>
      <g stroke="var(--blue)" strokeWidth="1.6" fill="none" opacity="0.8">
        <path d="M24 -30 l10 -8 l10 8 l-10 8 z" />
        <circle cx="54" cy="-30" r="2.4" fill="var(--sage)" stroke="none" />
      </g>
      {[-52, -42, -32, -22, -12].map((y) => (
        <circle key={y} cx="0" cy={y - 3} r="2.6" fill="none" stroke="var(--desk-leg)" strokeWidth="1.6" />
      ))}
      <g transform="translate(34 -14) rotate(-16)">
        <rect x="-34" y="-4" width="62" height="7" rx="2" fill="var(--amber)" />
        <polygon points="28,-4 38,-0.5 28,3" fill="var(--ink)" />
        <rect x="-40" y="-4" width="7" height="7" rx="2" fill="var(--sage)" />
      </g>
    </g>
  );
}

/* ----------------------------------------------------------------- folder */

export function FolderObject() {
  return (
    <g>
      <ellipse cx="0" cy="0" rx="72" ry="10" fill="var(--ink)" opacity="0.08" />
      <rect x="-58" y="-72" width="116" height="70" rx="6" fill="var(--wood)" />
      <rect x="-58" y="-82" width="46" height="16" rx="5" fill="var(--wood)" />
      <rect x="-50" y="-78" width="100" height="12" rx="2" fill="var(--paper)" />
      <rect x="-44" y="-70" width="88" height="10" rx="2" fill="var(--paper)" opacity="0.85" />
      <g transform="rotate(-2)">
        <rect x="-64" y="-58" width="128" height="58" rx="7" fill="var(--amber)" />
        <rect x="-40" y="-44" width="80" height="19" rx="3" fill="var(--paper)" />
        <text x="0" y="-31" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="700" fontSize="8.5" fill="var(--ink)">
          PROJECTS
        </text>
        <rect x="-40" y="-18" width="52" height="3.5" rx="1.75" fill="var(--wood)" opacity="0.6" />
      </g>
    </g>
  );
}

/* ---------------------------------------------------------------- ID card */

export function IdCardObject() {
  return (
    <g>
      <path d="M0 0 C 9 18 -9 38 0 54" stroke="var(--blue)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <rect x="-7" y="52" width="14" height="9" rx="2.5" fill="var(--ink)" />
      <rect x="-31" y="60" width="62" height="82" rx="7" fill="var(--paper)" stroke="var(--line)" strokeWidth="1.5" />
      <path d="M-31 67 a7 7 0 0 1 7 -7 h48 a7 7 0 0 1 7 7 v11 h-62 z" fill="var(--blue-ink)" />
      <text x="0" y="73" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="700" fontSize="6.5" fill="var(--raised)">
        DEV WORKSPACE
      </text>
      <circle cx="0" cy="94" r="11" fill="var(--bg-desk)" />
      <circle cx="0" cy="90" r="4" fill="var(--muted)" />
      <path d="M-7 102 a7 6 0 0 1 14 0 z" fill="var(--muted)" />
      <rect x="-18" y="112" width="36" height="4" rx="2" fill="var(--ink)" opacity="0.75" />
      <rect x="-13" y="120" width="26" height="3" rx="1.5" fill="var(--muted)" opacity="0.7" />
      <text x="0" y="135" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="700" fontSize="7.5" fill="var(--blue-ink)">
        ADARSH
      </text>
    </g>
  );
}

/* ----------------------------------------------------------------- trophy */

export function TrophyObject() {
  return (
    <g>
      <ellipse cx="0" cy="0" rx="34" ry="8" fill="var(--ink)" opacity="0.1" />
      <rect x="-24" y="-9" width="48" height="9" rx="3" fill="var(--ink)" />
      <rect x="-16" y="-15" width="32" height="6" rx="2" fill="var(--wood)" />
      <rect x="-5" y="-32" width="10" height="18" rx="3" fill="var(--wood)" />
      <path d="M-25 -76 C -25 -46 -11 -35 0 -33 C 11 -35 25 -46 25 -76 Z" fill="var(--amber)" />
      <rect x="-28" y="-82" width="56" height="9" rx="4.5" fill="var(--wood)" />
      <path d="M-25 -70 C -38 -68 -38 -52 -22 -50" stroke="var(--wood)" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M25 -70 C 38 -68 38 -52 22 -50" stroke="var(--wood)" strokeWidth="5" fill="none" strokeLinecap="round" />
      <polygon points="0,-66 3,-59 10,-59 4.5,-54 6.5,-47 0,-51 -6.5,-47 -4.5,-54 -10,-59 -3,-59" fill="var(--paper)" />
      <g fill="var(--sage)" className="floaty">
        <path d="M34 -92 l2 4 4 2 -4 2 -2 4 -2 -4 -4 -2 4 -2 z" opacity="0.9" />
        <path d="M-38 -88 l1.5 3 3 1.5 -3 1.5 -1.5 3 -1.5 -3 -3 -1.5 3 -1.5 z" opacity="0.7" />
      </g>
    </g>
  );
}

/* --------------------------------------------------------------- envelope */

export function EnvelopeObject() {
  return (
    <g>
      <ellipse cx="0" cy="0" rx="58" ry="9" fill="var(--ink)" opacity="0.08" />
      <g transform="rotate(-3)">
        <polygon points="-52,-4 52,-4 44,-42 -44,-42" fill="var(--paper)" stroke="var(--line)" strokeWidth="1.5" />
        <polyline points="-44,-42 0,-20 44,-42" fill="none" stroke="var(--line)" strokeWidth="1.5" />
        <line x1="-52" y1="-4" x2="-14" y2="-22" stroke="var(--line)" strokeWidth="1.2" />
        <line x1="52" y1="-4" x2="14" y2="-22" stroke="var(--line)" strokeWidth="1.2" />
        <circle cx="0" cy="-21" r="10" fill="var(--sage)" />
        <text x="0" y="-17.5" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="700" fontSize="10" fill="var(--screen)">
          @
        </text>
      </g>
    </g>
  );
}

/* ------------------------------------------------------- decorative props */

export function KeyboardProp() {
  return (
    <g>
      <rect x="-110" y="-30" width="220" height="30" rx="7" fill="var(--raised)" stroke="var(--line)" strokeWidth="1.5" />
      {[0, 1, 2].map((row) =>
        Array.from({ length: 12 }).map((_, col) => (
          <rect
            key={`${row}-${col}`}
            x={-100 + col * 17}
            y={-26 + row * 8}
            width="13"
            height="5.5"
            rx="1.5"
            fill="var(--bg-desk)"
          />
        )),
      )}
    </g>
  );
}

export function MouseProp() {
  return (
    <g>
      <rect x="-34" y="-26" width="68" height="26" rx="9" fill="var(--bg-desk)" stroke="var(--line)" strokeWidth="1.4" />
      <rect x="-11" y="-24" width="22" height="22" rx="10" fill="var(--raised)" stroke="var(--line)" strokeWidth="1.4" />
      <line x1="0" y1="-22" x2="0" y2="-15" stroke="var(--muted)" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  );
}

export function CoffeeProp() {
  return (
    <g>
      <ellipse cx="0" cy="0" rx="26" ry="6" fill="var(--ink)" opacity="0.08" />
      <path d="M-20 -34 L-16 0 L16 0 L20 -34 Z" fill="var(--sage)" />
      <rect x="-22" y="-38" width="44" height="7" rx="3.5" fill="var(--sage-ink)" />
      <path d="M20 -30 C 32 -28 32 -12 18 -10" stroke="var(--sage-ink)" strokeWidth="4.5" fill="none" />
      <ellipse cx="0" cy="-35" rx="17" ry="3" fill="var(--wood)" />
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
      <ellipse cx="0" cy="0" rx="26" ry="6" fill="var(--ink)" opacity="0.08" />
      <g stroke="var(--sage-ink)" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M0 -22 C 0 -44 -14 -50 -18 -62" />
        <path d="M0 -22 C 2 -48 14 -52 16 -66" />
        <path d="M0 -22 C -2 -40 6 -56 2 -70" />
      </g>
      <g fill="var(--sage)">
        <ellipse cx="-19" cy="-64" rx="7" ry="10" transform="rotate(-24 -19 -64)" />
        <ellipse cx="17" cy="-68" rx="7" ry="10" transform="rotate(20 17 -68)" />
        <ellipse cx="2" cy="-73" rx="6.5" ry="10" />
      </g>
      <path d="M-18 -22 L-14 0 L14 0 L18 -22 Z" fill="var(--amber)" />
      <rect x="-20" y="-26" width="40" height="6" rx="3" fill="var(--wood)" />
    </g>
  );
}

export function BooksProp() {
  const books = [
    { y: -14, w: 74, fill: "var(--blue)" },
    { y: -28, w: 66, fill: "var(--sage)" },
    { y: -42, w: 70, fill: "var(--amber)" },
  ];
  return (
    <g>
      <ellipse cx="0" cy="0" rx="42" ry="7" fill="var(--ink)" opacity="0.08" />
      {books.map((b) => (
        <g key={b.y}>
          <rect x={-b.w / 2} y={b.y} width={b.w} height="14" rx="3" fill={b.fill} />
          <rect x={-b.w / 2 + 6} y={b.y + 4} width={b.w - 24} height="2.5" rx="1.25" fill="#f5f1e9" opacity="0.65" />
        </g>
      ))}
    </g>
  );
}

export function StickyNoteProp({ fill = "var(--amber)", text = "ship it" }) {
  return (
    <g transform="rotate(4)">
      <rect x="-18" y="-18" width="36" height="36" rx="2" fill={fill} />
      <polygon points="18,10 18,18 10,18" fill="var(--ink)" opacity="0.12" />
      <text x="0" y="2" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" fontWeight="700" fill="#252c38">
        {text}
      </text>
    </g>
  );
}

/* ------------------------------------------------------------ room pieces */

export function WindowProp() {
  return (
    <g>
      <rect x="-92" y="-112" width="184" height="224" rx="12" fill="var(--desk-edge)" />
      <rect x="-80" y="-100" width="160" height="200" rx="8" fill="#bcd7ee" />
      <circle cx="-34" cy="-58" r="20" fill="var(--amber)" />
      <g fill="#ffffff" opacity="0.85">
        <ellipse cx="30" cy="-30" rx="26" ry="9" />
        <ellipse cx="48" cy="-38" rx="16" ry="7" />
        <ellipse cx="-42" cy="18" rx="22" ry="8" />
      </g>
      <rect x="-4" y="-100" width="8" height="200" fill="var(--desk-edge)" />
      <rect x="-80" y="-4" width="160" height="8" fill="var(--desk-edge)" />
      <rect x="-100" y="112" width="200" height="10" rx="5" fill="var(--desk-leg)" />
    </g>
  );
}

export function PosterProp() {
  return (
    <g>
      <rect x="-66" y="-56" width="132" height="112" rx="8" fill="var(--raised)" stroke="var(--line)" strokeWidth="2" />
      <g stroke="var(--blue)" strokeWidth="1.6" fill="none" opacity="0.85">
        <circle cx="-24" cy="-24" r="5" fill="var(--blue)" stroke="none" />
        <circle cx="20" cy="-32" r="4" fill="var(--sage)" stroke="none" />
        <circle cx="0" cy="-6" r="4" fill="var(--amber)" stroke="none" />
        <line x1="-24" y1="-24" x2="20" y2="-32" />
        <line x1="-24" y1="-24" x2="0" y2="-6" />
        <line x1="20" y1="-32" x2="0" y2="-6" />
      </g>
      <text x="0" y="22" textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="800" fontSize="13" fill="var(--ink)">
        BUILD · LEARN
      </text>
      <text x="0" y="40" textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="800" fontSize="13" fill="var(--blue-ink)">
        SHIP
      </text>
    </g>
  );
}

export function ClockProp() {
  return (
    <g>
      <circle cx="0" cy="0" r="30" fill="var(--raised)" stroke="var(--line)" strokeWidth="3" />
      <circle cx="0" cy="0" r="2.4" fill="var(--ink)" />
      <line x1="0" y1="0" x2="-9" y2="-12" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      <line x1="0" y1="0" x2="12" y2="-6" stroke="var(--amber-ink)" strokeWidth="2.4" strokeLinecap="round" />
      {[0, 90, 180, 270].map((deg) => (
        <line
          key={deg}
          x1="0"
          y1="-24"
          x2="0"
          y2="-27"
          stroke="var(--muted)"
          strokeWidth="2"
          transform={`rotate(${deg})`}
        />
      ))}
    </g>
  );
}

export function ShelfProp() {
  return (
    <g>
      <rect x="-140" y="0" width="280" height="10" rx="5" fill="var(--desk-leg)" />
      <rect x="-120" y="-46" width="13" height="46" rx="2" fill="var(--blue)" />
      <rect x="-104" y="-38" width="12" height="38" rx="2" fill="var(--sage)" />
      <rect x="-89" y="-50" width="13" height="50" rx="2" fill="var(--amber)" />
      <rect x="-70" y="-40" width="11" height="40" rx="2" fill="var(--muted)" transform="rotate(8 -64 0)" />
      <rect x="10" y="-40" width="44" height="40" rx="4" fill="var(--raised)" stroke="var(--line)" strokeWidth="2" />
      <circle cx="32" cy="-26" r="7" fill="var(--amber)" />
      <path d="M14 -8 l12 -10 8 6 10 -8 v12 z" fill="var(--sage)" opacity="0.8" />
      <g transform="translate(96 -2)">
        <path d="M-12 0 L-9 -16 L9 -16 L12 0 Z" fill="var(--amber)" />
        <g stroke="var(--sage-ink)" strokeWidth="2.4" fill="none" strokeLinecap="round">
          <path d="M0 -16 C 0 -30 -8 -32 -10 -40" />
          <path d="M0 -16 C 2 -32 10 -34 12 -42" />
        </g>
        <ellipse cx="-11" cy="-42" rx="5" ry="7" fill="var(--sage)" transform="rotate(-20 -11 -42)" />
        <ellipse cx="13" cy="-44" rx="5" ry="7" fill="var(--sage)" transform="rotate(18 13 -44)" />
      </g>
    </g>
  );
}

export function DeskSurface({ width = 1140 }) {
  const half = width / 2;
  return (
    <g>
      <polygon
        points={`${-half + 30},-130 ${half - 30},-130 ${half},0 ${-half},0`}
        fill="var(--bg-desk)"
      />
      <polygon
        points={`${-half + 30},-130 ${half - 30},-130 ${half - 26},-118 ${-half + 26},-118`}
        fill="var(--raised)"
        opacity="0.5"
      />
      <rect x={-half} y="0" width={width} height="20" rx="6" fill="var(--desk-edge)" />
      <polygon points={`${-half + 90},20 ${-half + 130},20 ${-half + 122},140 ${-half + 98},140`} fill="var(--desk-leg)" />
      <polygon points={`${half - 130},20 ${half - 90},20 ${half - 98},140 ${half - 122},140`} fill="var(--desk-leg)" />
      <rect x={-half + 122} y="96" width={width - 244} height="10" rx="5" fill="var(--desk-leg)" opacity="0.7" />
    </g>
  );
}