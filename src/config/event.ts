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
    "A 16-hour overnight hackathon where you choose the problem, shape the solution and build through the night.",
  institution: "BMS Institute of Technology and Management",
  institutionShort: "BMSIT&M",
  organisers: [
  { id: "pes", name: "IEEE Power & Energy Society", short: "IEEE PES", logo: null as string | null, email: "ieeepes.bmsit@gmail.com" as string },
  { id: "cas", name: "IEEE Circuits and Systems Society", short: "IEEE CASS", logo: null as string | null, email: "cassbmsit@gmail.com" as string },
],
  venue: {
    name: "APJ Abdul Kalam Laboratory",
    block: "Sir C V Raman Block",
    institution: "BMS Institute of Technology and Management",
    mapUrl: "https://maps.app.goo.gl/57R115GsTYzuPuXUA"
  },
  timezone: "Asia/Kolkata",
  dates: { start: "2026-12-19", end: "2026-12-20", label: "19-20 December 2026" },
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
  quicklinks: {
    cocurl: "https://circuitx26.vercel.app/", // code of conduct URL
    tacurl: "https://circuitx26.vercel.app/", // terms and conditions URL
    pncurl: "https://circuitx26.vercel.app/", // privacy notice URL
  },
  social: [
  { id: "pes-instagram", label: "IEEE PES Instagram", url: "https://www.instagram.com/ieee.pes_bmsit/" },
  { id: "cas-instagram", label: "IEEE CASS Instagram", url: "https://www.instagram.com/ieee_cass_bmsit/" },
  { id: "pes-linkedin", label: "IEEE PES LinkedIn", url: "https://www.linkedin.com/company/ieee-pes-bmsit" },
  { id: "cas-linkedin", label: "IEEE CASS LinkedIn", url: "" },
] as { id: string; label: string; url: string }[],
  contact: { email: "ieeepes.bmsit@gmail.com", committee: "IEEE PES x IEEE CASS", 
  persons: [
    { name: "Aditya", role: "Chair, IEEE CASS", phone: "+91 91139 20283" },
    { name: "Mehak R Shashidar", role: "Chair, IEEE PES", phone: "+91 95133 31788" },
    { name: "Sumadhwa V", role: "Event Coordinator", phone: "+91 9113679843" }
  
  ] as { name: string; role: string; phone?: string }[] },
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
  { href: "/schedule", label: "Schedule" },
  { href: "/faq", label: "FAQ & contact" },
];

export const footerNav = nav;

export const prizes = {
  total: 40000,
  currency: "₹",
  tiers: [
    { id: "winner", label: "Winners", note: "", amount: 12000 },
    { id: "runner", label: "Runners-up", note: "", amount: 8000 },
  ],
  domains: [
    { id: "pes", name: "IEEE PES", full: "Power & Energy Systems" },
    { id: "cas", name: "IEEE CASS", full: "Circuits & Systems" },
  ],
} as const;
