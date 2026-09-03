import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Figma: Design system → Icons → "Component 3"
 *  - Desktop / Avatar / Header: 60px circle, white 10% bg, 2px #FF6464 stroke, emoji 26px
 *  - "Frame 425": 55px circle, 2px #FF6464 stroke, radial red tint, "18+" in gradient text
 */
export type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
  emoji?: string;
  /** Renders the "18+" age-gate variant. */
  ageGate?: boolean;
  size?: number;
};

export function Avatar({ emoji = "👄", ageGate, size, className, style, ...rest }: AvatarProps) {
  if (ageGate) {
    return (
      <span
        role="img"
        aria-label="18 plus"
        className={cn(
          "border-stroke inline-flex size-[55px] shrink-0 items-center justify-center rounded-full border-2",
          className,
        )}
        style={{
          width: size,
          height: size,
          backgroundImage: "radial-gradient(circle at 52% 101%, rgb(216 5 5 / 0.4) 0%, rgb(148 2 2 / 0) 100%)",
          ...style,
        }}
        {...rest}
      >
        <span className="bg-gradient-red-text font-display bg-clip-text text-[20px] leading-[1.1] text-transparent uppercase">
          18+
        </span>
      </span>
    );
  }
  return (
    <span
      className={cn(
        "border-stroke bg-white-10 inline-flex size-[60px] shrink-0 items-center justify-center rounded-full border-2 text-[26px] leading-none",
        className,
      )}
      style={{ width: size, height: size, ...style }}
      {...rest}
    >
      <span aria-hidden>{emoji}</span>
    </span>
  );
}
