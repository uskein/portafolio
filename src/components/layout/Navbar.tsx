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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface border-b-4 border-jrpg-navy shadow-[0_4px_0_0_var(--color-jrpg-blue)]">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 border-2 border-jrpg-navy bg-jrpg-navy flex items-center justify-center">
              <span className="font-pixel text-[8px] text-jrpg-gold">U</span>
            </div>
            <span className="font-pixel text-[10px] text-jrpg-navy tracking-wider group-hover:text-jrpg-red transition-colors">
              USKEIN
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 font-pixel text-[8px] tracking-wider transition-all duration-200 border-2 ${
                    isActive
                      ? "bg-jrpg-navy text-jrpg-gold border-jrpg-blue shadow-[2px_2px_0_0_var(--color-jrpg-blue)]"
                      : "text-text-secondary border-transparent hover:text-jrpg-navy hover:bg-jrpg-navy/5 hover:border-jrpg-navy/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={12} />
                    {t(item.labelKey)}
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <div className="flex border-2 border-jrpg-navy bg-surface">
              <button
                onClick={() => lang !== "en" && toggle()}
                className={`px-3 py-1.5 font-pixel text-[8px] transition-all ${
                  lang === "en" ? "bg-jrpg-navy text-jrpg-gold" : "text-text-muted hover:bg-jrpg-navy/5"
                }`}
              >
                EN
              </button>
              <div className="w-px bg-jrpg-navy" />
              <button
                onClick={() => lang !== "es" && toggle()}
                className={`px-3 py-1.5 font-pixel text-[8px] transition-all ${
                  lang === "es" ? "bg-jrpg-navy text-jrpg-gold" : "text-text-muted hover:bg-jrpg-navy/5"
                }`}
              >
                ES
              </button>
            </div>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-jrpg-navy hover:text-jrpg-red transition-colors">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.2 }}
            className="fixed inset-0 z-40 bg-bg/95 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-3">
              {navItems.map((item, i) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <motion.div key={item.path} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-4 px-8 py-4 font-pixel text-sm tracking-wider transition-all ${
                        isActive
                          ? "bg-jrpg-navy text-jrpg-gold border-2 border-jrpg-blue"
                          : "text-text-secondary hover:text-jrpg-navy hover:bg-jrpg-navy/5 border-2 border-transparent"
                      }`}
                    >
                      <Icon size={16} />
                      {t(item.labelKey)}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="flex border-2 border-jrpg-navy bg-surface mt-4">
                <button onClick={() => lang !== "en" && toggle()} className={`px-4 py-2 font-pixel text-[10px] ${lang === "en" ? "bg-jrpg-navy text-jrpg-gold" : "text-text-muted"}`}>EN</button>
                <div className="w-px bg-jrpg-navy" />
                <button onClick={() => lang !== "es" && toggle()} className={`px-4 py-2 font-pixel text-[10px] ${lang === "es" ? "bg-jrpg-navy text-jrpg-gold" : "text-text-muted"}`}>ES</button>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-jrpg-navy hover:text-jrpg-red transition-colors">
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-14" />
    </>
  );
}
