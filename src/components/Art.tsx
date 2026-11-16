/* Custom SVG artwork for the Santa Doom world. Everything here is hand-built vector, styled via classes in styles/art.css */

/** Snowbound village skyline: three depth layers, towers, houses with flickering amber windows, pines. */
export function Village({ className = "" }: { className?: string }) {
  const pines = (xs: number[], base: number, s: number, cls: string) =>
    xs.map((x) => (
      <g key={`${cls}${x}`} className={cls} transform={`translate(${x} ${base}) scale(${s})`}>
        <polygon points="0,-90 24,-40 10,-40 32,0 -32,0 -10,-40 -24,-40" />
        <rect x="-4" y="0" width="8" height="12" />
      </g>
    ));
  const house = (x: number, y: number, w: number, h: number, d: number, i: number) => (
    <g key={`h${x}`} className="v-near">
      <rect x={x} y={y} width={w} height={h} />
      <polygon points={`${x - 8},${y} ${x + w / 2},${y - h * 0.55} ${x + w + 8},${y}`} />
      <rect className="win" style={{ animationDelay: `${d}s` }} x={x + w * 0.2} y={y + h * 0.3} width={w * 0.22} height={h * 0.28} />
      <rect className="win" style={{ animationDelay: `${d + 1.3}s` }} x={x + w * 0.58} y={y + h * 0.3} width={w * 0.22} height={h * 0.28} />
      {i % 2 === 0 && <rect x={x + w * 0.7} y={y - h * 0.7} width="9" height="22" />}
    </g>
  );
  const tower = (x: number, w: number, h: number) => (
    <g key={`t${x}`} className="v-mid">
      <rect x={x} y={320 - h} width={w} height={h} />
      <polygon points={`${x - 6},${320 - h} ${x + w / 2},${320 - h - w * 0.9} ${x + w + 6},${320 - h}`} />
      <rect className="win" style={{ animationDelay: `${x % 5}s` }} x={x + w / 2 - 4} y={320 - h + 24} width="8" height="16" />
    </g>
  );
  return (
    <svg className={className} viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path className="v-far" d="M0 220 C 180 150 320 210 520 170 S 900 120 1100 180 S 1360 160 1440 200 V320 H0Z" />
      {[80, 360, 640, 980, 1260].map((x, i) => tower(x, 46 + (i % 3) * 10, 110 + (i % 2) * 50))}
      {pines([40, 200, 470, 760, 900, 1150, 1380], 300, 0.8, "v-mid")}
      {[[110, 262, 70, 48], [290, 270, 62, 40], [520, 258, 80, 52], [700, 268, 66, 42], [1040, 260, 76, 50], [1210, 270, 60, 38]].map(([x, y, w, h], i) => house(x, y, w, h, i * 0.7, i))}
      {pines([20, 160, 420, 610, 840, 1100, 1300, 1420], 322, 1.1, "v-near")}
      <path className="v-snow" d="M0 296 C 200 280 380 304 620 292 S 1060 282 1240 298 S 1400 290 1440 296 V320 H0Z" />
    </svg>
  );
}

/** A Christmas tree drawn as a PCB: tiers are copper traces, every light is a solder node. */
export function CircuitTree({ className = "" }: { className?: string }) {
  const tiers = [
    { y: 150, h: 90, w: 52 }, { y: 235, h: 100, w: 82 }, { y: 335, h: 110, w: 112 }, { y: 445, h: 110, w: 142 },
  ];
  const nodes: { x: number; y: number; c: number; d: number }[] = [];
  tiers.forEach((t, ti) => {
    for (let k = 0; k < 4 + ti; k++) {
      const f = (k + 0.6) / (4 + ti);
      const side = k % 2 === 0 ? -1 : 1;
      const y = t.y + f * t.h * 0.55;
      const x = 200 + side * (t.w * (0.15 + f * 0.8)) * (0.9 - (k % 3) * 0.12);
      nodes.push({ x, y: y + 18, c: (k + ti) % 3, d: ((k * 7 + ti * 3) % 11) * 0.3 });
    }
  });
  return (
    <svg className={className} viewBox="0 0 400 600" role="img" aria-label="A Christmas tree built from circuit traces with glowing nodes">
      <g className="tree-traces">
        {tiers.map((t, i) => (
          <g key={i}>
            <path pathLength="1" className="draw" style={{ animationDelay: `${i * 0.25}s` }} d={`M${200 - t.w} ${t.y + t.h} L200 ${t.y} L${200 + t.w} ${t.y + t.h} H${200 - t.w}`} />
            <path pathLength="1" className="draw faint" style={{ animationDelay: `${i * 0.25 + 0.4}s` }} d={`M200 ${t.y} V${t.y + t.h} M${200 - t.w * 0.55} ${t.y + t.h * 0.55} H${200 + t.w * 0.55}`} />
          </g>
        ))}
        <path pathLength="1" className="draw" d="M180 555 H220 V590 H180Z" />
        <path pathLength="1" className="draw" style={{ animationDelay: "1.2s" }} d="M200 590 V598 M200 598 H60 M200 598 H340" />
      </g>
      {nodes.map((n, i) => <circle key={i} className={`node n${n.c}`} style={{ animationDelay: `${n.d}s` }} cx={n.x} cy={n.y} r="5" />)}
      <g transform="translate(200 108)">
        <g className="star">
          <path d="M0 -40 L9 -9 L40 0 L9 9 L0 40 L-9 9 L-40 0 L-9 -9Z" />
        </g>
      </g>
    </svg>
  );
}

