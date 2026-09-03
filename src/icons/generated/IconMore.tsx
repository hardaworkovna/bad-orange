import type { SVGProps } from "react";

/** Figma: Design system → Icons → "more" (24×24) */
export function IconMore({ size, width, height, ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) {
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
      <g id="more-icon more">
        <path
          id="more-Vector"
          d="M4.5 11C3.675 11 3 11.675 3 12.5C3 13.325 3.675 14 4.5 14C5.325 14 6 13.325 6 12.5C6 11.675 5.325 11 4.5 11ZM19.5 11C18.675 11 18 11.675 18 12.5C18 13.325 18.675 14 19.5 14C20.325 14 21 13.325 21 12.5C21 11.675 20.325 11 19.5 11ZM12 11C11.175 11 10.5 11.675 10.5 12.5C10.5 13.325 11.175 14 12 14C12.825 14 13.5 13.325 13.5 12.5C13.5 11.675 12.825 11 12 11Z"
          fill="white"
        />
      </g>
    </svg>
  );
}
