import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  ReactionTag,
  CategoryChip,
  FreeTag,
  LockedTag,
  AccessTile,
  BestValueIcon,
  type Reaction,
} from "@/components/ui/Tag";
import { FilterButton, SortButton, ActiveFilter } from "@/components/ui/FilterChip";
import { ActivityBadge } from "@/components/ui/ActivityBadge";
import { CategoryTile, CATEGORY_PALETTES } from "@/components/ui/CategoryTile";
import { PaginationDots } from "@/components/ui/Pagination";

const meta: Meta = { title: "Components/Tags & Badges", parameters: { layout: "padded" } };
export default meta;

const reactions: Reaction[] = ["feral", "melted", "begging", "ruined"];

/** Figma: Badges & Tags → "Reaction/Tags/Selected" and "Reaction/Tags/Default" */
export const Reactions: StoryObj = {
  render: () => (
    <div className="grid grid-cols-2 gap-x-10 gap-y-5">
      {reactions.map((r) => (
        <ReactionTag key={`${r}-s`} reaction={r} selected />
      ))}
      {reactions.map((r) => (
        <ReactionTag key={`${r}-d`} reaction={r} />
      ))}
    </div>
  ),
};

/** Figma: "Reaction/Tags/Selected" 323:3592 ("Category tag (description)") */
export const CategoryChips: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <CategoryChip>Dark Romance</CategoryChip>
      <CategoryChip>Vampire</CategoryChip>
    </div>
  ),
};

/** Figma: "Filters" (all types), "Mobile/Filter", "Filter/Selected" */
export const Filters: StoryObj = {
  render: () => (
    <div className="flex flex-col items-start gap-5">
      <FilterButton />
      <FilterButton open />
      <FilterButton count={2} />
      <FilterButton count={1} open />
      <FilterButton count={1} open disabled />
      <ActiveFilter>Most Recent</ActiveFilter>
      <SortButton />
    </div>
  ),
};

/** Figma: Icons → "Type of user" (Free / Locked), "icon" (lock / premium), "Icon/Best value" */
export const Access: StoryObj = {
  render: () => (
    <div className="flex items-center gap-6">
      <FreeTag />
      <LockedTag />
      <AccessTile kind="premium" />
      <AccessTile kind="lock" />
      <BestValueIcon />
    </div>
  ),
};

/** Figma: Badges & Tags → "Badges for Activity" ×4 */
export const Activity: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-7">
      <ActivityBadge kind="founding-member" />
      <ActivityBadge kind="hundred-hour-club" />
      <ActivityBadge kind="seven-day-streak" />
      <ActivityBadge kind="community-legend" />
    </div>
  ),
};

/** Figma: Tags Category → desktop 289², desktop small 289×100, mobile 169×74 */
export const CategoryTiles: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-10">
        <CategoryTile label="Dom Daddy" palette={CATEGORY_PALETTES["dom-daddy"]} />
        <CategoryTile label="Spicy" palette={CATEGORY_PALETTES.spicy} />
      </div>
      <div className="flex flex-wrap gap-10">
        <CategoryTile size="small" label="Dom Daddy" />
        <CategoryTile size="small" label="Spicy" palette={CATEGORY_PALETTES.spicy} />
      </div>
      <div className="flex flex-wrap gap-6">
        <CategoryTile size="mobile" label="Dom Daddy" />
        <CategoryTile size="mobile" label="Spicy" palette={CATEGORY_PALETTES.spicy} />
      </div>
    </div>
  ),
};

/** Figma: Icons → "Pagination" */
export const Pagination: StoryObj = {
  render: () => <PaginationDots count={5} index={0} />,
};
