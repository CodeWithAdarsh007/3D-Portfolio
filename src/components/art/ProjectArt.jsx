/**
 * Original concept artwork for each project — illustrated UI concepts,
 * NOT product screenshots. Every usage is labelled
 * "Interface concept".
 * Palettes come from CSS variables so the art re-lights with the theme.
 */

const P = {
  screen: "var(--screen)",
  tangerine: "var(--tangerine)",
  sunshine: "var(--sunshine)",
  blue: "var(--blue)",
  leaf: "var(--leaf)",
  lavender: "var(--lavender)",
  coral: "var(--coral)",
  turquoise: "var(--turquoise)",
  plum: "var(--art-ink)",
  paper: "var(--paper)",
  raised: "var(--art-paper)",
  line: "var(--line)",
  muted: "var(--art-muted)",
};

function Frame({ id, from, to, children }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={`color-mix(in srgb,var(--art-stage-start) 93%,${from})`} />
          <stop offset="1" stopColor={`color-mix(in srgb,var(--art-stage-end) 95%,${to})`} />
        </linearGradient>
        <radialGradient id={`${id}-light`} cx="70%" cy="8%" r="88%">
          <stop stopColor="var(--art-stage-light)" stopOpacity=".75" />
          <stop offset="1" stopColor="var(--art-stage-light)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill={`url(#${id}-bg)`} />
      <rect width="800" height="500" fill={`url(#${id}-light)`} />
      {children}
    </>
  );
}

function Window({ x, y, w, h, title, accent, children }) {
  return (
    <g>
      <rect x={x + 8} y={y + 10} width={w} height={h} rx="16" fill={P.plum} opacity="0.18" />
      <rect x={x} y={y} width={w} height={h} rx="16" fill={P.paper} stroke={P.plum} strokeWidth="3" />
      <path d={`M${x} ${y + 16} a16 16 0 0 1 16 -16 h${w - 32} a16 16 0 0 1 16 16 v22 h-${w} z`} fill={accent} />
      <circle cx={x + 20} cy={y + 19} r="4.5" fill={P.paper} opacity="0.9" />
      <circle cx={x + 36} cy={y + 19} r="4.5" fill={P.paper} opacity="0.65" />
      <circle cx={x + 52} cy={y + 19} r="4.5" fill={P.paper} opacity="0.45" />
      <text x={x + w / 2} y={y + 24} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700" fill={P.plum}>
        {title}
      </text>
      {children}
    </g>
  );
}

/* ------------------------------------------------------------- NoteKart */

