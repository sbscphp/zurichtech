"use client";

import {
  getLegalPage,
  type LegalPageContent,
} from "@/lib/sanity/legal";

import { useCmsQuery } from "./use-cms-query";

export function useLegalPage(initialData?: LegalPageContent) {
  return useCmsQuery({
    queryKey: ["legalPage"],
    queryFn: getLegalPage,
    initialData,
  });
}
