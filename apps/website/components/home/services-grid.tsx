import Link from "next/link";

import { Button } from "@/components/ui/button";
import { HOME_SERVICES } from "@/lib/site/content";

/**
 * Home services grid (Figma node 282:8071).
 */
export function ServicesGrid() {
  return (
    <section className="bg-surface-blush px-6 pb-16 lg:px-20 lg:pb-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <h2 className="max-w-[583px] font-display text-[32px] leading-[1.2] text-ink lg:text-[40px]">
            Technology solutions built to move your business forward.
          </h2>
          <Button asChild variant="brand" size="xl" className="font-body">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {HOME_SERVICES.map((service) => (
            <article
              key={service.title}
              className="flex min-h-[328px] flex-col justify-between rounded-lg bg-white p-5"
            >
              <div className="flex flex-col gap-6">
                <span className="flex size-10 items-center justify-center overflow-hidden rounded-lg bg-brand-soft">
                  <img
                    alt=""
                    src="/figma/home/icon-code.svg"
                    className="size-5"
                  />
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-[22px] leading-[1.4] text-black">
                    {service.title}
                  </h3>
                  <p className="font-body text-base leading-[1.4] text-ink-dimmed">
                    {service.description}
                  </p>
                </div>
              </div>
              <Link
                href={service.href}
                className="mt-6 inline-flex items-center gap-2 font-body text-base text-brand"
              >
                Explore
                <span className="relative size-5 overflow-hidden">
                  <img
                    alt=""
                    src="/figma/shared/arrow-up-right-sm.svg"
                    className="block size-full"
                  />
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
