import type { SVGProps } from "react";

/** Figma: Design system → Icons → "progress-75-pink" (24×24) */
export function IconProgress75Pink({
  size,
  width,
  height,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number | string }) {
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
      <g id="progress-75-pink-Group">
        <path
          id="progress-75-pink-Ellipse"
          d="M12 23C14.1756 23 16.3023 22.3549 18.1113 21.1462C19.9202 19.9375 21.3301 18.2195 22.1627 16.2095C22.9952 14.1995 23.2131 11.9878 22.7886 9.85401C22.3642 7.72022 21.3166 5.76021 19.7782 4.22183C18.2398 2.68345 16.2798 1.6358 14.146 1.21137C12.0122 0.78693 9.80047 1.00477 7.79048 1.83733C5.7805 2.66989 4.06253 4.07979 2.85383 5.88873C1.64514 7.69767 1 9.82441 1 12"
          stroke="#D80BBA"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          id="progress-75-pink-Vector"
          d="M15.6094 9.14551C15.8987 8.87095 16.3522 8.87098 16.6416 9.14551L16.79 9.28516C17.1017 9.58091 17.1017 10.0783 16.79 10.374L11.0127 15.8545C10.7233 16.129 10.2698 16.1291 9.98047 15.8545L7.20996 13.2256C6.89859 12.9298 6.89841 12.4334 7.20996 12.1377L7.3584 11.9981C7.64779 11.7235 8.10124 11.7235 8.39062 11.9981L10.3252 13.833C10.4217 13.9244 10.5725 13.9245 10.6689 13.833L15.6094 9.14551Z"
          fill="#D80BBA"
          stroke="#D80BBA"
          strokeWidth="0.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
