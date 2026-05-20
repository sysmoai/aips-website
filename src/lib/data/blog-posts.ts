export interface StaticBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl?: string;
  authorName: string;
  publishedAt: string; // ISO date
  updatedAt?: string;
}

export const staticBlogPosts: StaticBlogPost[] = [
  {
    id: "blog-001",
    slug: "best-ai-tools-bangladesh-2026",
    title: "Best AI Tools in Bangladesh (2026) — Complete Buying Guide",
    excerpt:
      "The 15 best AI subscriptions for Bangladeshi students, freelancers, and businesses in 2026. Prices in BDT, bKash payment, and local support.",
    authorName: "EMON HOSSAIN",
    publishedAt: "2026-05-20T00:00:00Z",
  },
  {
    id: "blog-002",
    slug: "how-to-get-chatgpt-plus-bangladesh",
    title: "How to Get ChatGPT Plus in Bangladesh (2026) — bKash Guide",
    excerpt:
      "Step-by-step guide to buying ChatGPT Plus in Bangladesh with bKash, Nagad, or Rocket. No foreign credit card needed. 15-minute delivery.",
    authorName: "EMON HOSSAIN",
    publishedAt: "2026-05-20T00:00:00Z",
  },
  {
    id: "blog-003",
    slug: "pay-ai-tools-bkash-bangladesh",
    title: "How to Pay for AI Tools with bKash in Bangladesh (2026)",
    excerpt:
      "Complete guide to buying ChatGPT, Claude, Midjourney, and 50+ AI subscriptions using bKash, Nagad, and Rocket in Bangladesh. No foreign card needed.",
    authorName: "EMON HOSSAIN",
    publishedAt: "2026-05-20T00:00:00Z",
  },
];

export function getStaticBlogPosts(): StaticBlogPost[] {
  return staticBlogPosts;
}

export function getStaticBlogPostBySlug(slug: string): StaticBlogPost | undefined {
  return staticBlogPosts.find((p) => p.slug === slug);
}
