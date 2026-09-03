import type { SVGProps } from "react";

/** Figma: Design system → Icons → "email" (20×20) */
export function IconEmail({ size, width, height, ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) {
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
      <g id="email-Icons">
        <path
          id="email-Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.28502 4.69007L8.0936 9.35137C9.14237 10.3656 10.8567 10.3665 11.9064 9.35137L16.7149 4.69007C16.7634 4.64314 16.7563 4.56587 16.7001 4.52791C16.2097 4.19648 15.613 4 14.9702 4H5.02984C4.38701 4 3.79029 4.19652 3.29983 4.52791C3.24365 4.56587 3.2366 4.64314 3.28502 4.69007ZM2 6.93573C2 6.44595 2.12532 5.98319 2.34608 5.57645C2.3806 5.51282 2.4681 5.49995 2.52056 5.55078L7.26827 10.1511C8.77171 11.61 11.2274 11.6108 12.7317 10.1511L17.4794 5.55078C17.5319 5.49995 17.6194 5.51282 17.6539 5.57645C17.8746 5.98319 18 6.44599 18 6.93573V13.0642C18 14.6842 16.64 16 14.9702 16H5.02984C3.36004 16 2 14.6842 2 13.0642V6.93573Z"
          fill="white"
        />
      </g>
    </svg>
  );
}
