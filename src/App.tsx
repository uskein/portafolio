import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LangProvider } from "./context/LangContext";
import Navbar from "./components/layout/Navbar";
import SideNav from "./components/layout/SideNav";
import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Timeline from "./components/sections/Timeline";
import Contact from "./components/sections/Contact";
import Particles from "./components/ui/Particles";

export default function App() {
  const location = useLocation();

  return (
    <LangProvider>
      <div className="relative min-h-screen bg-bg">
        <Particles />
        <Navbar />
        <SideNav />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Hero />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </div>
    </LangProvider>
  );
}
