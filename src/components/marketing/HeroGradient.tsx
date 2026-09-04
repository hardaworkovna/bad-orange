import { cn } from "@/lib/cn";

/**
 * Figma: Plans page ✅ → "Gradient" 110:1021 (1440: a 1440×761 box at y=227 whose
 * artwork bleeds out by -32.39% / -22.29% / -38.3% / -25.24%, i.e. 147.53% ×
 * 170.69% of the box) and 351:8819 (390: 390×291 at y=534).
 * The shape is exported as SVG because it is three Gaussian-blurred vectors,
 * not a CSS gradient.
 */
export function HeroGradient({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 overflow-hidden", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/art/hero-gradient-desktop.svg"
        alt=""
        className="absolute hidden max-w-none md:block"
        style={{ top: "-32.39%", left: "-25.24%", width: "147.53%", height: "170.69%" }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/art/hero-gradient-mobile.svg"
        alt=""
        className="absolute top-[-50%] left-1/2 h-[199%] w-[228%] max-w-none -translate-x-1/2 md:hidden"
      />
    </div>
  );
}