/** Original stylised hooded figure with a brushed-metal faceplate and white beard. */
export function Mask({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 380" role="img" aria-label="Santa Doom: a hooded figure in a metal mask with a white beard">
      <defs>
        <linearGradient id="steel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e6ebf2" /><stop offset=".45" stopColor="#8f9aab" /><stop offset="1" stopColor="#4b5566" /></linearGradient>
        <linearGradient id="hood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0f6a4a" /><stop offset="1" stopColor="#042a1f" /></linearGradient>
        <linearGradient id="beard" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#b9c2cf" /></linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" /></filter>
      </defs>
      <path d="M150 8 C55 8 14 105 26 205 C32 265 14 330 14 380 H286 C286 330 268 265 274 205 C286 105 245 8 150 8Z" fill="url(#hood)" />
      <path d="M150 38 C88 38 62 110 68 190 H232 C238 110 212 38 150 38Z" fill="#021510" />
      <path d="M40 215 C70 232 90 238 110 240 M260 215 C230 232 210 238 190 240" stroke="#e8eef5" strokeWidth="14" strokeLinecap="round" fill="none" opacity=".9" />
      <path d="M96 92 C96 72 204 72 204 92 L212 172 C212 218 186 252 150 264 C114 252 88 218 88 172Z" fill="url(#steel)" stroke="#2a3342" strokeWidth="2" />
      <path d="M150 80 V252" stroke="#fff" strokeOpacity=".25" strokeWidth="2" />
      <g className="eyes">
        <polygon points="102,128 142,138 139,153 106,148" fill="#19e68c" filter="url(#glow)" />
        <polygon points="198,128 158,138 161,153 194,148" fill="#19e68c" filter="url(#glow)" />
        <polygon points="102,128 142,138 139,153 106,148" fill="#071a14" />
        <polygon points="198,128 158,138 161,153 194,148" fill="#071a14" />
        <polygon className="pupil" points="112,136 138,141 137,148 114,146" fill="#9dffd2" />
        <polygon className="pupil" points="188,136 162,141 163,148 186,146" fill="#9dffd2" />
      </g>
      <path d="M150 150 L141 205 L150 214 L159 205Z" fill="#3d4757" />
      <g stroke="#2a3342" strokeWidth="3" strokeLinecap="round"><path d="M126 232 H174" /><path d="M130 240 H170" /><path d="M136 248 H164" /></g>
      <g fill="#c9d1dd" stroke="#2a3342"><circle cx="104" cy="104" r="3.5" /><circle cx="196" cy="104" r="3.5" /><circle cx="98" cy="170" r="3.5" /><circle cx="202" cy="170" r="3.5" /></g>
      <path d="M62 228 C48 305 88 366 150 378 C212 366 252 305 238 228 C208 268 180 270 150 262 C120 270 92 268 62 228Z" fill="url(#beard)" />
      <g stroke="#9aa5b5" strokeWidth="2" fill="none" strokeLinecap="round"><path d="M92 270 C98 310 118 340 140 360" /><path d="M208 270 C202 310 182 340 160 360" /><path d="M150 268 V366" /></g>
      <g fill="#c9a24c" stroke="#5a431b" strokeWidth="2"><circle cx="76" cy="372" r="13" /><circle cx="224" cy="372" r="13" /></g>
    </svg>
  );
}

/** Spinning emerald energy burst (decorative). */
export function Burst({ className = "" }: { className?: string }) {
  const rays = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg className={className} viewBox="-100 -100 200 200" aria-hidden="true">
      <g className="burst-spin">
        {rays.map((a, i) => <polygon key={a} transform={`rotate(${a})`} points={`-4,0 0,${-(70 + (i % 2) * 24)} 4,0`} fill="#19e68c" opacity={0.75} />)}
      </g>
      <circle r="22" fill="#d6ffe9" /><circle r="34" fill="#19e68c" opacity=".25" />
    </svg>
  );
}

