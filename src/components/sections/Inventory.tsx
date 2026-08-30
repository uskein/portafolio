import { motion } from "framer-motion";
import { Package, Code, Database, Cloud, Wrench } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const categories = [
  {
    name: "WEAPONS",
    icon: Code,
    color: "#ef4444",
    items: [
      { name: "VS Code", level: 9, color: "#007ACC" },
      { name: "Rust Analyzer", level: 8, color: "#000000" },
      { name: "JetBrains", level: 7, color: "#FF3131" },
    ]
  },
  {
    name: "ARMOR",
    icon: Database,
    color: "#06b6d4",
    items: [
      { name: "PostgreSQL", level: 8, color: "#336791" },
      { name: "SQL Server", level: 9, color: "#CC2927" },
      { name: "Redis", level: 6, color: "#DC382D" },
    ]
  },
  {
    name: "POTIONS",
    icon: Cloud,
    color: "#22c55e",
    items: [
      { name: "Docker", level: 8, color: "#2496ED" },
      { name: "Kubernetes", level: 6, color: "#326CE5" },
      { name: "AWS", level: 5, color: "#FF9900" },
    ]
  },
  {
    name: "TOOLS",
    icon: Wrench,
    color: "#eab308",
    items: [
      { name: "Git", level: 9, color: "#F05032" },
      { name: "Linux", level: 7, color: "#FCC624" },
      { name: "Nginx", level: 6, color: "#009639" },
    ]
  },
];

export default function Inventory() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();

  return (
    <section className="min-h-screen pt-28 pb-24 pl-44 pr-8 relative bg-bg pixel-grid-bg overflow-x-hidden">
      <div ref={titleRef} className="text-center mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={titleVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }}>
          <div className="inline-block relative">
            <div className="bg-white border-4 border-jrpg-navy relative">
              <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500" />
              <div className="px-12 py-6">
                <p className="font-pixel text-xs text-jrpg-red tracking-widest mb-2">[ INVENTORY ]</p>
                <h2 className="font-pixel text-3xl md:text-4xl text-jrpg-navy tracking-wider">ITEM POCKET</h2>
                <p className="font-pixel text-[10px] text-gray-500 mt-2">TOOLS & EQUIPMENT // LOADOUT</p>
              </div>
              <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500" />
            </div>
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 border-2 border-jrpg-navy" />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 border-2 border-jrpg-navy" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-red-500 border-2 border-jrpg-navy" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-red-500 border-2 border-jrpg-navy" />
          </div>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left - Empty (sidebar space) */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Main Content */}
          <div className="lg:col-span-11">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category, i) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border-4 border-jrpg-navy"
              >
                <div className="px-5 py-3 flex items-center gap-2" style={{ backgroundColor: category.color }}>
                  <Icon size={16} className="text-white" />
                  <span className="font-pixel text-[10px] text-white tracking-wider">{category.name}</span>
                </div>
                <div className="p-4">
                  {category.items.map((item) => (
                    <div key={item.name} className="flex items-center gap-3 mb-3 last:mb-0">
                      <div className="w-10 h-10 flex items-center justify-center border-2" style={{ borderColor: item.color, backgroundColor: `${item.color}20` }}>
                        <Package size={16} style={{ color: item.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-pixel text-[9px] text-gray-700">{item.name}</span>
                          <span className="font-pixel text-[8px] font-bold" style={{ color: item.color }}>LV.{item.level}</span>
                        </div>
                        <div className="h-2 bg-gray-200 border border-gray-300 overflow-hidden">
                          <div className="h-full" style={{ backgroundColor: item.color, width: `${item.level * 10}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
