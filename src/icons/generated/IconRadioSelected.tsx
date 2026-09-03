import type { SVGProps } from "react";

/** Figma: Design system → Icons → "radio-selected" (24×24) */
export function IconRadioSelected({
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
      <g id="radio-selected-Icon">
        <circle id="radio-selected-Ellipse" cx="12" cy="12" r="6" fill="#F50C22" />
        <circle id="radio-selected-Ellipse_2" cx="12" cy="12" r="11" stroke="#F50C22" strokeWidth="2" />
      </g>
    </svg>
  );
}
