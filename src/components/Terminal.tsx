"use client";
import { useEffect, useRef, useState } from "react";

const BOOT = ["CircuitX v26.12", "linking to the north pole.......... ok", "opening channel..................... ok", "type 'help' to begin."];
const CMD: Record<string, string> = {
  help: "commands: help, about, domains, status, prizes, clear",
  about: "CircuitX'26 – A 16-hour innovation experience.",
  domains: "PES | CASS",
  status: "ALL SYSTEMS OPERATIONAL.",
  prizes: "1st: ₹12,000 | 2nd: ₹8,000",
};

export function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [ready, setReady] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setLines(BOOT); setReady(true); return; }
    let i = 0;
    const id = setInterval(() => { setLines(BOOT.slice(0, ++i)); if (i >= BOOT.length) { clearInterval(id); setReady(true); } }, 550);
    return () => clearInterval(id);
  }, []);
  useEffect(() => { box.current?.scrollTo({ top: box.current.scrollHeight }); }, [lines]);
  function run(e: React.FormEvent) {
    e.preventDefault();
    const c = input.trim().toLowerCase(); setInput("");
    if (!c) return;
    if (c === "clear") return setLines([]);
    setLines((l) => [...l, `> ${c}`, CMD[c] ?? `unknown command: ${c}. try 'help'.`]);
  }
  return (
    <div className="term">
      <div className="term-bar"><i /><i /><i /><span>CircuitX://channel</span></div>
      <div className="term-out" ref={box} aria-live="polite">{lines.map((l, i) => <p key={i}>{l}</p>)}</div>
      <form onSubmit={run} className="term-in">
        <label htmlFor="term" className="sr">Terminal command</label><span aria-hidden="true">&gt;</span>
        <input id="term" value={input} onChange={(e) => setInput(e.target.value)} disabled={!ready} autoComplete="off" spellCheck={false} placeholder={ready ? "type a command" : "booting..."} />
        <b aria-hidden="true" className="caret" />
      </form>
    </div>
  );
}
