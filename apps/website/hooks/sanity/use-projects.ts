"use client";

import {
  getProjects,
  getProjectsPage,
  type ProjectCard,
  type ProjectsPageContent,
} from "@/lib/sanity/projects";

import { useCmsQuery } from "./use-cms-query";

export function useProjectsPage(initialData?: ProjectsPageContent) {
  return useCmsQuery({
    queryKey: ["projectsPage"],
    queryFn: getProjectsPage,
    initialData,
  });
}

export function useProjects(initialData?: ProjectCard[]) {
  return useCmsQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    initialData,
  });
}
