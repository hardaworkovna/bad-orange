import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Figma: Design system → Buttons → "Button see all"
 * Types: Desk big default / hovered / Disabled, Mob default / hovered / disabled.
 * Underlined Host Grotesk SemiBold text link. Size follows viewport by default
 * (16px on mobile, 22px from `md`); force with `size`.
 */
export type TextLinkProps = {
  size?: "auto" | "desktop" | "mobile";
  forceState?: "hover" | "disabled";
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
} & (
  | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className">)
  | ({ href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">)
);

export function TextLink({ size = "auto", forceState, disabled, className, children, ...rest }: TextLinkProps) {
  const state = forceState ?? (disabled ? "disabled" : undefined);
  const classes = cn(
    "inline-flex items-center font-sans font-semibold underline decoration-solid underline-offset-[3px] decoration-[1.2px] text-white-90 transition-colors outline-none focus-visible:text-white",
    size === "auto" && "text-[16px] leading-[1.2] tracking-[0.16px] md:text-[22px] md:tracking-[0.22px]",
    size === "desktop" && "text-[22px] leading-[1.2] tracking-[0.22px]",
    size === "mobile" && "text-[16px] leading-[1.2] tracking-[0.16px]",
    "hover:text-white data-[state=hover]:text-white",
    "disabled:text-gray disabled:cursor-not-allowed data-[state=disabled]:text-gray data-[state=disabled]:pointer-events-none",
    className,
  );
  if (rest.href !== undefined) {
    const { href, ...a } = rest as { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} data-state={state} aria-disabled={state === "disabled" || undefined} className={classes} {...a}>
        {children}
      </a>
    );
  }
  const b = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" data-state={state} disabled={disabled} className={classes} {...b}>
      {children}
    </button>
  );
}
