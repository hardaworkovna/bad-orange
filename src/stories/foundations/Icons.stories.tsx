import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as Icons from "@/icons/generated";

const meta: Meta = { title: "Foundations/Icons", parameters: { layout: "padded" } };
export default meta;

/** Every SVG exported from Figma → Design system → Icons, at its native size. */
export const All: StoryObj = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
      {Object.entries(Icons).map(([name, Icon]) => (
        <div key={name} className="border-white-10 flex flex-col items-center gap-2 rounded-md border p-4">
          <div className="flex h-12 items-center justify-center">
            <Icon />
          </div>
          <p className="text-white-60 text-center font-sans text-[11px]">{name.replace(/^Icon/, "")}</p>
        </div>
      ))}
    </div>
  ),
};
