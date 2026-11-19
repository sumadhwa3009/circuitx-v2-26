import type { Faq } from "@/data/faqs";

// Native <details>: keyboard and screen-reader accessible with no client JS. The plus morphs into an X.
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary><span>{f.q}</span><i aria-hidden="true" /></summary>
          <p>
            {f.a}
            {f.link && (
              <>
                {" "}
                <a
                  className="link"
                  href={f.link.href}
                  {...(f.link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {f.link.label}
                </a>
              </>
            )}
          </p>
        </details>
      ))}
    </div>
  );
}