// lib/db/src/schema/index.ts
// AIPS Full Database Schema — April 2026

import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// ─────────────────────────────────────────────
// PRODUCTS
// ─────────────────────────────────────────────
export const productsTable = pgTable("products", {
  id:           text("id").primaryKey(),
  name:         text("name").notNull(),
  slug:         text("slug").notNull(),
  brand:        text("brand").notNull(),
  brandSlug:    text("brand_slug").notNull(),
  provider:     text("provider").notNull(),
  brandColor:   text("brand_color").notNull().default("#111827"),
  category:     text("category").notNull(),
  price:        integer("price").notNull(),
  officialUsd:  integer("official_usd"),
  tier:         text("tier").notNull(),
  accessType:   text("access_type").notNull(),
  badge:        text("badge"),
  description:  text("description").notNull(),
  capabilities: text("capabilities").array().notNull().default([]),
  deliverySla:  text("delivery_sla").notNull(),
  featured:     boolean("featured").notNull().default(false),
  whatsappMsg:  text("whatsapp_msg").notNull(),
  status:       text("status").notNull().default("Active"),
  logoUrl:      text("logo_url"),
  bannerUrl:    text("banner_url"),
  sortOrder:    integer("sort_order").notNull().default(0),
  createdAt:    timestamp("created_at").notNull().defaultNow(),
  updatedAt:    timestamp("updated_at").notNull().defaultNow(),
});

export const insertProductSchema = createInsertSchema(productsTable).omit({ createdAt: true, updatedAt: true });
export const selectProductSchema = createSelectSchema(productsTable);
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;

// ─────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────
export const categoriesTable = pgTable("categories", {
  id:           text("id").primaryKey(),
  name:         text("name").notNull(),
  description:  text("description").notNull().default(""),
  icon:         text("icon").notNull().default("🤖"),
  heroImageUrl: text("hero_image_url"),
  sortOrder:    integer("sort_order").notNull().default(0),
});

export const insertCategorySchema = createInsertSchema(categoriesTable);
export const selectCategorySchema = createSelectSchema(categoriesTable);
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categoriesTable.$inferSelect;

// ─────────────────────────────────────────────
// ORDERS
// ─────────────────────────────────────────────
export const ordersTable = pgTable("orders", {
  id:              serial("id").primaryKey(),
  productId:       text("product_id").notNull().references(() => productsTable.id),
  productName:     text("product_name").notNull(),
  price:           integer("price").notNull(),
  customerName:    text("customer_name"),
  customerPhone:   text("customer_phone"),
  customerEmail:   text("customer_email"),
  status:          text("status").notNull().default("pending"),
  notes:           text("notes"),
  source:          text("source").notNull().default("whatsapp"),
  createdAt:       timestamp("created_at").notNull().defaultNow(),
  updatedAt:       timestamp("updated_at").notNull().defaultNow(),
});

export const insertOrderSchema = createInsertSchema(ordersTable).omit({ id: true, createdAt: true, updatedAt: true });
export const selectOrderSchema = createSelectSchema(ordersTable);
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof ordersTable.$inferSelect;

// ─────────────────────────────────────────────
// BLOG POSTS
// ─────────────────────────────────────────────
export const blogPostsTable = pgTable("blog_posts", {
  id:             serial("id").primaryKey(),
  slug:           text("slug").notNull().unique(),
  title:          text("title").notNull(),
  excerpt:        text("excerpt").notNull().default(""),
  content:        text("content").notNull().default(""),
  author:         text("author").notNull().default("AIPS Team"),
  coverImageUrl:  text("cover_image_url"),
  tags:           text("tags").array().notNull().default([]),
  published:      boolean("published").notNull().default(false),
  publishedAt:    timestamp("published_at"),
  createdAt:      timestamp("created_at").notNull().defaultNow(),
  updatedAt:      timestamp("updated_at").notNull().defaultNow(),
});

export const insertBlogPostSchema = createInsertSchema(blogPostsTable).omit({ id: true, createdAt: true, updatedAt: true });
export const selectBlogPostSchema = createSelectSchema(blogPostsTable);
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPostsTable.$inferSelect;

// ─────────────────────────────────────────────
// MEDIA FILES
// ─────────────────────────────────────────────
export const mediaFilesTable = pgTable("media_files", {
  id:          serial("id").primaryKey(),
  filename:    text("filename").notNull(),
  r2Key:       text("r2_key").notNull().unique(),
  publicUrl:   text("public_url").notNull(),
  type:        text("type").notNull(),
  relatedTo:   text("related_to"),
  sizeBytes:   integer("size_bytes"),
  createdAt:   timestamp("created_at").notNull().defaultNow(),
});

export const insertMediaFileSchema = createInsertSchema(mediaFilesTable).omit({ id: true, createdAt: true });
export const selectMediaFileSchema = createSelectSchema(mediaFilesTable);
export type InsertMediaFile = z.infer<typeof insertMediaFileSchema>;
export type MediaFile = typeof mediaFilesTable.$inferSelect;
