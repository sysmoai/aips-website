// artifacts/api-server/src/routes/products.ts
// Public product routes + admin CRUD

import { Router } from "express";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, and } from "drizzle-orm";
import { productsTable, categoriesTable, insertProductSchema } from "@workspace/db";
import { requireAuth } from "../middleware/auth.js";

const sql = neon(process.env.DATABASE_URL!);
const db  = drizzle(sql);

export const productsRouter = Router();

// GET /api/products — all active products
productsRouter.get("/", async (_req, res) => {
  try {
    const products = await db.select().from(productsTable).where(eq(productsTable.status, "Active")).orderBy(productsTable.sortOrder);
    res.json({ success: true, data: products });
  } catch { res.status(500).json({ success: false, error: "Failed to fetch products" }); }
});

// GET /api/products/featured
productsRouter.get("/featured", async (_req, res) => {
  try {
    const products = await db.select().from(productsTable).where(and(eq(productsTable.status, "Active"), eq(productsTable.featured, true))).orderBy(productsTable.sortOrder);
    res.json({ success: true, data: products });
  } catch { res.status(500).json({ success: false, error: "Failed to fetch featured products" }); }
});

// GET /api/products/category/:cat
productsRouter.get("/category/:cat", async (req, res) => {
  try {
    const products = await db.select().from(productsTable).where(and(eq(productsTable.category, req.params.cat), eq(productsTable.status, "Active"))).orderBy(productsTable.sortOrder);
    res.json({ success: true, data: products });
  } catch { res.status(500).json({ success: false, error: "Failed to fetch products" }); }
});

// GET /api/products/brand/:slug
productsRouter.get("/brand/:slug", async (req, res) => {
  try {
    const products = await db.select().from(productsTable).where(and(eq(productsTable.brandSlug, req.params.slug), eq(productsTable.status, "Active"))).orderBy(productsTable.sortOrder);
    res.json({ success: true, data: products });
  } catch { res.status(500).json({ success: false, error: "Failed to fetch products" }); }
});

// GET /api/products/categories/all
productsRouter.get("/categories/all", async (_req, res) => {
  try {
    const cats = await db.select().from(categoriesTable).orderBy(categoriesTable.sortOrder);
    res.json({ success: true, data: cats });
  } catch { res.status(500).json({ success: false, error: "Failed to fetch categories" }); }
});

// GET /api/products/:id
productsRouter.get("/:id", async (req, res) => {
  try {
    const [product] = await db.select().from(productsTable).where(eq(productsTable.id, req.params.id));
    if (!product) { res.status(404).json({ success: false, error: "Product not found" }); return; }
    res.json({ success: true, data: product });
  } catch { res.status(500).json({ success: false, error: "Failed to fetch product" }); }
});

// ADMIN: GET /api/products/admin/all
productsRouter.get("/admin/all", requireAuth, async (_req, res) => {
  try {
    const products = await db.select().from(productsTable).orderBy(productsTable.sortOrder);
    res.json({ success: true, data: products });
  } catch { res.status(500).json({ success: false, error: "Failed to fetch products" }); }
});

// ADMIN: POST /api/products/admin
productsRouter.post("/admin", requireAuth, async (req, res) => {
  try {
    const parsed = insertProductSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ success: false, error: parsed.error.issues }); return; }
    const [created] = await db.insert(productsTable).values(parsed.data).returning();
    res.status(201).json({ success: true, data: created });
  } catch { res.status(500).json({ success: false, error: "Failed to create product" }); }
});

// ADMIN: PUT /api/products/admin/:id
productsRouter.put("/admin/:id", requireAuth, async (req, res) => {
  try {
    const [updated] = await db.update(productsTable).set({ ...req.body, updatedAt: new Date() }).where(eq(productsTable.id, req.params.id)).returning();
    if (!updated) { res.status(404).json({ success: false, error: "Product not found" }); return; }
    res.json({ success: true, data: updated });
  } catch { res.status(500).json({ success: false, error: "Failed to update product" }); }
});

// ADMIN: DELETE /api/products/admin/:id
productsRouter.delete("/admin/:id", requireAuth, async (req, res) => {
  try {
    await db.delete(productsTable).where(eq(productsTable.id, req.params.id));
    res.json({ success: true, data: { deleted: req.params.id } });
  } catch { res.status(500).json({ success: false, error: "Failed to delete product" }); }
});
