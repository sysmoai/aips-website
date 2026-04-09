interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  schema?: object;
}

export function SEOHead({
  title = "AI Premium Shop — Premium AI Subscriptions in Bangladesh",
  description = "Bangladesh's #1 source for premium AI subscriptions. Get ChatGPT Plus, Claude Pro, Midjourney, and more at unbeatable prices. Fast delivery, secure payment via bKash, Nagad, Rocket.",
  keywords = "AI subscription Bangladesh, ChatGPT Plus Bangladesh, Claude Pro Bangladesh, Midjourney Bangladesh, AI tools cheap, bKash payment AI",
  ogImage = "/images/og/og-default.jpg",
  ogType = "website",
  canonical,
  schema,
}: SEOHeadProps) {
  const fullTitle = title.includes("AI Premium Shop") ? title : `${title} | AI Premium Shop`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="AI Premium Shop" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </>
  );
}
