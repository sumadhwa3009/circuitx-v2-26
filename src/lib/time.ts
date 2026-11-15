export type Phase = "before" | "live" | "after";

export function getPhase(now: number, start: string, end: string): Phase {
  const s = Date.parse(start), e = Date.parse(end);
  return now < s ? "before" : now < e ? "live" : "after";
}

export function split(ms: number) {
  const t = Math.max(0, Math.floor(ms / 1000));
  return { days: Math.floor(t / 86400), hours: Math.floor((t % 86400) / 3600), minutes: Math.floor((t % 3600) / 60), seconds: t % 60 };
}
