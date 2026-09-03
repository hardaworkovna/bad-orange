import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta = { title: "Foundations/Typography", parameters: { layout: "padded" } };
export default meta;

const styles: { util: string; figma: string; sample?: string }[] = [
  { util: "type-extra-big", figma: "1440/Extra big 62 · Mobile/Extra big 42" },
  { util: "type-h1", figma: "1440/H1 52 · Mobile/H1 34" },
  { util: "type-h2", figma: "1440/H2 44 · Mobile/H2 26" },
  { util: "type-h3", figma: "1440/H3 35 (no mobile style)" },
  { util: "type-h4", figma: "1440/H4 30 · Mobile/H4 24" },
  { util: "type-h5", figma: "1440/H5 25 · Mobile/H5 20" },
  { util: "type-tags", figma: "1440/Tags 20 · Mobile/Tags 15" },
  { util: "type-body-tags", figma: "1440/Body tags 22 SemiBold · Mobile/Body tags 18 Medium", sample: "Body tags" },
  {
    util: "type-body-lg",
    figma: "1440/Body Large 18 · Mobile/Body Large 16",
    sample: "Body Large — Host Grotesk Medium",
  },
  {
    util: "type-body-md",
    figma: "1440/Body medium 16 · Mobile/Body medium 14",
    sample: "Body medium — Host Grotesk Medium",
  },
  { util: "type-xs-bold", figma: "1440/Extra small bold 14 SemiBold", sample: "Extra small bold" },
  { util: "type-xs", figma: "1440/Exta small technical 14 Regular", sample: "Extra small technical" },
];

/** Resize the canvas below 768px to see the mobile sizes. */
export const Scale: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-8">
      {styles.map((s) => (
        <div key={s.util} className="flex flex-col gap-2">
          <p className={`${s.util} text-white`}>{s.sample ?? s.util.replace("type-", "").replace("-", " ")}</p>
          <p className="type-xs text-white-60">
            .{s.util} — {s.figma}
          </p>
        </div>
      ))}
    </div>
  ),
};

export const ComponentLabels: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6">
      {["type-label-18", "type-label-18-semi", "type-label-16-semi", "type-label-22-semi"].map((u) => (
        <div key={u} className="flex flex-col gap-1">
          <p className={`${u} text-white`}>Get membership</p>
          <p className="type-xs text-white-60">.{u}</p>
        </div>
      ))}
    </div>
  ),
};
