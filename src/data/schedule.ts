export type ScheduleItem = { day: string; date: string; title: string; note: string; confirmed: boolean };

// Only confirmed items are listed as confirmed. No clock times are published.
export const schedule: ScheduleItem[] = [
  { day: "19 December", date: "2026-12-19", title: "Final phase", note: "The 16-hour overnight build.", confirmed: true },
  { day: "Date TBA", date: "", title: "Opening and other activities", note: "TBA", confirmed: false },
  { day: "Date TBA", date: "", title: "Final demonstrations and judging", note: "TBA", confirmed: false },
];
