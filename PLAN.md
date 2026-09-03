# BAd Orange Design — Build Plan (Figma → Next.js)

Status: Phase 0 + Phase 1 built · updated 3 Sep 2026. The living copy of this plan is the Claude project doc `claude/build-plan.md` (project "BAd Orange Design"); this file mirrors it at each phase boundary.

## Decisions so far

- Product: paid ~10-minute audio stories for adults (18+), browsed by category, played on site, gated behind plans.
- Stack: Next.js 16 (App Router) + TypeScript + Tailwind v4 (CSS-first `@theme`) + Storybook 10 (`@storybook/nextjs-vite`). Supabase Auth for login. Payment provider deferred (Stripe bans mature-audience content); checkout is built behind a thin provider interface and mocked until a processor is chosen. Deploy target assumed Vercel (confirm; Vercel's AUP bans "obscene, graphic" content — worth a support ticket before launch).
- Figma is the visual authority. Code matches Figma; it does not reinterpret it. File `rjr5fYd7zrN1jGSxy4QEVK`, page "Design system ✅".
- Fonts: Special Gothic Expanded One (display) + Host Grotesk (text), self-hosted in `public/fonts`.
- Audio hosting: not decided. The player is built against local sample files behind a pluggable source.

## Phase status

- Phase 0 — done (scaffold, ESLint/Prettier, CI: lint, tsc, app build, Storybook build). Vercel not connected yet.
- Phase 1 — built, awaiting review in Storybook (`npm run storybook`). Tokens in `src/app/globals.css`; icons in `src/icons`; primitives in `src/components/ui`, layout in `src/components/layout`; stories in `src/stories`.

## Phase 1 — built vs. Figma

Built, with a story per Figma variant/state: Button (Primary White / Primary Red / Secondary / Third × Default/Hover/Active/Disabled; Secondary/Mobile), See-all link, Arrow / glow icon buttons, Close, Continue with Google/Email/Apple, Search (desktop + active), Field (Default/Hovered/Typing/Disabled/Filled/Failed), Field dropdown + Popup menu, Field type of payment (Card/Google Pay × 4 states), Field for card, radio, checkbox, Toggle (Public/Privacy), Format tab (Audio/Video), Tabs desktop + mobile, Filters (all 5), Mobile/Filter, Filter/Selected chip, Reaction tags (selected + default), category chip, Free/Locked, lock/premium tiles, Best value, Badges for Activity ×4, avatar + 18+ avatar, info icon states + tooltip, pagination dots, Pop-up/Delete comment, Account/Settings, Pop-up/Reactions, FAQ question Default/Opened, Category tiles (3 sizes), 1440 headers (Inkognito / Premium / Free), 390 header, footers 1440 / 390.

Not built in Phase 1 (composites for later phases): Card/Secondary, Card Main, Item play, Popular audio, Play bar + Pause/Play buttons (Phase 3), Comment components, Feedback/Form sections, About-page Benefits frames, GD graphics, 390/Menu, Tape graphics.

Known gaps to confirm:
1. Grids frame does not export column info via MCP — layout tokens set from headers/footers (1440: 60px header padding, 1220px content width; 390: 20px). Column count/gutter still needed.
2. Category tiles: only Dom Daddy and Spicy palettes read; the other 19 are read when the Categories page is built.
3. Logo is a PNG export (190×40 / 120×25 @2x); SVG preferred.
4. Field "Filled" state and mobile FAQ are implemented from the desktop spec (responsive), not read separately.
5. Payment option selected state: Figma turns the card icon white; code keeps the exported gray glyph.

## Open decisions

1. Which Figma frames are final (About, Check out, Audio Library, Account settings, Verify-age pop-up, Home/Mobile, Mobile categories live on Drafts).
2. Payment provider (CCBill, Segpay, Epoch, Verotel) and what a "plan" is.
3. Where audio files live.
4. How stories get added over time.
5. Deploy target and domain (Vercel assumed).

## Phases

- Phase 0 — Setup — done except Vercel.
- Phase 1 — Design system — built, review pending. Check: open Storybook next to Figma and approve components one by one.
- Phase 2 — Public shell and pages: content model (Story, Category) + mock data; Landing, About, Category pages. Check: preview URL at each breakpoint vs. Figma.
- Phase 3 — Audio player: Play bar variants, Pause/Play buttons, all states, `getAudioSrc(story)` interface. Check: works on desktop Safari/Chrome and iOS Safari.
- Phase 4 — Auth: Supabase Auth, login page and popups. Check: sign up / in / out / reset.
- Phase 5 — Plans, checkout, confirmation, account against a `PaymentProvider` interface with a mock. Check: full test-mode purchase.
- Phase 6 — Content gating and content management.
- Phase 7 — Harden and launch.

## How each Figma → code step runs

Pull the Figma node via MCP, list tokens and components it uses (flagging anything not in the design system), build, screenshot at each breakpoint, compare side by side with Figma, fix every difference in one batch, then stop polishing.
