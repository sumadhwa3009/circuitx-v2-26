import { Github, Instagram, Linkedin, Mail, Phone, Globe } from "lucide-react";

type Social = { id: string; label: string; url: string };
type Org = { id: string; short: string; email?: string };

const socialIcon = (id: string) =>
  id.includes("instagram") ? Instagram : id.includes("linkedin") ? Linkedin : id.includes("github") ? Github : Globe;
const socialKind = (id: string) =>
  id.includes("instagram") ? "instagram" : id.includes("linkedin") ? "linkedin" : id.includes("github") ? "github" : "web";

/** Round social icons. Only entries with a url are shown. */
export function SocialIcons({ items }: { items: readonly Social[] }) {
  const list = items.filter((s) => s.url);
  if (!list.length) return null;
  return (
    <div className="ic-row">
      {list.map((s) => {
        const Icon = socialIcon(s.id);
        return (
          <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="ic" data-k={socialKind(s.id)} data-tip={s.label} aria-label={s.label}>
            <Icon size={20} aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}

/** One mail icon per organising society; opens the mail app. */
export function EmailIcons({ organisers }: { organisers: readonly Org[] }) {
  const list = organisers.filter((o) => o.email);
  if (!list.length) return null;
  return (
    <div className="ic-row">
      {list.map((o) => (
        <a key={o.id} href={`mailto:${o.email}`} className="ic" data-k="mail" data-tip={`Email ${o.short}`} aria-label={`Email ${o.short}`}>
          <Mail size={20} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

/** Phone icon + name as a single tap-to-call link. The number is not shown as text. */
export function PhoneLink({ name, phone }: { name: string; phone: string }) {
  return (
    <a className="call" href={`tel:${phone.replace(/\s/g, "")}`} aria-label={`Call ${name}`}>
      <Phone size={17} aria-hidden="true" />
      <span>{name}</span>
    </a>
  );
}
