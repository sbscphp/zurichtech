import { createClient } from "@sanity/client";

import {
  isSanityConfigured,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
  sanityUseCdn,
} from "./env";

export const sanityClient = isSanityConfigured()
  ? createClient({
      projectId: sanityProjectId!,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: sanityUseCdn,
    })
  : null;

export function getSanityClient(options?: { useCdn?: boolean }) {
  if (!sanityClient) return null;

  return sanityClient.withConfig({
    useCdn: options?.useCdn ?? sanityUseCdn,
  });
}
