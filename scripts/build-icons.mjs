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
  // Ids that something inside the icon actually points at (gradients, masks,
  // filters, clip paths). Figma also puts an id on every layer; those are inert.
  const referenced = new Set();
  for (const m of inner.matchAll(/url\(#([^)]+)\)/g)) referenced.add(m[1]);
  for (const m of inner.matchAll(/xlink:href="#([^"]+)"/g)) referenced.add(m[1]);
  const needsUid = referenced.size > 0;

  // Scope ids so two icons on one page don't collide. When the icon has internal
  // references, the prefix has to be unique per *instance* too: React renders the
  // desktop and mobile trees of a page at the same time, and a duplicate gradient
  // id makes the second copy resolve to the hidden first one and paint nothing.
  const prefix = needsUid ? "${uid}" : `${slug}-`;
  const wrap = (id) => (needsUid ? `{\`${prefix}${id}\`}` : `"${prefix}${id}"`);
  inner = inner.replace(/id="([^"]+)"/g, (_, id) => `id=${wrap(id)}`);
  inner = inner.replace(/url\(#([^)]+)\)/g, (_, id) => (needsUid ? `url(#\${${"uid"}}${id})` : `url(#${slug}-${id})`));
  inner = inner.replace(/xlinkHref="#([^"]+)"/g, (_, id) =>
    needsUid ? `xlinkHref={\`#${prefix}${id}\`}` : `xlinkHref="#${slug}-${id}"`,
  );
  // fill="url(#…)" etc. become JSX expressions when they carry the uid
  if (needsUid) {
    inner = inner.replace(/="(url\(#\$\{uid\}[^"]*\))"/g, "={`$1`}");
  }
  // self-closing tags are already fine; comments → remove
  inner = inner.replace(/<!--[\s\S]*?-->/g, "");

  const tsx = `${needsUid ? '"use client";\n' : ""}import type { SVGProps } from "react";
${needsUid ? 'import { useId } from "react";\n' : ""}
/** Figma: Design system → Icons → "${slug}" (${vw}×${vh}) */
export function ${name}({ size, width, height, ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) {
${needsUid ? '  const uid = useId().replace(/[^a-zA-Z0-9]/g, "") + "-";\n' : ""}  return (
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
