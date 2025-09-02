import { Hono } from "hono";
import * as components from "../astro/dist/server/all.mjs";
import { manifest } from "../astro/dist/server/entry.mjs";
import { experimental_AstroContainer as AstroContainer } from "astro/container";

type Bindings = {
  astro_in_hono_demo_database: D1Database;
};

import.meta.url = manifest.hrefRoot;
const container = await AstroContainer.create({ manifest });
delete import.meta.url;

const app = new Hono<{ Bindings: Bindings }>();

app.get("/customers/:id", async (c) => {
  const userId = c.req.param("id");
  let { results } = await c.env.astro_in_hono_demo_database
    .prepare("SELECT * FROM customers WHERE CustomerId = ?")
    .bind(userId)
    .run();
  const html = await container.renderToString(components.Index, {
    props: { result: results[0] },
  });
  return c.html(html);
});

export default app;
