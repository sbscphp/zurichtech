import type { ClientLogo } from "@/lib/sanity/home";
import { CLIENT_LOGOS } from "@/lib/site/content";

type LogoMarqueeProps = {
  logos?: ClientLogo[];
};

const DEFAULT_LOGOS: ClientLogo[] = CLIENT_LOGOS.map((logo) => ({
  name: logo.name,
  logoSrc: logo.src,
}));

/**
 * Client logo strip (Figma node 282:12109).
 */
export function LogoMarquee({ logos = DEFAULT_LOGOS }: LogoMarqueeProps) {
  const items = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden bg-white py-[19px]">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
      <div className="flex w-max animate-marquee items-center">
        {items.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex items-center gap-1.5 px-6"
          >
            <span className="relative size-[22px] overflow-hidden">
              <img alt="" src={logo.logoSrc} className="block size-full" />
            </span>
            <span className="font-body text-lg leading-6 text-ink-dimmed">
              {logo.name}
              <span className="align-super text-xs">™</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
