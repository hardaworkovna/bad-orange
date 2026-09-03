import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta = { title: "Foundations/Colors", parameters: { layout: "padded" } };
export default meta;

const swatches: { name: string; figma: string; className: string; value: string }[] = [
  { name: "black", figma: "Group/Black", className: "bg-black border border-white-20", value: "#121212" },
  { name: "white", figma: "Group/White", className: "bg-white", value: "#FFFFFF" },
  { name: "white-90", figma: "Group/White 90%", className: "bg-white-90", value: "rgba(255,255,255,.9)" },
  { name: "white-80", figma: "Group/White 80%", className: "bg-white-80", value: "rgba(255,255,255,.8)" },
  { name: "white-60", figma: "Group/White 60%", className: "bg-white-60", value: "rgba(255,255,255,.6)" },
  { name: "white-20", figma: "Group/White 20%", className: "bg-white-20", value: "rgba(255,255,255,.2)" },
  { name: "white-10", figma: "Group/White 10%", className: "bg-white-10", value: "rgba(255,255,255,.1)" },
  { name: "gray", figma: "Group/Gray", className: "bg-gray", value: "#7D7D7D" },
  { name: "light-gray", figma: "Group/Light Gray", className: "bg-light-gray", value: "#D1D1D1" },
  { name: "red", figma: "Group/Red", className: "bg-red", value: "#F50C22" },
  { name: "stroke", figma: "Group/Stroke gradient", className: "bg-stroke", value: "#FF6464" },
  { name: "gradient-red", figma: "Group/Gradient", className: "bg-gradient-red", value: "109° #FF0000 → #D80505" },
  {
    name: "gradient-red-active",
    figma: "(pressed)",
    className: "bg-gradient-red-active",
    value: "109° #FF0000 → #AB0505",
  },
  {
    name: "gradient-red-10",
    figma: "Group/Red linear 10%",
    className: "bg-gradient-red-10 border border-white-20",
    value: "103° #FF6464/.1 → #F60101/.1 → #940202/.1",
  },
  { name: "reaction-melted", figma: "Reactions", className: "bg-reaction-melted", value: "#D80BBA" },
  { name: "reaction-begging", figma: "Reactions", className: "bg-reaction-begging", value: "#FF5213" },
  { name: "reaction-ruined", figma: "Reactions", className: "bg-reaction-ruined", value: "#771BE5" },
  { name: "badge-hours", figma: "Badges", className: "bg-badge-hours", value: "#FF8FF0" },
  { name: "badge-streak", figma: "Badges", className: "bg-badge-streak", value: "#FFB18F" },
  { name: "badge-legend", figma: "Badges", className: "bg-badge-legend", value: "#9C01F6" },
];

export const Palette: StoryObj = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {swatches.map((s) => (
        <div key={s.name} className="flex flex-col gap-2">
          <div className={`h-20 w-full rounded-md ${s.className}`} />
          <p className="type-xs-bold text-white">{s.name}</p>
          <p className="type-xs text-white-60">{s.figma}</p>
          <p className="type-xs text-white-60">{s.value}</p>
        </div>
      ))}
    </div>
  ),
};

export const Shadows: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-12 p-8">
      {[
        ["shadow-red-glow", "0 12px 15px rgba(255,28,28,.3)"],
        ["shadow-red-ring", "0 0 30px rgba(244,2,1,.4)"],
        ["shadow-red-pill", "0 0 20px rgba(244,2,1,.6)"],
      ].map(([c, v]) => (
        <div key={c} className="flex flex-col items-center gap-3">
          <div className={`bg-red size-20 rounded-full ${c}`} />
          <p className="type-xs-bold text-white">{c}</p>
          <p className="type-xs text-white-60">{v}</p>
        </div>
      ))}
    </div>
  ),
};