function NoteKartArt() {
  const listings = [
    { x: 250, y: 150, c: P.blue, t: "SEM 4 NOTES" },
    { x: 400, y: 150, c: P.leaf, t: "LAB MANUALS" },
    { x: 250, y: 265, c: P.coral, t: "PYQ BANK" },
    { x: 400, y: 265, c: P.sunshine, t: "PROJECT FILES" },
  ];
  return (
    <Frame id="nk" from={P.tangerine} to={P.sunshine}>
      {/* floating study props */}
      <g transform="translate(80 90) rotate(-10)">
        <rect x="0" y="0" width="70" height="92" rx="8" fill={P.blue} stroke={P.plum} strokeWidth="3" />
        <rect x="10" y="14" width="50" height="8" rx="4" fill={P.paper} opacity="0.85" />
        <rect x="10" y="30" width="38" height="6" rx="3" fill={P.paper} opacity="0.6" />
      </g>
      <g transform="translate(660 330) rotate(9)">
        <rect x="0" y="0" width="76" height="98" rx="8" fill={P.leaf} stroke={P.plum} strokeWidth="3" />
        <rect x="12" y="16" width="52" height="8" rx="4" fill={P.paper} opacity="0.85" />
      </g>
      <Window x={210} y={90} w={380} h={330} title="notekart · student marketplace" accent={P.tangerine}>
        {listings.map((l) => (
          <g key={l.t}>
            <rect x={l.x} y={l.y} width="130" height="95" rx="10" fill={P.raised} stroke={P.line} strokeWidth="2" />
            <rect x={l.x + 10} y={l.y + 10} width="44" height="56" rx="5" fill={l.c} />
            <rect x={l.x + 62} y={l.y + 14} width="58" height="7" rx="3.5" fill={P.plum} opacity="0.8" />
            <rect x={l.x + 62} y={l.y + 28} width="44" height="5" rx="2.5" fill={P.muted} opacity="0.6" />
            <rect x={l.x + 62} y={l.y + 44} width="52" height="14" rx="7" fill={P.sunshine} stroke={P.plum} strokeWidth="1.5" />
            <text x={l.x + 88} y={l.y + 54} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" fontWeight="700" fill={P.plum}>
              exchange
            </text>
            <text x={l.x + 10} y={l.y + 84} fontFamily="var(--font-mono)" fontSize="8" fontWeight="700" fill={P.muted}>
              {l.t}
            </text>
          </g>
        ))}
        <rect x="250" y="375" width="280" height="30" rx="15" fill={P.blue} />
        <text x="390" y="394" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11" fontWeight="800" fill="#ffffff">
          list your material
        </text>
      </Window>
      {/* chat bubble */}
      <g transform="translate(600 120)">
        <rect x="0" y="0" width="150" height="86" rx="14" fill={P.paper} stroke={P.plum} strokeWidth="3" />
        <polygon points="24,86 40,86 28,104" fill={P.paper} stroke={P.plum} strokeWidth="3" />
        <circle cx="26" cy="26" r="11" fill={P.coral} />
        <rect x="46" y="18" width="86" height="7" rx="3.5" fill={P.plum} opacity="0.75" />
        <rect x="46" y="32" width="64" height="6" rx="3" fill={P.muted} opacity="0.6" />
        <rect x="16" y="52" width="118" height="18" rx="9" fill={P.leaf} opacity="0.9" />
        <text x="75" y="64" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fontWeight="700" fill={P.plum}>
          deal! meet at library
        </text>
      </g>
      {/* community dots */}
      <g transform="translate(96 300)">
        {[P.blue, P.coral, P.leaf, P.sunshine].map((c, i) => (
          <circle key={c} cx={i * 26} cy={i % 2 ? 8 : 0} r="14" fill={c} stroke={P.plum} strokeWidth="2.5" />
        ))}
        <text x="36" y="46" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" fill={P.plum}>
          student community
        </text>
      </g>
    </Frame>
  );
}

/* ---------------------------------------------- Paper Format Translator */

