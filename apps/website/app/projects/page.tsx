import type { Metadata } from "next";

import { ProjectsPageContentView } from "@/components/projects/projects-page-content";
import { getProjects, getProjectsPage } from "@/lib/sanity/projects";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function ProjectsPage() {
  const [page, projects] = await Promise.all([
    getProjectsPage(),
    getProjects(),
  ]);

  return (
    <ProjectsPageContentView
      initialPage={page}
      initialProjects={projects}
    />
  );
}
