"use client";

import Image from "next/image";
import Link from "next/link";

import { BannerGrid } from "@/components/shared/banner-grid";
import { Button } from "@/components/ui/button";
import { useProjects, useProjectsPage } from "@/hooks/sanity/use-projects";
import {
  FALLBACK_PROJECTS,
  FALLBACK_PROJECTS_PAGE,
  type ProjectCard,
  type ProjectsPageContent,
} from "@/lib/sanity/projects";
import { cn } from "@/lib/utils";

type ProjectsPageContentProps = {
  initialPage?: ProjectsPageContent;
  initialProjects?: ProjectCard[];
};

export function ProjectsPageContentView({
  initialPage,
  initialProjects,
}: ProjectsPageContentProps) {
  const { data: page = FALLBACK_PROJECTS_PAGE } = useProjectsPage(initialPage);
  const { data: projects = FALLBACK_PROJECTS } = useProjects(initialProjects);

  const rows = [
    projects.slice(0, 3),
    projects.slice(3, 6),
    ...chunk(projects.slice(6), 3),
  ].filter((row) => row.length > 0);

  return (
    <>
      <section className="relative isolate flex min-h-[682px] items-center overflow-hidden bg-brand">
        <BannerGrid />

        <div className="relative mx-auto flex w-full max-w-[702px] flex-col items-center gap-6 px-6 py-16 text-center text-white">
          <h1 className="font-display text-[32px] leading-[1.2] font-medium sm:text-[40px] lg:text-[48px]">
            {page.heroTitle}
          </h1>
          <p className="max-w-[579px] font-body text-base leading-[1.4] text-white/80 lg:text-xl">
            {page.heroDescription}
          </p>
          <Button asChild variant="inverse" size="xl" className="mt-2 font-body">
            <Link href={page.heroCta.href}>{page.heroCta.label}</Link>
          </Button>
        </div>
      </section>

      <section className="px-6 pt-16 pb-16 lg:px-20 lg:pt-20 lg:pb-20">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-12">
          <div className="max-w-[583px] text-center">
            <p className="font-display text-lg leading-[1.2] text-brand uppercase">
              {page.listingEyebrow}
            </p>
            <h2 className="mt-3 font-display text-[32px] leading-[1.2] text-ink lg:text-[40px]">
              {page.listingTitle}
            </h2>
          </div>

          <div className="flex w-full flex-col gap-16">
            {rows.map((row) => (
              <div
                key={row.map((project) => project.slug).join("-")}
                className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {row.map((project) => (
                  <ProjectCardLink key={project.slug} project={project} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectCardLink({ project }: { project: ProjectCard }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="flex flex-col gap-[15px] overflow-hidden rounded-[15px] bg-white shadow-[0px_4px_7px_0px_rgba(0,0,0,0.1)] transition-shadow hover:shadow-[0px_8px_16px_0px_rgba(0,0,0,0.12)]"
    >
      <div className="relative h-[261px] overflow-hidden bg-white">
        <Image
          src={project.imageSrc}
          alt={project.imageAlt || project.title}
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

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    rows.push(items.slice(index, index + size));
  }
  return rows;
}
