import { buildMetadata } from "@/lib/seo/metadata";
import { OrganizationJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "About Us — AI Premium Shop Bangladesh",
  description:
    "Learn about AI Premium Shop, Bangladesh's trusted premium subscription reseller. Founded by Emon Hossain in Dhaka. 10,000+ orders delivered.",
  canonical: "https://aipremiumshop.com/about",
});

export default function AboutPage() {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <OrganizationJsonLd />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <main className="min-h-screen bg-[#f7f7f2] text-[#171713]">
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-semibold leading-tight text-[#141410] sm:text-5xl">
            About AI Premium Shop
          </h1>

          <div className="mt-8 space-y-6 text-[#4f4d42] leading-7">
            <p>
              <strong className="text-[#171713]">AI Premium Shop</strong> is Bangladesh&apos;s most
              trusted destination for premium digital subscriptions. Founded in 2024 by{" "}
              <strong className="text-[#171713]">Emon Hossain</strong> in Dhaka, we exist to solve
              a simple problem: Bangladeshi customers need access to world-class AI, design,
              productivity, and streaming tools — but international payment barriers make direct
              purchases frustrating or impossible.
            </p>

            <h2 className="text-2xl font-semibold text-[#171713]">Our mission</h2>
            <p>
              We believe that access to premium digital tools should not depend on whether you own
              a foreign credit card. Every freelancer, student, designer, developer, and business
              owner in Bangladesh deserves the same tools that power global competitors.
            </p>

            <h2 className="text-2xl font-semibold text-[#171713]">Why customers trust us</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Local payment</strong> — bKash, Nagad, Rocket, and local bank cards
              </li>
              <li>
                <strong>Speed</strong> — 15-minute average delivery via WhatsApp
              </li>
              <li>
                <strong>Human support</strong> — Real Bangladeshi support staff, not chatbots
              </li>
              <li>
                <strong>Warranty</strong> — 7-day replacement on shared slots
              </li>
              <li>
                <strong>Transparency</strong> — No hidden fees; price confirmed before payment
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#171713]">Contact</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                WhatsApp: <a href="https://wa.me/8801865385348" className="text-[#176b4d] hover:underline">+880 1865-385348</a>
              </li>
              <li>
                Email: <a href="mailto:hello@aipremiumshop.com" className="text-[#176b4d] hover:underline">hello@aipremiumshop.com</a>
              </li>
              <li>Location: Dhaka, Bangladesh</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
