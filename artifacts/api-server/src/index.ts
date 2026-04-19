// artifacts/api-server/src/index.ts
// Main Express server — AIPS API

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createToken, verifyToken } from "./middleware/auth.js";
import { productsRouter } from "./routes/products.js";
import { ordersRouter } from "./routes/orders.js";
import { blogRouter } from "./routes/blog.js";
import { mediaRouter } from "./routes/media.js";

const app  = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors({
  origin: ["https://aipremiumshop.com","https://www.aipremiumshop.com",/\.pages\.dev$/,"http://localhost:5173"],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => res.json({ status: "ok", ts: new Date().toISOString() }));

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body ?? {};
  const U = process.env.ADMIN_USERNAME ?? "emon";
  const P = process.env.ADMIN_PASSWORD ?? "";
  if (!P) { res.status(500).json({ success: false, error: "ADMIN_PASSWORD not set" }); return; }
  if (username !== U || password !== P) { res.status(401).json({ success: false, error: "Invalid credentials" }); return; }
  res.json({ success: true, data: { token: createToken({ username, role: "admin" }) } });
});

app.get("/api/admin/verify", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) { res.status(401).json({ success: false, error: "No token" }); return; }
  const payload = verifyToken(auth.slice(7));
  if (!payload) { res.status(401).json({ success: false, error: "Invalid token" }); return; }
  res.json({ success: true, data: payload });
});

app.use("/api/products", productsRouter);
app.use("/api/orders",   ordersRouter);
app.use("/api/blog",     blogRouter);
app.use("/api/media",    mediaRouter);

app.use((_req, res) => res.status(404).json({ success: false, error: "Not found" }));
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ success: false, error: "Internal server error" });
});

app.listen(PORT, () => console.log(`AIPS API running on port ${PORT}`));
export default app;
