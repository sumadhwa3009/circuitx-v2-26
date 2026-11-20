import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Barlow, IBM_Plex_Mono } from "next/font/google";
import "../styles/base.css";
import "../styles/sections.css";
import "../styles/art.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { event } from "@/config/event";
import { AnnouncementPopup } from "@/components/AnnouncementPopup";
import { Analytics } from "@vercel/analytics/next";

const display = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800", "900"], variable: "--font-display", display: "swap" });
const body = Barlow({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://circuitx26.vercel.app";
const title = `${event.name} - ${event.tagline}`;
const desc = `${event.name}: a 16-hour overnight hackathon by IEEE PES and IEEE CASS at ${event.institutionShort}, ${event.dates.label}. Two themes, no problem statements.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${event.name}` },
  description: desc,
  openGraph: { title, description: desc, type: "website", siteName: event.name, images: ["/og.jpg"] },
  twitter: { card: "summary_large_image", title, description: desc, images: ["/og.jpg"] },
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
        <AnnouncementPopup />
        <Analytics />
      </body>
    </html>
  );
}
