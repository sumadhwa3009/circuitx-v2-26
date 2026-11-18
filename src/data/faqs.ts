export type Faq = { q: string; a: string; featured?: boolean };

export const faqs: Faq[] = [
  {
    q: "What is CircuitX'26?",
    a: "A 16-hour overnight hackathon organised by IEEE PES and IEEE CASS at BMS Institute of Technology and Management, on 19–20 December 2026.",
    featured: true,
  },
    {
    q: "Are problem statements provided?",
    a: "No. You get two broad domains and choose your own problem, then design and build your own solution.",
    featured: true,
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
    a: "You submit your project idea on the official PPT template. The organising committee evaluates submissions and shortlists teams. The number of teams and domain-wise split will be set after registrations close.",
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
    a: "Ideas are submitted through the official PowerPoint template. <a href={event.registration.pptTemplateUrl} target='_blank' rel='noopener noreferrer'>Click here to download the PPT Template</a>",
  },
  {
    q: "Is there a registration fee?",
    a: "There is no registration fee for CircuitX'26. However, shortlisted teams must pay a Round 2 fee of ₹1,000 per team, or ₹750 if at least one member has an IEEE CAS or PES membership.",
    featured: true,
  },
];
