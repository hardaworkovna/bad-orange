"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Story } from "@/lib/content";
import { getAudioSrc } from "./source";
import { getSavedPosition, savePosition } from "./positions";
import type { PlayerState, PlayerStatus } from "./types";

/**
 * One `<audio>` element for the whole app, driven through this context.
 *
 * Everything visual stays in the Figma-built components; this only owns the
 * element, the state machine and the keyboard shortcuts. A second player never
 * exists, so nothing can play over the top of something else.
 */

export const SKIP_SECONDS = 15;

export type AudioPlayerApi = PlayerState & {
  /** Playlist the transport steps through (a category, a page of results). */
  queue: readonly Story[];
  /** Load a story and start it. `queue` sets what prev/next walk. */
  play: (story: Story, queue?: readonly Story[]) => void;
  toggle: () => void;
  pause: () => void;
  resume: () => void;
  /** Absolute, in seconds. */
  seek: (seconds: number) => void;
  /** Relative, in seconds; negative rewinds. */
  skip: (seconds: number) => void;
  next: () => void;
  previous: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  /** True when this story is the one loaded and it is advancing. */
  isPlaying: (story: Story) => boolean;
  /** 0–100, for the scrubber. */
  progress: number;
};

const AudioPlayerContext = createContext<AudioPlayerApi | null>(null);

/** May the current viewer play this story? Phase 4 swaps in the real check. */
export type CanPlay = (story: Story) => boolean;

const initial: PlayerState = {
  status: "idle",
  story: null,
  position: 0,
  duration: 0,
  volume: 1,
  muted: false,
  error: null,
};

