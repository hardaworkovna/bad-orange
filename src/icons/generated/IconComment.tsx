import type { SVGProps } from "react";

/** Figma: Design system → Icons → "comment" (24×24) */
export function IconComment({ size, width, height, ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) {
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
      <g id="comment-icon/comment">
        <path
          id="comment-Vector"
          d="M12.5 20C13.9834 20 15.4334 19.5601 16.6668 18.736C17.9001 17.9119 18.8614 16.7406 19.4291 15.3701C19.9967 13.9997 20.1453 12.4917 19.8559 11.0368C19.5665 9.58196 18.8522 8.24559 17.8033 7.1967C16.7544 6.1478 15.418 5.4335 13.9632 5.14411C12.5083 4.85472 11.0003 5.00325 9.62987 5.5709C8.25943 6.13856 7.08809 7.09985 6.26398 8.33322C5.43987 9.56659 5 11.0166 5 12.5C5 13.74 5.3 14.9083 5.83333 15.9392L5 20L9.06083 19.1667C10.0908 19.6992 11.2608 20 12.5 20Z"
          stroke="white"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
