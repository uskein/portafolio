import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const members = [
  { name: "USKEIN", role: "Leader", class: "Code Mage", level: 8, color: "#ef4444", skills: ["Backend", "Frontend", "DevOps"] },
  { name: "GITHUB", role: "Ally", class: "Code Guardian", level: 10, color: "#06b6d4", skills: ["Version Control", "CI/CD", "Collaboration"] },
  { name: "DOCKER", role: "Ally", class: "Container Spirit", level: 8, color: "#2496ED", skills: ["Containers", "Deployment", "Isolation"] },
  { name: "POSTGRES", role: "Ally", class: "Data Keeper", level: 8, color: "#336791", skills: ["Database", "Queries", "Optimization"] },
];

export default function Party() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();

  return (
    <section className="min-h-screen pt-28 pb-24 pl-44 pr-8 relative bg-bg pixel-grid-bg overflow-x-hidden">
      <div ref={titleRef} className="text-center mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={titleVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }}>
          <div className="inline-block relative">
            <div className="bg-white border-4 border-jrpg-navy relative">
              <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500" />
              <div className="px-12 py-6">
                <p className="font-pixel text-xs text-jrpg-red tracking-widest mb-2">[ PARTY ]</p>
                <h2 className="font-pixel text-3xl md:text-4xl text-jrpg-navy tracking-wider">TEAM ROSTER</h2>
                <p className="font-pixel text-[10px] text-gray-500 mt-2">PARTY MEMBERS // ALLIES</p>
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

      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left - Empty (sidebar space) */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Main Content */}
          <div className="lg:col-span-11">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {members.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-white border-4 border-jrpg-navy relative overflow-hidden"
            >
              <div className="h-3" style={{ backgroundColor: member.color }} />
              <div className="p-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 flex items-center justify-center border-4 border-jrpg-navy" style={{ backgroundColor: `${member.color}20` }}>
                    <span className="font-pixel text-3xl" style={{ color: member.color }}>{member.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-pixel text-sm text-jrpg-navy tracking-wider">{member.name}</h3>
                    <p className="font-pixel text-[9px] text-gray-500">{member.class}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-pixel text-[8px] px-2 py-0.5 border" style={{ borderColor: member.color, color: member.color }}>{member.role}</span>
                      <span className="font-pixel text-[8px] text-jrpg-gold">LVL {member.level}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {member.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-gray-50 border border-gray-200 font-pixel text-[8px] text-gray-600">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="h-2" style={{ backgroundColor: member.color }} />
            </motion.div>
          )          )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
