import { HomePageContent } from "@/components/home/home-page-content";
import { getHomePage } from "@/lib/sanity/home";
import { getServices } from "@/lib/sanity/services";

export default async function HomePage() {
  const [homePage, services] = await Promise.all([
    getHomePage(),
    getServices(),
  ]);

  return (
    <HomePageContent initialHomePage={homePage} initialServices={services} />
  );
}
