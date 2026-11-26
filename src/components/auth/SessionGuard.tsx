"use client";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import "@/styles/session.css";

const KEY = "cx-last-activity"; // shared between tabs, so activity in any tab keeps you signed in
const WARN_MS = 60_000;         // warn this long before signing out
const PING_MS = 4 * 60_000;     // tell the server we are still active

/** Signs the person out after `idleMs` without activity, with a 60 second warning. Mount only when signed in. */
export function SessionGuard({ idleMs, loginPath, area }: { idleMs: number; loginPath: string; area: "admin" | "member" }) {
  const [left, setLeft] = useState<number | null>(null);
  const lastRef = useRef(0);
  const warnRef = useRef(false);
  const actions = useRef<{ stay: () => void; out: () => void }>({ stay: () => {}, out: () => {} });

  useEffect(() => {
    const read = () => { try { return Number(localStorage.getItem(KEY)) || 0; } catch { return 0; } };
    const touch = () => {
      const n = Date.now();
      lastRef.current = n;
      try { localStorage.setItem(KEY, String(n)); } catch { /* private mode */ }
    };
    const ping = () => fetch(`/api/session/ping?area=${area}`, { method: "POST", cache: "no-store" })
      .then((r) => { if (r.status === 401) void logout(); })
      .catch(() => {});
    let loggingOut = false;
    async function logout() {
      if (loggingOut) return;
      loggingOut = true;
      try { localStorage.removeItem(KEY); } catch { /* ignore */ }
      try { await createClient().auth.signOut({ scope: "local" }); } catch { /* ignore */ }
      location.href = `${loginPath}?reason=timeout`;
    }

    touch();
    let throttle = 0;
    const onActivity = () => {
      if (warnRef.current) return; // during the warning only the button counts
      const n = Date.now();
      if (n - throttle < 2000) return;
      throttle = n;
      touch();
    };
    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart", "click"] as const;
    events.forEach((e) => window.addEventListener(e, onActivity, { passive: true }));

    const tick = () => {
      const idle = Date.now() - Math.max(lastRef.current, read());
      if (idle >= idleMs) { void logout(); return; }
      if (idle >= idleMs - WARN_MS) { warnRef.current = true; setLeft(Math.ceil((idleMs - idle) / 1000)); }
      else { warnRef.current = false; setLeft(null); }
    };
    const t = setInterval(tick, 1000);
    const p = setInterval(() => { if (Date.now() - Math.max(lastRef.current, read()) < PING_MS) ping(); }, PING_MS);

    actions.current = {
      stay: () => { touch(); warnRef.current = false; setLeft(null); ping(); },
      out: () => { void logout(); },
    };

    return () => {
      clearInterval(t); clearInterval(p);
      events.forEach((e) => window.removeEventListener(e, onActivity));
    };
  }, [idleMs, loginPath, area]);

  if (left === null) return null;
  return (
    <div className="sg-overlay" role="alertdialog" aria-modal="true" aria-labelledby="sg-title">
      <div className="sg-card">
        <h2 id="sg-title">Still there?</h2>
        <p>For your security you will be signed out in <b>{left}</b> seconds because of inactivity.</p>
        <div className="sg-actions">
          <button type="button" className="btn btn-go" onClick={() => actions.current.stay()}><span>Stay signed in</span></button>
          <button type="button" className="btn btn-line" onClick={() => actions.current.out()}><span>Sign out now</span></button>
        </div>
      </div>
    </div>
  );
}
