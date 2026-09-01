import Image from "next/image";

import type { HomeTeamMember } from "@/lib/sanity/home";
import { cn } from "@/lib/utils";

type TeamProps = {
  eyebrow: string;
  title: string;
  members: HomeTeamMember[];
};

/**
 * Home team row (Figma node 282:8097).
 */
export function Team({ eyebrow, title, members }: TeamProps) {
  return (
    <section className="px-6 pb-16 lg:px-20 lg:pb-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-8">
        <div className="max-w-[616px] text-center">
          <p className="font-display text-lg leading-[1.2] text-brand uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-display text-[32px] leading-[1.2] text-ink lg:text-[40px]">
            {title}
          </h2>
        </div>

        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <article
              key={member.name}
              className={cn(
                "flex flex-col gap-6",
                member.raised && "lg:pt-[120px]",
              )}
            >
              <div className="relative h-[390px] overflow-hidden bg-gradient-to-b from-brand-soft to-[rgba(239,113,119,0.03)]">
                <Image
                  src={member.imageSrc}
                  alt={member.name}
                  fill
                  sizes="(min-width: 1024px) 302px, 50vw"
                  className={cn("object-cover", member.objectPosition)}
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
