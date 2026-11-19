"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { announcements } from "@/data/announcements";

const KEY = "cx-popup-seen";

export function AnnouncementPopup() {
  const a = announcements[0];
  const [open, setOpen] = useState(false);
  const dlg = useRef<HTMLDialogElement>(null);

  // show once per session, a moment after load
  useEffect(() => {
    if (!a) return;
    let seen: string | null = null;
    try { seen = sessionStorage.getItem(KEY); } catch {}
    if (seen === a.id) return;
    const t = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(t);
  }, [a]);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    document.body.classList.toggle("lock", open);
    return () => document.body.classList.remove("lock");
  }, [open]);

  if (!a) return null;

  const close = () => {
    try { sessionStorage.setItem(KEY, a.id); } catch {}
    setOpen(false);
  };

  const date = new Date(a.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
  const external = a.href?.startsWith("http");
  const cta = a.category === "Registration" ? "Register on Unstop" : external ? "Open link" : "Read more";

  return (
    <dialog
      ref={dlg}
      className="ap"
      aria-labelledby="ap-title"
      onClose={close}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      {open && (
        <div className="ap-body">
          <button type="button" className="dm-x" aria-label="Close announcement" onClick={close}>
            <X size={22} aria-hidden="true" />
          </button>
          <p className="ap-meta"><span>{a.category}</span><time dateTime={a.date}>{date}</time></p>
          <h2 id="ap-title">{a.title}</h2>
          <p className="ap-desc">{a.description}</p>
          <div className="ap-actions">
            {a.href && (external
              ? <a href={a.href} target="_blank" rel="noopener noreferrer" className="btn btn-go" onClick={close}><span>{cta} <ArrowRight size={16} aria-hidden="true" /></span></a>
              : <Link href={a.href} className="btn btn-go" onClick={close}><span>{cta} <ArrowRight size={16} aria-hidden="true" /></span></Link>)}
          </div>
        </div>
      )}
    </dialog>
  );
}