function PaperArt() {
  return (
    <Frame id="pft" from={P.leaf} to={P.turquoise}>
      <Window x={70} y={80} w={280} h={340} title="original.tex" accent={P.leaf}>
        <rect x="95" y="130" width="180" height="12" rx="6" fill={P.plum} opacity="0.85" />
        <rect x="95" y="152" width="140" height="7" rx="3.5" fill={P.muted} opacity="0.6" />
        {[176, 190, 204, 218].map((y) => (
          <rect key={y} x="95" y={y} width="230" height="6" rx="3" fill={P.muted} opacity="0.4" />
        ))}
        <rect x="95" y="238" width="105" height="70" rx="8" fill={P.turquoise} opacity="0.55" />
        <path d="M105 292 l24 -26 18 14 22 -30 26 42 z" fill={P.leaf} />
        <rect x="215" y="238" width="110" height="70" rx="8" fill={P.raised} stroke={P.line} strokeWidth="2" />
        {[252, 268, 284].map((y) => (
          <g key={y}>
            <line x1="225" y1={y} x2="315" y2={y} stroke={P.muted} strokeWidth="2" opacity="0.5" />
          </g>
        ))}
        <line x1="255" y1="244" x2="255" y2="302" stroke={P.muted} strokeWidth="2" opacity="0.5" />
        <rect x="95" y="322" width="230" height="6" rx="3" fill={P.muted} opacity="0.4" />
        <rect x="95" y="336" width="190" height="6" rx="3" fill={P.muted} opacity="0.4" />
        <text x="95" y="372" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" fill={P.leaf}>
          [1] [2] [3] references
        </text>
      </Window>
      {/* conversion arrow */}
      <g transform="translate(368 230)">
        <circle cx="32" cy="20" r="34" fill={P.sunshine} stroke={P.plum} strokeWidth="3" />
        <path d="M14 20 h30 m-10 -10 l10 10 -10 10" stroke={P.plum} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="32" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" fill={P.plum}>
          convert
        </text>
      </g>
      <Window x={450} y={80} w={280} h={340} title="converted.docx" accent={P.turquoise}>
        <rect x="475" y="130" width="180" height="12" rx="6" fill={P.plum} opacity="0.85" />
        <rect x="475" y="152" width="140" height="7" rx="3.5" fill={P.muted} opacity="0.6" />
        {[176, 190, 204, 218].map((y) => (
          <rect key={y} x="475" y={y} width="230" height="6" rx="3" fill={P.muted} opacity="0.4" />
        ))}
        <rect x="475" y="238" width="105" height="70" rx="8" fill={P.turquoise} opacity="0.55" />
        <path d="M485 292 l24 -26 18 14 22 -30 26 42 z" fill={P.leaf} />
        <rect x="595" y="238" width="110" height="70" rx="8" fill={P.raised} stroke={P.line} strokeWidth="2" />
        {[252, 268, 284].map((y) => (
          <line key={y} x1="605" y1={y} x2="695" y2={y} stroke={P.muted} strokeWidth="2" opacity="0.5" />
        ))}
        <line x1="635" y1="244" x2="635" y2="302" stroke={P.muted} strokeWidth="2" opacity="0.5" />
        <rect x="475" y="322" width="230" height="6" rx="3" fill={P.muted} opacity="0.4" />
        <rect x="475" y="336" width="190" height="6" rx="3" fill={P.coral} opacity="0.75" />
        <text x="475" y="372" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" fill={P.leaf}>
          [1] [2] [3] references
        </text>
        {/* defect flag */}
        <g transform="translate(640 322)">
          <circle cx="0" cy="0" r="14" fill={P.coral} stroke={P.plum} strokeWidth="2.5" />
          <text x="0" y="4" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fontWeight="800" fill={P.plum}>
            !
          </text>
        </g>
      </Window>
      {/* check badges */}
      <g transform="translate(330 400)">
        {[
          { x: 0, c: P.leaf, t: "structure" },
          { x: 110, c: P.leaf, t: "figures" },
          { x: 210, c: P.sunshine, t: "citations" },
        ].map((b) => (
          <g key={b.t} transform={`translate(${b.x} 0)`}>
            <rect x="0" y="0" width="96" height="26" rx="13" fill={b.c} stroke={P.plum} strokeWidth="2.5" />
            <text x="48" y="17" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" fill={P.plum}>
              {b.t}
            </text>
          </g>
        ))}
      </g>
    </Frame>
  );
}

/* ------------------------------------------------------------------ Diet */

