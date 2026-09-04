"use client";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { IconPlay, IconPause } from "@/icons/generated";

/**
 * Figma: Design system → UI elements/Player → "Button Pause"
 * 60×60 round transport button, five variants:
 *   Pause default / Play default  → 2px white 20% stroke, transparent fill
 *   Pause hovered / Play hovered  → #F50C22 fill, 1px white 30% stroke, 10px red glow
 *   Disabled                      → 2px white 20% stroke, glyph at 40%
 * Hover is a real CSS state; `forceState` is for Storybook and the reference page.
 */
export type PlayButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  /** What the button will do when pressed. */
  action?: "play" | "pause";
  /** Storybook only. */
  forceState?: "hover";
  size?: number;
};

export function PlayButton({ action = "play", forceState, size = 60, className, disabled, ...rest }: PlayButtonProps) {
  return (
    <button
      type="button"
      aria-label={action === "play" ? "Play" : "Pause"}
      disabled={disabled}
      data-state={forceState}
      style={{ width: size, height: size }}
      className={cn(
        "border-white-20 inline-flex shrink-0 items-center justify-center gap-[6px] rounded-full border-2 text-white transition-[background,box-shadow,border-color] outline-none",
        "hover:border-white-30 hover:bg-red hover:border hover:shadow-[0_0_10px_rgba(244,2,1,0.6)]",
        "data-[state=hover]:border-white-30 data-[state=hover]:bg-red data-[state=hover]:border data-[state=hover]:shadow-[0_0_10px_rgba(244,2,1,0.6)]",
        "focus-visible:border-white-60",
        "disabled:border-white-20 disabled:cursor-not-allowed disabled:bg-transparent disabled:shadow-none disabled:[&_svg]:opacity-40",
        className,
      )}
      {...rest}
    >
      {action === "play" ? <IconPlay /> : <IconPause />}
    </button>
  );
}
