import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  MessageCircle,
  Search,
  ShieldCheck,
} from "lucide-react";
import { BreadcrumbJsonLd, FAQPageJsonLd, HowToJsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import { getFeaturedItems, getWhatsappUrl } from "@/lib/data/products";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Premium AI Subscriptions in Bangladesh | AI Premium Shop",
  description:
    "Compare clearly described premium AI and productivity subscriptions in Bangladesh. Check ownership, activation method, duration, eligibility and support terms before payment.",
  canonical: "https://aipremiumshop.com",
});

const whatsappNumber = process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Hi AI Premium Shop, I want to check availability and eligibility for a premium subscription."
)}`;

const featuredProducts = getFeaturedItems().slice(0, 6);

const steps = [
  {
    icon: Search,
    title: "Choose",
    desc: "Review the plan, duration, ownership model and stated activation method.",
  },
  {
    icon: MessageCircle,
    title: "Verify",
    desc: "Ask us to confirm current availability, eligibility, final price and delivery estimate.",
  },
  {
    icon: CreditCard,
    title: "Pay",
    desc: "Pay only after the exact product and support terms are confirmed in writing.",
  },
  {
    icon: CheckCircle2,
    title: "Activate",
    desc: "Complete the disclosed activation process and verify the plan before closing the order.",
  },
];

const faqItems = [
  {
    q: "How long does activation take?",
    a: "Activation time depends on the product, eligibility and current availability. We confirm the estimated delivery time before payment.",
  },
  {
    q: "Which payment methods are available?",
    a: "Available local payment methods are confirmed during the order. Do not pay until the final price and recipient details are verified.",
  },
  {
    q: "What information should I check before buying?",
    a: "Check the exact plan, duration, account ownership, activation method, eligibility, renewal behavior, warranty scope and refund conditions.",
  },
  {
    q: "Does AI Premium Shop ask for passwords or OTPs?",
    a: "Published products should not require your email password, OTP, recovery code, browser cookie or session token. Do not share these credentials.",
  },
];

const howToSteps = steps.map((step) => ({
  name: step.title,
  text: step.desc,
}));

export default function Home() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }]} />
      <HowToJsonLd
        name="How to buy a premium subscription from AI Premium Shop"
        description="A transparent four-step process for checking, paying for and verifying a digital subscription."
        steps={howToSteps}
      />
      <FAQPageJsonLd
        items={faqItems.map((item) => ({
          question: item.q,
          answer: item.a,
        }))}
      />

      <main className="relative overflow-hidden">
        <section className="relative min-h-[78vh] flex items-center">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="gradient-orb gradient-orb-gold w-[600px] h-[600px] -top-40 -left-40 animate-pulse-glow" />
            <div className="gradient-orb gradient-orb-purple w-[500px] h-[500px] top-1/3 right-0 animate-pulse-glow" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-20">
            <div className="grid gap-14 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#f4b942]/20 bg-[#f4b942]/5 px-4 py-1.5 text-[0.8125rem] text-[#f4b942] mb-8">
                  <ShieldCheck className="size-4" />
                  Clear plan details before payment
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1]">
                  Premium AI subscriptions,
                  <span className="text-gradient"> explained clearly</span>
                </h1>

                <p className="mt-6 text-[1rem] leading-relaxed text-[#8a91a8] max-w-xl">
                  Compare available plans for Bangladesh with transparent duration,
                  ownership, activation, eligibility and support information. Final
                  availability and price are confirmed before payment.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link href="/products" className="btn-primary">
                    Browse available products
                    <ChevronRight className="size-4" />
                  </Link>
                  <a href={whatsappUrl} className="btn-secondary">
                    <MessageCircle className="size-4 text-[#25d366]" />
                    Check availability
                  </a>
                </div>

                <div className="mt-10 grid gap-3 sm:grid-cols-2 max-w-2xl">
                  {[
                    "No email password or OTP requests",
                    "Activation method disclosed before payment",
                    "Plan and duration confirmed in writing",
                    "Support terms matched to the exact product",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-[#8a91a8]">
                      <CheckCircle2 className="size-4 text-[#f4b942] shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#f4b942]">
                    Buyer checklist
                  </p>
                  <h2 className="mt-3 text-2xl font-bold">Confirm these before paying</h2>
                  <div className="mt-6 space-y-3">
                    {[
                      "Exact product and plan",
                      "Subscription duration",
                      "Customer ownership model",
                      "Activation and delivery method",
                      "Eligibility and card requirements",
                      "Renewal, warranty and refund terms",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3"
                      >
                        <span className="flex size-7 items-center justify-center rounded-full bg-[#f4b942]/10 text-xs font-bold text-[#f4b942]">
                          {index + 1}
                        </span>
                        <span className="text-sm text-[#c3c8d8]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-24 border-t border-white/[0.04]">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="text-center max-w-xl mx-auto">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">
                How it works
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
                Verify first, then pay
              </h2>
              <p className="mt-4 text-[0.9375rem] text-[#5b6280]">
                Availability, eligibility and fulfilment can vary by product.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div key={step.title} className="glass-card rounded-2xl p-6 relative">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#f4b942]/20 to-[#f4b942]/5 border border-[#f4b942]/10 mb-5">
                    <step.icon className="size-5 text-[#f4b942]" />
                  </div>
                  <div className="absolute top-6 right-6 text-[1.5rem] font-bold text-white/[0.04]">
                    0{index + 1}
                  </div>
                  <h3 className="text-[1rem] font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-[#5b6280]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">
                  Available catalog
                </p>
                <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
                  Products that pass the publication gate
                </h2>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-1 text-[0.8125rem] font-medium text-[#8a91a8] hover:text-white transition"
              >
                View all products
                <ArrowRight className="size-4" />
              </Link>
            </div>

            {featuredProducts.length > 0 ? (
              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {featuredProducts.map((product) => (
                  <article key={product.id} className="glass-card rounded-2xl overflow-hidden">
                    <div className="p-6">
                      <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-[#5b6280]">
                        {product.provider}
                      </p>
                      <h3 className="mt-1 text-[1.125rem] font-semibold text-white">
                        <Link href={`/products/${product.slug}`} className="hover:text-[#f4b942] transition">
                          {product.name}
                        </Link>
                      </h3>
                      <p className="mt-3 text-sm text-[#8a91a8] line-clamp-3">
                        {product.description}
                      </p>
                      <div className="mt-5 flex items-end justify-between gap-4">
                        <div>
                          <p className="text-xs text-[#5b6280]">Listed price</p>
                          <p className="text-xl font-bold text-white">
                            ৳{product.price.toLocaleString("en-BD")}
                          </p>
                        </div>
                        <a href={getWhatsappUrl(product)} className="btn-whatsapp h-10 text-[0.8125rem] px-4">
                          Verify & order
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-12 rounded-2xl border border-[#f4b942]/15 bg-[#f4b942]/5 p-8 text-center">
                <ShieldCheck className="mx-auto size-8 text-[#f4b942]" />
                <h3 className="mt-4 text-xl font-semibold">Catalog verification in progress</h3>
                <p className="mt-2 text-sm text-[#8a91a8] max-w-xl mx-auto">
                  Products remain unpublished until their activation method, ownership,
                  price and support terms pass review. Contact us to check a specific plan.
                </p>
                <a href={whatsappUrl} className="btn-secondary mt-6 inline-flex">
                  Check a product
                </a>
              </div>
            )}
          </div>
        </section>

        <section className="relative py-24 border-t border-white/[0.04]">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <div className="text-center">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">
                FAQ
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
                Common questions
              </h2>
            </div>

            <div className="mt-10 space-y-3">
              {faqItems.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-colors open:border-[#f4b942]/15 open:bg-white/[0.03]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
                    <span className="text-[0.9375rem] font-medium text-white">{item.q}</span>
                    <ChevronRight className="size-4 text-[#5b6280] transition-transform duration-300 group-open:rotate-90" />
                  </summary>
                  <div className="border-t border-white/[0.04] px-5 pb-4 pt-3">
                    <p className="text-[0.875rem] leading-relaxed text-[#8a91a8]">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-24 border-t border-white/[0.04]">
          <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Need help choosing the correct plan?
            </h2>
            <p className="mt-4 text-[0.9375rem] text-[#5b6280] max-w-xl mx-auto">
              Tell us your use case and budget. We will confirm what is currently available
              and disclose the activation and support terms before payment.
            </p>
            <a href={whatsappUrl} className="btn-secondary mt-8 inline-flex">
              <MessageCircle className="size-4 text-[#25d366]" />
              Ask on WhatsApp
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
