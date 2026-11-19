"use client";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { event } from "@/config/event";
import { Snow } from "./Snow";
import { Village } from "./Art";
import { HeroBackdrop } from "./HeroBackdrop";
import { RegisterButton } from "./RegisterButton";
import { Countdown } from "@/components/Countdown";

export function Hero() {
  const ppt = event.registration.pptTemplateUrl;
  return (
    <section className="hero" id="top" data-rail="Start">
      <HeroBackdrop />
      <div className="hero-shade" /><div className="hero-lights" /><div className="grain" />
      <Snow />
      <div className="hero-body wrap">
        <p className="hero-tag"><span className="dot" />IEEE PES x IEEE CASS PRESENTS</p>
        <h1 className="hero-title" aria-label="CircuitX'26 – Santa Doom">
          <Image src="/brand/circuitx-logo.png" alt="" width={2172} height={724} priority className="hero-logo glitch" />
          <span className="metal year" data-t="'26">&apos;26</span>
        </h1>
        <p className="hero-line">BUILD THE UNKNOWN.</p>
        <div className="hero-clock"><Countdown /></div>
        <div className="hero-cta">
          <RegisterButton />
          <Link href="/about" className="btn btn-line"><span>Explore CircuitX</span></Link>
          {ppt && (
            <a href={ppt} target="_blank" rel="noopener noreferrer" className="btn btn-ppt">
              <span><Download size={17} aria-hidden="true" />Official PPT Template</span> 
            </a>
          )}
          
        </div>  </div>
      <Village className="hero-village" />
    </section>
  );
}

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