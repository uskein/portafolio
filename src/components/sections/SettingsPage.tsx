import { useState } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, Monitor, Moon, Sun, Volume2 } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function SettingsPage() {
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("en");
  const [sound, setSound] = useState(true);
  const [animations, setAnimations] = useState(true);
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();

  return (
    <section className="min-h-screen pt-28 pb-24 pl-44 pr-8 relative bg-bg pixel-grid-bg overflow-x-hidden">
      <div ref={titleRef} className="text-center mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={titleVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }}>
          <div className="inline-block relative">
            <div className="bg-white border-4 border-jrpg-navy relative">
              <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500" />
              <div className="px-12 py-6">
                <p className="font-pixel text-xs text-jrpg-red tracking-widest mb-2">[ SETTINGS ]</p>
                <h2 className="font-pixel text-3xl md:text-4xl text-jrpg-navy tracking-wider">OPTIONS MENU</h2>
                <p className="font-pixel text-[10px] text-gray-500 mt-2">CONFIGURATION // PREFERENCES</p>
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

      <div className="max-w-3xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="hidden lg:block lg:col-span-1" />
          <div className="lg:col-span-11">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border-4 border-jrpg-navy"
        >
          <div className="bg-jrpg-navy px-5 py-3 flex items-center gap-2">
            <SettingsIcon size={14} className="text-jrpg-gold" />
            <span className="font-pixel text-[10px] text-jrpg-gold">GAME OPTIONS</span>
          </div>
          <div className="p-6 space-y-6">
            {/* Theme */}
            <div>
              <label className="font-pixel text-[10px] text-gray-700 tracking-wider mb-3 block">THEME</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "light", label: "LIGHT", icon: Sun, color: "#eab308" },
                  { id: "dark", label: "DARK", icon: Moon, color: "#1e3a5f" },
                  { id: "system", label: "SYSTEM", icon: Monitor, color: "#6b7280" },
                ].map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`p-3 border-4 transition-all ${
                        theme === t.id ? 'border-jrpg-navy bg-gray-50' : 'border-gray-200 hover:border-jrpg-navy/50'
                      }`}
                    >
                      <Icon size={20} style={{ color: t.color }} className="mx-auto mb-1" />
                      <span className="font-pixel text-[8px] text-gray-700 block">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="font-pixel text-[10px] text-gray-700 tracking-wider mb-3 block">LANGUAGE</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "en", label: "ENGLISH", flag: "🇺🇸" },
                  { id: "es", label: "ESPAÑOL", flag: "🇪🇸" },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLanguage(l.id)}
                    className={`p-3 border-4 flex items-center gap-2 transition-all ${
                      language === l.id ? 'border-jrpg-navy bg-gray-50' : 'border-gray-200 hover:border-jrpg-navy/50'
                    }`}
                  >
                    <span className="text-xl">{l.flag}</span>
                    <span className="font-pixel text-[9px] text-gray-700">{l.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sound */}
            <div className="flex items-center justify-between p-4 bg-gray-50 border-2 border-gray-200">
              <div className="flex items-center gap-3">
                <Volume2 size={18} className="text-jrpg-navy" />
                <div>
                  <p className="font-pixel text-[10px] text-gray-700">SOUND EFFECTS</p>
                  <p className="font-pixel text-[8px] text-gray-500">Enable 8-bit sounds</p>
                </div>
              </div>
              <button
                onClick={() => setSound(!sound)}
                className={`w-12 h-6 rounded-full transition-all ${sound ? 'bg-jrpg-green' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white border-2 border-gray-400 transition-all ${sound ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>

            {/* Animations */}
            <div className="flex items-center justify-between p-4 bg-gray-50 border-2 border-gray-200">
              <div className="flex items-center gap-3">
                <Monitor size={18} className="text-jrpg-navy" />
                <div>
                  <p className="font-pixel text-[10px] text-gray-700">ANIMATIONS</p>
                  <p className="font-pixel text-[8px] text-gray-500">Enable motion effects</p>
                </div>
              </div>
              <button
                onClick={() => setAnimations(!animations)}
                className={`w-12 h-6 rounded-full transition-all ${animations ? 'bg-jrpg-green' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white border-2 border-gray-400 transition-all ${animations ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>
        </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
