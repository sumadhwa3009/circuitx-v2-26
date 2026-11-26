import Link from "next/link";
import { requireAdmin } from "@/lib/auth/permissions";
import { AnnouncementForm } from "../AnnouncementForm";
import "../announcements.css";

const todayIST = () => new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }); // YYYY-MM-DD

export default async function NewAnnouncement({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  await requireAdmin("announcements.manage");
  const { error } = await searchParams;
  return (
    <>
      <div className="adm-ph"><div><p className="amuted"><Link href="/admincircuitx/announcements" className="link">Announcements</Link> / New</p><h1>New announcement</h1></div></div>
      <AnnouncementForm today={todayIST()} error={error} />
    </>
  );
}
