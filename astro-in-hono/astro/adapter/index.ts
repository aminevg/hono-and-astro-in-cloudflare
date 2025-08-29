import type { AstroIntegration } from "astro";

export const adapter: AstroIntegration = {
  name: "astro-in-hono-adapter",
  hooks: {
    "astro:config:done": ({ setAdapter }) => {
      setAdapter({
        name: "my-adapter",
        serverEntrypoint: new URL("./server-entrypoint.mjs", import.meta.url)
          .pathname,
        supportedAstroFeatures: {
          hybridOutput: "stable",
          sharpImageService: "stable",
          serverOutput: "stable",
        },
        exports: ["manifest"],
      });
    },
    "astro:build:setup": ({ vite, target }) => {
      if (target === "server")
        (vite.build?.rollupOptions?.input as string[]).push("src/all.ts");
    },
  },
};
