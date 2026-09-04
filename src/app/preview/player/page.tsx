import type { Metadata } from "next";
import { PlayerHarness } from "./PlayerHarness";

export const metadata: Metadata = { title: "Player — Daddy Sounds" };

/**
 * A bench for the Phase 3 audio engine: real playback against the sample files
 * in `public/audio`, with every state the machine can be in visible while it
 * runs. Goes away when the real Audio Library page lands.
 */
export default function Page() {
  return <PlayerHarness />;
}
