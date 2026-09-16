"use client";

import Image from "next/image";
import Link from "next/link";

import { useBlogsPage } from "@/hooks/sanity/use-blogs";
import {
  FALLBACK_BLOGS_PAGE,
  type BlogCard,
  type BlogsPageContent,
} from "@/lib/sanity/blogs";

type BlogsPageContentProps = {
  initialPage?: BlogsPageContent;
};

function BlogCardLink({
  post,
  imageClassName,
  sizes,
  titleClassName,
  showExcerpt = true,
  excerptClassName,
}: {
  post: BlogCard;
  imageClassName: string;
  sizes: string;
  titleClassName: string;
  showExcerpt?: boolean;
  excerptClassName?: string;
}) {
  return (
    <Link href={`/blogs/${post.slug}`} className="flex flex-col gap-4">
      <p className="font-display text-sm text-brand uppercase">{post.category}</p>
      <div className={`relative overflow-hidden bg-white ${imageClassName}`}>
        <Image
          src={post.imageSrc}
          alt={post.imageAlt || post.title}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
      <h3 className={titleClassName}>{post.title}</h3>
      {showExcerpt ? (
        <p
          className={
            excerptClassName ??
            "font-body text-base leading-[1.4] text-ink-dimmed"
          }
        >
          {post.excerpt}
        </p>
      ) : null}
    </Link>
  );
}

export function BlogsPageContentView({ initialPage }: BlogsPageContentProps) {
  const { data: page = FALLBACK_BLOGS_PAGE } = useBlogsPage(initialPage);
  const featured = page.featured ?? FALLBACK_BLOGS_PAGE.featured;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand">
        <img
          alt={page.heroImageAlt}
          src={page.heroImageUrl}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="relative mx-auto flex min-h-105 max-w-225 items-center justify-center px-6 py-24 text-center md:min-h-170.5">
          <h1 className="font-display text-[36px] leading-[1.2] font-medium text-white md:text-[48px]">
            {page.heroTitle}
          </h1>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <h2 className="font-display text-[32px] leading-[1.2] text-ink lg:text-[40px]">
            {page.recentTitle}
          </h2>
          <div className="grid gap-8 xl:grid-cols-[52%_45%]">
            {featured ? (
              <BlogCardLink
                post={featured}
                imageClassName="h-90"
                sizes="660px"
                titleClassName="font-display text-[22px] leading-[1.4] text-ink lg:text-[32px]"
              />
            ) : null}

            <div className="flex flex-col gap-6">
              {page.sidebar.map((item) => (
                <Link
                  key={item._id}
                  href={`/blogs/${item.slug}`}
                  className="flex gap-4"
                >
                  <div className="relative h-35 w-45 shrink-0 overflow-hidden bg-white sm:h-56.5 sm:w-70.5">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt || item.title}
                      fill
                      sizes="282px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col gap-3">
                    <p className="font-display text-sm text-brand uppercase">
                      {item.category}
                    </p>
                    <h3 className="font-display text-lg leading-[1.4] text-ink sm:text-[22px]">
                      {item.title}
                    </h3>
                    <p className="hidden font-body text-base leading-[1.4] text-ink-dimmed sm:block">
                      {item.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 lg:px-20 lg:pb-24">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <h2 className="font-display text-[32px] leading-[1.2] text-ink lg:text-[40px]">
            {page.exploreTitle}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {page.explore.map((item) => (
              <BlogCardLink
                key={item._id}
                post={item}
                imageClassName="h-64"
                sizes="364px"
                titleClassName="font-display text-[22px] leading-[1.4] text-ink"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
