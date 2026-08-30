import { motion } from "framer-motion";
import StatsBar from "../ui/StatsBar";
import { skillStats } from "../../data/projects";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useLang } from "../../context/LangContext";

const categories = [
  { key: "backend" as const, labelKey: "skills.backend", color: "#e94560", boxClass: "jrpg-box-red" },
  { key: "frontend" as const, labelKey: "skills.frontend", color: "#00d2d3", boxClass: "jrpg-box-cyan" },
  { key: "devops" as const, labelKey: "skills.devops", color: "#0f3460", boxClass: "jrpg-box" },
  { key: "data" as const, labelKey: "skills.data", color: "#a855f7", boxClass: "jrpg-box-purple" },
  { key: "tools" as const, labelKey: "skills.tools", color: "#f5c542", boxClass: "jrpg-box-gold" },
];

function SkillCard({ cat, skills, delay }: { cat: typeof categories[0]; skills: typeof skillStats; delay: number }) {
  const { t } = useLang();
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay }}>
      <div className={`${cat.boxClass} p-5 h-full`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 border-2" style={{ borderColor: cat.color, backgroundColor: cat.color }} />
          <h3 className="font-pixel text-[10px] tracking-wider font-bold" style={{ color: cat.color }}>{t(cat.labelKey)}</h3>
          <div className="flex-1 h-0.5 bg-border" />
          <span className="font-pixel text-[8px] text-text-muted">{skills.length}</span>
        </div>
        {skills.map((skill, i) => (
          <StatsBar key={skill.name} name={skill.name} level={skill.level} maxLevel={skill.maxLevel} delay={delay + i * 0.1} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const { t } = useLang();

  const totalLevel = skillStats.reduce((acc, s) => acc + s.level, 0);
  const totalMax = skillStats.reduce((acc, s) => acc + s.maxLevel, 0);

  return (
    <section className="min-h-screen pt-36 pb-28 pl-24 pr-12 relative bg-bg pixel-grid-bg">
      {/* Title */}
      <div ref={titleRef} className="text-center mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={titleVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }}>
          <div className="jrpg-box inline-block px-10 py-5">
            <p className="font-pixel text-[9px] text-jrpg-red tracking-widest mb-3">{t("skills.tag")}</p>
            <h2 className="font-pixel text-2xl md:text-3xl text-jrpg-navy tracking-wider">{t("skills.title")}</h2>
          </div>
        </motion.div>
      </div>

      {/* Stats summary - centered */}
      <motion.div
        className="flex justify-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="jrpg-box p-5 flex flex-col sm:flex-row items-center gap-6">
          <div className="text-center">
            <p className="font-pixel text-[9px] text-jrpg-gold tracking-widest mb-1">{t("skills.analyzing")}</p>
            <p className="font-body text-xl text-jrpg-navy">
              {t("skills.total")}: {totalLevel} {t("skills.pts")}
            </p>
            <div className="mt-2 h-3 w-40 border-2 border-jrpg-navy bg-surface overflow-hidden mx-auto">
              <motion.div
                className="h-full bg-jrpg-gold"
                initial={{ width: 0 }}
                whileInView={{ width: `${(totalLevel / totalMax) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3 }}
              />
            </div>
          </div>
          <div className="h-12 w-px bg-jrpg-navy/20 hidden sm:block" />
          <div className="text-center">
            <p className="font-pixel text-[8px] text-text-muted tracking-widest">{t("skills.power")}</p>
            <p className="font-pixel text-2xl text-jrpg-red">{totalLevel} / {totalMax}</p>
          </div>
        </div>
      </motion.div>

      {/* Skill cards - centered with max-width */}
      <div className="max-w-4xl mx-auto">
        <div className="hidden lg:block">
          {/* Row 1: Backend + Frontend */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <SkillCard cat={categories[0]} skills={skillStats.filter((s) => s.category === "backend")} delay={0.1} />
            <SkillCard cat={categories[1]} skills={skillStats.filter((s) => s.category === "frontend")} delay={0.2} />
          </div>
          {/* Row 2: DevOps + Data */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <SkillCard cat={categories[2]} skills={skillStats.filter((s) => s.category === "devops")} delay={0.3} />
            <SkillCard cat={categories[3]} skills={skillStats.filter((s) => s.category === "data")} delay={0.4} />
          </div>
          {/* Row 3: Tools centered */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <SkillCard cat={categories[4]} skills={skillStats.filter((s) => s.category === "tools")} delay={0.5} />
            </div>
          </div>
        </div>

        <div className="lg:hidden space-y-8">
          {categories.map((cat) => {
            const skills = skillStats.filter((s) => s.category === cat.key);
            if (skills.length === 0) return null;
            return <SkillCard key={cat.key} cat={cat} skills={skills} delay={0.1} />;
          })}
        </div>
      </div>
    </section>
  );
}
