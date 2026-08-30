import { motion } from "framer-motion";
import { skillStats, type SkillStat } from "../../data/projects";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useLang } from "../../context/LangContext";
import { Zap, Shield, Heart, Swords, Wind, Trophy, Star, Award, Gem } from "lucide-react";

const categories = [
  { 
    key: "backend" as const, 
    labelKey: "skills.backend", 
    color: "#e94560",
    bgColor: "bg-red-500",
    lightBg: "bg-red-50",
    borderColor: "border-red-500",
    icon: "⚔️",
    type: "FIGHTING"
  },
  { 
    key: "frontend" as const, 
    labelKey: "skills.frontend", 
    color: "#00d2d3",
    bgColor: "bg-cyan-500",
    lightBg: "bg-cyan-50",
    borderColor: "border-cyan-500",
    icon: "🎨",
    type: "PSYCHIC"
  },
  { 
    key: "devops" as const, 
    labelKey: "skills.devops", 
    color: "#0f3460",
    bgColor: "bg-blue-800",
    lightBg: "bg-blue-50",
    borderColor: "border-blue-800",
    icon: "🔧",
    type: "STEEL"
  },
  { 
    key: "data" as const, 
    labelKey: "skills.data", 
    color: "#a855f7",
    bgColor: "bg-purple-500",
    lightBg: "bg-purple-50",
    borderColor: "border-purple-500",
    icon: "💾",
    type: "GHOST"
  },
  { 
    key: "tools" as const, 
    labelKey: "skills.tools", 
    color: "#f5c542",
    bgColor: "bg-yellow-500",
    lightBg: "bg-yellow-50",
    borderColor: "border-yellow-500",
    icon: "⚙️",
    type: "ELECTRIC"
  },
];

const medals = [
  { name: "Backend Master", icon: Trophy, color: "#e94560", description: ".NET/C# Expert", unlocked: true },
  { name: "Frontend Guru", icon: Star, color: "#00d2d3", description: "React/Angular Pro", unlocked: true },
  { name: "Cloud Pioneer", icon: Award, color: "#0f3460", description: "Docker/K8s Ready", unlocked: true },
  { name: "Data Wizard", icon: Gem, color: "#a855f7", description: "SQL Master", unlocked: true },
  { name: "Full Stack", icon: Zap, color: "#f5c542", description: "All Skills Combined", unlocked: true },
];

