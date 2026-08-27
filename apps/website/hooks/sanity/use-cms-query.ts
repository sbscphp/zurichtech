"use client";

import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";

type UseCmsQueryOptions<T> = {
  queryKey: readonly unknown[];
  queryFn: () => Promise<T>;
  initialData?: T;
} & Omit<
  UseQueryOptions<T, Error, T, readonly unknown[]>,
  "queryKey" | "queryFn" | "initialData"
>;

/**
 * React Query wrapper for Sanity reads.
 * Seeds from build/SSR `initialData`, then refetches in the browser
 * so Studio publishes show up without a rebuild.
 */
export function useCmsQuery<T>({
  queryKey,
  queryFn,
  initialData,
  ...options
}: UseCmsQueryOptions<T>): UseQueryResult<T, Error> {
  return useQuery({
    queryKey: ["sanity", ...queryKey],
    queryFn,
    initialData,
    // Treat build snapshot as stale so a mount refetch picks up Studio publishes.
    initialDataUpdatedAt: 0,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    ...options,
  });
}
