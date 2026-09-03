import Link from "next/link";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Avatar } from "@/components/ui/Avatar";
import { IconMenu, IconSearch } from "@/icons/generated";

/**
 * Figma: Design system → Headers&Footers
 *  - "1440/Headers" Type=Inkognito / Premium User / Free user (1440×100, 60px side padding,
 *    40px top padding, nav centred: 18 Medium white 60%, 40px gap)
 *  - "390/Header" (390×70, 20px padding: mobile logo + glow menu & search buttons)
 * `user` picks the right-hand cluster; the mobile header is the same for every user type.
 */
export type HeaderUser = "guest" | "free" | "premium";

export const NAV_ITEMS = [
  { label: "Audio Library", href: "/library" },
  { label: "Categories", href: "/categories" },
  { label: "Plans", href: "/plans" },
  { label: "About", href: "/about" },
] as const;

export type HeaderProps = {
  user?: HeaderUser;
  avatarEmoji?: string;
  /** "auto" follows the viewport; force for Storybook. */
  layout?: "auto" | "desktop" | "mobile";
  currentPath?: string;
  onMenu?: () => void;
  onSearch?: () => void;
  className?: string;
};

export function Header({
  user = "guest",
  avatarEmoji,
  layout = "auto",
  currentPath,
  onMenu,
  onSearch,
  className,
}: HeaderProps) {
  const showDesktop = layout !== "mobile";
  const showMobile = layout !== "desktop";
  return (
    <header className={cn("w-full", className)}>
      {showDesktop && (
        <div
          className={cn(
            "max-w-page px-page-x relative mx-auto h-[100px] items-center pt-10",
            layout === "auto" ? "hidden md:flex" : "flex",
          )}
        >
          <div className="flex w-full items-center justify-between">
            <Link
              href="/"
              aria-label="Daddy Sounds home"
              className="focus-visible:ring-white-60 shrink-0 outline-none focus-visible:ring-2"
            >
              <Logo size="desktop" />
            </Link>
            <nav aria-label="Main" className="absolute top-[19px] left-1/2 -translate-x-1/2">
              <ul className="flex items-center gap-10">
                {NAV_ITEMS.map((it) => (
                  <li key={it.href}>
                    <a
                      href={it.href}
                      aria-current={currentPath === it.href ? "page" : undefined}
                      className="type-label-18 text-white-60 transition-colors outline-none hover:text-white focus-visible:text-white aria-[current=page]:text-white"
                    >
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-4">
              {user === "guest" && (
                <>
                  <Button variant="tertiary" href="/signup">
                    Get free account
                  </Button>
                  <Button variant="primary-white" href="/login">
                    Login
                  </Button>
                </>
              )}
              {user === "free" && (
                <>
                  <a
                    href="/account"
                    aria-label="Account"
                    className="focus-visible:ring-white-60 rounded-full outline-none focus-visible:ring-2"
                  >
                    <Avatar emoji={avatarEmoji} />
                  </a>
                  <Button variant="primary-white" href="/plans">
                    Upgrade
                  </Button>
                </>
              )}
              {user === "premium" && (
                <a
                  href="/account"
                  aria-label="Account"
                  className="focus-visible:ring-white-60 rounded-full outline-none focus-visible:ring-2"
                >
                  <Avatar emoji={avatarEmoji} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
      {showMobile && (
        <div className={cn("px-page-x-mobile h-[70px] w-full pt-5", layout === "auto" ? "md:hidden" : "")}>
          <div className="flex items-center justify-between">
            <Link
              href="/"
              aria-label="Daddy Sounds home"
              className="focus-visible:ring-white-60 outline-none focus-visible:ring-2"
            >
              <Logo size="mobile" />
            </Link>
            <div className="flex items-center gap-3">
              <IconButton variant="glow" label="Menu" onClick={onMenu}>
                <IconMenu />
              </IconButton>
              <IconButton variant="glow" label="Search" onClick={onSearch}>
                <IconSearch />
              </IconButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