export function Sleigh({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 70" aria-hidden="true">
      <path d="M8 52 C8 62 30 64 54 62 H104 C114 62 116 54 108 52" stroke="#ffb347" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M22 50 C22 30 34 22 52 22 H92 C92 40 88 50 76 52Z" fill="#7a1f12" stroke="#ffb347" strokeWidth="3" />
      <path d="M52 22 C52 10 62 6 74 8" stroke="#ffb347" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="60" cy="14" r="6" fill="#19e68c" />
      <path d="M30 52 V62 M64 52 V62 M96 52 V62" stroke="#ffb347" strokeWidth="3" />
    </svg>
  );
}

/** Heavy slanted X matching the logo's X. Lime is reserved for this mark. */
export function XMark({ className = "", glitch = false }: { className?: string; glitch?: boolean }) {
  return (
    <svg viewBox="0 0 400 320" role="img" aria-label="The X" className={`${className}${glitch ? " glitch" : ""}`}>
      <defs><linearGradient id="xg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#b7f23a" /><stop offset="1" stopColor="#7fc413" /></linearGradient></defs>
      <polygon points="95,0 175,0 400,320 320,320" fill="url(#xg)" />
      <polygon points="310,0 395,0 200,150 150,100" fill="url(#xg)" />
      <polygon points="0,320 80,320 190,185 140,135" fill="url(#xg)" />
    </svg>
  );
}

/** Rotating vault ring with tick marks, used around the X. */
export function VaultRings({ className = "" }: { className?: string }) {
  const ticks = Array.from({ length: 72 }, (_, i) => i * 5);
  return (
    <svg className={className} viewBox="-200 -200 400 400" aria-hidden="true">
      <g className="ring-a"><circle r="190" fill="none" stroke="#19e68c" strokeOpacity=".5" strokeWidth="1.5" strokeDasharray="2 10" />
        {ticks.map((a) => <line key={a} transform={`rotate(${a})`} x1="0" y1="-176" x2="0" y2={a % 15 === 0 ? -158 : -168} stroke="#aab4c3" strokeWidth={a % 15 === 0 ? 2.5 : 1} />)}</g>
      <g className="ring-b"><circle r="140" fill="none" stroke="#ffb347" strokeOpacity=".55" strokeWidth="2" strokeDasharray="40 14 8 14" /></g>
      <circle r="108" fill="none" stroke="#19e68c" strokeOpacity=".35" />
    </svg>
  );
}

/** Domain pictograms. */
export function DomainArt({ id }: { id: string }) {
  if (id === "pes")
    return (
      <svg viewBox="0 0 160 140" aria-hidden="true" className="d-art">
        <g stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M80 10 L50 130 M80 10 L110 130 M62 60 H98 M56 90 H104 M50 130 H110 M62 60 L98 90 M98 60 L62 90" />
          <path d="M20 40 Q80 20 140 40" /><path d="M10 62 Q80 42 150 62" />
        </g>
        <path className="bolt" d="M86 28 L70 58 H82 L74 84 L98 50 H86Z" fill="currentColor" />
      </svg>
    );
  if (id === "cas")
    return (
      <svg viewBox="0 0 160 140" aria-hidden="true" className="d-art">
        <rect x="42" y="30" width="76" height="76" rx="4" fill="none" stroke="currentColor" strokeWidth="3" />
        <rect x="62" y="50" width="36" height="36" fill="currentColor" opacity=".25" stroke="currentColor" strokeWidth="2" />
        <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          {[52, 70, 88, 106].map((p) => <g key={p}><path d={`M${p - 10} 30 V12`} /><path d={`M${p - 10} 106 V124`} /><path d={`M42 ${p - 12} H24`} /><path d={`M118 ${p - 12} H136`} /></g>)}
        </g>
        <path className="pulse-line" d="M66 68 H74 L78 58 L84 80 L88 68 H94" fill="none" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    );
  return (
    <svg viewBox="0 0 160 140" aria-hidden="true" className="d-art">
      <g stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M80 12 C52 12 40 34 48 56 C54 70 62 74 62 90 H98 C98 74 106 70 112 56 C120 34 108 12 80 12Z" />
        <path d="M66 102 H94 M70 114 H90 M74 126 H86" />
        <path d="M20 40 L36 46 M140 40 L124 46 M12 76 H30 M130 76 H148" />
      </g>
      <polygon className="bolt" points="80,36 88,56 108,58 92,70 98,90 80,80 62,90 68,70 52,58 72,56" fill="currentColor" opacity=".5" />
    </svg>
  );
}
