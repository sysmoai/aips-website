import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service — AI Premium Shop Bangladesh",
  description:
    "Terms and conditions for purchasing AI subscriptions through AI Premium Shop. Refund policy, warranty, and usage rules for Bangladesh customers.",
  canonical: "https://aipremiumshop.com/terms",
});

export default function TermsPage() {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Terms of Service", path: "/terms" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <main className="min-h-screen bg-[#f7f7f2] text-[#171713]">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-semibold leading-tight text-[#141410] sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-[#666454]">Last updated: 20 May 2026</p>

          <section className="mt-10 space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-[#171713]">1. Acceptance of Terms</h2>
              <p className="mt-2 leading-7 text-[#4f4d42]">
                By accessing our website or placing an order via WhatsApp, you agree to these Terms
                of Service. If you do not agree, please do not use our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#171713]">2. Nature of Service</h2>
              <p className="mt-2 leading-7 text-[#4f4d42]">
                AI Premium Shop is an independent reseller of premium digital subscriptions. We are
                not affiliated with, endorsed by, or official partners of OpenAI, Anthropic, Google,
                Midjourney, Canva, Netflix, or any other platform provider whose products we resell.
                All product names, logos, and trademarks belong to their respective owners.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#171713]">3. Account Types</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 leading-7 text-[#4f4d42]">
                <li>
                  <strong>Personal / Private Account:</strong> You receive individual credentials or
                  setup guidance for your own account. Subject to the original platform&rsquo;s Terms
                  of Service.
                </li>
                <li>
                  <strong>Shared Slot:</strong> You receive access to a shared account managed by
                  us. Usage may be subject to fair-use limits. Replacement guaranteed within the
                  warranty period.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#171713]">4. Pricing &amp; Payment</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 leading-7 text-[#4f4d42]">
                <li>All prices are listed in Bangladeshi Taka (BDT / ৳).</li>
                <li>
                  Prices are subject to change based on supplier rates and exchange fluctuations.
                </li>
                <li>Payment must be completed before delivery.</li>
                <li>Accepted methods: bKash, Nagad, Rocket, Visa/Mastercard (local).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#171713]">5. Delivery</h2>
              <p className="mt-2 leading-7 text-[#4f4d42]">
                Standard delivery time is within 15 minutes of payment confirmation during business
                hours (9 AM – 12 AM BST). During peak hours or holidays, delivery may take up to 2
                hours. Delivery is performed via WhatsApp with setup instructions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#171713]">6. Refund Policy</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 leading-7 text-[#4f4d42]">
                <li>
                  <strong>Full refund:</strong> If service is not delivered within 2 hours of
                  confirmed payment.
                </li>
                <li>
                  <strong>Partial refund (50%):</strong> If you change your mind within 6 hours and
                  credentials are unused.
                </li>
                <li>
                  <strong>No refund:</strong> After 24 hours, or once credentials have been used, or
                  if the account is banned due to violation of platform ToS by the customer.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#171713]">7. Warranty &amp; Replacement</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 leading-7 text-[#4f4d42]">
                <li>
                  <strong>Shared slots:</strong> 7-day replacement guarantee if the account stops
                  working due to non-customer causes.
                </li>
                <li>
                  <strong>Personal setups:</strong> 30 days of free activation support.
                </li>
                <li>
                  Warranty does not cover bans or suspensions caused by the customer&rsquo;s
                  actions.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#171713]">8. Prohibited Use</h2>
              <p className="mt-2 leading-7 text-[#4f4d42]">
                You may not use our services for illegal activities, fraud, chargeback abuse, or to
                resell accounts without written permission. Violation will result in immediate
                termination of service and blacklisting.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#171713]">9. Limitation of Liability</h2>
              <p className="mt-2 leading-7 text-[#4f4d42]">
                AI Premium Shop&rsquo;s maximum liability is limited to the amount paid for the
                specific subscription in dispute. We are not liable for indirect, incidental, or
                consequential damages arising from platform downtime, account bans by original
                providers, or data loss.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#171713]">10. Governing Law</h2>
              <p className="mt-2 leading-7 text-[#4f4d42]">
                These terms are governed by the laws of Bangladesh. Any disputes shall be resolved
                amicably; if unresolved, subject to the jurisdiction of courts in Dhaka, Bangladesh.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#171713]">11. Contact</h2>
              <p className="mt-2 leading-7 text-[#4f4d42]">
                AI Premium Shop
                <br />
                Dhaka, Bangladesh
                <br />
                WhatsApp: +880 1865-385348
                <br />
                Email: hello@aipremiumshop.com
              </p>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
