"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    category: "IT consulting",
    quote:
      "“Zurich rebuilt our loan origination platform in five months. It now processes four times the volume with fewer support tickets than the system it replaced.”",
    name: "Jadesola Alao",
    role: "CFO | SBSC UK",
    image: "/figma/home/team-3.png",
    imageClass: "object-[center_top]",
  },
  {
    category: "Cloud migration",
    quote:
      "“Thanks to their expertise, our data is now securely hosted on the cloud, improving accessibility and performance significantly.”",
    name: "Anika Sharma",
    role: "CTO | Horizon Ventures",
    image: "/figma/home/team-4.png",
    imageClass: "object-[center_15%]",
  },
  {
    category: "Cybersecurity",
    quote:
      "“They implemented robust security measures that have protected us from multiple threats without hampering user experience.”",
    name: "Diego Fernández",
    role: "Head of IT | SecureNet",
    image: "/figma/home/team-2.png",
    imageClass: "object-center",
  },
];

/**
 * Testimonial slider (Figma node 253:2947).
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const item = TESTIMONIALS[index];

  function prev() {
    setIndex((current) =>
      current === 0 ? TESTIMONIALS.length - 1 : current - 1,
    );
  }

  function next() {
    setIndex((current) =>
      current === TESTIMONIALS.length - 1 ? 0 : current + 1,
    );
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="max-w-[616px] text-center">
        <p className="font-display text-lg leading-[1.2] text-brand uppercase">
          TESTIMONIALS
        </p>
        <h2 className="mt-2 font-display text-[32px] leading-[1.2] text-ink lg:text-[40px]">
          What our Clients Says
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
              className="rounded-full bg-brand-soft p-3"
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
              className="rounded-full bg-brand-soft p-3"
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
              src={item.image}
              alt={item.name}
              fill
              sizes="428px"
              className={cn("object-cover", item.imageClass)}
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
