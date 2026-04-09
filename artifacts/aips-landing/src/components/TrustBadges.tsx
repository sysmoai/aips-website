import { motion } from "framer-motion";
import { Shield, Clock, Star, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadge {
  icon: React.ReactNode;
  label: string;
  value?: string;
}

const defaultBadges: TrustBadge[] = [
  { icon: <Shield className="w-5 h-5" />, label: "Secure & Trusted", value: "100%" },
  { icon: <Clock className="w-5 h-5" />, label: "Fast Delivery", value: "< 1hr" },
  { icon: <Star className="w-5 h-5" />, label: "Customer Rating", value: "4.9/5" },
  { icon: <Users className="w-5 h-5" />, label: "Happy Customers", value: "10,000+" },
];

interface TrustBadgesProps {
  badges?: TrustBadge[];
  className?: string;
}

export function TrustBadges({ badges = defaultBadges, className }: TrustBadgesProps) {
  return (
    <div className={cn("flex flex-wrap justify-center gap-4", className)}>
      {badges.map((badge, i) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 px-4 py-2 rounded-full card-glass border border-white/10"
        >
          <span className="text-primary">{badge.icon}</span>
          {badge.value && (
            <span className="font-bold text-foreground text-sm">{badge.value}</span>
          )}
          <span className="text-muted-foreground text-sm">{badge.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
