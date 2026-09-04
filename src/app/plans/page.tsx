import type { Metadata } from "next";
import { PlansPage } from "@/components/marketing/PlansPage";

export const metadata: Metadata = {
  title: "Plans — Daddy Sounds",
  description: "Monthly and yearly access to the full Daddy Sounds library.",
};

/**
 * Figma: Plans page ✅ → "1440/Home" / "Mobile/Plans".
 * The membership state is hard-coded to "guest" until Phase 4 wires up auth.
 */
export default function Page() {
  return <PlansPage membership="guest" />;
}
