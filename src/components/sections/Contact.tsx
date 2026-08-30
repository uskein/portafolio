import { useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Mail, Gamepad2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { socialLinks } from "../../data/projects";
import { useLang } from "../../context/LangContext";

function DPadButton({ direction, className = "" }: { direction: "up" | "down" | "left" | "right"; className?: string }) {
  const icons = { up: ChevronUp, down: ChevronDown, left: ChevronLeft, right: ChevronRight };
  const Icon = icons[direction];
  return (
    <button type="button" className={`w-7 h-7 bg-gray-700 border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-gray-600 active:bg-gray-500 transition-colors ${className}`}>
      <Icon size={12} />
    </button>
  );
}

function ScreenBezel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300 p-3 md:p-4 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.5)] ${className}`}>
      <div className="bg-[#1a2332] rounded-lg overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]">
        {children}
      </div>
    </div>
  );
}

function ScreenScanlines() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 opacity-10">
      <div className="w-full h-full" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)",
        backgroundSize: "100% 2px"
      }} />
    </div>
  );
}

function ScreenGlow() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(74,222,128,0.05)_0%,transparent_70%)]" />
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const { t } = useLang();
  const [lines, setLines] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLines([
      `> FROM: ${formData.name} <${formData.email}>`,
      `> MSG: ${formData.message}`,
      `> ${t("contact.complete")}`,
      "> Channel closing...",
    ]);
    setSent(true);
  };

  return (
    <section className="min-h-screen pt-36 pb-28 pl-20 pr-6 md:pl-24 md:pr-12 relative bg-bg pixel-grid-bg">
      {/* Title */}
      <div className="text-center mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <div className="jrpg-box inline-block px-10 py-5">
            <p className="font-pixel text-[9px] text-jrpg-red tracking-widest mb-3">{t("contact.tag")}</p>
            <h2 className="font-pixel text-2xl md:text-3xl text-jrpg-navy tracking-wider">{t("contact.title")}</h2>
          </div>
        </motion.div>
      </div>

      {/* GBA/NDS Console */}
      <div className="max-w-5xl mx-auto">
        {/* Console body */}
        <div className="bg-gradient-to-b from-gray-200 via-gray-100 to-gray-200 rounded-3xl p-4 md:p-6 shadow-[0_8px_24px_rgba(0,0,0,0.3),inset_0_2px_0_rgba(255,255,255,0.6)] border border-gray-300">
          {/* Console top label */}
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <Gamepad2 size={16} className="text-gray-500" />
              <span className="font-pixel text-[8px] text-gray-500 tracking-widest">PORTFOLIO -DS-</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-jrpg-green shadow-[0_0_4px_rgba(74,222,128,0.5)]" />
              <span className="font-pixel text-[7px] text-gray-500">PWR</span>
            </div>
          </div>

          {/* Dual screens (NDS style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Top screen - Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <ScreenBezel>
                <div className="relative min-h-[280px] md:min-h-[320px]">
                  <ScreenScanlines />
                  <ScreenGlow />
                  {/* Screen content */}
                  <div className="relative z-0 p-5">
                    {/* Screen header */}
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-green-500/30">
                      <span className="font-pixel text-[8px] text-green-400 tracking-widest">{t("contact.terminal")}</span>
                      <span className="font-pixel text-[7px] text-green-400/60">CH:01</span>
                    </div>

                    {/* Terminal text */}
                    <div className="space-y-1.5 min-h-[200px]">
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-body text-sm text-green-400">{t("contact.initialized")}</motion.p>
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="font-body text-sm text-green-400">{t("contact.secure")}</motion.p>
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="font-body text-sm text-green-300/60">{t("contact.awaiting")}</motion.p>
                      {lines.map((line, i) => (
                        <motion.p
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className={`font-body text-sm ${line.includes(t("contact.complete")) ? "text-amber-400" : line.startsWith("> MSG") ? "text-green-300" : "text-green-400/70"}`}
                        >
                          {line}
                        </motion.p>
                      ))}
                      {!sent && <span className="inline-block w-2.5 h-4 bg-green-400 animate-blink" />}
                    </div>

                    {/* Social links */}
                    <div className="mt-4 pt-3 border-t border-green-500/30">
                      <p className="font-pixel text-[7px] text-green-400/60 tracking-widest mb-2">{t("contact.channels")}</p>
                      <div className="flex gap-4">
                        <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-pixel text-[8px] text-green-400 hover:text-green-300 transition-colors">
                          <GitBranch size={10} />{t("contact.github")}
                        </a>
                        <a href={`mailto:${socialLinks.email}`} className="flex items-center gap-1.5 font-pixel text-[8px] text-green-400 hover:text-green-300 transition-colors">
                          <Mail size={10} />{t("contact.email")}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </ScreenBezel>
            </motion.div>

            {/* Bottom screen - Form (NDS touch screen) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <ScreenBezel>
                <div className="relative min-h-[280px] md:min-h-[320px]">
                  <ScreenScanlines />
                  <ScreenGlow />
                  {/* Screen content */}
                  <div className="relative z-0 p-5">
                    {/* Screen header */}
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-green-500/30">
                      <span className="font-pixel text-[8px] text-green-400 tracking-widest">{t("contact.transmission")}</span>
                      <span className="font-pixel text-[7px] text-green-400/60">TOUCH</span>
                    </div>

                    {!sent ? (
                      <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                          <label className="block font-pixel text-[7px] text-green-400/60 tracking-widest mb-1">{t("contact.identity")}</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 font-body text-sm bg-[#0a1a12] border border-green-500/30 text-green-400 focus:border-green-400 focus:outline-none transition-colors placeholder:text-green-400/20"
                            placeholder="Enter name..."
                          />
                        </div>
                        <div>
                          <label className="block font-pixel text-[7px] text-green-400/60 tracking-widest mb-1">{t("contact.frequency")}</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 py-2 font-body text-sm bg-[#0a1a12] border border-green-500/30 text-green-400 focus:border-green-400 focus:outline-none transition-colors placeholder:text-green-400/20"
                            placeholder="Enter email..."
                          />
                        </div>
                        <div>
                          <label className="block font-pixel text-[7px] text-green-400/60 tracking-widest mb-1">{t("contact.message")}</label>
                          <textarea
                            required
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-3 py-2 font-body text-sm bg-[#0a1a12] border border-green-500/30 text-green-400 focus:border-green-400 focus:outline-none transition-colors resize-none placeholder:text-green-400/20"
                            placeholder="Enter message..."
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-2.5 font-pixel text-[9px] tracking-widest bg-green-500/20 border border-green-500/50 text-green-400 hover:bg-green-500/30 hover:border-green-400 active:bg-green-500/40 transition-all"
                        >
                          ▶ {t("contact.send")}
                        </button>
                      </form>
                    ) : (
                      <div className="flex flex-col items-center justify-center min-h-[240px]">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="font-pixel text-3xl text-green-400 mb-3"
                        >
                          ✓
                        </motion.div>
                        <h3 className="font-pixel text-[10px] text-green-400 tracking-wider mb-2 text-center">{t("contact.complete")}</h3>
                        <p className="font-body text-sm text-green-300/60 text-center">{t("contact.completeMsg")}</p>
                      </div>
                    )}
                  </div>
                </div>
              </ScreenBezel>
            </motion.div>
          </div>

          {/* Console bottom - D-Pad and buttons */}
          <div className="flex items-center justify-between mt-4 px-2">
            {/* D-Pad */}
            <div className="flex flex-col items-center gap-0">
              <DPadButton direction="up" />
              <div className="flex gap-0">
                <DPadButton direction="left" />
                <div className="w-7 h-7 bg-gray-600" />
                <DPadButton direction="right" />
              </div>
              <DPadButton direction="down" />
            </div>

            {/* A/B buttons */}
            <div className="flex gap-3">
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center text-gray-400 font-pixel text-[9px] shadow-[0_2px_4px_rgba(0,0,0,0.3)]">B</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center text-gray-400 font-pixel text-[9px] shadow-[0_2px_4px_rgba(0,0,0,0.3)]">A</div>
              </div>
            </div>

            {/* Start/Select */}
            <div className="flex gap-2">
              <div className="px-3 py-1 bg-gray-600 rounded-full font-pixel text-[6px] text-gray-400 tracking-wider">SELECT</div>
              <div className="px-3 py-1 bg-gray-600 rounded-full font-pixel text-[6px] text-gray-400 tracking-wider">START</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
