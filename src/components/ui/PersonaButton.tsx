import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface PersonaButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "nature" | "combat";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
}

export default function PersonaButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  href,
  type = "button",
}: PersonaButtonProps) {
  const baseClasses = "relative font-pixel uppercase tracking-wider overflow-hidden transition-all duration-150";

  const sizeClasses = {
    sm: "px-5 py-2.5 text-[9px]",
    md: "px-7 py-3.5 text-[10px]",
    lg: "px-10 py-4 text-[11px] min-w-[220px]",
  };

  const variantClasses = {
    primary:
      "bg-jrpg-navy text-jrpg-gold border-2 border-jrpg-blue shadow-[3px_3px_0_0_var(--color-jrpg-blue)] hover:shadow-[1px_1px_0_0_var(--color-jrpg-blue)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]",
    secondary:
      "bg-surface text-jrpg-navy border-2 border-jrpg-navy shadow-[3px_3px_0_0_var(--color-jrpg-navy)] hover:shadow-[1px_1px_0_0_var(--color-jrpg-navy)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]",
    ghost: "bg-transparent text-jrpg-navy hover:bg-jrpg-navy/5",
    nature:
      "bg-jrpg-green text-jrpg-navy border-2 border-jrpg-green shadow-[3px_3px_0_0_#3da885] hover:shadow-[1px_1px_0_0_#3da885] hover:translate-x-[2px] hover:translate-y-[2px]",
    combat:
      "bg-jrpg-red text-white border-2 border-jrpg-red shadow-[3px_3px_0_0_#b83750] hover:shadow-[1px_1px_0_0_#b83750] hover:translate-x-[2px] hover:translate-y-[2px]",
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      {...(!href ? { type } : {})}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
        {children}
      </span>
    </Component>
  );
}
