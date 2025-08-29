import { Hono } from "hono";

type Bindings = {
  hono_demo_database: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/query/customers/:id", async (c) => {
  const userId = c.req.param("id");
  let { results } = await c.env.hono_demo_database
    .prepare("SELECT * FROM customers WHERE CustomerId = ?")
    .bind(userId)
    .run();
  return c.json(results);
});

export default app;
