import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Footer } from "@/components/layout/Footer";

const meta: Meta<typeof Footer> = {
  title: "Layout/Footer",
  component: Footer,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof Footer>;

/** Figma: Footers → Size=1440 */
export const Desktop: Story = { args: { layout: "desktop" } };

/** Figma: Footers → Size=390 */
export const Mobile: Story = {
  args: { layout: "mobile" },
  render: (args) => (
    <div className="w-[390px]">
      <Footer {...args} />
    </div>
  ),
};

export const Responsive: Story = { args: { layout: "auto" } };
