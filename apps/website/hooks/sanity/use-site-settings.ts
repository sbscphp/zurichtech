"use client";

import {
  getSiteSettings,
  type SiteSettingsContent,
} from "@/lib/sanity/site-settings";

import { useCmsQuery } from "./use-cms-query";

export function useSiteSettings(initialData?: SiteSettingsContent) {
  return useCmsQuery({
    queryKey: ["siteSettings"],
    queryFn: getSiteSettings,
    initialData,
  });
}
