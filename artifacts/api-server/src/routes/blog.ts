// artifacts/api-server/src/routes/blog.ts
// Blog routes — public read + admin CRUD

import { Router } from "express";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, and, desc } from "drizzle-orm";
import { blogPostsTable, insertBlogPostSchema } from "@workspace/db";
import { requireAuth } from "../middleware/auth.js";

const sql = neon(process.env.DATABASE_URL!);
const db  = drizzle(sql);
export const blogRouter = Router();

// PUBLIC: GET /api/blog
blogRouter.get("/", async (_req, res) => {
  try {
    const posts = await db.select().from(blogPostsTable).where(eq(blogPostsTable.published, true)).orderBy(desc(blogPostsTable.publishedAt));
    res.json({ success: true, data: posts });
  } catch { res.status(500).json({ success: false, error: "Failed to fetch posts" }); }
});

// PUBLIC: GET /api/blog/:slug
blogRouter.get("/:slug", async (req, res) => {
  try {
    const [post] = await db.select().from(blogPostsTable).where(and(eq(blogPostsTable.slug, req.params.slug), eq(blogPostsTable.published, true)));
    if (!post) { res.status(404).json({ success: false, error: "Post not found" }); return; }
    res.json({ success: true, data: post });
  } catch { res.status(500).json({ success: false, error: "Failed to fetch post" }); }
});

// ADMIN: GET /api/blog/admin/all
blogRouter.get("/admin/all", requireAuth, async (_req, res) => {
  try {
    const posts = await db.select().from(blogPostsTable).orderBy(desc(blogPostsTable.createdAt));
    res.json({ success: true, data: posts });
  } catch { res.status(500).json({ success: false, error: "Failed to fetch posts" }); }
});

// ADMIN: POST /api/blog/admin
blogRouter.post("/admin", requireAuth, async (req, res) => {
  try {
    const parsed = insertBlogPostSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ success: false, error: parsed.error.issues }); return; }
    const [created] = await db.insert(blogPostsTable).values({ ...parsed.data, publishedAt: parsed.data.published ? new Date() : null }).returning();
    res.status(201).json({ success: true, data: created });
  } catch { res.status(500).json({ success: false, error: "Failed to create post" }); }
});

// ADMIN: PUT /api/blog/admin/:id
blogRouter.put("/admin/:id", requireAuth, async (req, res) => {
  try {
    const updates: Record<string, unknown> = { ...req.body, updatedAt: new Date() };
    if (req.body.published === true) updates.publishedAt = new Date();
    const [updated] = await db.update(blogPostsTable).set(updates).where(eq(blogPostsTable.id, Number(req.params.id))).returning();
    if (!updated) { res.status(404).json({ success: false, error: "Post not found" }); return; }
    res.json({ success: true, data: updated });
  } catch { res.status(500).json({ success: false, error: "Failed to update post" }); }
});

// ADMIN: DELETE /api/blog/admin/:id
blogRouter.delete("/admin/:id", requireAuth, async (req, res) => {
  try {
    await db.delete(blogPostsTable).where(eq(blogPostsTable.id, Number(req.params.id)));
    res.json({ success: true, data: { deleted: req.params.id } });
  } catch { res.status(500).json({ success: false, error: "Failed to delete post" }); }
});
