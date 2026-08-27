"use client";

import {
  getServices,
  getServicesPage,
  type Service,
  type ServicesPageContent,
} from "@/lib/sanity/services";

import { useCmsQuery } from "./use-cms-query";

export function useServicesPage(initialData?: ServicesPageContent) {
  return useCmsQuery({
    queryKey: ["servicesPage"],
    queryFn: getServicesPage,
    initialData,
  });
}

export function useServices(initialData?: Service[]) {
  return useCmsQuery({
    queryKey: ["services"],
    queryFn: getServices,
    initialData,
  });
}