export function AudioPlayerProvider({
  children,
  canPlay = (story) => story.free,
  /** Set false to leave keyboard shortcuts to the host page (Storybook). */
  keyboard = true,
}: {
  children: ReactNode;
  canPlay?: CanPlay;
  keyboard?: boolean;
}) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<PlayerState>(initial);
  const [queue, setQueue] = useState<readonly Story[]>([]);
  // The story the element is currently loaded with, readable from event handlers
  // without making every callback depend on the render's copy of state.
  const loaded = useRef<Story | null>(null);
  // Seconds to jump to once metadata arrives. Assigning `currentTime` before the
  // element knows the duration is silently dropped, which is what breaks
  // resume-where-you-stopped on a fresh page load.
  const pendingResume = useRef(0);
  const patch = useCallback((next: Partial<PlayerState>) => setState((s) => ({ ...s, ...next })), []);

  /* ---------------- element lifecycle ---------------- */

  useEffect(() => {
    const el = new Audio();
    el.preload = "metadata";
    ref.current = el;

    const onLoadedMetadata = () => {
      if (pendingResume.current > 0) {
        const target = pendingResume.current;
        pendingResume.current = 0;
        if (Number.isFinite(el.duration) && target < el.duration) el.currentTime = target;
      }
      patch({ duration: el.duration || 0, position: el.currentTime });
    };
    const onTimeUpdate = () => patch({ position: el.currentTime });
    const onPlaying = () => patch({ status: "playing", error: null });
    const onPause = () => {
      // `pause` also fires as part of ending; `ended` sets its own state.
      if (!el.ended)
        setState((s) => (s.status === "playing" || s.status === "buffering" ? { ...s, status: "paused" } : s));
    };
    const onWaiting = () => setState((s) => (s.status === "playing" ? { ...s, status: "buffering" } : s));
    const onError = () => patch({ status: "error", error: "This audio could not be loaded. Please try again." });
    const onEnded = () => {
      patch({ status: "paused", position: 0 });
      if (loaded.current) savePosition(loaded.current.slug, 0, el.duration || 0);
    };

    el.addEventListener("loadedmetadata", onLoadedMetadata);
    el.addEventListener("timeupdate", onTimeUpdate);
    el.addEventListener("playing", onPlaying);
    el.addEventListener("pause", onPause);
    el.addEventListener("waiting", onWaiting);
    el.addEventListener("error", onError);
    el.addEventListener("ended", onEnded);

    return () => {
      el.removeEventListener("loadedmetadata", onLoadedMetadata);
      el.removeEventListener("timeupdate", onTimeUpdate);
      el.removeEventListener("playing", onPlaying);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("waiting", onWaiting);
      el.removeEventListener("error", onError);
      el.removeEventListener("ended", onEnded);
      el.pause();
      el.src = "";
    };
  }, [patch]);

  /* ---------------- remember the position ---------------- */

  // Written on a timer rather than on every timeupdate: the element fires that
  // ~4×/second and a write per tick is wasted work. The timer alone is not
  // enough, though — closing the tab or reloading never runs React cleanup, so
  // `pagehide` (and `visibilitychange`, which is what iOS actually fires) writes
  // the last position too. Without those, a reload loses up to a full interval.
  useEffect(() => {
    if (state.status !== "playing" || !state.story) return;
    const story = state.story;
    const store = () => {
      const el = ref.current;
      if (el) savePosition(story.slug, el.currentTime, el.duration || 0);
    };
    const onHidden = () => {
      if (document.visibilityState === "hidden") store();
    };
    const id = window.setInterval(store, 5000);
    window.addEventListener("pagehide", store);
    document.addEventListener("visibilitychange", onHidden);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("pagehide", store);
      document.removeEventListener("visibilitychange", onHidden);
      store();
    };
  }, [state.status, state.story]);

  /* ---------------- controls ---------------- */

  const play = useCallback(
    (story: Story, nextQueue?: readonly Story[]) => {
      const el = ref.current;
      if (!el) return;
      if (nextQueue) setQueue(nextQueue);

      if (!canPlay(story)) {
        loaded.current = story;
        el.pause();
        setState({ ...initial, status: "locked", story, volume: el.volume, muted: el.muted });
        return;
      }

      // Same story already loaded: this is a resume, not a reload.
      if (loaded.current?.slug === story.slug && el.src) {
        void el.play().catch(() => patch({ status: "error", error: "Playback was blocked." }));
        return;
      }

      loaded.current = story;
      setState((s) => ({ ...s, status: "loading", story, position: 0, duration: 0, error: null }));

      void (async () => {
        try {
          const src = await getAudioSrc(story);
          // A newer play() may have landed while the source resolved.
          if (loaded.current?.slug !== story.slug) return;
          pendingResume.current = getSavedPosition(story.slug);
          el.src = src;
          await el.play();
        } catch {
          if (loaded.current?.slug === story.slug) {
            patch({ status: "error", error: "This audio could not be loaded. Please try again." });
          }
        }
      })();
    },
    [canPlay, patch],
  );

  const pause = useCallback(() => ref.current?.pause(), []);

  const resume = useCallback(() => {
    const el = ref.current;
    if (!el || !loaded.current) return;
    void el.play().catch(() => patch({ status: "error", error: "Playback was blocked." }));
  }, [patch]);

  const toggle = useCallback(() => {
    const el = ref.current;
    if (!el || !loaded.current) return;
    if (el.paused) resume();
    else el.pause();
  }, [resume]);

  const seek = useCallback((seconds: number) => {
    const el = ref.current;
    if (!el || !Number.isFinite(seconds)) return;
    const max = el.duration || 0;
    el.currentTime = Math.min(Math.max(seconds, 0), max || seconds);
    setState((s) => ({ ...s, position: el.currentTime }));
  }, []);

  const skip = useCallback(
    (seconds: number) => {
      const el = ref.current;
      if (el) seek(el.currentTime + seconds);
    },
    [seek],
  );

  const step = useCallback(
    (delta: 1 | -1) => {
      const current = loaded.current;
      if (!current || queue.length === 0) return;
      const i = queue.findIndex((s) => s.slug === current.slug);
      if (i === -1) return;
      const target = queue[i + delta];
      if (target) play(target);
    },
    [queue, play],
  );

  const next = useCallback(() => step(1), [step]);

  // Convention: past the first few seconds, "previous" restarts the track.
  const previous = useCallback(() => {
    const el = ref.current;
    if (el && el.currentTime > 3) seek(0);
    else step(-1);
  }, [seek, step]);

  const setVolume = useCallback((volume: number) => {
    const el = ref.current;
    if (!el) return;
    const v = Math.min(Math.max(volume, 0), 1);
    el.volume = v;
    el.muted = v === 0;
    setState((s) => ({ ...s, volume: v, muted: el.muted }));
  }, []);

  const toggleMute = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    setState((s) => ({ ...s, muted: el.muted }));
  }, []);

  /* ---------------- keyboard ---------------- */

  useEffect(() => {
    if (!keyboard) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      // Never steal a key from something the listener is typing into, and leave
      // Space alone on buttons and links where it is the activation key.
      if (target?.isContentEditable) return;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const onControl = tag === "BUTTON" || tag === "A";

      switch (e.key) {
        case " ":
          if (onControl) return;
          e.preventDefault();
          toggle();
          break;
        case "ArrowRight":
          e.preventDefault();
          skip(SKIP_SECONDS);
          break;
        case "ArrowLeft":
          e.preventDefault();
          skip(-SKIP_SECONDS);
          break;
        case "ArrowUp":
          e.preventDefault();
          setVolume((ref.current?.volume ?? 1) + 0.1);
          break;
        case "ArrowDown":
          e.preventDefault();
          setVolume((ref.current?.volume ?? 1) - 0.1);
          break;
        case "Home":
          e.preventDefault();
          seek(0);
          break;
        case "m":
        case "M":
          toggleMute();
          break;
        default:
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [keyboard, toggle, skip, seek, setVolume, toggleMute]);

  /* ---------------- api ---------------- */

  const value = useMemo<AudioPlayerApi>(() => {
    const progress = state.duration > 0 ? (state.position / state.duration) * 100 : 0;
    return {
      ...state,
      queue,
      play,
      toggle,
      pause,
      resume,
      seek,
      skip,
      next,
      previous,
      setVolume,
      toggleMute,
      isPlaying: (story) => state.status === "playing" && state.story?.slug === story.slug,
      progress,
    };
  }, [state, queue, play, toggle, pause, resume, seek, skip, next, previous, setVolume, toggleMute]);

  return <AudioPlayerContext.Provider value={value}>{children}</AudioPlayerContext.Provider>;
}

export function useAudioPlayer(): AudioPlayerApi {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) throw new Error("useAudioPlayer must be used inside <AudioPlayerProvider>");
  return ctx;
}

/** Returns null outside a provider, for components that are optional passengers. */
export function useAudioPlayerOptional(): AudioPlayerApi | null {
  return useContext(AudioPlayerContext);
}

export type { PlayerStatus };
