import { cn } from "@/lib/cn";
import { Cover } from "./Cover";
import { PlayButton } from "./PlayButton";
import { IconMoreSmall } from "@/icons/generated";

/**
 * Figma: Design system → UI elements/Player → "Item play"
 *   Item play=Desktop 606×120 — cover, title, author · plays, inline scrubber,
 *                               elapsed / total, red play button on the right
 *   Item play=Mobile  350×156 — meta above the title, scrubber under it,
 *                               play button floating right of the scrubber
 */
export type ItemPlayProps = {
  title: string;
  author?: string;
  plays: string;
  elapsed?: string;
  total?: string;
  /** 0–100 */
  value?: number;
  cover?: string;
  layout?: "desktop" | "mobile";
  onPlay?: () => void;
  onMore?: () => void;
  className?: string;
};

function Track({ value }: { value: number }) {
  return (
    <span className="bg-white-10 relative block h-1 w-full overflow-hidden rounded-full">
      <span className="bg-white-60 absolute inset-y-0 left-0 rounded-full" style={{ width: `${value}%` }} />
    </span>
  );
}

export function ItemPlay({
  title,
  author = "Name of Author",
  plays,
  elapsed = "38:30",
  total = "48:00",
  value = 55,
  cover,
  layout = "desktop",
  onPlay,
  onMore,
  className,
}: ItemPlayProps) {
  if (layout === "mobile") {
    return (
      <article
        className={cn(
          "border-white-10 bg-white-02 flex w-[350px] max-w-full shrink-0 flex-col gap-3 rounded-lg border p-4",
          className,
        )}
      >
        <div className="flex items-center gap-3">
          <Cover src={cover} size={44} radius={10} />
          <span className="text-white-60 font-sans text-[14px] font-medium">
            {plays} <span className="text-white-20 px-1">|</span> {author}
          </span>
          <button type="button" aria-label="More" onClick={onMore} className="ml-auto outline-none hover:opacity-80">
            <IconMoreSmall />
          </button>
        </div>
        <h3 className="font-sans text-[18px] leading-[1.2] font-semibold text-white">{title}</h3>
        <div className="flex items-center gap-3">
          <Track value={value} />
          <PlayButton action="play" forceState="hover" size={32} onClick={onPlay} />
        </div>
        <span className="text-white-60 font-sans text-[14px] font-medium tabular-nums">
          {elapsed} / {total}
        </span>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "border-white-10 bg-white-02 flex h-[120px] w-[606px] max-w-full shrink-0 items-center gap-5 rounded-lg border px-5",
        className,
      )}
    >
      <Cover src={cover} size={80} radius={12} />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start gap-3">
          <h3 className="min-w-0 flex-1 truncate font-sans text-[22px] leading-[1.2] font-semibold tracking-[0.22px] text-white">
            {title}
          </h3>
          <button type="button" aria-label="More" onClick={onMore} className="shrink-0 outline-none hover:opacity-80">
            <IconMoreSmall />
          </button>
        </div>
        <span className="text-white-60 font-sans text-[16px] font-medium">
          {author} <span className="text-white-20 px-1">|</span> {plays}
        </span>
        <div className="flex items-center gap-4">
          <Track value={value} />
          <span className="text-white-60 shrink-0 font-sans text-[16px] font-medium tabular-nums">
            {elapsed} / {total}
          </span>
        </div>
      </div>
      <PlayButton action="play" forceState="hover" size={50} onClick={onPlay} className="shrink-0" />
    </article>
  );
}

/**
 * Figma: "Container popular audio" → Popular=Desktop 395×96 / Popular=Mobile 320×72.
 * The desktop row is the numbered-chart style: big uppercase title over author · plays.
 */
export type PopularRowProps = {
  title: string;
  author?: string;
  plays: string;
  cover?: string;
  layout?: "desktop" | "mobile";
  onPlay?: () => void;
  onMore?: () => void;
  className?: string;
};

export function PopularRow({
  title,
  author = "Name of Author",
  plays,
  cover,
  layout = "desktop",
  onPlay,
  onMore,
  className,
}: PopularRowProps) {
  if (layout === "mobile") {
    return (
      <div className={cn("flex h-[72px] w-[320px] max-w-full shrink-0 items-center gap-3", className)}>
        <Cover src={cover} size={56} radius={10} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="truncate font-sans text-[16px] leading-[1.2] font-semibold text-white">{title}</h3>
          <span className="text-white-60 font-sans text-[14px] font-medium">{plays}</span>
        </div>
        <PlayButton action="play" forceState="hover" size={32} onClick={onPlay} className="shrink-0" />
      </div>
    );
  }
  return (
    <div className={cn("flex h-[96px] w-[395px] max-w-full shrink-0 items-center gap-4", className)}>
      <Cover src={cover} size={72} radius={10} />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h3 className="font-display text-[18px] leading-[1.1] text-white uppercase">{title}</h3>
        <span className="text-white-60 font-sans text-[14px] font-medium">
          {author} <span className="text-white-20 px-1">|</span> {plays}
        </span>
      </div>
      <button
        type="button"
        aria-label="More"
        onClick={onMore}
        className="shrink-0 self-start outline-none hover:opacity-80"
      >
        <IconMoreSmall />
      </button>
    </div>
  );
}
