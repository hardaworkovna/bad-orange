"use client";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { IconChevronDown, IconCheckWhite } from "@/icons/generated";

/**
 * Figma: Design system → Buttons → "Field dropdown" (Default / Focused) + "Popup"
 * Label + 61px pill trigger (SemiBold 18, chevron flips when open) and a
 * #121212 menu with 2px white-20 stroke, 24px radius, 24px padding, 16px row gap.
 */
export type SelectOption = { value: string; label: ReactNode };

export type SelectProps = {
  label: ReactNode;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  /** Storybook only. */
  forceOpen?: boolean;
  disabled?: boolean;
  className?: string;
  name?: string;
};

export function Select({
  label,
  options,
  value,
  defaultValue,
  placeholder = "Select",
  onChange,
  forceOpen,
  disabled,
  className,
  name,
}: SelectProps) {
  const id = useId();
  const [internal, setInternal] = useState(defaultValue);
  const [open, setOpen] = useState(Boolean(forceOpen));
  const rootRef = useRef<HTMLDivElement>(null);
  const current = value ?? internal;
  const selected = options.find((o) => o.value === current);
  const isOpen = forceOpen ?? open;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (v: string) => {
    setInternal(v);
    onChange?.(v);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={cn("relative flex w-[252px] max-w-full flex-col items-start gap-4", className)}>
      {name && <input type="hidden" name={name} value={current ?? ""} />}
      <span id={`${id}-label`} className="type-label-18 text-white-60">
        {label}
      </span>
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={`${id}-label ${id}-value`}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "border-white-20 flex h-[61px] w-full items-center gap-8 rounded-full border-2 px-6 text-left transition-colors outline-none",
          "hover:border-white-60 focus-visible:border-white-60 disabled:border-white-10 disabled:cursor-not-allowed",
        )}
      >
        <span
          id={`${id}-value`}
          className={cn("type-label-18-semi flex-1 truncate", isOpen || selected ? "text-white-90" : "text-white-60")}
        >
          {selected?.label ?? placeholder}
        </span>
        <IconChevronDown className={cn("shrink-0 transition-transform", isOpen && "-scale-y-100")} />
      </button>
      {isOpen && (
        <DropdownMenu
          role="listbox"
          aria-labelledby={`${id}-label`}
          className="absolute top-[calc(100%+8px)] left-0 z-20"
        >
          {options.map((o) => (
            <DropdownItem key={o.value} selected={o.value === current} onSelect={() => choose(o.value)}>
              {o.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </div>
  );
}

/** Figma "Popup" (325:2781) — the menu surface. */
export function DropdownMenu({ className, children, ...rest }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn(
        "border-white-20 flex w-[251px] flex-col items-stretch gap-4 overflow-hidden rounded-lg border-2 bg-black p-6",
        className,
      )}
      {...rest}
    >
      {children}
    </ul>
  );
}

export function DropdownItem({
  selected,
  onSelect,
  children,
}: {
  selected?: boolean;
  onSelect?: () => void;
  children: ReactNode;
}) {
  return (
    <li role="option" aria-selected={selected}>
      <button
        type="button"
        onClick={onSelect}
        className="type-label-18 hover:text-white-80 focus-visible:text-white-80 flex w-full items-center gap-8 text-left text-white outline-none"
      >
        <span className="flex-1">{children}</span>
        {selected && <IconCheckWhite className="shrink-0" />}
      </button>
    </li>
  );
}
