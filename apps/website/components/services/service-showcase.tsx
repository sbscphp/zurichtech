import Link from "next/link";

import { ServiceCoverImage } from "@/components/services/service-cover-image";
import { Button } from "@/components/ui/button";
import type { Service } from "@/lib/sanity/services";
import type { CtaLink } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type ServiceShowcaseProps = {
  services: Service[];
  cta: CtaLink;
};

/**
 * Alternating service rows (Figma node 261:24836).
 */
export function ServiceShowcase({ services, cta }: ServiceShowcaseProps) {
  return (
    <section className="px-6 pt-16 pb-16 lg:px-20 lg:pt-20 lg:pb-24">
      <div className="mx-auto flex w-full max-w-239 flex-col gap-12">
        {services.map((service, index) => (
          <ServiceRow
            key={service._id}
            service={service}
            cta={cta}
            priority={index === 0}
          />
        ))}
      </div>
    </section>
  );
}

function ServiceRow({
  service,
  cta,
  priority,
}: {
  service: Service;
  cta: CtaLink;
  priority: boolean;
}) {
  const imageOnLeft = service.imageSide === "left";

  return (
    <article
      id={service.slug}
      className="scroll-mt-[100px] grid items-center gap-8 lg:scroll-mt-[132px] lg:grid-cols-[470px_454px] lg:gap-8"
    >
      <div
        className={cn(
          "flex flex-col items-start gap-8",
          imageOnLeft && "lg:order-2",
        )}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            {service.number ? (
              <p className="font-display text-lg leading-[1.2] text-brand uppercase">
                {service.number}
              </p>
            ) : null}
            <h2 className="font-display text-[32px] leading-[1.2] text-ink">
              {service.title}
            </h2>
          </div>
          <p className="font-body text-lg leading-[1.4] text-ink-dimmed">
            {service.summary}
          </p>
        </div>

        <ul className="flex w-full flex-col gap-4.5">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-4 border-b border-line pb-5"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-soft p-[6.4px]">
                <img
                  alt=""
                  src="/figma/services/check.svg"
                  className="block size-[19.2px]"
                />
              </span>
              <span className="font-body text-lg leading-[1.4] text-ink">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <Button
          asChild
          variant="brand"
          className="h-13 w-60.5 gap-2 rounded-[10px] px-8 py-1 font-body text-xl font-normal hover:bg-[#B30008]"
        >
          <Link href={cta.href}>{cta.label}</Link>
        </Button>
      </div>

      {service.coverImageUrl ? (
        <ServiceCoverImage
          src={service.coverImageUrl}
          alt={service.coverImageAlt}
          height={service.imageHeight}
          imagePosition={service.imagePosition}
          imageFrame={service.imageFrame}
          priority={priority}
          className={cn(imageOnLeft && "lg:order-1")}
        />
      ) : (
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-lg bg-brand-soft",
            imageOnLeft && "lg:order-1",
          )}
          style={{ height: service.imageHeight }}
        />
      )}
    </article>
  );
}
