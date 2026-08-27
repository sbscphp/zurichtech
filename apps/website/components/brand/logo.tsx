import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  href?: string;
};

/**
 * Wordmark crop from the ZurichTech logo sheet (Figma node 268:12962).
 * The exported asset includes the tagline below the mark; overflow clips it
 * to the 122×72 lockup used in the header and footer.
 */
export function BrandLogo({ className, href = "/" }: BrandLogoProps) {
  const mark = (
    <span
      className={cn(
        "relative block h-[72px] w-[122px] overflow-hidden",
        className,
      )}
    >
      <img
        alt="ZurichTech"
        src="/figma/shared/logo.png"
        className="absolute top-0 left-0 h-[138.89%] w-[99.63%] max-w-none [filter:url(#logo-knockout)]"
      />
    </span>
  );

  if (!href) return mark;

  return (
    <Link href={href} aria-label="ZurichTech home" className="inline-block">
      {mark}
    </Link>
  );
}
