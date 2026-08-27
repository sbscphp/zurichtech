import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageBanner } from "@/components/shared/page-banner";
import { PROJECTS } from "@/lib/site/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
};

export default function PortfolioPage() {
  return (
    <>
      <PageBanner
        tone="brand"
        title="Technology Solutions Built to Make an Impact."
        description="Explore selected projects that demonstrate how we turn business challenges, ideas, and technology requirements into practical digital solutions."
        cta={{ label: "Let’s work Together", href: "/contact" }}
      />

      <section className="px-6 py-16 lg:px-20 lg:py-[80px]">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-12">
          <div className="max-w-[583px] text-center">
            <p className="font-display text-lg text-brand uppercase">
              our Projects
            </p>
            <h2 className="mt-3 font-display text-[32px] leading-[1.2] text-ink lg:text-[40px]">
              Technology solutions built to move your business forward.
            </h2>
          </div>

          <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                className="flex flex-col gap-[15px] overflow-hidden rounded-[15px] bg-white shadow-[0px_4px_7px_0px_rgba(0,0,0,0.1)]"
              >
                <div className="relative h-[261px] overflow-hidden bg-white">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="410px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-[22px] px-[15px] pt-[15px] pb-[22px]">
                  <p className="font-display text-[13px] leading-[1.2] text-brand uppercase">
                    {project.category}
                  </p>
                  <div className="flex flex-col gap-[11px]">
                    <h3 className="font-display text-[20px] leading-[1.4] text-ink">
                      {project.title}
                    </h3>
                    <p className="font-body text-[17px] leading-[1.4] text-ink-dimmed">
                      {project.excerpt}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-brand-soft px-[11px] py-0.5 font-body text-[10px] font-semibold text-brand uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
