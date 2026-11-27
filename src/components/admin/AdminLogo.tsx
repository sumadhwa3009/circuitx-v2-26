import Image from "next/image";

/** The CircuitX logo for the admin area. Sizes are set in admin.css (the file has transparent padding that is trimmed there). */
export function AdminLogo({ size = "sm", priority = false }: { size?: "sm" | "md" | "lg"; priority?: boolean }) {
  return (
    <span className={`adm-logo ${size}`}>
      <Image src="/brand/circuitx-logo.png" alt="CircuitX" width={2172} height={724} priority={priority} />
    </span>
  );
}
