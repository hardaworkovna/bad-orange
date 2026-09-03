import type { SVGProps } from "react";

/** Figma: Design system → Icons → "arrow-down-small" (20×20) */
export function IconArrowDownSmall({
  size,
  width,
  height,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number | string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={width ?? size ?? 20}
      height={height ?? size ?? 20}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <g id="arrow-down-small-icon player">
        <path
          id="arrow-down-small-Vector"
          d="M4 7L10 13L16 7"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
