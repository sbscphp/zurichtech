/** Shapes shared across the Sanity content modules. */

export type CtaLink = {
  label: string;
  href: string;
};

export type SanityCtaLink = {
  label?: string;
  href?: string;
};

export function mapCtaLink(
  cta: SanityCtaLink | undefined,
  fallback: CtaLink,
): CtaLink {
  const label = cta?.label?.trim();
  const href = cta?.href?.trim();
  if (!label || !href) return fallback;
  return { label, href };
}

export function mapCtaLinks(
  links: SanityCtaLink[] | undefined,
  fallback: CtaLink[],
): CtaLink[] {
  const mapped =
    links
      ?.map((link) => {
        const label = link.label?.trim();
        const href = link.href?.trim();
        return label && href ? { label, href } : null;
      })
      .filter((link): link is CtaLink => link !== null) ?? [];

  return mapped.length > 0 ? mapped : fallback;
}

export function mapStrings(
  values: (string | undefined)[] | undefined,
  fallback: string[],
): string[] {
  const mapped =
    values?.map((value) => value?.trim()).filter((value): value is string =>
      Boolean(value),
    ) ?? [];

  return mapped.length > 0 ? mapped : fallback;
}
