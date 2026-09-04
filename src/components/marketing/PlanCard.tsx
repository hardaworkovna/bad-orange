import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { IconCheckRed, IconBestValue } from "@/icons/generated";
import { BEST_VALUE_LABEL, CURRENT_PLAN_LABEL, type Plan } from "@/lib/content";

/**
 * Figma: Plans page ✅ → "1440/Home" 111:1460 (Monthly) / 111:1461 (Yearly) and
 * "Mobile/Plans" 351:8868 / 351:8831.
 *
 * Desktop is a fixed 500×543 card whose three blocks sit at the exact Figma
 * offsets (39/38 from the left; 59/58, 172/171 and 267/266 from the top), so
 * the layout does not drift when copy changes length. Mobile is the same card
 * as a plain 24px-padded column, which is how Figma builds it at 390.
 */

export type PlanCardProps = {
  plan: Plan;
  /** The viewer already holds this plan: ribbon and CTA change. */
  owned?: boolean;
  /** Shown under the CTA when `owned`. */
  nextBilling?: string;
  layout?: "auto" | "desktop" | "mobile";
  className?: string;
};

function Features({ features, gap }: { features: readonly string[]; gap: "0" | "2" }) {
  return (
    <ul className={cn("m-0 flex list-none flex-col p-0", gap === "2" && "gap-[2px]")}>
      {features.map((f) => (
        <li key={f} className="flex items-center gap-1">
          <IconCheckRed className="shrink-0" />
          <span className="type-body-md text-white-80">{f}</span>
        </li>
      ))}
    </ul>
  );
}

function Divider() {
  return <hr className="bg-white-20 m-0 h-px w-full border-0" />;
}

function Ribbon({ owned, size }: { owned?: boolean; size: "desktop" | "mobile" }) {
  const desktop = size === "desktop";
  return (
    <div
      className={cn(
        "bg-gradient-red absolute top-[-2px] left-1/2 -translate-x-1/2 overflow-hidden rounded-b-[12px]",
        desktop ? "h-[34px]" : "h-[26px]",
        owned ? "px-3" : desktop ? "w-36" : "w-[122px]",
      )}
    >
      <span
        className={cn(
          "flex h-full items-center justify-center text-center whitespace-nowrap text-white uppercase",
          desktop ? "type-body-md gap-[5px]" : "gap-1 text-[14px] leading-[1.2]",
        )}
      >
        {!owned && <IconBestValue size={desktop ? 17 : 16} className="shrink-0" />}
        {owned ? CURRENT_PLAN_LABEL : BEST_VALUE_LABEL}
      </span>
    </div>
  );
}

export function PlanCard({ plan, owned, nextBilling, layout = "auto", className }: PlanCardProps) {
  const highlighted = Boolean(plan.highlighted);
  const cta = owned && plan.ctaOwned ? plan.ctaOwned : plan.cta;
  const shell = highlighted ? "border-stroke border-2" : "border-white-15 border";

  /* ---------------- desktop: exact Figma offsets ---------------- */
  const desktop = (
    <div
      className={cn(
        "relative h-[543px] w-[500px] shrink-0 overflow-hidden rounded-xl bg-black",
        shell,
        layout === "auto" ? "hidden md:block" : "",
      )}
    >
      {highlighted && <Ribbon owned={owned} size="desktop" />}

      <div className={cn("absolute top-[58px] flex flex-col gap-5", highlighted ? "left-[38px]" : "left-[39px]")}>
        <h3
          className={cn(
            "type-h2 m-0 uppercase",
            highlighted ? "bg-gradient-red bg-clip-text text-transparent" : "text-white",
          )}
        >
          {plan.name}
        </h3>
        <p className="type-body-lg text-white-80 m-0 w-[420px]">{plan.tagline}</p>
      </div>

      <div
        className={cn(
          "absolute flex flex-col gap-4",
          highlighted ? "top-[171px] left-[38px] w-[280px]" : "top-[172px] left-[39px]",
        )}
      >
        <p className="text-white-90 m-0 flex items-end gap-[2px] whitespace-nowrap">
          <span className="font-display cap-trim text-white-90 leading-[0.9] tracking-[0.25px] uppercase">
            <span className="text-[25px]">{plan.currencySymbol}</span>
            <span className={highlighted ? "text-[40px]" : "text-[44px]"}>{plan.amount}</span>
          </span>
          <span className="type-body-md text-white-60">{plan.period}</span>
        </p>
        {plan.note && <span className="type-body-md text-white-60">{plan.note}</span>}
      </div>

      <div
        className={cn(
          "absolute flex w-[420px] flex-col gap-8",
          highlighted ? "top-[266px] left-[38px]" : "top-[267px] left-[39px]",
        )}
      >
        <div className="flex flex-col gap-5">
          <Divider />
          <Features features={plan.features} gap="2" />
        </div>
        <div className="flex flex-col gap-3">
          <Button
            href="/checkout"
            variant={highlighted ? "primary-red" : "primary-white"}
            fullWidth
            className={highlighted ? "h-[70px]" : "h-[60px]"}
          >
            {cta}
          </Button>
          {owned && nextBilling && <span className="type-body-md text-white-60 text-center">{nextBilling}</span>}
        </div>
      </div>
    </div>
  );

  /* ---------------- mobile: plain column ---------------- */
  const mobile = (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl bg-black",
        shell,
        highlighted ? "px-6 pt-[42px] pb-[42px]" : "px-[25px] pt-[39px] pb-[39px]",
        layout === "auto" ? "md:hidden" : "",
      )}
    >
      {highlighted && <Ribbon owned={owned} size="mobile" />}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h3 className={cn("type-h2 m-0 uppercase", highlighted ? "text-red" : "text-white")}>{plan.name}</h3>
            <p className="type-body-lg text-white-80 m-0">{plan.tagline}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="m-0 flex items-end gap-[2px]">
              <span className="font-display cap-trim text-white-90 leading-[0.9] tracking-[0.25px] uppercase">
                <span className="text-[25px]">{plan.currencySymbol}</span>
                <span className="text-[26px]">{plan.amount}</span>
              </span>
              <span className="type-body-md text-white-60">{plan.period}</span>
            </p>
            {plan.note && <span className="type-body-md text-white-60">{plan.note}</span>}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <Divider />
          <Features features={plan.features} gap="0" />
        </div>
        <div className="flex flex-col gap-3">
          <Button
            href="/checkout"
            variant={highlighted ? "primary-red" : "primary-white"}
            fullWidth
            className="h-[60px]"
          >
            {cta}
          </Button>
          {owned && nextBilling && <span className="type-body-md text-white-60 text-center">{nextBilling}</span>}
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn("contents", className)}>
      {layout !== "mobile" && desktop}
      {layout !== "desktop" && mobile}
    </div>
  );
}
