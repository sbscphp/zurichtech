export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const sanityApiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";
export const sanityUseCdn = process.env.NEXT_PUBLIC_SANITY_USE_CDN === "true";

export function isSanityConfigured() {
  return Boolean(sanityProjectId && sanityDataset);
}
