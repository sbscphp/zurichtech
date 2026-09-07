import { SITE } from "@/lib/site/content";
import { Mail, MapPin, Phone } from "lucide-react";

const ITEMS = [
  {
    label: "Phone",
    icon: <Phone className="size-6" />,
    lines: SITE.phones,
    hrefPrefix: "tel:" as const,
  },
  {
    label: "Email",
    icon: <Mail className="size-6" />,
    lines: SITE.emails,
    hrefPrefix: "mailto:" as const,
  },
  {
    label: "office address",
    icon: <MapPin className="size-6" />,
    lines: [SITE.address],
    hrefPrefix: null,
  },
];

export function ContactInfo() {
  return (
    <section className="mx-auto w-full max-w-303.75 px-6 py-16 md:py-24">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="font-serif text-[36px] leading-none text-ink-heading md:text-[48px]">
          Contact Information
        </h2>
        <p className="font-body text-lg text-ink">Reach out to us with ease.</p>
      </div>

      <div className="mt-6 grid gap-8 md:grid-cols-3 md:gap-6">
        {ITEMS.map((item) => (
          <div key={item.label} className="flex min-w-0 items-start gap-3">
            <span className="flex size-15.5 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand text-white">
              {item.icon}
            </span>
            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="font-body text-xs leading-[1.4] font-semibold text-brand uppercase">
                {item.label}
              </p>
              {item.lines.map((line) =>
                item.hrefPrefix ? (
                  <a
                    key={line}
                    href={`${item.hrefPrefix}${line.replace(/\s/g, "")}`}
                    className="wrap-anywhere block font-body text-base leading-[1.4] text-ink hover:text-brand "
                  >
                    {line}
                  </a>
                ) : (
                  <p
                    key={line}
                    className="wrap-anywhere font-body text-base leading-[1.4] text-ink "
                  >
                    {line}
                  </p>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
