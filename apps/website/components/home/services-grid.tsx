import type { ReactNode } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { CtaLink } from "@/lib/sanity/types";
import type { Service } from "@/lib/sanity/services";

type ServicesGridProps = {
  title: string;
  cta: CtaLink;
  services: Service[];
};

const HIGHLIGHTS = ["technology solutions", "your business forward"];

const SERVICE_ICONS: Record<string, string> = {
  "Software Development": "/figma/home/Graphql.svg",
  "Web Development": "/figma/home/World.svg",
  "Mobile App Development": "/figma/home/Device-Mobile.svg",
  "IT Consulting & Advisory": "/figma/home/Messages.svg",
  "Cloud Services (AWS, Azure, GCP)": "/figma/home/Cloud-Snow.svg",
  "Data Science & AI/ML Solutions": "/figma/home/Binary-Tree.svg",
};

const DEFAULT_SERVICE_ICON = "/figma/home/icon-code.svg";

/**
 * Home services grid (Figma node 282:8071).
 */
export function ServicesGrid({ title, cta, services }: ServicesGridProps) {
  const lowerTitle = title.toLowerCase();
  const ranges = HIGHLIGHTS.map((highlight) => {
    const start = lowerTitle.indexOf(highlight);
    return start === -1 ? null : { start, end: start + highlight.length };
  })
    .filter((range): range is { start: number; end: number } => range !== null)
    .sort((a, b) => a.start - b.start);

  let cursor = 0;
  const segments: ReactNode[] = [];
  ranges.forEach((range, index) => {
    segments.push(title.slice(cursor, range.start));
    segments.push(
      <span key={index} className="text-brand">
        {title.slice(range.start, range.end)}
      </span>,
    );
    cursor = range.end;
  });
  segments.push(title.slice(cursor));

  const titleNode = <>{segments}</>;

  return (
    <section className="bg-surface-blush px-6 pb-16 lg:px-20 lg:pb-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <h2 className="max-w-[583px] font-display text-[32px] leading-[1.2] text-ink lg:text-[40px]">
            {titleNode}
          </h2>
          <Button asChild variant="brand" size="xl" className="font-body">
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service._id}
              className="group flex min-h-[328px] flex-col justify-between rounded-lg bg-white p-5 transition-colors duration-300 hover:bg-brand"
            >
              <div className="flex flex-col gap-6">
                <span className="flex size-10 items-center justify-center overflow-hidden rounded-lg bg-brand-soft transition-colors duration-300 group-hover:bg-white">
                  <img
                    alt=""
                    src={SERVICE_ICONS[service.title] ?? DEFAULT_SERVICE_ICON}
                    className="size-5"
                  />
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-[22px] leading-[1.4] text-black transition-colors duration-300 group-hover:text-white">
                    {service.title}
                  </h3>
                  <p className="font-body text-base leading-[1.4] text-ink-dimmed transition-colors duration-300 group-hover:text-white/80">
                    {service.summary}
                  </p>
                </div>
              </div>
              <Link
                href={`/services/${service.slug}`}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-transparent px-4 py-2 font-body text-base text-brand transition-colors duration-300 group-hover:bg-white"
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
