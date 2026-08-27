import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const PARAGRAPHS = [
  "Zurich Technology is a technology solutions company focused on helping organizations make better use of technology. We combine technical expertise, innovative thinking, and a clear understanding of business requirements to develop solutions that are practical, scalable, secure, and built for long-term value.",
  "Our capabilities span software development, web development, cloud solutions and DevOps, and cybersecurity and identity audit. Across every engagement, our focus remains the same: understand the challenge, identify the right approach, and deliver technology that supports the organization's objectives.",
  "Whether a business needs to develop a new digital product, improve its online presence, modernize its technology environment, or strengthen its security posture, Zurich Technology provides the expertise needed to move from ideas and requirements to effective solutions.",
];

/**
 * About story split (Figma node 261:24658).
 */
export function Story() {
  return (
    <section className="px-6 py-16 lg:px-20">
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-8 lg:grid-cols-[632px_1fr]">
        <div className="rounded-2xl bg-brand-soft p-5">
          <div className="relative aspect-[592/653] overflow-hidden rounded-2xl bg-white">
            <Image
              src="/figma/about/story.png"
              alt="ZurichTech team collaborating"
              fill
              sizes="(min-width: 1024px) 592px, 100vw"
              className="object-cover object-[30%_center]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="font-display text-lg leading-[1.2] text-brand uppercase">
              why work with Us
            </p>
            <h2 className="font-display text-[32px] leading-[1.2] text-ink lg:text-[40px]">
              Building Technology Around Your Business
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            {PARAGRAPHS.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="font-body text-lg leading-[1.4] text-ink-dimmed"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <Button asChild variant="brand" size="xl" className="self-start font-body">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
