export type ScheduleItem = { day: string; iso: string; time: string; title: string; note: string; round: 1 | 2 };

// Dates and times are not final. Edit here and the schedule page updates.
export const schedule: ScheduleItem[] = [
  { round: 1, day: "19 Nov 2026", iso: "2026-11-19", time: "12:00 AM", title: "Launch and theme release", note: "The event officially begins and the themes are released." },
  { round: 1, day: "20 Nov 2026", iso: "2026-11-20", time: "12:00 AM", title: "Round 1 registrations open", note: "Teams can start registering and must submit their ideas on the official PPT template." },
  { round: 1, day: "30 Nov 2026", iso: "2026-11-30", time: "11:59 PM", title: "Round 1 registrations close", note: "Registration for the event officially closes." },
  { round: 1, day: "10 Dec 2026", iso: "2026-12-10", time: "12:00 AM", title: "Shortlist announced", note: "The top 20 teams (10 from each domain) advance to Round 2, and Round 2 registrations begin." },
  { round: 1, day: "14 Dec 2026", iso: "2026-12-14", time: "11:59 PM", title: "Round 2 registrations close", note: "Last date for shortlisted teams to pay the registration fee." },
  { round: 2, day: "19 Dec 2026", iso: "2026-12-19", time: "5:00 PM", title: "The final round begins", note: "Teams can start building their projects." },
  { round: 2, day: "20 Dec 2026", iso: "2026-12-20", time: "12:00 AM", title: "A surprise awaits", note: "A twist in CircuitX, at midnight." },
  { round: 2, day: "20 Dec 2026", iso: "2026-12-20", time: "9:00 AM", title: "The build phase concludes", note: "Teams must stop building their projects." },
  { round: 2, day: "20 Dec 2026", iso: "2026-12-20", time: "10:00 AM", title: "Event concludes", note: "Winners are announced and the prize pool is distributed." },
];