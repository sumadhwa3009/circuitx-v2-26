import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { ThemeGrid } from "@/components/Themes";

export const metadata: Metadata = {
  title: "Themes",
  description: "The two themes of CircuitX'26: Powering a Sustainable Future and Embedded Intelligence.",
};

export default function Themes() {
  return (
    <>
      <PageBanner
        art="sleigh"
        title="Two themes. Your problem."
        intro="Each theme is a broad direction, not a problem statement. Open a card to see its focus areas, then choose what to solve."
      />
      <section className="sec sec-deep">
        <div className="wrap">
          <ThemeGrid />
        </div>
      </section>
    </>
  );
}