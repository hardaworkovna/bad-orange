"use client";
import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { IconAlert } from "@/icons/generated";

/**
 * Figma: Design system → Buttons → "Field"
 * Types: Default / Hovered / Typing / Disabled / Filled / Failed.
 * Label (18 Medium, white 60%) + 61px pill input, 2px stroke.
 *  Default  stroke white 20%, placeholder white 20%
 *  Hovered  stroke white 60%
 *  Typing   stroke #FF6464 + red 10% gradient fill, text white 90%
 *  Filled   stroke #FF6464 + red 10% gradient fill, text white 90%
 *  Disabled stroke white 10%, label white 20%
 *  Failed   stroke #F50C22 + gradient, 14px SemiBold message + alert icon
 */
export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label: ReactNode;
  error?: ReactNode;
  /** Storybook only. */
  forceState?: "hover" | "typing" | "filled" | "disabled";
  /** Trailing element inside the pill (e.g. password eye). */
  trailing?: ReactNode;
  containerClassName?: string;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, error, forceState, trailing, className, containerClassName, disabled, id: idProp, ...rest },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const errorId = `${id}-error`;
  const state = forceState ?? (disabled ? "disabled" : undefined);
  const invalid = Boolean(error);

  return (
    <div data-state={state} className={cn("group/field flex w-full flex-col items-start gap-4", containerClassName)}>
      <label htmlFor={id} className="type-label-18 text-white-60 group-data-[state=disabled]/field:text-white-20">
        {label}
      </label>
      <div className="flex w-full flex-col items-start gap-2">
        <div
          className={cn(
            "flex h-[61px] w-full items-center gap-3 rounded-full border-2 px-6 transition-[border-color,background]",
            // default
            "border-white-20",
            // hover
            "group-hover/field:border-white-60 group-data-[state=hover]/field:border-white-60",
            // typing (focus) & filled
            "has-[:focus-visible]:border-stroke has-[:focus-visible]:bg-gradient-red-10",
            "group-data-[state=typing]/field:border-stroke group-data-[state=typing]/field:bg-gradient-red-10",
            "group-data-[state=filled]/field:border-stroke group-data-[state=filled]/field:bg-gradient-red-10",
            "has-[:not(:placeholder-shown)]:border-stroke has-[:not(:placeholder-shown)]:bg-gradient-red-10",
            // disabled
            "group-data-[state=disabled]/field:border-white-10 group-hover/field:group-data-[state=disabled]/field:border-white-10 group-data-[state=disabled]/field:bg-none",
            // failed
            invalid && "border-red bg-gradient-red-10 group-hover/field:border-red",
          )}
        >
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            aria-describedby={invalid ? errorId : undefined}
            className={cn(
              "type-label-18 text-white-90 min-w-0 flex-1 bg-transparent outline-none",
              "placeholder:text-white-20 disabled:cursor-not-allowed",
              className,
            )}
            {...rest}
          />
          {trailing}
        </div>
        {invalid && (
          <p id={errorId} role="alert" className="type-xs-bold text-white-60 flex items-center gap-1">
            {error}
            <IconAlert size={20} className="shrink-0" />
          </p>
        )}
      </div>
    </div>
  );
});
