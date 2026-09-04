import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PlayButton } from "@/components/player/PlayButton";
import { PlayerBar } from "@/components/player/PlayerBar";
import { ProgressBar } from "@/components/player/ProgressBar";
import { AudioCard, MiniCard } from "@/components/player/AudioCard";
import { ItemPlay, PopularRow } from "@/components/player/ItemPlay";

const meta: Meta = { title: "Components/Player", parameters: { layout: "padded" } };
export default meta;

/** Figma: UI elements/Player → "Button Pause" — 5 variants */
export const TransportButton: StoryObj = {
  render: () => (
    <div className="flex items-center gap-6">
      {[
        { label: "Pause default", props: { action: "pause" as const } },
        { label: "Pause hovered", props: { action: "pause" as const, forceState: "hover" as const } },
        { label: "Play default", props: { action: "play" as const } },
        { label: "Play hovered", props: { action: "play" as const, forceState: "hover" as const } },
        { label: "Disabled", props: { action: "play" as const, disabled: true } },
      ].map((v) => (
        <div key={v.label} className="flex flex-col items-center gap-2">
          <PlayButton {...v.props} />
          <span className="type-xs text-white-60">{v.label}</span>
        </div>
      ))}
    </div>
  ),
};

/** Figma: the 8px scrubber with the reaction heatmap */
export const Scrubber: StoryObj = {
  render: () => (
    <div className="w-[1000px] max-w-full">
      <ProgressBar caption="Heatmap: Reactions intensity" />
    </div>
  ),
};

/** Figma: "Play bar" 1440 — Default / Variant2 / Variant3 / Variant4 */
export const BarDesktop: StoryObj = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="flex flex-col gap-5 overflow-x-auto">
      <PlayerBar playing />
      <PlayerBar />
      <PlayerBar forceButtonState="hover" />
      <PlayerBar playing forceButtonState="hover" />
    </div>
  ),
};

/** Figma: "Play bar" 390 */
export const BarMobile: StoryObj = {
  render: () => <PlayerBar layout="mobile" />,
};

/** Figma: "Card Main Desktop" — Card=Main Desktop / Main Mobile, and Card/Secondary */
export const Cards: StoryObj = {
  render: () => (
    <div className="flex flex-wrap items-start gap-8">
      <AudioCard
        title="Phone sex"
        description="Then owning and stretching your pretty slut pussy"
        duration="2:15"
        plays="1, 800 Plays"
      />
      <AudioCard
        layout="mobile"
        title="Phone sex"
        description="Then owning and stretching your pretty slut pussy"
        duration="2:15"
        plays="1, 800 Plays"
      />
      <MiniCard title="Dark romance" />
    </div>
  ),
};

/** Figma: "Item play" — Desktop 606×120 / Mobile 350×156 */
export const Items: StoryObj = {
  render: () => (
    <div className="flex flex-wrap items-start gap-8">
      <ItemPlay title="So sexy when she cumes for us" plays="321,123 Plays" />
      <ItemPlay layout="mobile" title="Leaking just for you" plays="321,123 Plays" />
    </div>
  ),
};

/** Figma: "Container popular audio" — Popular=Desktop 395×96 / Mobile 320×72 */
export const Popular: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6">
      <PopularRow title="So sexy when she cumes for us" plays="321,123 Plays" />
      <PopularRow layout="mobile" title="So sexy when she cumes for us" plays="321,123 Plays" />
    </div>
  ),
};
