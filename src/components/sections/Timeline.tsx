import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Calendar, Rocket, Layers, BookOpen, PlayCircle, Layout, Scroll, Cloud, Cpu, Filter, Target, Trophy, Shield } from "lucide-react";
import { timelineEvents } from "../../data/projects";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useLang } from "../../context/LangContext";

const iconMap: Record<string, React.ElementType> = {
  "rocket": Rocket,
  "layers": Layers,
  "book-open": BookOpen,
  "play-circle": PlayCircle,
  "layout": Layout,
  "scroll": Scroll,
  "cloud": Cloud,
  "cpu": Cpu,
};

const typeConfig: Record<string, { color: string; bg: string; label: string; icon: React.ElementType }> = {
  project: { color: "#ef4444", bg: "from-red-500 to-red-600", label: "PROJECT", icon: Target },
  skill: { color: "#06b6d4", bg: "from-cyan-500 to-cyan-600", label: "SKILL", icon: Shield },
  milestone: { color: "#eab308", bg: "from-yellow-500 to-yellow-600", label: "MILESTONE", icon: Trophy },
};

const filterTypes = [
  { id: "all", label: "ALL", icon: Filter },
  { id: "project", label: "PROJECTS", icon: Target },
  { id: "skill", label: "SKILLS", icon: Shield },
  { id: "milestone", label: "MILESTONES", icon: Trophy },
];

