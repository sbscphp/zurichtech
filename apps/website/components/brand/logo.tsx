import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  href?: string;
  src?: string;
  alt?: string;
  siteName?: string;
};

/**
 * Brand mark used in the header and footer.
 */
export function BrandLogo({
  className,
  href = "/",
  src = "/figma/shared/Zurich-logo.svg",
  alt,
  siteName = "ZurichTech",
}: BrandLogoProps) {
  const mark = (
    <span className={cn("relative block h-[72px] w-[122px]", className)}>
      <img
        alt={alt || siteName}
        src={src}
        className="h-full w-full object-contain"
      />
    </span>
  );

  if (!href) return mark;

  return (
    <Link
      href={href}
      aria-label={`${siteName} home`}
      className="inline-block"
    >
      {mark}
    </Link>
  );
}
