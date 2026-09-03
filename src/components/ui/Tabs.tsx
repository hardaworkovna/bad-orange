"use client";
import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Figma: Design system → "Tabs Desktop" (Selected=My library / Explore) and "Tabs Mobile".
 * Two equal columns; label + 8px pill indicator (white on active) over an 8px
 * white 10% track. Desktop labels 22 SemiBold, mobile 18 Medium; inactive white 60%.
 */
export type TabItem<T extends string> = { value: T; label: string };

export type TabsProps<T extends string> = {
  items: readonly TabItem<T>[];
  value?: T;
  defaultValue?: T;
  onChange?: (v: T) => void;
  /** "auto" follows the viewport (mobile below `md`). */
  size?: "auto" | "desktop" | "mobile";
  label: string;
  className?: string;
};

export function Tabs<T extends string>({
  items,
  value,
  defaultValue,
  onChange,
  size = "auto",
  label,
  className,
}: TabsProps<T>) {
  const [internal, setInternal] = useState<T>(defaultValue ?? items[0].value);
  const current = value ?? internal;
  const desktop = size === "desktop";
  const mobile = size === "mobile";
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn(
        "relative grid w-full",
        size === "auto" && "max-w-[350px] md:max-w-[401px]",
        desktop && "w-[401px]",
        mobile && "w-[350px]",
        className,
      )}
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      <span aria-hidden className="bg-white-10 absolute inset-x-0 bottom-0 h-2 rounded-sm" />
      {items.map((it) => {
        const active = it.value === current;
        return (
          <button
            key={it.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => {
              setInternal(it.value);
              onChange?.(it.value);
            }}
            className="group/tab relative flex flex-col items-center gap-5 outline-none"
          >
            <span
              className={cn(
                "text-center transition-colors group-focus-visible/tab:underline",
                size === "auto" &&
                  "font-sans text-[18px] leading-[1.2] font-medium md:text-[22px] md:font-semibold md:tracking-[0.22px]",
                desktop && "type-label-22-semi",
                mobile && "type-label-18",
                active ? "text-white" : "text-white-60 group-hover/tab:text-white-80",
              )}
            >
              {it.label}
            </span>
            <span className={cn("relative h-2 w-full rounded-full", active && "bg-white")} />
          </button>
        );
      })}
    </div>
  );
}
