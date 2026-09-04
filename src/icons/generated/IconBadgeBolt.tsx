"use client";
import type { SVGProps } from "react";
import { useId } from "react";

/** Figma: Design system → Icons → "badge-bolt" (40×40) */
export function IconBadgeBolt({ size, width, height, ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "") + "-";
  return (
    <svg
      viewBox="0 0 40 40"
      width={width ?? size ?? 40}
      height={height ?? size ?? 40}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <g id={`${uid}Frame`}>
        <g id={`${uid}Vector`}>
          <path
            d="M18.9167 25.1364C18.9167 24.8602 18.6928 24.6364 18.4167 24.6364H11.8179C11.4441 24.6364 11.2025 24.2411 11.3729 23.9084L21.1383 4.84481C21.3777 4.37757 22.0833 4.54779 22.0833 5.07276V14.8636C22.0833 15.1398 22.3072 15.3636 22.5833 15.3636H29.1821C29.5559 15.3636 29.7975 15.7589 29.6271 16.0916L19.8617 35.1552C19.6223 35.6224 18.9167 35.4522 18.9167 34.9272V25.1364Z"
            fill={`url(#${uid}paint0_linear_0_34)`}
          />
          <path
            d="M18.9167 25.1364C18.9167 24.8602 18.6928 24.6364 18.4167 24.6364H11.8179C11.4441 24.6364 11.2025 24.2411 11.3729 23.9084L21.1383 4.84481C21.3777 4.37757 22.0833 4.54779 22.0833 5.07276V14.8636C22.0833 15.1398 22.3072 15.3636 22.5833 15.3636H29.1821C29.5559 15.3636 29.7975 15.7589 29.6271 16.0916L19.8617 35.1552C19.6223 35.6224 18.9167 35.4522 18.9167 34.9272V25.1364Z"
            fill={`url(#${uid}paint1_radial_0_34)`}
            fillOpacity="0.8"
          />
        </g>
        <path
          id={`${uid}Star`}
          d="M7 6L7.67882 9.32118L11 10L7.67882 10.6788L7 14L6.32118 10.6788L3 10L6.32118 9.32118L7 6Z"
          fill="#FDCCCC"
        />
      </g>
      <defs>
        <linearGradient
          id={`${uid}paint0_linear_0_34`}
          x1="19.9383"
          y1="4.0633"
          x2="19.9383"
          y2="38.6369"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFB0B0" />
          <stop offset="1" stopColor="#FFB0B0" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id={`${uid}paint1_radial_0_34`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(17.7546 107.562 -62.6013 48.3746 2.18373 -54.1997)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
