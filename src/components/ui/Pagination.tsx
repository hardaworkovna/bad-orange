import { cn } from "@/lib/cn";

/**
 * Figma: Design system → Icons → "Pagination" (80×8): 5 dots, 8px, 10px gap;
 * active dot #F50C22, others white.
 */
export type PaginationDotsProps = {
  count: number;
  index: number;
  onChange?: (i: number) => void;
  label?: string;
  className?: string;
};

export function PaginationDots({ count, index, onChange, label = "Slides", className }: PaginationDotsProps) {
  return (
    <div role="tablist" aria-label={label} className={cn("inline-flex items-center gap-[10px]", className)}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === index}
          aria-label={`${i + 1} of ${count}`}
          onClick={() => onChange?.(i)}
          className={cn(
            "focus-visible:ring-white-60 size-2 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
            i === index ? "bg-red" : "hover:bg-white-80 bg-white",
          )}
        />
      ))}
    </div>
  );
}
