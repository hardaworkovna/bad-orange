import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useEffect } from "react";
import { AudioPlayerProvider, useAudioPlayer } from "@/lib/audio/AudioPlayerProvider";
import { PlayerDock } from "@/components/player/PlayerDock";
import { SAMPLE_STORIES, type Story as AudioStory } from "@/lib/content";
import type { PlayerStatus } from "@/lib/audio/types";

/**
 * The Figma play bar wired to the audio engine (`src/lib/audio`).
 *
 * Figma draws the bar in two states — playing and paused, each with a hovered
 * transport. The engine has five more: idle, loading, buffering, error and
 * locked. Those reuse the Disabled transport variant and the caption slot under
 * the scrubber, which normally reads "Heatmap: Reactions intensity"; they are
 * shown here so we can decide together whether they need their own art.
 */

/** Drives the provider into a state so the story can be looked at standing still. */
function Drive({ to, story = SAMPLE_STORIES[0] }: { to: PlayerStatus; story?: AudioStory }) {
  const player = useAudioPlayer();
  // Aliased: `.play(` on any object reads as a Storybook play function to eslint.
  const start = player.play;
  useEffect(() => {
    if (to === "idle") return;
    if (to === "locked") start({ ...story, free: false });
    else if (to === "error") start({ ...story, slug: "missing-file" });
    else start(story, SAMPLE_STORIES);
    if (to === "paused") window.setTimeout(() => player.pause(), 300);
    // Driving once on mount is the whole point; re-running would restart audio.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

const meta: Meta<typeof PlayerDock> = {
  title: "Components/Player bar",
  component: PlayerDock,
  parameters: { layout: "fullscreen" },
  args: { layout: "desktop" },
  render: (args, { parameters }) => (
    <AudioPlayerProvider keyboard={false} canPlay={(s) => s.free}>
      <Drive to={parameters.status as PlayerStatus} />
      <div className="flex min-h-[240px] items-end bg-black">
        <PlayerDock {...args} />
      </div>
    </AudioPlayerProvider>
  ),
};
export default meta;
type Story = StoryObj<typeof PlayerDock>;

/** Figma "Play bar" — the pause glyph, because audio is advancing. */
export const Playing: Story = { parameters: { status: "playing" } };

/** Figma "Play bar" — the play glyph. */
export const Paused: Story = { parameters: { status: "paused" } };

/** No Figma art: the transport takes its Disabled variant and the caption says why. */
export const Errored: Story = { parameters: { status: "error" } };

/** No Figma art: a gated story a free listener cannot open. */
export const Locked: Story = { parameters: { status: "locked" } };

/** Figma 390 play bar, playing. */
export const Mobile: Story = {
  args: { layout: "mobile" },
  parameters: { status: "playing" },
  globals: { viewport: { value: "mobile1", isRotated: false } },
};
