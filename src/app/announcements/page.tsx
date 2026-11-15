import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { AnnouncementCard } from "@/components/AnnouncementCard";
import { announcements } from "@/data/announcements";
export const metadata: Metadata = { title: "Announcements", description: "Official CircuitX'26 updates." };
export default function Announcements() {
  return (<>
    <PageBanner art="village" title="Announcements" intro="Registration, shortlisting and event updates, newest first." />
    <section className="sec"><div className="wrap"><div className="notes" style={{ maxWidth: 760 }}>{announcements.map((a) => <AnnouncementCard key={a.id} a={a} />)}</div></div></section>
  </>);
}
