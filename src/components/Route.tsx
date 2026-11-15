"use client";
import { useEffect, useRef } from "react";
import { Sleigh } from "./Art";

const stops = [
  { t: "Register and submit your idea", d: "Sign up on Unstop and send your idea on the official PPT template." },
  { t: "Get shortlisted", d: "The organising committee reviews every submission and picks the teams." },
  { t: "Begin the 16-hour build", d: "The final phase starts on 19 December. Build your own solution through the night." },
  { t: "Discover X", d: "About halfway through, the committee reveals X.", x: true },
  { t: "Integrate X", d: "Every team must work X into the project it has already started." },
  { t: "Present your prototype", d: "Demonstrate what you built, with X inside." },
];

/** A sleigh follows a copper trace down the page as you scroll; stops light up when it passes them. */
export function Route() {
  const wrap = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const sleigh = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const w = wrap.current!, p = path.current!, s = sleigh.current!;
    const len = p.getTotalLength();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stopsEls = Array.from(w.querySelectorAll<HTMLElement>(".stop"));
    const update = () => {
      const r = w.getBoundingClientRect();
      const prog = reduce ? 1 : Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
      const a = p.getPointAtLength(prog * len), b = p.getPointAtLength(Math.min(len, prog * len + 2));
      p.style.strokeDashoffset = String(len * (1 - prog));
      s.style.left = `${(a.x / 120) * 100}%`; s.style.top = `${(a.y / 1000) * 100}%`;
      s.style.transform = `translate(-50%,-50%) rotate(${Math.atan2(b.y - a.y, b.x - a.x) * 57.3 - 90}deg)`;
      stopsEls.forEach((el, i) => el.classList.toggle("lit", prog >= (i + 0.35) / stops.length));
    };
    p.style.strokeDasharray = String(len);
    update(); addEventListener("scroll", update, { passive: true }); addEventListener("resize", update);
    return () => { removeEventListener("scroll", update); removeEventListener("resize", update); };
  }, []);
  return (
    <div className="route" ref={wrap}>
      <div className="route-trace">
        <svg viewBox="0 0 120 1000" preserveAspectRatio="none" aria-hidden="true">
          <path className="route-ghost" d="M60 0 C 110 90 10 160 60 250 S 110 410 60 500 S 10 660 60 750 S 110 910 60 1000" vectorEffect="non-scaling-stroke" />
          <path ref={path} className="route-live" d="M60 0 C 110 90 10 160 60 250 S 110 410 60 500 S 10 660 60 750 S 110 910 60 1000" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="route-sleigh" ref={sleigh}><Sleigh /></div>
      </div>
      <ol>
        {stops.map((s, i) => (
          <li key={s.t} className={`stop ${i % 2 ? "r" : "l"} ${s.x ? "is-x" : ""}`} style={{ top: `${((i + 0.5) / stops.length) * 100}%` }}>
            <span className="stop-pin">{s.x ? "X" : ""}</span>
            <h3>{s.t}</h3><p>{s.d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
