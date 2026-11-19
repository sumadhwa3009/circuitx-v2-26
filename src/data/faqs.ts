import { event } from "@/config/event";

export type Faq = { q: string; a: string; featured?: boolean; link?: { label: string; href: string } };

const ppt = event.registration.pptTemplateUrl;

export const faqs: Faq[] = [
  {
    q: "What is CircuitX'26?",
    a: "A 16-hour overnight hackathon organised by IEEE PES and IEEE CASS at BMS Institute of Technology and Management, on 19–20 December 2026.",
    featured: true,
  },
  {
    q: "Are problem statements provided?",
    a: "No. You get two broad themes and choose your own problem within one of them, then design and build your own solution.",
    featured: true,
  },
  {
    q: "What are the themes?",
    a: "Theme 1 (CX01) is Powering a Sustainable Future and Theme 2 (CX02) is Embedded Intelligence. Each team picks one.",
    link: { label: "See the themes", href: "/themes" },
  },
  {
    q: "Who is eligible?",
    a: "CircuitX'26 is open to students from all colleges and universities, across all branches and academic years.",
  },
  {
    q: "What is the team size?",
    a: "Teams must have a minimum of 2 and a maximum of 4 members.",
    featured: true,
  },
  {
    q: "How does shortlisting work?",
    a: "You submit your idea on the official PPT template between 20 and 30 November. The organising committee evaluates the submissions and shortlists the top 20 teams, 10 from each theme. The shortlist is announced on 10 December.",
  },
  {
    q: "Where is the event held?",
    a: "APJ Abdul Kalam Laboratory, Sir C V Raman Block, BMSIT&M.",
  },
  {
    q: "How to register for CircuitX'26?",
    a: "Registration is through Unstop. Click the 'Register' button on the top right corner of this page to go to the Unstop registration page.",
    featured: true,
  },
  {
    q: "Is the idea PPT mandatory?",
    a: ppt
      ? "Yes. Ideas must be submitted on the official PPT template."
      : "Yes. Ideas must be submitted on the official PPT template. The download link will appear here when registrations open.",
    link: ppt ? { label: "Download the PPT template", href: ppt } : undefined,
  },
  {
    q: "Is there a registration fee?",
    a: "There is no registration fee for Round 1. Shortlisted teams pay a Round 2 fee of ₹1,000 per team, or ₹750 if at least one member has an IEEE CAS or PES membership, by 14 December.",
    featured: true,
  },
];