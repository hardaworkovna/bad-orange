"use client";

import { cn } from "@/lib/cn";
import { PlayerBar } from "./PlayerBar";
import type { HeatmapSegment } from "./ProgressBar";
import { useAudioPlayer } from "@/lib/audio/AudioPlayerProvider";
import { formatTime, isBusy } from "@/lib/audio/types";

/**
 * The Figma play bar, wired to the app's single audio engine.
 *
 * `PlayerBar` stays purely presentational — it is the component that was matched
 * to Figma — and every decision about what the listener is allowed to do lives
 * here, read off the player's state machine.
 *
 * Figma has no play-bar art for loading / buffering / error / locked, so those
 * reuse pieces the design already has: the Disabled transport variant, and the
 * caption slot under the desktop scrubber, which normally reads
 * "Heatmap: Reactions intensity". Worth confirming with Yasya.
 */
export function PlayerDock({
  layout = "desktop",
  heatmap,
  className,
}: {
  layout?: "desktop" | "mobile";
  heatmap?: HeatmapSegment[];
  className?: string;
}) {
  const player = useAudioPlayer();
  const { status, story, position, duration, progress, error } = player;

  // Nothing has been chosen yet: the bar has nothing to say.
  if (status === "idle" && !story) return null;

  const caption =
    status === "error"
      ? (error ?? "This audio could not be loaded.")
      : status === "locked"
        ? "This story is part of a membership."
        : status === "buffering"
          ? "Buffering…"
          : status === "loading"
            ? "Loading…"
            : undefined;

  return (
    <div className={cn(className)} data-status={status}>
      <PlayerBar
        layout={layout}
        title={story?.title ?? ""}
        cover={story?.coverSrc}
        playing={status === "playing"}
        disabled={isBusy(status)}
        value={progress}
        elapsed={formatTime(position)}
        total={formatTime(duration)}
        heatmap={heatmap}
        caption={caption}
        onTogglePlay={player.toggle}
        onSeek={(percent) => player.seek((percent / 100) * (duration || 0))}
        onSkip={player.skip}
        onNext={player.next}
        onPrevious={player.previous}
      />
    </div>
  );
}
