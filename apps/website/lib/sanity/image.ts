import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { sanityDataset, sanityProjectId } from "./env";

const builder =
  sanityProjectId && sanityDataset
    ? createImageUrlBuilder({
        projectId: sanityProjectId,
        dataset: sanityDataset,
      })
    : null;

export function getImageUrl(
  source: SanityImageSource | undefined,
  width = 1200,
) {
  if (!source || !builder) return "";
  return builder.image(source).width(width).url();
}
