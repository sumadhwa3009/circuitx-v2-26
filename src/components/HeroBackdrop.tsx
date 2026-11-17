const traces = [
  "M862 180 H986 L1050 244 H1204",
  "M1118 286 H1252 L1304 338 H1400",
  "M1014 510 H1154 L1210 454 H1368",
  "M844 630 H978 L1038 570 H1180",
];

/** A code-drawn Santa Doom X: icy steel, live circuitry and a sleigh signal. */
export function HeroBackdrop() {
  return (
    <div className="hb" aria-hidden="true">
      <svg className="hb-monolith" viewBox="0 0 1440 800" preserveAspectRatio="xMaxYMid slice">
        <defs>
          <linearGradient id="xSteel" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#dce7ef" stopOpacity=".8" />
            <stop offset=".18" stopColor="#425675" stopOpacity=".9" />
            <stop offset=".55" stopColor="#111d42" stopOpacity=".95" />
            <stop offset="1" stopColor="#07112c" stopOpacity=".9" />
          </linearGradient>
          <linearGradient id="xIce" x1="0" x2="1">
            <stop stopColor="#f7fbff" stopOpacity=".85" />
            <stop offset="1" stopColor="#76f4d1" stopOpacity=".18" />
          </linearGradient>
          <filter id="xGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <clipPath id="xClip">
            <path d="M820 96 H954 L1120 330 L1288 96 H1420 L1200 400 L1420 704 H1288 L1120 470 L954 704 H820 L1042 400 Z" />
          </clipPath>
        </defs>
        <path className="x-aura" d="M820 96 H954 L1120 330 L1288 96 H1420 L1200 400 L1420 704 H1288 L1120 470 L954 704 H820 L1042 400 Z" />
        <path className="x-body" d="M820 96 H954 L1120 330 L1288 96 H1420 L1200 400 L1420 704 H1288 L1120 470 L954 704 H820 L1042 400 Z" />
        <path className="x-facet" d="M954 96 L1120 330 L1200 400 L1120 470 L954 704 H1020 L1194 466 L1260 400 L1194 334 L1020 96 Z" />
        <path className="x-ice" d="M826 100 H950 L963 118 H839 Z M1291 100 H1414 L1401 118 H1278 Z M832 700 H955 L944 684 H842 Z M1286 700 H1408 L1399 684 H1297 Z" />
        <g clipPath="url(#xClip)">
          <path className="x-grid" d="M776 182 H1426 M776 280 H1426 M776 520 H1426 M776 620 H1426 M930 70 V730 M1108 70 V730 M1292 70 V730" />
          <path className="x-energy" d="M842 208 H982 L1058 284 H1206 L1280 210 H1400" />
          <path className="x-energy x-energy-b" d="M832 594 H972 L1045 520 H1196 L1270 594 H1400" />
        </g>
        <g className="hb-traces">
          {traces.map((d, i) => (
            <g key={d}>
              <path d={d} className="hb-wire" />
              <path d={d} className="hb-pulse" style={{ animationDelay: `${i * -1.7}s`, animationDuration: `${7 + i}s` }} />
            </g>
          ))}
        </g>
        <path className="hb-flight" d="M768 352 C902 274 1004 288 1088 342 S1276 414 1398 292" />
        <g className="hb-sleigh">
          <path d="M1042 327 h34 l10 10 h-54 Z M1051 316 h16 l8 11 h-31 Z M1045 343 q18 14 37 0 M1055 343 v7 M1074 343 v7" />
          <circle cx="1048" cy="320" r="3" /><circle cx="1066" cy="320" r="3" />
        </g>
      </svg>
      <div className="hb-snowdrift" />
    </div>
  );
}
