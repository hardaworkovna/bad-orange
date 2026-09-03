import type { SVGProps } from "react";

/** Figma: Design system → Icons → "progress-50-orange" (24×24) */
export function IconProgress50Orange({
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
      <g id="progress-50-orange-Group">
        <path
          id="progress-50-orange-Ellipse"
          d="M12 1.00001C13.4445 1.00001 14.8749 1.28454 16.2095 1.83734C17.5441 2.39014 18.7567 3.20039 19.7781 4.22184C20.7996 5.24328 21.6098 6.45591 22.1626 7.79049C22.7154 9.12508 23 10.5555 23 12C23 13.4446 22.7154 14.8749 22.1626 16.2095C21.6098 17.5441 20.7996 18.7567 19.7781 19.7782C18.7567 20.7996 17.5441 21.6099 16.2095 22.1627C14.8749 22.7155 13.4445 23 12 23"
          stroke="#FF5213"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          id="progress-50-orange-Vector"
          d="M15.8857 8.89551C16.0322 8.80288 16.2198 8.80275 16.3662 8.89551L16.4355 8.94922L17.0195 9.50293C17.2064 9.68038 17.2065 9.97883 17.0195 10.1562L10.8066 16.0508C10.6331 16.2154 10.3611 16.2153 10.1875 16.0508L6.98047 13.0088C6.79352 12.8314 6.79364 12.5329 6.98047 12.3555L7.56445 11.8018L7.63379 11.748C7.7802 11.6552 7.96779 11.6554 8.11426 11.748L8.18359 11.8018L10.4961 13.9961L15.8164 8.94922L15.8857 8.89551Z"
          fill="#FF5213"
          stroke="#FF5213"
          strokeWidth="0.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
