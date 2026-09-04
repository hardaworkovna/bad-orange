import type { SVGProps } from "react";

/** Figma: Design system → Icons → "filter-chevron-light" (20×20) */
export function IconFilterChevronLight({ size, width, height, ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) {
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
      <g id="filter-chevron-light-Frame">
      <path id="filter-chevron-light-Vector" fillRule="evenodd" clipRule="evenodd" d="M4.625 6L9.5 10.8L14.375 6L16 7.6L9.5 14L3 7.6L4.625 6Z" fill="white" fillOpacity="0.8"/>
      </g>
    </svg>
  );
}
