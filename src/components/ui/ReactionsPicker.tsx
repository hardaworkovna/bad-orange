"use client";
import { cn } from "@/lib/cn";
import { Popup } from "./Popup";

/**
 * Figma: Design system → Badges & Tags → "Pop-up/Reactions" (394 wide) and
 * "Icon Change emoji" (State=Default / Active).
 * 60px glass circles (white 2% fill, 2px white 20% stroke), 30px emoji, 12px gap,
 * two rows of five. Selected circle uses the #FF6464 stroke with a red tint.
 */
export const DEFAULT_EMOJIS = ["👄", "🌺", "🫦", "😈", "💋", "🐇", "🍆", "🦋", "🎩", "🐆"] as const;

export type ReactionsPickerProps = {
  emojis?: readonly string[];
  value?: string;
  onChange?: (emoji: string) => void;
  className?: string;
  label?: string;
};

export function ReactionsPicker({
  emojis = DEFAULT_EMOJIS,
  value,
  onChange,
  className,
  label = "Choose an emoji",
}: ReactionsPickerProps) {
  return (
    <Popup
      variant="glass"
      role="radiogroup"
      aria-label={label}
      className={cn("inline-flex w-[394px] max-w-full", className)}
    >
      <div className="grid grid-cols-5 gap-x-3 gap-y-2">
        {emojis.map((e) => (
          <EmojiCircle key={e} emoji={e} selected={e === value} onClick={() => onChange?.(e)} />
        ))}
      </div>
    </Popup>
  );
}

export function EmojiCircle({
  emoji,
  selected,
  onClick,
  className,
}: {
  emoji: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={emoji}
      onClick={onClick}
      className={cn(
        "glass border-white-20 bg-white-02 inline-flex size-[60px] items-center justify-center overflow-hidden rounded-full border-2 text-[30px] leading-none transition-[border-color,background] outline-none",
        "hover:bg-white-10 focus-visible:border-white-60",
        selected && "border-stroke bg-gradient-red-10",
        className,
      )}
    >
      <span aria-hidden>{emoji}</span>
    </button>
  );
}
