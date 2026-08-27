import { cn } from "@/lib/utils";

const SEGMENTS = [
  "bg-[#f04444]",
  "bg-[#e73938]",
  "bg-[#ff6b01]",
  "bg-[#0070f2]",
  "bg-[#027a48]",
] as const;

type ColorStripeProps = {
  className?: string;
  inverted?: boolean;
};

/**
 * Multi-color bar that frames the stats band (Figma node 249:7972).
 */
export function ColorStripe({ className, inverted = false }: ColorStripeProps) {
  return (
    <div
      className={cn(
        "flex h-3 w-full",
        inverted && "flex-row-reverse",
        className,
      )}
      aria-hidden
    >
      {SEGMENTS.map((color) => (
        <span key={color} className={cn("h-full min-w-0 flex-1", color)} />
      ))}
    </div>
  );
}
