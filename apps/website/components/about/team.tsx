import Image from "next/image";

import { TEAM } from "@/lib/site/content";
import { cn } from "@/lib/utils";

const ABOUT_TEAM = [...TEAM, ...TEAM];

function isRaisedMember(index: number) {
  const column = index % 4;
  const row = Math.floor(index / 4);
  if (row === 0) return column === 1 || column === 3;
  return column === 0 || column === 3;
}

/**
 * About team grid — two staggered rows matching Figma node 261:24680.
 */
export function Team() {
  return (
    <section className="px-6 py-16 lg:px-20 lg:py-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-8">
        <div className="max-w-[616px] text-center">
          <p className="font-display text-lg leading-[1.2] text-brand uppercase">
            Our team
          </p>
          <h2 className="mt-2 font-display text-[32px] leading-[1.2] text-ink lg:text-[40px]">
            ZurichTech Professionals
          </h2>
        </div>

        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_TEAM.map((member, index) => (
            <article
              key={`${member.name}-${index}`}
              className={cn(
                "flex flex-col gap-6",
                isRaisedMember(index) && "lg:pt-[120px]",
              )}
            >
              <div className="relative h-[390.5px] overflow-hidden bg-gradient-to-b from-brand-soft to-[rgba(239,113,119,0.03)]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(min-width: 1024px) 302px, 50vw"
                  className={cn("object-cover", member.offset)}
                />
              </div>
              <div>
                <h3 className="font-display text-[22px] leading-[1.4] text-ink">
                  {member.name}
                </h3>
                <p className="mt-1 font-body text-base leading-[1.4] text-ink-dimmed">
                  {member.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
