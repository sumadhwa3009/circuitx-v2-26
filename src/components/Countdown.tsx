"use client";
import { useEffect, useState } from "react";
import { event } from "@/config/event";
import { getPhase, split } from "@/lib/time";

function useNow() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { setNow(Date.now()); const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  return now;
}
const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown() {
  const now = useNow();
  const { start, end } = event.build;
  if (now === null) return <div className="clock clock-ph" aria-hidden="true" />;
  const phase = getPhase(now, start, end);
  if (phase === "after") return <p className="clock-msg">CircuitX&apos;26 has concluded. Thank you to every team.</p>;
  const t = split((phase === "before" ? Date.parse(start) : Date.parse(end)) - now);
  const cells: [number, string][] = [[t.days, "Days"], [t.hours, "Hours"], [t.minutes, "Minutes"], [t.seconds, "Seconds"]];
  return (
    <div>
      <p className="clock-lead">{phase === "before" ? "Until the final phase begins" : "Final phase in progress. Time remaining"}</p>
      <div className="clock" role="timer" aria-live="off">
        {cells.map(([v, l], i) => (
          <div className="clock-cell" key={l}>
            <b key={v} className="tick">{pad(v)}</b><span>{l}</span>
            {i < 3 && <i aria-hidden="true">:</i>}
          </div>
        ))}
      </div>
    </div>
  );
}

/** The 16-hour clock. No clock times are shown, only how much of the build remains. */
export function BuildTimer() {
  const now = useNow();
  if (now === null) return null;
  const s = Date.parse(event.build.start), e = Date.parse(event.build.end), total = e - s;
  const el = Math.min(Math.max(now - s, 0), total), t = split(total - el), pct = (el / total) * 100;
  const label = now < s ? "The 16-hour clock hasn't started" : now < e ? "Time left in the final phase" : "Final phase complete";
  return (
    <div className="bt">
      <p>{label}</p>
      <strong>{pad(t.days * 24 + t.hours)}:{pad(t.minutes)}:{pad(t.seconds)}</strong>
      <div className="bt-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)} aria-label="Final phase progress"><i style={{ width: `${pct}%` }} /></div>
    </div>
  );
}
