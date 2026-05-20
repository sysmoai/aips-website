import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { staticBlogPosts } from "@/lib/data/blog-posts";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Blog — AI Tools, Subscriptions & Tech Tips for Bangladesh",
  description:
    "Guides, comparisons, and buying advice for ChatGPT Plus, Claude Pro, Midjourney, Canva Pro, and more in Bangladesh. Written by AI Premium Shop.",
  canonical: "https://aipremiumshop.com/blog",
  ogType: "website",
});

async function getPublishedPosts() {
  try {
    const dbPosts = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"))
      .orderBy(desc(blogPosts.publishedAt));
    return dbPosts;
  } catch {
    return [];
  }
}

export default async function BlogIndexPage() {
  const dbPosts = await getPublishedPosts();

  // Merge static posts (always shown) with any DB posts
  const allPosts =
    dbPosts.length > 0
      ? [
          ...staticBlogPosts,
          ...dbPosts
            .filter((p) => !staticBlogPosts.some((s) => s.slug === p.slug))
            .map((p) => ({
              id: p.id,
              slug: p.slug,
              title: p.title,
              excerpt: p.excerpt ?? "",
              coverImageUrl: p.coverImageUrl ?? undefined,
              authorName: p.authorName,
              publishedAt: p.publishedAt?.toISOString() ?? new Date().toISOString(),
            })),
        ]
      : staticBlogPosts;

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <main className="min-h-screen bg-[#f7f7f2] text-[#171713]">
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-semibold leading-tight text-[#141410] sm:text-5xl">
              AI Premium Shop Blog
            </h1>
            <p className="mt-4 text-lg leading-7 text-[#5c5a4e]">
              Buying guides, tool comparisons, and Bangladesh-specific tips for AI subscriptions,
              design software, streaming services, and productivity apps.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allPosts.map((post) => (
              <article
                key={post.id}
                className="group rounded-lg border border-[#dfded4] bg-white p-5 transition hover:shadow-lg"
              >
                <a href={`/blog/${post.slug}`} className="block">
                  {post.coverImageUrl && (
                    <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-[#e8e7df]">
                      <img
                        src={post.coverImageUrl}
                        alt={`Cover for ${post.title}`}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                        width={400}
                        height={225}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="mt-4">
                    <h2 className="text-xl font-semibold text-[#171713] group-hover:text-[#176b4d]">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-2 text-sm text-[#666454] line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-2 text-xs text-[#666454]">
                      <span>{post.authorName}</span>
                      <span>·</span>
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString("en-BD", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
