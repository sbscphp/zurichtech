import type { QueryParams } from "@sanity/client";

import { getSanityClient } from "./client";

export const SANITY_CACHE_TAG = "sanity";

type SanityFetchOptions = {
  useCdn?: boolean;
};

/**
 * Shared Sanity fetch for Node (build/SSR) and the browser.
 * Browser failures rethrow so React Query can keep `initialData`
 * instead of wiping the UI to empty.
 */
export async function sanityFetch<T>(
  query: string,
  params: QueryParams = {},
  options: SanityFetchOptions = {},
): Promise<T | null> {
  const client = getSanityClient({ useCdn: options.useCdn ?? false });
  if (!client) return null;

  try {
    if (typeof window !== "undefined") {
      return await client.fetch<T>(query, params);
    }

    return await client.fetch<T>(query, params, {
      cache: "no-store",
      next: { tags: [SANITY_CACHE_TAG] },
    });
  } catch (error) {
    if (typeof window !== "undefined") {
      throw error;
    }
    return null;
  }
}
