import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, type ButtonVariant, type ForcedState } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { AuthButton } from "@/components/ui/AuthButton";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: { children: "Get membership", variant: "primary-red", size: "md" },
  argTypes: {
    variant: { control: "select", options: ["primary-white", "primary-red", "secondary", "tertiary"] },
    size: { control: "radio", options: ["md", "sm"] },
    forceState: { control: "select", options: [undefined, "hover", "active", "disabled"] },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

const states: (ForcedState | undefined)[] = [undefined, "hover", "active", "disabled"];
const labels: Record<ButtonVariant, string> = {
  "primary-white": "Login",
  "primary-red": "Get membership",
  secondary: "Unlock full library now",
  tertiary: "Get free account",
};

/** Figma: Buttons → Primary/White, Primary/Red, Secondary, Third × Default/Hover/Active/Disabled */
export const AllVariants: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(4,auto)] items-center gap-x-8 gap-y-5">
      <span />
      {["Default", "Hover", "Active", "Disabled"].map((s) => (
        <span key={s} className="type-xs text-white-60">
          {s}
        </span>
      ))}
      {(Object.keys(labels) as ButtonVariant[]).map((v) => (
        <>
          <span key={`${v}-l`} className="type-xs-bold text-white">
            {v}
          </span>
          {states.map((s) => (
            <Button
              key={`${v}-${s}`}
              variant={v}
              forceState={s}
              className={v === "secondary" ? "w-[315px]" : undefined}
            >
              {labels[v]}
            </Button>
          ))}
        </>
      ))}
    </div>
  ),
};

/** Figma: "Button/Secondary/Mobile" — 350×50, 16 SemiBold */
export const MobileSecondary: Story = {
  args: { variant: "tertiary", size: "sm", children: "Show more", className: "w-[350px]" },
};

export const FullWidth: Story = {
  parameters: { layout: "padded" },
  args: { fullWidth: true },
};

export const AsLink: Story = {
  args: { href: "/plans", children: "Get membership" },
};

/** Figma: Buttons → "Button see all" (Desk big / Mob × default / hovered / disabled) */
export const SeeAll: StoryObj = {
  render: () => (
    <div className="grid grid-cols-3 gap-x-8 gap-y-4">
      <TextLink size="mobile">See all</TextLink>
      <TextLink size="mobile" forceState="hover">
        See all
      </TextLink>
      <TextLink size="mobile" forceState="disabled">
        See all
      </TextLink>
      <TextLink size="desktop">See all</TextLink>
      <TextLink size="desktop" forceState="hover">
        See all
      </TextLink>
      <TextLink size="desktop" forceState="disabled">
        See all
      </TextLink>
    </div>
  ),
};

/** Figma: Buttons → "Continue with Google" + Icons Email / Google / Apple */
export const Auth: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4">
      <AuthButton provider="google" />
      <AuthButton provider="email" />
      <AuthButton provider="apple" />
      <AuthButton provider="google" disabled />
    </div>
  ),
};
