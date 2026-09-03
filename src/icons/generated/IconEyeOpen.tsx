import type { SVGProps } from "react";

/** Figma: Design system → Icons → "eye-open" (21.7×15.7) */
export function IconEyeOpen({ size, width, height, ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) {
  return (
    <svg
      viewBox="0 0 21.7 15.7"
      width={width ?? size ?? 21.7}
      height={height ?? size ?? 15.7}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <g id="eye-open-Group">
        <path
          id="eye-open-Vector"
          d="M12.9713 9.97132C13.5339 9.40871 13.85 8.64565 13.85 7.85C13.85 7.05435 13.5339 6.29129 12.9713 5.72868C12.4087 5.16607 11.6456 4.85 10.85 4.85C10.0544 4.85 9.29129 5.16607 8.72868 5.72868C8.16607 6.29129 7.85 7.05435 7.85 7.85C7.85 8.64565 8.16607 9.40871 8.72868 9.97132C9.29129 10.5339 10.0544 10.85 10.85 10.85C11.6456 10.85 12.4087 10.5339 12.9713 9.97132Z"
          stroke="white"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="eye-open-Vector_2"
          d="M0.85 7.85C2.45 3.753 6.186 0.85 10.85 0.85C15.514 0.85 19.25 3.753 20.85 7.85C19.25 11.947 15.514 14.85 10.85 14.85C6.186 14.85 2.45 11.947 0.85 7.85Z"
          stroke="white"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
