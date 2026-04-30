import cors from "cors";
import express from "express";
import { getMandiRates, getWeatherInsights } from "@/lib/datagov";
import { orders } from "@/lib/mock-data";
import { getProducts, searchSuggestions } from "@/lib/services/catalog";
import { createOrder } from "@/lib/services/orders";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({
    status: "ok",
    service: "greencart-express-api",
    timestamp: new Date().toISOString(),
  });
});

app.get("/products", async (request, response) => {
  const products = await getProducts({
    search: typeof request.query.search === "string" ? request.query.search : undefined,
    category: typeof request.query.category === "string" ? request.query.category : undefined,
    state: typeof request.query.state === "string" ? request.query.state : undefined,
    organic: typeof request.query.organic === "string" ? request.query.organic : undefined,
    rating: typeof request.query.rating === "string" ? request.query.rating : undefined,
    sort: typeof request.query.sort === "string" ? request.query.sort : undefined,
  });

  response.json({ products });
});

app.get("/search", async (request, response) => {
  const q = typeof request.query.q === "string" ? request.query.q : "";
  const results = await searchSuggestions(q);
  response.json({ results });
});

app.get("/market", async (_request, response) => {
  const rates = await getMandiRates();
  response.json({ rates });
});

app.get("/weather", async (_request, response) => {
  const insights = await getWeatherInsights();
  response.json({ insights });
});

app.get("/orders", (_request, response) => {
  response.json({ orders });
});

app.post("/orders", (request, response) => {
  const order = createOrder(request.body);
  response.status(201).json({ order });
});

const port = Number(process.env.EXPRESS_PORT ?? 4000);

app.listen(port, () => {
  console.log(`GreenCart Express API listening on http://localhost:${port}`);
});
