import type { Metadata } from "next";

import { BlogDetailContent } from "@/components/blogs/blog-detail-content";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/sanity/blogs";

type BlogDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  return {
    title: post?.title ?? "Insight",
    description: post?.heroSubtitle ?? post?.excerpt,
  };
}

/**
 * Pretty URL for posts known at build time. Still client-fetches so Studio
 * edits show without a rebuild. New posts should use /blogs/view/?slug=…
 * (or hosting rewrite) until the next export.
 */
export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const initialPost = await getBlogPostBySlug(slug);

  return <BlogDetailContent slug={slug} initialPost={initialPost} />;
}
