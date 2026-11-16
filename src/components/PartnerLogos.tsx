
import Image from "next/image";
import styles from "./PartnerLogos.module.css";

const logos = [
  {
    src: "/logos/ieee-cas.png",
    alt: "IEEE Circuits and Systems Society",
    name: "IEEE CAS",
  },
  {
    src: "/logos/ieee-pes.png",
    alt: "IEEE Power and Energy Society",
    name: "IEEE PES",
  },
  {
    src: "/logos/bmsit.png",
    alt: "BMS Institute of Technology and Management",
    name: "BMSIT",
  },
  {
    src: "/logos/ieee.png",
    alt: "IEEE",
    name: "IEEE",
  },
];

export function PartnerLogos() {
  return (
    <section className={styles.section} aria-label="Event partners">
      <div className={styles.wrap}>
        <p className={styles.heading}>IN ASSOCIATION WITH</p>

        <div className={styles.logos}>
          {logos.map((logo) => (
            <div className={styles.logo} key={logo.name}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={180}
                height={110}
                className={styles.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
