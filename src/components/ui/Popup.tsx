"use client";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { IconChevronRightSmall } from "@/icons/generated";

/**
 * Popup surfaces. Figma:
 *  - "Pop-up/Delete comment": #121212, 1px white 15% stroke, 24 radius, 32 padding, 350 wide
 *  - "Account/Settings":      #121212, 2px white 20% stroke, 24 radius, 24 padding
 *  - "Pop-up/Reactions":      glass white 2%, 2px white 10% stroke, 32 radius, 24 padding
 */
export type PopupProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "solid" | "menu" | "glass";
};

export function Popup({ variant = "solid", className, ...rest }: PopupProps) {
  return (
    <div
      className={cn(
        "relative",
        variant === "solid" && "border-white-15 rounded-lg border bg-black p-8",
        variant === "menu" && "border-white-20 rounded-lg border-2 bg-black p-6",
        variant === "glass" && "glass border-white-10 bg-white-02 rounded-xl border-2 p-6",
        className,
      )}
      {...rest}
    />
  );
}

/** Figma "Pop-up/Delete comment" — 350px confirm dialog with Delete / Cancel. */
export function ConfirmPopup({
  message = "If you delete this post, you won’t be able to restore it.",
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  className,
}: {
  message?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  className?: string;
}) {
  return (
    <Popup
      role="alertdialog"
      aria-modal="true"
      className={cn("flex w-[350px] max-w-full flex-col items-center", className)}
    >
      <div className="flex w-full flex-col items-center gap-6">
        <p className="type-label-18 text-white-80 w-full text-center">{message}</p>
        <div className="flex items-start gap-4">
          <Button
            variant="primary-white"
            size="sm"
            onClick={onConfirm}
            className="glass type-label-18-semi w-[100px] px-0 opacity-90"
          >
            {confirmLabel}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={onCancel}
            className="bg-white-02 type-label-18-semi hover:bg-white-10 w-[100px] bg-none px-0 text-white opacity-90 hover:bg-none hover:shadow-none"
          >
            {cancelLabel}
          </Button>
        </div>
      </div>
    </Popup>
  );
}

/** Figma "Account/Settings" — menu with chevron rows. */
export type AccountMenuItem = { label: string; onSelect?: () => void; href?: string };

export function AccountMenu({ items, className }: { items: AccountMenuItem[]; className?: string }) {
  return (
    <Popup variant="menu" className={cn("inline-flex", className)}>
      <ul className="flex min-w-[256px] flex-col gap-6">
        {items.map((it) => {
          const Comp = it.href ? "a" : "button";
          return (
            <li key={it.label}>
              <Comp
                {...(it.href ? { href: it.href } : { type: "button", onClick: it.onSelect })}
                className="type-label-18 hover:text-white-80 focus-visible:text-white-80 flex w-full items-center gap-8 text-left text-white outline-none"
              >
                <span className="flex-1">{it.label}</span>
                <IconChevronRightSmall className="shrink-0 -rotate-90" />
              </Comp>
            </li>
          );
        })}
      </ul>
    </Popup>
  );
}
