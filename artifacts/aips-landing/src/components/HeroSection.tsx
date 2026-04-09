import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  badge?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  className?: string;
  children?: React.ReactNode;
}

export function HeroSection({
  title,
  subtitle,
  badge,
  ctaPrimary,
  ctaSecondary,
  className,
  children,
}: HeroSectionProps) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-aips-gradient opacity-80 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, #0d9488, transparent)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }}
        />
      </div>
      <div className="relative container mx-auto px-4 py-24 text-center">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8"
          >
            {badge}
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            {subtitle}
          </motion.p>
        )}
        {(ctaPrimary || ctaSecondary) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {ctaPrimary && (
              <a
                href={ctaPrimary.href}
                className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity glow-teal"
              >
                {ctaPrimary.label}
              </a>
            )}
            {ctaSecondary && (
              <a
                href={ctaSecondary.href}
                className="px-8 py-3 rounded-xl border border-white/20 text-foreground font-semibold hover:border-white/40 hover:bg-white/5 transition-colors"
              >
                {ctaSecondary.label}
              </a>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
