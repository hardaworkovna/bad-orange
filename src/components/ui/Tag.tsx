"use client";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { IconLockedTag, IconBestValue, IconLock, IconPremium } from "@/icons/generated";

/* ------------------------------------------------------------------ */
/* Reaction tags — Figma "Reaction/Tags/Selected" & "Reaction/Tags/Default"  */
/* ------------------------------------------------------------------ */
export type Reaction = "feral" | "melted" | "begging" | "ruined";

export const REACTIONS: Record<Reaction, { emoji: string; label: string }> = {
  feral: { emoji: "🔥", label: "Feral" },
  melted: { emoji: "🫠", label: "Melted" },
  begging: { emoji: "🥺", label: "Begging" },
  ruined: { emoji: "🫠", label: "Ruined" },
};

const reactionBg: Record<Reaction, string> = {
  feral: "bg-reaction-feral",
  melted: "bg-reaction-melted",
  begging: "bg-reaction-begging",
  ruined: "bg-reaction-ruined",
};

export type ReactionTagProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  reaction: Reaction;
  selected?: boolean;
};

/** Selected: solid brand colour. Default: red 10% gradient. Both 2px white 20% stroke, 18px padding. */
export function ReactionTag({ reaction, selected, className, ...rest }: ReactionTagProps) {
  const r = REACTIONS[reaction];
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "border-white-20 type-label-18-semi inline-flex items-center justify-center rounded-full border-2 p-[18px] text-white opacity-90 transition-[background,opacity] outline-none",
        "focus-visible:border-white-60 hover:opacity-100",
        selected ? reactionBg[reaction] : "bg-gradient-red-10",
        className,
      )}
      {...rest}
    >
      <span aria-hidden className="mr-1">
        {r.emoji}
      </span>
      {r.label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Category tag chip — Figma "Reaction/Tags/Selected" 323:3592 ("Dark Romance") */
/* ------------------------------------------------------------------ */
export function CategoryChip({ className, children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "border-stroke bg-gradient-red-10 type-label-18-semi text-white-90 focus-visible:border-white-60 inline-flex h-[50px] items-center justify-center rounded-full border-2 px-[18px] transition-colors outline-none hover:text-white",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Access badges — Figma "Type of user" (Tag=Free / Locked) and "icon" (lock / premium) */
/* ------------------------------------------------------------------ */
export function FreeTag({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "border-stroke inline-flex h-8 w-[55px] items-center justify-center rounded-full border-2 font-sans text-[16px] leading-[1.2] font-medium text-white opacity-90",
        className,
      )}
      {...rest}
    >
      Free
    </span>
  );
}

export function LockedTag({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span role="img" aria-label="Members only" className={cn("inline-flex size-6", className)} {...rest}>
      <IconLockedTag />
    </span>
  );
}

/** 48×48 rounded-10 tile with 2px white 15% stroke holding the lock / premium glyph. */
export function AccessTile({
  kind,
  className,
  ...rest
}: HTMLAttributes<HTMLSpanElement> & { kind: "lock" | "premium" }) {
  return (
    <span
      role="img"
      aria-label={kind === "lock" ? "Locked" : "Premium"}
      className={cn("border-white-15 inline-flex size-12 items-center justify-center rounded-sm border-2", className)}
      {...rest}
    >
      {kind === "lock" ? <IconLock /> : <IconPremium />}
    </span>
  );
}

/** Figma "Icon/Best value" 16×16 (Plans page cards). */
export function BestValueIcon({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span role="img" aria-label="Best value" className={cn("inline-flex size-4", className)} {...rest}>
      <IconBestValue />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Generic pill (glass) for future "Badge" needs — matches tertiary look  */
/* ------------------------------------------------------------------ */
export function Pill({ className, children, ...rest }: HTMLAttributes<HTMLSpanElement> & { children: ReactNode }) {
  return (
    <span
      className={cn(
        "border-white-20 type-label-18-semi text-white-90 inline-flex items-center justify-center rounded-full border-2 px-[18px] py-[14px]",
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
