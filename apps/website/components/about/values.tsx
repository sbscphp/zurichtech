import type { ValueItem } from "@/lib/sanity/about";

type ValuesProps = {
  eyebrow: string;
  title: string;
  values: ValueItem[];
};

/**
 * Core values row (Figma node 261:24734).
 */
export function Values({ eyebrow, title, values }: ValuesProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <p className="font-display text-lg leading-[1.2] text-brand uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-2 font-display text-[32px] leading-[1.2] text-ink lg:text-[40px]">
          {title}
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {values.map((value) => (
          <article
            key={value.title}
            className="group flex flex-col gap-6 rounded-lg bg-white p-5 transition-colors duration-300 hover:bg-brand"
          >
            <span
              className={`flex size-10 items-center justify-center overflow-hidden rounded-lg transition-colors duration-300 group-hover:bg-white ${value.tint}`}
            >
              <img alt="" src={value.iconSrc} className="size-5" />
            </span>
            <div>
              <h3 className="font-display text-[22px] leading-[1.4] text-black transition-colors duration-300 group-hover:text-white">
                {value.title}
              </h3>
              <p className="mt-2 font-body text-base leading-[1.4] text-ink-dimmed transition-colors duration-300 group-hover:text-white/80">
                {value.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
