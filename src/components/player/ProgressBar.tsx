"use client";
import { cn } from "@/lib/cn";

/**
 * Figma: Design system → UI elements/Player → the 8px scrubber inside "Play bar".
 * The track is not a plain fill: it carries a **reaction heatmap** — where listeners
 * reacted, drawn as gradient segments over a white 10% track. The default segments
 * below are the exact three from Figma; real data replaces them.
 * The knob is an 8px white dot; times are 15px SemiBold #7D7D7D.
 */
export type HeatmapSegment = {
  /** percentage of the track, 0–100 */
  left: number;
  width: number;
  gradient: string;
};

export const DEFAULT_HEATMAP: HeatmapSegment[] = [
  { left: 0, width: 30.5, gradient: "linear-gradient(90deg,#2f2f2f 0%,#f50c22 64.7%,#d80bba 78.46%,#2f2f2f 92.67%)" },
  { left: 30.5, width: 17.7, gradient: "linear-gradient(90deg,#2f2f2f 0%,#f50c22 48.61%,#2f2f2f 92.67%)" },
  { left: 69.5, width: 30.5, gradient: "linear-gradient(90deg,#303030 0%,#9816d7 20.74%,#d80bba 61.82%,#2f2f2f 100%)" },
];

export type ProgressBarProps = {
  /** 0–100 */
  value?: number;
  elapsed?: string;
  total?: string;
  heatmap?: HeatmapSegment[];
  /** Figma prints this caption under the desktop bar. */
  caption?: string;
  className?: string;
  onSeek?: (value: number) => void;
};

export function ProgressBar({
  value = 26,
  elapsed = "8:30",
  total = "48:00",
  heatmap = DEFAULT_HEATMAP,
  caption,
  className,
  onSeek,
}: ProgressBarProps) {
  return (
    <div className={cn("flex w-full flex-col", className)}>
      <div className="flex w-full items-center gap-4">
        <span className="text-gray shrink-0 font-sans text-[15px] leading-[1.1] font-semibold tracking-[0.15px] tabular-nums">
          {elapsed}
        </span>
        <div className="relative h-2 flex-1">
          <div className="bg-white-10 absolute inset-0 overflow-hidden rounded-full">
            {heatmap.map((s, i) => (
              <span
                key={i}
                aria-hidden
                className="absolute inset-y-0 rounded-full"
                style={{ left: `${s.left}%`, width: `${s.width}%`, backgroundImage: s.gradient }}
              />
            ))}
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(e) => onSeek?.(Number(e.target.value))}
            aria-label="Seek"
            className={cn(
              "absolute inset-0 w-full cursor-pointer appearance-none bg-transparent outline-none",
              "[&::-webkit-slider-thumb]:size-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(255,255,255,0.6)]",
              "[&::-moz-range-thumb]:size-2 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white",
              "focus-visible:[&::-webkit-slider-thumb]:ring-white-60 focus-visible:[&::-webkit-slider-thumb]:ring-2",
            )}
          />
        </div>
        <span className="text-gray shrink-0 font-sans text-[15px] leading-[1.1] font-semibold tracking-[0.15px] tabular-nums">
          {total}
        </span>
      </div>
      {caption && <p className="text-gray mt-1 pl-[52px] font-sans text-[14px] leading-[1.2] font-normal">{caption}</p>}
    </div>
  );
}
