import type { SVGProps } from "react";

/** Figma: Design system → Icons → "eye-closed" (24×24) */
export function IconEyeClosed({ size, width, height, ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) {
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
      <g id="eye-closed-Password eye">
        <path
          id="eye-closed-Vector"
          d="M21 9C18.6 11.6667 15.6 13 12 13C8.4 13 5.4 11.6667 3 9M3 15L5.5 11.2M21 14.976L18.508 11.2M9 17L9.5 13M15 17L14.5 13"
          stroke="white"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