function DietArt() {
  return (
    <Frame id="diet" from={P.coral} to={P.sunshine}>
      <Window x={80} y={70} w={400} h={360} title="diet studio · streamlit" accent={P.coral}>
        {/* donut */}
        <g transform="translate(180 200)">
          <circle r="62" fill="none" stroke={P.line} strokeWidth="24" />
          <circle r="62" fill="none" stroke={P.leaf} strokeWidth="24" strokeDasharray="150 390" transform="rotate(-90)" strokeLinecap="round" />
          <circle r="62" fill="none" stroke={P.turquoise} strokeWidth="24" strokeDasharray="110 390" strokeDashoffset="-150" transform="rotate(-90)" strokeLinecap="round" />
          <circle r="62" fill="none" stroke={P.sunshine} strokeWidth="24" strokeDasharray="80 390" strokeDashoffset="-260" transform="rotate(-90)" strokeLinecap="round" />
          <text y="-2" textAnchor="middle" fontFamily="var(--font-display)" fontSize="22" fontWeight="800" fill={P.plum}>
            TDEE
          </text>
          <text y="18" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill={P.muted}>
            energy budget
          </text>
        </g>
        {/* bars */}
        <g transform="translate(300 250)">
          {[
            { h: 60, c: P.coral },
            { h: 90, c: P.leaf },
            { h: 45, c: P.turquoise },
            { h: 75, c: P.sunshine },
          ].map((b, i) => (
            <rect key={i} x={i * 34} y={-b.h} width="24" height={b.h} rx="6" fill={b.c} stroke={P.plum} strokeWidth="2" />
          ))}
          <line x1="-8" y1="0" x2="140" y2="0" stroke={P.plum} strokeWidth="2.5" />
          <text x="60" y="20" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill={P.muted}>
            macros · sample
          </text>
        </g>
        {/* stat tiles */}
        {[
          { x: 105, t: "BMI", c: P.turquoise },
          { x: 215, t: "BMR", c: P.leaf },
          { x: 325, t: "TDEE", c: P.sunshine },
        ].map((s) => (
          <g key={s.t}>
            <rect x={s.x} y="300" width="95" height="46" rx="10" fill={s.c} opacity="0.9" stroke={P.plum} strokeWidth="2" />
            <text x={s.x + 47} y="328" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fontWeight="800" fill={P.plum}>
              {s.t}
            </text>
          </g>
        ))}
        <rect x="105" y="360" width="315" height="34" rx="17" fill={P.leaf} stroke={P.plum} strokeWidth="2.5" />
        <text x="262" y="381" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="12" fontWeight="800" fill={P.plum}>
          suggest meals
        </text>
      </Window>
      {/* food illustrations */}
      <g transform="translate(560 120)">
        <circle cx="40" cy="40" r="36" fill={P.coral} stroke={P.plum} strokeWidth="3" />
        <path d="M40 6 q4 -10 12 -10" stroke={P.leaf} strokeWidth="5" fill="none" strokeLinecap="round" />
        <ellipse cx="52" cy="2" rx="10" ry="6" fill={P.leaf} />
        <circle cx="28" cy="30" r="7" fill="#ffffff" opacity="0.5" />
      </g>
      <g transform="translate(540 250)">
        <path d="M0 30 a44 44 0 0 0 88 0 z" fill={P.turquoise} stroke={P.plum} strokeWidth="3" />
        <ellipse cx="44" cy="30" rx="44" ry="10" fill={P.sunshine} stroke={P.plum} strokeWidth="3" />
        <circle cx="30" cy="26" r="6" fill={P.coral} />
        <circle cx="52" cy="30" r="6" fill={P.leaf} />
      </g>
      <g transform="translate(600 360)">
        <ellipse cx="40" cy="30" rx="40" ry="28" fill={P.leaf} stroke={P.plum} strokeWidth="3" />
        <ellipse cx="40" cy="30" rx="16" ry="12" fill={P.sunshine} stroke={P.plum} strokeWidth="2.5" />
      </g>
      <text x="620" y="452" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="700" fill={P.plum}>
        meal ideas · sample data
      </text>
    </Frame>
  );
}

/* -------------------------------------------------------------- Election */

function ElectionArt() {
  return (
    <Frame id="elec" from={P.lavender} to={P.blue}>
      <Window x={90} y={70} w={380} h={360} title="college election · live" accent={P.lavender}>
        {[
          { y: 130, c: P.coral, n: "Candidate A", w: 150 },
          { y: 200, c: P.turquoise, n: "Candidate B", w: 110 },
          { y: 270, c: P.sunshine, n: "Candidate C", w: 80 },
        ].map((cand) => (
          <g key={cand.n}>
            <rect x="115" y={cand.y} width="330" height="56" rx="12" fill={P.raised} stroke={P.line} strokeWidth="2" />
            <circle cx="147" cy={cand.y + 28} r="17" fill={cand.c} stroke={P.plum} strokeWidth="2.5" />
            <circle cx="147" cy={cand.y + 23} r="6" fill={P.plum} opacity="0.7" />
            <path d={`M136 ${cand.y + 38} a11 9 0 0 1 22 0 z`} fill={P.plum} opacity="0.7" />
            <text x="176" y={cand.y + 24} fontFamily="var(--font-sans)" fontSize="12" fontWeight="800" fill={P.plum}>
              {cand.n}
            </text>
            <rect x="176" y={cand.y + 32} width="200" height="10" rx="5" fill={P.line} />
            <rect x="176" y={cand.y + 32} width={cand.w} height="10" rx="5" fill={cand.c} />
            <rect x="392" y={cand.y + 16} width="38" height="24" rx="7" fill={P.leaf} stroke={P.plum} strokeWidth="2" />
            <path d={`M400 ${cand.y + 28} l6 6 12 -12`} stroke={P.plum} strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        ))}
        <rect x="115" y="345" width="330" height="36" rx="18" fill={P.blue} stroke={P.plum} strokeWidth="2.5" />
        <text x="280" y="368" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="12" fontWeight="800" fill="#ffffff">
          cast vote · one student, one vote
        </text>
      </Window>
      {/* ballot box */}
      <g transform="translate(540 180)">
        <rect x="0" y="40" width="170" height="130" rx="14" fill={P.coral} stroke={P.plum} strokeWidth="3" />
        <rect x="35" y="52" width="100" height="10" rx="5" fill={P.plum} />
        <g transform="rotate(-8 85 20)">
          <rect x="45" y="-16" width="80" height="52" rx="6" fill={P.paper} stroke={P.plum} strokeWidth="3" />
          <path d="M62 8 l10 10 22 -22" stroke={P.leaf} strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
        <circle cx="85" cy="115" r="24" fill={P.sunshine} stroke={P.plum} strokeWidth="3" />
        <path d="M74 115 l8 8 16 -16" stroke={P.plum} strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      {/* confetti */}
      {[
        [520, 90, P.sunshine], [600, 60, P.coral], [680, 100, P.turquoise],
        [740, 160, P.sunshine], [500, 400, P.turquoise], [700, 420, P.coral],
      ].map(([x, y, c], i) => (
        <rect key={i} x={x} y={y} width="12" height="12" rx="3" fill={c} transform={`rotate(${i * 24} ${x + 6} ${y + 6})`} />
      ))}
      <text x="625" y="440" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="700" fill={P.plum}>
        java + mysql · workflow concept
      </text>
    </Frame>
  );
}

