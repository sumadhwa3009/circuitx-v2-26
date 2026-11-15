"use client";
import { useEffect, useRef } from "react";

/** Canvas snowfall with three parallax depth layers and wind gusts. Pauses when tab hidden; off for reduced motion. */
export function Snow({ density = 1 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let w = 0, h = 0, raf = 0, t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = cv.getBoundingClientRect();
      w = r.width; h = r.height; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const base = (window.innerWidth < 700 ? 60 : 130) * density;
    const flakes = Array.from({ length: base }, () => {
      const z = Math.random();
      return { x: Math.random() * w, y: Math.random() * h, z, r: 0.8 + z * 2.6, vy: 0.3 + z * 1.4, ph: Math.random() * 6.28 };
    });
    const tick = () => {
      t += 0.01;
      ctx.clearRect(0, 0, w, h);
      const gust = Math.sin(t * 0.7) * 0.6 + 0.4;
      for (const f of flakes) {
        f.y += f.vy; f.x += Math.sin(t * 2 + f.ph) * 0.3 + gust * f.z * 1.2;
        if (f.y > h + 5) { f.y = -5; f.x = Math.random() * w; }
        if (f.x > w + 5) f.x = -5;
        ctx.globalAlpha = 0.35 + f.z * 0.55;
        ctx.fillStyle = "#fff";
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.283); ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    const vis = () => { cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(tick); };
    window.addEventListener("resize", resize); document.addEventListener("visibilitychange", vis);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); document.removeEventListener("visibilitychange", vis); };
  }, [density]);
  return <canvas ref={ref} className="snow" aria-hidden="true" />;
}
