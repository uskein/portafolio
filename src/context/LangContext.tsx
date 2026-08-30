import { createContext, useContext, useState, type ReactNode } from "react";

type Lang = "en" | "es";

interface LangContextType {
  lang: Lang;
  toggle: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Nav
    "nav.home": "HOME",
    "nav.skills": "SKILLS",
    "nav.projects": "PROJECTS",
    "nav.timeline": "TIMELINE",
    "nav.contact": "CONTACT",
    // Hero
    "hero.subtitle": "[ Full-Stack Developer // Phantom Thief ]",
    "hero.title": "USKEIN",
    "hero.typewriter": "Full-Stack Developer // Phantom Thief",
    "hero.cta1": "⚔ Enter the Metaverse",
    "hero.cta2": "⚡ View Skills",
    "hero.scroll": "SCROLL",
    "hero.system": "[ System v2.0 // Online ]",
    // Stats
    "stat.str": "STR",
    "stat.int": "INT",
    "stat.dex": "DEX",
    "stat.lck": "LCK",
    // Skills
    "skills.tag": "[ STATUS ]",
    "skills.title": "SKILL.GRID",
    "skills.analyzing": "ANALYZING STATS...",
    "skills.total": "Total",
    "skills.pts": "pts",
    "skills.backend": "BACKEND",
    "skills.frontend": "FRONTEND",
    "skills.devops": "DEVOPS",
    "skills.data": "DATA",
    "skills.tools": "TOOLS",
    "skills.power": "TOTAL POWER LEVEL",
    // Projects
    "projects.tag": "[ QUEST LOG ]",
    "projects.title": "MISSION.LIST",
    "projects.quests": "QUESTS AVAILABLE",
    "projects.found": "missions found",
    "projects.completed": "COMPLETED",
    "projects.features": "FEATURES",
    "projects.view": "VIEW",
    // Timeline
    "timeline.tag": "[ STORY ]",
    "timeline.title": "CONFIDANT.RANK",
    "timeline.milestones": "milestones",
    // Contact
    "contact.tag": "[ TRANSMISSION ]",
    "contact.title": "CONTACT.LINK",
    "contact.terminal": "TERMINAL v2.0",
    "contact.initialized": "> SYSTEM INITIALIZED",
    "contact.secure": "> Secure channel established",
    "contact.awaiting": "> Awaiting transmission...",
    "contact.channels": "DIRECT CHANNELS",
    "contact.github": "GitHub",
    "contact.email": "Email",
    "contact.identity": "IDENTITY",
    "contact.frequency": "FREQUENCY",
    "contact.transmission": "TRANSMISSION",
    "contact.send": "Send Transmission",
    "contact.complete": "TRANSMISSION COMPLETE",
    "contact.completeMsg": "Message received. I will respond through the secure channel.",
    // Footer
    "footer.select": "SELECT YOUR DESTINY",
  },
  es: {
    // Nav
    "nav.home": "INICIO",
    "nav.skills": "HABILIDADES",
    "nav.projects": "PROYECTOS",
    "nav.timeline": "TRAYECTORIA",
    "nav.contact": "CONTACTO",
    // Hero
    "hero.subtitle": "[ Desarrollador Full-Stack // Ladron Fantasma ]",
    "hero.title": "USKEIN",
    "hero.typewriter": "Desarrollador Full-Stack // Ladron Fantasma",
    "hero.cta1": "⚔ Entrar al MetaVerse",
    "hero.cta2": "⚡ Ver Habilidades",
    "hero.scroll": "SCROLL",
    "hero.system": "[ Sistema v2.0 // En Linea ]",
    // Stats
    "stat.str": "FUERZA",
    "stat.int": "INTEL",
    "stat.dex": "DESTREZA",
    "stat.lck": "SUERTE",
    // Skills
    "skills.tag": "[ ESTADO ]",
    "skills.title": "GRILLA.HABILIDADES",
    "skills.analyzing": "ANALIZANDO STATS...",
    "skills.total": "Total",
    "skills.pts": "pts",
    "skills.backend": "BACKEND",
    "skills.frontend": "FRONTEND",
    "skills.devops": "DEVOPS",
    "skills.data": "DATOS",
    "skills.tools": "HERRAMIENTAS",
    "skills.power": "NIVEL DE PODER TOTAL",
    // Projects
    "projects.tag": "[ REGISTRO DE MISIONES ]",
    "projects.title": "LISTA.MISIONES",
    "projects.quests": "MISIONES DISPONIBLES",
    "projects.found": "misiones encontradas",
    "projects.completed": "COMPLETADO",
    "projects.features": "CARACTERISTICAS",
    "projects.view": "VER",
    // Timeline
    "timeline.tag": "[ HISTORIA ]",
    "timeline.title": "RANGO.CONFIANZA",
    "timeline.milestones": "hitos",
    // Contact
    "contact.tag": "[ TRANSMISION ]",
    "contact.title": "ENLACE.CONTACTO",
    "contact.terminal": "TERMINAL v2.0",
    "contact.initialized": "> SISTEMA INICIALIZADO",
    "contact.secure": "> Canal seguro establecido",
    "contact.awaiting": "> Esperando transmision...",
    "contact.channels": "CANALES DIRECTOS",
    "contact.github": "GitHub",
    "contact.email": "Correo",
    "contact.identity": "IDENTIDAD",
    "contact.frequency": "FRECUENCIA",
    "contact.transmission": "TRANSMISION",
    "contact.send": "Enviar Transmision",
    "contact.complete": "TRANSIMISION COMPLETA",
    "contact.completeMsg": "Mensaje recibido. Respondere a traves del canal seguro.",
    // Footer
    "footer.select": "SELECCIA TU DESTINO",
  },
};

const LangContext = createContext<LangContextType>({
  lang: "en",
  toggle: () => {},
  t: () => "",
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const toggle = () => setLang((p) => (p === "en" ? "es" : "en"));
  const t = (key: string) => translations[lang][key as keyof typeof translations.en] || key;
  return <LangContext.Provider value={{ lang, toggle, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
