// artifacts/api-server/src/routes/orders.ts
// Order capture + admin management + Resend email notifications
// Env vars needed: RESEND_API_KEY, NOTIFY_EMAIL

import { Router } from "express";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, desc } from "drizzle-orm";
import { ordersTable, productsTable } from "@workspace/db";
import { requireAuth } from "../middleware/auth.js";

const sql = neon(process.env.DATABASE_URL!);
const db  = drizzle(sql);
export const ordersRouter = Router();

async function sendOrderNotification(order: { id: number; productName: string; price: number; customerName: string | null; customerPhone: string | null; source: string; }) {
  const RESEND_KEY = process.env.RESEND_API_KEY;
  const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? "sysmoai.com@gmail.com";
  if (!RESEND_KEY) return;
  const waUrl = `https://wa.me/8801865385348?text=Hi+following+up+on+order+%23${order.id}`;
  const html = `<div style="font-family:Arial,sans-serif;max-width:500px">
    <div style="background:#f4b942;padding:20px;border-radius:8px 8px 0 0"><h1 style="color:#111;margin:0;font-size:20px">New Order — AIPS</h1></div>
    <div style="background:#fff;padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
      <p><strong>Order #${order.id}</strong></p>
      <p>Product: ${order.productName}</p>
      <p>Price: ${order.price.toLocaleString()} BDT</p>
      <p>Customer: ${order.customerPhone ?? order.customerName ?? "Via WhatsApp"}</p>
      <p>Time: ${new Date().toLocaleString("en-BD",{timeZone:"Asia/Dhaka"})}</p>
      <a href="${waUrl}" style="display:inline-block;background:#25d366;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;margin-right:8px">Open WhatsApp</a>
      <a href="https://aipremiumshop.com/admin/orders" style="display:inline-block;background:#111;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold">View in Admin</a>
    </div></div>`;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_KEY}` },
      body: JSON.stringify({ from: "AIPS Orders <orders@aipremiumshop.com>", to: [NOTIFY_EMAIL], subject: `New Order: ${order.productName} — ${order.price.toLocaleString()} BDT`, html }),
    });
  } catch { console.warn("[orders] Resend notification failed"); }
}

// PUBLIC: POST /api/orders — capture order intent
ordersRouter.post("/", async (req, res) => {
  try {
    const { productId, customerName, customerPhone, customerEmail, source } = req.body;
    if (!productId) { res.status(400).json({ success: false, error: "productId required" }); return; }
    const [product] = await db.select().from(productsTable).where(eq(productsTable.id, productId));
    if (!product) { res.status(404).json({ success: false, error: "Product not found" }); return; }
    const [order] = await db.insert(ordersTable).values({
      productId, productName: product.name, price: product.price,
      customerName: customerName ?? null, customerPhone: customerPhone ?? null,
      customerEmail: customerEmail ?? null, source: source ?? "whatsapp", status: "pending",
    }).returning();
    sendOrderNotification({ id: order.id, productName: order.productName, price: order.price, customerName: order.customerName, customerPhone: order.customerPhone, source: order.source });
    res.status(201).json({ success: true, data: { orderId: order.id } });
  } catch { res.status(500).json({ success: false, error: "Failed to capture order" }); }
});

// ADMIN: GET /api/orders/admin
ordersRouter.get("/admin", requireAuth, async (_req, res) => {
  try {
    const orders = await db.select().from(ordersTable).orderBy(desc(ordersTable.createdAt));
    res.json({ success: true, data: orders });
  } catch { res.status(500).json({ success: false, error: "Failed to fetch orders" }); }
});

// ADMIN: GET /api/orders/admin/stats
ordersRouter.get("/admin/stats", requireAuth, async (_req, res) => {
  try {
    const all = await db.select().from(ordersTable);
    res.json({ success: true, data: {
      total: all.length,
      pending: all.filter(o=>o.status==="pending").length,
      contacted: all.filter(o=>o.status==="contacted").length,
      delivered: all.filter(o=>o.status==="delivered").length,
      cancelled: all.filter(o=>o.status==="cancelled").length,
      totalRevenueBDT: all.filter(o=>o.status==="delivered").reduce((s,o)=>s+o.price,0),
    }});
  } catch { res.status(500).json({ success: false, error: "Failed to get stats" }); }
});

// ADMIN: PUT /api/orders/admin/:id
ordersRouter.put("/admin/:id", requireAuth, async (req, res) => {
  try {
    const { status, notes, customerName, customerPhone, customerEmail } = req.body;
    const [updated] = await db.update(ordersTable).set({
      ...(status!==undefined&&{status}), ...(notes!==undefined&&{notes}),
      ...(customerName!==undefined&&{customerName}), ...(customerPhone!==undefined&&{customerPhone}),
      ...(customerEmail!==undefined&&{customerEmail}), updatedAt: new Date(),
    }).where(eq(ordersTable.id, Number(req.params.id))).returning();
    if (!updated) { res.status(404).json({ success: false, error: "Order not found" }); return; }
    res.json({ success: true, data: updated });
  } catch { res.status(500).json({ success: false, error: "Failed to update order" }); }
});
