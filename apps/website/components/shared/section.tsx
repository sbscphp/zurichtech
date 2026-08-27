import { cn } from "@/lib/utils";

type SectionProps = {
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({
  title,
  description,
  className,
  children,
}: SectionProps) {
  return (
    <section className={cn("mx-auto max-w-6xl px-6 py-16 md:py-24", className)}>
      {title ? (
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {title}
        </h2>
      ) : null}
      {description ? (
        <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
      ) : null}
      <div className={cn(title || description ? "mt-10" : undefined)}>
        {children}
      </div>
    </section>
  );
}
