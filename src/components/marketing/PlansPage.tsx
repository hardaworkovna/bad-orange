import { cn } from "@/lib/cn";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { IconArrowInline } from "@/icons/generated";
import { HeroGradient } from "./HeroGradient";
import { PlanCard } from "./PlanCard";
import { FaqSection } from "./FaqSection";
import { CtaBanner } from "./CtaBanner";
import { PLANS, PLANS_HERO, type Membership } from "@/lib/content";

/**
 * Figma: Plans page ✅ → "1440/Home" 110:1019 (Not registered) / 119:1277
 * (Free membership) / 119:1436 (Premium user) and "Mobile/Plans" 351:8818 /
 * 351:8617 / 351:3782.
 *
 * The three states differ in exactly three places: the header cluster, the
 * yearly card (ribbon, CTA and next-billing line), and the free-trial link,
 * which only a guest sees. Everything below the cards is identical.
 *
 * Mobile puts the yearly card first; desktop puts monthly on the left.
 */
export type PlansPageProps = {
  membership?: Membership;
  /** Figma 119:1436 shows a concrete date under "Manage subscription". */
  nextBilling?: string;
  className?: string;
};

export function PlansPage({ membership = "guest", nextBilling, className }: PlansPageProps) {
  const monthly = PLANS.find((p) => p.id === "monthly")!;
  const yearly = PLANS.find((p) => p.id === "yearly")!;
  const premium = membership === "premium";

  return (
    <div className={cn("flex min-h-screen flex-col bg-black", className)}>
      <div className="relative">
        {/* Figma places the glow behind the hero: 1440 → y 227, height 761. */}
        <HeroGradient className="top-[534px] h-[291px] md:top-[227px] md:h-[761px]" />

        <div className="relative">
          <Header user={membership} currentPath="/plans" />

          {/* ---------- hero ---------- */}
          <div className="px-page-x-mobile md:px-page-x mx-auto mt-[32px] w-full max-w-[1440px] md:mt-[100px]">
            <div className="flex flex-col items-start gap-10 md:items-center md:gap-20">
              <div className="flex flex-col gap-4 md:max-w-[572px] md:items-center md:gap-8 md:text-center">
                <h1 className="type-h1 text-white-90 m-0">
                  <span className="text-red">{PLANS_HERO.titleAccent}</span>
                  {PLANS_HERO.titleRest}
                </h1>
                <p className="type-body-lg text-white-80 m-0 max-w-[296px] md:max-w-none md:whitespace-nowrap">
                  {PLANS_HERO.subtitle}
                </p>
              </div>

              {/* ---------- plan cards ---------- */}
              {/* desktop: monthly, yearly */}
              <div className="hidden w-[1027px] items-center justify-between md:flex">
                <PlanCard plan={monthly} layout="desktop" />
                <PlanCard
                  plan={yearly}
                  layout="desktop"
                  owned={premium}
                  nextBilling={premium ? nextBilling : undefined}
                />
              </div>
              {/* mobile: yearly first */}
              <div className="flex w-full flex-col gap-4 md:hidden">
                <PlanCard
                  plan={yearly}
                  layout="mobile"
                  owned={premium}
                  nextBilling={premium ? nextBilling : undefined}
                />
                <PlanCard plan={monthly} layout="mobile" />
              </div>
            </div>

            {/* ---------- guest-only free trial ---------- */}
            {membership === "guest" && (
              <>
                <a
                  href={PLANS_HERO.freeHref}
                  className="type-body-lg mx-auto mt-[60px] hidden w-fit items-center gap-1 text-white opacity-60 transition-opacity outline-none hover:opacity-100 focus-visible:opacity-100 md:flex"
                >
                  {PLANS_HERO.freeLinkDesktop}
                  <IconArrowInline className="shrink-0" />
                </a>
                <div className="mt-8 flex flex-col items-center gap-4 md:hidden">
                  <span className="type-body-lg text-white-60">{PLANS_HERO.freeCaptionMobile}</span>
                  <Button href={PLANS_HERO.freeHref} variant="secondary" fullWidth>
                    {PLANS_HERO.freeButtonMobile}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ---------- FAQ ---------- */}
      <FaqSection className="mt-[80px] md:mt-[138px]" />

      {/* ---------- closing CTA ---------- */}
      <CtaBanner className="mt-[176px] md:mt-[176px]" />

      <Footer className="mt-[80px] md:mt-[100px]" />
    </div>
  );
}
