import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { CtaLink } from "@/lib/sanity/types";
import type { InsightCard } from "@/lib/sanity/home";

type InsightsProps = {
  title: string;
  cta: CtaLink;
  insights: InsightCard[];
};

/**
 * Home insights carousel (Figma node 282:8085).
 */
export function Insights({ title, cta, insights }: InsightsProps) {
  return (
    <section className="px-6 py-16 lg:px-20 lg:py-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <h2 className="max-w-[583px] font-display text-[32px] leading-[1.2] text-ink lg:text-[40px]">
            {title}
          </h2>
          <Button asChild variant="brand" size="xl" className="font-body">
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        </div>

        <div className="-mx-6 overflow-x-auto px-6 pb-2">
          <div className="flex w-max gap-8">
            {insights.slice(0, 5).map((insight) => (
              <Link
                key={insight.title}
                href={insight.href}
                className="flex w-[280px] shrink-0 flex-col gap-4 sm:w-[364px]"
              >
                <p className="font-display text-sm leading-[1.2] text-brand uppercase">
                  {insight.category}
                </p>
                <div className="relative h-64 overflow-hidden bg-white">
                  <Image
                    src={insight.imageSrc}
                    alt=""
                    fill
                    sizes="364px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-display text-[22px] leading-[1.4] text-ink">
                    {insight.title}
                  </h3>
                  <p className="font-body text-base leading-[1.4] text-ink-dimmed">
                    {insight.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
