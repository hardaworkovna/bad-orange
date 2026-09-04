"use client";
import type { SVGProps } from "react";
import { useId } from "react";

/** Figma: Design system → Icons → "checkbox-checked" (18×18) */
export function IconCheckboxChecked({
  size,
  width,
  height,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number | string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "") + "-";
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
      <g id={`${uid}checkbox`}>
        <g clipPath={`url(#${uid}clip0_0_93)`}>
          <path
            id={`${uid}Vector`}
            d="M16.3633 0.613647H1.63601C1.07117 0.613647 0.613281 1.07154 0.613281 1.63637V16.3636C0.613281 16.9285 1.07117 17.3864 1.63601 17.3864H16.3633C16.9281 17.3864 17.386 16.9285 17.386 16.3636V1.63637C17.386 1.07154 16.9281 0.613647 16.3633 0.613647Z"
            stroke="white"
            strokeWidth="1.5"
          />
          <path
            id={`${uid}Vector_2`}
            d="M11.7773 7.02148C11.9124 6.89342 12.1247 6.89337 12.2598 7.02148L12.5928 7.33887C12.7382 7.47688 12.7382 7.70867 12.5928 7.84668L8.23828 11.9785C8.10326 12.1062 7.89176 12.1064 7.75684 11.9785L5.5498 9.88379C5.40435 9.74577 5.40435 9.51399 5.5498 9.37598L5.88379 9.05957C6.01884 8.93143 6.23019 8.93143 6.36523 9.05957L7.96387 10.5752C7.98316 10.5934 8.01296 10.5935 8.03223 10.5752L11.7773 7.02148Z"
            fill="white"
            stroke="white"
            strokeWidth="0.3"
            strokeLinecap="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id={`${uid}clip0_0_93`}>
          <rect width="18" height="18" rx="2" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
