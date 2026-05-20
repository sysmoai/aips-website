import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy — AI Premium Shop Bangladesh",
  description:
    "Privacy policy for AI Premium Shop. How we collect, use, and protect your personal data when buying AI subscriptions in Bangladesh.",
  canonical: "https://aipremiumshop.com/privacy",
});

export default function PrivacyPage() {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <main className="min-h-screen bg-[#f7f7f2] text-[#171713]">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-semibold leading-tight text-[#141410] sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-[#666454]">Last updated: 20 May 2026</p>

          <section className="mt-10 space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-[#171713]">1. Introduction</h2>
              <p className="mt-2 leading-7 text-[#4f4d42]">
                AI Premium Shop (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) respects
                your privacy. This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website or purchase AI subscriptions
                through WhatsApp.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#171713]">2. Information We Collect</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 leading-7 text-[#4f4d42]">
                <li>
                  <strong>Contact information:</strong> Name, phone number, and WhatsApp ID used
                  during order confirmation.
                </li>
                <li>
                  <strong>Payment information:</strong> bKash/Nagad/Rocket transaction IDs only. We
                  never store your mobile wallet login credentials or card numbers.
                </li>
                <li>
                  <strong>Order history:</strong> Products purchased, delivery timestamps, and
                  support interactions.
                </li>
                <li>
                  <strong>Technical data:</strong> IP address, browser type, and device information
                  collected via standard server logs and analytics.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#171713]">3. How We Use Your Information</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 leading-7 text-[#4f4d42]">
                <li>Process and confirm your orders.</li>
                <li>Deliver subscription credentials and setup instructions.</li>
                <li>Provide customer support and warranty claims.</li>
                <li>Send renewal reminders and product updates.</li>
                <li>Improve website performance and user experience.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#171713]">4. Data Storage &amp; Security</h2>
              <p className="mt-2 leading-7 text-[#4f4d42]">
                Customer data is stored in encrypted databases hosted in Singapore (Supabase). We
                use industry-standard TLS encryption for data in transit and AES-256 for data at
                rest. Access is restricted to Emon Hossain and authorized support agents only.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#171713]">5. Third-Party Services</h2>
              <p className="mt-2 leading-7 text-[#4f4d42]">
                We use the following third-party services:
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-5 leading-7 text-[#4f4d42]">
                <li>
                  <strong>WhatsApp Business API</strong> — for order confirmation and support.
                </li>
                <li>
                  <strong>Supabase</strong> — for database and authentication hosting.
                </li>
                <li>
                  <strong>Cloudflare</strong> — for CDN, DDoS protection, and analytics.
                </li>
                <li>
                  <strong>bKash / Nagad / Rocket</strong> — payment processing (we only receive
                  transaction IDs).
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#171713]">6. Cookies</h2>
              <p className="mt-2 leading-7 text-[#4f4d42]">
                Our website uses minimal cookies for analytics and performance. You can disable
                cookies in your browser settings, though this may affect site functionality.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#171713]">7. Your Rights</h2>
              <p className="mt-2 leading-7 text-[#4f4d42]">
                You have the right to access, correct, or delete your personal data. To exercise
                these rights, contact us on WhatsApp at{" "}
                <a
                  href="https://wa.me/8801865385348"
                  className="text-[#10a37f] underline"
                >
                  +880 1865-385348
                </a>{" "}
                or email{" "}
                <a
                  href="mailto:hello@aipremiumshop.com"
                  className="text-[#10a37f] underline"
                >
                  hello@aipremiumshop.com
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#171713]">8. Changes to This Policy</h2>
              <p className="mt-2 leading-7 text-[#4f4d42]">
                We may update this Privacy Policy periodically. The latest version will always be
                available at this URL with the updated date at the top.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#171713]">9. Contact</h2>
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
