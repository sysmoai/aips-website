import { buildMetadata } from "@/lib/seo/metadata";
import { FAQPageJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import { MessageCircle, ChevronRight } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "FAQ — AI Premium Shop Bangladesh",
  description:
    "Answers to common questions about ChatGPT Plus, Midjourney, Canva Pro, and more in Bangladesh. Payment, delivery, warranty, and Resolution Policy.",
  canonical: "https://aipremiumshop.com/faq",
});

const defaultFaqs = [
  // ORDERING & DELIVERY (7 questions)
  {
    q: "How does delivery work?",
    a: "After you confirm your order on WhatsApp and send a payment screenshot, we verify the transaction and send your login credentials within 5–15 minutes. Personal Accounts take 2-4 hours due to individual setup. During peak hours (7 PM – 11 PM BST), delivery may take slightly longer.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept bKash Send Money, Nagad Send Money, Rocket, and local bank cards (Visa/Mastercard via SSLCommerz). All payments are confirmed via WhatsApp screenshot for your security. We do not accept PayPal or international credit cards.",
  },
  {
    q: "How fast is delivery?",
    a: "Shared plan deliveries: 5–15 minutes after payment confirmation. Personal Account setup: 2–4 hours (due to email setup and verification). Bulk orders: 24–48 hours. We always deliver faster than the industry average.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes, full refund if not delivered within 2 hours. 50% refund if you change your mind within 6 hours and credentials are unused. No refunds after 24 hours or if credentials are actively used. Shared plans include 7-day replacement warranty.",
  },
  {
    q: "Do you charge any hidden fees?",
    a: "No hidden fees. The price you see is the price you pay. All taxes and processing fees (if any) are included in the quoted amount.",
  },
  {
    q: "Can I get a refund or replacement if the account doesn't work?",
    a: "Yes, absolutely. All shared plans have a 7-day replacement warranty. If the service stops working, we replace it immediately at no extra cost. For personal accounts, we offer 30-day activation support.",
  },
  {
    q: "What if I don't receive my order after 2 hours?",
    a: "Contact us immediately on WhatsApp with your order ID. We will either redeliver or provide a full refund within 1 hour. We take delivery guarantees very seriously.",
  },

  // ACCOUNT TYPES & SAFETY (8 questions)
  {
    q: "Are these official subscriptions?",
    a: "Personal Accounts are official subscriptions set up through the brand's legitimate process using real payment methods. Shared Accounts are pre-registered subscriptions shared among a small group. Both are real, working subscriptions — not trials or hacks.",
  },
  {
    q: "Are the accounts original? Will my account get banned?",
    a: "Personal Accounts are 100% original and set up through standard sign-up. Shared slots are pre-registered with small groups. We are an independent reseller. Shared slots carry a small inherent risk (like any shared service) — which is why we offer a 7-day replacement warranty.",
  },
  {
    q: "Is this safe? Can I trust AI Premium Shop?",
    a: "Yes. We have 5000+ happy customers since 2024 with zero data breaches. We never store your payment details. All transactions are verified via screenshot. We operate fully transparently on WhatsApp.",
  },
  {
    q: "What's the difference between Personal and Shared accounts?",
    a: "Personal: Your own dedicated account, full control, ৳2,990+/month. Shared: Account shared with a small group, cheaper (৳350–৳950), 7-day warranty. Choose based on budget and privacy needs.",
  },
  {
    q: "Can I use my own email address?",
    a: "For Personal Account products, yes, you use your own email. For shared slot products, the account is pre-registered with our email. We confirm which option is available before you pay.",
  },
  {
    q: "Is my payment information secure?",
    a: "Completely secure. We never collect your bKash PIN, Nagad password, or bank card details. You pay directly from your app. We only receive the transaction screenshot for verification.",
  },
  {
    q: "Can I change the password on my shared account?",
    a: "No, shared accounts are managed by us to ensure continuity for all users. But your chat history remains private and separated. For full control, upgrade to a Personal Account.",
  },
  {
    q: "How many people can use a shared account at once?",
    a: "Maximum 3–5 concurrent sessions depending on the platform. For dedicated 24/7 access without limits, choose a Personal Account.",
  },

  // PAYMENT (7 questions)
  {
    q: "How do I pay with bKash?",
    a: "We send you a bKash merchant number. Open your bKash app → Payment → Enter merchant number → Enter amount → Confirm. Take a screenshot of the success message and send it to us on WhatsApp.",
  },
  {
    q: "Do you accept international payments or credit cards?",
    a: "We primarily serve Bangladeshi customers through bKash, Nagad, and Rocket. We do not accept international credit cards directly, but we can arrange payment for international customers through a middleman if needed. Contact us on WhatsApp.",
  },
  {
    q: "What if my bKash payment fails?",
    a: "Try again with a fresh transaction. If it fails 3+ times, you likely don't have enough balance. Recharge your bKash and retry. We only confirm success after seeing the screenshot.",
  },
  {
    q: "Can I negotiate the price?",
    a: "Prices are fixed for our standard products. However, for bulk orders (10+ accounts), corporate clients, or educational institutions, we offer special discounts. Contact us on WhatsApp with your requirements.",
  },
  {
    q: "Do you offer payment plans (installments)?",
    a: "Currently, we require full payment upfront for standard orders. For high-value corporate orders, we can discuss payment terms. Contact us for details.",
  },
  {
    q: "Can I pay and receive the account later?",
    a: "No, we deliver immediately after payment confirmation. If you want the account at a future date, we recommend paying closer to when you need it.",
  },
  {
    q: "Is payment on WhatsApp safe?",
    a: "We never ask for bKash/Nagad login details via WhatsApp. You pay through your own app directly. We only need the screenshot of the success confirmation. Always verify the WhatsApp number is authentic before sending payment.",
  },

  // ACCOUNT MANAGEMENT (8 questions)
  {
    q: "Can I upgrade or change my plan later?",
    a: "Yes, you can upgrade from shared to personal anytime. We calculate the price difference and apply it to your new plan. Contact us on WhatsApp to discuss changes.",
  },
  {
    q: "Do subscriptions auto-renew?",
    a: "No automatic charging. Each month, we send you a reminder on WhatsApp. You manually renew by sending payment again. This gives you complete control over your spending.",
  },
  {
    q: "What happens when my subscription ends?",
    a: "You lose access to the service. If you want to continue, send payment again within 24 hours and we'll reactivate your account. No penalties for gaps in subscription.",
  },
  {
    q: "Can I pause my subscription temporarily?",
    a: "We don't charge automatically, so you can simply skip a month without penalty. When you're ready to resume, just message us and we'll reactivate.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. You can stop using your account anytime. Subscriptions don't auto-renew, so you never have to cancel — just stop renewing.",
  },
  {
    q: "Can I get a refund if I change my mind?",
    a: "Full refund if within 6 hours and credentials unused. After 24 hours or once the account is actively used, no refunds apply.",
  },
  {
    q: "What is your Resolution Policy?",
    a: "Full refund if not delivered within 2 hours. Partial (50%) refund within 6 hours if unused. 7-day replacement warranty for shared plans. 30-day activation support for personal plans.",
  },
  {
    q: "Can I transfer my account to someone else?",
    a: "For shared plans: Contact us first. For personal plans: Yes, you can share credentials with family. Verify that the platform allows account sharing first.",
  },

  // PRODUCTS & FEATURES (8 questions)
  {
    q: "Do all products work in Bangladesh?",
    a: "Yes, all products (ChatGPT, Claude, Midjourney, etc.) work perfectly in Bangladesh. Most are accessible from Bangladesh internet, and we handle any setup required.",
  },
  {
    q: "Can I use the account if I'm outside Bangladesh?",
    a: "Yes, all accounts work globally. You can be anywhere in the world and access your service 24/7.",
  },
  {
    q: "Does ChatGPT Plus include web browsing?",
    a: "Yes, ChatGPT Plus includes web browsing, image generation (DALL-E), file upload, and more. All features included in the subscription.",
  },
  {
    q: "Which AI tool should I buy?",
    a: "It depends on your needs: ChatGPT for general use, Claude for deep analysis, Midjourney for images, GitHub Copilot for coding. Start with ChatGPT Plus if unsure — most versatile.",
  },
  {
    q: "Can I switch between different AI tools?",
    a: "Yes, you can buy multiple tools simultaneously. We offer bulk discounts for 5+ simultaneous accounts.",
  },
  {
    q: "What if the AI tool I want isn't listed?",
    a: "We have 118+ AI tools in stock. If you can't find what you want, message us on WhatsApp and we'll check availability or arrange a custom order.",
  },
  {
    q: "Do you offer discounts for students?",
    a: "Yes! Students get 10% off most products. Message us on WhatsApp with proof of student status for the discount code.",
  },
  {
    q: "Do you have a referral program?",
    a: "Yes! Refer a friend and earn ৳500 credit per successful referral. No limit on referrals. Contact us for referral link.",
  },

  // SUPPORT & DOCUMENTATION (8 questions)
  {
    q: "Do you provide invoices or receipts?",
    a: "Yes, we can provide digital receipts for tax/documentation purposes. Message us on WhatsApp after delivery and we'll send a receipt.",
  },
  {
    q: "What if I forget my account password?",
    a: "For personal accounts, use the platform's 'Forgot Password' feature. For shared accounts, we can reset and resend credentials.",
  },
  {
    q: "Is there a tutorial or guide for using the AI tools?",
    a: "Yes! We provide setup guides for every product. Many tools also have official tutorials on their websites. We also offer 1-on-1 setup calls for complex products.",
  },
  {
    q: "Do you offer customer support?",
    a: "Yes, 24/7 support on WhatsApp. Response time: usually within 5 minutes during business hours, up to 30 minutes at night.",
  },
  {
    q: "Can I schedule a demo or consultation?",
    a: "Yes! For enterprise clients or bulk orders, we offer free 30-minute consultations. Message us to schedule.",
  },
  {
    q: "What's your response time on WhatsApp?",
    a: "During business hours (9 AM – 11 PM): 5–15 minutes. Outside business hours: 30 minutes to 2 hours. Urgent issues are prioritized.",
  },
  {
    q: "Do you have a knowledge base or FAQ documentation?",
    a: "Yes, we have detailed guides for every product on our blog. We also send setup guides via WhatsApp after delivery.",
  },
  {
    q: "Can I request a feature or suggest an improvement?",
    a: "Yes! All feedback is welcome. Message us on WhatsApp with suggestions. We actively incorporate customer feedback.",
  },

  // BULK & BUSINESS (6 questions)
  {
    q: "Do you support bulk orders for teams or agencies?",
    a: "Yes, we offer bulk pricing for agencies, development teams, design studios, and educational institutions. Contact us for custom quotes and dedicated support.",
  },
  {
    q: "Do you have an affiliate or reseller program?",
    a: "Yes! For agencies and resellers, we offer 20–30% commission on bulk orders. Inquire on WhatsApp for partnership details.",
  },
  {
    q: "Can you set up accounts for my entire team?",
    a: "Yes, absolutely. We handle bulk onboarding for teams of any size. We can set up 50+ accounts in 24 hours with dedicated team support.",
  },
  {
    q: "Do you offer corporate licenses or site licenses?",
    a: "We primarily work with individual and team subscriptions. For large corporate needs, contact us — we can arrange special licensing.",
  },
  {
    q: "What's the best way to bulk order?",
    a: "Send us a list of products and quantities on WhatsApp. We'll provide a bulk quote and can set up all accounts within 24 hours.",
  },
  {
    q: "Can I get a dedicated account manager for bulk orders?",
    a: "Yes! Orders of 20+ accounts include a dedicated account manager for setup, support, and renewals.",
  },

  // TRUST & GUARANTEE (6 questions)
  {
    q: "How long has AI Premium Shop been operating?",
    a: "Since 2024, serving 5000+ customers across Bangladesh with zero security incidents or data breaches.",
  },
  {
    q: "What's your satisfaction guarantee?",
    a: "100% satisfaction guaranteed or full refund within 2 hours of delivery. If you're not satisfied for any reason, we'll refund immediately.",
  },
  {
    q: "Do you guarantee the account will keep working?",
    a: "Shared plans: 7-day replacement warranty. Personal plans: 30-day activation support. Platform changes or terms violations may affect access — we're not responsible for platform policy changes.",
  },
  {
    q: "What if the provider (OpenAI, Midjourney, etc.) changes their policy?",
    a: "We can't control provider policies. If a platform changes terms that affect your account, we'll replace it immediately or refund you.",
  },
  {
    q: "Do you comply with payment regulations?",
    a: "Yes, we comply with all Bangladeshi laws regarding digital payments and e-commerce. All transactions are verified and documented.",
  },
  {
    q: "Is AI Premium Shop registered and official?",
    a: "We operate as an independent reseller of AI tools. We are not affiliated with OpenAI, Midjourney, or other providers, but we follow all their terms of service.",
  },
];

