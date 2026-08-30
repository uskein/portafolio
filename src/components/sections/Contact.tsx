import { motion } from "framer-motion";
import { Mail, MapPin, Clock, ExternalLink, Wifi, GitBranch, Star, Shield, Target, Zap, Heart, Swords, Wind } from "lucide-react";
import { socialLinks } from "../../data/projects";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useLang } from "../../context/LangContext";

function PlayerProfile() {
  const stats = [
    { label: "HP", value: 100, icon: Heart, color: "#ef4444" },
    { label: "ATK", value: 85, icon: Swords, color: "#f97316" },
    { label: "DEF", value: 75, icon: Shield, color: "#eab308" },
    { label: "SPD", value: 90, icon: Wind, color: "#22c55e" },
    { label: "INT", value: 95, icon: Zap, color: "#06b6d4" },
  ];

  const abilities = [
    { name: "Backend Mastery", level: 9, color: "#ef4444" },
    { name: "Frontend Wizardry", level: 8, color: "#06b6d4" },
    { name: "DevOps Skills", level: 7, color: "#eab308" },
    { name: "Database Power", level: 8, color: "#8b5cf6" },
  ];

  const badges = [
    { name: "First Quest", icon: Target, color: "#ef4444" },
    { name: "Code Warrior", icon: Swords, color: "#f97316" },
    { name: "Bug Hunter", icon: Zap, color: "#eab308" },
    { name: "Team Leader", icon: Shield, color: "#06b6d4" },
  ];

  return (
    <div className="bg-white border-4 border-jrpg-navy relative overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-jrpg-gold to-yellow-500 px-5 py-3">
        <div className="flex items-center gap-2">
          <Star size={14} className="text-jrpg-navy" />
          <span className="font-pixel text-[10px] text-jrpg-navy tracking-wider">PLAYER PROFILE</span>
        </div>
      </div>

      <div className="p-5">
        {/* Character Card */}
        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-200">
          <div className="relative">
            <div className="w-28 h-28 bg-gradient-to-br from-jrpg-blue to-jrpg-navy flex items-center justify-center border-4 border-jrpg-navy">
              <span className="font-pixel text-4xl text-jrpg-gold">U</span>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-jrpg-red px-2 py-0.5 border-2 border-jrpg-navy">
              <span className="font-pixel text-[8px] text-white">LVL 8</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-pixel text-xl text-jrpg-navy tracking-wider mb-1">USKEIN</h3>
            <p className="font-pixel text-[10px] text-gray-500 mb-2">Full-Stack Developer</p>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[9px] text-gray-500">CLASS:</span>
              <span className="font-pixel text-[10px] text-jrpg-red font-bold">CODE MAGE</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-pixel text-[9px] text-gray-500">GUILD:</span>
              <span className="font-pixel text-[10px] text-jrpg-navy font-bold">USKEIN DEV</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-5">
          <p className="font-pixel text-[8px] text-gray-500 tracking-wider mb-3">BASE STATS</p>
          <div className="space-y-2.5">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-16 flex items-center gap-1.5">
                    <Icon size={10} style={{ color: stat.color }} />
                    <span className="font-pixel text-[8px] text-gray-600">{stat.label}</span>
                  </div>
                  <div className="flex-1 h-4 bg-gray-200 border border-gray-300 overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: stat.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stat.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                  <span className="font-pixel text-[9px] text-gray-700 w-8 text-right">{stat.value}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Abilities */}
        <div className="mb-5">
          <p className="font-pixel text-[8px] text-gray-500 tracking-wider mb-3">KNOWN ABILITIES</p>
          <div className="grid grid-cols-2 gap-2">
            {abilities.map((ability) => (
              <div key={ability.name} className="p-2 bg-gray-50 border border-gray-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-pixel text-[8px] text-gray-700">{ability.name}</span>
                  <span className="font-pixel text-[8px] font-bold" style={{ color: ability.color }}>LV.{ability.level}</span>
                </div>
                <div className="h-2 bg-gray-200 border border-gray-300 overflow-hidden">
                  <div className="h-full" style={{ backgroundColor: ability.color, width: `${ability.level * 10}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div>
          <p className="font-pixel text-[8px] text-gray-500 tracking-wider mb-3">EARNED BADGES</p>
          <div className="grid grid-cols-4 gap-2">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.name} className="text-center p-2 bg-gray-50 border border-gray-200">
                  <div 
                    className="w-10 h-10 rounded-full mx-auto mb-1 flex items-center justify-center border-2"
                    style={{ borderColor: badge.color, backgroundColor: `${badge.color}20` }}
                  >
                    <Icon size={16} style={{ color: badge.color }} />
                  </div>
                  <span className="font-pixel text-[7px] text-gray-600">{badge.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactInfo() {
  const contactMethods = [
    { icon: Mail, label: "EMAIL", value: socialLinks.email, href: `mailto:${socialLinks.email}` },
    { icon: GitBranch, label: "GITHUB", value: "github.com/uskein", href: socialLinks.github },
    { icon: MapPin, label: "LOCATION", value: "Colombia", href: null },
    { icon: Clock, label: "TIMEZONE", value: "UTC-5 (COT)", href: null },
  ];

  return (
    <div className="relative">
      {/* Pokedex Body */}
      <div className="bg-gradient-to-b from-red-500 via-red-600 to-red-700 border-4 border-jrpg-navy rounded-3xl p-5 shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
        
        {/* Top Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-4 border-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),0_2px_4px_rgba(0,0,0,0.3)]" />
            <div className="flex gap-2">
              <div className="w-4 h-4 rounded-full bg-jrpg-red border-2 border-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)]" />
              <div className="w-4 h-4 rounded-full bg-jrpg-gold border-2 border-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)]" />
              <div className="w-4 h-4 rounded-full bg-jrpg-green border-2 border-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)]" />
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-b from-gray-300 to-gray-400 border-2 border-gray-500 shadow-[inset_0_2px_4px_rgba(255,255,255,0.5)]" />
        </div>

        {/* Screen */}
        <div className="bg-gradient-to-b from-gray-100 to-gray-200 border-4 border-jrpg-navy rounded-xl p-5 mb-4 shadow-[inset_0_2px_8px_rgba(0,0,0,0.2)]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-gray-300">
            <div className="flex items-center gap-2">
              <Wifi size={14} className="text-jrpg-navy" />
              <span className="font-pixel text-[11px] text-jrpg-navy tracking-wider">POKéGEAR</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-jrpg-green animate-pulse" />
              <span className="font-pixel text-[9px] text-jrpg-green">ONLINE</span>
            </div>
          </div>

          <div className="flex items-center gap-5 mb-5 pb-5 border-b border-gray-300">
            <div className="w-28 h-28 bg-gradient-to-br from-jrpg-blue to-jrpg-navy flex items-center justify-center border-4 border-jrpg-navy shadow-[0_4px_8px_rgba(0,0,0,0.2)]">
              <span className="font-pixel text-4xl text-jrpg-gold">U</span>
            </div>
            <div>
              <h3 className="font-pixel text-xl text-jrpg-navy tracking-wider mb-1">USKEIN</h3>
              <p className="font-pixel text-[10px] text-gray-600 mb-2">Full-Stack Developer</p>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-jrpg-green" />
                <span className="font-pixel text-[9px] text-jrpg-green font-bold">Available for work</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-pixel text-[8px] text-gray-500">TRAINER ID:</span>
                <span className="font-pixel text-[9px] text-jrpg-navy font-bold">USK-001</span>
              </div>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="space-y-3">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div key={method.label}>
                  {method.href ? (
                    <a 
                      href={method.href} 
                      target={method.href.startsWith("http") ? "_blank" : undefined}
                      rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 p-3.5 bg-white border-2 border-gray-300 hover:border-jrpg-navy transition-colors group"
                    >
                      <div className="w-12 h-12 bg-jrpg-navy/10 border-2 border-jrpg-navy/20 flex items-center justify-center group-hover:bg-jrpg-navy/20 transition-colors">
                        <Icon size={18} className="text-jrpg-navy" />
                      </div>
                      <div className="flex-1">
                        <p className="font-pixel text-[8px] text-gray-500 tracking-wider">{method.label}</p>
                        <p className="font-pixel text-[10px] text-jrpg-navy font-bold">{method.value}</p>
                      </div>
                      <ExternalLink size={14} className="text-gray-400 group-hover:text-jrpg-navy transition-colors" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 p-3.5 bg-white border-2 border-gray-300">
                      <div className="w-12 h-12 bg-jrpg-navy/10 border-2 border-jrpg-navy/20 flex items-center justify-center">
                        <Icon size={18} className="text-jrpg-navy" />
                      </div>
                      <div className="flex-1">
                        <p className="font-pixel text-[8px] text-gray-500 tracking-wider">{method.label}</p>
                        <p className="font-pixel text-[10px] text-jrpg-navy font-bold">{method.value}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className="w-18 h-18 rounded-full bg-gradient-to-b from-gray-700 to-gray-800 border-4 border-gray-600 flex items-center justify-center shadow-[0_4px_8px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.1)]">
              <div className="grid grid-cols-3 grid-rows-3 gap-0.5">
                <div />
                <div className="w-3.5 h-3.5 bg-gray-600" />
                <div />
                <div className="w-3.5 h-3.5 bg-gray-600" />
                <div className="w-3.5 h-3.5 bg-gray-500 rounded-full" />
                <div className="w-3.5 h-3.5 bg-gray-600" />
                <div />
                <div className="w-3.5 h-3.5 bg-gray-600" />
                <div />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <a 
              href={socialLinks.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 rounded-full bg-gradient-to-b from-gray-700 to-gray-800 border-4 border-gray-600 flex items-center justify-center shadow-[0_4px_8px_rgba(0,0,0,0.3)] hover:from-gray-600 hover:to-gray-700 transition-all"
            >
              <GitBranch size={20} className="text-gray-300" />
            </a>
            <a 
              href={`mailto:${socialLinks.email}`}
              className="w-16 h-16 rounded-full bg-gradient-to-b from-gray-700 to-gray-800 border-4 border-gray-600 flex items-center justify-center shadow-[0_4px_8px_rgba(0,0,0,0.3)] hover:from-gray-600 hover:to-gray-700 transition-all"
            >
              <Mail size={20} className="text-gray-300" />
            </a>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="inline-block px-4 py-1.5 bg-black/20 rounded-full">
            <span className="font-pixel text-[8px] text-white/80 tracking-widest">POKéGEAR v1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const { t } = useLang();

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
                <p className="font-pixel text-xs text-jrpg-red tracking-widest mb-2">[ HUB ]</p>
                <h2 className="font-pixel text-3xl md:text-4xl text-jrpg-navy tracking-wider">
                  {t("contact.title")}
                </h2>
                <p className="font-pixel text-[10px] text-gray-500 mt-2">POKEGEAR // COMMUNICATION CENTER</p>
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
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Mail size={12} className="text-jrpg-red" />
                </div>
                <p className="font-pixel text-[7px] text-gray-500">RESPONSE</p>
                <p className="font-pixel text-sm text-jrpg-red font-bold">24H</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock size={12} className="text-jrpg-gold" />
                </div>
                <p className="font-pixel text-[7px] text-gray-500">TIMEZONE</p>
                <p className="font-pixel text-sm text-jrpg-gold font-bold">UTC-5</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <MapPin size={12} className="text-jrpg-navy" />
                </div>
                <p className="font-pixel text-[7px] text-gray-500">LOCATION</p>
                <p className="font-pixel text-sm text-jrpg-navy font-bold">CO</p>
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

          {/* Contact Info - Pokedex */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ContactInfo />
            </motion.div>
          </div>

          {/* Player Profile */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PlayerProfile />
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
