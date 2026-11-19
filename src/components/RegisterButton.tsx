import Link from "next/link";
import { event, registrationCopy } from "@/config/event";

export function RegisterButton({ small = false }: { small?: boolean }) {
  const { status, unstopUrl } = event.registration;
  const copy = registrationCopy[status];
  const cls = `btn ${small ? "btn-sm" : ""}`;
  if (copy.enabled && unstopUrl)
    return (
      <a
        href={unstopUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cls} btn-go`}
      >
        <span>{copy.label}</span>
      </a>
    );
  if (status === "shortlist-announced")
    return (
      <Link href="/#updates" className={`${cls} btn-go`}>
        <span>{copy.label}</span>
      </Link>
    );
  const waiting = copy.enabled ? registrationCopy["coming-soon"] : copy;
  return <span role="status" className={`${cls} btn-wait`}><span>{waiting.label}</span></span>;
}
