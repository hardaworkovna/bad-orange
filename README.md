# BAd Orange — Daddy Sounds

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Storybook 10.

Figma is the visual authority: https://www.figma.com/design/rjr5fYd7zrN1jGSxy4QEVK (page **Design system**).
Code matches Figma; it does not reinterpret it.

## Scripts

| Command                   | What it does                                |
| ------------------------- | ------------------------------------------- |
| `npm run dev`             | Next dev server                             |
| `npm run storybook`       | Storybook on http://localhost:6006          |
| `npm run build`           | Production build of the app                 |
| `npm run build-storybook` | Static Storybook in `storybook-static/`     |
| `npm run lint`            | ESLint                                      |
| `node scripts/build-icons.mjs` | Regenerate icon components from `src/icons/svg` |

## Where things live

- `src/app/globals.css` — **the design tokens** (Tailwind `@theme`): colours, type styles, radii, shadows, gradients, breakpoints. Nothing in `src/components` hardcodes a value that exists here.
- `src/components/ui/*` — primitives from the Figma Design System page. Each file's header comment names the Figma component and variants it implements.
- `src/components/layout/*` — Header, Footer, Logo.
- `src/icons/svg/*.svg` — icons exported from Figma verbatim; `src/icons/generated/*` — React components built from them.
- `src/stories/*` — Storybook: Foundations (colours, typography, icons), Components, Layout. Every Figma variant/state has a story.
- `public/fonts` — self-hosted Special Gothic Expanded One + Host Grotesk (Google Fonts, OFL).

## Conventions

- Text styles: use the `type-*` utilities (`type-h1`, `type-body-lg`, `type-label-18`, …) — they carry the mobile size by default and the 1440 size from `md`.
- Colours: `text-white-60`, `bg-white-10`, `border-stroke`, `bg-red`, `bg-gradient-red`, … from the theme. No raw hex in components.
- Component states: real CSS states (`hover:`, `active:`, `disabled:`) plus a Storybook-only `forceState` prop so every Figma state can be rendered without interaction.
