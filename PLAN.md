# BAd Orange Design — Build Plan (Figma → Next.js)

Status: Phases 0–3 built · updated 4 Sep 2026. The living copy of this plan is the Claude project doc `claude/build-plan.md` (project "BAd Orange Design"); this file mirrors it at each phase boundary.

## Decisions so far

- Product: paid ~10-minute audio stories for adults (18+), browsed by category, played on site, gated behind plans.
- Stack: Next.js 16 (App Router) + TypeScript + Tailwind v4 (CSS-first `@theme`) + Storybook 10 (`@storybook/nextjs-vite`). Supabase Auth for login. Payment provider deferred (Stripe bans mature-audience content); checkout is built behind a thin provider interface and mocked until a processor is chosen. Deploy target assumed Vercel (confirm; Vercel's AUP bans "obscene, graphic" content — worth a support ticket before launch).
- Figma is the visual authority. Code matches Figma; it does not reinterpret it. File `rjr5fYd7zrN1jGSxy4QEVK`, page "Design system ✅".
- Fonts: Special Gothic Expanded One (display) + Host Grotesk (text), self-hosted in `public/fonts`.
- Audio hosting: not decided. The player is built against local sample files behind a pluggable source.

## Phase status

- Phase 0 — done (scaffold, ESLint/Prettier, CI: lint, tsc, app build, Storybook build). Vercel not connected yet.
- Phase 1 — built, awaiting review in Storybook (`npm run storybook`) or on the one-page reference (`npm run reference`). Tokens in `src/app/globals.css`; icons in `src/icons`; primitives in `src/components/ui`, layout in `src/components/layout`; stories in `src/stories`.
- Phase 2 — Plans page built (the "Plans page ✅" frames, named 1440/Home and Mobile/Plans in Figma), all three membership states, both breakpoints. Route `/plans`; `/preview/free` and `/preview/premium` render the other two states until auth lands in Phase 4. Storybook: Pages/Plans. The Audio Library, Categories and About pages wait on Figma frames being marked final (open decision 1).
- Phase 3 — audio engine built and wired to the Figma play bar. `src/lib/audio`; `PlayerDock` connects it; bench at `/preview/player`; Storybook: Components/Player bar.

## Phase 3 — audio player

`src/lib/audio` owns one `<audio>` element for the whole app, behind a context:

- `types.ts` — the state machine: idle · loading · playing · paused · buffering · error · locked, plus `formatTime`.
- `source.ts` — `getAudioSrc(story)`. Today it resolves `/audio/<slug>.mp3`; `setAudioSource` swaps in signed URLs when hosting is decided, and nothing else changes.
- `positions.ts` — resume where you stopped, per story, in `localStorage`. Ignores the first 5 seconds and the last 10, so a track is never resumed at its final breath.
- `AudioPlayerProvider.tsx` — the element, the state machine, prev/next over a queue, and the keyboard: Space play/pause, ←/→ ±15s, ↑/↓ volume, Home restart, M mute. Shortcuts stand down inside inputs, textareas, selects and contenteditable, and Space stands down on buttons and links where it is the activation key.

`PlayerBar` stays presentational — it is the component matched to Figma — and `PlayerDock` binds it to the engine.

Verified in a real browser at `/preview/player` with Playwright: play → `playing` at 0:02; forward-15 → 0:17; Space → `paused`; ← → 0:02; Space → `playing`; Next → the second track; a gated story → `locked` with the transport disabled; a missing file → `error` with the transport disabled; playing 9s then reloading the page resumed at 0:09.

Two bugs found and fixed during that pass:
1. `currentTime` assigned before `loadedmetadata` is silently dropped, so resume never worked on a fresh page load. The position is now held and applied when metadata arrives.
2. A page reload never runs React cleanup, so only the 5-second timer had written, and a position under 5 seconds is deliberately discarded — the net effect was that nothing was ever saved. `pagehide` and `visibilitychange` now write too.

Open for Yasya:
- Figma draws the play bar playing and paused only. Loading, buffering, error and locked reuse the Disabled transport variant and the caption slot under the scrubber (normally "Heatmap: Reactions intensity"). They may want their own art.
- Transport order is Figma's: prev · forward-15 · play/pause · back-15 · next. That is the reverse of the usual convention — confirm it is deliberate.
- `public/audio` holds three generated tones, and `SAMPLE_STORIES` three invented titles, only so the transport and the queue can be exercised. Real stories replace both.
- The play bar has no volume control in Figma, so volume is keyboard-only. Fine, or does it need one?

## Phase 2 — Plans page: built vs. Figma

Content model and copy in `src/lib/content.ts`; sections in `src/components/marketing`
(`PlansPage`, `PlanCard`, `FaqSection`, `CtaBanner`, `HeroGradient`).

Verified against Figma with Playwright at 1440 and 390 — every measured position is
within 8px of the frame:

| | Figma | built |
|---|---|---|
| desktop cards row | y 425 | 427 |
| desktop FAQ heading | y 1190 | 1190 |
| desktop CTA card | y 1987, 1028×483 | 1995, 1028×483 |
| desktop page height | 2827 | 2825 |
| mobile yearly card | y 289, 350×449 | 288, 350×449 |
| mobile monthly card | y 754, 350×416 | 753, 350×416 |
| mobile first FAQ row | y 1457, h 76 | 1456, h 76 |

Fixed along the way, in shared Phase 1 components:
1. Desktop header nav was pinned to the page centre; Figma 110:1076 lays the row out
   with space-between, so the nav sits between logo and buttons.
2. The 390 header had menu before search; Figma puts search first.
3. Icons with internal gradients painted nothing on the second instance on a page —
   the generator scoped ids per icon file, not per instance, so the mobile tree
   pointed at the hidden desktop copy's gradient. `scripts/build-icons.mjs` now adds a
   `useId()` prefix to the 15 icons that reference their own ids.
4. FAQ rows were 4px tall of Figma's: Figma draws its 2px stroke on the frame edge, so
   its 40px padding is measured from the outside.
5. Added a `cap-trim` utility for Figma's `[text-box-trim:trim-both]` on display type.

Known deviations:
- Host Grotesk renders ~6% wider in the browser than in Figma at the same size and
  weight (the font file is Google's variable Host Grotesk, 300–800, and the weights
  match), which costs one extra wrapped line in the longest FAQ answer and in the
  third mobile FAQ row. Worth eyeballing next to your Figma before we chase it.
- The FAQ answer box is 600 wide rather than Figma's 564, so that paragraph keeps
  Figma's three lines and the row keeps its 189px height.
- The footer renders 248 tall against Figma's 257; the Phase 1 footer component has
  not been re-read against its node.
- FAQ answers 1–3 are placeholder copy: Figma only fills in the fourth answer.

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
- Phase 2 — Public shell and pages — Plans page DONE; Audio Library / Categories / About wait on open decision 1. Check: preview URL at each breakpoint vs. Figma.
- Phase 3 — Audio player — BUILT. Remaining check: real devices (desktop Safari/Chrome and iOS Safari); the automated pass ran in Chromium only.
- Phase 4 — Auth: Supabase Auth, login page and popups. Check: sign up / in / out / reset.
- Phase 5 — Plans, checkout, confirmation, account against a `PaymentProvider` interface with a mock. Check: full test-mode purchase.
- Phase 6 — Content gating and content management.
- Phase 7 — Harden and launch.

## How each Figma → code step runs

Pull the Figma node via MCP, list tokens and components it uses (flagging anything not in the design system), build, screenshot at each breakpoint, compare side by side with Figma, fix every difference in one batch, then stop polishing.
