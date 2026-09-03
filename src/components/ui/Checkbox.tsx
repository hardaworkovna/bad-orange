"use client";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { IconCheckboxDefault, IconCheckboxChecked } from "@/icons/generated";

/**
 * Figma: Design system → Icons → "checkbox" (State=Default / Checked), 18×18.
 * Used in the filters popup with 16 Medium labels (e.g. "Most Recent").
 */
export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: ReactNode;
  forceChecked?: boolean;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, forceChecked, className, ...rest },
  ref,
) {
  return (
    <label
      data-state={forceChecked ? "checked" : undefined}
      className={cn(
        "group/cb inline-flex cursor-pointer items-center gap-[6px] has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-40",
        className,
      )}
    >
      <input ref={ref} type="checkbox" className="peer sr-only" {...rest} />
      <span className="peer-focus-visible:outline-white-60 relative inline-flex size-[18px] shrink-0 items-center justify-center rounded-[2px] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2">
        <IconCheckboxDefault className="group-has-[:checked]/cb:hidden group-data-[state=checked]/cb:hidden" />
        <IconCheckboxChecked className="hidden group-has-[:checked]/cb:block group-data-[state=checked]/cb:block" />
      </span>
      {label && <span className="font-sans text-[16px] leading-[1.2] font-medium text-white">{label}</span>}
    </label>
  );
});
