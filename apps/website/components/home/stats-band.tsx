import { ColorStripe } from "@/components/shared/color-stripe";

const STATS = [
  { value: "120+", label: "Project Delivered" },
  { value: "98%", label: "On-time delivery" },
  { value: "10+", label: "Engineering Experience" },
];

/**
 * Dark stats band (Figma node 282:8633).
 */
export function StatsBand() {
  return (
    <section>
      <ColorStripe />
      <div className="relative overflow-hidden bg-black">
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
        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-16 lg:flex-row lg:items-start lg:gap-[106px] lg:px-20 lg:py-[102px]">
          <h2 className="max-w-[658px] font-display text-[28px] leading-[1.2] text-white lg:text-[40px]">
            The gap between business ambition and technology execution
            shouldn&apos;t hold you back.
          </h2>
          <div className="flex max-w-[516px] flex-col gap-6">
            <p className="font-body text-base leading-[1.4] text-white/70">
              Businesses need technology that does more than simply keep up. From
              complex systems and evolving infrastructure to growing security
              demands, the right technology partner helps turn challenges into
              opportunities for sustainable growth.
            </p>
            <div className="grid grid-cols-3 gap-4 border-t border-white/20 pt-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-2">
                  <p className="font-display text-[28px] leading-none text-white lg:text-[32px]">
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
      </div>
      <ColorStripe />
    </section>
  );
}
