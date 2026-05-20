import {
  BadgeCheck,
  ChevronRight,
  Clock3,
  Headphones,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  WalletCards,
} from "lucide-react";
import {
  FAQPageJsonLd,
  HowToJsonLd,
  BreadcrumbJsonLd,
} from "@/components/seo/json-ld";
import Link from "next/link";
import { getFeaturedItems, getWhatsappUrl } from "@/lib/data/products";

const whatsappNumber = process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Hi AI Premium Shop, I want to order a premium subscription."
)}`;

const featuredProducts = getFeaturedItems().slice(0, 6);

function getCategoryGradient(category: string): string {
  const map: Record<string, string> = {
    "ai-assistant": "from-emerald-500 to-cyan-500",
    "ai-code": "from-violet-500 to-fuchsia-500",
    "ai-image": "from-pink-500 to-rose-500",
    "ai-video": "from-orange-500 to-red-500",
    "ai-voice-music": "from-amber-400 to-yellow-500",
    "ai-workspace": "from-sky-500 to-blue-600",
    "ai-writing": "from-teal-400 to-emerald-500",
    bundles: "from-indigo-500 to-purple-600",
  };
  return map[category] ?? "from-gray-500 to-slate-600";
}

const stats = [
  ["10k+", "successful orders"],
  ["15 min", "typical delivery"],
  ["24/7", "WhatsApp support"],
];

const steps = [
  "Choose the subscription you need",
  "Confirm availability on WhatsApp",
  "Pay locally and receive setup details",
];

const faqItems = [
  {
    question: "What is AI Premium Shop?",
    answer:
      "AI Premium Shop is Bangladesh's trusted store for premium digital subscriptions. We sell AI tools, design software, streaming services, and productivity apps with local payment (bKash, Nagad, Rocket) and 15-minute WhatsApp delivery.",
  },
  {
    question: "How do I buy ChatGPT Plus in Bangladesh?",
    answer:
      "Click 'Order via WhatsApp' on our ChatGPT Plus product page, send the pre-filled message, confirm price and availability with our support team, pay via bKash or Nagad, and receive your account details within 15 minutes.",
  },
  {
    question: "Is it safe to buy from AI Premium Shop?",
    answer:
      "Yes. We have served 10,000+ customers since 2024. We offer a 7-day replacement warranty on shared slots and 30-day activation support for private accounts. All payments are confirmed on WhatsApp before delivery.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept bKash, Nagad, Rocket, and local Visa/Mastercard debit or credit cards. We do not require foreign credit cards.",
  },
  {
    question: "How fast is delivery?",
    answer:
      "Average delivery time is 15 minutes after payment confirmation. During peak hours (7 PM – 11 PM BST), it may take up to 45 minutes.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Full refund if service is not delivered within 2 hours. Partial refund (50%) if you change your mind within 6 hours and credentials are unused. No refund after 24 hours or once credentials are used.",
  },
];

const howToSteps = [
  {
    name: "Browse subscriptions",
    text: "Visit aipremiumshop.com and choose from AI assistants, design tools, streaming services, and productivity apps.",
  },
  {
    name: "Order via WhatsApp",
    text: "Click the 'Order via WhatsApp' button and send the pre-filled message to our support team.",
  },
  {
    name: "Confirm and pay",
    text: "Our team confirms availability, plan type, and final price. Pay via bKash, Nagad, Rocket, or card.",
  },
  {
    name: "Receive instantly",
    text: "Get your login credentials or setup guide delivered on WhatsApp within 15 minutes.",
  },
];

export default function Home() {
  return (
    <>
      {/* Structured data for homepage */}
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }]} />
      <HowToJsonLd
        name="How to buy premium subscriptions in Bangladesh"
        description="A simple 4-step guide to ordering AI tools, design software, and streaming services from AI Premium Shop with local payment."
        totalTime="PT15M"
        steps={howToSteps}
      />
      <FAQPageJsonLd items={faqItems} />

      <main className="min-h-screen bg-[#f7f7f2] text-[#171713]">
        <header className="border-b border-[#dfded4] bg-[#fbfaf4]/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-3" aria-label="AI Premium Shop home">
              <span className="flex size-10 items-center justify-center rounded-lg bg-[#171713] text-sm font-bold text-white">
                AI
              </span>
              <span>
                <span className="block text-sm font-semibold uppercase tracking-wide">
                  AI Premium Shop
                </span>
                <span className="block text-xs text-[#666454]">Digital subscriptions in BD</span>
              </span>
            </Link>
            <nav className="hidden items-center gap-6 text-sm font-medium text-[#4f4d42] md:flex">
              <Link href="/products" className="hover:text-[#171713]">Products</Link>
              <a href="#process" className="hover:text-[#171713]">How it works</a>
              <Link href="/blog" className="hover:text-[#171713]">Blog</Link>
              <Link href="/faq" className="hover:text-[#171713]">FAQ</Link>
            </nav>
            <a
              href={whatsappUrl}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#176b4d] px-4 text-sm font-semibold text-white transition hover:bg-[#11543c]"
            >
              <MessageCircle className="size-4" />
              Order
            </a>
          </div>
        </header>

        {/* Hero — SEO-optimized H1 */}
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-14">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-lg border border-[#d7d5c9] bg-white px-3 py-2 text-sm font-medium text-[#4f4d42]">
              <Sparkles className="size-4 text-[#b98900]" />
              Premium access, local payment, human support
            </div>
            {/* SEO-critical H1: primary keywords + location + category */}
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-[#141410] sm:text-5xl lg:text-6xl">
              Buy Premium AI Subscriptions in Bangladesh — ChatGPT Plus, Claude Pro & More
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#5c5a4e] sm:text-lg">
              AI Premium Shop helps Bangladesh customers activate, renew, and manage premium
              tools like ChatGPT, Canva, Netflix, YouTube Premium, and productivity subscriptions with
              clear pricing and WhatsApp-first service. Accepts bKash, Nagad, and Rocket.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#171713] px-5 text-sm font-semibold text-white transition hover:bg-[#2b2a24]"
              >
                Browse products
                <ChevronRight className="size-4" />
              </Link>
              <a
                href={whatsappUrl}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[#c9c7bb] bg-white px-5 text-sm font-semibold text-[#171713] transition hover:bg-[#f0efe7]"
              >
                <MessageCircle className="size-4" />
                Chat on WhatsApp
              </a>
            </div>
            <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
              {stats.map(([value, label]) => (
                <div key={label} className="border-l border-[#d7d5c9] pl-3">
                  <p className="text-2xl font-semibold text-[#171713]">{value}</p>
                  <p className="text-xs leading-5 text-[#666454]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[520px] overflow-hidden rounded-lg bg-[#171713] p-5 text-white shadow-2xl shadow-[#171713]/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(72,187,120,0.28),transparent_30%),radial-gradient(circle_at_85%_35%,rgba(56,189,248,0.22),transparent_28%),linear-gradient(145deg,#171713,#24231e)]" />
            <div className="relative flex h-full flex-col justify-between gap-6">
              <div className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-white text-[#171713]">
                    <Search className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white/65">Today&apos;s request</p>
                    <p className="font-semibold">Best AI tool for business writing</p>
                  </div>
                </div>
              </div>
              <div className="grid gap-3">
                {featuredProducts.slice(0, 3).map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="flex items-center justify-between rounded-lg border border-white/12 bg-white/[0.08] p-4 backdrop-blur transition hover:bg-white/[0.12]"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`size-11 rounded-lg bg-gradient-to-br ${getCategoryGradient(product.category)}`} />
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-white/60">{product.tier}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">৳{product.price.toLocaleString("en-BD")}</p>
                      <p className="text-xs text-white/55">{product.accessType}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="rounded-lg bg-white p-3 text-[#171713]">
                  <BadgeCheck className="mb-3 size-5 text-[#176b4d]" />
                  Verified delivery
                </div>
                <div className="rounded-lg bg-white p-3 text-[#171713]">
                  <WalletCards className="mb-3 size-5 text-[#8a5d00]" />
                  bKash/Nagad
                </div>
                <div className="rounded-lg bg-white p-3 text-[#171713]">
                  <Clock3 className="mb-3 size-5 text-[#1b6386]" />
                  Fast renewals
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products section — internal links to detail pages */}
        <section id="products" className="border-y border-[#dfded4] bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-[#176b4d]">
                  Popular subscriptions
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-[#171713]">
                  Ready-to-order plans
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-[#666454]">
                Prices can change with supplier availability. Confirm the final plan, slot type,
                and delivery time with support before payment.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <article
                  key={product.id}
                  className="rounded-lg border border-[#dfded4] bg-[#fbfaf4] p-5"
                >
                  <div className={`mb-5 h-28 rounded-lg bg-gradient-to-br ${getCategoryGradient(product.category)}`} />
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#666454]">
                        {product.provider}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold text-[#171713]">
                        <Link href={`/products/${product.slug}`} className="hover:text-[#176b4d]">
                          {product.name}
                        </Link>
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">৳{product.price.toLocaleString("en-BD")}</p>
                      <p className="text-xs text-[#666454]">{product.tier}</p>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-3 text-sm text-[#4f4d42]">
                    {product.capabilities.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <ShieldCheck className="size-4 text-[#176b4d]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={getWhatsappUrl(product)}
                    className="mt-6 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#171713] px-4 text-sm font-semibold text-white transition hover:bg-[#2b2a24]"
                  >
                    Order now
                    <ChevronRight className="size-4" />
                  </a>
                </article>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/products"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#c9c7bb] bg-white px-5 text-sm font-semibold text-[#171713] transition hover:bg-[#f0efe7]"
              >
                View all products
                <ChevronRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Process section */}
        <section id="process" className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#176b4d]">
              Simple process
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-[#171713]">
              Built for fast, repeat orders.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step} className="rounded-lg border border-[#dfded4] bg-white p-5">
                <span className="flex size-9 items-center justify-center rounded-lg bg-[#f0efe7] text-sm font-semibold">
                  {index + 1}
                </span>
                <p className="mt-5 font-semibold leading-6">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ section for homepage SEO */}
        <section className="border-y border-[#dfded4] bg-white py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#176b4d]">
              Common questions
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-[#171713]">
              FAQ — Buying AI subscriptions in Bangladesh
            </h2>
            <dl className="mt-8 space-y-4">
              {faqItems.slice(0, 4).map((item, i) => (
                <div key={i} className="rounded-lg border border-[#dfded4] bg-[#fbfaf4] p-5">
                  <dt className="font-semibold text-[#171713]">{item.question}</dt>
                  <dd className="mt-2 text-sm leading-6 text-[#4f4d42]">{item.answer}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 text-center">
              <a
                href="/faq"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#c9c7bb] bg-white px-5 text-sm font-semibold text-[#171713] transition hover:bg-[#f0efe7]"
              >
                View all FAQs
                <ChevronRight className="size-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Support section */}
        <section id="support" className="bg-[#171713] py-12 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#8ee5bf]">
                Support-first commerce
              </p>
              <h2 className="mt-2 text-3xl font-semibold">
                Need help choosing the right plan?
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-white/68">
                Ask about account type, renewal date, warranty, payment method, and delivery
                expectations before placing your order.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                [Headphones, "Human help"],
                [Star, "Trusted sellers"],
                [MessageCircle, "WhatsApp flow"],
              ].map(([Icon, label]) => (
                <div key={label as string} className="rounded-lg border border-white/15 bg-white/10 p-5">
                  <Icon className="mb-4 size-5 text-[#8ee5bf]" />
                  <p className="font-semibold">{label as string}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
