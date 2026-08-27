"use client";

import { getHomePage, type HomePageContent } from "@/lib/sanity/home";

import { useCmsQuery } from "./use-cms-query";

export function useHomePage(initialData?: HomePageContent) {
  return useCmsQuery({
    queryKey: ["homePage"],
    queryFn: getHomePage,
    initialData,
  });
}
