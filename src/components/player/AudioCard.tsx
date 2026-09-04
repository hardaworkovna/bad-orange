import { cn } from "@/lib/cn";
import { Cover } from "./Cover";
import { PlayButton } from "./PlayButton";

/**
 * Figma: Design system → UI elements/Player → "Card Main Desktop"
 *   Card=Main Desktop  289×381 — cover, H4-ish title, 2-line description, play + meta row
 *   Card=Main Mobile   198×324 — same content at mobile type sizes
 * The play affordance is the red transport button at its hover treatment (Figma
 * draws it filled), so `PlayButton forceState="hover"` is the resting look here.
 */
export type AudioCardProps = {
  title: string;
  description?: string;
  duration: string;
  plays: string;
  cover?: string;
  layout?: "desktop" | "mobile";
  onPlay?: () => void;
  className?: string;
};

export function AudioCard({
  title,
  description,
  duration,
  plays,
  cover,
  layout = "desktop",
  onPlay,
  className,
}: AudioCardProps) {
  const mobile = layout === "mobile";
  return (
    <article
      className={cn(
        "border-white-10 bg-white-02 flex shrink-0 flex-col rounded-xl border",
        mobile ? "w-[198px] gap-3 p-4" : "w-[289px] gap-5 p-6",
        className,
      )}
    >
      <Cover src={cover} size={mobile ? 166 : 241} radius={mobile ? 12 : 16} className="w-full" />
      <div className={cn("flex flex-col", mobile ? "gap-2" : "gap-3")}>
        <h3
          className={cn(
            "font-display text-white uppercase",
            mobile ? "text-[16px] leading-[1.1]" : "text-[24px] leading-none tracking-[-0.12px]",
          )}
        >
          {title}
        </h3>
        {description && (
          <p
            className={cn(
              "text-white-60 font-sans font-medium",
              mobile ? "text-[14px] leading-[1.2]" : "text-[16px] leading-[1.2]",
            )}
          >
            {description}
          </p>
        )}
      </div>
      <div className={cn("flex items-center", mobile ? "gap-2" : "gap-4")}>
        <PlayButton action="play" forceState="hover" size={mobile ? 32 : 50} onClick={onPlay} />
        <span
          className={cn("text-white-80 font-sans font-medium tabular-nums", mobile ? "text-[13px]" : "text-[16px]")}
        >
          {duration}
        </span>
        <span
          className={cn(
            "text-white-60 ml-auto font-sans font-medium tabular-nums",
            mobile ? "text-[13px]" : "text-[16px]",
          )}
        >
          {plays}
        </span>
      </div>
    </article>
  );
}

/**
 * Figma: "Card/Secondary" (55:698) — 139×202 poster tile used in carousels.
 */
export function MiniCard({ title, cover, className }: { title: string; cover?: string; className?: string }) {
  return (
    <article className={cn("flex w-[139px] shrink-0 flex-col gap-3", className)}>
      <Cover src={cover} size={139} radius={16} className="w-full" />
      <h3 className="font-display text-white-90 text-[15px] leading-[1.1] uppercase">{title}</h3>
    </article>
  );
}
