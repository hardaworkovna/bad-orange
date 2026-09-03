import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Header } from "@/components/layout/Header";

const meta: Meta<typeof Header> = {
  title: "Layout/Header",
  component: Header,
  parameters: { layout: "fullscreen" },
  args: { layout: "desktop", currentPath: "/library" },
};
export default meta;
type Story = StoryObj<typeof Header>;

/** Figma: 1440/Headers → Type=Inkognito */
export const Guest: Story = { args: { user: "guest" } };
/** Figma: 1440/Headers → Type=Premium User */
export const Premium: Story = { args: { user: "premium" } };
/** Figma: 1440/Headers → Type=Free user */
export const Free: Story = { args: { user: "free" } };

/** Figma: 390/Header */
export const Mobile: Story = {
  args: { layout: "mobile" },
  globals: { viewport: { value: "mobile1", isRotated: false } },
  render: (args) => (
    <div className="w-[390px]">
      <Header {...args} />
    </div>
  ),
};

/** Responsive: resize the canvas — desktop header from 768px, mobile below. */
export const Responsive: Story = { args: { layout: "auto", user: "guest" } };
