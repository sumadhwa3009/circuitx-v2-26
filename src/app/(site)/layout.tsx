import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnnouncementPopup } from "@/components/AnnouncementPopup";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <AnnouncementPopup />
    </>
  );
}
