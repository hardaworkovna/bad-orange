"use client";
import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { IconSearch } from "@/icons/generated";

/**
 * Figma: Design system → Buttons → "Search"
 *  - Desktop default / Desktop active → this component (395×50)
 *  - Small size mobile default        → <IconButton variant="glow"><IconSearch/></IconButton>
 */
export type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
  forceState?: "active";
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { className, forceState, placeholder = "Search", ...rest },
  ref,
) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      data-state={forceState}
      className={cn(
        "group border-white-20 bg-white-10 flex h-[50px] w-[395px] max-w-full items-center gap-3 overflow-hidden rounded-full border px-5",
        "has-[:focus-visible]:border-white-60 data-[state=active]:border-white-60 transition-colors",
        className,
      )}
    >
      <IconSearch size={20} className="shrink-0 opacity-60 transition-opacity group-has-[:focus-visible]:opacity-100" />
      <input
        ref={ref}
        id={id}
        type="search"
        placeholder={placeholder}
        className="placeholder:text-white-60 min-w-0 flex-1 bg-transparent font-sans text-[18px] leading-[1.2] font-medium tracking-[0.18px] text-white outline-none [&::-webkit-search-cancel-button]:hidden"
        {...rest}
      />
    </label>
  );
});
