import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import {
  getProjectBySlug,
  getProjects,
  type ProjectDetail,
} from "@/lib/sanity/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  return { title: project?.title ?? "Project" };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return <ProjectCaseStudy project={project} />;
}

function ProjectCaseStudy({ project }: { project: ProjectDetail }) {
  return (
    <article className="px-6 py-16 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1032px] flex-col items-center gap-10">
        <h1 className="max-w-[968px] text-center font-display text-[32px] leading-[1.4] font-medium text-ink md:text-[40px] lg:text-[48px]">
          {project.caseStudyTitle}
        </h1>

        <div className="flex w-full max-w-[632px] items-center rounded-2xl bg-brand-soft p-5">
          <div className="relative h-[440px] w-full overflow-hidden rounded-2xl">
            <Image
              src={project.detailImageSrc}
              alt={project.detailImageAlt || project.title}
              fill
              sizes="592px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="flex w-full max-w-[800px] flex-col gap-6">
          <section className="flex flex-col gap-6">
            <h2 className="font-display text-[32px] leading-[1.4] text-brand">
              About the project
            </h2>
            <div className="flex flex-col gap-4 font-body text-xl leading-[1.4] text-ink-dimmed">
              {project.about.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-6 border-t border-line py-4">
            <div className="flex flex-col gap-3">
              <h2 className="font-display text-[32px] leading-[1.4] text-brand">
                Purpose
              </h2>
              <p className="font-body text-xl leading-[1.4] text-ink-dimmed">
                {project.purpose.heading}
              </p>
              <p className="font-body text-xl leading-[1.4] text-ink-dimmed">
                {project.purpose.body}
              </p>
            </div>
            {project.purpose.intro ? (
              <p className="font-body text-xl leading-[1.4] text-ink-dimmed">
                {project.purpose.intro}
              </p>
            ) : null}
            <BulletList items={project.purpose.items} />
          </section>

          <section className="flex flex-col gap-6 border-t border-line py-4">
            <div className="flex flex-col gap-3">
              <h2 className="font-display text-[32px] leading-[1.4] text-brand">
                Challenges
              </h2>
              <p className="font-body text-xl leading-[1.4] text-ink-dimmed">
                {project.challenges.heading}
              </p>
              {project.challenges.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="font-body text-xl leading-[1.4] text-ink-dimmed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            {project.challenges.intro ? (
              <p className="font-body text-xl leading-[1.4] text-ink-dimmed">
                {project.challenges.intro}
              </p>
            ) : null}
            <BulletList items={project.challenges.items} />
          </section>

          <section className="flex flex-col gap-6 border-t border-line py-4">
            <div className="flex flex-col gap-3">
              <h2 className="font-display text-[32px] leading-[1.4] text-brand">
                Our Approach
              </h2>
              <p className="font-body text-xl leading-[1.4] text-ink-dimmed">
                {project.approach.heading}
              </p>
              <p className="font-body text-xl leading-[1.4] text-ink-dimmed">
                {project.approach.body}
              </p>
            </div>
            <BulletList items={project.approach.items} />
          </section>
        </div>
      </div>
    </article>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  if (items.length === 0) return null;

  return (
    <ul className="flex list-disc flex-col gap-3 pl-7.5 font-body text-xl leading-[1.4] text-ink-dimmed">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
