// @ts-check
import { defineConfig } from "astro/config";
import { adapter } from "./adapter";

// https://astro.build/config
export default defineConfig({
  adapter,
});
