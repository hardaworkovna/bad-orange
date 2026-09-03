import type { SVGProps } from "react";

/** Figma: Design system → Icons → "card-dots" (34×4) */
export function IconCardDots({ size, width, height, ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) {
  return (
    <svg
      viewBox="0 0 34 4"
      width={width ?? size ?? 34}
      height={height ?? size ?? 4}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <g id="card-dots-Frame">
        <circle id="card-dots-Ellipse" cx="2" cy="2" r="2" fill="white" fillOpacity="0.8" />
        <circle id="card-dots-Ellipse_2" cx="12" cy="2" r="2" fill="white" fillOpacity="0.8" />
        <circle id="card-dots-Ellipse_3" cx="22" cy="2" r="2" fill="white" fillOpacity="0.8" />
        <circle id="card-dots-Ellipse_4" cx="32" cy="2" r="2" fill="white" fillOpacity="0.8" />
      </g>
    </svg>
  );
}
