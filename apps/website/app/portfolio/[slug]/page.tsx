import { redirect } from "next/navigation";

type PortfolioSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PortfolioSlugPage({
  params,
}: PortfolioSlugPageProps) {
  const { slug } = await params;
  redirect(`/projects/${slug}`);
}
