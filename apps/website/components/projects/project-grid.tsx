import Image from "next/image";
import Link from "next/link";

import { PROJECTS, type Project } from "@/lib/site/portfolio";
import { cn } from "@/lib/utils";

const ROWS = [
  PROJECTS.slice(0, 3),
  PROJECTS.slice(3, 6),
] as const;

/**
 * Project card grid (Figma node 314:11866).
 */
export function ProjectGrid() {
  return (
    <section className="px-6 pt-16 pb-16 lg:px-20 lg:pt-20 lg:pb-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-12">
        <div className="max-w-[583px] text-center">
          <p className="font-display text-lg leading-[1.2] text-brand uppercase">
            our Projects
          </p>
          <h2 className="mt-3 font-display text-[32px] leading-[1.2] text-ink lg:text-[40px]">
            Technology solutions built to move your business forward.
          </h2>
        </div>

        <div className="flex w-full flex-col gap-16">
          {ROWS.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {row.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="flex flex-col gap-[15px] overflow-hidden rounded-[15px] bg-white shadow-[0px_4px_7px_0px_rgba(0,0,0,0.1)] transition-shadow hover:shadow-[0px_8px_16px_0px_rgba(0,0,0,0.12)]"
    >
      <div className="relative h-[261px] overflow-hidden bg-white">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 410px, 50vw"
          className={cn("object-cover", project.imageClass)}
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
  );
}
