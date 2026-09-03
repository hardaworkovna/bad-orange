import type { SVGProps } from "react";

/** Figma: Design system → Icons → "minus-large" (32×32) */
export function IconMinusLarge({
  size,
  width,
  height,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number | string }) {
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
      <g id="minus-large-Icon/Minus">
        <path
          id="minus-large-Vector"
          d="M25.3307 16.8307C25.3307 17.1069 25.1069 17.3307 24.8307 17.3307H7.16406C6.88792 17.3307 6.66406 17.1069 6.66406 16.8307V15.1641C6.66406 14.8879 6.88792 14.6641 7.16406 14.6641H24.8307C25.1069 14.6641 25.3307 14.8879 25.3307 15.1641V16.8307Z"
          fill="white"
        />
      </g>
    </svg>
  );
}
