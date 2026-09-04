import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PlansPage } from "@/components/marketing/PlansPage";

/**
 * Figma: page "Plans page ✅".
 * Desktop 1440/Home — 110:1019 (Not registered), 119:1277 (Free membership),
 * 119:1436 (Premium user). Mobile/Plans — 351:8818, 351:8617, 351:3782.
 * Resize the canvas to cross 768px and the page switches breakpoints.
 */
const meta: Meta<typeof PlansPage> = {
  title: "Pages/Plans",
  component: PlansPage,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof PlansPage>;

/** Figma 110:1019 / 351:8818 — the only state with the free-trial call to action. */
export const Guest: Story = { args: { membership: "guest" } };

/** Figma 119:1277 / 351:8617 — avatar + Upgrade in the header, no free-trial line. */
export const FreeUser: Story = { args: { membership: "free" } };

/** Figma 119:1436 / 351:3782 — "Your current plan", "Manage subscription", next billing date. */
export const PremiumUser: Story = {
  args: { membership: "premium", nextBilling: "Next billing: May 23, 2027" },
};
