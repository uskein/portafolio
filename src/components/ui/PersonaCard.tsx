import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface PersonaCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  variant?: "default" | "glass" | "glass-red" | "glass-gold" | "glass-sky" | "glass-purple";
}

const variantClasses = {
  default: "jrpg-box",
  glass: "jrpg-box",
  "glass-red": "jrpg-box-red",
  "glass-gold": "jrpg-box-gold",
  "glass-sky": "jrpg-box-cyan",
  "glass-purple": "jrpg-box-purple",
};

export default function PersonaCard({ children, className, hover = true, onClick, variant = "glass" }: PersonaCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { scale: 1.01, y: -2 } : undefined}
      whileTap={onClick ? { scale: 0.99 } : undefined}
      className={cn(
        "relative overflow-hidden",
        variantClasses[variant],
        onClick && "cursor-pointer",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
