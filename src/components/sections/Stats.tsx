import { motion } from "framer-motion";
import { GitBranch, Code, Clock, TrendingUp, Activity } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const languages = [
  { name: "TypeScript", percentage: 35, color: "#3178C6" },
  { name: "C#", percentage: 25, color: "#239120" },
  { name: "Rust", percentage: 15, color: "#000000" },
  { name: "Python", percentage: 10, color: "#3776AB" },
  { name: "SQL", percentage: 10, color: "#e38c00" },
  { name: "Other", percentage: 5, color: "#6b7280" },
];

const stats = [
  { label: "Total Commits", value: "1,247", icon: GitBranch, color: "#ef4444" },
  { label: "Projects", value: "12", icon: Code, color: "#06b6d4" },
  { label: "Years Coding", value: "3+", icon: Clock, color: "#eab308" },
  { label: "Contributions", value: "500+", icon: TrendingUp, color: "#22c55e" },
];

const weeklyActivity = [4, 7, 3, 8, 5, 2, 6, 9, 4, 7, 3, 8, 5, 2];

export default function Stats() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();

  return (
    <section className="min-h-screen pt-28 pb-24 pl-44 pr-8 relative bg-bg pixel-grid-bg overflow-x-hidden">
      <div ref={titleRef} className="text-center mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={titleVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }}>
          <div className="inline-block relative">
            <div className="bg-white border-4 border-jrpg-navy relative">
              <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500" />
              <div className="px-12 py-6">
                <p className="font-pixel text-xs text-jrpg-red tracking-widest mb-2">[ STATS ]</p>
                <h2 className="font-pixel text-3xl md:text-4xl text-jrpg-navy tracking-wider">DATA DASHBOARD</h2>
                <p className="font-pixel text-[10px] text-gray-500 mt-2">ANALYTICS // PERFORMANCE METRICS</p>
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
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border-4 border-jrpg-navy p-4 text-center"
              >
                <Icon size={24} style={{ color: stat.color }} className="mx-auto mb-2" />
                <p className="font-pixel text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                <p className="font-pixel text-[8px] text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border-4 border-jrpg-navy"
          >
            <div className="bg-jrpg-navy px-5 py-3">
              <span className="font-pixel text-[10px] text-jrpg-gold">LANGUAGES</span>
            </div>
            <div className="p-5">
              {languages.map((lang) => (
                <div key={lang.name} className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-pixel text-[9px] text-gray-700">{lang.name}</span>
                    <span className="font-pixel text-[9px] font-bold" style={{ color: lang.color }}>{lang.percentage}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 border border-gray-300 overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: lang.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Activity Graph */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border-4 border-jrpg-navy"
          >
            <div className="bg-jrpg-navy px-5 py-3 flex items-center justify-between">
              <span className="font-pixel text-[10px] text-jrpg-gold">WEEKLY ACTIVITY</span>
              <Activity size={14} className="text-jrpg-gold" />
            </div>
            <div className="p-5">
              <div className="flex items-end justify-between h-40 gap-2">
                {weeklyActivity.map((value, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-jrpg-red to-jrpg-gold"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(value / 10) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-3">
                <span className="font-pixel text-[7px] text-gray-500">MON</span>
                <span className="font-pixel text-[7px] text-gray-500">TUE</span>
                <span className="font-pixel text-[7px] text-gray-500">WED</span>
                <span className="font-pixel text-[7px] text-gray-500">THU</span>
                <span className="font-pixel text-[7px] text-gray-500">FRI</span>
                <span className="font-pixel text-[7px] text-gray-500">SAT</span>
                <span className="font-pixel text-[7px] text-gray-500">SUN</span>
              </div>
            </div>
          </motion.div>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
}
