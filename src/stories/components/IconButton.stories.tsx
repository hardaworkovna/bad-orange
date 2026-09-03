import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconButton } from "@/components/ui/IconButton";
import { IconArrowUp, IconMenu, IconSearch, IconClose, IconArrowRightDisabled } from "@/icons/generated";

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  args: { label: "Next", variant: "glass" },
};
export default meta;
type Story = StoryObj<typeof IconButton>;

/** Figma: Buttons → "Arrow" (Default / Hover / Focus / Disabled). Icon/arrow-up rotated 90°. */
export const Arrow: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      {([undefined, "hover", "focus", "disabled"] as const).map((s) => (
        <div key={String(s)} className="flex flex-col items-center gap-2">
          <IconButton label="Next" forceState={s} disabled={s === "disabled"}>
            {s === "disabled" ? (
              <IconArrowRightDisabled className="rotate-90" />
            ) : (
              <IconArrowUp className="rotate-90" />
            )}
          </IconButton>
          <span className="type-xs text-white-60">{s ?? "default"}</span>
        </div>
      ))}
    </div>
  ),
};

/** Figma: Buttons → "Frame 5" (menu) and "Search / Small size mobile default" — glow ring */
export const Glow: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-6">
      <IconButton variant="glow" label="Menu">
        <IconMenu />
      </IconButton>
      <IconButton variant="glow" label="Search">
        <IconSearch />
      </IconButton>
      <IconButton variant="glow" label="Menu" forceState="hover">
        <IconMenu />
      </IconButton>
    </div>
  ),
};

/** Figma: Buttons → "Icon/Close" 28px */
export const Close: Story = {
  render: () => (
    <IconButton variant="plain" label="Close">
      <IconClose size={28} />
    </IconButton>
  ),
};