function PokemonStatBar({ 
  label, 
  value, 
  maxValue = 10, 
  color, 
  icon: Icon,
  delay = 0 
}: { 
  label: string; 
  value: number; 
  maxValue?: number; 
  color: string;
  icon: React.ElementType;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollReveal(0.2);
  const percentage = (value / maxValue) * 100;
  
  return (
    <div ref={ref} className="flex items-center gap-2 mb-2">
      <div className="flex items-center gap-1.5 w-20">
        <Icon size={10} style={{ color }} />
        <span className="font-pixel text-[9px] text-gray-600 uppercase">{label}</span>
      </div>
      <span className="font-pixel text-[10px] text-gray-800 w-6 text-right font-bold">{value}</span>
      <div className="flex-1 h-3 bg-gray-200 border border-gray-400 overflow-hidden">
        <motion.div
          className="h-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function PokemonCard({ 
  cat, 
  skills, 
  delay, 
  index 
}: { 
  cat: typeof categories[0]; 
  skills: SkillStat[]; 
  delay: number;
  index: number;
}) {
  const { t } = useLang();
  const avgLevel = Math.round(skills.reduce((acc, s) => acc + s.level, 0) / skills.length);
  const totalLevel = skills.reduce((acc, s) => acc + s.level, 0);
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 30 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      viewport={{ once: true }} 
      transition={{ delay, duration: 0.4 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <div className={`bg-white border-4 ${cat.borderColor} relative overflow-hidden`}>
        {/* Pokemon card header */}
        <div className={`${cat.bgColor} px-4 py-3 relative`}>
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)',
            backgroundSize: '8px 8px',
            backgroundPosition: '0 0, 4px 4px'
          }} />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-xl">{cat.icon}</span>
              <div>
                <h3 className="font-pixel text-sm text-white tracking-wide">{t(cat.labelKey)}</h3>
                <span className="font-pixel text-[8px] text-white/70">{cat.type} TYPE</span>
              </div>
            </div>
            <span className="font-pixel text-lg text-white font-bold">#{String(index + 1).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Pokemon avatar area */}
        <div className={`${cat.lightBg} p-4 border-b-2 ${cat.borderColor}`}>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 ${cat.bgColor} border-2 ${cat.borderColor} flex items-center justify-center relative`}>
              <span className="text-3xl">{cat.icon}</span>
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)',
                backgroundSize: '4px 4px'
              }} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-pixel text-[10px] text-gray-500">LVL</span>
                <span className="font-pixel text-lg text-gray-800 font-bold">{avgLevel}</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-pixel text-[9px] text-gray-500">SKILLS:</span>
                <span className="font-pixel text-[10px] text-gray-800">{skills.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-pixel text-[9px] text-gray-500">EXP:</span>
                <span className="font-pixel text-[10px] font-bold" style={{ color: cat.color }}>{totalLevel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pokemon stats */}
        <div className="p-4">
          <div className="mb-3">
            <span className="font-pixel text-[9px] text-gray-500 uppercase tracking-wider">Base Stats</span>
          </div>
          
          <PokemonStatBar label="HP" value={skills[0]?.level || 5} color="#ef4444" icon={Heart} delay={delay} />
          <PokemonStatBar label="ATK" value={skills[1]?.level || 5} color="#f97316" icon={Swords} delay={delay + 0.1} />
          <PokemonStatBar label="DEF" value={skills[2]?.level || 5} color="#eab308" icon={Shield} delay={delay + 0.2} />
          <PokemonStatBar label="SPD" value={Math.min(avgLevel + 1, 10)} color="#22c55e" icon={Wind} delay={delay + 0.3} />
        </div>

        {/* Skills list */}
        <div className="px-4 pb-4">
          <div className="border-t border-gray-200 pt-3">
            <span className="font-pixel text-[9px] text-gray-500 uppercase tracking-wider">Known Moves</span>
            <div className="mt-2 space-y-1.5">
              {skills.map((skill) => (
                <div 
                  key={skill.name} 
                  className="flex items-center justify-between py-1.5 px-2 bg-gray-50 border border-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="font-pixel text-[8px] text-gray-700">{skill.name}</span>
                  </div>
                  <span className="font-pixel text-[8px] font-bold" style={{ color: cat.color }}>
                    Lv.{skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`h-1.5 ${cat.bgColor}`} />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const { t } = useLang();

  const totalLevel = skillStats.reduce((acc, s) => acc + s.level, 0);
  const totalMax = skillStats.reduce((acc, s) => acc + s.maxLevel, 0);
  const avgLevel = Math.round(totalLevel / skillStats.length);

  return (
    <section className="min-h-screen pt-28 pb-24 pl-44 pr-8 relative bg-bg pixel-grid-bg overflow-x-hidden">
      {/* Title */}
      <div ref={titleRef} className="text-center mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={titleVisible ? { opacity: 1, y: 0 } : {}} 
          transition={{ duration: 0.4 }}
        >
          <div className="inline-block relative">
            <div className="bg-white border-4 border-jrpg-navy relative">
              <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500" />
              <div className="px-12 py-6">
                <p className="font-pixel text-xs text-jrpg-red tracking-widest mb-2">[ POKÉDEX ]</p>
                <h2 className="font-pixel text-3xl md:text-4xl text-jrpg-navy tracking-wider">
                  {t("skills.title")}
                </h2>
                <p className="font-pixel text-[10px] text-gray-500 mt-2">TRAINER CARD // SKILL ANALYSIS</p>
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

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="h-px bg-gradient-to-r from-transparent via-jrpg-navy/30 to-transparent" />
      </div>

      {/* Main Split Layout - 3 columns */}
      <div className="w-full px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column - Empty (sidebar space) */}
          <div className="hidden lg:block lg:col-span-2">
            {/* Intentionally empty for sidebar */}
          </div>

          {/* Center Column - Trainer Profile + Medals */}
          <div className="lg:col-span-4">
            {/* Trainer Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="bg-white border-4 border-jrpg-navy relative overflow-hidden">
                {/* Header */}
                <div className="bg-jrpg-navy px-5 py-3 flex items-center justify-between">
                  <span className="font-pixel text-[10px] text-jrpg-gold">TRAINER PROFILE</span>
                  <span className="font-pixel text-[9px] text-white/70">ID: USK-001</span>
                </div>
                
                <div className="p-5">
                  {/* Avatar and Basic Info */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-24 h-24 border-4 border-jrpg-navy bg-gradient-to-br from-jrpg-blue to-jrpg-navy flex items-center justify-center relative">
                      <span className="font-pixel text-3xl text-jrpg-gold">U</span>
                      <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)',
                        backgroundSize: '4px 4px'
                      }} />
                      {/* Level badge */}
                      <div className="absolute -bottom-2 -right-2 bg-jrpg-red border-2 border-jrpg-navy px-2 py-0.5">
                        <span className="font-pixel text-[8px] text-white">LVL {avgLevel}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-pixel text-base text-jrpg-navy mb-1">USKEIN</h3>
                      <p className="font-pixel text-[9px] text-gray-500 mb-2">Full-Stack Developer</p>
                      <div className="flex items-center gap-2">
                        <span className="font-pixel text-[9px] text-gray-500">RANK:</span>
                        <span className="font-pixel text-[10px] text-jrpg-red font-bold">
                          {avgLevel >= 8 ? 'MASTER' : avgLevel >= 6 ? 'EXPERT' : 'APPRENTICE'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center p-2 bg-gradient-to-b from-red-50 to-white border-2 border-red-200">
                      <p className="font-pixel text-[7px] text-gray-500 mb-1">TOTAL EXP</p>
                      <p className="font-pixel text-base text-jrpg-red font-bold">{totalLevel}</p>
                    </div>
                    <div className="text-center p-2 bg-gradient-to-b from-blue-50 to-white border-2 border-blue-200">
                      <p className="font-pixel text-[7px] text-gray-500 mb-1">AVG LVL</p>
                      <p className="font-pixel text-base text-jrpg-navy font-bold">{avgLevel}</p>
                    </div>
                    <div className="text-center p-2 bg-gradient-to-b from-yellow-50 to-white border-2 border-yellow-200">
                      <p className="font-pixel text-[7px] text-gray-500 mb-1">SKILLS</p>
                      <p className="font-pixel text-base text-jrpg-gold font-bold">{skillStats.length}</p>
                    </div>
                  </div>

                  {/* Main Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-pixel text-[9px] text-gray-500">MASTERY PROGRESS</span>
                      <span className="font-pixel text-[9px] text-jrpg-navy font-bold">{totalLevel}/{totalMax}</span>
                    </div>
                    <div className="h-5 bg-gray-200 border-2 border-jrpg-navy overflow-hidden relative">
                      <motion.div
                        className="h-full bg-gradient-to-r from-jrpg-red via-jrpg-gold to-jrpg-red"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(totalLevel / totalMax) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                      />
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute top-0 bottom-0 w-px bg-jrpg-navy/20"
                          style={{ left: `${(i + 1) * 10}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Special Skills */}
                  <div className="flex items-center gap-2">
                    <span className="font-pixel text-[9px] text-gray-500">SPECIALTY:</span>
                    <span className="font-pixel text-[9px] text-jrpg-red font-bold">BACKEND + FRONTEND</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Medals Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white border-4 border-jrpg-navy">
                {/* Header */}
                <div className="bg-gradient-to-r from-jrpg-gold to-yellow-500 px-5 py-3">
                  <div className="flex items-center gap-2">
                    <Trophy size={16} className="text-jrpg-navy" />
                    <span className="font-pixel text-[10px] text-jrpg-navy tracking-wider">BADGES EARNED</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {medals.map((medal, i) => (
                      <motion.div
                        key={medal.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className={`p-2 border-2 ${medal.unlocked ? 'border-gray-300 bg-gradient-to-b from-gray-50 to-white' : 'border-gray-200 bg-gray-100 opacity-50'}`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center border-2"
                            style={{ 
                              borderColor: medal.unlocked ? medal.color : '#9ca3af',
                              backgroundColor: medal.unlocked ? `${medal.color}20` : '#f3f4f6'
                            }}
                          >
                            <medal.icon 
                              size={14} 
                              style={{ color: medal.unlocked ? medal.color : '#9ca3af' }}
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-pixel text-[8px] text-gray-800 font-bold">{medal.name}</p>
                            <p className="font-pixel text-[7px] text-gray-500">{medal.description}</p>
                          </div>
                        </div>
                        {medal.unlocked && (
                          <div className="flex items-center gap-1">
                            <Star size={8} className="text-jrpg-gold fill-jrpg-gold" />
                            <Star size={8} className="text-jrpg-gold fill-jrpg-gold" />
                            <Star size={8} className="text-jrpg-gold fill-jrpg-gold" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Medal Count */}
                  <div className="mt-4 pt-3 border-t border-gray-200 text-center">
                    <span className="font-pixel text-[9px] text-gray-500">
                      {medals.filter(m => m.unlocked).length}/{medals.length} BADGES COLLECTED
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Pokemon Cards (Pokedex Style) */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((cat, i) => (
                <PokemonCard 
                  key={cat.key} 
                  cat={cat} 
                  skills={skillStats.filter((s) => s.category === cat.key)} 
                  delay={0.1 + i * 0.1}
                  index={i}
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
