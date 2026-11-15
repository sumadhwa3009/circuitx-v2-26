"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Snow } from "./Snow";
import { Village } from "./Art";
import { RegisterButton } from "./RegisterButton";
import { event } from "@/config/event";

export function Hero() {
  const [video, setVideo] = useState(false);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = matchMedia("(min-width: 768px)").matches;
    const saver = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    setVideo(wide && !reduce && !saver);
  }, []);
  return (
    <section className="hero" id="top" data-rail="Start">
      <Image src="/video/hero-poster.jpg" alt="" fill priority sizes="100vw" className="hero-img" />
      {video && (
        <video className="hero-vid" autoPlay muted loop playsInline preload="metadata" poster="/video/hero-poster.jpg" aria-hidden="true">
          <source src="/video/hero.webm" type="video/webm" /><source src="/video/hero.mp4" type="video/mp4" />
        </video>
      )}
      <div className="hero-shade" /><div className="hero-lights" /><div className="grain" />
      <Snow />
      <div className="hero-body wrap">
        <p className="hero-tag"><span className="dot" />16-hour overnight hackathon</p>
        <h1 className="hero-title" aria-label="Santa Doom">
          <span className="metal" data-t="SANTA">SANTA</span>
          <span className="metal doom" data-t="DOOM">DOOM</span>
        </h1>
        <p className="hero-line">BUILD THE UNKNOWN.</p>
        <p className="hero-sub">Choose your own problem. Build your own solution. Then, halfway through the night, the rules change.</p>
        <div className="hero-cta"><RegisterButton /><Link href="/about" className="btn btn-line"><span>Explore CircuitX</span></Link></div>
        <dl className="hero-facts">
          <div><dt>When</dt><dd>{event.dates.label}</dd></div>
          <div><dt>Where</dt><dd>{event.institutionShort}</dd></div>
          <div><dt>By</dt><dd>IEEE PES + IEEE CAS</dd></div>
        </dl>
      </div>
      <Village className="hero-village" />
    </section>
  );
}

export function Tape() {
  const words = ["THINK BEYOND BOUNDARIES", "BUILD THE UNKNOWN", "EXPECT THE UNEXPECTED", "THE X HAS NOT BEEN REVEALED"];
  const row = words.concat(words).map((w, i) => <span key={i}>{w}<em>✕</em></span>);
  return (
    <div className="tape" aria-hidden="true">
      <div className="tape-a"><div className="tape-run">{row}{row}</div></div>
      <div className="tape-b"><div className="tape-run rev">{row}{row}</div></div>
    </div>
  );
}
