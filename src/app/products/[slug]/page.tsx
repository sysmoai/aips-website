import { notFound } from "next/navigation";
import { getProductBySlug, getWhatsappUrl } from "@/lib/data/products";
import { buildProductMetadata } from "@/lib/seo/metadata";
import {
  ProductJsonLd,
  BreadcrumbJsonLd,
  FAQPageJsonLd,
  HowToJsonLd,
} from "@/components/seo/json-ld";
import type { Metadata } from "next";
import Link from "next/link";
import { getProductGroups } from "@/lib/data/products";

export function generateStaticParams() {
  return getProductGroups().map((g) => ({ slug: g.slug }));
}

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */
interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const group = getProductBySlug(slug);

  if (!group) {
    return {
      title: "Product Not Found | AI Premium Shop",
      robots: { index: false, follow: false },
    };
  }

  return buildProductMetadata({
    name: group.brand,
    shortDescription: group.description,
    slug: group.slug,
    basePriceBdt: group.minPrice,
  });
}

/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const group = getProductBySlug(slug);

  if (!group) {
    notFound();
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348";
  const mainVariant = group.variants[0];

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: group.brand, path: `/products/${group.slug}` },
  ];

  const faqItems = [
    {
      question: `How long does ${group.brand} delivery take?`,
      answer: `Most orders are delivered within ${mainVariant.deliverySLA} after payment confirmation via WhatsApp. During peak hours (7 PM – 11 PM BST), delivery may take slightly longer.`,
    },
    {
      question: `Is the ${group.brand} account original or shared?`,
      answer:
        "We offer both private setup guidance and shared slot options depending on the product. The exact account type is confirmed with you on WhatsApp before payment.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept bKash, Nagad, Rocket, and local bank cards (Visa/Mastercard). All payments are confirmed via WhatsApp screenshot for your security.",
    },
    {
      question: "What is your refund policy?",
      answer:
        "Full refund if service is not delivered within 2 hours. Partial refund (50%) if you change your mind within 6 hours and credentials are unused. No refund after 24 hours or once credentials are used.",
    },
    {
      question: "Do you offer a warranty?",
      answer:
        "Yes. Shared slots come with a 7-day replacement guarantee if account stops working. Private account setups include 30 days of free activation support.",
    },
  ];

  const howToSteps = [
    {
      name: "Choose your plan",
      text: `Select the ${group.brand} plan that fits your needs on the product page.`,
    },
    {
      name: "Confirm on WhatsApp",
      text: `Click "Order via WhatsApp" and send the pre-filled message. Our support team will confirm availability and final price.`,
    },
    {
      name: "Pay locally",
      text: "Send payment via bKash, Nagad, Rocket, or bank card. Share the transaction screenshot on WhatsApp.",
    },
    {
      name: "Receive instantly",
      text: "Get your login credentials or setup guide delivered on WhatsApp within minutes.",
    },
  ];

  return (
    <>
      {/* Structured data */}
      <ProductJsonLd
        name={group.brand}
        description={group.description}
        slug={group.slug}
        priceBdt={group.minPrice}
        categoryName={group.category}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <FAQPageJsonLd items={faqItems} />
      <HowToJsonLd
        name={`How to activate ${group.brand} in Bangladesh`}
        description={`Step-by-step guide to buying and activating ${group.brand} in Bangladesh through AI Premium Shop.`}
        totalTime="PT15M"
        estimatedCost={{ currency: "BDT", value: String(group.minPrice) }}
        steps={howToSteps}
      />

      <main className="min-h-screen bg-[#f7f7f2] text-[#171713]">
        {/* Breadcrumb nav (visual) */}
        <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 py-4 text-sm text-[#666454] sm:px-6 lg:px-8">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="hover:text-[#171713] hover:underline">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/products" className="hover:text-[#171713] hover:underline">Products</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-[#171713]">
              {group.brand}
            </li>
          </ol>
        </nav>

        {/* Product hero */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Image area */}
            <div
              className="relative aspect-[4/3] overflow-hidden rounded-lg flex items-center justify-center text-white text-3xl font-bold"
              style={{ backgroundColor: mainVariant.brandColor }}
            >
              {group.brand}
            </div>

            {/* Info area */}
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#176b4d]">
                {group.provider}
              </p>
              <h1 className="mt-2 text-4xl font-semibold leading-tight text-[#141410] sm:text-5xl">
                {group.brand} in Bangladesh
              </h1>
              <p className="mt-4 text-lg leading-7 text-[#5c5a4e]">
                {group.description}
              </p>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#171713]">
                  ৳{group.minPrice.toLocaleString("en-BD")}
                </span>
                {group.maxPrice > group.minPrice && (
                  <span className="text-lg text-[#666454]">
                    – ৳{group.maxPrice.toLocaleString("en-BD")}
                  </span>
                )}
                <span className="text-sm text-[#666454]">/ month</span>
              </div>

              {/* Trust badges */}
              <div className="mt-4 flex flex-wrap gap-2 text-sm text-[#4f4d42]">
                <span className="inline-flex items-center gap-1 rounded-md border border-[#d7d5c9] bg-white px-2 py-1">
                  ✓ {mainVariant.deliverySLA} delivery
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-[#d7d5c9] bg-white px-2 py-1">
                  ✓ bKash / Nagad
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-[#d7d5c9] bg-white px-2 py-1">
                  ✓ 7-day warranty
                </span>
              </div>

              {/* CTA */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  `Hi AI Premium Shop, I want ${group.brand}.`
                )}`}
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#176b4d] px-6 text-sm font-semibold text-white transition hover:bg-[#11543c]"
              >
                Order via WhatsApp
              </a>
              <p className="mt-2 text-xs text-[#666454]">
                Support: +880 {whatsappNumber.replace(/^880/, "")} · Available 24/7
              </p>
            </div>
          </div>
        </section>

        {/* Variants */}
        {group.variants.length > 0 && (
          <section className="border-y border-[#dfded4] bg-white py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-semibold text-[#171713]">Available plans</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {group.variants.map((v) => (
                  <div
                    key={v.id}
                    className="rounded-lg border border-[#dfded4] bg-[#fbfaf4] p-5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold text-[#171713]">{v.name}</h3>
                      {v.badge && (
                        <span className="shrink-0 rounded-md bg-[#176b4d] px-2 py-0.5 text-xs font-semibold text-white">
                          {v.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-[#666454]">{v.tier} · {v.accessType}</p>
                    <p className="mt-2 text-2xl font-bold text-[#171713]">
                      ৳{v.price.toLocaleString("en-BD")}
                    </p>
                    {v.capabilities && v.capabilities.length > 0 && (
                      <ul className="mt-3 flex flex-wrap gap-1">
                        {v.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="rounded-md bg-white px-2 py-1 text-xs text-[#4f4d42] border border-[#dfded4]"
                          >
                            {cap}
                          </li>
                        ))}
                      </ul>
                    )}
                    <a
                      href={getWhatsappUrl(v)}
                      className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#171713] text-sm font-semibold text-white transition hover:bg-[#2b2a24]"
                    >
                      Order this plan
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Long-form content for SEO */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-[#171713]">
            What is {group.brand} and why do Bangladeshi users need it?
          </h2>
          <div className="mt-4 space-y-4 text-[#4f4d42] leading-7">
            <p>
              {group.brand} is one of the most sought-after premium subscriptions among Bangladeshi
              freelancers, students, and professionals. International payment barriers make it
              difficult to purchase directly from the official provider. AI Premium Shop solves this
              by accepting local payments and delivering within minutes.
            </p>
            <p>
              Whether you are preparing for IELTS, working on Upwork/Fiverr, building a startup,
              or managing a creative agency, {group.brand} gives you the competitive edge you need.
              Our Bangladesh-based support team understands local use cases and helps you get
              started immediately.
            </p>
          </div>

          <h3 className="mt-8 text-xl font-semibold text-[#171713]">
            How to buy {group.brand} in Bangladesh
          </h3>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-[#4f4d42] leading-7">
            <li>Click <strong>Order via WhatsApp</strong> on this page.</li>
            <li>Send the pre-filled message to our support team.</li>
            <li>Confirm plan type, price, and availability.</li>
            <li>Pay via bKash, Nagad, Rocket, or bank card.</li>
            <li>Receive credentials or setup guide within {mainVariant.deliverySLA}.</li>
          </ol>

          <h3 className="mt-8 text-xl font-semibold text-[#171713]">Payment methods accepted</h3>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-[#4f4d42] leading-7">
            <li><strong>bKash</strong> — Most popular mobile wallet in Bangladesh</li>
            <li><strong>Nagad</strong> — Government-backed digital payment</li>
            <li><strong>Rocket</strong> — Dutch-Bangla Bank mobile banking</li>
            <li><strong>Visa / Mastercard</strong> — Local issuing bank cards</li>
          </ul>
        </section>

        {/* FAQ section */}
        <section className="border-t border-[#dfded4] bg-white py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-[#171713]">
              Frequently asked questions about {group.brand}
            </h2>
            <dl className="mt-6 space-y-6">
              {faqItems.map((item, i) => (
                <div key={i} className="rounded-lg border border-[#dfded4] bg-[#fbfaf4] p-5">
                  <dt className="font-semibold text-[#171713]">{item.question}</dt>
                  <dd className="mt-2 text-[#4f4d42] leading-7">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
    </>
  );
}
