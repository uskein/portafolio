import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, BarChart3, FolderOpen, Clock, Mail } from "lucide-react";
import { useLang } from "../../context/LangContext";

const navItems = [
  { path: "/", labelKey: "nav.home", icon: Home },
  { path: "/skills", labelKey: "nav.skills", icon: BarChart3 },
  { path: "/projects", labelKey: "nav.projects", icon: FolderOpen },
  { path: "/timeline", labelKey: "nav.timeline", icon: Clock },
  { path: "/contact", labelKey: "nav.contact", icon: Mail },
];

export default function SideNav() {
  const location = useLocation();
  const { lang, toggle, t } = useLang();

  return (
    <motion.div
      className="fixed left-3 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
    >
      {/* Navigation buttons */}
      <div className="flex flex-col gap-1.5 mb-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              title={t(item.labelKey)}
              className={`w-11 h-11 flex items-center justify-center border-2 transition-all duration-150 ${
                isActive
                  ? "bg-jrpg-navy border-jrpg-blue text-jrpg-gold shadow-[2px_2px_0_0_var(--color-jrpg-blue)]"
                  : "bg-white border-gray-400 text-gray-600 hover:bg-gray-100 hover:border-gray-500 shadow-[1px_1px_0_0_gray]"
              }`}
            >
              <Icon size={16} />
            </Link>
          );
        })}
      </div>

      {/* Divider */}
      <div className="w-8 h-px bg-gray-300 mb-3" />

      {/* Language toggle - vertical stack */}
      <div className="flex flex-col gap-1 mb-3">
        <button
          onClick={() => lang !== "en" && toggle()}
          className={`w-11 h-6 flex items-center justify-center font-pixel text-[7px] border-2 transition-all ${
            lang === "en"
              ? "bg-jrpg-navy border-jrpg-blue text-jrpg-gold"
              : "bg-white border-gray-400 text-gray-500 hover:bg-gray-100"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => lang !== "es" && toggle()}
          className={`w-11 h-6 flex items-center justify-center font-pixel text-[7px] border-2 transition-all ${
            lang === "es"
              ? "bg-jrpg-navy border-jrpg-blue text-jrpg-gold"
              : "bg-white border-gray-400 text-gray-500 hover:bg-gray-100"
          }`}
        >
          ES
        </button>
      </div>

      {/* Divider */}
      <div className="w-8 h-px bg-gray-300 mb-3" />

      {/* Decorative dot */}
      <motion.div
        className="w-3 h-3 bg-jrpg-red border border-jrpg-navy"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}
