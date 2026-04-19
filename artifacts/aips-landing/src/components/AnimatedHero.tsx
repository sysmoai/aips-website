// artifacts/aips-landing/src/components/AnimatedHero.tsx
// Drop-in replacement hero section with animations + video background option
// Uses Framer Motion (already installed in the repo)

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, ArrowRight, Zap, Shield, Clock } from "lucide-react";

const WHATSAPP = "https://wa.me/8801865385348?text=Hi%2C%20I%20want%20to%20order%20an%20AI%20subscription";

const STATS = [
  { value: "10,000+", label: "Customers Served" },
  { value: "50+",     label: "AI Products" },
  { value: "83%",     label: "Avg. Savings vs Direct" },
  { value: "15 min",  label: "Avg. Delivery Time" },
];

const TRUST = [
  { icon: Zap,    text: "Instant delivery" },
  { icon: Shield, text: "Genuine accounts" },
  { icon: Clock,  text: "24/7 WhatsApp support" },
];

const R2 = import.meta.env.VITE_R2_PUBLIC_URL ?? "https://media.aipremiumshop.com";

const BRAND_LOGOS = [
  { name: "ChatGPT",    url: `${R2}/logos/chatgpt.png`,    color: "#10a37f" },
  { name: "Claude",     url: `${R2}/logos/claude.png`,     color: "#d97706" },
  { name: "Gemini",     url: `${R2}/logos/gemini.png`,     color: "#4285f4" },
  { name: "Midjourney", url: `${R2}/logos/midjourney.png`, color: "#6366f1" },
  { name: "Cursor",     url: `${R2}/logos/cursor.png`,     color: "#111827" },
  { name: "Notion",     url: `${R2}/logos/notion.png`,     color: "#111827" },
  { name: "Suno",       url: `${R2}/logos/suno.png`,       color: "#7c3aed" },
  { name: "Runway",     url: `${R2}/logos/runway.png`,     color: "#111827" },
];

export function AnimatedHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: "#07091a" }}>

      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full"
          style={{ background: "radial-gradient(circle, #10a37f22 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 rounded-full"
          style={{ background: "radial-gradient(circle, #f4b94222 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(#ffffff11 1px, transparent 1px), linear-gradient(90deg, #ffffff11 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating brand logos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {BRAND_LOGOS.map((brand, i) => (
          <motion.div key={brand.name} className="absolute"
            style={{ left: `${10 + (i % 4) * 25}%`, top: `${15 + Math.floor(i / 4) * 60}%` }}
            animate={{ y: [0, -12, 0], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-sm"
              style={{ backgroundColor: `${brand.color}22`, border: `1px solid ${brand.color}44` }}>
              <img src={brand.url} alt={brand.name} className="w-7 h-7 object-contain"
                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{ backgroundColor: "#f4b94220", color: "#f4b942", border: "1px solid #f4b94240" }}>
            <Zap className="w-3.5 h-3.5" />
            Bangladesh's #1 AI Subscription Shop
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Get Premium AI Tools
            <br />
            <span style={{ color: "#f4b942" }}>at Bangladeshi Prices</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            ChatGPT, Claude, Gemini, Midjourney, Cursor and 45+ more AI subscriptions.
            Pay in BDT via bKash. Delivery in minutes.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-gray-900 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#f4b942" }}>
              Browse All Products <ArrowRight className="w-4 h-4" />
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold border text-white hover:bg-white/10 transition-colors"
              style={{ borderColor: "#25d366", color: "#25d366" }}>
              <MessageCircle className="w-4 h-4" />
              Order via WhatsApp
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mb-16">
            {TRUST.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-gray-400">
                <Icon className="w-4 h-4 text-green-400" /> {text}
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {STATS.map(({ value, label }, i) => (
              <motion.div key={label} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: "#f4b942" }}>{value}</div>
                <div className="text-xs text-gray-400 mt-1">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
