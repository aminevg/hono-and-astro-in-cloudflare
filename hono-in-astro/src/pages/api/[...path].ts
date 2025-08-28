import type { APIRoute, AstroGlobal } from "astro";
import { Hono } from "hono";
import { testClient } from "hono/testing";

type Bindings = {
  hono_in_astro_demo_database: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>()
  .basePath("/api")
  .get("/customers/:id", async (c) => {
    const userId = c.req.param("id");
    try {
      let { results } = await c.env.hono_in_astro_demo_database
        .prepare("SELECT * FROM customers WHERE CustomerId = ?")
        .bind(userId)
        .run();
      return c.json({ results });
    } catch (e) {
      return c.json({ err: (e as Error).message }, 500);
    }
  });

export const ALL: APIRoute = ({request, locals}) => app.fetch(request, {...locals.runtime.env});

export type App = typeof app;

export function serverClient(Astro: AstroGlobal) {
  return testClient(app, {...Astro.locals.runtime.env})
}
