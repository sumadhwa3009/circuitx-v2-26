export type Announcement = { id: string; title: string; date: string; category: "Registration" | "Deadline" | "Shortlisting" | "Instructions" | "Update"; description: string; href?: string };

// Newest first. Replace this array with an API/CMS call later; keep the type.
export const announcements: Announcement[] = [
  {
    id: "site-live",
    title: "The CircuitX'26 website is live",
    date: "2026-11-15",
    category: "Update",
    description: "Registration details, the idea PPT template and the full schedule will be posted here as they are confirmed.",
  },
];
