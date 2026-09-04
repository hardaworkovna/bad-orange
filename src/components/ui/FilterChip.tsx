"use client";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { IconArrowDownSmall, IconClose, IconFilterChevronDark, IconFilterChevronLight } from "@/icons/generated";

/**
 * Figma: Design system → "Filters" (desktop) / "Mobile/Filter" / "Filter/Selected"
 *
 * <FilterButton>   white pill "Filters ▾" — Filter=Default/Opened, Type=Filter selected /
 *                  Filter selected opened / Disabled (count badge in label, chevron flips)
 * <SortButton>     mobile full-width outlined pill "Sort by: Newest ▾" (351×50)
 * <ActiveFilter>   "Most Recent ✕" — white 10% bg, white 20% stroke, removable
 */
export type FilterButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  open?: boolean;
  count?: number;
  forceState?: "disabled";
};

export function FilterButton({
  open,
  count,
  forceState,
  disabled,
  className,
  children = "Filters",
  ...rest
}: FilterButtonProps) {
  const state = forceState ?? (disabled ? "disabled" : undefined);
  return (
    <button
      type="button"
      aria-expanded={open}
      disabled={disabled}
      data-state={state}
      className={cn(
        "type-label-18 inline-flex h-[50px] items-center justify-center gap-[6px] overflow-hidden rounded-full bg-white px-5 text-black transition-colors outline-none",
        "hover:bg-white-90 focus-visible:ring-white-60 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        "disabled:bg-gray disabled:text-white-80 data-[state=disabled]:bg-gray data-[state=disabled]:text-white-80 disabled:cursor-not-allowed",
        className,
      )}
      {...rest}
    >
      <span>
        {children}
        {count ? ` (${count})` : ""}
      </span>
      {/* Figma exports two chevrons for this pill: #121212 on the white fill,
          white 80% on the grey disabled fill. */}
      {state === "disabled" ? (
        <IconFilterChevronLight className={cn("shrink-0 transition-transform", open && "-scale-y-100")} />
      ) : (
        <IconFilterChevronDark className={cn("shrink-0 transition-transform", open && "-scale-y-100")} />
      )}
    </button>
  );
}

export type SortButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { open?: boolean };

export function SortButton({ open, className, children = "Sort by: Newest", ...rest }: SortButtonProps) {
  return (
    <button
      type="button"
      aria-expanded={open}
      className={cn(
        "border-white-20 type-label-18 inline-flex h-[50px] w-[351px] max-w-full items-center justify-center gap-[6px] overflow-hidden rounded-full border px-5 text-white transition-colors outline-none",
        "hover:bg-white-10 focus-visible:border-white-60",
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      <IconArrowDownSmall size={20} className={cn("shrink-0 transition-transform", open && "-scale-y-100")} />
    </button>
  );
}

export type ActiveFilterProps = {
  children: ReactNode;
  onRemove?: () => void;
  className?: string;
};

export function ActiveFilter({ children, onRemove, className }: ActiveFilterProps) {
  return (
    <span
      className={cn(
        "border-white-20 bg-white-10 type-label-18 text-white-80 inline-flex h-[50px] items-center gap-[6px] overflow-hidden rounded-full border px-5",
        className,
      )}
    >
      {children}
      <button
        type="button"
        aria-label="Remove filter"
        onClick={onRemove}
        className="focus-visible:ring-white-60 -mr-1 inline-flex size-6 items-center justify-center rounded-full outline-none hover:opacity-80 focus-visible:ring-2"
      >
        <IconClose />
      </button>
    </span>
  );
}
