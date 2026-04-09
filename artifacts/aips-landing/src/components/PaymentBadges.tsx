import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const paymentMethods = [
  { name: "bKash", color: "#e2136e", abbr: "bK" },
  { name: "Nagad", color: "#f6921e", abbr: "Ng" },
  { name: "Rocket", color: "#8b0a8e", abbr: "Ro" },
  { name: "Bank Transfer", color: "#2563eb", abbr: "BT" },
  { name: "Card", color: "#10b981", abbr: "💳" },
];

interface PaymentBadgesProps {
  className?: string;
  label?: string;
}

export function PaymentBadges({ className, label = "We Accept" }: PaymentBadgesProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {label && (
        <span className="text-muted-foreground text-sm">{label}:</span>
      )}
      {paymentMethods.map((method, i) => (
        <motion.div
          key={method.name}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          viewport={{ once: true }}
          whileHover={{ y: -2 }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold"
          style={{
            borderColor: method.color + "40",
            backgroundColor: method.color + "15",
            color: method.color,
          }}
          title={method.name}
        >
          <span>{method.abbr}</span>
          <span className="hidden sm:inline">{method.name}</span>
        </motion.div>
      ))}
    </div>
  );
}
