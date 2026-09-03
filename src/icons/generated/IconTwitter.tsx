import type { SVGProps } from "react";

/** Figma: Design system → Icons → "twitter" (24×24) */
export function IconTwitter({ size, width, height, ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) {
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
      <g id="twitter-icon">
        <path
          id="twitter-Vector"
          d="M17.75 3H20.8171L14.1171 10.6239L22 21H15.8286L10.9914 14.7082L5.46286 21H2.39286L9.55857 12.8427L2 3.00142H8.32857L12.6943 8.75126L17.75 3ZM16.6714 19.1728H18.3714L7.4 4.73219H5.57714L16.6714 19.1728Z"
          fill="white"
          fillOpacity="0.8"
        />
      </g>
    </svg>
  );
}
