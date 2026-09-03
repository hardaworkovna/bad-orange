/**
 * Turns every SVG in src/icons/svg into a typed React component in
 * src/icons/generated, plus an index. Run: `node scripts/build-icons.mjs`.
 *
 * The SVGs are exported from Figma verbatim (Design system → Icons).
 * Geometry is preserved: each component defaults to the icon's own
 * viewBox size, so a 24px icon renders at 24px unless you pass `size`.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, basename } from "node:path";

const SRC = new URL("../src/icons/svg/", import.meta.url).pathname;
const OUT = new URL("../src/icons/generated/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const pascal = (s) =>
  s
    .split(/[-_]/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");

const attrMap = {
  "fill-opacity": "fillOpacity",
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-opacity": "strokeOpacity",
  "stop-color": "stopColor",
  "stop-opacity": "stopOpacity",
  "clip-path": "clipPath",
  "clip-rule": "clipRule",
  "fill-rule": "fillRule",
  "color-interpolation-filters": "colorInterpolationFilters",
  "flood-opacity": "floodOpacity",
  "flood-color": "floodColor",
  "stroke-dasharray": "strokeDasharray",
  "stroke-miterlimit": "strokeMiterlimit",
  "font-family": "fontFamily",
  "font-size": "fontSize",
  "font-weight": "fontWeight",
  "text-anchor": "textAnchor",
  gradientUnits: "gradientUnits",
  gradientTransform: "gradientTransform",
  "xlink:href": "xlinkHref",
};

const files = readdirSync(SRC)
  .filter((f) => f.endsWith(".svg"))
  .sort();
const names = [];

for (const file of files) {
  const slug = basename(file, ".svg");
  const name = "Icon" + pascal(slug);
  let svg = readFileSync(join(SRC, file), "utf8").trim();

  const viewBox = /viewBox="([^"]+)"/.exec(svg)?.[1] ?? "0 0 24 24";
  const [, , vw, vh] = viewBox.split(/\s+/).map(Number);

  // inner markup
  let inner = svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  // drop Figma-specific attributes and inline style
  inner = inner.replace(/\s(preserveAspectRatio|style|overflow)="[^"]*"/g, "");
  // JSX attribute names
  for (const [k, v] of Object.entries(attrMap)) {
    inner = inner.replaceAll(` ${k}=`, ` ${v}=`);
  }
  // Scope ids so two icons on one page don't collide
  inner = inner.replace(/id="([^"]+)"/g, (_, id) => `id="${slug}-${id}"`);
  inner = inner.replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${slug}-${id})`);
  inner = inner.replace(/xlinkHref="#([^"]+)"/g, (_, id) => `xlinkHref="#${slug}-${id}"`);
  // self-closing tags are already fine; comments → remove
  inner = inner.replace(/<!--[\s\S]*?-->/g, "");

  const tsx = `import type { SVGProps } from "react";

/** Figma: Design system → Icons → "${slug}" (${vw}×${vh}) */
export function ${name}({ size, width, height, ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) {
  return (
    <svg
      viewBox="${viewBox}"
      width={width ?? size ?? ${vw}}
      height={height ?? size ?? ${vh}}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
${inner
  .split("\n")
  .filter((l) => l.trim())
  .map((l) => "      " + l.trim())
  .join("\n")}
    </svg>
  );
}
`;
  writeFileSync(join(OUT, `${name}.tsx`), tsx);
  names.push(name);
}

writeFileSync(join(OUT, "index.ts"), names.map((n) => `export { ${n} } from "./${n}";`).join("\n") + "\n");
console.log(`Generated ${names.length} icon components`);
