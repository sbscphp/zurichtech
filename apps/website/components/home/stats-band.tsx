import type { Stat } from "@/lib/sanity/home";

type StatsBandProps = {
  title: string;
  description: string;
  stats: Stat[];
};

/**
 * Dark stats band (Figma node 440:18073).
 */
export function StatsBand({ title, description, stats }: StatsBandProps) {
  return (
    <section className="relative overflow-hidden bg-black">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[66%] opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fecdca 1px, transparent 1px), linear-gradient(to bottom, #fecdca 1px, transparent 1px)",
          backgroundSize: "71px 71px",
          maskImage:
            "radial-gradient(ellipse 80% 90% at 0% 50%, black 40%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 90% at 0% 50%, black 40%, transparent 75%)",
        }}
      />
      <div className="relative mx-auto flex min-h-[400px] w-full max-w-[1440px] flex-col items-start justify-center gap-10 px-6 py-16 lg:flex-row lg:items-start lg:gap-[106px] lg:px-20 lg:py-[102px]">
        <h2 className="max-w-[658px] font-display text-[32px] leading-[1.2] text-white lg:text-[40px]">
          {title}
        </h2>
        <div className="flex max-w-[516px] flex-col gap-6">
          <p className="font-body text-base leading-[1.4] text-white/70">
            {description}
          </p>
          <div className="grid grid-cols-3 gap-4 border-t border-[rgba(222,226,230,0.32)] pt-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                <p className="font-display text-[32px] leading-none text-white">
                  {stat.value}
                </p>
                <p className="font-body text-sm leading-[1.4] text-white/30">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
