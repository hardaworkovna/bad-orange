import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

/**
 * Builds the design-system reference page: the same React components the app
 * ships, rendered into one static page. `npm run reference` then inlines the
 * JS and CSS into a single file for publishing.
 */
export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  plugins: [react()],
  publicDir: fileURLToPath(new URL("../public", import.meta.url)),
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("../src", import.meta.url)),
      // plain-Vite stand-ins for the two Next primitives the components import
      "next/image": fileURLToPath(new URL("./next-shims.tsx", import.meta.url)),
      "next/link": fileURLToPath(new URL("./next-link-shim.tsx", import.meta.url)),
    },
  },
  build: {
    outDir: fileURLToPath(new URL("./dist", import.meta.url)),
    emptyOutDir: true,
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
