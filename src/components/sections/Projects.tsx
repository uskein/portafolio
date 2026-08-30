import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { projects } from "../../data/projects";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useLang } from "../../context/LangContext";

const variants = ["jrpg-box", "jrpg-box-red", "jrpg-box-gold", "jrpg-box-cyan", "jrpg-box-purple"];

export default function Projects() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const { t } = useLang();

  return (
    <section className="min-h-screen pt-36 pb-28 pl-24 pr-12 relative bg-bg pixel-grid-bg">
      {/* Title */}
      <div ref={titleRef} className="text-center mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={titleVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }}>
          <div className="jrpg-box inline-block px-10 py-5">
            <p className="font-pixel text-[9px] text-jrpg-red tracking-widest mb-3">{t("projects.tag")}</p>
            <h2 className="font-pixel text-2xl md:text-3xl text-jrpg-navy tracking-wider">{t("projects.title")}</h2>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex justify-center mt-4">
          <div className="jrpg-box p-3 flex items-center gap-3">
            <Star className="text-jrpg-gold" size={14} />
            <p className="font-pixel text-[9px] text-text-muted tracking-widest">
              {t("projects.quests")} <span className="text-jrpg-navy">{projects.length}</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Project cards - centered with max-width */}
      <div className="max-w-4xl mx-auto">
        <div className="hidden lg:grid grid-cols-2 gap-8 mb-8">
          {projects.slice(0, 2).map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className={`${variants[i]} p-6`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center border-2 border-jrpg-navy bg-surface text-jrpg-navy text-lg font-pixel">
                    {project.tech[0]?.icon?.charAt(0).toUpperCase() || "?"}
                  </div>
                  <div>
                    <h3 className="font-pixel text-[11px] text-jrpg-navy tracking-wider">{project.name}</h3>
                    <p className="font-pixel text-[8px] text-text-muted tracking-widest">{project.repo}</p>
                  </div>
                </div>
                <p className="font-body text-sm text-text mb-4 leading-relaxed">{project.description}</p>
                <div className="flex gap-2">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <button className="btn-primary w-full flex items-center justify-center gap-2">
                      <ExternalLink size={14} /> <span>{t("projects.code")}</span>
                    </button>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {projects.slice(2).map((project, i) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <div className={`${variants[2 + i]} p-6 mb-8`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center border-2 border-jrpg-navy bg-surface text-jrpg-navy text-lg font-pixel">
                      {project.tech[0]?.icon?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div>
                      <h3 className="font-pixel text-[11px] text-jrpg-navy tracking-wider">{project.name}</h3>
                      <p className="font-pixel text-[8px] text-text-muted tracking-widest">{project.repo}</p>
                    </div>
                  </div>
                  <p className="font-body text-sm text-text mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex gap-2">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <button className="btn-primary w-full flex items-center justify-center gap-2">
                        <ExternalLink size={14} /> <span>{t("projects.code")}</span>
                      </button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
