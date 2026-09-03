import type { SVGProps } from "react";

/** Figma: Design system → Icons → "checkbox-default" (18×18) */
export function IconCheckboxDefault({
  size,
  width,
  height,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number | string }) {
  return (
    <svg
      viewBox="0 0 18 18"
      width={width ?? size ?? 18}
      height={height ?? size ?? 18}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <g id="checkbox-default-checkbox">
        <g clipPath="url(#checkbox-default-clip0_0_174)">
          <path
            id="checkbox-default-Vector"
            d="M16.3633 0.613647H1.63601C1.07117 0.613647 0.613281 1.07154 0.613281 1.63637V16.3636C0.613281 16.9285 1.07117 17.3864 1.63601 17.3864H16.3633C16.9281 17.3864 17.386 16.9285 17.386 16.3636V1.63637C17.386 1.07154 16.9281 0.613647 16.3633 0.613647Z"
            stroke="white"
            strokeOpacity="0.6"
            strokeWidth="1.5"
          />
        </g>
      </g>
      <defs>
        <clipPath id="checkbox-default-clip0_0_174">
          <rect width="18" height="18" rx="2" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
