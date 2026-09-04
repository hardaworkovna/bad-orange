import type { Story } from "@/lib/content";

/**
 * Where the audio for a story comes from.
 *
 * Today it is a file in `public/audio`. When hosting is decided (signed URLs from
 * a CDN, most likely) only this module changes: swap the resolver with
 * `setAudioSource`, and every player in the app follows.
 */
export type AudioSource = (story: Story) => string | Promise<string>;

const localFiles: AudioSource = (story) => `/audio/${story.slug}.mp3`;

let resolve: AudioSource = localFiles;

/** Replace the resolver (call once, at app start, when real hosting exists). */
export function setAudioSource(source: AudioSource) {
  resolve = source;
}

/** The URL to feed the `<audio>` element for this story. */
export async function getAudioSrc(story: Story): Promise<string> {
  return resolve(story);
}
