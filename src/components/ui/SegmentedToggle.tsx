"use client";
import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Figma: Design system → "Toggle" (Public / Privacy) and "Format tab" (Audio / Video).
 * Pill track: white 10% bg, 8px padding, 8px gap. Active segment: red
 * rgba(255,0,0,.92), 1px white 30% stroke, 20px red glow. Labels 16 SemiBold white 80%.
 */
export type SegmentedToggleOption<T extends string> = { value: T; label: string };

export type SegmentedToggleProps<T extends string> = {
  options: readonly SegmentedToggleOption<T>[];
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  /** Accessible group name. */
  label: string;
  className?: string;
};

export function SegmentedToggle<T extends string>({
  options,
  value,
  defaultValue,
  onChange,
  label,
  className,
}: SegmentedToggleProps<T>) {
  const [internal, setInternal] = useState<T>(defaultValue ?? options[0].value);
  const current = value ?? internal;
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn("bg-white-10 inline-flex items-center gap-2 rounded-full p-2", className)}
    >
      {options.map((o) => {
        const active = o.value === current;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => {
              setInternal(o.value);
              onChange?.(o.value);
            }}
            className={cn(
              "type-label-16-semi text-white-80 focus-visible:border-white-60 inline-flex items-center justify-center rounded-full border border-transparent p-3 transition-[background,box-shadow] outline-none",
              active && "border-white-30 bg-red-solid shadow-red-pill",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
