import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { CtaLink } from "@/lib/sanity/types";

type StoryProps = {
  eyebrow: string;
  titleHighlight: string;
  titleRest: string;
  paragraphs: string[];
  cta: CtaLink;
  imageUrl: string;
  imageAlt: string;
};

/**
 * About story split (Figma node 261:24658).
 */
export function Story({
  eyebrow,
  titleHighlight,
  titleRest,
  paragraphs,
  cta,
  imageUrl,
  imageAlt,
}: StoryProps) {
  return (
    <section className="px-6 pt-16 pb-16 lg:px-20 lg:pt-20 lg:pb-20">
      <div className="mx-auto flex w-full max-w-[1241px] flex-col items-center justify-between gap-8 lg:flex-row lg:gap-8">
        <div className="flex h-[693px] w-full max-w-[632px] items-center rounded-2xl bg-brand-soft p-5">
          <div className="relative h-[653px] w-full overflow-hidden rounded-2xl bg-white">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 592px, 100vw"
              className="object-cover object-[20%_center]"
            />
          </div>
        </div>

        <div className="flex w-full max-w-[577px] flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="font-display text-lg leading-[1.2] text-brand uppercase">
              {eyebrow}
            </p>
            <h2 className="font-display text-[32px] leading-[1.2] text-ink lg:text-[40px]">
              <span className="text-brand">{titleHighlight}</span>{" "}
              <span>{titleRest}</span>
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="font-body text-lg leading-[1.4] text-ink-dimmed"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <Button
            asChild
            variant="brand"
            size="xl"
            className="self-start font-body hover:bg-[#B30008]"
          >
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
