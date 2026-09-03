"use client";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { IconInfoDefault, IconInfoHovered, IconInfoActive } from "@/icons/generated";

/**
 * Figma: Design system → Icons → "icon" (State=Default/Hovered/Active) + "icon/Tooltip"
 * Info glyph with a 190×55 speech bubble (white 10% fill, 11px italic white 60% text,
 * pointer on the left edge).
 */
export function InfoIcon({
  state = "default",
  className,
}: {
  state?: "default" | "hovered" | "active";
  className?: string;
}) {
  const Icon = state === "active" ? IconInfoActive : state === "hovered" ? IconInfoHovered : IconInfoDefault;
  return <Icon className={className} />;
}

export function TooltipBubble({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      role="tooltip"
      className={cn(
        "bg-white-10 text-tooltip text-white-60 relative block w-[190px] rounded-sm px-[15px] py-[11px] font-sans italic",
        "before:border-r-white-10 before:absolute before:top-1/2 before:right-full before:-translate-y-1/2 before:border-y-[7px] before:border-r-[8px] before:border-y-transparent",
        className,
      )}
    >
      {children}
    </span>
  );
}

export type TooltipProps = {
  content: ReactNode;
  label?: string;
  className?: string;
  /** Storybook only. */
  forceOpen?: boolean;
};

export function Tooltip({ content, label = "More information", className, forceOpen }: TooltipProps) {
  const id = useId();
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const open = forceOpen ?? (hover || active);
  return (
    <span className={cn("relative inline-flex items-center", className)}>
      <button
        type="button"
        aria-label={label}
        aria-describedby={open ? id : undefined}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        onClick={() => setActive((a) => !a)}
        className="focus-visible:ring-white-60 inline-flex size-6 items-center justify-center rounded-full outline-none focus-visible:ring-2"
      >
        <InfoIcon state={active ? "active" : hover ? "hovered" : "default"} />
      </button>
      {open && (
        <span id={id} className="absolute top-1/2 left-[calc(100%+10px)] z-10 -translate-y-1/2">
          <TooltipBubble>{content}</TooltipBubble>
        </span>
      )}
    </span>
  );
}
