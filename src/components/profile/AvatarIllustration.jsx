/**
 * Editorial-style illustrated portrait of a young developer.
 * Deliberately an illustration — never presented as a photograph.
 * Adult proportions, layered shading, rim light, palette-consistent.
 */
export default function AvatarIllustration({ size = 220 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      role="img"
      aria-label="Illustrated editorial portrait of a young developer — an illustration, not a photograph"
    >
      <defs>
        <linearGradient id="av-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--lavender)" stopOpacity="0.5" />
          <stop offset="0.55" stopColor="var(--turquoise)" stopOpacity="0.38" />
          <stop offset="1" stopColor="var(--sunshine)" stopOpacity="0.42" />
        </linearGradient>
        <linearGradient id="av-jacket" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b3352" />
          <stop offset="1" stopColor="#2a2438" />
        </linearGradient>
        <linearGradient id="av-skin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f0c19c" />
          <stop offset="0.62" stopColor="#e5b28a" />
          <stop offset="1" stopColor="#cf9668" />
        </linearGradient>
        <clipPath id="av-clip">
          <circle cx="120" cy="120" r="106" />
        </clipPath>
      </defs>

      <circle cx="120" cy="120" r="112" fill="var(--bg-desk)" />
      <circle cx="120" cy="120" r="106" fill="url(#av-bg)" />
      <circle cx="120" cy="120" r="106" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
      <circle cx="120" cy="120" r="92" fill="none" stroke="var(--raised)" strokeWidth="1.5" opacity="0.55" />

      <g clipPath="url(#av-clip)">
        {/* ambient shapes */}
        <circle cx="188" cy="52" r="26" fill="var(--sunshine)" opacity="0.35" />
        <circle cx="46" cy="168" r="18" fill="var(--coral)" opacity="0.28" />
        <path d="M196 150 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" fill="var(--raised)" opacity="0.7" />

        {/* shoulders / jacket */}
        <path d="M26 244 C 30 194 60 170 94 160 L 120 178 L 146 160 C 180 170 210 194 214 244 Z" fill="url(#av-jacket)" />
        <path d="M94 160 L 120 178 L 102 200 L 82 174 Z" fill="#4a4166" />
        <path d="M146 160 L 120 178 L 138 200 L 158 174 Z" fill="#4a4166" />
        <path d="M104 164 L 120 178 L 136 164 L 131 204 L 109 204 Z" fill="var(--paper)" />
        <path d="M120 178 L 120 204" stroke="var(--line)" strokeWidth="1.6" />
        {/* jacket rim light */}
        <path d="M30 236 C 34 196 60 174 92 163" fill="none" stroke="var(--turquoise)" strokeWidth="3" opacity="0.5" strokeLinecap="round" />
        {/* small enamel pin */}
        <circle cx="97" cy="188" r="4.5" fill="var(--sunshine)" stroke="#2a2438" strokeWidth="1.5" />

        {/* neck */}
        <path d="M104 126 L 104 160 Q 120 174 136 160 L 136 126 Z" fill="#cf9668" />
        <path d="M104 132 Q 120 146 136 132 L 136 126 L 104 126 Z" fill="#b87f52" opacity="0.55" />

        {/* ears */}
        <ellipse cx="79" cy="106" rx="7" ry="11" fill="#e5b28a" />
        <ellipse cx="161" cy="106" rx="7" ry="11" fill="#cf9668" />
        <path d="M78 102 q 4 3 3 8" stroke="#b87f52" strokeWidth="1.6" fill="none" strokeLinecap="round" />

        {/* head — adult proportions with defined jaw */}
        <path d="M120 50 C 94 50 79 72 79 100 C 79 122 88 138 102 146 C 110 151 130 151 138 146 C 152 138 161 122 161 100 C 161 72 146 50 120 50 Z" fill="url(#av-skin)" />
        {/* side shading + jaw */}
        <path d="M138 146 C 152 138 161 122 161 100 C 161 78 152 60 138 54 C 150 66 155 82 155 100 C 155 120 148 136 138 146 Z" fill="#b87f52" opacity="0.35" />
        <path d="M102 146 C 110 151 130 151 138 146 C 130 149 110 149 102 146 Z" fill="#b87f52" opacity="0.5" />
        {/* rim light left */}
        <path d="M82 96 C 82 76 92 60 106 54" fill="none" stroke="#ffe3c4" strokeWidth="3" opacity="0.65" strokeLinecap="round" />

        {/* hair — textured side part */}
        <path d="M79 98 C 76 62 96 42 120 42 C 144 42 164 62 161 98 C 157 80 149 70 137 67 C 126 64 120 69 110 67 C 94 64 84 76 79 98 Z" fill="#2a2135" />
        <path d="M79 98 C 80 84 84 74 92 68 C 86 78 84 88 84 100 Z" fill="#2a2135" />
        <path d="M161 98 C 160 84 156 74 148 68 C 154 78 156 88 156 100 Z" fill="#2a2135" />
        <g stroke="#4a3d5c" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8">
          <path d="M96 52 C 104 46 116 44 126 46" />
          <path d="M104 60 C 114 54 128 52 138 56" />
          <path d="M132 48 C 142 52 150 60 154 70" />
        </g>
        <path d="M92 68 C 100 62 112 60 122 62" stroke="#6b5a86" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.7" />

        {/* brows */}
        <path d="M95 91 Q 104 86 113 90" stroke="#2a2135" strokeWidth="3.6" fill="none" strokeLinecap="round" />
        <path d="M127 90 Q 136 86 145 91" stroke="#2a2135" strokeWidth="3.6" fill="none" strokeLinecap="round" />

        {/* eyes — almond, lids, iris, catchlight */}
        <path d="M96 102 Q 104 96 112 102 Q 104 106.5 96 102 Z" fill="#fdf6ec" />
        <path d="M128 102 Q 136 96 144 102 Q 136 106.5 128 102 Z" fill="#fdf6ec" />
        <circle cx="104" cy="101.4" r="3.5" fill="#3a2c40" />
        <circle cx="136" cy="101.4" r="3.5" fill="#3a2c40" />
        <circle cx="105.3" cy="100.2" r="1.1" fill="#ffffff" />
        <circle cx="137.3" cy="100.2" r="1.1" fill="#ffffff" />
        <path d="M96 102 Q 104 96 112 102" stroke="#2a2135" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M128 102 Q 136 96 144 102" stroke="#2a2135" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M98 108 Q 104 110 110 108" stroke="#c98f66" strokeWidth="1.4" fill="none" opacity="0.6" strokeLinecap="round" />
        <path d="M130 108 Q 136 110 142 108" stroke="#c98f66" strokeWidth="1.4" fill="none" opacity="0.6" strokeLinecap="round" />

        {/* nose */}
        <path d="M120 104 L 117.5 116 Q 120 119.5 124 117.5" stroke="#c98f66" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M114 118 q 2 1.6 4 1.4" stroke="#b87f52" strokeWidth="1.4" fill="none" opacity="0.6" strokeLinecap="round" />

        {/* mouth — composed, approachable */}
        <path d="M108 129 Q 120 135 132 129" stroke="#a05c3c" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M112 135 Q 120 138.5 128 135" stroke="#c98f66" strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round" />

        {/* cheek warmth */}
        <ellipse cx="94" cy="116" rx="7" ry="4.5" fill="var(--coral)" opacity="0.14" />
        <ellipse cx="146" cy="116" rx="7" ry="4.5" fill="var(--coral)" opacity="0.12" />
      </g>
    </svg>
  );
}