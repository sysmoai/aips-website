// artifacts/aips-landing/src/components/AnimatedProductCard.tsx
// Upgraded product card with real logo, Framer Motion hover + scroll animations

import { motion } from "framer-motion";
import { MessageCircle, Clock, Star, Zap } from "lucide-react";

const R2 = import.meta.env.VITE_R2_PUBLIC_URL ?? "https://media.aipremiumshop.com";

interface Product {
  id: string;
  name: string;
  brand: string;
  brandColor: string;
  category: string;
  price: number;
  officialUsd?: number | null;
  tier: string;
  accessType: string;
  badge?: string | null;
  description: string;
  capabilities: string[];
  deliverySla: string;
  featured: boolean;
  whatsappMsg: string;
  logoUrl?: string | null;
}

export const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const CAP_LABELS: Record<string, string> = {
  "text":      "Text",
  "code":      "Code",
  "vision":    "Vision",
  "search":    "Search",
  "image-gen": "Image",
  "video-gen": "Video",
  "agents":    "Agents",
  "document":  "Docs",
  "voice":     "Voice",
  "music":     "Music",
  "workspace": "Workspace",
};

function savingsPercent(price: number, usd: number | null | undefined): string | null {
  if (!usd) return null;
  const official = usd * 150;
  if (price >= official) return null;
  const pct = Math.round((1 - price / official) * 100);
  return pct > 5 ? `${pct}% off` : null;
}

export function AnimatedProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const WHATSAPP_BASE = "https://wa.me/8801865385348?text=";
  const waLink = `${WHATSAPP_BASE}${encodeURIComponent(product.whatsappMsg)}`;

  const logoSrc = product.logoUrl
    ?? `${R2}/logos/${product.brand.toLowerCase().replace(/\s+/g, "-")}.png`;

  const savings = savingsPercent(product.price, product.officialUsd);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.025, y: -4 }}
      className="relative rounded-2xl overflow-hidden flex flex-col h-full"
      style={{
        background: "linear-gradient(135deg, #0d1020 0%, #111827 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: `0 4px 24px ${product.brandColor}18`,
      }}
    >
      <div className="h-0.5 w-full" style={{ backgroundColor: product.brandColor }} />

      {product.badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + index * 0.05 }}
          className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold"
          style={{ backgroundColor: product.brandColor + "33", color: product.brandColor, border: `1px solid ${product.brandColor}55` }}
        >
          {product.badge}
        </motion.div>
      )}

      <div className="p-5 flex flex-col flex-1 gap-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 5 }}
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
            style={{ backgroundColor: product.brandColor + "22", border: `1px solid ${product.brandColor}44` }}
          >
            <img
              src={logoSrc}
              alt={product.brand}
              className="w-8 h-8 object-contain"
              onError={e => {
                const el = e.target as HTMLImageElement;
                el.style.display = "none";
                const parent = el.parentElement;
                if (parent) {
                  parent.innerHTML = `<span style="font-size:18px;font-weight:700;color:${product.brandColor}">${product.brand[0]}</span>`;
                }
              }}
            />
          </motion.div>
          <div>
            <div className="font-bold text-white text-sm leading-tight">{product.name}</div>
            <div className="text-xs mt-0.5" style={{ color: product.brandColor }}>
              {product.tier} · {product.accessType}
            </div>
          </div>
        </div>

        <p className="text-gray-400 text-xs leading-relaxed flex-1 line-clamp-3">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {product.capabilities.slice(0, 5).map(cap => (
            <span key={cap} className="px-2 py-0.5 rounded text-xs font-medium"
              style={{ backgroundColor: "#ffffff08", color: "#9ca3af" }}>
              {CAP_LABELS[cap] ?? cap}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {product.deliverySla}
          </span>
          {savings && <span className="text-green-400 font-medium">{savings}</span>}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div>
            <span className="text-2xl font-bold text-white">৳{product.price.toLocaleString()}</span>
            <span className="text-gray-500 text-xs">/mo</span>
          </div>
          <motion.a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#25d366", color: "#fff" }}
          >
            <MessageCircle className="w-4 h-4" />
            Order
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export function AnimatedProductGrid({ products }: { products: Product[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
    >
      {products.map((p, i) => (
        <AnimatedProductCard key={p.id} product={p} index={i} />
      ))}
    </motion.div>
  );
}
