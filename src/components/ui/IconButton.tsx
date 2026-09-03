import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * 50×50 round icon buttons.
 * Figma: Design system → Buttons
 *  - "Arrow" (Default / Hover / Focus / Disabled)         → variant="glass"
 *  - "Frame 5" (menu) & "Search / Small size mobile"      → variant="glow"
 *  - "Icon/Close" (28px close icon)                       → variant="plain"
 */
export type IconButtonVariant = "glass" | "glow" | "plain";

const variants: Record<IconButtonVariant, string> = {
  glass: cn(
    "size-[50px] glass bg-white-10 border border-white-20",
    "hover:bg-white-20 data-[state=hover]:bg-white-20",
    "focus-visible:bg-white-20 data-[state=focus]:bg-white-20",
    "disabled:bg-white-10 disabled:[&_svg]:opacity-30 data-[state=disabled]:[&_svg]:opacity-30",
  ),
  glow: cn(
    "size-[50px] border border-white-30 shadow-red-ring",
    "hover:bg-white-10 data-[state=hover]:bg-white-10",
    "disabled:opacity-50 data-[state=disabled]:opacity-50",
  ),
  plain: cn("size-[28px]", "hover:opacity-80 data-[state=hover]:opacity-80", "disabled:opacity-40"),
};

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: IconButtonVariant;
  /** Accessible name — icon buttons have no visible text. */
  label: string;
  forceState?: "hover" | "focus" | "disabled";
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant = "glass", label, forceState, className, children, disabled, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      data-state={forceState ?? (disabled ? "disabled" : undefined)}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full text-white transition-colors outline-none disabled:cursor-not-allowed",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
});
