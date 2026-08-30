import { motion } from "framer-motion";
import { Download, FileText, Calendar, HardDrive, CheckCircle } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const saveSlots = [
  { id: 1, name: "SLOT A", description: "Full Resume (PDF)", date: "2025", size: "245 KB", type: "PDF", current: true },
  { id: 2, name: "SLOT B", description: "Portfolio Source Code", date: "2025", size: "1.2 MB", type: "ZIP", current: false },
  { id: 3, name: "SLOT C", description: "Project Portfolio", date: "2025", size: "890 KB", type: "PDF", current: false },
];

export default function SaveFiles() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();

  return (
    <section className="min-h-screen pt-28 pb-24 pl-44 pr-8 relative bg-bg pixel-grid-bg overflow-x-hidden">
      <div ref={titleRef} className="text-center mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={titleVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }}>
          <div className="inline-block relative">
            <div className="bg-white border-4 border-jrpg-navy relative">
              <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500" />
              <div className="px-12 py-6">
                <p className="font-pixel text-xs text-jrpg-red tracking-widest mb-2">[ SAVE FILES ]</p>
                <h2 className="font-pixel text-3xl md:text-4xl text-jrpg-navy tracking-wider">DATA MANAGEMENT</h2>
                <p className="font-pixel text-[10px] text-gray-500 mt-2">RESUME // DOWNLOAD CENTER</p>
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

      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="hidden lg:block lg:col-span-1" />
          <div className="lg:col-span-11">
        {/* Memory Card Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border-4 border-jrpg-navy mb-6"
        >
          <div className="bg-jrpg-navy px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive size={14} className="text-jrpg-gold" />
              <span className="font-pixel text-[10px] text-jrpg-gold">MEMORY CARD</span>
            </div>
            <span className="font-pixel text-[8px] text-white/60">128 KB FREE</span>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-20 bg-gradient-to-b from-gray-700 to-gray-800 border-2 border-gray-600 rounded flex items-center justify-center">
                <span className="font-pixel text-[8px] text-gray-400">PS1</span>
              </div>
              <div>
                <h3 className="font-pixel text-sm text-jrpg-navy tracking-wider">USKEIN DATA CARD</h3>
                <p className="font-pixel text-[9px] text-gray-500">Professional Portfolio Save Data</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="font-pixel text-[8px] text-jrpg-green flex items-center gap-1">
                    <CheckCircle size={10} /> 3 FILES
                  </span>
                  <span className="font-pixel text-[8px] text-gray-500">LAST SAVED: 2025</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Save Slots */}
        <div className="space-y-4">
          {saveSlots.map((slot, i) => (
            <motion.div
              key={slot.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 10 }}
              className="bg-white border-4 border-jrpg-navy relative overflow-hidden"
            >
              <div className={`h-2 ${slot.current ? 'bg-jrpg-green' : 'bg-gray-300'}`} />
              <div className="p-5 flex items-center gap-4">
                <div className={`w-16 h-16 flex items-center justify-center border-4 border-jrpg-navy ${slot.current ? 'bg-jrpg-green/20' : 'bg-gray-100'}`}>
                  <FileText size={24} className={slot.current ? 'text-jrpg-green' : 'text-gray-400'} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-pixel text-[11px] text-jrpg-navy tracking-wider">{slot.name}</h3>
                    {slot.current && (
                      <span className="font-pixel text-[7px] px-2 py-0.5 bg-jrpg-green text-white">ACTIVE</span>
                    )}
                  </div>
                  <p className="font-pixel text-[9px] text-gray-600 mb-2">{slot.description}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={10} className="text-gray-400" />
                      <span className="font-pixel text-[8px] text-gray-500">{slot.date}</span>
                    </div>
                    <span className="font-pixel text-[8px] text-gray-400">{slot.size}</span>
                    <span className="font-pixel text-[8px] px-1.5 py-0.5 bg-gray-100 border border-gray-300 text-gray-600">{slot.type}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-jrpg-navy text-white font-pixel text-[9px] tracking-wider flex items-center gap-2 hover:bg-jrpg-navy/90 transition-colors"
                >
                  <Download size={12} />
                  <span>LOAD</span>
                </motion.button>
              </div>
              <div className={`h-1.5 ${slot.current ? 'bg-jrpg-green' : 'bg-gray-300'}`} />
            </motion.div>
          ))}
        </div>

        {/* Memory Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-white border-4 border-jrpg-navy p-5"
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="font-pixel text-lg text-jrpg-red font-bold">3</p>
              <p className="font-pixel text-[8px] text-gray-500">SAVE FILES</p>
            </div>
            <div>
              <p className="font-pixel text-lg text-jrpg-gold font-bold">2.3 MB</p>
              <p className="font-pixel text-[8px] text-gray-500">TOTAL SIZE</p>
            </div>
            <div>
              <p className="font-pixel text-lg text-jrpg-navy font-bold">2025</p>
              <p className="font-pixel text-[8px] text-gray-500">LAST UPDATE</p>
            </div>
          </div>
        </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
