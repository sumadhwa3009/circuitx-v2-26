"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { RegisterButton } from "./RegisterButton";
import { CircuitTree, Village } from "./Art";
import { footerNav } from "@/config/event";

export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("lock", open);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("keydown", esc); document.body.classList.remove("lock"); };
  }, [open]);

  return (
    <>
      <header className={`bar ${solid ? "bar-solid" : ""} ${open ? "bar-open" : ""}`}>
        <Logo height={99} priority />
        <div className="bar-right">
          <RegisterButton small />
          <button className={`burger ${open ? "is-x" : ""}`} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
            <span /><span /><span />
          </button>
        </div>
      </header>
      <div id="menu" className={`menu ${open ? "menu-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Primary" className="menu-links">
          {footerNav.map((n, i) => (
            <Link key={n.href} href={n.href} tabIndex={open ? 0 : -1} style={{ transitionDelay: open ? `${0.05 + i * 0.045}s` : "0s" }} className={path === n.href ? "on" : ""}>
              {n.label}
            </Link>
          ))}
        </nav>
        <CircuitTree className="menu-tree" />
        <Village className="menu-village" />
      </div>
    </>
  );
}
