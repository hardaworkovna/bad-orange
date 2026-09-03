import type { SVGProps } from "react";

/** Figma: Design system → Icons → "edit" (17.7×17.7) */
export function IconEdit({ size, width, height, ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) {
  return (
    <svg
      viewBox="0 0 17.7 17.7"
      width={width ?? size ?? 17.7}
      height={height ?? size ?? 17.7}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <g id="edit-Group">
        <path
          id="edit-Vector"
          d="M4.40469 13.2944V9.73889L13.2936 0.85L16.8491 4.40556L7.96024 13.2944H4.40469Z"
          stroke="white"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="edit-Line"
          d="M0.85 16.85H16.85"
          stroke="white"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="edit-Line_2"
          d="M10.6273 3.51663L14.1829 7.07218"
          stroke="white"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
