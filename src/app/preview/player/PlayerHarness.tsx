"use client";

import { AudioPlayerProvider, useAudioPlayer, SKIP_SECONDS } from "@/lib/audio/AudioPlayerProvider";
import { formatTime } from "@/lib/audio/types";
import { PlayerDock } from "@/components/player/PlayerDock";
import { PlayButton } from "@/components/player/PlayButton";
import { LockedTag, FreeTag } from "@/components/ui/Tag";
import { SAMPLE_STORIES } from "@/lib/content";
import { clearPosition } from "@/lib/audio/positions";

function Bench() {
  const player = useAudioPlayer();

  return (
    <div className="min-h-screen bg-black pb-[220px]">
      <div className="mx-auto flex max-w-[1220px] flex-col gap-10 px-5 pt-16 md:px-0">
        <header className="flex flex-col gap-3">
          <h1 className="type-h2 text-white-90 m-0 uppercase">Player bench</h1>
          <p className="type-body-lg text-white-60 m-0">
            Sample tones, not real stories. Press play, reload the page mid-track — it resumes where you stopped. Space
            plays and pauses, ← and → jump {SKIP_SECONDS} seconds, ↑ and ↓ change volume, Home restarts, M mutes.
          </p>
        </header>

        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {SAMPLE_STORIES.map((story) => {
            const current = player.story?.slug === story.slug;
            return (
              <li key={story.slug} className="border-white-15 flex items-center gap-5 rounded-lg border px-5 py-4">
                <PlayButton
                  size={44}
                  action={player.isPlaying(story) ? "pause" : "play"}
                  onClick={() => (current ? player.toggle() : player.play(story, SAMPLE_STORIES))}
                />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="type-label-18 text-white">{story.title}</span>
                  <span className="type-body-md text-white-60">
                    {story.categorySlug}
                    {current && ` · ${player.status}`}
                  </span>
                </div>
                {story.free ? <FreeTag /> : <LockedTag />}
              </li>
            );
          })}
        </ul>

        <section className="border-white-15 flex flex-col gap-3 rounded-lg border p-5">
          <h2 className="type-label-18-semi m-0 text-white">State</h2>
          <dl className="type-body-md text-white-60 m-0 grid grid-cols-2 gap-x-8 gap-y-2 md:grid-cols-4">
            {[
              ["status", player.status],
              ["story", player.story?.slug ?? "—"],
              ["position", formatTime(player.position)],
              ["duration", formatTime(player.duration)],
              ["progress", `${player.progress.toFixed(1)}%`],
              ["volume", player.volume.toFixed(2)],
              ["muted", String(player.muted)],
              ["error", player.error ?? "—"],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col">
                <dt className="text-white-30">{k}</dt>
                <dd className="m-0 text-white tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => SAMPLE_STORIES.forEach((s) => clearPosition(s.slug))}
              className="border-white-20 type-body-md text-white-80 hover:bg-white-10 rounded-full border px-4 py-2 outline-none"
            >
              Forget saved positions
            </button>
            <button
              type="button"
              onClick={() =>
                player.play({ ...SAMPLE_STORIES[0], slug: "does-not-exist", title: "Missing file" }, SAMPLE_STORIES)
              }
              className="border-white-20 type-body-md text-white-80 hover:bg-white-10 rounded-full border px-4 py-2 outline-none"
            >
              Trigger the error state
            </button>
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 flex justify-center">
        <PlayerDock layout="desktop" className="hidden md:block" />
        <PlayerDock layout="mobile" className="w-full md:hidden" />
      </div>
    </div>
  );
}

export function PlayerHarness() {
  return (
    <AudioPlayerProvider>
      <Bench />
    </AudioPlayerProvider>
  );
}
