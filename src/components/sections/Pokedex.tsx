import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const pokedexEntries = [
  { id: "001", name: "BACKEND .NET/C#", type: "FIGHTING", level: 9, color: "#ef4444", description: "Maestro del backend con .NET y C#. Domina APIs REST y microservicios.", stats: { HP: 90, ATK: 95, DEF: 80, SPD: 70 } },
  { id: "002", name: "ASP.NET CORE", type: "FIGHTING", level: 9, color: "#ef4444", description: "Framework robusto para aplicaciones web escalables y de alto rendimiento.", stats: { HP: 85, ATK: 90, DEF: 85, SPD: 75 } },
  { id: "003", name: "REACT", type: "PSYCHIC", level: 8, color: "#06b6d4", description: "Biblioteca de interfaces de usuario con componentes reactivos y modernos.", stats: { HP: 80, ATK: 85, DEF: 70, SPD: 90 } },
  { id: "004", name: "ANGULAR", type: "PSYCHIC", level: 7, color: "#06b6d4", description: "Framework completo para aplicaciones empresariales escalables.", stats: { HP: 75, ATK: 80, DEF: 85, SPD: 70 } },
  { id: "005", name: "TYPESCRIPT", type: "PSYCHIC", level: 8, color: "#06b6d4", description: "Superset de JavaScript con tipos estáticos para código más seguro.", stats: { HP: 80, ATK: 75, DEF: 80, SPD: 85 } },
  { id: "006", name: "DOCKER", type: "STEEL", level: 7, color: "#eab308", description: "Contenedores ligeros para despliegues consistentes y escalables.", stats: { HP: 70, ATK: 65, DEF: 90, SPD: 80 } },
  { id: "007", name: "POSTGRESQL", type: "GHOST", level: 8, color: "#8b5cf6", description: "Base de datos relacional potente con soporte para JSON y extensiones.", stats: { HP: 85, ATK: 70, DEF: 85, SPD: 65 } },
  { id: "008", name: "RUST / TAURI", type: "ELECTRIC", level: 6, color: "#eab308", description: "Lenguaje de sistema seguro para apps de escritorio de alto rendimiento.", stats: { HP: 60, ATK: 80, DEF: 70, SPD: 95 } },
];

export default function Pokedex() {
  const [selectedEntry, setSelectedEntry] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();

  const filteredEntries = pokedexEntries.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const entry = filteredEntries[selectedEntry] || pokedexEntries[0];

  return (
    <section className="min-h-screen pt-28 pb-24 pl-44 pr-8 relative bg-bg pixel-grid-bg overflow-x-hidden">
      <div ref={titleRef} className="text-center mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={titleVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }}>
          <div className="inline-block relative">
            <div className="bg-white border-4 border-jrpg-navy relative">
              <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500" />
              <div className="px-12 py-6">
                <p className="font-pixel text-xs text-jrpg-red tracking-widest mb-2">[ POKEDEX ]</p>
                <h2 className="font-pixel text-3xl md:text-4xl text-jrpg-navy tracking-wider">SKILL ENCYCLOPEDIA</h2>
                <p className="font-pixel text-[10px] text-gray-500 mt-2">TECHNICAL KNOWLEDGE // DATABASE</p>
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

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Pokedex Viewer */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-b from-red-500 via-red-600 to-red-700 border-4 border-jrpg-navy rounded-3xl p-5 shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
            >
              {/* Top */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-4 border-white" />
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-jrpg-red border border-white" />
                  <div className="w-3 h-3 rounded-full bg-jrpg-gold border border-white" />
                </div>
              </div>

              {/* Screen */}
              <div className="bg-gradient-to-b from-gray-100 to-gray-200 border-4 border-jrpg-navy rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-gray-300">
                  <span className="font-pixel text-[10px] text-jrpg-navy">#{entry.id}</span>
                  <span className="font-pixel text-[9px] text-gray-500">{entry.type} TYPE</span>
                </div>
                
                <div className="w-full h-32 bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-gray-400 flex items-center justify-center mb-3">
                  <span className="font-pixel text-5xl font-bold" style={{ color: entry.color }}>{entry.name.charAt(0)}</span>
                </div>

                <h3 className="font-pixel text-sm text-jrpg-navy tracking-wider text-center mb-2">{entry.name}</h3>
                <p className="font-pixel text-[8px] text-gray-600 text-center">{entry.description}</p>
              </div>

              {/* Stats */}
              <div className="space-y-2">
                {Object.entries(entry.stats).map(([stat, value]) => (
                  <div key={stat} className="flex items-center gap-2">
                    <span className="font-pixel text-[8px] text-white/80 w-8">{stat}</span>
                    <div className="flex-1 h-3 bg-black/20 overflow-hidden">
                      <div className="h-full bg-jrpg-gold" style={{ width: `${value}%` }} />
                    </div>
                    <span className="font-pixel text-[8px] text-white w-6 text-right">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Pokedex List */}
          <div className="lg:col-span-7">
            <div className="bg-white border-4 border-jrpg-navy">
              <div className="bg-jrpg-navy px-4 py-3 flex items-center gap-3">
                <Search size={14} className="text-jrpg-gold" />
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setSelectedEntry(0); }}
                  className="flex-1 bg-transparent font-pixel text-[10px] text-white placeholder:text-white/50 focus:outline-none"
                />
              </div>
              <div className="p-4 max-h-[500px] overflow-y-auto">
                {filteredEntries.map((e, i) => (
                  <motion.div
                    key={e.id}
                    onClick={() => setSelectedEntry(i)}
                    className={`flex items-center gap-3 p-3 mb-2 cursor-pointer border-2 transition-all ${
                      i === selectedEntry ? 'border-jrpg-navy bg-gray-50' : 'border-gray-200 hover:border-jrpg-navy/50'
                    }`}
                    whileHover={{ x: 5 }}
                  >
                    <span className="font-pixel text-[10px] text-gray-400">#{e.id}</span>
                    <div className="w-12 h-12 flex items-center justify-center border-2" style={{ borderColor: e.color, backgroundColor: `${e.color}20` }}>
                      <span className="font-pixel text-lg font-bold" style={{ color: e.color }}>{e.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-pixel text-[10px] text-jrpg-navy tracking-wider">{e.name}</h4>
                      <p className="font-pixel text-[8px] text-gray-500">{e.type} TYPE</p>
                    </div>
                    <span className="font-pixel text-[9px] text-jrpg-gold">LV.{e.level}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