/* ------------------------------------------------------------ Agent Lab */

function AgentArt() {
  const nodes = [
    { x: 110, y: 130, c: P.sunshine, t: "task" },
    { x: 300, y: 90, c: P.lavender, t: "agent" },
    { x: 480, y: 150, c: P.blue, t: "plan" },
    { x: 640, y: 100, c: P.tangerine, t: "tools" },
    { x: 560, y: 280, c: P.turquoise, t: "validate" },
    { x: 330, y: 320, c: P.leaf, t: "result" },
  ];
  const edges = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 1]];
  return (
    <Frame id="agent" from={P.lavender} to={P.tangerine}>
      <g stroke={P.paper} strokeWidth="3" fill="none" opacity="0.85">
        {edges.map(([a, b], i) => (
          <path
            key={i}
            className="flow-dash"
            d={`M${nodes[a].x} ${nodes[a].y} Q ${(nodes[a].x + nodes[b].x) / 2} ${(nodes[a].y + nodes[b].y) / 2 - 40} ${nodes[b].x} ${nodes[b].y}`}
          />
        ))}
      </g>
      {nodes.map((n) => (
        <g key={n.t}>
          <circle cx={n.x} cy={n.y} r="34" fill={n.c} stroke={P.plum} strokeWidth="3" />
          <circle cx={n.x} cy={n.y} r="42" fill="none" stroke={n.c} strokeWidth="2" opacity="0.5" className="neural-node" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="800" fill={P.plum}>
            {n.t}
          </text>
        </g>
      ))}
      {/* terminal log */}
      <g transform="translate(90 380)">
        <rect x="0" y="0" width="620" height="86" rx="12" fill={P.screen} stroke={P.plum} strokeWidth="3" />
        <circle cx="20" cy="18" r="4" fill={P.coral} />
        <circle cx="34" cy="18" r="4" fill={P.sunshine} />
        <circle cx="48" cy="18" r="4" fill={P.leaf} />
        <text x="20" y="44" fontFamily="var(--font-mono)" fontSize="10" fill={P.leaf}>
          [run 042] tools: 3 called · reviewer: 2 flags
        </text>
        <text x="20" y="64" fontFamily="var(--font-mono)" fontSize="10" fill={P.sunshine}>
          [validate] 12/14 consistent → archive run
        </text>
        <rect x="430" y="56" width="8" height="12" fill={P.leaf} className="cursor-blink" />
      </g>
    </Frame>
  );
}

const ART = {
  notekart: NoteKartArt,
  "paper-format-translator": PaperArt,
  "ai-diet-recommendation": DietArt,
  "online-college-election-system": ElectionArt,
  "ai-agent-reliability-lab": AgentArt,
};

export default function ProjectArt({ slug, className = "" }) {
  const Art = ART[slug] || NoteKartArt;
  return (
    <svg viewBox="0 0 800 500" className={className} role="img" aria-label={`Illustrated concept visual for ${slug} — not an actual product screenshot`}>
      <Art />
    </svg>
  );
}

export function ConceptTag({ className = "" }) {
  return <span className={`concept-label ${className}`}>Interface concept</span>;
}