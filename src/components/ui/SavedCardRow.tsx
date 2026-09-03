"use client";
import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { IconVisa, IconCardDots, IconRadioDefault, IconRadioSelected } from "@/icons/generated";

/**
 * Figma: Design system → Buttons → "Field for card" (Default / Variant2=selected)
 * 632×61 pill: card brand · masked number · last 4 · radio on the right.
 */
export type SavedCardRowProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  brand?: "visa";
  last4: string;
  forceState?: "selected";
};

export const SavedCardRow = forwardRef<HTMLInputElement, SavedCardRowProps>(function SavedCardRow(
  { brand = "visa", last4, forceState, className, ...rest },
  ref,
) {
  return (
    <label
      data-state={forceState}
      className={cn(
        "group/card border-white-20 relative flex h-[61px] w-[632px] max-w-full cursor-pointer items-center rounded-full border-2 pr-[26px] pl-[22px] transition-[border-color,background]",
        "hover:border-white-60",
        "has-[:checked]:border-stroke has-[:checked]:bg-gradient-red-10 data-[state=selected]:border-stroke data-[state=selected]:bg-gradient-red-10",
        "has-[:focus-visible]:border-white-60",
        className,
      )}
    >
      <input ref={ref} type="radio" className="sr-only" {...rest} />
      <span className="flex items-center gap-4">
        {brand === "visa" && <IconVisa aria-label="Visa" />}
        <span className="flex items-center gap-3">
          <IconCardDots />
          <IconCardDots />
          <IconCardDots />
          <span className="type-label-18 text-white-80">{last4}</span>
        </span>
      </span>
      <span className="ml-auto flex items-center">
        <IconRadioDefault className="group-has-[:checked]/card:hidden group-data-[state=selected]/card:hidden" />
        <IconRadioSelected className="hidden group-has-[:checked]/card:block group-data-[state=selected]/card:block" />
      </span>
    </label>
  );
});
