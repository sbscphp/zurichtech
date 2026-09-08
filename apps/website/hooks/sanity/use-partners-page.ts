"use client";

import {
  getPartnersPage,
  type PartnersPageContent,
} from "@/lib/sanity/partners";

import { useCmsQuery } from "./use-cms-query";

export function usePartnersPage(initialData?: PartnersPageContent) {
  return useCmsQuery({
    queryKey: ["partnersPage"],
    queryFn: getPartnersPage,
    initialData,
  });
}
