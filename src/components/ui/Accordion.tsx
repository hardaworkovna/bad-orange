"use client";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { IconPlusLarge, IconMinusLarge } from "@/icons/generated";

/**
 * Figma: Design system → Design common sections → "Mobile Desktop" (Question=Default / Opened)
 * FAQ row: 2px #FF6464 stroke, 32 radius, 40 padding, #121212 with a red radial tint
 * top-right; question in 1440/H5 (Special Gothic 25, uppercase) white 90%; answer 18 Medium
 * white 80% with 20px gap; 32px plus/minus glyph.
 * Mobile variant ("Mob Question") uses the same structure at mobile type sizes.
 */
export type AccordionItemProps = {
  question: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onToggle?: (open: boolean) => void;
  className?: string;
};

export function AccordionItem({
  question,
  children,
  defaultOpen,
  open: controlled,
  onToggle,
  className,
}: AccordionItemProps) {
  const id = useId();
  const [internal, setInternal] = useState(Boolean(defaultOpen));
  const open = controlled ?? internal;
  const toggle = () => {
    const next = !open;
    setInternal(next);
    onToggle?.(next);
  };
  return (
    // Figma draws the 2px stroke on the frame edge, so the padding it reports (20
    // mobile / 40 desktop) is measured from the outside: with border-box that is a
    // 2px-smaller CSS padding, which keeps the row heights at Figma's 76 / 112.
    <div
      className={cn("border-stroke bg-gradient-card-glow w-full rounded-xl border-2 p-[18px] md:p-[38px]", className)}
    >
      <h3 className="m-0">
        <button
          type="button"
          id={`${id}-trigger`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={toggle}
          className="flex w-full items-center justify-between gap-8 text-left outline-none focus-visible:[&>span]:underline"
        >
          <span className="type-h5 text-white-90">{question}</span>
          <span className="inline-flex size-8 shrink-0 items-center justify-center">
            {open ? <IconMinusLarge /> : <IconPlusLarge />}
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        hidden={!open}
        // Figma sizes the answer box at 564, but its Host Grotesk renders ~2% narrower
        // than the browser's, so 564 here costs an extra line. 600 reproduces Figma's
        // three-line block and its 189px row height.
        className="type-body-lg text-white-80 mt-5 max-w-[600px]"
      >
        {children}
      </div>
    </div>
  );
}

export function Accordion({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex w-full flex-col gap-4", className)}>{children}</div>;
}
