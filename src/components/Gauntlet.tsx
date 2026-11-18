export const GEM_COLORS = ["#2f6bff", "#ffd23f", "#ff3b3b", "#a64bff", "#19e68c", "#ff8a2a"];

// Gem positions: 4 knuckles, thumb base, big centre gem. Index i lights up when stop i is passed.
const gems = [
  { x: 51, y: 97, r: 6 },
  { x: 72, y: 97, r: 6 },
  { x: 93, y: 97, r: 6 },
  { x: 113, y: 97, r: 6 },
  { x: 34, y: 120, r: 6 },
  { x: 82, y: 130, r: 11 },
];

/** Golden gauntlet drawn in code. Gems start dark and glow via the `.on` class (toggled by Route). */
export function Gauntlet({ className = "" }: { className?: string }) {
  return (
    <svg className={`glove-art ${className}`} viewBox="0 0 160 200" role="img" aria-label="A golden gauntlet with six gems">
      <defs>
        <linearGradient id="gauGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff0b0" />
          <stop offset=".45" stopColor="#f2b53a" />
          <stop offset="1" stopColor="#8a5a12" />
        </linearGradient>
        <linearGradient id="gauBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b63d6" />
          <stop offset="1" stopColor="#14245e" />
        </linearGradient>
      </defs>
      <g fill="url(#gauGold)" stroke="#6b4408" strokeWidth="2" strokeLinejoin="round">
        <rect x="104" y="52" width="17" height="52" rx="8" />
        <rect x="84" y="34" width="18" height="70" rx="8" />
        <rect x="63" y="26" width="18" height="78" rx="8" />
        <rect x="42" y="36" width="18" height="68" rx="8" />
        <rect x="16" y="86" width="18" height="48" rx="8" transform="rotate(-30 25 110)" />
        <rect x="38" y="88" width="88" height="68" rx="14" />
      </g>
      <path d="M44 156 H120 L132 196 H32 Z" fill="url(#gauBlue)" stroke="#f2b53a" strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="30" y="150" width="100" height="12" rx="4" fill="url(#gauGold)" stroke="#6b4408" strokeWidth="2" />
      <g stroke="#6b4408" strokeWidth="1.5" opacity=".55" fill="none" strokeLinecap="round">
        <path d="M43 62 H59 M64 54 H80 M85 60 H101 M105 74 H120" />
      </g>
      {gems.map((g, i) => (
        <circle key={i} className="gem" cx={g.x} cy={g.y} r={g.r} style={{ ["--g" as string]: GEM_COLORS[i] }} />
      ))}
    </svg>
  );
}