export default function FAQPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348";

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <>
      <FAQPageJsonLd
        items={defaultFaqs.map((f) => ({ question: f.q, answer: f.a }))}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <main className="min-h-screen">
        <section className="mx-auto max-w-3xl px-5 sm:px-8 py-12">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">FAQ</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Frequently asked questions</h1>
          <p className="mt-4 text-[1rem] leading-relaxed text-[#8a91a8]">
            Everything you need to know about ordering, payment, delivery, and support.
          </p>
          <p className="mt-2 text-[0.75rem] text-[#5b6280]">
            Last updated: <time dateTime="2026-05-20">20 May 2026</time>
          </p>

          <div className="mt-10 space-y-3">
            {defaultFaqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-colors open:border-[#f4b942]/15"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
                  <span className="text-[0.9375rem] font-medium text-white">{faq.q}</span>
                  <ChevronRight className="size-4 text-[#5b6280] transition-transform duration-300 group-open:rotate-90" />
                </summary>
                <div className="border-t border-white/[0.04] px-5 pb-4 pt-3">
                  <p className="text-[0.875rem] leading-relaxed text-[#8a91a8]">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 glass-card rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-white">Still have questions?</h2>
            <p className="mt-2 text-[0.875rem] text-[#8a91a8]">
              Our support team is available 24/7 on WhatsApp. We usually respond within minutes.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              className="btn-whatsapp inline-flex h-10 px-6 mt-6 text-[0.8125rem]"
            >
              <MessageCircle className="size-4" />
              Chat on WhatsApp
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
