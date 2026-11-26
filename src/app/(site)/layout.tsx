import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnnouncementPopup } from "@/components/AnnouncementPopup";
import { getAnnouncements } from "@/lib/announcements";

export const revalidate = 300; // safety net; saving in admin refreshes the site immediately

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const popup = (await getAnnouncements()).find((a) => a.popup) ?? null;
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <AnnouncementPopup a={popup} />
    </>
  );
}
