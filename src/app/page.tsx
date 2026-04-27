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

const whatsappNumber = process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Hi AI Premium Shop, I want to order a premium subscription."
)}`;

const products = [
  {
    name: "ChatGPT Plus",
    category: "AI assistant",
    price: "৳1,499",
    term: "1 month",
    accent: "from-emerald-500 to-cyan-500",
    features: ["Fast activation", "Private setup guidance", "Renewal support"],
  },
  {
    name: "Canva Pro",
    category: "Design",
    price: "৳399",
    term: "1 month",
    accent: "from-sky-500 to-violet-500",
    features: ["Team access", "Brand kit ready", "Template support"],
  },
  {
    name: "Netflix Premium",
    category: "Streaming",
    price: "৳349",
    term: "1 month",
    accent: "from-red-500 to-rose-600",
    features: ["Shared slot", "Instant delivery", "Replacement support"],
  },
  {
    name: "YouTube Premium",
    category: "Entertainment",
    price: "৳299",
    term: "1 month",
    accent: "from-amber-400 to-red-500",
    features: ["Ad-free viewing", "Family-ready options", "Quick renewal"],
  },
];

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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f7f2] text-[#171713]">
      <header className="border-b border-[#dfded4] bg-[#fbfaf4]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-3" aria-label="AI Premium Shop home">
            <span className="flex size-10 items-center justify-center rounded-lg bg-[#171713] text-sm font-bold text-white">
              AI
            </span>
            <span>
              <span className="block text-sm font-semibold uppercase tracking-wide">
                AI Premium Shop
              </span>
              <span className="block text-xs text-[#666454]">Digital subscriptions in BD</span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-medium text-[#4f4d42] md:flex">
            <a href="#products" className="hover:text-[#171713]">Products</a>
            <a href="#process" className="hover:text-[#171713]">How it works</a>
            <a href="#support" className="hover:text-[#171713]">Support</a>
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

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-14">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-lg border border-[#d7d5c9] bg-white px-3 py-2 text-sm font-medium text-[#4f4d42]">
            <Sparkles className="size-4 text-[#b98900]" />
            Premium access, local payment, human support
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-[#141410] sm:text-5xl lg:text-6xl">
            Buy trusted digital subscriptions without the headache.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#5c5a4e] sm:text-lg">
            AI Premium Shop helps Bangladesh customers activate, renew, and manage premium
            tools like ChatGPT, Canva, streaming, design, and productivity subscriptions with
            clear pricing and WhatsApp-first service.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#products"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#171713] px-5 text-sm font-semibold text-white transition hover:bg-[#2b2a24]"
            >
              Browse products
              <ChevronRight className="size-4" />
            </a>
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
              {products.slice(0, 3).map((product) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between rounded-lg border border-white/12 bg-white/[0.08] p-4 backdrop-blur"
                >
                  <div className="flex items-center gap-3">
                    <div className={`size-11 rounded-lg bg-gradient-to-br ${product.accent}`} />
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-white/60">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{product.price}</p>
                    <p className="text-xs text-white/55">{product.term}</p>
                  </div>
                </div>
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
            {products.map((product) => (
              <article
                key={product.name}
                className="rounded-lg border border-[#dfded4] bg-[#fbfaf4] p-5"
              >
                <div className={`mb-5 h-28 rounded-lg bg-gradient-to-br ${product.accent}`} />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#666454]">
                      {product.category}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-[#171713]">{product.name}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">{product.price}</p>
                    <p className="text-xs text-[#666454]">{product.term}</p>
                  </div>
                </div>
                <ul className="mt-5 space-y-3 text-sm text-[#4f4d42]">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <ShieldCheck className="size-4 text-[#176b4d]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappUrl}
                  className="mt-6 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#171713] px-4 text-sm font-semibold text-white transition hover:bg-[#2b2a24]"
                >
                  Order now
                  <ChevronRight className="size-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

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
  );
}
