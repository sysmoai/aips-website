import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import {
  getProductGroups,
  getCategoryLabel,
} from "@/lib/data/products";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: "All Products — 56 AI Subscriptions & Premium Tools in Bangladesh",
  description:
    "Browse 56 premium AI subscriptions, design tools, streaming services, and productivity software available in Bangladesh. bKash/Nagad payment. 15-min delivery.",
  canonical: "https://aipremiumshop.com/products",
  ogType: "website",
});

export default function ProductsPage() {
  const groups = getProductGroups();
  const whatsappNumber = process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348";

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <main className="min-h-screen bg-[#f7f7f2] text-[#171713]">
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-semibold leading-tight text-[#141410] sm:text-5xl">
              56 premium subscriptions in Bangladesh
            </h1>
            <p className="mt-4 text-lg leading-7 text-[#5c5a4e]">
              AI assistants, design tools, streaming services, and productivity software —
              all with local payment and WhatsApp delivery.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {groups.map((group) => (
              <article
                key={group.slug}
                className="group rounded-lg border border-[#dfded4] bg-white p-5 transition hover:shadow-lg"
              >
                <Link href={`/products/${group.slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-[#e8e7df]">
                    <div
                      className="flex h-full items-center justify-center text-sm font-bold text-white"
                      style={{ backgroundColor: group.variants[0]?.brandColor ?? "#171713" }}
                    >
                      {group.brand}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#176b4d]">
                      {getCategoryLabel(group.category)}
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-[#171713] group-hover:text-[#176b4d]">
                      {group.brand}
                    </h2>
                    <p className="mt-1 text-sm text-[#666454] line-clamp-2">
                      {group.description}
                    </p>
                    <p className="mt-3 text-lg font-bold text-[#171713]">
                      ৳{group.minPrice.toLocaleString("en-BD")}
                      {group.maxPrice > group.minPrice && (
                        <span className="text-sm font-normal text-[#666454]">
                          {" "}
                          – ৳{group.maxPrice.toLocaleString("en-BD")}
                        </span>
                      )}
                      <span className="text-sm font-normal text-[#666454]"> / month</span>
                    </p>
                    {group.variants.length > 1 && (
                      <p className="mt-1 text-xs text-[#666454]">
                        {group.variants.length} plans available
                      </p>
                    )}
                  </div>
                </Link>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    `Hi AI Premium Shop, I want ${group.brand}.`
                  )}`}
                  className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#171713] text-sm font-semibold text-white transition hover:bg-[#2b2a24]"
                >
                  Order via WhatsApp
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
