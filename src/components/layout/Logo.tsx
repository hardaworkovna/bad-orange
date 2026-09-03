import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Figma: Design system → Headers&Footers → "Logo/Daddy Sounds" (190×40 on desktop,
 * 120×25 on mobile). Exported from Figma as raster; swap for SVG when provided.
 */
export function Logo({ size = "auto", className }: { size?: "auto" | "desktop" | "mobile"; className?: string }) {
  const desktop = (
    <Image
      src="/brand/logo-daddy-sounds@2x.png"
      alt="Daddy Sounds — be bad"
      width={190}
      height={40}
      priority
      className={cn(size === "auto" && "hidden md:block")}
    />
  );
  const mobile = (
    <Image
      src="/brand/logo-daddy-sounds-mobile@2x.png"
      alt="Daddy Sounds — be bad"
      width={120}
      height={25}
      priority
      className={cn(size === "auto" && "md:hidden")}
    />
  );
  return (
    <span className={cn("inline-flex shrink-0 items-center", className)}>
      {size === "desktop" ? (
        desktop
      ) : size === "mobile" ? (
        mobile
      ) : (
        <>
          {desktop}
          {mobile}
        </>
      )}
    </span>
  );
}
