import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Figma: Design system → Buttons
 *  - "Button/ Primary / White"  → variant="primary-white"
 *  - "Button / Primary / Red"   → variant="primary-red"
 *  - "Button/ Secondary"        → variant="secondary"
 *  - "Button Third"             → variant="tertiary"
 *  - "Button/Secondary/Mobile"  → variant="tertiary" size="sm"
 * States: Default / Hover / Active / Disabled (Figma) map to CSS states.
 * `forceState` exists only so Storybook can render every Figma state.
 */
export type ButtonVariant = "primary-white" | "primary-red" | "secondary" | "tertiary";
export type ButtonSize = "md" | "sm";
export type ForcedState = "hover" | "active" | "disabled";

const base =
  "inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap rounded-full transition-[background,box-shadow,border-color,color] duration-150 outline-none focus-visible:ring-2 focus-visible:ring-white-60 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed";

const sizes: Record<ButtonSize, string> = {
  md: "h-[60px] px-6 type-label-18",
  sm: "h-[50px] px-6 type-label-16-semi",
};

const variants: Record<ButtonVariant, string> = {
  "primary-white": cn(
    "bg-white text-black",
    "disabled:bg-gray disabled:text-white-80 data-[state=disabled]:bg-gray data-[state=disabled]:text-white-80",
  ),
  "primary-red": cn(
    "bg-gradient-red border-2 border-stroke text-white-90",
    "hover:bg-red hover:bg-none hover:shadow-red-glow data-[state=hover]:bg-red data-[state=hover]:bg-none data-[state=hover]:shadow-red-glow",
    "active:bg-gradient-red-active active:shadow-none data-[state=active]:bg-gradient-red-active data-[state=active]:shadow-none",
    "disabled:bg-gray disabled:bg-none disabled:border-transparent disabled:shadow-none disabled:text-white-80",
    "data-[state=disabled]:bg-gray data-[state=disabled]:bg-none data-[state=disabled]:border-transparent data-[state=disabled]:shadow-none data-[state=disabled]:text-white-80",
  ),
  secondary: cn(
    "glass bg-gradient-red-10 border-2 border-stroke text-white-90",
    "hover:bg-gradient-red hover:shadow-red-glow data-[state=hover]:bg-gradient-red data-[state=hover]:shadow-red-glow",
    "active:bg-gradient-red-active active:shadow-none data-[state=active]:bg-gradient-red-active data-[state=active]:shadow-none",
    "disabled:bg-white-10 disabled:bg-none disabled:border-gray disabled:shadow-none disabled:text-white-60",
    "data-[state=disabled]:bg-white-10 data-[state=disabled]:bg-none data-[state=disabled]:border-gray data-[state=disabled]:shadow-none data-[state=disabled]:text-white-60",
  ),
  tertiary: cn(
    "glass border-2 border-white-20 text-white-90",
    "hover:bg-white-10 data-[state=hover]:bg-white-10",
    "active:bg-white-10 data-[state=active]:bg-white-10",
    "disabled:bg-transparent disabled:border-gray disabled:text-white-80",
    "data-[state=disabled]:bg-transparent data-[state=disabled]:border-gray data-[state=disabled]:text-white-80",
  ),
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Storybook only: render a Figma state without user interaction. */
  forceState?: ForcedState;
  className?: string;
};

export type ButtonProps = CommonProps &
  (
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
  );

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(function Button(
  { variant = "primary-white", size = "md", fullWidth, forceState, className, ...rest },
  ref,
) {
  const classes = cn(base, sizes[size], variants[variant], fullWidth && "w-full", className);
  const state = forceState ?? ("disabled" in rest && rest.disabled ? "disabled" : undefined);

  if (rest.href !== undefined) {
    const { href, ...anchor } = rest as { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        data-state={state}
        aria-disabled={state === "disabled" || undefined}
        className={classes}
        {...anchor}
      />
    );
  }
  const button = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={button.type ?? "button"}
      data-state={state}
      className={classes}
      {...button}
    />
  );
});
