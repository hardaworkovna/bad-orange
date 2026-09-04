/**
 * Remembers where the listener stopped, per story.
 *
 * Browser storage throws in a few contexts (private windows with site data
 * blocked, embedded previews), and a lost position is never worth an exception,
 * so every access is guarded and failure is silent.
 */
const KEY = "daddy-sounds:positions";

/** Below this the track counts as unstarted; near the end it counts as finished. */
const MIN_RESUME_SECONDS = 5;
const END_MARGIN_SECONDS = 10;

type Positions = Record<string, number>;

function read(): Positions {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Positions) : {};
  } catch {
    return {};
  }
}

function write(next: Positions) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable — the position is a convenience, not state we owe anyone */
  }
}

/** Seconds to resume `slug` at, or 0. */
export function getSavedPosition(slug: string): number {
  if (typeof window === "undefined") return 0;
  const value = read()[slug];
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : 0;
}

/**
 * Stores the position, unless the listener has barely started or has effectively
 * finished — resuming at 3 seconds, or at the last breath of a track, is worse
 * than starting over.
 */
export function savePosition(slug: string, position: number, duration: number) {
  if (typeof window === "undefined") return;
  const next = read();
  const finished = duration > 0 && position > duration - END_MARGIN_SECONDS;
  if (position < MIN_RESUME_SECONDS || finished) delete next[slug];
  else next[slug] = Math.floor(position);
  write(next);
}

export function clearPosition(slug: string) {
  if (typeof window === "undefined") return;
  const next = read();
  delete next[slug];
  write(next);
}
