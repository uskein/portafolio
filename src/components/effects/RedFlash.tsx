import { motion } from "framer-motion";

export default function RedFlash() {
  return (
    <motion.div
      className="fixed inset-0 z-40 bg-p5-red pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.3, 0] }}
      transition={{ duration: 0.4 }}
    />
  );
}
