import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents() {
      // Node event listeners can be implemented here if needed
    },
    specPattern: "cypress/e2e/**/*.ts",
  },
});
