"use client";
import type { SVGProps } from "react";
import { useId } from "react";

/** Figma: Design system → Icons → "close-menu" (22×10.3008) */
export function IconCloseMenu({ size, width, height, ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "") + "-";
  return (
    <svg
      viewBox="0 0 22 10.3008"
      width={width ?? size ?? 22}
      height={height ?? size ?? 10.3008}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <g id={`${uid}Frame`}>
        <path
          id={`${uid}Union`}
          d="M21.25 8.80078C21.6642 8.80078 22 9.13657 22 9.55078C21.9998 9.96482 21.6641 10.3008 21.25 10.3008H0.75C0.335917 10.3008 0.000211236 9.96482 0 9.55078C0 9.13657 0.335786 8.80078 0.75 8.80078H21.25ZM21.25 4.40039C21.6642 4.40039 22 4.73618 22 5.15039C22 5.5646 21.6642 5.90039 21.25 5.90039H0.75C0.335786 5.90039 0 5.5646 0 5.15039C0 4.73618 0.335786 4.40039 0.75 4.40039H21.25ZM21.25 0C21.6641 0 21.9998 0.335966 22 0.75C22 1.16421 21.6642 1.5 21.25 1.5H0.75C0.335786 1.5 0 1.16421 0 0.75C0.000211043 0.335966 0.335917 0 0.75 0H21.25Z"
          fill={`url(#${uid}paint0_linear_0_9)`}
        />
      </g>
      <defs>
        <linearGradient
          id={`${uid}paint0_linear_0_9`}
          x1="22"
          y1="10.1504"
          x2="22"
          y2="-0.84961"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
