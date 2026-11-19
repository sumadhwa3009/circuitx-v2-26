import { event } from "@/config/event";

export type Announcement = { id: string; title: string; date: string; category: "Registration" | "Deadline" | "Shortlisting" | "Instructions" | "Update"; description: string; href?: string };

const { unstopUrl, pptTemplateUrl } = event.registration;

// Newest first. Replace this array with an API/CMS call later; keep the type.
export const announcements: Announcement[] = [
  {
    id: "registrations-open",
    title: "Round 1 registrations are now open",
    date: "2026-11-20",
    category: "Registration",
    description: "Register your team of 2 to 4 members on Unstop and submit your idea. Round 1 is free, and registrations close on 30 November at 11:59 PM. The shortlist of 20 teams, 10 from each theme, is announced on 10 December.",
    href: unstopUrl || undefined,
  },
  ...(pptTemplateUrl
    ? [{
        id: "ppt-template",
        title: "The official idea PPT template is out",
        date: "2026-11-20",
        category: "Instructions" as const,
        description: "All ideas must be submitted on the official PPT template. Download it, fill it in and upload it with your Round 1 registration on Unstop.",
        href: pptTemplateUrl,
      }]
    : []),
  
  {
    id: "themes-released",
    title: "Themes released: Powering a Sustainable Future and Embedded Intelligence",
    date: "2026-11-19",
    category: "Update",
    description: "CircuitX'26 has two themes. There are no problem statements, so pick one theme and choose your own problem within it. See the full descriptions and focus areas of both themes.",
    href: "/themes",
  },
  {
    id: "site-live",
    title: "The CircuitX'26 website is live",
    date: "2026-11-15",
    category: "Update",
    description: "Explore the schedule, prizes and event details here. Announcements will be posted on this page as the event progresses.",
  },
];