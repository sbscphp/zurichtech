"use client";

import {
  getBlogPostBySlug,
  getBlogsPage,
  type BlogPost,
  type BlogsPageContent,
} from "@/lib/sanity/blogs";

import { useCmsQuery } from "./use-cms-query";

export function useBlogsPage(initialData?: BlogsPageContent) {
  return useCmsQuery({
    queryKey: ["blogsPage"],
    queryFn: getBlogsPage,
    initialData,
  });
}

export function useBlogPost(slug: string, initialData?: BlogPost) {
  return useCmsQuery({
    queryKey: ["blogPost", slug],
    queryFn: () =>
      getBlogPostBySlug(slug).then(
        (post) => post ?? Promise.reject(new Error("Blog post not found")),
      ),
    initialData,
  });
}
