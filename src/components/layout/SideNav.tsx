import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, BarChart3, FolderOpen, Clock, Mail, X } from "lucide-react";
import { useLang } from "../../context/LangContext";

const navItems = [
  { path: "/", labelKey: "nav.home", icon: Home, color: "#4ecca3" },
  { path: "/skills", labelKey: "nav.skills", icon: BarChart3, color: "#e94560" },
  { path: "/projects", labelKey: "nav.projects", icon: FolderOpen, color: "#00d2d3" },
  { path: "/timeline", labelKey: "nav.timeline", icon: Clock, color: "#f5c542" },
  { path: "/contact", labelKey: "nav.contact", icon: Mail, color: "#a855f7" },
];

interface CapturedPokeball {
  id: string;
  x: number;
  y: number;
}

export default function SideNav() {
  const location = useLocation();
  const { lang, toggle, t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [capturedPokeballs, setCapturedPokeballs] = useState<CapturedPokeball[]>([]);
  const [showCaptureEffect, setShowCaptureEffect] = useState(false);
  const constraintsRef = useRef(null);

  const handlePokeballClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCapture = () => {
    setShowCaptureEffect(true);
    
    // Add new captured pokeball at random position
    const newPokeball: CapturedPokeball = {
      id: `pokeball-${Date.now()}`,
      x: Math.random() * (window.innerWidth - 100) + 50,
      y: Math.random() * (window.innerHeight - 100) + 50,
    };
    
    setTimeout(() => {
      setCapturedPokeballs(prev => [...prev, newPokeball]);
      setShowCaptureEffect(false);
    }, 1000);
  };

  const removePokeball = (id: string) => {
    setCapturedPokeballs(prev => prev.filter(p => p.id !== id));
  };

  return (
    <>
      {/* Main Pokeball Sidebar */}
      <motion.div
        className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
        ref={constraintsRef}
      >
        {/* Pokeball Button */}
        <motion.div
          className="relative cursor-pointer"
          onClick={handlePokeballClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={!isOpen ? {
            rotate: 0,
            x: [0, -2, 2, -2, 0],
            y: [0, -1, 1, -1, 0],
          } : { rotate: 180, x: 0, y: 0 }}
          transition={!isOpen ? {
            rotate: { type: "spring", stiffness: 200, damping: 15 },
            x: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
          } : { type: "spring", stiffness: 200, damping: 15 }}
        >
          {/* Outer ring */}
          <div className="w-20 h-20 rounded-full border-4 border-jrpg-navy bg-white relative overflow-hidden shadow-[4px_4px_0_0_var(--color-jrpg-navy)]">
            {/* Top half - Red */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-red-500 to-red-600" />
            
            {/* Bottom half - White */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-gray-100 to-white" />
            
            {/* Center band - Black */}
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-jrpg-navy -translate-y-1/2 z-10" />
            
            {/* Center button - Outer */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 border-jrpg-navy bg-white z-20" />
            
            {/* Center button - Inner - with blink animation */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-jrpg-navy z-30 shadow-inner"
              animate={!isOpen ? {
                backgroundColor: ["#f87171", "#fbbf24", "#f87171", "#ffffff", "#f87171"],
                boxShadow: [
                  "inset 0 0 0 rgba(0,0,0,0.2)",
                  "inset 0 0 8px rgba(251,191,36,0.8)",
                  "inset 0 0 0 rgba(0,0,0,0.2)",
                  "inset 0 0 12px rgba(255,255,255,0.9)",
                  "inset 0 0 0 rgba(0,0,0,0.2)"
                ]
              } : {
                backgroundColor: "#f87171",
                boxShadow: "inset 0 0 0 rgba(0,0,0,0.2)"
              }}
              transition={!isOpen ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : {}}
            />
            
            {/* Shine effect */}
            <div className="absolute top-2 left-2 w-4 h-4 bg-white/40 rounded-full blur-sm" />
            
            {/* Pixel grid overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)',
              backgroundSize: '4px 4px'
            }} />
          </div>
          
          {/* Animated ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-jrpg-gold"
            animate={isOpen ? { scale: [1, 1.2, 1], opacity: [1, 0.5, 1] } : { scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: isOpen ? 1 : 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Expanded Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute left-24 top-1/2 -translate-y-1/2"
            >
              <div className="bg-white border-4 border-jrpg-navy shadow-[4px_4px_0_0_var(--color-jrpg-navy)] min-w-[180px]">
                {/* Header */}
                <div className="bg-jrpg-navy px-4 py-2 flex items-center justify-between">
                  <span className="font-pixel text-[10px] text-jrpg-gold">POKÉMON MENU</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                    className="text-white hover:text-jrpg-red transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
                
                {/* Navigation items */}
                <div className="p-3 space-y-2">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 border-2 transition-all duration-150 ${
                          isActive
                            ? "border-jrpg-navy shadow-[2px_2px_0_0_var(--color-jrpg-navy)]"
                            : "border-gray-300 hover:border-gray-500 hover:shadow-[1px_1px_0_0_gray]"
                        }`}
                        style={{ backgroundColor: isActive ? item.color : 'white' }}
                      >
                        <Icon size={14} className={isActive ? "text-white" : "text-gray-600"} />
                        <span className={`font-pixel text-[9px] ${isActive ? "text-white" : "text-gray-700"}`}>
                          {t(item.labelKey)}
                        </span>
                      </Link>
                    );
                  })}
                </div>
                
                {/* Divider */}
                <div className="mx-3 h-px bg-gray-300" />
                
                {/* Language toggle */}
                <div className="p-3 flex gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); lang !== "en" && toggle(); }}
                    className={`flex-1 py-2 font-pixel text-[9px] border-2 transition-all ${
                      lang === "en"
                        ? "bg-jrpg-navy border-jrpg-navy text-jrpg-gold"
                        : "bg-white border-gray-300 text-gray-600 hover:border-gray-500"
                    }`}
                  >
                    ENG
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); lang !== "es" && toggle(); }}
                    className={`flex-1 py-2 font-pixel text-[9px] border-2 transition-all ${
                      lang === "es"
                        ? "bg-jrpg-navy border-jrpg-navy text-jrpg-gold"
                        : "bg-white border-gray-300 text-gray-600 hover:border-gray-500"
                    }`}
                  >
                    ESP
                  </button>
                </div>
                
                {/* Capture button */}
                <div className="px-3 pb-3">
                  <motion.button
                    onClick={(e) => { e.stopPropagation(); handleCapture(); }}
                    className="w-full py-2 bg-gradient-to-r from-jrpg-red to-jrpg-gold border-2 border-jrpg-navy font-pixel text-[9px] text-white shadow-[2px_2px_0_0_var(--color-jrpg-navy)]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ⭐ CAPTURE POKEBALL
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Capture Effect */}
      <AnimatePresence>
        {showCaptureEffect && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 2 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="relative">
              {/* Expanding rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-4 border-jrpg-gold rounded-full"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 3 + i, opacity: 0 }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                />
              ))}
              {/* Center star */}
              <motion.div
                className="text-6xl"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: [0, 1.5, 1], rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                ⭐
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Captured Pokeballs - Draggable */}
      <AnimatePresence>
        {capturedPokeballs.map((pokeball) => (
          <motion.div
            key={pokeball.id}
            className="fixed z-30 cursor-grab active:cursor-grabbing"
            style={{ x: pokeball.x, y: pokeball.y }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            drag
            dragConstraints={{ left: 0, right: window.innerWidth - 60, top: 0, bottom: window.innerHeight - 60 }}
            dragElastic={0.1}
            whileDrag={{ scale: 1.2, zIndex: 50 }}
          >
            <motion.div
              className="w-14 h-14 rounded-full border-3 border-jrpg-navy bg-white relative overflow-hidden shadow-[3px_3px_0_0_var(--color-jrpg-navy)]"
              whileHover={{ scale: 1.1 }}
            >
              {/* Top half - Red */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-red-500 to-red-600" />
              
              {/* Bottom half - White */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-gray-100 to-white" />
              
              {/* Center band - Black */}
              <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-jrpg-navy -translate-y-1/2 z-10" />
              
              {/* Center button - Outer */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-jrpg-navy bg-white z-20" />
              
              {/* Center button - Inner */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border border-jrpg-navy bg-jrpg-gold z-30" />
              
              {/* Shine effect */}
              <div className="absolute top-1 left-1 w-2 h-2 bg-white/50 rounded-full blur-sm" />
              
              {/* Remove button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removePokeball(pokeball.id);
                }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-jrpg-red rounded-full border border-jrpg-navy flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-40"
              >
                <X size={8} className="text-white" />
              </button>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
