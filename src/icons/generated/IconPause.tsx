import type { SVGProps } from "react";

/** Figma: Design system → Icons → "pause" (24×24) */
export function IconPause({ size, width, height, ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) {
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
      <g id="pause-icon player">
        <path
          id="pause-Vector"
          d="M15 19C14.4477 19 14 18.5523 14 18V6C14 5.44772 14.4477 5 15 5H17C17.5523 5 18 5.44772 18 6V18C18 18.5523 17.5523 19 17 19H15ZM7 19C6.44772 19 6 18.5523 6 18V6C6 5.44772 6.44772 5 7 5H9C9.55228 5 10 5.44772 10 6V18C10 18.5523 9.55228 19 9 19H7Z"
          fill="white"
        />
      </g>
    </svg>
  );
}
