# BAd Orange Design — Build Plan (Figma → Next.js)

Status: confirmed · updated 2 Sep 2026 after reading the Figma file

## Decisions so far

- Product: paid ~10-minute audio stories, browsed by category, played on site, gated behind plans.
- Stack: Next.js + TypeScript + Tailwind. Storybook for the component layer. Supabase Auth for login. Payment provider deferred (see open decision 2): Stripe was the first pick, but Stripe's prohibited-businesses list bans mature-audience content, so checkout is built behind a thin provider interface and mocked until a processor is chosen. Repo: https://github.com/hardaworkovna/bad-orange. Deploy target assumed Vercel (confirm; Vercel's AUP bans "obscene, graphic" content — worth a support ticket before launch).
- Figma is the visual authority. Code matches Figma; it does not reinterpret it.
- Audio hosting: not decided. The player is built against local sample files behind a pluggable source so this never blocks UI work.

## Open decisions (needed before the phase that uses them)

1. Which Figma frames are final. The file has four pages (Design system ⚙️, Plans page ✅, Comments ✅, Drafts); About, Check out, Audio Library, Account settings, Verify-age pop-up, Home/Mobile and Mobile categories live on Drafts among wireframes and screenshots. Yasya to move final screens to a Screens page or mark them ✅. Needed before each page's phase.
2. Payment provider (adult-content-friendly: CCBill, Segpay, Epoch, Verotel are the usual options) and what a "plan" is: monthly subscription, one-time bundle of stories, or both. Needed for Phase 5; it changes the checkout integration and the account page.
3. Where audio files live (Supabase Storage / S3 with signed URLs vs. third-party embed). Needed for Phase 6.
4. How stories get added over time: a Supabase table you edit in the dashboard, or a small admin page. Needed for Phase 6.
5. Deploy target and domain. Needed for Phase 0 (Vercel assumed).

## Phases

Each phase ends with a check you can do yourself, and nothing in a later phase starts before that check passes.

### Phase 0 — Setup (no UI yet)

Connect the Figma connector in this session. Create the GitHub repo and scaffold Next.js (App Router) + TypeScript + Tailwind + Storybook, with Prettier/ESLint and a CI check that Storybook and the app both build. Connect Vercel so every push gets a preview URL. Commit PRODUCT.md and this plan.

Check: preview URL loads a blank app; Storybook builds; Figma MCP returns the Design System page.

### Phase 1 — Design system

Read the Figma Design System page and extract tokens: color, type scale (family, size, weight, line-height, letter-spacing), spacing, radii, shadows, breakpoints. Write them into the Tailwind theme as the single source; no hardcoded values allowed after this point. Export icons as SVG components and photo assets through Next's image pipeline once.

Then build the primitives that appear on the Design System page — expected set: Button, IconButton, Input, Select, Checkbox/Toggle, Badge/Tag, Card, Modal/Popup shell, Toast, Tabs, Avatar, Nav, Footer — each with a story covering every Figma variant and state (default, hover, focus, active, disabled, loading, error). Optionally add Figma Code Connect so each Figma component points at its code component.

Check: you open Storybook next to Figma and approve components one by one. This is the most important review in the whole project — everything after is composition.

### Phase 2 — Public shell and pages

Define the content model now, before any page needs it: Story {id, slug, title, category, durationSec, coverImage, audioUrl, isFree, publishedAt}, Category {id, slug, name, coverImage, description}. Seed it with mock data.

Build the app shell (Nav, Footer, page layout, responsive grid), then Landing, About, and Category pages from primitives plus page-specific sections. Real copy from Figma verbatim; placeholder text flagged.

Check: preview URL shows all three pages at each breakpoint; side-by-side screenshots against Figma with every difference listed and fixed.

### Phase 3 — Audio player

Its own phase because it is the only component with real logic. Custom player matching the Figma design: play/pause, seek, progress, remaining time, volume, previous/next within a category, keyboard controls (space, arrows), remembers position per story, persistent mini-player if Figma has one. States: idle, loading, playing, paused, buffering, error, locked (unpaid). Source is an interface (`getAudioSrc(story)`) that returns local sample files now and signed URLs later.

Check: Storybook stories for every state; plays on desktop Safari/Chrome and iOS Safari (iOS has autoplay and background rules that bite late).

### Phase 4 — Auth

Supabase project, Supabase Auth (email + password; magic link or Google if Figma shows them). Login page and the popups from the "Login + Popups" Figma page, built to your design rather than Supabase's prebuilt UI. Session handling in Next middleware; protected routes for Account and paid stories.

Check: sign up, log in, log out, reset password, all matching the Figma popups; unauthenticated user hitting a protected route gets the designed experience, not a redirect flash.

### Phase 5 — Plans, checkout, confirmation, account

Products matching the Plans page in the chosen processor. Checkout UI built from the Figma Check out page against a `PaymentProvider` interface (createCheckout, getSession, handleWebhook) with a mock implementation; the real adapter is written once the processor is chosen. Provider webhook writes entitlements to Supabase. Confirmation page reads the completed session. Account page: current plan, purchase history, billing portal link, profile, sign out.

Check: full test-mode purchase end to end with the real processor; refund/cancel reflected in the account; every Figma state of the Plans cards (current, upgrade, popular) rendered.

### Phase 6 — Content gating and content management

Once the audio host is chosen: move sample files there, serve signed URLs only to entitled users, `isFree` stories stay open. Set up the way you will add stories (Supabase table or admin page). Migrate mock data to real stories.

Check: unpaid user cannot fetch a paid file by URL; new story added through the chosen process appears on the site without a deploy.

### Phase 7 — Harden and launch

Responsive pass on every page, accessibility (keyboard, focus order, contrast, alt text, player announced to screen readers), SEO and Open Graph per page, analytics, 404 and error pages, empty states (no stories in a category, no purchases yet), performance budget (images, fonts, player bundle). Final visual diff against Figma.

Check: Lighthouse and a manual a11y pass; one full run-through as a new visitor on a phone.

## How each Figma → code step runs

For each page or component: pull the Figma node via MCP, list tokens and components it uses (flagging anything not in the design system as a decision for you), build, screenshot at each breakpoint, compare side by side with Figma, fix every difference in one batch, then stop polishing.

## What I need from you to start Phase 0

1. The Figma file link (and which page/frame is the Design System).
2. The Figma connector enabled in this session.
3. GitHub access to create the repo (or the org/account name and I'll ask for the connection).
4. Confirmation that Vercel is the deploy target.

Supabase and Stripe accounts are not needed until Phases 4 and 5.
