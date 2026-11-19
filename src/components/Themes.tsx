"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { themes } from "@/data/themes";
import { ThemeArt } from "./Art";

type Theme = (typeof themes)[number];

export function ThemeGrid() {
  const [active, setActive] = useState<Theme | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (active && !d.open) d.showModal();
    if (!active && d.open) d.close();
    document.body.classList.toggle("lock", !!active);
    return () => document.body.classList.remove("lock");
  }, [active]);

  return (
    <>
      <div className="chips">
        {themes.map((t) => (
          <article key={t.id} className={`chip chip-${t.id}`}>
            <ThemeArt id={t.id} />
            <p className="chip-soc">{t.label} · {t.code}</p>
            <h3>{t.title}</h3>
            <p>{t.summary}</p>
            <button type="button" className="chip-btn" aria-haspopup="dialog" onClick={() => setActive(t)}>
              View focus areas <ArrowRight size={18} aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>

      <dialog
        ref={dlg}
        className={`dm ${active ? `dm-${active.id}` : ""}`}
        aria-labelledby="dm-title"
        onClose={() => setActive(null)}
        onClick={(e) => { if (e.target === e.currentTarget) setActive(null); }}
      >
        {active && (
          <div className="dm-body">
            <button type="button" className="dm-x" aria-label="Close" onClick={() => setActive(null)}>
              <X size={22} aria-hidden="true" />
            </button>
            <p className="dm-code">{active.label} · {active.code}</p>
            <h2 id="dm-title">{active.title}</h2>
            <p className="dm-desc">{active.description}</p>
            <h3 className="dm-sub">Key focus areas</h3>
            <ul className="dm-list">
              {active.areas.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </div>
        )}
      </dialog>
    </>
  );
}

export const ThemesNote = () => <p className="fine">These are starting points, not assigned problems. You choose the problem. <Link href="/themes" className="link">See the themes in detail</Link></p>;