function TimelineEvent({ event, index, isLast }: { event: typeof timelineEvents[0]; index: number; isLast: boolean }) {
  const config = typeConfig[event.type] || typeConfig.milestone;
  const EventIcon = iconMap[event.icon] || Rocket;
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative mb-8"
    >
      <div className={`flex items-start gap-4 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
        {/* Content Card */}
        <div className={`flex-1 ${isLeft ? 'lg:text-right' : 'lg:text-left'}`}>
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-white border-4 border-jrpg-navy relative overflow-hidden inline-block w-full"
          >
            {/* Top Color Bar */}
            <div className={`h-2 bg-gradient-to-r ${config.bg}`} />
            
            {/* Header */}
            <div className="bg-jrpg-navy px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <EventIcon size={12} style={{ color: config.color }} />
                <span className="font-pixel text-[9px] tracking-wider" style={{ color: config.color }}>{config.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={10} className="text-white/60" />
                <span className="font-pixel text-[9px] text-white/60">{event.year}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${config.bg} flex items-center justify-center border-2 border-jrpg-navy flex-shrink-0`}>
                  <EventIcon size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-pixel text-[11px] text-jrpg-navy tracking-wider mb-2">{event.title}</h3>
                  <p className="font-pixel text-[9px] text-gray-600 leading-relaxed">{event.description}</p>
                </div>
              </div>
            </div>

            {/* Bottom Color Bar */}
            <div className={`h-1.5 bg-gradient-to-r ${config.bg}`} />
          </motion.div>
        </div>

        {/* Center Line & Dot */}
        <div className="hidden lg:flex flex-col items-center flex-shrink-0">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="w-6 h-6 border-4 border-jrpg-navy bg-white flex items-center justify-center z-10"
          >
            <div className="w-2 h-2" style={{ backgroundColor: config.color }} />
          </motion.div>
          {!isLast && (
            <div className="w-0.5 h-16 bg-gradient-to-b from-jrpg-navy/30 to-transparent" />
          )}
        </div>

        {/* Year Badge (opposite side) */}
        <div className={`hidden lg:block flex-1 ${isLeft ? 'text-left' : 'text-right'}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="inline-block"
          >
            <div className="bg-jrpg-navy px-3 py-1.5">
              <span className="font-pixel text-[10px] text-jrpg-gold">{event.year}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const { t } = useLang();
  const [activeFilter, setActiveFilter] = useState("all");

  const totalEvents = timelineEvents.length;
  const projects = timelineEvents.filter(e => e.type === "project").length;
  const skills = timelineEvents.filter(e => e.type === "skill").length;

  const filteredEvents = activeFilter === "all" 
    ? timelineEvents 
    : timelineEvents.filter(e => e.type === activeFilter);

  const years = [...new Set(timelineEvents.map(e => e.year))].sort();

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
                <p className="font-pixel text-xs text-jrpg-red tracking-widest mb-2">[ STORY ]</p>
                <h2 className="font-pixel text-3xl md:text-4xl text-jrpg-navy tracking-wider">
                  {t("timeline.title")}
                </h2>
                <p className="font-pixel text-[10px] text-gray-500 mt-2">JOURNEY LOG // CHARACTER HISTORY</p>
              </div>
              <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500" />
            </div>
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 border-2 border-jrpg-navy" />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 border-2 border-jrpg-navy" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-red-500 border-2 border-jrpg-navy" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-red-500 border-2 border-jrpg-navy" />
          </div>
        </motion.div>

        {/* Stats */}
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
                  <Star size={12} className="text-jrpg-red" />
                </div>
                <p className="font-pixel text-[7px] text-gray-500">TOTAL</p>
                <p className="font-pixel text-lg text-jrpg-red font-bold">{totalEvents}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Target size={12} className="text-jrpg-gold" />
                </div>
                <p className="font-pixel text-[7px] text-gray-500">PROJECTS</p>
                <p className="font-pixel text-lg text-jrpg-gold font-bold">{projects}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Shield size={12} className="text-jrpg-navy" />
                </div>
                <p className="font-pixel text-[7px] text-gray-500">SKILLS</p>
                <p className="font-pixel text-lg text-jrpg-navy font-bold">{skills}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Trophy size={12} className="text-jrpg-gold fill-jrpg-gold" />
                </div>
                <p className="font-pixel text-[7px] text-gray-500">YEARS</p>
                <p className="font-pixel text-lg text-jrpg-gold font-bold">{years.length}</p>
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

          {/* Filter Panel */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="sticky top-32"
            >
              <div className="bg-white border-4 border-jrpg-navy mb-5">
                <div className="bg-jrpg-navy px-4 py-2 flex items-center gap-2">
                  <Filter size={12} className="text-jrpg-gold" />
                  <span className="font-pixel text-[10px] text-jrpg-gold">FILTER</span>
                </div>
                <div className="p-3">
                  <div className="space-y-2">
                    {filterTypes.map((type) => {
                      const Icon = type.icon;
                      const isActive = activeFilter === type.id;
                      return (
                        <button
                          key={type.id}
                          onClick={() => setActiveFilter(type.id)}
                          className={`w-full p-2 border-2 font-pixel text-[9px] tracking-wider transition-all flex items-center gap-2 ${
                            isActive 
                              ? 'border-jrpg-navy bg-jrpg-navy text-white' 
                              : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-jrpg-navy/50'
                          }`}
                        >
                          <Icon size={14} />
                          <span>{type.label}</span>
                          <span className="ml-auto text-[8px] opacity-70">
                            {type.id === "all" ? totalEvents : timelineEvents.filter(e => e.type === type.id).length}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Year Navigator */}
              <div className="bg-white border-4 border-jrpg-navy">
                <div className="bg-gradient-to-r from-jrpg-gold to-yellow-500 px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-jrpg-navy" />
                    <span className="font-pixel text-[10px] text-jrpg-navy tracking-wider">YEARS</span>
                  </div>
                </div>
                <div className="p-3">
                  <div className="space-y-1.5">
                    {years.map((year) => (
                      <div key={year} className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-200">
                        <div className="w-2 h-2 bg-jrpg-gold" />
                        <span className="font-pixel text-[9px] text-gray-700">{year}</span>
                        <span className="ml-auto font-pixel text-[8px] text-gray-500">
                          {timelineEvents.filter(e => e.year === year).length} events
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event, i) => (
                <TimelineEvent 
                  key={event.title} 
                  event={event} 
                  index={i} 
                  isLast={i === filteredEvents.length - 1}
                />
              ))}
            </AnimatePresence>

            {filteredEvents.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="bg-white border-4 border-jrpg-navy inline-block px-8 py-6">
                  <Target size={32} className="text-gray-300 mx-auto mb-3" />
                  <p className="font-pixel text-[10px] text-gray-500">NO EVENTS FOUND</p>
                  <p className="font-pixel text-[8px] text-gray-400 mt-1">Try a different filter</p>
                </div>
              </motion.div>
            )}

            {/* Timeline End */}
            {filteredEvents.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-block">
                  <div className="bg-jrpg-navy px-4 py-2">
                    <span className="font-pixel text-[9px] text-jrpg-gold">TO BE CONTINUED...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
}
