import type { SVGProps } from "react";

/** Figma: Design system → Icons → "search" (24×24) */
export function IconSearch({ size, width, height, ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) {
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
      <g id="search-Icon/Search">
        <path
          id="search-Vector"
          d="M16.893 16.92L19.973 20M19 11.5C19 13.4891 18.2098 15.3968 16.8033 16.8033C15.3968 18.2098 13.4891 19 11.5 19C9.51088 19 7.60322 18.2098 6.1967 16.8033C4.79018 15.3968 4 13.4891 4 11.5C4 9.51088 4.79018 7.60322 6.1967 6.1967C7.60322 4.79018 9.51088 4 11.5 4C13.4891 4 15.3968 4.79018 16.8033 6.1967C18.2098 7.60322 19 9.51088 19 11.5Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
