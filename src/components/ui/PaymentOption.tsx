"use client";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { IconCard, IconGpay } from "@/icons/generated";

/**
 * Figma: Design system → Buttons → "Field type of payment" (Card / Google Pay)
 * Types: Default / Hovered / Selected / Disabled. 197×60 pill radio.
 *  Default  stroke white 20%, label white 80%
 *  Hovered  stroke #FF6464 + red 10% gradient
 *  Selected stroke #FF6464 + red 10% gradient, label white
 *  Disabled bg white 10%, stroke #7D7D7D, label #7D7D7D
 */
export type PaymentOptionProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "children"> & {
  method: "card" | "google-pay";
  label?: ReactNode;
  forceState?: "hover" | "selected" | "disabled";
};

const icons = {
  card: <IconCard />,
  "google-pay": <IconGpay />,
};
const labels = { card: "Card", "google-pay": "Google Pay" };

export const PaymentOption = forwardRef<HTMLInputElement, PaymentOptionProps>(function PaymentOption(
  { method, label, forceState, className, disabled, ...rest },
  ref,
) {
  const state = forceState ?? (disabled ? "disabled" : undefined);
  return (
    <label
      data-state={state}
      className={cn(
        "group/pay border-white-20 relative inline-flex h-[60px] w-[197px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full border-2 transition-[border-color,background]",
        "hover:border-stroke hover:bg-gradient-red-10 data-[state=hover]:border-stroke data-[state=hover]:bg-gradient-red-10",
        "has-[:checked]:border-stroke has-[:checked]:bg-gradient-red-10 data-[state=selected]:border-stroke data-[state=selected]:bg-gradient-red-10",
        "has-[:focus-visible]:border-white-60",
        "has-[:disabled]:border-gray has-[:disabled]:bg-white-10 has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-none",
        "data-[state=disabled]:border-gray data-[state=disabled]:bg-white-10 data-[state=disabled]:cursor-not-allowed data-[state=disabled]:bg-none",
        className,
      )}
    >
      <input ref={ref} type="radio" disabled={disabled} className="sr-only" {...rest} />
      <span className="flex shrink-0 items-center [&_svg]:block">{icons[method]}</span>
      <span
        className={cn(
          "type-label-18-semi text-white-80",
          "group-has-[:checked]/pay:text-white group-data-[state=selected]/pay:text-white",
          "group-has-[:disabled]/pay:text-gray group-data-[state=disabled]/pay:text-gray",
        )}
      >
        {label ?? labels[method]}
      </span>
    </label>
  );
});
