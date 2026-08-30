import { motion } from "framer-motion";
import { Trophy, Star, Target, Zap, Shield, Crown, Medal, Award } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const achievements = [
  { id: 1, name: "FIRST QUEST", description: "Complete your first project", icon: Target, color: "#ef4444", unlocked: true, date: "2023" },
  { id: 2, name: "CODE WARRIOR", description: "Write 10,000+ lines of code", icon: Zap, color: "#f97316", unlocked: true, date: "2023" },
  { id: 3, name: "BUG HUNTER", description: "Fix 50+ bugs", icon: Shield, color: "#eab308", unlocked: true, date: "2024" },
  { id: 4, name: "FULL STACK", description: "Master both frontend and backend", icon: Star, color: "#22c55e", unlocked: true, date: "2024" },
  { id: 5, name: "DEVOPS MASTER", description: "Deploy 10+ applications", icon: Medal, color: "#06b6d4", unlocked: true, date: "2024" },
  { id: 6, name: "TEAM LEADER", description: "Lead a development team", icon: Crown, color: "#8b5cf6", unlocked: true, date: "2025" },
  { id: 7, name: "OPEN SOURCE", description: "Contribute to open source", icon: Award, color: "#ec4899", unlocked: true, date: "2025" },
  { id: 8, name: "LEGENDARY", description: "Complete all achievements", icon: Trophy, color: "#f59e0b", unlocked: false, date: "???" },
];

export default function Achievements() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const unlocked = achievements.filter(a => a.unlocked).length;

  return (
    <section className="min-h-screen pt-28 pb-24 pl-44 pr-8 relative bg-bg pixel-grid-bg overflow-x-hidden">
      <div ref={titleRef} className="text-center mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={titleVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }}>
          <div className="inline-block relative">
            <div className="bg-white border-4 border-jrpg-navy relative">
              <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500" />
              <div className="px-12 py-6">
                <p className="font-pixel text-xs text-jrpg-red tracking-widest mb-2">[ ACHIEVEMENTS ]</p>
                <h2 className="font-pixel text-3xl md:text-4xl text-jrpg-navy tracking-wider">BADGE COLLECTOR</h2>
                <p className="font-pixel text-[10px] text-gray-500 mt-2">ACHIEVEMENT GALLERY // {unlocked}/{achievements.length} UNLOCKED</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement, i) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className={`bg-white border-4 border-jrpg-navy relative overflow-hidden ${!achievement.unlocked ? 'opacity-50 grayscale' : ''}`}
              >
                <div className="h-2" style={{ backgroundColor: achievement.color }} />
                <div className="p-4 text-center">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center border-4"
                    style={{ borderColor: achievement.color, backgroundColor: `${achievement.color}20` }}
                  >
                    <Icon size={28} style={{ color: achievement.color }} />
                  </div>
                  <h3 className="font-pixel text-[10px] text-jrpg-navy tracking-wider mb-1">{achievement.name}</h3>
                  <p className="font-pixel text-[8px] text-gray-500 mb-2">{achievement.description}</p>
                  <span className="font-pixel text-[8px] px-2 py-1 border" style={{ borderColor: achievement.color, color: achievement.color }}>
                    {achievement.date}
                  </span>
                </div>
                <div className="h-1.5" style={{ backgroundColor: achievement.color }} />
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
