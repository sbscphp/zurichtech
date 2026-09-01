import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { CtaLink } from "@/lib/sanity/types";
import type { WhyPoint } from "@/lib/sanity/home";

type WhyChooseUsProps = {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  imageUrl: string;
  imageAlt: string;
  points: WhyPoint[];
  cta: CtaLink;
};

/**
 * Home why-choose-us split (Figma node 282:8058).
 */
export function WhyChooseUs({
  eyebrow,
  titlePrefix,
  titleHighlight,
  imageUrl,
  imageAlt,
  points,
  cta,
}: WhyChooseUsProps) {
  return (
    <section className="bg-surface-blush px-6 py-16 lg:px-20 lg:py-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center justify-between gap-8 lg:flex-row lg:gap-8">
        <div className="flex h-[698px] w-full max-w-[632px] items-center rounded-2xl bg-brand-soft p-5">
          <div className="relative h-[658px] w-full overflow-hidden rounded-2xl">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 592px, 100vw"
              className="object-cover object-[20%_center]"
            />
          </div>
        </div>

        <div className="flex w-full max-w-[616px] flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="font-display text-lg leading-[1.2] text-brand uppercase">
              {eyebrow}
            </p>
            <h2 className="font-display text-[32px] leading-[1.2] text-ink lg:text-[40px]">
              {titlePrefix}
              <span className="text-brand">{titleHighlight}</span>
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {points.map((point) => (
              <div
                key={point.number}
                className="flex gap-6 border-b border-line px-5 pt-4 pb-6 last:border-b-0"
              >
                <p className="shrink-0 font-display text-lg leading-[1.2] text-brand uppercase">
                  {point.number}
                </p>
                <div className="flex flex-col gap-3">
                  <h3 className="font-display text-[22px] leading-[1.4] text-ink">
                    {point.title}
                  </h3>
                  <p className="font-body text-base leading-[1.4] text-ink-dimmed">
                    {point.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:pl-[63px]">
            <Button asChild variant="brand" size="xl" className="font-body">
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
