"use client";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { Cover } from "./Cover";
import { PlayButton } from "./PlayButton";
import { ProgressBar, type HeatmapSegment } from "./ProgressBar";
import { SegmentedToggle } from "@/components/ui/SegmentedToggle";
import { IconNext, IconForward15, IconBack15, IconPlus, IconCopy } from "@/icons/generated";

/**
 * Figma: Design system → UI elements/Player → "Play bar"
 *  - 1440 (322:6366): 4 variants = pause/play × default/hovered. 167 tall, glass
 *    surface (white 2% + 50px blur, 1px white 40% stroke), 100px side padding,
 *    1240 content, scrubber pinned at y=110.
 *  - 390 (322:6576, 322:6517): the mobile bars.
 * Transport order is taken from the Figma frame: prev · 15 · play/pause · 15 · next.
 */
export type PlayerBarProps = {
  title?: string;
  cover?: string;
  playing?: boolean;
  /** Storybook only: pin the transport button's hover state. */
  forceButtonState?: "hover";
  value?: number;
  elapsed?: string;
  total?: string;
  heatmap?: HeatmapSegment[];
  layout?: "desktop" | "mobile";
  /** Nothing is loaded, or it is loading, errored or locked: the transport is inert. */
  disabled?: boolean;
  /** Replaces the Figma caption under the desktop scrubber (used for errors). */
  caption?: string;
  onTogglePlay?: () => void;
  /** Percentage, 0–100. Supplying this makes the scrubber controlled. */
  onSeek?: (value: number) => void;
  onSkip?: (seconds: number) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  className?: string;
};

const DEFAULT_CAPTION = "Heatmap: Reactions intensity";

export function PlayerBar({
  title = "This is my pussy now",
  cover,
  playing = false,
  forceButtonState,
  value = 26,
  elapsed = "8:30",
  total = "48:00",
  heatmap,
  layout = "desktop",
  disabled,
  caption = DEFAULT_CAPTION,
  onTogglePlay,
  onSeek,
  onSkip,
  onNext,
  onPrevious,
  className,
}: PlayerBarProps) {
  // Uncontrolled when no `onSeek` is given, so the Storybook stories and the
  // reference page still have a draggable scrubber with no wiring.
  const [internalPos, setInternalPos] = useState(value);
  const pos = onSeek ? value : internalPos;
  const handleSeek = onSeek ?? setInternalPos;

  const transport = (
    <>
      <button
        type="button"
        aria-label="Previous"
        disabled={disabled}
        onClick={onPrevious}
        className="shrink-0 outline-none hover:opacity-80 focus-visible:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <IconNext size={32} className="-scale-x-100" />
      </button>
      <div className="flex shrink-0 items-center gap-8">
        <button
          type="button"
          aria-label="Forward 15 seconds"
          disabled={disabled}
          onClick={() => onSkip?.(15)}
          className="outline-none hover:opacity-80 focus-visible:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <IconForward15 />
        </button>
        <PlayButton
          action={playing ? "pause" : "play"}
          forceState={forceButtonState}
          disabled={disabled}
          onClick={onTogglePlay}
        />
        <button
          type="button"
          aria-label="Back 15 seconds"
          disabled={disabled}
          onClick={() => onSkip?.(-15)}
          className="outline-none hover:opacity-80 focus-visible:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <IconBack15 />
        </button>
      </div>
      <button
        type="button"
        aria-label="Next"
        disabled={disabled}
        onClick={onNext}
        className="shrink-0 outline-none hover:opacity-80 focus-visible:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <IconNext size={32} />
      </button>
    </>
  );

  if (layout === "mobile") {
    return (
      <div
        className={cn(
          "glass border-white-20 bg-white-02 flex h-[108px] w-[390px] max-w-full flex-col justify-center gap-3 border px-5",
          className,
        )}
      >
        <div className="flex items-center gap-3">
          <Cover src={cover} size={44} radius={12} />
          <p className="font-display min-w-0 flex-1 truncate text-[16px] leading-[1.1] tracking-[-0.08px] text-white opacity-90">
            {title}
          </p>
          <div className="flex shrink-0 items-center gap-4">
            <button
              type="button"
              aria-label="Back 15 seconds"
              disabled={disabled}
              onClick={() => onSkip?.(-15)}
              className="outline-none disabled:cursor-not-allowed disabled:opacity-40"
            >
              <IconBack15 />
            </button>
            <PlayButton action={playing ? "pause" : "play"} size={44} disabled={disabled} onClick={onTogglePlay} />
            <button
              type="button"
              aria-label="Next"
              disabled={disabled}
              onClick={onNext}
              className="outline-none disabled:cursor-not-allowed disabled:opacity-40"
            >
              <IconNext />
            </button>
          </div>
        </div>
        <ProgressBar value={pos} onSeek={handleSeek} elapsed={elapsed} total={total} heatmap={heatmap} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "glass bg-white-02 relative flex h-[167px] w-[1440px] items-start justify-center gap-8 overflow-hidden border px-[100px]",
        className,
      )}
      style={{ borderColor: "rgb(255 255 255 / 0.4)" }}
    >
      <div className="flex w-[1240px] items-center justify-between pt-[26px]">
        <div className="flex items-center gap-5">
          <Cover src={cover} size={70} radius={16} />
          <p className="font-display text-[20px] leading-none tracking-[-0.1px] text-white opacity-90">{title}</p>
        </div>
        <div className="flex items-center justify-center gap-5">{transport}</div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Add reaction"
              className="border-white-60 hover:bg-white-10 focus-visible:bg-white-10 inline-flex size-[35px] items-center justify-center rounded-full border-2 outline-none"
            >
              <IconPlus />
            </button>
            <span className="text-white-60 font-sans text-[16px] leading-[1.1] font-semibold tracking-[0.16px]">
              Add reaction
            </span>
          </div>
          <div className="flex items-center gap-6">
            <SegmentedToggle
              label="Format"
              options={[
                { value: "audio", label: "Audio" },
                { value: "video", label: "Video" },
              ]}
              defaultValue="audio"
            />
            <button
              type="button"
              aria-label="Copy link"
              className="outline-none hover:opacity-80 focus-visible:opacity-80"
            >
              <IconCopy />
            </button>
          </div>
        </div>
      </div>
      <div className="absolute top-[106px] left-1/2 w-[1240px] -translate-x-1/2">
        <ProgressBar
          value={pos}
          onSeek={handleSeek}
          elapsed={elapsed}
          total={total}
          heatmap={heatmap}
          caption={caption}
        />
      </div>
    </div>
  );
}
