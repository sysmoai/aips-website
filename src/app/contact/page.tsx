import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Contact — AI Premium Shop Bangladesh",
  description:
    "Contact AI Premium Shop via WhatsApp, email, or phone. Based in Dhaka, Bangladesh. 24/7 support for AI subscriptions and premium tools.",
  canonical: "https://aipremiumshop.com/contact",
});

export default function ContactPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <main className="min-h-screen bg-[#f7f7f2] text-[#171713]">
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-semibold leading-tight text-[#141410] sm:text-5xl">
            Contact AI Premium Shop
          </h1>
          <p className="mt-4 text-lg leading-7 text-[#5c5a4e]">
            Have a question about a product, payment, or delivery? Reach out — we reply fast.
          </p>

          <div className="mt-10 space-y-6">
            <div className="rounded-lg border border-[#dfded4] bg-white p-6">
              <h2 className="text-lg font-semibold text-[#171713]">WhatsApp (Fastest)</h2>
              <p className="mt-1 text-[#4f4d42]">24/7 human support for orders and questions.</p>
              <a
                href={whatsappUrl}
                className="mt-3 inline-flex h-10 items-center gap-2 rounded-lg bg-[#176b4d] px-4 text-sm font-semibold text-white transition hover:bg-[#11543c]"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="rounded-lg border border-[#dfded4] bg-white p-6">
              <h2 className="text-lg font-semibold text-[#171713]">Email</h2>
              <p className="mt-1 text-[#4f4d42]">For business inquiries, partnerships, and media.</p>
              <a
                href="mailto:hello@aipremiumshop.com"
                className="mt-3 inline-block text-[#176b4d] hover:underline"
              >
                hello@aipremiumshop.com
              </a>
            </div>

            <div className="rounded-lg border border-[#dfded4] bg-white p-6">
              <h2 className="text-lg font-semibold text-[#171713]">Phone</h2>
              <p className="mt-1 text-[#4f4d42]">Voice and WhatsApp calls accepted.</p>
              <p className="mt-3 font-medium text-[#171713]">+880 1865-385348</p>
            </div>

            <div className="rounded-lg border border-[#dfded4] bg-white p-6">
              <h2 className="text-lg font-semibold text-[#171713]">Business hours</h2>
              <p className="mt-1 text-[#4f4d42]">
                We process orders around the clock. Peak response time: 7 AM – 12 AM (BST).
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
