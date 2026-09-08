"use client";

import { useState } from "react";
import Image from "next/image";

import type { Testimonial } from "@/lib/sanity/about";
import { cn } from "@/lib/utils";

type TestimonialsProps = {
  eyebrow: string;
  title: string;
  testimonials: Testimonial[];
};

/**
 * Testimonial slider (Figma node 253:2947).
 */
export function Testimonials({
  eyebrow,
  title,
  testimonials,
}: TestimonialsProps) {
  const [index, setIndex] = useState(0);
  const item = testimonials[index] ?? testimonials[0];

  if (!item) return null;

  function prev() {
    setIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1,
    );
  }

  function next() {
    setIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1,
    );
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="max-w-[616px] text-center">
        <p className="font-display text-lg leading-[1.2] text-brand uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-2 font-display text-[32px] leading-[1.2] text-ink lg:text-[40px]">
          {title}
        </h2>
      </div>

      <div className="grid w-full items-center gap-10 lg:grid-cols-[616px_428px] lg:gap-20">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <p className="font-display text-sm leading-[1.2] text-brand uppercase">
              {item.category}
            </p>
            <p className="font-body text-[28px] leading-[1.2] text-ink lg:text-[40px] lg:leading-[1.2]">
              {item.quote}
            </p>
          </div>
          <div className="flex gap-[27px]">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="cursor-pointer rounded-full bg-brand-soft p-3"
            >
              <img
                alt=""
                src="/figma/about/chevron-left.svg"
                className="size-9"
              />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="cursor-pointer rounded-full bg-brand-soft p-3"
            >
              <img
                alt=""
                src="/figma/about/chevron-left.svg"
                className="size-9 rotate-180"
              />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative h-[390.5px] overflow-hidden bg-gradient-to-b from-brand-soft to-[rgba(239,113,119,0.03)]">
            <Image
              src={item.imageSrc}
              alt={item.name}
              fill
              sizes="428px"
              className={cn("object-cover", item.objectPosition)}
            />
          </div>
          <div>
            <p className="font-display text-[22px] leading-[1.4] text-ink">
              {item.name}
            </p>
            <p className="mt-1 font-body text-base leading-[1.4] text-brand">
              {item.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
