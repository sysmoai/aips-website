import rawProducts from "@/data/products.json";

/* ------------------------------------------------------------------ */
/*  Types (mirroring the live-site data shape)                        */
/* ------------------------------------------------------------------ */
export interface LiveProduct {
  id: string;
  name: string;
  slug: string;
  brand: string;
  brandSlug: string;
  provider: string;
  brandColor: string;
  category: string;
  price: number;
  officialUSD: number;
  tier: string;
  accessType: "shared" | "personal" | "bundle";
  badge?: string;
  description: string;
  capabilities: string[];
  deliverySLA: string;
  featured: boolean;
  whatsappMsg: string;
  status: string;
  descriptionBN?: string;
  useCases?: string[];
  whyBuyFromAIPS?: string;
  faq?: { q: string; a: string }[];
  competitorCompare?: { name: string; price: string; advantage: string }[];
  relatedProducts?: string[];
  uniqueSellingPoints?: string[];
  howItWorksSteps?: { step: number; title: string; description: string }[];
  estimatedDeliveryTime?: string;
  deliveryMethod?: string;
  lastVerifiedDate?: string;
  seo?: { title: string; description: string };
  badges?: string[];
  trust?: { warrantyDays: number; replacementGuarantee: boolean };
}

export interface ProductGroup {
  slug: string;
  name: string;
  brand: string;
  brandSlug: string;
  provider: string;
  category: string;
  description: string;
  variants: LiveProduct[];
  minPrice: number;
  maxPrice: number;
  capabilities: string[];
  featured: boolean;
}

const allItems: LiveProduct[] = rawProducts as LiveProduct[];

function isPublishable(item: LiveProduct): boolean {
  if (item.status !== "Active") return false;
  if (item.accessType === "shared") return false;

  const unsafeDeliveryMethods = new Set([
    "account-credentials",
    "shared-account",
    "login-credentials",
    "password-delivery",
    "cookie",
    "session-token",
  ]);

  if (item.deliveryMethod && unsafeDeliveryMethods.has(item.deliveryMethod)) {
    return false;
  }

  const searchableText = [
    item.name,
    item.tier,
    item.description,
    item.whatsappMsg,
    item.whyBuyFromAIPS,
    item.deliveryMethod,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const unsafeTerms = [
    "shared",
    "credentials",
    "login details",
    "account pool",
    "cookie",
    "session token",
  ];

  return !unsafeTerms.some((term) => searchableText.includes(term));
}

export function getAllItems(): LiveProduct[] {
  return allItems.filter(isPublishable);
}

export function getCategories(): string[] {
  return Array.from(new Set(getAllItems().map((i) => i.category))).sort();
}

export function getCategoryLabel(slug: string): string {
  const cleanSlug = slug.replace(/\s+/g, "");
  const map: Record<string, string> = {
    "ai-assistant": "AI Assistant",
    "ai-code": "AI Code",
    "ai-image": "AI Image",
    "ai-video": "AI Video",
    "ai-voice-music": "AI Voice & Music",
    "ai-workspace": "AI Workspace",
    "ai-writing": "AI Writing",
    bundles: "Bundles",
  };
  return map[cleanSlug] ?? map[slug] ?? slug;
}

export function getProductGroups(): ProductGroup[] {
  const bySlug = new Map<string, LiveProduct[]>();
  for (const item of getAllItems()) {
    if (!bySlug.has(item.slug)) bySlug.set(item.slug, []);
    bySlug.get(item.slug)!.push(item);
  }

  const groups: ProductGroup[] = [];
  for (const [slug, variants] of bySlug) {
    const first = variants[0];
    const prices = variants.map((v) => v.price);
    const allCapabilities = Array.from(
      new Set(variants.flatMap((v) => v.capabilities))
    );
    const displayName = first.name.split(" - ")[0].trim();
    groups.push({
      slug,
      name: displayName,
      brand: first.brand,
      brandSlug: first.brandSlug,
      provider: first.provider,
      category: first.category,
      description: first.description,
      variants: variants.sort((a, b) => a.price - b.price),
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
      capabilities: allCapabilities,
      featured: variants.some((v) => v.featured),
    });
  }

  return groups.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.minPrice - b.minPrice;
  });
}

export function getProductBySlug(slug: string): ProductGroup | undefined {
  return getProductGroups().find((g) => g.slug === slug);
}

export function getItemsByCategory(category: string): LiveProduct[] {
  return getAllItems().filter((i) => i.category === category);
}

export function getFeaturedItems(): LiveProduct[] {
  return getAllItems().filter((i) => i.featured);
}

export function getWhatsappUrl(item: LiveProduct): string {
  const num = process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348";
  const msg = item.whatsappMsg || `Hi, I want ${item.name}`;
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
}

export function getRelatedProducts(
  currentSlug: string,
  category: string,
  limit = 4
): ProductGroup[] {
  const all = getProductGroups();
  const sameCat = all.filter(
    (g) => g.slug !== currentSlug && g.category === category
  );
  const others = all.filter(
    (g) => g.slug !== currentSlug && g.category !== category
  );
  return [...sameCat, ...others].slice(0, limit);
}
