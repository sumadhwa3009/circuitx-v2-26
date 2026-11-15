import Image from "next/image";
import { Snow } from "./Snow";

export function PageBanner({ title, intro, art }: { title: string; intro: string; art: "village" | "sleigh" | "mask" | "santa" | "burst" }) {
  return (
    <section className="banner">
      <Image src={`/art/${art}.jpg`} alt="" fill priority sizes="100vw" className="banner-img" />
      <div className="banner-shade" /><div className="grain" /><Snow density={0.6} />
      <div className="wrap banner-body"><h1>{title}</h1><p>{intro}</p></div>
    </section>
  );
}
