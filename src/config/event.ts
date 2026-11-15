/**
 * Single source of truth for CircuitX'26.
 * Anything marked null / "" is unconfirmed: the UI shows "TBA" or "Coming soon" instead of inventing details.
 */
export type RegistrationStatus = "coming-soon" | "open" | "closed" | "shortlist-announced";

export const event = {
  name: "CircuitX'26",
  theme: "Santa Doom",
  tagline: "Build the unknown.",
  description:
    "A 16-hour overnight hackathon with no predefined problem statements, and one secret challenge waiting halfway through.",
  institution: "BMS Institute of Technology and Management",
  institutionShort: "BMSIT&M",
  organisers: [
    { id: "pes", name: "IEEE Power & Energy Society", short: "IEEE PES", logo: null as string | null },
    { id: "cas", name: "IEEE Circuits and Systems Society", short: "IEEE CAS", logo: null as string | null },
  ],
  venue: {
    name: "BS Narayana Auditorium",
    block: "Sir C V Raman Block",
    institution: "BMS Institute of Technology and Management",
    mapUrl: null as string | null, // add only once the exact location is verified
  },
  timezone: "Asia/Kolkata",
  dates: { start: "2026-12-19", end: "2026-12-20", label: "19–20 December 2026" },
  build: {
    start: "2026-12-19T17:00:00+05:30",
    end: "2026-12-20T09:00:00+05:30",
    hours: 16,
  },
  team: { min: 2, max: 4 },
  eligibility: "Students of BMS Institute of Technology and Management only. All branches and all academic years.",
  registration: {
    status: "coming-soon" as RegistrationStatus,
    unstopUrl: "", // single source for every registration button
    pptTemplateUrl: "", // download link appears only when this is set
    deadline: null as string | null,
  },
  social: { instagram: "", linkedin: "", x: "", youtube: "" },
  contact: { email: "", committee: "", persons: [] as { name: string; role: string; phone?: string }[] },
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
