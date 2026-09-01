import type { Metadata } from "next";

import { ProjectGrid } from "@/components/projects/project-grid";
import { ProjectsBanner } from "@/components/projects/projects-banner";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsBanner />
      <ProjectGrid />
    </>
  );
}
