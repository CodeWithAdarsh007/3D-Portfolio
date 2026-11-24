// The explorer sits inside the photographed display in both room compositions.
export default function LaptopScreen({ portrait = false }) {
  return (
    <svg aria-hidden="true" className="laptop-display" viewBox="0 0 1000 1000" preserveAspectRatio="none">
      <g transform={portrait ? "matrix(2.35 .14 -.36 3.3 270 87)" : "matrix(2.29 .17 -.34 3.2 305 116)"}>
        <rect width="280" height="165" rx="2" fill="#152f3e" />
        <path d="M0 0h280v23H0z" fill="#254c55" />
        <g fill="#f2be79"><circle cx="13" cy="11" r="3" /><circle cx="24" cy="11" r="3" opacity=".6" /></g>
        <text x="18" y="66" fill="#f5e9c9" fontFamily="Georgia, serif" fontSize="34">Projects</text>
        <path d="M19 81h242" stroke="#59747a" />
        {[20, 78, 136].map(x => (
          <g key={x} transform={`translate(${x} 100)`}>
            <path d="M0 0h13l5 5h19v23H0z" fill="#b9834a" />
            <path d="M0 8h38l-3 21H0z" fill="#e7bd79" />
            <path d="M2 36h28" stroke="#97b8ae" strokeWidth="2" />
          </g>
        ))}
      </g>
    </svg>
  );
}
