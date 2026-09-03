import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";
import "./fonts.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: {
      options: {
        black: { name: "Black (#121212)", value: "#121212" },
        pure: { name: "Pure black", value: "#000000" },
        white: { name: "White", value: "#ffffff" },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    options: {
      storySort: {
        order: ["Foundations", ["Colors", "Typography", "Icons"], "Components", "Layout"],
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: "black" },
  },
};

export default preview;
