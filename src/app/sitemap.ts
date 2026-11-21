// sitemap.ts
import type { MetadataRoute } from "next";
const base = "https://circuitx26.vercel.app";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/themes", "/schedule", "/faq", "/privacy", "/terms"].map((p) => ({
    url: base + p, lastModified: new Date(),
  }));
}