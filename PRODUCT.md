# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js + TypeScript + Tailwind (user's choice). Supabase Auth for login (user's choice). Payment provider deferred: Stripe was first chosen, then deferred because Stripe's prohibited-businesses list bans mature-audience content; checkout is built behind a provider interface and mocked until a processor is chosen. Storybook for the component layer (user's intent, confirmed in conversation). Deploy target: Vercel (assumed from the Next.js choice; not yet confirmed). Code lives in a new GitHub repo (user's choice).

## Users

Listeners who buy access to short audio stories (~10 minutes each). Situation and state of mind not yet confirmed — open decision. The audience is consumer, not B2B.

## Product Purpose

BAd Orange Design sells paid audio content: ~10-minute audio stories browsed by category, played in an on-site audio player, gated behind plans purchased through checkout and managed in an account area.

## Operating Context

The full design already exists in Figma, organized as: Design System; Landing Page; About Page + Audio Player + Category pages; Login + Popups; Plans; Checkout & Confirmation page; Account + Checkout; Photo assets. The Figma file is the visual authority; code must match it, not reinterpret it. The site is expected to keep growing after the first release.

## Capabilities and Constraints

- Pages in scope for v1: Landing, About, Category pages, Audio Player, Login + popups, Plans, Checkout, Confirmation, Account.
- Audio delivery: undecided (hosted files vs. third-party embed). The player must be built against local sample files with a pluggable source, and paid content must be gatable once the source is chosen.
- Auth: Supabase Auth. Payments: provider undecided (must accept adult content). What "plans" means (subscription tiers vs. one-time bundles) is undecided.
- The site is adult audio content (brand in Figma: Daddy Sounds). An age-verification gate (Figma: Pop-up/Verify age) is a launch requirement, and hosting/payment vendors must permit the category.
- Figma file: https://www.figma.com/design/rjr5fYd7zrN1jGSxy4QEVK/Bad-Orange-to-Claude — pages: Design system ⚙️ (308:1131), Plans page ✅ (110:1011), Comments ✅ (216:566), Drafts (0:1). Which Drafts frames are final is undecided.

## Brand Commitments

Name: BAd Orange Design (project); product brand in Figma: Daddy Sounds. Visual identity is fully defined in the Figma Design System page and is binding. Fonts: Special Gothic Expanded One (headings, tags) and Host Grotesk (body). Core colours: #FFFFFF, #7D7D7D, #121212, #F50C22.

## Evidence on Hand

- Figma file (link not yet provided) with the pages listed above and a Photo assets page.
- No audio files provided yet. No real copy confirmed beyond what is in Figma. Do not fabricate testimonials, story counts, prices, or plan names — take them from Figma or mark as placeholder.

## Product Principles

- The Figma file is the source of truth; fidelity to it outranks the builder's taste.
- Build the system before the pages: tokens, then components in Storybook, then screens.
- Keep the audio source and the payment provider behind thin interfaces so undecided facts do not block UI work.
- Every state the listener can hit (empty, loading, error, paid vs. unpaid) is designed, not improvised.
