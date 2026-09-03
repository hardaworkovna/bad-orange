import type { SVGProps } from "react";

/** Figma: Design system → Icons → "pagination" (80×8) */
export function IconPagination({
  size,
  width,
  height,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number | string }) {
  return (
    <svg
      viewBox="0 0 80 8"
      width={width ?? size ?? 80}
      height={height ?? size ?? 8}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <g id="pagination-Pagination">
        <circle id="pagination-Ellipse" cx="4" cy="4" r="4" fill="#F50C22" />
        <circle id="pagination-Ellipse_2" cx="22" cy="4" r="4" fill="white" fillOpacity="0.8" />
        <circle id="pagination-Ellipse_3" cx="40" cy="4" r="4" fill="white" fillOpacity="0.8" />
        <circle id="pagination-Ellipse_4" cx="58" cy="4" r="4" fill="white" fillOpacity="0.8" />
        <circle id="pagination-Ellipse_5" cx="76" cy="4" r="4" fill="white" fillOpacity="0.8" />
      </g>
    </svg>
  );
}
