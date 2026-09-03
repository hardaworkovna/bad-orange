import type { SVGProps } from "react";

/** Figma: Design system → Icons → "more-small" (20×20) */
export function IconMoreSmall({ size, width, height, ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) {
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
      <g id="more-small-Icon/more small">
        <path
          id="more-small-Vector"
          d="M4.44444 9C3.65 9 3 9.675 3 10.5C3 11.325 3.65 12 4.44444 12C5.23889 12 5.88889 11.325 5.88889 10.5C5.88889 9.675 5.23889 9 4.44444 9ZM14.5556 9C13.7611 9 13.1111 9.675 13.1111 10.5C13.1111 11.325 13.7611 12 14.5556 12C15.35 12 16 11.325 16 10.5C16 9.675 15.35 9 14.5556 9ZM9.5 9C8.70556 9 8.05556 9.675 8.05556 10.5C8.05556 11.325 8.70556 12 9.5 12C10.2944 12 10.9444 11.325 10.9444 10.5C10.9444 9.675 10.2944 9 9.5 9Z"
          fill="#7D7D7D"
        />
      </g>
    </svg>
  );
}
