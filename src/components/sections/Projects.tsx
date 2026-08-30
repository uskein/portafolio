import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Star, Sword, Shield, Trophy, Target, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "../../data/projects";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useLang } from "../../context/LangContext";

const projectColors = [
  { bg: "from-red-500 to-red-600", border: "border-red-400", accent: "#ef4444", type: "FIRE TYPE" },
  { bg: "from-cyan-500 to-cyan-600", border: "border-cyan-400", accent: "#06b6d4", type: "WATER TYPE" },
  { bg: "from-yellow-500 to-yellow-600", border: "border-yellow-400", accent: "#eab308", type: "ELECTRIC TYPE" },
];

function MissionWheel({ 
  selectedIndex, 
  onSelect 
}: { 
  selectedIndex: number; 
  onSelect: (index: number) => void;
}) {
  const totalProjects = projects.length;

  const goNext = () => onSelect((selectedIndex + 1) % totalProjects);
  const goPrev = () => onSelect((selectedIndex - 1 + totalProjects) % totalProjects);

  return (
    <div className="relative">
      {/* Wheel Container */}
      <div className="bg-white border-4 border-jrpg-navy relative overflow-hidden">
        {/* Header */}
        <div className="bg-jrpg-navy px-4 py-2 flex items-center justify-between">
          <span className="font-pixel text-[10px] text-jrpg-gold">MISSION SELECTOR</span>
          <span className="font-pixel text-[8px] text-white/60">{selectedIndex + 1}/{totalProjects}</span>
        </div>

        {/* Wheel Display */}
        <div className="p-5">
          {/* Navigation */}
          <div className="flex items-center gap-4">
            <button 
              onClick={goPrev}
              className="w-10 h-10 bg-jrpg-navy border-2 border-jrpg-navy flex items-center justify-center hover:bg-jrpg-navy/80 transition-colors"
            >
              <ChevronLeft size={18} className="text-jrpg-gold" />
            </button>

            {/* Center Display */}
            <div className="flex-1 relative">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 border-4 border-jrpg-navy p-5"
              >
                {(() => {
                  const project = projects[selectedIndex];
                  const color = projectColors[selectedIndex % projectColors.length];
                  const rankStars = Array.from({ length: project.rank });
                  
                  return (
                    <>
                      {/* Top */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-14 h-14 bg-gradient-to-br ${color.bg} flex items-center justify-center border-4 border-jrpg-navy`}>
                            <span className="font-pixel text-2xl text-white">{project.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className="font-pixel text-sm text-jrpg-navy tracking-wider">{project.name}</h3>
                            <p className="font-pixel text-[9px] text-gray-500">{project.repo}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {rankStars.map((_, i) => (
                            <Star key={i} size={14} className="text-jrpg-gold fill-jrpg-gold" />
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="bg-white border-2 border-gray-200 p-3 mb-3">
                        <p className="font-pixel text-[10px] text-gray-700 leading-relaxed">{project.description}</p>
                      </div>

                      {/* Tech */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.tech.map((t) => (
                          <span
                            key={t.name}
                            className="px-2 py-1 border font-pixel text-[8px]"
                            style={{ borderColor: t.color, color: t.color, backgroundColor: `${t.color}10` }}
                          >
                            {t.name}
                          </span>
                        ))}
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${project.status === 'completed' ? 'bg-jrpg-gold' : 'bg-jrpg-red'}`} />
                          <span className="font-pixel text-[9px] text-gray-600 uppercase">{project.status}</span>
                        </div>
                        <span className="font-pixel text-[9px] text-jrpg-navy">RANK {project.rank}/5</span>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </div>

            <button 
              onClick={goNext}
              className="w-10 h-10 bg-jrpg-navy border-2 border-jrpg-navy flex items-center justify-center hover:bg-jrpg-navy/80 transition-colors"
            >
              <ChevronRight size={18} className="text-jrpg-gold" />
            </button>
          </div>

          {/* Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {projects.map((p, i) => {
              const color = projectColors[i % projectColors.length];
              return (
                <button
                  key={p.id}
                  onClick={() => onSelect(i)}
                  className={`transition-all ${
                    i === selectedIndex 
                      ? 'w-6 h-3' 
                      : 'w-3 h-3'
                  }`}
                  style={{ 
                    backgroundColor: i === selectedIndex ? color.accent : '#e5e7eb',
                    border: '2px solid #1e3a5f'
                  }}
                />
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mt-5">
            <div className="text-center p-2 bg-gray-50 border border-gray-200">
              <p className="font-pixel text-[7px] text-gray-500">STATUS</p>
              <p className="font-pixel text-[9px] text-jrpg-navy font-bold uppercase">{projects[selectedIndex].status}</p>
            </div>
            <div className="text-center p-2 bg-gray-50 border border-gray-200">
              <p className="font-pixel text-[7px] text-gray-500">RANK</p>
              <p className="font-pixel text-[9px] text-jrpg-gold font-bold">{projects[selectedIndex].rank}/5</p>
            </div>
            <div className="text-center p-2 bg-gray-50 border border-gray-200">
              <p className="font-pixel text-[7px] text-gray-500">TECH</p>
              <p className="font-pixel text-[9px] text-jrpg-navy font-bold">{projects[selectedIndex].tech.length}</p>
            </div>
          </div>

          {/* Action Button */}
          <a href={projects[selectedIndex].githubUrl} target="_blank" rel="noopener noreferrer" className="block mt-5">
            <div className="flex items-center justify-center gap-2 py-3 bg-jrpg-navy text-white font-pixel text-[10px] tracking-wider hover:bg-jrpg-navy/90 transition-colors">
              <ExternalLink size={14} />
              <span>LAUNCH QUEST</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const { t } = useLang();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === "completed").length;
  const totalTech = [...new Set(projects.flatMap(p => p.tech.map(t => t.name)))].length;
  const avgRank = Math.round(projects.reduce((acc, p) => acc + p.rank, 0) / projects.length);

  return (
    <section className="min-h-screen pt-28 pb-24 pl-44 pr-8 relative bg-bg pixel-grid-bg overflow-x-hidden">
      {/* Title */}
      <div ref={titleRef} className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={titleVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-block relative">
            <div className="bg-white border-4 border-jrpg-navy relative">
              <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500" />
              <div className="px-12 py-6">
                <p className="font-pixel text-xs text-jrpg-red tracking-widest mb-2">[ QUEST LOG ]</p>
                <h2 className="font-pixel text-3xl md:text-4xl text-jrpg-navy tracking-wider">
                  {t("projects.title")}
                </h2>
                <p className="font-pixel text-[10px] text-gray-500 mt-2">MISSION BOARD // ACTIVE QUESTS</p>
              </div>
              <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500" />
            </div>
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 border-2 border-jrpg-navy" />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 border-2 border-jrpg-navy" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-red-500 border-2 border-jrpg-navy" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-red-500 border-2 border-jrpg-navy" />
          </div>
        </motion.div>

        {/* Quest Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="inline-block mt-6"
        >
          <div className="bg-white border-4 border-jrpg-navy p-4">
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Sword size={12} className="text-jrpg-red" />
                </div>
                <p className="font-pixel text-[7px] text-gray-500">TOTAL</p>
                <p className="font-pixel text-lg text-jrpg-red font-bold">{totalProjects}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Trophy size={12} className="text-jrpg-gold" />
                </div>
                <p className="font-pixel text-[7px] text-gray-500">DONE</p>
                <p className="font-pixel text-lg text-jrpg-gold font-bold">{completedProjects}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Shield size={12} className="text-jrpg-navy" />
                </div>
                <p className="font-pixel text-[7px] text-gray-500">TECH</p>
                <p className="font-pixel text-lg text-jrpg-navy font-bold">{totalTech}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star size={12} className="text-jrpg-gold fill-jrpg-gold" />
                </div>
                <p className="font-pixel text-[7px] text-gray-500">RANK</p>
                <p className="font-pixel text-lg text-jrpg-gold font-bold">{avgRank}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="h-px bg-gradient-to-r from-transparent via-jrpg-navy/30 to-transparent" />
      </div>

      {/* Main Layout */}
      <div className="w-full px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
          
          {/* Left - Empty (sidebar space) */}
          <div className="hidden lg:block lg:col-span-1">
            {/* Intentionally empty for sidebar */}
          </div>

          {/* Quest List */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white border-4 border-jrpg-navy">
                <div className="bg-jrpg-navy px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target size={12} className="text-jrpg-gold" />
                    <span className="font-pixel text-[10px] text-jrpg-gold">ALL QUESTS</span>
                  </div>
                  <span className="font-pixel text-[8px] text-white/60">{totalProjects} AVAILABLE</span>
                </div>
                <div className="p-4 max-h-[600px] overflow-y-auto">
                  <AnimatePresence mode="popLayout">
                    {projects.map((project, i) => (
                      <motion.div
                        key={project.id}
                        onClick={() => setSelectedIndex(i)}
                        className={`cursor-pointer mb-3 p-3 border-2 transition-all ${
                          i === selectedIndex 
                            ? 'border-jrpg-navy bg-gray-50' 
                            : 'border-gray-200 hover:border-jrpg-navy/50'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${projectColors[i % projectColors.length].bg} flex items-center justify-center border-2 border-jrpg-navy`}>
                            <span className="font-pixel text-lg text-white">{project.name.charAt(0)}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-pixel text-[10px] text-jrpg-navy tracking-wider">{project.name}</h4>
                            <p className="font-pixel text-[7px] text-gray-500 truncate">{project.description}</p>
                          </div>
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: project.rank }).map((_, j) => (
                              <Star key={j} size={8} className="text-jrpg-gold fill-jrpg-gold" />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mission Wheel Selector */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <MissionWheel selectedIndex={selectedIndex} onSelect={setSelectedIndex} />
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
