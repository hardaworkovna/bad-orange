import type { SVGProps } from "react";

/** Figma: Design system → Icons → "play" (24×24) */
export function IconPlay({ size, width, height, ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width ?? size ?? 24}
      height={height ?? size ?? 24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <g id="play-icon player">
        <path
          id="play-Vector"
          d="M8.5241 4.93791C7.85783 4.52789 7 5.00724 7 5.78956V18.2104C7 18.9928 7.85783 19.4721 8.5241 19.0621L18.6161 12.8517C19.2506 12.4612 19.2506 11.5388 18.6161 11.1483L8.5241 4.93791Z"
          fill="white"
        />
      </g>
    </svg>
  );
}
