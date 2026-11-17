/**
 * Single source of truth for CircuitX'26.
 * Anything marked null / "" is unconfirmed: the UI shows "TBA" or "Coming soon" instead of inventing details.
 */
export type RegistrationStatus = "coming-soon" | "open" | "closed" | "shortlist-announced";

export const event = {
  name: "CircuitX'26",
  theme: "PES x CAS",
  tagline: "Build the unknown.",
  description:
    "A 16-hour overnight hackathon with two broad domains, and one secret challenge waiting halfway through.",
  institution: "BMS Institute of Technology and Management",
  institutionShort: "BMSIT&M",
  organisers: [
  { id: "pes", name: "IEEE Power & Energy Society", short: "IEEE PES", logo: null as string | null, email: "pes-email@example.com" as string },
  { id: "cas", name: "IEEE Circuits and Systems Society", short: "IEEE CAS", logo: null as string | null, email: "cas-email@example.com" as string },
],
  venue: {
    name: "BS Narayana Auditorium",
    block: "Sir C V Raman Block",
    institution: "BMS Institute of Technology and Management",
    mapUrl: "https://maps.app.goo.gl/57R115GsTYzuPuXUA"
  },
  timezone: "Asia/Kolkata",
  dates: { start: "2026-12-19", end: "2026-12-20", label: "19–20 December 2026" },
  build: {
    start: "2026-12-19T17:00:00+05:30",
    end: "2026-12-20T09:00:00+05:30",
    hours: 16,
  },
  team: { min: 2, max: 4 },
  eligibility: "Open to students from all colleges and universities, across all academic branches and academic years.",
  registration: {
    status: "coming-soon" as RegistrationStatus,
    unstopUrl: "", // single source for every registration button
    pptTemplateUrl: "", // download link appears only when this is set
    deadline: null as string | null,
  },
  social: [
  { id: "pes-instagram", label: "IEEE PES Instagram", url: "" },
  { id: "cas-instagram", label: "IEEE CAS Instagram", url: "" },
  { id: "pes-linkedin", label: "IEEE PES LinkedIn", url: "" },
  { id: "cas-linkedin", label: "IEEE CAS LinkedIn", url: "" },
] as { id: string; label: string; url: string }[],
  contact: { email: "ieeepes.bmsit@gmail.com", committee: "IEEE PES x IEEE CAS", persons: [{ name: "Sumadhwa Rao", role: "Event Coordinator", phone: "+91 9876543210" }] as { name: string; role: string; phone?: string }[] },
} as const;

export const registrationCopy: Record<RegistrationStatus, { label: string; helper: string; enabled: boolean }> = {
  "coming-soon": { label: "Registration opens soon", helper: "The Unstop link will appear here.", enabled: false },
  open: { label: "Register on Unstop", helper: "Registration is open.", enabled: true },
  closed: { label: "Registration closed", helper: "Registrations have closed.", enabled: false },
  "shortlist-announced": { label: "Shortlist announced", helper: "Check announcements for the shortlisted teams.", enabled: false },
};

export const nav = [
  { href: "/about", label: "About" },
  { href: "/domains", label: "Domains" },
  { href: "/the-x", label: "The X" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/schedule", label: "Schedule" },
  { href: "/faq", label: "FAQ" },
];

export const footerNav = [
  ...nav,
  { href: "/guidelines", label: "Guidelines" },
  { href: "/announcements", label: "Announcements" },
  { href: "/contact", label: "Contact" },
];

export const prizes = {
  total: 40000,
  currency: "₹",
  tiers: [
    { id: "winner", label: "Winners", note: "1st prize in each domain", amount: 12000 },
    { id: "runner", label: "Runners-up", note: "2nd prize in each domain", amount: 8000 },
  ],
  domains: [
    { id: "pes", name: "IEEE PES", full: "Power & Energy Systems" },
    { id: "cas", name: "IEEE CAS", full: "Circuits & Systems" },
  ],
} as const;