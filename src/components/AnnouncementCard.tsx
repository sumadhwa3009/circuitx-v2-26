import type { Announcement } from "@/data/announcements";
export function AnnouncementCard({ a }: { a: Announcement }) {
  const date = new Date(a.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
  return (
    <article className="note">
      <p className="note-meta"><span>{a.category}</span><time dateTime={a.date}>{date}</time></p>
      <h3>{a.title}</h3><p>{a.description}</p>
      {a.href && <a href={a.href} target="_blank" rel="noopener noreferrer" className="link">Read more</a>}
    </article>
  );
}
