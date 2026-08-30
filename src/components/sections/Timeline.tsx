import { motion } from "framer-motion";
import { Star, Calendar } from "lucide-react";
import { timelineEvents } from "../../data/projects";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useLang } from "../../context/LangContext";

const lineVariants = ["jrpg-box", "jrpg-box-red", "jrpg-box-gold", "jrpg-box-cyan", "jrpg-box-purple"];

export default function Timeline() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const { t } = useLang();

  return (
    <section className="min-h-screen pt-36 pb-28 pl-24 pr-12 relative bg-bg pixel-grid-bg">
      {/* Title */}
      <div ref={titleRef} className="text-center mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={titleVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }}>
          <div className="jrpg-box inline-block px-10 py-5">
            <p className="font-pixel text-[9px] text-jrpg-red tracking-widest mb-3">{t("timeline.tag")}</p>
            <h2 className="font-pixel text-2xl md:text-3xl text-jrpg-navy tracking-wider">{t("timeline.title")}</h2>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex justify-center mt-4">
          <div className="jrpg-box p-3 flex items-center gap-3">
            <Star className="text-jrpg-gold" size={14} />
            <p className="font-pixel text-[9px] text-text-muted tracking-widest">
              {t("timeline.milestones")} <span className="text-jrpg-navy">{timelineEvents.length}</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Timeline - centered with max-width */}
      <div className="max-w-3xl mx-auto relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-jrpg-navy/20 hidden lg:block" />

        {timelineEvents.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={`relative mb-10 flex flex-col lg:flex-row items-center ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
          >
            {/* Content */}
            <div className={`w-full lg:w-1/2 ${i % 2 === 0 ? "lg:pr-10 lg:text-right" : "lg:pl-10 lg:text-left"} mb-4 lg:mb-0`}>
              <div className={`${lineVariants[i]} p-5`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-pixel text-[9px] text-jrpg-gold tracking-widest flex items-center gap-2">
                    <Calendar size={12} />
                    {item.year}
                  </span>
                </div>
                <h3 className="font-pixel text-[11px] text-jrpg-navy tracking-wider mb-2">{item.title}</h3>
                <p className="font-body text-sm text-text leading-relaxed">{item.description}</p>
              </div>
            </div>

            {/* Center dot */}
            <div className="hidden lg:flex w-5 h-5 bg-surface border-2 border-jrpg-navy absolute left-1/2 transform -translate-x-1/2 z-10" />

            {/* Empty space */}
            <div className="w-full lg:w-1/2 hidden lg:block" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
