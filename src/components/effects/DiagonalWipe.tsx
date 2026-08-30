import { motion } from "framer-motion";

export default function DiagonalWipe() {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-p5-red pointer-events-none"
      initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
      animate={{
        clipPath: [
          "polygon(0 0, 0 0, 0 100%, 0 100%)",
          "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
        ],
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    />
  );
}
