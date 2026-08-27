"use client";

import { Section } from "@/components/shared/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHomePage } from "@/hooks/sanity/use-home-page";
import { FALLBACK_HOME_PAGE, type HomePageContent } from "@/lib/sanity/home";

type HighlightsProps = {
  initialData?: HomePageContent;
};

export function Highlights({ initialData }: HighlightsProps) {
  const { data = FALLBACK_HOME_PAGE } = useHomePage(initialData);

  return (
    <Section title={data.highlightsTitle}>
      <div className="grid gap-6 md:grid-cols-3">
        {data.highlights.map((highlight) => (
          <Card key={highlight.title}>
            <CardHeader>
              <CardTitle>{highlight.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {highlight.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
