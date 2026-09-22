"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { BlogDetailContent } from "@/components/blogs/blog-detail-content";

function resolveSlugFromLocation(searchSlug: string | null): string {
  const fromQuery = searchSlug?.trim() ?? "";
  if (fromQuery && fromQuery !== "view") return fromQuery;

  if (typeof window === "undefined") return fromQuery;

  const match = window.location.pathname.match(
    /\/blogs\/(?:view\/?)?(?:$|([^/?#]+))/i,
  );
  const fromPath = match?.[1]?.trim() ?? "";
  if (!fromPath || fromPath === "view") return fromQuery;
  return fromPath;
}

function BlogViewInner() {
  const searchParams = useSearchParams();
  const [slug, setSlug] = useState(() =>
    resolveSlugFromLocation(searchParams.get("slug")),
  );

  useEffect(() => {
    setSlug(resolveSlugFromLocation(searchParams.get("slug")));
  }, [searchParams]);

  return <BlogDetailContent slug={slug} />;
}

/**
 * Always-built blog detail shell for static export.
 * Use /blogs/view/?slug=<post-slug>, or host rewrite of /blogs/<slug>/ here.
 */
export default function BlogViewPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex min-h-105 w-full max-w-216 items-center justify-center px-6 py-24">
          <p className="font-body text-lg text-ink-dimmed">Loading insight…</p>
        </div>
      }
    >
      <BlogViewInner />
    </Suspense>
  );
}
