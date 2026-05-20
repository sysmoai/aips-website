import { eq } from "drizzle-orm";
import { db } from "@/db";
import { faq as faqTable } from "@/db/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { FAQPageJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "FAQ — AI Premium Shop Bangladesh",
  description:
    "Frequently asked questions about buying AI subscriptions in Bangladesh. Payment, delivery, warranty, refunds, bKash, Nagad, and more.",
  canonical: "https://aipremiumshop.com/faq",
});

async function getFaqs() {
  try {
    return await db
      .select()
      .from(faqTable)
      .where(eq(faqTable.productId, "")) // General FAQs have no productId
      .orderBy(faqTable.displayOrder);
  } catch {
    return [];
  }
}

const defaultFaqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Most orders are delivered within 15 minutes after payment confirmation. During peak hours (7 PM – 11 PM BST), delivery may take up to 45 minutes.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept bKash, Nagad, Rocket, and local Visa/Mastercard debit or credit cards. All payments are confirmed via WhatsApp for security.",
  },
  {
    question: "Are the accounts original or shared?",
    answer:
      "It depends on the product. We offer both private account setup guidance and shared slots. The exact type is confirmed with you on WhatsApp before you pay.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "Full refund if service is not delivered within 2 hours. Partial refund (50%) if you change your mind within 6 hours and credentials are unused. No refund after 24 hours or once credentials are used.",
  },
  {
    question: "Do you offer a warranty?",
    answer:
      "Yes. Shared slots include a 7-day replacement guarantee if the account stops working. Private setups include 30 days of free activation support.",
  },
  {
    question: "Can I pay after receiving the product?",
    answer:
      "No. We require payment before delivery to prevent fraud. We have served 10,000+ customers and verify every transaction on WhatsApp.",
  },
  {
    question: "Do you sell to customers outside Bangladesh?",
    answer:
      "Our primary market is Bangladesh. However, Bangladeshi diaspora customers can pay for family or friends living in BD.",
  },
  {
    question: "How do I renew my subscription?",
    answer:
      "We send a renewal reminder 48 hours before expiry. Simply message us on WhatsApp and we will process the renewal with the same 15-minute delivery speed.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "We never store your bKash/Nagad login or card numbers. We only log transaction IDs for dispute resolution. All customer data is stored in encrypted databases.",
  },
  {
    question: "What if the product I want is not listed?",
    answer:
      "Message us on WhatsApp with the product name. We can often source subscriptions not yet listed on the website.",
  },
];

export default async function FAQPage() {
  const dbFaqs = await getFaqs();
  const faqItems =
    dbFaqs.length > 0
      ? dbFaqs.map((f) => ({ question: f.question, answer: f.answer }))
      : defaultFaqs;

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <>
      <FAQPageJsonLd items={faqItems} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <main className="min-h-screen bg-[#f7f7f2] text-[#171713]">
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-semibold leading-tight text-[#141410] sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg leading-7 text-[#5c5a4e]">
            Everything you need to know about buying premium subscriptions in Bangladesh.
          </p>

          <dl className="mt-10 space-y-4">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#dfded4] bg-white p-6 transition hover:shadow-sm"
              >
                <dt className="text-lg font-semibold text-[#171713]">{item.question}</dt>
                <dd className="mt-2 leading-7 text-[#4f4d42]">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
    </>
  );
}
