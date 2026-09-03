import type { SVGProps } from "react";

/** Figma: Design system → Icons → "badge-crown" (40×43) */
export function IconBadgeCrown({
  size,
  width,
  height,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number | string }) {
  return (
    <svg
      viewBox="0 0 40 43"
      width={width ?? size ?? 40}
      height={height ?? size ?? 43}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <g id="badge-crown-Frame">
        <g id="badge-crown-Vector">
          <path
            d="M21.5625 15.45C22.1375 14.9937 22.5 14.2875 22.5 13.5C22.5 12.1187 21.3813 11 20 11C18.6187 11 17.5 12.1187 17.5 13.5C17.5 14.2875 17.8687 14.9937 18.4375 15.45L14.1625 22.175C13.5375 23.1562 12.2062 23.4 11.275 22.7L7.55625 19.9187C7.8375 19.5187 8 19.025 8 18.5C8 17.1187 6.88125 16 5.5 16C4.11875 16 3 17.1187 3 18.5C3 19.8625 4.09375 20.975 5.45 21L7.4875 34.5938C7.78125 36.55 9.4625 38 11.4438 38H28.5562C30.5375 38 32.2188 36.55 32.5125 34.5938L34.55 21C35.9062 20.975 37 19.8625 37 18.5C37 17.1187 35.8813 16 34.5 16C33.1187 16 32 17.1187 32 18.5C32 19.025 32.1625 19.5187 32.4437 19.9187L28.7313 22.7062C27.8 23.4062 26.4688 23.1625 25.8438 22.1812L21.5625 15.45Z"
            fill="url(#badge-crown-paint0_linear_0_53)"
          />
          <path
            d="M21.5625 15.45C22.1375 14.9937 22.5 14.2875 22.5 13.5C22.5 12.1187 21.3813 11 20 11C18.6187 11 17.5 12.1187 17.5 13.5C17.5 14.2875 17.8687 14.9937 18.4375 15.45L14.1625 22.175C13.5375 23.1562 12.2062 23.4 11.275 22.7L7.55625 19.9187C7.8375 19.5187 8 19.025 8 18.5C8 17.1187 6.88125 16 5.5 16C4.11875 16 3 17.1187 3 18.5C3 19.8625 4.09375 20.975 5.45 21L7.4875 34.5938C7.78125 36.55 9.4625 38 11.4438 38H28.5562C30.5375 38 32.2188 36.55 32.5125 34.5938L34.55 21C35.9062 20.975 37 19.8625 37 18.5C37 17.1187 35.8813 16 34.5 16C33.1187 16 32 17.1187 32 18.5C32 19.025 32.1625 19.5187 32.4437 19.9187L28.7313 22.7062C27.8 23.4062 26.4688 23.1625 25.8438 22.1812L21.5625 15.45Z"
            fill="url(#badge-crown-paint1_radial_0_53)"
            fillOpacity="0.7"
          />
        </g>
        <path
          id="badge-crown-Star"
          d="M30 0L30.8485 4.15147L35 5L30.8485 5.84853L30 10L29.1515 5.84853L25 5L29.1515 4.15147L30 0Z"
          fill="#FDCCCC"
        />
      </g>
      <defs>
        <linearGradient
          id="badge-crown-paint0_linear_0_53"
          x1="20"
          y1="11"
          x2="20"
          y2="38"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFB0B0" />
          <stop offset="1" stopColor="#FFB0B0" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id="badge-crown-paint1_radial_0_53"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(-10 -34.5) rotate(70.3462) scale(89.1964 112.321)"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
