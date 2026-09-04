import type { SVGProps } from "react";

/** Figma: Design system → Icons → "filter-chevron-dark" (20×20) */
export function IconFilterChevronDark({
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
      <g id="filter-chevron-dark-Frame">
        <path
          id="filter-chevron-dark-Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.625 6L9.5 10.8L14.375 6L16 7.6L9.5 14L3 7.6L4.625 6Z"
          fill="#121212"
        />
      </g>
    </svg>
  );
}
