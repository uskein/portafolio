import { motion } from "framer-motion";
import { Swords, Calendar, MapPin, Trophy, ChevronRight } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const battles = [
  { id: 1, title: "Microservices Architecture", date: "2024", location: "Enterprise Project", result: "VICTORY", exp: "+500 XP", color: "#22c55e" },
  { id: 2, title: "Real-time Sync Bug", date: "2024", location: "PLMP4", result: "VICTORY", exp: "+300 XP", color: "#22c55e" },
  { id: 3, title: "Legacy Code Migration", date: "2025", location: "Angular Project", result: "VICTORY", exp: "+400 XP", color: "#22c55e" },
  { id: 4, title: "Performance Optimization", date: "2025", location: "Backend API", result: "VICTORY", exp: "+350 XP", color: "#22c55e" },
  { id: 5, title: "Docker Orchestration", date: "2025", location: "Cloud Deploy", result: "IN PROGRESS", exp: "+200 XP", color: "#eab308" },
];

export default function BattleLog() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();

  return (
    <section className="min-h-screen pt-28 pb-24 pl-44 pr-8 relative bg-bg pixel-grid-bg overflow-x-hidden">
      <div ref={titleRef} className="text-center mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={titleVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }}>
          <div className="inline-block relative">
            <div className="bg-white border-4 border-jrpg-navy relative">
              <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500" />
              <div className="px-12 py-6">
                <p className="font-pixel text-xs text-jrpg-red tracking-widest mb-2">[ BATTLE LOG ]</p>
                <h2 className="font-pixel text-3xl md:text-4xl text-jrpg-navy tracking-wider">COMBAT RECORDS</h2>
                <p className="font-pixel text-[10px] text-gray-500 mt-2">FIGHT HISTORY // VICTORY LOG</p>
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

      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left - Empty (sidebar space) */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Main Content */}
          <div className="lg:col-span-11">
            <div className="space-y-4">
              {battles.map((battle, i) => (
            <motion.div
              key={battle.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 10 }}
              className="bg-white border-4 border-jrpg-navy relative overflow-hidden"
            >
              <div className="h-2" style={{ backgroundColor: battle.color }} />
              <div className="p-4 flex items-center gap-4">
                <div className="w-14 h-14 flex items-center justify-center border-4 border-jrpg-navy" style={{ backgroundColor: `${battle.color}20` }}>
                  <Swords size={24} style={{ color: battle.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-pixel text-[11px] text-jrpg-navy tracking-wider mb-1">{battle.title}</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={10} className="text-gray-400" />
                      <span className="font-pixel text-[8px] text-gray-500">{battle.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={10} className="text-gray-400" />
                      <span className="font-pixel text-[8px] text-gray-500">{battle.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-pixel text-[10px] font-bold" style={{ color: battle.color }}>{battle.result}</span>
                  <p className="font-pixel text-[9px] text-jrpg-gold mt-1">{battle.exp}</p>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
              <div className="h-1" style={{ backgroundColor: battle.color }} />
            </motion.div>
          ))}
          </div>

        {/* Total Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-white border-4 border-jrpg-navy p-5"
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <Trophy size={20} className="text-jrpg-gold mx-auto mb-1" />
              <p className="font-pixel text-lg text-jrpg-gold font-bold">4</p>
              <p className="font-pixel text-[8px] text-gray-500">VICTORIES</p>
            </div>
            <div>
              <Swords size={20} className="text-jrpg-red mx-auto mb-1" />
              <p className="font-pixel text-lg text-jrpg-red font-bold">1</p>
              <p className="font-pixel text-[8px] text-gray-500">IN PROGRESS</p>
            </div>
            <div>
              <Trophy size={20} className="text-jrpg-navy mx-auto mb-1" />
              <p className="font-pixel text-lg text-jrpg-navy font-bold">1750</p>
              <p className="font-pixel text-[8px] text-gray-500">TOTAL XP</p>
            </div>
          </div>
        </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
