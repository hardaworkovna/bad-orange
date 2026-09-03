"use client";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { IconRadioDefault, IconRadioSelected } from "@/icons/generated";

/**
 * Figma: Design system → Buttons → "Icon" (Type=Selected / Default), 24×24.
 * Default: white 20% ring. Selected: #F50C22 ring + dot.
 */
export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: ReactNode;
  forceChecked?: boolean;
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, forceChecked, className, ...rest },
  ref,
) {
  return (
    <label
      data-state={forceChecked ? "checked" : undefined}
      className={cn(
        "group/radio inline-flex cursor-pointer items-center gap-2 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-40",
        className,
      )}
    >
      <input ref={ref} type="radio" className="peer sr-only" {...rest} />
      <span className="peer-focus-visible:outline-white-60 relative inline-flex size-6 shrink-0 items-center justify-center rounded-full peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2">
        <IconRadioDefault className="group-has-[:checked]/radio:hidden group-data-[state=checked]/radio:hidden" />
        <IconRadioSelected className="hidden group-has-[:checked]/radio:block group-data-[state=checked]/radio:block" />
      </span>
      {label && <span className="type-label-18 text-white-80">{label}</span>}
    </label>
  );
});
