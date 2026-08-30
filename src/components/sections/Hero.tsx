import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GlitchText from "../ui/GlitchText";
import PersonaButton from "../ui/PersonaButton";
import LandscapeBackground from "../effects/LandscapeBackground";
import BattleBackground from "../effects/BattleBackground";
import { useTypewriter } from "../../hooks/useTypewriter";
import { useLang } from "../../context/LangContext";

export default function Hero() {
  const navigate = useNavigate();
  const { t } = useLang();
  const { displayText, isComplete } = useTypewriter(t("hero.typewriter"), 40, 2000);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg pixel-grid-bg">
      <LandscapeBackground variant="night" />
      <BattleBackground />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-6 py-16">
          {/* Title box - larger with more padding */}
          <motion.div
            className="jrpg-box p-8 md:p-10 lg:p-12 text-center w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="font-pixel text-[10px] text-text-muted tracking-widest block mb-4">
              {t("hero.system")}
            </span>
            <GlitchText as="h1" className="font-pixel text-4xl md:text-5xl lg:text-6xl text-jrpg-navy tracking-wider">
              {t("hero.title")}
            </GlitchText>
            <div className="flex items-center gap-3 mt-4 justify-center">
              <div className="h-1 w-16 bg-jrpg-red" />
              <div className="w-3 h-3 bg-jrpg-gold rotate-45" />
              <div className="h-1 w-16 bg-jrpg-red" />
            </div>
          </motion.div>

          {/* Typewriter box */}
          <motion.div
            className="jrpg-box-gold p-5 w-full text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="font-body text-xl md:text-2xl text-jrpg-navy tracking-wider">
              {displayText}
              <span className={`inline-block w-3 h-5 bg-jrpg-red ml-1 align-middle ${isComplete ? "animate-blink" : ""}`} />
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="jrpg-box p-5 md:p-6 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="grid grid-cols-4 gap-3 md:gap-4">
              {[
                { labelKey: "stat.str", value: "95", color: "text-jrpg-red" },
                { labelKey: "stat.int", value: "90", color: "text-jrpg-cyan" },
                { labelKey: "stat.dex", value: "88", color: "text-jrpg-green" },
                { labelKey: "stat.lck", value: "92", color: "text-jrpg-gold" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.labelKey}
                  className="text-center border-2 border-jrpg-navy/20 p-2 md:p-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  <p className="font-pixel text-[7px] md:text-[8px] text-text-muted tracking-widest mb-1">{t(stat.labelKey)}</p>
                  <p className={`font-pixel text-lg md:text-xl lg:text-2xl ${stat.color}`}>{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Buttons - larger */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <PersonaButton variant="primary" size="lg" onClick={() => navigate("/projects")}>
              {t("hero.cta1")}
            </PersonaButton>
            <PersonaButton variant="secondary" size="lg" onClick={() => navigate("/skills")}>
              {t("hero.cta2")}
            </PersonaButton>
          </motion.div>

          <motion.p
            className="font-pixel text-[9px] text-text-muted tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            ▶ {t("footer.select")}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
