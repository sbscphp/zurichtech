"use client";

import {
  getWhyChooseUsPage,
  type WhyChooseUsPageContent,
} from "@/lib/sanity/why-choose-us";

import { useCmsQuery } from "./use-cms-query";

export function useWhyChooseUsPage(initialData?: WhyChooseUsPageContent) {
  return useCmsQuery({
    queryKey: ["whyChooseUsPage"],
    queryFn: getWhyChooseUsPage,
    initialData,
  });
}
