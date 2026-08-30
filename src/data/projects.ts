export interface Project {
  id: string;
  name: string;
  title: string;
  description: string;
  longDescription: string;
  rank: number;
  repo: string;
  tech: TechItem[];
  features: string[];
  status: "completed" | "in-progress" | "planned";
  githubUrl: string;
  image?: string;
}

export interface TechItem {
  name: string;
  icon: string;
  color: string;
}

export interface SkillStat {
  name: string;
  level: number;
  maxLevel: number;
  icon: string;
  category: "backend" | "frontend" | "devops" | "data" | "tools";
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: "project" | "skill" | "milestone";
  icon: string;
}

export const projects: Project[] = [
  {
    id: "plpdf",
    name: "PLPDF",
    title: "Biblioteca Imperial",
    description:
      "Lector de libros con estetica imperial. Gestiona tu biblioteca de PDF/EPUB con colecciones, anotaciones y cuadernos.",
    longDescription:
      "Aplicacion de escritorio construida con Tauri + React para la gestion y lectura de libros en formato PDF y EPUB. Incluye sistema de colecciones jerarquicas, anotaciones persistentes, cuadernos de notas y dictado por voz.",
    rank: 5,
    repo: "plpdf",
    tech: [
      { name: "Tauri", icon: "tauri", color: "#FFC131" },
      { name: "Rust", icon: "rust", color: "#000000" },
      { name: "React", icon: "react", color: "#61DAFB" },
      { name: "TypeScript", icon: "typescript", color: "#3178C6" },
      { name: "Tailwind", icon: "tailwind", color: "#38B2AC" },
      { name: "SQLite", icon: "sqlite", color: "#003B57" },
    ],
    features: [
      "Colecciones organizables en arbol jerarquico",
      "Lector de PDF y EPUB integrados",
      "Anotaciones persistentes por libro",
      "Cuadernos de notas con creacion y guardado automatico",
      "Temas visuales y selector de acentos",
      "Dictado por voz para apuntes",
      "Recordatorio de progreso de lectura",
    ],
    status: "completed",
    githubUrl: "https://github.com/uskein/plpdf",
  },
  {
    id: "plmp4",
    name: "PLMP4",
    title: "Video Library",
    description:
      "Reproductor de video local con progreso automatico, anotaciones en la linea de tiempo y cuadernos integrados.",
    longDescription:
      "Reproductor de video local construido con Tauri + React. Incluye progreso automatico, anotaciones en la linea de tiempo, carpetas con portadas, cuadernos exportables a PDF y Markdown, y thumbnails automaticos.",
    rank: 4,
    repo: "plmp4",
    tech: [
      { name: "Tauri", icon: "tauri", color: "#FFC131" },
      { name: "Rust", icon: "rust", color: "#000000" },
      { name: "React", icon: "react", color: "#61DAFB" },
      { name: "TypeScript", icon: "typescript", color: "#3178C6" },
      { name: "Zustand", icon: "zustand", color: "#764ABC" },
      { name: "Tailwind", icon: "tailwind", color: "#38B2AC" },
    ],
    features: [
      "Reproductor completo con play/pause, seek, volumen, pantalla completa",
      "Progreso automatico - retoma donde lo dejaste",
      "Anotaciones en la linea de tiempo con colores",
      "Carpetas y colecciones con portadas personalizables",
      "Cuadernos exportables a PDF y Markdown",
      "Thumbnails automaticos y duracion detectada",
      "Atajos de teclado (espacio, flechas, F, M)",
    ],
    status: "completed",
    githubUrl: "https://github.com/uskein/plmp4",
  },
  {
    id: "voynich",
    name: "VOYNICH CODEX",
    title: "World Builder",
    description:
      "Plataforma full-stack para la creacion de mundos y gestion de manuscritos con arquitectura limpia.",
    longDescription:
      "Plataforma full-stack con React + Express + PostgreSQL para world-building y manejo de manuscritos. Incluye bestiario, personajes, timeline, geografia, naciones, sistemas de magia, busqueda semantica, Kanban board y sistema de temas.",
    rank: 5,
    repo: "voynich-codex",
    tech: [
      { name: "React", icon: "react", color: "#61DAFB" },
      { name: "Express", icon: "express", color: "#000000" },
      { name: "PostgreSQL", icon: "postgresql", color: "#336791" },
      { name: "Docker", icon: "docker", color: "#2496ED" },
      { name: "TypeScript", icon: "typescript", color: "#3178C6" },
      { name: "Framer Motion", icon: "framer", color: "#BB4BFF" },
    ],
    features: [
      "World Building - Bestiario, personajes, timeline, geografia",
      "Sistemas de magia y naciones configurables",
      "Manuscript Management con busqueda semantica",
      "Project Management - Kanban board, sprints, milestones",
      "Theme System - Modos Day/Night/Sepia con Framer Motion",
      "Arquitectura Docker multi-servicio",
    ],
    status: "completed",
    githubUrl: "https://github.com/uskein/voynich-codex",
  },
];

