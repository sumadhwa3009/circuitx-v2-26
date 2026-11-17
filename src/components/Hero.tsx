"use client";
import Image from "next/image";
import Link from "next/link";
import { Snow } from "./Snow";
import { Village } from "./Art";
import { HeroBackdrop } from "./HeroBackdrop";
import { RegisterButton } from "./RegisterButton";
import { event } from "@/config/event";

export function Hero() {
  return (
    <section className="hero" id="top" data-rail="Start">
      <HeroBackdrop />
      <div className="hero-shade" /><div className="hero-lights" /><div className="grain" />
      <Snow />
      <div className="hero-body wrap">
        <p className="hero-tag"><span className="dot" />16-hour overnight hackathon</p>
        <h1 className="hero-title" aria-label="CircuitX'26 – Santa Doom">
          <Image src="/brand/circuitx-logo.png" alt="" width={2172} height={724} priority className="hero-logo glitch" />
          <span className="metal year" data-t="'26">&apos;26</span>
        </h1>
        <p className="hero-line">BUILD THE UNKNOWN.</p>
        <p className="hero-sub">Choose your own problem. Build your own solution. Take it from the first spark to a working prototype.</p>
        <div className="hero-cta"><RegisterButton /><Link href="/about" className="btn btn-line"><span>Explore CircuitX</span></Link></div>
        <dl className="hero-facts">
          <div><dt>When</dt><dd>{event.dates.label}</dd></div>
          <div><dt>Where</dt><dd>{event.institutionShort}</dd></div>
          <div><dt>By</dt><dd>IEEE PES x IEEE CASS</dd></div>
        </dl>
      </div>
      <Village className="hero-village" />
    </section>
  );
}
// keep Tape() unchanged

export function Tape() {
  const words = ["THINK BEYOND BOUNDARIES", "BUILD THE UNKNOWN", "MAKE IT MATTER", "ENGINEER THE IMPOSSIBLE"];
  const row = words.concat(words).map((w, i) => <span key={i}>{w}<em>✕</em></span>);
  return (
    <div className="tape" aria-hidden="true">
      <div className="tape-a"><div className="tape-run">{row}{row}</div></div>
      <div className="tape-b"><div className="tape-run rev">{row}{row}</div></div>
    </div>
  );
}
