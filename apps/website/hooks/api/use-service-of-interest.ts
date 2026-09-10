"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchServiceOfInterest } from "@/lib/api/service-of-interest";
import { FALLBACK_SERVICE_OF_INTEREST } from "@/lib/api/types";

export function useServiceOfInterest() {
  return useQuery({
    queryKey: ["serviceOfInterest"],
    queryFn: fetchServiceOfInterest,
    staleTime: 1000 * 60 * 30,
    placeholderData: [...FALLBACK_SERVICE_OF_INTEREST],
  });
}
