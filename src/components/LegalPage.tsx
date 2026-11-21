import type { ReactNode } from "react";
import { PageBanner } from "./PageBanner";
import "../styles/legal.css";

export function LegalPage({ title, intro, updated, children }: { title: string; intro: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageBanner art="village" title={title} intro={intro} />
      <section className="sec">
        <div className="wrap legal">
          <p className="legal-updated">Last updated: {updated}</p>
          {children}
        </div>
      </section>
    </>
  );
}
