"use client";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { IconHeart } from "@/icons/generated";

/**
 * Figma: Design system → Filters details & Comments → "Comment"
 *   Size=Comment desktop with thread (322:1744) — 1240 wide; a reply is the same
 *     row indented 76px with a 40px avatar and an "@handle:" prefix
 *   Size=Comment mobile (322:1993) — 350×97
 * Name is Special Gothic 16 uppercase; the timestamp chip is red 15% with a 2px
 * white 10% stroke and #F50C22 label — it links back to that point in the audio.
 */
export type CommentProps = {
  author: string;
  /** Playhead the comment was left at — renders as the red chip. */
  at?: string;
  /** Relative time, e.g. "2d". */
  ago: string;
  body: ReactNode;
  /** For a reply: the handle it answers. */
  replyingTo?: string;
  emoji?: string;
  likes?: number;
  liked?: boolean;
  layout?: "desktop" | "mobile";
  /** Rendered indented under the parent. */
  children?: ReactNode;
  onReply?: () => void;
  onLike?: () => void;
  className?: string;
};

export function Comment({
  author,
  at,
  ago,
  body,
  replyingTo,
  emoji = "🌺",
  likes = 0,
  liked,
  layout = "desktop",
  children,
  onReply,
  onLike,
  className,
}: CommentProps) {
  const mobile = layout === "mobile";
  const avatarSize = children === undefined && replyingTo ? 40 : mobile ? 44 : 60;

  return (
    <div className={cn("flex w-full flex-col gap-6", className)}>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-start justify-center gap-4">
          <span
            className="glass border-white-20 bg-white-02 inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 leading-none"
            style={{ width: avatarSize, height: avatarSize, fontSize: avatarSize <= 40 ? 20 : 30 }}
            aria-hidden
          >
            {emoji}
          </span>
          <div className="flex min-w-0 flex-col gap-4">
            <div className="flex flex-col gap-[6px]">
              <div className="flex flex-wrap items-center gap-[6px]">
                <span className="font-display text-[16px] leading-[1.1] tracking-[0.16px] text-white uppercase">
                  {author}
                </span>
                {at && (
                  <>
                    <span className="text-white-60 font-sans text-[14px] font-semibold">at</span>
                    <span className="border-white-10 text-red inline-flex items-center justify-center rounded-full border-2 bg-[rgb(245_12_34_/_0.15)] p-[6px] font-sans text-[14px] leading-[1.2] font-semibold tabular-nums">
                      {at}
                    </span>
                  </>
                )}
                <span aria-hidden className="bg-white-60 inline-block size-1 rounded-full" />
                <span className="text-white-60 font-sans text-[14px] font-semibold">{ago}</span>
              </div>
              <p
                className={cn(
                  "text-white-80 font-sans leading-[1.2] font-medium",
                  mobile ? "text-[16px]" : "text-[18px]",
                )}
              >
                {replyingTo && <span className="mr-[6px] text-white">@{replyingTo}:</span>}
                {body}
              </p>
            </div>
            <button
              type="button"
              onClick={onReply}
              className="self-start font-sans text-[14px] leading-[1.2] font-semibold text-white outline-none hover:underline focus-visible:underline"
            >
              Reply
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={onLike}
          aria-pressed={liked}
          aria-label={`Like (${likes})`}
          className="flex shrink-0 flex-col items-center justify-center gap-[2px] outline-none hover:opacity-80 focus-visible:opacity-80"
        >
          <IconHeart />
          <span className="font-sans text-[14px] leading-[1.2] font-normal text-white tabular-nums">{likes}</span>
        </button>
      </div>
      {children && <div className="flex flex-col gap-6 pl-[76px]">{children}</div>}
    </div>
  );
}
