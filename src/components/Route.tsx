"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import santaSleigh from "@/img/santa-sleigh.png";

const stops = [
  {
    t: "Register and submit your idea",
    d: "Sign up on Unstop and send your idea on the official PPT template.",
  },
  {
    t: "Get shortlisted",
    d: "The organising committee reviews every submission and picks the teams.",
  },
  {
    t: "Begin the 16-hour build",
    d: "The final phase starts on 19 December. Build your own solution through the night.",
  },
  {
    t: "Present your prototype",
    d: "Demonstrate the solution you built to the judging panel.",
  },
];

export function Route() {
  const wrap = useRef<HTMLDivElement>(null);
  const trace = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const sleigh = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = wrap.current;
    const traceEl = trace.current;
    const p = path.current;
    const s = sleigh.current;

    if (!w || !traceEl || !p || !s) return;

    const len = p.getTotalLength();
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const stopsEls = Array.from(w.querySelectorAll<HTMLElement>(".stop"));

    const update = () => {
      const r = w.getBoundingClientRect();

      const prog = reduce
        ? 1
        : Math.min(
          1,
          Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height),
        );

      const distance = prog * len;

      // Get the actual SVG route position
      const point = p.getPointAtLength(distance);

      const svg = p.ownerSVGElement!;
      const svgPoint = svg.createSVGPoint();

      svgPoint.x = point.x;
      svgPoint.y = point.y;

      const matrix = p.getScreenCTM();
      if (!matrix) return;

      const screenPoint = svgPoint.matrixTransform(matrix);
      const traceRect = traceEl.getBoundingClientRect();

      // Actual displayed image dimensions
      const imageWidth = s.offsetWidth;
      const imageHeight = s.offsetHeight;

      // Approximate centre of the sleigh body
      const sleighCenterX = imageWidth * 0.79;
      const sleighCenterY = imageHeight * 0.63;

      // Attach the sleigh body centre to the SVG route
      s.style.left = `${screenPoint.x - traceRect.left - sleighCenterX}px`;

      s.style.top = `${screenPoint.y - traceRect.top - sleighCenterY}px`;

      // Rotate around the sleigh body centre
      s.style.transformOrigin = `${sleighCenterX}px ${sleighCenterY}px`;

      // Reveal the green line exactly up to Santa
      // Reveal green route using normalized scroll progress
      p.style.strokeDasharray = "1 1";
      p.style.strokeDashoffset = `${1 - prog}`;

      // Rotate Santa along the route
      const next = p.getPointAtLength(Math.min(len, distance + 2));

      const angle =
        Math.atan2(next.y - point.y, next.x - point.x) * (180 / Math.PI);

      s.style.transform = `rotate(${angle - 90}deg)`;

      // Activate milestones
      stopsEls.forEach((el, i) =>
        el.classList.toggle("lit", prog >= (i + 0.35) / stops.length),
      );
    };

    update();

    window.addEventListener("scroll", update, {
      passive: true,
    });

    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="route" ref={wrap}>
      <div className="route-trace" ref={trace}>
        <svg
          viewBox="0 0 120 1000"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="route-ghost"
            d="M60 0 C 110 90 10 160 60 250 S 110 410 60 500 S 10 660 60 750 S 110 910 60 1000"
            pathLength={1}
          />

          <path
            ref={path}
            className="route-live"
            d="M60 0 C 110 90 10 160 60 250 S 110 410 60 500 S 10 660 60 750 S 110 910 60 1000"
            pathLength={1}
          />
        </svg>

        <div className="route-sleigh" ref={sleigh}>
          <Image
            src={santaSleigh}
            alt="Santa flying with eight reindeer"
            className="sleigh-art"
            width={1643}
            height={957}
            priority
          />
        </div>
      </div>

      <ol>
        {stops.map((stop, i) => (
          <li
            key={stop.t}
            className={`stop ${i % 2 ? "r" : "l"}`}
            style={{
              top: `${((i + 0.5) / stops.length) * 100}%`,
            }}
          >
            <span className="stop-pin" />
            <h3>{stop.t}</h3>
            <p>{stop.d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
