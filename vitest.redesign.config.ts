import { defineConfig } from "vitest/config";
export default defineConfig({
  esbuild: { jsx: "automatic" },
  test: { environment: "node", include: ["client/src/redesign/site.test.tsx"] },
});
