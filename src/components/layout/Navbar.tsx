import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, BarChart3, FolderOpen, Clock, Mail } from "lucide-react";
import { useLang } from "../../context/LangContext";

const navItems = [
  { path: "/", labelKey: "nav.home", icon: Home },
  { path: "/skills", labelKey: "nav.skills", icon: BarChart3 },
  { path: "/projects", labelKey: "nav.projects", icon: FolderOpen },
  { path: "/timeline", labelKey: "nav.timeline", icon: Clock },
  { path: "/contact", labelKey: "nav.contact", icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { lang, toggle, t } = useLang();

  return (
    <>
      {/* Top Bar - 8-bit style */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        {/* Pixel border top */}
        <div className="h-1.5 bg-gradient-to-r from-jrpg-red via-jrpg-gold to-jrpg-red" />
        
        {/* Main nav container */}
        <div className="bg-surface border-b-4 border-jrpg-navy relative">
          {/* Inner pixel decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-jrpg-blue opacity-50" />
          
          <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
            {/* Logo - 8-bit style */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Logo box with pixel shadow */}
                <div className="w-12 h-12 border-3 border-jrpg-navy bg-jrpg-navy flex items-center justify-center relative">
                  <span className="font-pixel text-sm text-jrpg-gold relative z-10">U</span>
                  {/* Pixel shadow effect */}
                  <div className="absolute inset-0 bg-jrpg-red translate-x-[3px] translate-y-[3px] -z-10" />
                </div>
              </motion.div>
              <div className="flex flex-col">
                <span className="font-pixel text-sm text-jrpg-navy tracking-wider group-hover:text-jrpg-red transition-colors">
                  USKEIN
                </span>
                <span className="font-pixel text-[8px] text-text-muted tracking-widest">
                  // PORTFOLIO v1.0
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - 8-bit menu style */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-5 py-3 font-pixel text-[10px] tracking-wider transition-all duration-150 border-2 ${
                      isActive
                        ? "bg-jrpg-navy text-jrpg-gold border-jrpg-blue shadow-[3px_3px_0_0_var(--color-jrpg-blue)]"
                        : "text-text-secondary border-transparent hover:text-jrpg-navy hover:bg-jrpg-navy/5 hover:border-jrpg-navy/20"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={14} strokeWidth={isActive ? 2.5 : 2} />
                      <span>{t(item.labelKey)}</span>
                    </div>
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div 
                        className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-jrpg-gold"
                        layoutId="activeTab"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Language Toggle - 8-bit switcher */}
            <div className="hidden md:flex items-center">
              <div className="flex border-2 border-jrpg-navy bg-surface relative">
                {/* Pixel decoration */}
                <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-jrpg-red border border-jrpg-navy" />
                <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-jrpg-red border border-jrpg-navy" />
                
                <button
                  onClick={() => lang !== "en" && toggle()}
                  className={`px-5 py-2.5 font-pixel text-[10px] transition-all duration-150 ${
                    lang === "en" 
                      ? "bg-jrpg-navy text-jrpg-gold" 
                      : "text-text-muted hover:bg-jrpg-navy/5"
                  }`}
                >
                  EN
                </button>
                <div className="w-px bg-jrpg-navy" />
                <button
                  onClick={() => lang !== "es" && toggle()}
                  className={`px-5 py-2.5 font-pixel text-[10px] transition-all duration-150 ${
                    lang === "es" 
                      ? "bg-jrpg-navy text-jrpg-gold" 
                      : "text-text-muted hover:bg-jrpg-navy/5"
                  }`}
                >
                  ES
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden relative w-12 h-12 flex items-center justify-center border-2 border-jrpg-navy bg-surface hover:bg-jrpg-navy/5 transition-colors"
            >
              {isOpen ? <X size={22} className="text-jrpg-red" /> : <Menu size={22} className="text-jrpg-navy" />}
              {/* Pixel shadow */}
              <div className="absolute inset-0 bg-jrpg-navy/20 translate-x-[2px] translate-y-[2px] -z-10" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-bg/98 md:hidden"
          >
            {/* Scanline effect */}
            <div className="absolute inset-0 scanline-overlay pointer-events-none" />
            
            <div className="flex flex-col items-center justify-center h-full gap-4 relative z-10">
              {/* Mobile menu title */}
              <div className="mb-6 text-center">
                <p className="font-pixel text-xs text-jrpg-red tracking-widest mb-1">[ SYSTEM MENU ]</p>
                <div className="w-32 h-px bg-jrpg-navy/30 mx-auto" />
              </div>

              {navItems.map((item, i) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={item.path} 
                    initial={{ opacity: 0, x: 50 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-4 px-12 py-5 font-pixel text-base tracking-wider transition-all border-2 ${
                        isActive
                          ? "bg-jrpg-navy text-jrpg-gold border-jrpg-blue shadow-[4px_4px_0_0_var(--color-jrpg-blue)]"
                          : "text-text-secondary bg-surface border-jrpg-navy/30 hover:text-jrpg-navy hover:bg-jrpg-navy/5 hover:border-jrpg-navy"
                      }`}
                    >
                      <Icon size={20} />
                      <span>{t(item.labelKey)}</span>
                      {isActive && <span className="ml-2 text-jrpg-gold">◀</span>}
                    </Link>
                  </motion.div>
                );
              })}
              
              {/* Mobile language toggle */}
              <div className="flex border-2 border-jrpg-navy bg-surface mt-6 relative">
                <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-jrpg-red border border-jrpg-navy" />
                <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-jrpg-red border border-jrpg-navy" />
                <button onClick={() => lang !== "en" && toggle()} className={`px-8 py-4 font-pixel text-xs ${lang === "en" ? "bg-jrpg-navy text-jrpg-gold" : "text-text-muted"}`}>EN</button>
                <div className="w-px bg-jrpg-navy" />
                <button onClick={() => lang !== "es" && toggle()} className={`px-8 py-4 font-pixel text-xs ${lang === "es" ? "bg-jrpg-navy text-jrpg-gold" : "text-text-muted"}`}>ES</button>
              </div>
            </div>

            {/* Close button */}
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center border-2 border-jrpg-navy bg-surface hover:bg-jrpg-red/10 transition-colors"
            >
              <X size={24} className="text-jrpg-navy" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-[76px]" />
    </>
  );
}
