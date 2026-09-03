import { cn } from "@/lib/cn";

/**
 * Figma: Design system → Headers&Footers → "Footers" Size=1440 / Size=390
 * Copy is verbatim from Figma. Lines are 1px white 20%.
 */
export const FOOTER_LINKS = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of services", href: "/terms" },
  { label: "Content Removal Requests", href: "/content-removal" },
  { label: "File a Complaint", href: "/complaint" },
  { label: "2257", href: "/2257" },
] as const;

export const FOOTER_DISCLAIMER =
  "This content is intended for adults (18+) and may be sensitive to some viewers. All characters are fictional, depicted as 18+, and all interactions are consensual.";
export const FOOTER_ADDRESS = ["Bad Orange LLC", "1309 Coffeen Ave. Suite 1200", "Sheridan, Wyoming 82801"] as const;
export const FOOTER_COPYRIGHT = "© 2026 Daddy Sounds | All rights reserved";

export function Footer({ layout = "auto", className }: { layout?: "auto" | "desktop" | "mobile"; className?: string }) {
  const showDesktop = layout !== "mobile";
  const showMobile = layout !== "desktop";
  const link = "type-label-18 text-white-90 outline-none hover:text-white focus-visible:underline";
  return (
    <footer className={cn("w-full bg-black", className)}>
      {showDesktop && (
        <div className={cn("max-w-page mx-auto", layout === "auto" ? "hidden md:block" : "")}>
          <div className="w-content mx-auto flex max-w-full flex-col gap-6 pt-px pb-12">
            <hr className="bg-white-20 m-0 h-px w-full border-0" />
            <nav aria-label="Legal">
              <ul className="flex items-center justify-between">
                {FOOTER_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className={link}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <hr className="bg-white-20 m-0 h-px w-full border-0" />
            <div className="flex flex-col gap-6 font-sans text-[16px] leading-[1.2] font-medium text-white">
              <div className="flex items-start justify-between">
                <p className="w-[448px] opacity-60">{FOOTER_DISCLAIMER}</p>
                <address className="not-italic opacity-60">
                  {FOOTER_ADDRESS.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
              <p className="opacity-60">{FOOTER_COPYRIGHT}</p>
            </div>
          </div>
        </div>
      )}
      {showMobile && (
        <div className={cn("w-full px-[19px] pb-5", layout === "auto" ? "md:hidden" : "")}>
          <div className="flex flex-col gap-5">
            <hr className="bg-white-20 m-0 h-px w-full border-0" />
            <nav aria-label="Legal" className="text-white-90 font-sans text-[16px] leading-[1.2] font-medium">
              <ul className="flex flex-col gap-5">
                <li className="flex items-center justify-between">
                  <a href={FOOTER_LINKS[0].href} className="hover:text-white">
                    {FOOTER_LINKS[0].label}
                  </a>
                  <a href={FOOTER_LINKS[1].href} className="hover:text-white">
                    {FOOTER_LINKS[1].label}
                  </a>
                </li>
                <li className="flex items-center justify-between">
                  <a href={FOOTER_LINKS[3].href} className="hover:text-white">
                    {FOOTER_LINKS[3].label}
                  </a>
                  <a href={FOOTER_LINKS[4].href} className="hover:text-white">
                    {FOOTER_LINKS[4].label}
                  </a>
                </li>
                <li>
                  <a href={FOOTER_LINKS[2].href} className="hover:text-white">
                    {FOOTER_LINKS[2].label}
                  </a>
                </li>
              </ul>
            </nav>
            <hr className="bg-white-20 m-0 h-px w-full border-0" />
            <div className="flex flex-col gap-5 font-sans text-[14px] leading-[1.2] font-medium text-white">
              <p className="opacity-60">{FOOTER_DISCLAIMER}</p>
              <address className="not-italic opacity-60">
                {FOOTER_ADDRESS.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <p className="opacity-60">{FOOTER_COPYRIGHT}</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
