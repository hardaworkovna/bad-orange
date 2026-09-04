import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

/**
 * Same pipeline as vite.config.mts, but the entry is the Plans page.
 * `npm run reference:plans` builds it and inlines it into one file.
 */
export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  plugins: [react()],
  publicDir: fileURLToPath(new URL("../public", import.meta.url)),
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("../src", import.meta.url)),
      "next/image": fileURLToPath(new URL("./next-shims.tsx", import.meta.url)),
      "next/link": fileURLToPath(new URL("./next-link-shim.tsx", import.meta.url)),
    },
  },
  build: {
    outDir: fileURLToPath(new URL("./dist-plans", import.meta.url)),
    emptyOutDir: true,
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
    rollupOptions: {
      input: fileURLToPath(new URL("./plans.html", import.meta.url)),
      output: { inlineDynamicImports: true },
    },
  },
});
