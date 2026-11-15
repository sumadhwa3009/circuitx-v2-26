"use client";
import { useEffect, useRef, useState } from "react";

/** Left-edge circuit rail: scroll progress fills the trace, each section is a node. Desktop only (CSS). */
export function Rail() {
  const [items, setItems] = useState<{ id: string; label: string }[]>([]);
  const [active, setActive] = useState(0);
  const fill = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-rail]"));
    setItems(els.map((e) => ({ id: e.id, label: e.dataset.rail! })));
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(els.indexOf(e.target as HTMLElement))), { rootMargin: "-45% 0px -45% 0px" });
    els.forEach((e) => io.observe(e));
    const on = () => {
      const p = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (fill.current) fill.current.style.transform = `scaleY(${p})`;
    };
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", on); };
  }, []);
  return (
    <nav className="rail" aria-label="Page sections">
      <div className="rail-line"><div ref={fill} className="rail-fill" /></div>
      <ul>
        {items.map((it, i) => (
          <li key={it.id} className={i === active ? "on" : i < active ? "done" : ""}>
            <a href={`#${it.id}`} aria-label={it.label}><span className="rail-node" /><span className="rail-tip">{it.label}</span></a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
