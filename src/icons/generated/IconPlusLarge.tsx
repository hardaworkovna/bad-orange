import type { SVGProps } from "react";

/** Figma: Design system → Icons → "plus-large" (32×32) */
export function IconPlusLarge({ size, width, height, ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={width ?? size ?? 32}
      height={height ?? size ?? 32}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <g id="plus-large-Icon/plus">
        <path
          id="plus-large-Vector"
          d="M25.3333 17.3307H17.3333V25.3307H14.6667V17.3307H6.66667V14.664H14.6667V6.664H17.3333V14.664H25.3333V17.3307Z"
          fill="white"
        />
      </g>
    </svg>
  );
}
