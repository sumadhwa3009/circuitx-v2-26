import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { FaqList } from "@/components/FaqList";
import { faqs } from "@/data/faqs";
export const metadata: Metadata = { title: "FAQ", description: "Frequently asked questions about CircuitX'26." };
export default function Faq() {
  return (<>
    <PageBanner art="santa" title="Questions" intro="Answers to the questions we expect most." />
    <section className="sec"><div className="wrap" style={{ maxWidth: 860 }}><FaqList items={faqs} /></div></section>
  </>);
}
