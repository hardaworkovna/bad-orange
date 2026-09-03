import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import {
  IconBadgeCrown,
  IconBadgeMusic,
  IconBadgeFire,
  IconBadgeBolt,
  IconProgress100Red,
  IconProgress75Pink,
  IconProgress50Orange,
  IconProgress25Purple,
} from "@/icons/generated";

/**
 * Figma: Design system → Badges & Tags → "Badges for Activity"
 * 422×144, 32px radius, 32px padding, 2px coloured stroke, radial tint from the
 * bottom-centre, 80px icon tile with a 70px inner white stroke, progress ring top-right.
 */
export type ActivityBadgeKind = "founding-member" | "hundred-hour-club" | "seven-day-streak" | "community-legend";

type Spec = {
  title: string;
  subtitle: string;
  border: string;
  tint: string; // outer radial gradient
  tile: string; // icon tile linear gradient
  innerRing: string;
  icon: React.ReactNode;
  progress: React.ReactNode;
};

const specs: Record<ActivityBadgeKind, Spec> = {
  "founding-member": {
    title: "Founding Member",
    subtitle: "Joined 1 year",
    border: "border-badge-founding",
    tint: "radial-gradient(ellipse 60% 120% at 52% 101%, rgb(216 5 5 / 0.4) 0%, rgb(148 2 2 / 0) 100%)",
    tile: "linear-gradient(97deg, #ff1e1e 6.15%, #ca0505 88.81%)",
    innerRing: "border-white",
    icon: <IconBadgeCrown size={40} />,
    progress: <IconProgress100Red />,
  },
  "hundred-hour-club": {
    title: "100-Hour Club",
    subtitle: "100 hours listening",
    border: "border-badge-hours",
    tint: "radial-gradient(ellipse 60% 120% at 52% 101%, rgb(253 23 169 / 0.4) 0%, rgb(169 11 121 / 0.2) 50%, rgb(85 0 72 / 0) 100%)",
    tile: "linear-gradient(122deg, #ff97f3 23.61%, #ca05b6 61.41%)",
    innerRing: "border-white",
    icon: <IconBadgeMusic size={40} />,
    progress: <IconProgress75Pink />,
  },
  "seven-day-streak": {
    title: "7-Day Streak",
    subtitle: "Listened 7 days straight",
    border: "border-badge-streak",
    tint: "radial-gradient(ellipse 60% 120% at 52% 101%, rgb(253 130 23 / 0.4) 0%, rgb(200 66 12 / 0.2) 50%, rgb(148 2 2 / 0) 100%)",
    tile: "linear-gradient(122deg, #ffac97 23.61%, #ff5213 61.41%)",
    innerRing: "border-white",
    icon: <IconBadgeFire size={40} />,
    progress: <IconProgress50Orange />,
  },
  "community-legend": {
    title: "Community Legend",
    subtitle: "Active user",
    border: "border-badge-legend",
    tint: "radial-gradient(ellipse 60% 120% at 52% 101%, rgb(146 19 212 / 0.4) 0%, rgb(66 7 96 / 0) 100%)",
    tile: "linear-gradient(97deg, #781eff 6.15%, #d100c3 88.81%)",
    innerRing: "border-white-20",
    icon: <IconBadgeBolt size={40} />,
    progress: <IconProgress25Purple />,
  },
};

export type ActivityBadgeProps = HTMLAttributes<HTMLDivElement> & {
  kind: ActivityBadgeKind;
  title?: string;
  subtitle?: string;
};

export function ActivityBadge({ kind, title, subtitle, className, style, ...rest }: ActivityBadgeProps) {
  const s = specs[kind];
  return (
    <div
      className={cn("relative flex w-[422px] max-w-full items-center rounded-xl border-2 p-8", s.border, className)}
      style={{ backgroundImage: s.tint, ...style }}
      {...rest}
    >
      <div className="flex items-center gap-5">
        <span
          className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-md"
          style={{ backgroundImage: s.tile }}
        >
          <span className={cn("absolute inset-[5px] rounded-md border-2", s.innerRing)} />
          <span className="relative">{s.icon}</span>
        </span>
        <div className="flex flex-col gap-2">
          <p className="type-label-22-semi text-white-80">{title ?? s.title}</p>
          <p className="type-label-18 text-white-60">{subtitle ?? s.subtitle}</p>
        </div>
      </div>
      <span className="absolute top-[18px] right-[22px] inline-flex size-6">{s.progress}</span>
    </div>
  );
}
