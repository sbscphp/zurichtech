"use client";

import { useState } from "react";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type ServiceCoverImageProps = {
  src: string;
  alt: string;
  height: number;
  imagePosition?: string;
  imageFrame?: "plain" | "blush";
  /** Prioritize images already (or almost) in the first viewport. */
  priority?: boolean;
  className?: string;
};

/**
 * Cover image with a matching skeleton until paint, and lazy load for
 * below-the-fold rows so visible images win bandwidth.
 */
export function ServiceCoverImage({
  src,
  alt,
  height,
  imagePosition,
  imageFrame = "plain",
  priority = false,
  className,
}: ServiceCoverImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-lg",
        imageFrame === "blush" && "bg-brand-soft",
        className,
      )}
      style={{ height }}
    >
      {!loaded ? (
        <Skeleton
          aria-hidden
          className="absolute inset-0 size-full rounded-lg bg-brand-soft/80"
        />
      ) : null}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 454px, 100vw"
        priority={priority}
        {...(priority ? {} : { loading: "lazy" as const })}
        className={cn(
          "object-cover transition-opacity duration-300",
          imagePosition,
          loaded ? "opacity-100" : "opacity-0",
        )}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
