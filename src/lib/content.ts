/**
 * Content model + mock data for the public pages.
 *
 * Nothing here talks to a backend yet: Phase 2 renders the Figma pages from
 * these shapes so the swap to a real source is a change of one module.
 * Every string is copied verbatim from Figma (page "Plans page ✅").
 */

/* ------------------------------------------------------------------ */
/* Membership                                                          */
/* ------------------------------------------------------------------ */

/** Who is looking at the page. Matches Figma's three 1440/Home frames. */
export type Membership = "guest" | "free" | "premium";

export type PlanId = "monthly" | "yearly";

export type Plan = {
  id: PlanId;
  /** Figma: card title, uppercase display type. */
  name: string;
  /** Figma: line under the title. */
  tagline: string;
  /** Whole currency amount shown large, without the sign. */
  amount: string;
  currencySymbol: string;
  /** Figma: the small grey text next to the price. */
  period: string;
  /** Figma: second grey line under the price (yearly only). */
  note?: string;
  features: readonly string[];
  /** Call to action when the viewer does not hold this plan. */
  cta: string;
  /** Call to action when the viewer already holds this plan. */
  ctaOwned?: string;
  /** Figma marks the yearly card with the "Best value" ribbon. */
  highlighted?: boolean;
};

/** Figma 111:1462 — the four bullets are identical on both cards. */
export const PLAN_FEATURES = [
  "Full library — all audios unlocked",
  "New releases every week",
  "Stream on any device, no ads",
  "Cancel anytime",
] as const;

export const PLANS: readonly Plan[] = [
  {
    id: "monthly",
    name: "Monthly",
    tagline: "Billed monthly, cancel anytime.",
    currencySymbol: "$",
    amount: "25",
    period: "/ usd month (VAT excluded)",
    features: PLAN_FEATURES,
    cta: "Get monthly access",
  },
  {
    id: "yearly",
    name: "Yearly",
    tagline: "One payment. A full year of audio.",
    currencySymbol: "$",
    amount: "220",
    period: "/ year (VAT included)",
    note: "Only $18 / month",
    features: PLAN_FEATURES,
    cta: "Get annual access",
    ctaOwned: "Manage subscription",
    highlighted: true,
  },
];

export const BEST_VALUE_LABEL = "Best value";
/** Figma 119:1436 — replaces the "Best value" ribbon for a subscriber. */
export const CURRENT_PLAN_LABEL = "Your current plan";

/* ------------------------------------------------------------------ */
/* Plans page copy                                                     */
/* ------------------------------------------------------------------ */

export const PLANS_HERO = {
  /** Split so the first word can take the red colour Figma gives it. */
  titleAccent: "Everything",
  titleRest: " you want to hear",
  subtitle: "Join thousands of listeners who chose to go deeper.",
  /** Guest only. Desktop renders it as one line with a trailing arrow. */
  freeLinkDesktop: "Or start for free – 3 full audios, no card required",
  /** Guest only, mobile: a caption above a secondary button. */
  freeCaptionMobile: "3 full audios, no card required",
  freeButtonMobile: "Start for free",
  freeHref: "/signup",
} as const;

export type FaqItem = { question: string; answer: string };

/**
 * Figma 113:2182. The mobile frame shows a fifth row that repeats
 * "Is my subscription private?" collapsed above the opened one — a leftover
 * in the file, not a fifth question, so it is not reproduced here.
 */
export const PLANS_FAQ: readonly FaqItem[] = [
  {
    question: "Can I cancel anytime?",
    answer: "Yes. You keep access until the end of the period you already paid for, and you are not billed again.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "Major credit and debit cards. The available methods are shown at checkout.",
  },
  {
    question: "Can I switch from monthly to annual later?",
    answer: "Yes. Switching to annual applies at your next billing date and the annual rate takes over from there.",
  },
  {
    question: "Is my subscription private?",
    answer:
      'Yes. Your account and listening history are completely private. We do not share your personal data with third parties. Charges on your statement will appear as "Bad Orange LLC" — not Daddy Sounds.',
  },
];

export const PLANS_FAQ_TITLE = { accent: "Questions?", rest: "We got you" } as const;

export const PLANS_CTA = {
  title: "Start listening free",
  subtitle: "Curated stories, ready when you are",
  button: "Get membership",
  href: "/signup",
  image: "/art/cta-listening.jpg",
} as const;

/* ------------------------------------------------------------------ */
/* Library shapes — filled in when the Audio Library page is built     */
/* ------------------------------------------------------------------ */

export type Category = {
  slug: string;
  title: string;
  /** CSS gradient for the category tile, read from Figma per category. */
  gradient?: string;
};

export type Story = {
  slug: string;
  title: string;
  categorySlug: string;
  /** Runtime in seconds. */
  duration: number;
  free: boolean;
  coverSrc?: string;
};

/**
 * Placeholder library for Phase 3 — titles are invented and the audio in
 * `public/audio` is generated tone, only so the transport, the queue and
 * resume-where-you-stopped can be exercised. Real stories replace this wholesale.
 * `free: false` on the last one exercises the locked state.
 */
export const SAMPLE_STORIES: readonly Story[] = [
  { slug: "midnight-shift", title: "Midnight shift", categorySlug: "dom-daddy", duration: 40, free: true },
  { slug: "the-long-way-home", title: "The long way home", categorySlug: "spicy", duration: 60, free: true },
  { slug: "red-room", title: "Red room", categorySlug: "spicy", duration: 80, free: false },
];
