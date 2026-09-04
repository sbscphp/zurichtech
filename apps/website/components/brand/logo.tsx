import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  href?: string;
};

export function BrandLogo({ className, href = "/" }: BrandLogoProps) {
  const mark = (
    <span className={cn("relative block h-[72px] w-[122px]", className)}>
      <img
        alt="ZurichTech"
        src="/figma/shared/Zurich-logo.svg"
        className="h-full w-full object-contain"
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
