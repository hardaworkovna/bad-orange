import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Figma: Design system → Tags Category
 *  - "Category desktop"        289×289, radius 32, 1440/H5 label
 *  - "Category desktop small"  289×100, radius 32, 1440/Tags label
 *  - "Category mobile"         169×74,  radius 24, Mobile/Tags label
 * Background = vertical linear gradient + a centred radial glow + two blurred
 * dark ellipses behind the label (Figma "Ellipse" layers with layer blur).
 * Each category has its own gradient; pass it via `palette`. Two palettes are
 * confirmed from Figma so far (Dom Daddy, Spicy) — the rest are read per tile
 * when the Categories page is built.
 */
export type CategoryPalette = {
  /** top → bottom of the vertical gradient */
  from: string;
  to: string;
  /** centre glow colour (Figma radial, opaque centre → transparent) */
  glow: string;
  /** blurred ellipse colours (large, small) */
  ellipseLg: string;
  ellipseSm: string;
};

export const CATEGORY_PALETTES: Record<string, CategoryPalette> = {
  "dom-daddy": {
    from: "#ffb9d5",
    to: "#f5a6e3",
    glow: "rgb(138 31 77)",
    ellipseLg: "rgb(138 2 64 / 0.9)",
    ellipseSm: "#63032f",
  },
  spicy: {
    from: "#b89aff",
    to: "#0a118c",
    glow: "rgb(138 31 77)",
    ellipseLg: "rgb(138 2 64 / 0.9)",
    ellipseSm: "#63032f",
  },
};

export type CategoryTileSize = "large" | "small" | "mobile";

type Common = {
  label: string;
  palette?: CategoryPalette;
  size?: CategoryTileSize;
  className?: string;
};

export type CategoryTileProps = Common &
  (
    | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className">)
    | ({ href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">)
  );

const sizeClasses: Record<CategoryTileSize, string> = {
  large: "size-[289px] rounded-xl type-h5 md:text-[25px]",
  small: "h-[100px] w-[289px] rounded-xl font-display text-[20px] uppercase leading-[1.1]",
  mobile: "h-[74px] w-[169px] rounded-lg font-display text-[15px] uppercase leading-[1.1]",
};

export function CategoryTile({
  label,
  palette = CATEGORY_PALETTES["dom-daddy"],
  size = "large",
  className,
  ...rest
}: CategoryTileProps) {
  const style = {
    backgroundImage: `radial-gradient(circle 173px at 50% 50%, ${palette.glow} 0%, transparent 100%), linear-gradient(180deg, ${palette.from} 21%, ${palette.to} 100%)`,
  };
  const inner = (
    <>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[50px]",
          size === "large" && "h-[98px] w-[260px]",
          size === "small" && "h-[70px] w-[186px]",
          size === "mobile" && "h-[53px] w-[140px]",
        )}
        style={{ background: palette.ellipseLg }}
      />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[30px]",
          size === "large" && "h-[51px] w-[120px]",
          size !== "large" && "h-[37px] w-[85px]",
        )}
        style={{ background: palette.ellipseSm }}
      />
      <span className="text-white-90 relative text-center">{label}</span>
    </>
  );
  const classes = cn(
    "relative inline-flex shrink-0 items-center justify-center overflow-hidden text-center outline-none transition-transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-white-60 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    sizeClasses[size],
    className,
  );
  if (rest.href !== undefined) {
    const { href, ...a } = rest as { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={classes} style={style} {...a}>
        {inner}
      </a>
    );
  }
  const b = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" className={classes} style={style} {...b}>
      {inner}
    </button>
  );
}
