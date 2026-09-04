import type { SVGProps } from "react";

/** Figma: Design system → Icons → "arrow-inline" (20×20) */
export function IconArrowInline({
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
      <g id="arrow-inline-Frame 150" opacity="0.6">
        <path
          id="arrow-inline-Vector"
          d="M4 10.75H13.1275L8.935 14.9425L10 16L16 10L10 4L8.9425 5.0575L13.1275 9.25H4V10.75Z"
          fill="white"
        />
      </g>
    </svg>
  );
}
