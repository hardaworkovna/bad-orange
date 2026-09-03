import type { SVGProps } from "react";

/** Figma: Design system → Icons → "chevron-down" (24×24) */
export function IconChevronDown({
  size,
  width,
  height,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number | string }) {
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
      <g id="chevron-down-Icon/Down">
        <path
          id="chevron-down-Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.13523 8.88909C7.33277 8.67838 7.66723 8.67838 7.86477 8.88909L11.6352 12.9109C11.8328 13.1216 12.1672 13.1216 12.3648 12.9109L16.1352 8.88909C16.3328 8.67838 16.6672 8.67838 16.8648 8.88909L17.6794 9.75803C17.8597 9.95036 17.8597 10.2496 17.6794 10.442L12.3648 16.1109C12.1672 16.3216 11.8328 16.3216 11.6352 16.1109L6.3206 10.442C6.14029 10.2496 6.14029 9.95036 6.3206 9.75803L7.13523 8.88909Z"
          fill="white"
          fillOpacity="0.6"
        />
      </g>
    </svg>
  );
}
