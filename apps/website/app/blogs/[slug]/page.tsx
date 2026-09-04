import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BLOG_POSTS, getBlogBySlug } from "@/lib/site/blogs";

type BlogDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  return {
    title: post?.title ?? "Insight",
    description: post?.heroSubtitle,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <section className="relative isolate h-105 overflow-hidden bg-black md:h-170.5">
        <img
          alt=""
          src={post.image}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/50 from-23% to-[#666666]/50 to-77%" />
        <div className="absolute inset-x-0 top-0 h-107.5 bg-[linear-gradient(5.6deg,rgba(227,0,11,0.1)_53.6%,rgba(102,102,102,0)_68%)]" />
        <div className="absolute inset-x-0 bottom-16 flex flex-col items-center gap-6 px-6 text-center text-white md:bottom-30">
          <h1 className="max-w-242 font-display text-[32px] leading-[1.4] font-medium md:text-[40px] lg:text-[48px]">
            {post.title}
          </h1>
          <p className="max-w-144.75 font-body text-base leading-[1.4] md:text-xl">
            {post.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto flex w-full max-w-216 flex-col gap-6 p-0 md:p-8">
          <header className="flex flex-col gap-2">
            <h2 className="font-display text-[28px] leading-[1.4] text-black md:text-[32px]">
              {post.title}
            </h2>
            <p className="font-body text-base leading-[1.4] text-ink-dimmed">
              {post.date} | {post.readTime}
            </p>
          </header>

          <div className="flex flex-col gap-4 font-body text-xl leading-[1.4] text-ink-dimmed">
            {post.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>

          {post.sections.map((section, index) => (
            <section
              key={`${section.heading}-${index}`}
              className="flex flex-col gap-6 border-t border-line py-4"
            >
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-[28px] leading-[1.4] text-black md:text-[32px]">
                  {section.heading}
                </h3>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="font-body text-xl leading-[1.4] text-ink-dimmed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {section.listIntro || section.listItems ? (
                <div className="flex flex-col gap-3 font-body text-xl leading-[1.4] text-ink-dimmed">
                  {section.listIntro ? <p>{section.listIntro}</p> : null}
                  {section.listItems ? (
                    <ul className="flex list-disc flex-col gap-3 pl-7.5">
                      {section.listItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {section.listOutro ? <p>{section.listOutro}</p> : null}
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </section>
    </article>
  );
}
