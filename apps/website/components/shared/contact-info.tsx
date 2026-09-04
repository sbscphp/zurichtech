import { SITE } from "@/lib/site/content";

const ITEMS = [
  {
    label: "Phone",
    icon: "/figma/contact/icon-users.svg",
    lines: SITE.phones,
    hrefPrefix: "tel:" as const,
  },
  {
    label: "Email",
    icon: "/figma/contact/icon-mail.svg",
    lines: SITE.emails,
    hrefPrefix: "mailto:" as const,
  },
  {
    label: "office address",
    icon: "/figma/contact/icon-pin.svg",
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
            <span className="flex size-15.5 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand">
              <img alt="" src={item.icon} className="size-6" />
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
                    className="wrap-anywhere block font-body text-base leading-[1.4] text-ink hover:text-brand md:text-lg"
                  >
                    {line}
                  </a>
                ) : (
                  <p
                    key={line}
                    className="wrap-anywhere font-body text-base leading-[1.4] text-ink md:text-lg"
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