export const skillStats: SkillStat[] = [
  { name: "Backend .NET/C#", level: 9, maxLevel: 10, icon: "code", category: "backend" },
  { name: "ASP.NET Core", level: 9, maxLevel: 10, icon: "server", category: "backend" },
  { name: "REST APIs", level: 8, maxLevel: 10, icon: "globe", category: "backend" },
  { name: "React", level: 8, maxLevel: 10, icon: "atom", category: "frontend" },
  { name: "Angular", level: 7, maxLevel: 10, icon: "layout", category: "frontend" },
  { name: "TypeScript", level: 8, maxLevel: 10, icon: "code-2", category: "frontend" },
  { name: "Microservicios", level: 9, maxLevel: 10, icon: "boxes", category: "backend" },
  { name: "Docker", level: 7, maxLevel: 10, icon: "container", category: "devops" },
  { name: "PostgreSQL", level: 7, maxLevel: 10, icon: "database", category: "data" },
  { name: "SQL Server", level: 8, maxLevel: 10, icon: "database", category: "data" },
  { name: "Rust / Tauri", level: 6, maxLevel: 10, icon: "cog", category: "tools" },
  { name: "Git / CI-CD", level: 8, maxLevel: 10, icon: "git-branch", category: "devops" },
];

export const timelineEvents: TimelineEvent[] = [
  {
    year: "2023",
    title: "Inicion en Desarrollo Full-Stack",
    description: "Primeros pasos con .NET, C# y bases de datos SQL Server.",
    type: "milestone",
    icon: "rocket",
  },
  {
    year: "2024",
    title: "Arquitectura de Microservicios",
    description: "Implementacion de Ocelot Gateway, RabbitMQ y comunicacion entre servicios.",
    type: "skill",
    icon: "layers",
  },
  {
    year: "2024",
    title: "PLPDF - Biblioteca Imperial",
    description: "Primera app de escritorio con Tauri + React para lectura de PDF/EPUB.",
    type: "project",
    icon: "book-open",
  },
  {
    year: "2025",
    title: "PLMP4 - Video Library",
    description: "Reproductor de video local con progreso automatico y anotaciones.",
    type: "project",
    icon: "play-circle",
  },
  {
    year: "2025",
    title: "Frontend Angular Empresarial",
    description: "Desarrollo de frontends escalables conectados a API Gateway.",
    type: "skill",
    icon: "layout",
  },
  {
    year: "2025",
    title: "VOYNICH CODEX - World Builder",
    description: "Plataforma full-stack para world-building con React + Express + PostgreSQL.",
    type: "project",
    icon: "scroll",
  },
  {
    year: "2026",
    title: "Kubernetes & Cloud",
    description: "Orquestacion de servicios con Kubernetes y despliegue en la nube.",
    type: "skill",
    icon: "cloud",
  },
  {
    year: "2026",
    title: "Rust & Desktop Apps",
    description: "Dominio de Tauri + Rust para aplicaciones de escritorio nativas.",
    type: "skill",
    icon: "cpu",
  },
];

export const socialLinks = {
  github: "https://github.com/uskein",
  email: "juansebastianp188@gmail.com",
};
