/**
 * Original illustrated avatar — placeholder identity art, deliberately NOT a
 * photograph of Adarsh. Replace or keep alongside the real photo.
 */
export default function AvatarIllustration({ size = 220 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 220 220"
      role="img"
      aria-label="Illustrated avatar placeholder of a friendly developer — not a real photograph"
    >
      <defs>
        <clipPath id="avatar-clip">
          <circle cx="110" cy="110" r="104" />
        </clipPath>
      </defs>
      <circle cx="110" cy="110" r="108" fill="var(--bg-desk)" />
      <circle cx="110" cy="110" r="104" fill="var(--raised)" />
      <g clipPath="url(#avatar-clip)">
        <circle cx="172" cy="48" r="26" fill="var(--sunshine)" opacity="0.35" />
        <circle cx="42" cy="150" r="18" fill="var(--leaf)" opacity="0.3" />
        {/* shoulders / sweatshirt */}
        <path d="M30 220 C 34 168 70 150 110 150 C 150 150 186 168 190 220 Z" fill="var(--leaf)" />
        <path d="M88 152 C 96 162 124 162 132 152 L 132 168 C 124 176 96 176 88 168 Z" fill="var(--leaf-ink)" />
        {/* neck */}
        <rect x="96" y="128" width="28" height="28" rx="12" fill="#d9a184" />
        {/* head */}
        <circle cx="110" cy="98" r="42" fill="#e2b092" />
        {/* ears */}
        <circle cx="68" cy="100" r="8" fill="#d9a184" />
        <circle cx="152" cy="100" r="8" fill="#d9a184" />
        {/* hair */}
        <path d="M68 92 C 66 58 88 46 110 46 C 132 46 154 58 152 92 C 146 74 136 68 110 68 C 84 68 74 74 68 92 Z" fill="var(--art-ink)" />
        <path d="M68 92 C 70 80 76 74 82 72 C 76 82 74 88 74 96 Z" fill="var(--art-ink)" />
        {/* eyes */}
        <circle cx="94" cy="98" r="4" fill="var(--art-ink)" />
        <circle cx="126" cy="98" r="4" fill="var(--art-ink)" />
        <circle cx="95.5" cy="96.5" r="1.3" fill="#ffffff" />
        <circle cx="127.5" cy="96.5" r="1.3" fill="#ffffff" />
        {/* brows */}
        <path d="M87 88 q 7 -4 14 -1" stroke="var(--art-ink)" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <path d="M119 87 q 7 -3 14 1" stroke="var(--art-ink)" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        {/* smile */}
        <path d="M98 116 q 12 9 24 0" stroke="var(--art-ink)" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* blush */}
        <circle cx="84" cy="110" r="5.5" fill="var(--sunshine)" opacity="0.45" />
        <circle cx="136" cy="110" r="5.5" fill="var(--sunshine)" opacity="0.45" />
        {/* headphones around neck */}
        <path d="M78 150 C 82 138 138 138 142 150" stroke="var(--blue)" strokeWidth="7" fill="none" strokeLinecap="round" />
        <rect x="70" y="146" width="14" height="20" rx="6" fill="var(--blue-ink)" />
        <rect x="136" y="146" width="14" height="20" rx="6" fill="var(--blue-ink)" />
        {/* lanyard badge hint */}
        <path d="M110 168 L 110 196" stroke="var(--blue)" strokeWidth="4" strokeLinecap="round" />
        <rect x="99" y="192" width="22" height="26" rx="4" fill="var(--paper)" stroke="var(--line)" strokeWidth="1.5" />
        <rect x="103" y="197" width="14" height="4" rx="2" fill="var(--blue)" />
        <rect x="103" y="205" width="14" height="2.5" rx="1.25" fill="var(--art-muted)" />
      </g>
      <circle cx="110" cy="110" r="104" fill="none" stroke="var(--line)" strokeWidth="2" />
    </svg>
  );
}