import { siteUrl, siteName } from "@/lib/seo/metadata";

/* ------------------------------------------------------------------ */
/*  JSON-LD structured data components for AI Premium Shop            */
/*  All components are Server Components (no "use client").           */
/* ------------------------------------------------------------------ */

function ScriptLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Organization                                                      */
/* ------------------------------------------------------------------ */
interface OrganizationProps {
  logoUrl?: string;
  sameAs?: string[];
}

export function OrganizationJsonLd({
  logoUrl = `${siteUrl}/logo.png`,
  sameAs = [],
}: OrganizationProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    // alternateName removed per brand rules — never abbreviate
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
      width: 512,
      height: 512,
      caption: `${siteName} logo`,
    },
    image: {
      "@type": "ImageObject",
      url: logoUrl,
      width: 512,
      height: 512,
    },
    description:
      "Bangladesh's trusted store for premium AI subscriptions, design tools, and streaming services. Local payment, WhatsApp support, 15-minute delivery.",
    foundingDate: "2024",
    founders: [
      {
        "@type": "Person",
        name: "Emon Hossain",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "BD",
      addressLocality: "Dhaka",
      addressRegion: "Dhaka Division",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+880-1865-385348",
        contactType: "customer support",
        availableLanguage: ["English", "Bengali"],
        areaServed: "BD",
      },
    ],
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };

  return <ScriptLd schema={schema} />;
}

/* ------------------------------------------------------------------ */
/*  WebSite (with SearchAction)                                       */
/* ------------------------------------------------------------------ */
interface WebsiteProps {
  searchUrl?: string;
}

export function WebsiteJsonLd({ /* searchUrl = `${siteUrl}/search?q={search_term_string}` */ }: WebsiteProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: siteName,
    // alternateName removed per brand rules — never abbreviate
    inLanguage: "en-BD",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    // SearchAction disabled — no search page exists yet. Re-enable when /search is built.
    // potentialAction: {
    //   "@type": "SearchAction",
    //   target: { "@type": "EntryPoint", urlTemplate: searchUrl },
    //   "query-input": "required name=search_term_string",
    // },
  };

  return <ScriptLd schema={schema} />;
}

/* ------------------------------------------------------------------ */
/*  BreadcrumbList                                                    */
/* ------------------------------------------------------------------ */
interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };

  return <ScriptLd schema={schema} />;
}

/* ------------------------------------------------------------------ */
/*  Product + Offer + AggregateRating + Review                        */
/* ------------------------------------------------------------------ */
interface ProductJsonLdProps {
  name: string;
  description: string;
  slug: string;
  imageUrl?: string;
  priceBdt: number;
  comparePriceBdt?: number | null;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  priceValidUntil?: string; // ISO date
  ratingValue?: number;
  reviewCount?: number;
  brandName?: string;
  categoryName?: string;
}

export function ProductJsonLd({
  name,
  description,
  slug,
  imageUrl,
  priceBdt,
  comparePriceBdt,
  availability = "InStock",
  priceValidUntil,
  /* ratingValue = 4.8,
  reviewCount = 124, */
  brandName = siteName,
  categoryName = "Digital Subscription",
}: ProductJsonLdProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: imageUrl ?? `${siteUrl}/og/default.png`,
    url: `${siteUrl}/products/${slug}`,
    brand: {
      "@type": "Brand",
      name: brandName,
    },
    category: categoryName,
    // aggregateRating disabled until real reviews are collected.
    // Hardcoded ratings risk Google manual review for fake reviews.
    // aggregateRating: {
    //   "@type": "AggregateRating",
    //   ratingValue: String(ratingValue),
    //   bestRating: "5",
    //   worstRating: "1",
    //   reviewCount: String(reviewCount),
    // },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/products/${slug}`,
      priceCurrency: "BDT",
      price: String(priceBdt),
      ...(comparePriceBdt && {
        priceSpecification: {
          "@type": "PriceSpecification",
          price: String(priceBdt),
          priceCurrency: "BDT",
          maxPrice: String(comparePriceBdt),
        },
      }),
      availability: `https://schema.org/${availability}`,
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: siteName,
        url: siteUrl,
      },
      ...(priceValidUntil && { priceValidUntil }),
      eligibleRegion: {
        "@type": "Country",
        name: "Bangladesh",
      },
      acceptedPaymentMethod: [
        { "@type": "PaymentMethod", name: "bKash" },
        { "@type": "PaymentMethod", name: "Nagad" },
        { "@type": "PaymentMethod", name: "Rocket" },
        { "@type": "PaymentMethod", name: "Credit Card" },
        { "@type": "PaymentMethod", name: "Debit Card" },
      ],
    },
  };

  return <ScriptLd schema={schema} />;
}

/* ------------------------------------------------------------------ */
/*  FAQPage                                                           */
/* ------------------------------------------------------------------ */
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQPageProps {
  items: FAQItem[];
}

export function FAQPageJsonLd({ items }: FAQPageProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <ScriptLd schema={schema} />;
}

/* ------------------------------------------------------------------ */
/*  Article (Blog)                                                    */
/* ------------------------------------------------------------------ */
interface ArticleJsonLdProps {
  title: string;
  description: string;
  slug: string;
  imageUrl?: string;
  authorName: string;
  publishedAt: string;
  modifiedAt?: string;
}

export function ArticleJsonLd({
  title,
  description,
  slug,
  imageUrl,
  authorName,
  publishedAt,
  modifiedAt,
}: ArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: imageUrl ?? `${siteUrl}/og/default.png`,
    url: `${siteUrl}/blog/${slug}`,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    datePublished: publishedAt,
    ...(modifiedAt && { dateModified: modifiedAt }),
    inLanguage: "en-BD",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${slug}`,
    },
  };

  return <ScriptLd schema={schema} />;
}

/* ------------------------------------------------------------------ */
/*  HowTo                                                             */
/* ------------------------------------------------------------------ */
interface HowToStep {
  name: string;
  text: string;
  url?: string;
  imageUrl?: string;
}

interface HowToProps {
  name: string;
  description: string;
  totalTime?: string; // ISO 8601 duration, e.g. "PT15M"
  estimatedCost?: { currency: string; value: string };
  steps: HowToStep[];
}

export function HowToJsonLd({ name, description, totalTime, estimatedCost, steps }: HowToProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(totalTime && { totalTime }),
    ...(estimatedCost && {
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: estimatedCost.currency,
        value: estimatedCost.value,
      },
    }),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      url: step.url,
      ...(step.imageUrl && {
        image: {
          "@type": "ImageObject",
          url: step.imageUrl,
        },
      }),
    })),
  };

  return <ScriptLd schema={schema} />;
}
