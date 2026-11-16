import { Village } from "./Art";

const sparks = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 37) % 100, size: 3 + ((i * 5) % 4), delay: ((i * 7) % 13) * -1.1, dur: 9 + ((i * 3) % 8),
}));

/** Rays, sparks, skyline and a faint PCB grid behind the prize section. */
export function PrizeBackdrop() {
  const rays = Array.from({ length: 28 }, (_, i) => i * (360 / 28));
  return (
    <div className="pz-bg" aria-hidden="true">
      <div className="pz-grid" />
      <svg className="pz-rays" viewBox="-300 -300 600 600">
        <g className="pz-spin">
          {rays.map((a, i) => <polygon key={a} transform={`rotate(${a})`} points={`-${6 + (i % 2) * 4},0 0,-290 ${6 + (i % 2) * 4},0`} fill="#ffb347" opacity={i % 2 ? 0.1 : 0.2} />)}
        </g>
      </svg>
      {sparks.map((s, i) => (
        <span key={i} className="spark" style={{ left: `${s.left}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s` }} />
      ))}
      <Village className="pz-village" />
    </div>
  );
}

/** A gift box wrapped in copper traces: the "prize" as hardware. */
export function Gift({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 180" aria-hidden="true">
      <defs>
        <linearGradient id="gbox" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#c93a1c" /><stop offset="1" stopColor="#5c1409" /></linearGradient>
        <linearGradient id="grib" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ffd890" /><stop offset="1" stopColor="#ffb347" /></linearGradient>
      </defs>
      <rect x="22" y="78" width="116" height="92" fill="url(#gbox)" />
      <rect x="12" y="56" width="136" height="30" fill="url(#gbox)" stroke="#ffb347" strokeWidth="2" />
      <rect x="71" y="56" width="18" height="114" fill="url(#grib)" />
      <path d="M80 56 C60 20 28 28 44 48 C54 58 72 56 80 56Z M80 56 C100 20 132 28 116 48 C106 58 88 56 80 56Z" fill="none" stroke="#ffb347" strokeWidth="5" strokeLinejoin="round" />
      <g stroke="#19e68c" strokeWidth="1.8" fill="none" strokeLinecap="round">
        <path d="M30 108 H58 L66 120 H71 M130 134 H102 L94 146 H89 M30 150 H48" />
      </g>
      <g fill="#04061a" stroke="#19e68c" strokeWidth="1.8"><circle cx="30" cy="108" r="3.5" /><circle cx="130" cy="134" r="3.5" /><circle cx="48" cy="150" r="3.5" /></g>
    </svg>
  );
}