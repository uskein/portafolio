import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LangProvider } from "./context/LangContext";
import Navbar from "./components/layout/Navbar";
import SideNav from "./components/layout/SideNav";
import SideNavBlue from "./components/layout/SideNavBlue";
import SideNavGold from "./components/layout/SideNavGold";
import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Timeline from "./components/sections/Timeline";
import Contact from "./components/sections/Contact";
import Achievements from "./components/sections/Achievements";
import Stats from "./components/sections/Stats";
import Inventory from "./components/sections/Inventory";
import BattleLog from "./components/sections/BattleLog";
import Party from "./components/sections/Party";
import Pokedex from "./components/sections/Pokedex";
import MiniGames from "./components/sections/MiniGames";
import SoundPlayer from "./components/sections/SoundPlayer";
import SettingsPage from "./components/sections/SettingsPage";
import SaveFiles from "./components/sections/SaveFiles";
import Particles from "./components/ui/Particles";

export default function App() {
  const location = useLocation();

  return (
    <LangProvider>
      <div className="relative min-h-screen bg-bg">
        <Particles />
        <Navbar />
        <SideNav />
        <SideNavBlue />
        <SideNavGold />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Main Sections */}
            <Route path="/" element={<Hero />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Blue System Sections */}
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/battle-log" element={<BattleLog />} />
            <Route path="/party" element={<Party />} />
            
            {/* Gold System Sections */}
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/mini-games" element={<MiniGames />} />
            <Route path="/sound" element={<SoundPlayer />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/save-files" element={<SaveFiles />} />
          </Routes>
        </AnimatePresence>
      </div>
    </LangProvider>
  );
}
