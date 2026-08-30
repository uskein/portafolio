import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Gamepad2, Music, Settings, Download, X } from "lucide-react";

const navItems = [
  { path: "/pokedex", label: "POKEDEX", icon: BookOpen, color: "#ef4444" },
  { path: "/mini-games", label: "MINI GAMES", icon: Gamepad2, color: "#06b6d4" },
  { path: "/sound", label: "SOUND", icon: Music, color: "#22c55e" },
  { path: "/settings", label: "SETTINGS", icon: Settings, color: "#eab308" },
  { path: "/save-files", label: "SAVE FILES", icon: Download, color: "#8b5cf6" },
];

export default function SideNavGold() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block" style={{ marginTop: '200px' }}>
      {/* Gold Pokeball Button */}
      <motion.div
        className="relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={!isOpen ? {
          x: [0, -2, 2, -2, 0],
          y: [0, -1, 1, -1, 0],
        } : { x: 0, y: 0 }}
        transition={!isOpen ? {
          x: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
        } : {}}
      >
        <div className="w-16 h-16 rounded-full border-4 border-jrpg-navy bg-white relative overflow-hidden shadow-[4px_4px_0_0_var(--color-jrpg-navy)]">
          {/* Top half - Gold */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-yellow-400 to-yellow-500" />
          {/* Bottom half - White */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-gray-100 to-white" />
          {/* Center band */}
          <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-jrpg-navy -translate-y-1/2 z-10" />
          {/* Center button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-3 border-jrpg-navy bg-white z-20" />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-jrpg-navy z-30"
            animate={{ backgroundColor: ["#fbbf24", "#f87171", "#fbbf24", "#ffffff", "#fbbf24"] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <div className="absolute top-1.5 left-1.5 w-3 h-3 bg-white/40 rounded-full blur-sm" />
        </div>
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-yellow-400"
          animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Expanded Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.8 }}
            className="absolute left-20 top-1/2 -translate-y-1/2"
          >
            <div className="bg-white border-4 border-jrpg-navy shadow-[4px_4px_0_0_var(--color-jrpg-navy)] min-w-[180px]">
              <div className="bg-yellow-500 px-4 py-2 flex items-center justify-between">
                <span className="font-pixel text-[10px] text-jrpg-navy">GOLD SYSTEM</span>
                <button onClick={() => setIsOpen(false)} className="text-jrpg-navy hover:text-red-700 transition-colors">
                  <X size={14} />
                </button>
              </div>
              <div className="p-3 space-y-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 border-2 transition-all ${
                        isActive ? "border-jrpg-navy shadow-[2px_2px_0_0_var(--color-jrpg-navy)]" : "border-gray-300 hover:border-gray-500"
                      }`}
                      style={{ backgroundColor: isActive ? item.color : 'white' }}
                    >
                      <Icon size={14} className={isActive ? "text-white" : "text-gray-600"} />
                      <span className={`font-pixel text-[9px] ${isActive ? "text-white" : "text-gray-700"}`}>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
