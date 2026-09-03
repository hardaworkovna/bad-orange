import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { IconEmail, IconGoogle, IconApple } from "@/icons/generated";

/**
 * Figma: Design system → Buttons → "Continue with Google" (422×61) with the
 * "Icons" set (Email / Google / Apple, 20px). 2px white 20% stroke, 18 Medium white 90%.
 */
export type AuthProvider = "email" | "google" | "apple";

const icons = { email: <IconEmail />, google: <IconGoogle />, apple: <IconApple /> };
const labels = { email: "Continue with Email", google: "Continue with Google", apple: "Continue with Apple" };

export type AuthButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  provider: AuthProvider;
  fullWidth?: boolean;
};

export function AuthButton({ provider, fullWidth, className, children, ...rest }: AuthButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "border-white-20 type-label-18 inline-flex h-[61px] w-[422px] max-w-full items-center justify-center gap-2 rounded-full border-2 px-6 text-white transition-colors outline-none",
        "hover:bg-white-10 focus-visible:border-white-60 disabled:border-gray disabled:text-white-60 disabled:cursor-not-allowed",
        fullWidth && "w-full",
        className,
      )}
      {...rest}
    >
      <span className="inline-flex size-5 shrink-0 items-center justify-center">{icons[provider]}</span>
      <span className="opacity-90">{children ?? labels[provider]}</span>
    </button>
  );
}
