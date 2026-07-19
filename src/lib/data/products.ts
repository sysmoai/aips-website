import rawProducts from "@/data/products.json";

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
 