"use client";

import {
  getContactPage,
  type ContactPageContent,
} from "@/lib/sanity/contact";

import { useCmsQuery } from "./use-cms-query";

export function useContactPage(initialData?: ContactPageContent) {
  return useCmsQuery({
    queryKey: ["contactPage"],
    queryFn: getContactPage,
    initialData,
  });
}
