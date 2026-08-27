import { SITE } from "@/lib/site/content";

const ITEMS = [
  {
    label: "Phone",
    icon: "/figma/contact/icon-users.svg",
    lines: SITE.phones,
  },
  {
    label: "Email",
    icon: "/figma/contact/icon-mail.svg",
    lines: SITE.emails,
  },
  {
    label: "office address",
    icon: "/figma/contact/icon-pin.svg",
    lines: [SITE.address],
  },
];

/**
 * Shared contact strip used on Contact and Why Choose Us
 * (Figma node 275:124386).
 */
export function ContactInfo() {
  return (
    <section className="mx-auto w-full max-w-[1215px] px-6 py-16 md:py-24">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="font-serif text-[36px] leading-none text-ink-heading md:text-[48px]">
          Contact Information
        </h2>
        <p className="font-body text-lg text-ink">Reach out to us with ease.</p>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="flex size-[62px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand">
              <img alt="" src={item.icon} className="size-6" />
            </span>
            <div className="min-w-0">
              <p className="font-body text-xs leading-[1.4] font-semibold text-brand uppercase">
                {item.label}
              </p>
              {item.lines.map((line) => (
                <p
                  key={line}
                  className="font-body text-base leading-[1.4] text-ink md:text-xl"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
