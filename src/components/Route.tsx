"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import gauntlet from "@/img/gauntlet.png";
import { GEM_COLORS } from "./Gauntlet";

// Stone positions as % of the image. Index = stage (blue, yellow, red, purple, green, orange).
const GEM_SPOTS = [
  { x: 43, y: 20, w: 8 },   // 1 blue
  { x: 35, y: 33.5, w: 11 }, // 2 yellow (big centre stone)
  { x: 27, y: 22, w: 8 },   // 3 red
  { x: 60, y: 20, w: 8 },   // 4 purple/pink
  { x: 82, y: 30, w: 6 },   // 5 green (side)
  { x: 15, y: 24, w: 6.5 }, // 6 orange
];


const stops = [
  { t: "Form Your Team", d: "Gather 2 to 4 members. Mixed-college and mixed-branch teams are allowed. Pick one of the two themes." },
  { t: "Submit Your Idea", d: "Register on Unstop (free) and submit your idea on the official PPT template between 20 and 30 November. Choose your own problem, as there are no problem statements." },
  { t: "Get Shortlisted", d: "The shortlist is announced by 10 December. Up to 10 teams per theme move on, so at most 20 teams reach the finale." },
  { t: "Confirm Your Spot", d: "Shortlisted teams pay the Round 2 fee: ₹1,000 per team, or ₹750 if at least one member is from IEEE CAS or PES." },
  { t: "Build for 16 Hours", d: "On 19 and 20 December, build your prototype overnight at the APJ Abdul Kalam Lab, BMSIT&M. A surprise awaits during the build." },
  { t: "Present Your Prototype", d: "Demonstrate your working prototype at the end of the build and show what you made." },
];

const PATH =
  "M60 0 C110 60 10 107 60 167 S110 273 60 333 S10 440 60 500 S110 607 60 667 S10 773 60 833 S110 940 60 1000";

const gemVar = (i: number) => ({ "--g": GEM_COLORS[i] }) as CSSProperties;

export function Route() {
  const wrap = useRef<HTMLDivElement>(null);
  const trace = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const glove = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = wrap.current;
    const traceEl = trace.current;
    const p = path.current;
    const g = glove.current;
    if (!w || !traceEl || !p || !g) return;

    const svg = p.ownerSVGElement!;
    const len = p.getTotalLength();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const stopEls = Array.from(w.querySelectorAll<HTMLElement>(".stop"));
    const pins = Array.from(traceEl.querySelectorAll<HTMLElement>(".gem-pin"));
    const gems = Array.from(g.querySelectorAll<HTMLElement>(".gem-dot"));
    const fr = stops.map((_, i) => (i + 0.5) / stops.length);

    // path distance -> pixel position inside the trace box
    const toLocal = (d: number) => {
      const m = p.getScreenCTM();
      if (!m) return null;
      const pt = p.getPointAtLength(d);
      const sp = svg.createSVGPoint();
      sp.x = pt.x;
      sp.y = pt.y;
      const q = sp.matrixTransform(m);
      const r = traceEl.getBoundingClientRect();
      return { x: q.x - r.left, y: q.y - r.top };
    };

    // put every checkpoint (and its text) exactly on the curve
    const place = () => {
      fr.forEach((f, i) => {
        const loc = toLocal(f * len);
        if (!loc) return;
        pins[i].style.left = `${loc.x}px`;
        pins[i].style.top = `${loc.y}px`;
        stopEls[i].style.top = `${loc.y}px`;
      });
    };

    const update = () => {
      const r = w.getBoundingClientRect();
      const prog = reduce
        ? 1
        : Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
      const distance = prog * len;
      const loc = toLocal(distance);
      if (!loc) return;

      const gw = g.offsetWidth;
      const gh = g.offsetHeight;
      g.style.left = `${loc.x - gw / 2}px`;
      g.style.top = `${loc.y - gh / 2}px`;
      g.style.transformOrigin = "50% 50%";

      // green/gem line drawn up to the glove
      p.style.strokeDasharray = "1 1";
      p.style.strokeDashoffset = `${1 - prog}`;

      // gentle sway following the curve
      const a = p.getPointAtLength(distance);
      const b = p.getPointAtLength(Math.min(len, distance + 2));
      const angle = Math.atan2(b.y - a.y, b.x - a.x) * (180 / Math.PI);
      g.style.transform = `rotate(${(angle - 90) * 0.5}deg)`;

      // each checkpoint, stop and gauntlet gem lights up when the glove reaches it
      fr.forEach((f, i) => {
        const lit = reduce || prog >= f - 0.015;
        stopEls[i].classList.toggle("lit", lit);
        pins[i].classList.toggle("lit", lit);
        gems[i]?.classList.toggle("on", lit);
      });
    };

    const onResize = () => { place(); update(); };
    place();
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="route" ref={wrap}>
      <div className="route-trace" ref={trace}>
        <svg viewBox="0 0 120 1000" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="gemline" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1000">
              {GEM_COLORS.map((c, i) => (
                <stop key={c} offset={`${(i / (GEM_COLORS.length - 1)) * 100}%`} stopColor={c} />
              ))}
            </linearGradient>
          </defs>
          <path className="route-ghost" d={PATH} pathLength={1} />
          <path ref={path} className="route-live" style={{ stroke: "url(#gemline)" }} d={PATH} pathLength={1} />
        </svg>

        {stops.map((s, i) => (
          <span key={s.t} className="gem-pin" style={gemVar(i)} />
        ))}

        <div className="route-glove" ref={glove}>
          <div className="glove-img">
            <Image src={gauntlet} alt="The golden gauntlet" className="glove-art" sizes="100px" />
            {GEM_SPOTS.map((s, i) => (
              <span key={i} className="gem-dot" style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.w}%`, ...gemVar(i) }} />
            ))}
          </div>
        </div>
      </div>

      <ol>
        {stops.map((stop, i) => (
          <li
            key={stop.t}
            className={`stop ${i % 2 ? "r" : "l"}`}
            style={{ ...gemVar(i), top: `${((i + 0.5) / stops.length) * 100}%` }}
          >
            <span className="stop-no">{String(i + 1).padStart(2, "0")}</span>
            <h3>{stop.t}</h3>
            <p>{stop.d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}