const VALUES = [
  {
    title: "Client Focus",
    body: "We put our clients' objectives and requirements at the center of the solutions",
    icon: "/figma/about/icon-client.svg",
    tint: "bg-[rgba(76,110,245,0.1)]",
  },
  {
    title: "Collaboration",
    body: "We believe the best outcomes come from working closely with clients.",
    icon: "/figma/about/icon-collab.svg",
    tint: "bg-[rgba(18,184,134,0.1)]",
  },
  {
    title: "Accountability",
    body: "A named lead owns your outcome from kickoff to handover.",
    icon: "/figma/about/icon-account.svg",
    tint: "bg-[rgba(250,176,5,0.1)]",
  },
  {
    title: "Innovation",
    body: "We are open to new ideas, and approaches that can help solve problems.",
    icon: "/figma/about/icon-innovation.svg",
    tint: "bg-brand-soft",
  },
];

/**
 * Core values row (Figma node 261:24734).
 */
export function Values() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <p className="font-display text-lg leading-[1.2] text-brand uppercase">
          CORE VALUES
        </p>
        <h2 className="mt-2 font-display text-[32px] leading-[1.2] text-ink lg:text-[40px]">
          The Principle Behind Our Work
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {VALUES.map((value) => (
          <article
            key={value.title}
            className="group flex flex-col gap-6 rounded-lg bg-white p-5 transition-colors duration-300 hover:bg-brand"
          >
            <span
              className={`flex size-10 items-center justify-center overflow-hidden rounded-lg transition-colors duration-300 group-hover:bg-white ${value.tint}`}
            >
              <img alt="" src={value.icon} className="size-5" />
            </span>
            <div>
              <h3 className="font-display text-[22px] leading-[1.4] text-black transition-colors duration-300 group-hover:text-white">
                {value.title}
              </h3>
              <p className="mt-2 font-body text-base leading-[1.4] text-ink-dimmed transition-colors duration-300 group-hover:text-white/80">
                {value.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
