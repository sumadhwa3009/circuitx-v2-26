import Image from "next/image";
import Link from "next/link";

// Supplied logo file, untouched. Height sets size so proportions never change.
export function Logo({ height = 34, priority = false }: { height?: number; priority?: boolean }) {
  return (
    <Link href="/" aria-label="CircuitX'26 home" className="logo">
      <Image src="/brand/circuitx-logo.png" alt="CircuitX" width={2172} height={724} priority={priority} style={{ height, width: "auto" }} />
    </Link>
  );
}
