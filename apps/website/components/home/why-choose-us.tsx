import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const POINTS = [
  {
    number: "01",
    title: "Business-focused technology",
    body: "We take the time to understand your business challenges before building solutions, ensuring every technology decision supports meaningful operational and business outcomes.",
  },
  {
    number: "02",
    title: "Expertise across the technology stack",
    body: "From software and web development to cloud, DevOps, cybersecurity, and IT audit, we bring the technical capability needed to solve complex challenges with confidence.",
  },
  {
    number: "03",
    title: "Built for sustainable growth",
    body: "We create reliable, scalable technology solutions that help businesses improve operations today while building a stronger foundation for tomorrow",
  },
];

/**
 * Home why-choose-us split (Figma node 282:8058).
 */
export function WhyChooseUs() {
  return (
    <section className="bg-surface-blush px-6 py-16 lg:px-20 lg:py-20">
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-8 lg:grid-cols-[632px_1fr] lg:gap-8">
        <div className="rounded-2xl bg-brand-soft p-5">
          <div className="relative aspect-[592/735] overflow-hidden rounded-lg">
            <Image
              src="/figma/home/why-choose-us.png"
              alt="ZurichTech team in the office"
              fill
              sizes="(min-width: 1024px) 592px, 100vw"
              className="object-cover object-[20%_center]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="font-display text-lg leading-[1.2] text-brand uppercase">
              why Choose Us?
            </p>
            <h2 className="font-display text-[32px] leading-[1.2] text-ink lg:text-[40px]">
              Technology expertise built around what your business needs next.
            </h2>
          </div>

          <div className="flex flex-col">
            {POINTS.map((point) => (
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
              <Link href="/about">Learn more about Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
