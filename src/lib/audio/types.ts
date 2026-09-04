import type { Story } from "@/lib/content";

/**
 * The player's state machine. Every state the UI can be in has a name here, so a
 * component never has to infer "is it loading?" from a combination of booleans.
 *
 *   idle       nothing loaded yet
 *   loading    a track was chosen, metadata not in yet
 *   playing    audio is advancing
 *   paused     loaded, stopped, position kept
 *   buffering  was playing, the network ran dry mid-track
 *   error      the source failed; `error` carries a message
 *   locked     the story is gated and this viewer may not play it
 */
export type PlayerStatus = "idle" | "loading" | "playing" | "paused" | "buffering" | "error" | "locked";

export type PlayerState = {
  status: PlayerStatus;
  /** The story currently loaded into the element, if any. */
  story: Story | null;
  /** Seconds. */
  position: number;
  /** Seconds; 0 until metadata arrives. */
  duration: number;
  /** 0–1. */
  volume: number;
  muted: boolean;
  /** Set only while `status === "error"`. */
  error: string | null;
};

/** True while the transport should be inert. */
export function isBusy(status: PlayerStatus) {
  return status === "idle" || status === "loading" || status === "error" || status === "locked";
}

/** mm:ss, or h:mm:ss past an hour. Returns "0:00" for anything not finite. */
export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const s = total % 60;
  const m = Math.floor(total / 60) % 60;
  const h = Math.floor(total / 3600);
  const mm = h > 0 ? String(m).padStart(2, "0") : String(m);
  return `${h > 0 ? `${h}:` : ""}${mm}:${String(s).padStart(2, "0")}`;
}
