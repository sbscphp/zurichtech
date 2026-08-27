"use client";

import { getAboutPage, type AboutPageContent } from "@/lib/sanity/about";

import { useCmsQuery } from "./use-cms-query";

export function useAboutPage(initialData?: AboutPageContent) {
  return useCmsQuery({
    queryKey: ["aboutPage"],
    queryFn: getAboutPage,
    initialData,
  });
}
