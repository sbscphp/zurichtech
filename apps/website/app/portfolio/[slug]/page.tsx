import { redirect } from "next/navigation";

import { getProjects } from "@/lib/sanity/projects";

type PortfolioSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function PortfolioSlugPage({
  params,
}: PortfolioSlugPageProps) {
  const { slug } = await params;
  redirect(`/projects/${slug}`);
}
