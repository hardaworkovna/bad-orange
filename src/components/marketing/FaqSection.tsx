import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { cn } from "@/lib/cn";
import { PLANS_FAQ, PLANS_FAQ_TITLE, type FaqItem } from "@/lib/content";

/**
 * Figma: Plans page ✅ → "Questions?  We got you." 113:2182 (1440: heading at
 * x=100 in a 419px column, rows 712px wide starting at x=628, 20px apart, the
 * last one open) and 351:8898 (390: heading then rows 350px wide, 16px apart).
 */
export function FaqSection({ items = PLANS_FAQ, className }: { items?: readonly FaqItem[]; className?: string }) {
  const heading = (
    <h2 className="type-h2 m-0 uppercase">
      <span className="text-red">{PLANS_FAQ_TITLE.accent}</span>
      <br />
      <span className="text-white">{PLANS_FAQ_TITLE.rest}</span>
    </h2>
  );

  return (
    <section className={cn("w-full", className)} aria-labelledby="faq-heading">
      {/* desktop: two columns, heading left */}
      <div className="mx-auto hidden max-w-[1440px] px-[100px] md:block">
        <div className="flex items-start gap-[109px]">
          <div id="faq-heading" className="w-[419px] shrink-0 opacity-90">
            {heading}
          </div>
          <Accordion className="w-[712px] gap-5">
            {items.map((item, i) => (
              <AccordionItem key={item.question} question={item.question} defaultOpen={i === items.length - 1}>
                {item.answer}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* mobile: heading above the list */}
      <div className="px-page-x-mobile flex flex-col gap-8 md:hidden">
        <div className="opacity-90">{heading}</div>
        <Accordion className="gap-4">
          {items.map((item, i) => (
            <AccordionItem key={item.question} question={item.question} defaultOpen={i === items.length - 1}>
              {item.answer}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
