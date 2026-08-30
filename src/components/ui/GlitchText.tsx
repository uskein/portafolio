import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}

export default function GlitchText({ children, className = "", as: Tag = "span" }: GlitchTextProps) {
  return (
    <motion.div className="relative inline-block" whileHover="hover">
      <Tag className={`relative z-10 ${className}`}>{children}</Tag>
      <motion.span
        className={`absolute inset-0 z-0 ${className}`}
        style={{ color: "#e94560" }}
        variants={{
          hover: {
            x: [0, -2, 2, -1, 0],
            opacity: [0, 0.8, 0, 0.8, 0],
            transition: { duration: 0.2 },
          },
        }}
        aria-hidden="true"
      >
        {children}
      </motion.span>
      <motion.span
        className={`absolute inset-0 z-0 ${className}`}
        style={{ color: "#00d2d3" }}
        variants={{
          hover: {
            x: [0, 2, -2, 1, 0],
            opacity: [0, 0.8, 0, 0.8, 0],
            transition: { duration: 0.2, delay: 0.03 },
          },
        }}
        aria-hidden="true"
      >
        {children}
      </motion.span>
    </motion.div>
  );
}
