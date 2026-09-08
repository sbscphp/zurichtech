import type { Metadata } from "next";

import { BlogsPageContentView } from "@/components/blogs/blogs-page-content";
import { getBlogsPage } from "@/lib/sanity/blogs";

export const metadata: Metadata = {
  title: "Insights",
};

export default async function BlogsPage() {
  const page = await getBlogsPage();
  return <BlogsPageContentView initialPage={page} />;
}
