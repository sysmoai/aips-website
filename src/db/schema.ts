import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
};

const createdAt = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
};

export const brand = pgTable("brand", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  tagline: text("tagline"),
  logoUrl: text("logo_url"),
  primaryColor: text("primary_color"),
  secondaryColor: text("secondary_color"),
  waPrimary: text("wa_primary"),
  waCommunityUrl: text("wa_community_url"),
  ...timestamps,
});

export const policies = pgTable("policies", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: text("type").notNull().unique(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  ...timestamps,
});

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  icon: text("icon"),
  displayOrder: integer("display_order").default(0).notNull(),
  ...timestamps,
});

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  categoryId: uuid("category_id").references(() => categories.id),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  shortDescription: text("short_description"),
  description: text("description"),
  basePriceBdt: integer("base_price_bdt").notNull(),
  comparePriceBdt: integer("compare_price_bdt"),
  heroImageUrl: text("hero_image_url"),
  isActive: boolean("is_active").default(true).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  displayOrder: integer("display_order").default(0).notNull(),
  ...timestamps,
});

export const variants = pgTable("variants", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id),
  name: text("name").notNull(),
  planType: text("plan_type"),
  priceBdt: integer("price_bdt").notNull(),
  comparePriceBdt: integer("compare_price_bdt"),
  features: jsonb("features").$type<Record<string, unknown> | string[]>(),
  isDefault: boolean("is_default").default(false).notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
  ...timestamps,
});

export const bullets = pgTable("bullets", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id),
  text: text("text").notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
  ...createdAt,
});

export const faq = pgTable("faq", {
  id: uuid("id").defaultRandom().primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  productId: uuid("product_id").references(() => products.id),
  displayOrder: integer("display_order").default(0).notNull(),
  ...timestamps,
});

export const customers = pgTable("customers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  waNumber: text("wa_number"),
  notes: text("notes"),
  ...timestamps,
});

export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerId: uuid("customer_id").references(() => customers.id),
  productId: uuid("product_id").references(() => products.id),
  variantId: uuid("variant_id").references(() => variants.id),
  status: text("status").default("new").notNull(),
  source: text("source"),
  notes: text("notes"),
  ...timestamps,
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  leadId: uuid("lead_id").references(() => leads.id),
  customerId: uuid("customer_id")
    .notNull()
    .references(() => customers.id),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id),
  variantId: uuid("variant_id").references(() => variants.id),
  amountBdt: integer("amount_bdt").notNull(),
  paymentMethod: text("payment_method"),
  paymentStatus: text("payment_status").default("pending").notNull(),
  deliveryStatus: text("delivery_status").default("pending").notNull(),
  paidAt: timestamp("paid_at", { withTimezone: true }),
  deliveredAt: timestamp("delivered_at", { withTimezone: true }),
  notes: text("notes"),
  ...timestamps,
});

export const conversations = pgTable("conversations", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerId: uuid("customer_id")
    .notNull()
    .references(() => customers.id),
  channel: text("channel").default("whatsapp").notNull(),
  direction: text("direction"),
  message: text("message").notNull(),
  ...createdAt,
});

export const cases = pgTable("cases", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerId: uuid("customer_id")
    .notNull()
    .references(() => customers.id),
  orderId: uuid("order_id").references(() => orders.id),
  subject: text("subject").notNull(),
  description: text("description"),
  status: text("status").default("open").notNull(),
  priority: text("priority").default("medium").notNull(),
  ...timestamps,
});

export const media = pgTable("media", {
  id: uuid("id").defaultRandom().primaryKey(),
  filename: text("filename").notNull(),
  storagePath: text("storage_path").notNull(),
  url: text("url").notNull(),
  altText: text("alt_text"),
  mimeType: text("mime_type"),
  sizeBytes: integer("size_bytes"),
  entityType: text("entity_type"),
  entityId: uuid("entity_id"),
  ...createdAt,
});

export const blogPosts = pgTable("blog_posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  body: text("body").notNull(),
  coverImageUrl: text("cover_image_url"),
  authorName: text("author_name").default("EMON HOSSAIN").notNull(),
  status: text("status").default("draft").notNull(),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  tags: jsonb("tags").$type<string[]>().default([]).notNull(),
  ...timestamps,
});

export const changeLog = pgTable("change_log", {
  id: uuid("id").defaultRandom().primaryKey(),
  entityType: text("entity_type").notNull(),
  entityId: uuid("entity_id").notNull(),
  action: text("action").notNull(),
  changedBy: text("changed_by"),
  changes: jsonb("changes").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
