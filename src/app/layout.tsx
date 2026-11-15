import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Barlow, IBM_Plex_Mono } from "next/font/google";
import "../styles/base.css";
import "../styles/sections.css";
import "../styles/art.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { event } from "@/config/event";

const display = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800", "900"], variable: "--font-display", display: "swap" });
const body = Barlow({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const desc = `${event.name} – ${event.theme}. A 16-hour overnight hackathon by IEEE PES and IEEE CAS at ${event.institutionShort}, ${event.dates.label}.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${event.name} – ${event.theme}`, template: `%s | ${event.name}` },
  description: desc,
  openGraph: { title: `${event.name} – ${event.theme}`, description: desc, type: "website", siteName: event.name, images: ["/video/hero-poster.jpg"] },
  twitter: { card: "summary_large_image", title: `${event.name} – ${event.theme}`, description: desc, images: ["/video/hero-poster.jpg"] },
};
export const viewport: Viewport = { themeColor: "#04061a", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
