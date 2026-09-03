import type { SVGProps } from "react";

/** Figma: Design system → Icons → "radio-default" (24×24) */
export function IconRadioDefault({
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
      <g id="radio-default-Icon">
        <circle id="radio-default-Ellipse" cx="12" cy="12" r="11" stroke="white" strokeOpacity="0.2" strokeWidth="2" />
      </g>
    </svg>
  );
}
