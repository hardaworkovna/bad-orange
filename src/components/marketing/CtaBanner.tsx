import Image from "next/image";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { PLANS_CTA } from "@/lib/content";

/**
 * Figma: Plans page ✅ → "CTA" 312:2421 (1440: a 1028×483 card with a 2px
 * #FF6464 stroke; inside, a 422×323 image and a text column 50px apart; the
 * "tape" graphic hangs 118px above the card at x=347) and 351:8911
 * (390: no image — centred text with the tape 21px above the card).
 */
export function CtaBanner({ className }: { className?: string }) {
  return (
    <section className={cn("relative w-full", className)}>
      {/* ---------------- desktop ---------------- */}
      <div className="mx-auto hidden w-[1028px] md:block">
        <div className="relative">
          {/* Figma 312:2422: a 331×267 frame at (347, -118) holding a 240.751×267.183
              image rotated -24.88°, centred in a 330.807×343.668 box offset -77 —
              which puts the image's centre at (512.4, -23.2) from the card corner. */}
          <Image
            src="/art/tape.png"
            alt=""
            aria-hidden
            width={241}
            height={267}
            className="pointer-events-none absolute top-[-157px] left-[392px] h-[267.18px] w-[240.75px] max-w-none rotate-[-24.88deg] object-contain"
          />
          <div className="border-stroke relative flex h-[483px] items-center justify-center overflow-hidden rounded-xl border-2">
            <div className="flex w-[871px] items-center gap-[50px]">
              <div className="border-white-10 relative h-[323px] w-[422px] shrink-0 overflow-hidden rounded-xl border">
                <Image
                  src={PLANS_CTA.image}
                  alt=""
                  aria-hidden
                  width={437}
                  height={424}
                  className="absolute top-[-8px] left-[-16px] h-[424px] w-[437px] max-w-none object-cover"
                />
              </div>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-6 text-white">
                  <h2 className="type-extra-big m-0 w-[399px] opacity-90">{PLANS_CTA.title}</h2>
                  <p className="type-body-lg m-0 whitespace-nowrap opacity-80">{PLANS_CTA.subtitle}</p>
                </div>
                <Button href={PLANS_CTA.href} variant="primary-red" className="self-start">
                  {PLANS_CTA.button}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- mobile ---------------- */}
      <div className="px-page-x-mobile md:hidden">
        <div className="relative">
          {/* Figma 351:8915: a 181×116 window at (105, -21) on the section, clipping a
              181.38×188.43 image that starts 18.8px down. The card starts 40px into
              the section, so the window sits 61px above the card. */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-[-61px] left-[85px] h-[116px] w-[181px] overflow-hidden"
          >
            <Image
              src="/art/tape.png"
              alt=""
              width={181}
              height={188}
              className="absolute top-[18.8px] left-0 h-[188.43px] w-[181.38px] max-w-none object-fill"
            />
          </div>
          <div className="border-stroke relative flex h-[363px] flex-col items-center justify-center gap-6 overflow-hidden rounded-xl border-2 px-6 text-center">
            <h2 className="type-extra-big m-0 text-white opacity-90">{PLANS_CTA.title}</h2>
            <p className="type-body-lg m-0 text-white opacity-80">{PLANS_CTA.subtitle}</p>
            <Button href={PLANS_CTA.href} variant="primary-red" className="mt-2">
              {PLANS_CTA.button}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
