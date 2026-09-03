import type { SVGProps } from "react";

/** Figma: Design system → Icons → "delete" (24×24) */
export function IconDelete({ size, width, height, ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) {
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
      <g id="delete-icon/delete">
        <path
          id="delete-Vector"
          d="M18.6667 6.15L18.1156 15.1725C17.9751 17.4774 17.9049 18.6303 17.3333 19.4592C17.0512 19.8689 16.6879 20.2146 16.2667 20.4744C15.416 21 14.2756 21 11.9947 21C9.71022 21 8.568 21 7.71556 20.4735C7.29412 20.2132 6.93086 19.8668 6.64889 19.4565C6.07822 18.6267 6.00889 17.472 5.872 15.1635L5.33333 6.15M4 6.15H20M15.6053 6.15L14.9982 4.8828C14.5956 4.0404 14.3938 3.6201 14.0462 3.3573C13.969 3.29908 13.8873 3.24731 13.8018 3.2025C13.4169 3 12.9547 3 12.0311 3C11.0836 3 10.6098 3 10.2178 3.2106C10.1311 3.25759 10.0485 3.31178 9.97067 3.3726C9.61956 3.6453 9.42311 4.0818 9.03022 4.9539L8.49156 6.15M9.77778 16.05V10.65M14.2222 16.05V10.65"
          stroke="#F50C22"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
