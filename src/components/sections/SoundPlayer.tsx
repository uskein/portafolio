import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, Music } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const tracks = [
  { id: 1, title: "Route 01", artist: "Kanto Region", bpm: 120, color: "#ef4444" },
  { id: 2, title: "Battle Theme", artist: "Pokemon Center", bpm: 140, color: "#06b6d4" },
  { id: 3, title: "Victory Road", artist: "Elite Four", bpm: 150, color: "#eab308" },
  { id: 4, title: "Lavender Town", artist: "Ghost House", bpm: 100, color: "#8b5cf6" },
  { id: 5, title: "Cerulean City", artist: "Water Type", bpm: 110, color: "#22c55e" },
];

export default function SoundPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();

  const track = tracks[currentTrack];

  return (
    <section className="min-h-screen pt-28 pb-24 pl-44 pr-8 relative bg-bg pixel-grid-bg overflow-x-hidden">
      <div ref={titleRef} className="text-center mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={titleVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }}>
          <div className="inline-block relative">
            <div className="bg-white border-4 border-jrpg-navy relative">
              <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500" />
              <div className="px-12 py-6">
                <p className="font-pixel text-xs text-jrpg-red tracking-widest mb-2">[ SOUND ]</p>
                <h2 className="font-pixel text-3xl md:text-4xl text-jrpg-navy tracking-wider">MUSIC PLAYER</h2>
                <p className="font-pixel text-[10px] text-gray-500 mt-2">8-BIT SOUNDTRACK // CHIPTUNE</p>
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
        {/* Player */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border-4 border-jrpg-navy mb-6"
        >
          <div className="h-3" style={{ backgroundColor: track.color }} />
          <div className="p-6">
            {/* Now Playing */}
            <div className="text-center mb-6">
              <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center border-4 border-jrpg-navy" style={{ backgroundColor: `${track.color}20` }}>
                <Music size={48} style={{ color: track.color }} className={isPlaying ? 'animate-pulse' : ''} />
              </div>
              <h3 className="font-pixel text-sm text-jrpg-navy tracking-wider">{track.title}</h3>
              <p className="font-pixel text-[9px] text-gray-500">{track.artist}</p>
              <p className="font-pixel text-[8px] text-jrpg-gold mt-1">{track.bpm} BPM</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="h-3 bg-gray-200 border border-gray-300 overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{ backgroundColor: track.color }}
                  animate={{ width: isPlaying ? "100%" : "0%" }}
                  transition={{ duration: 5, ease: "linear", repeat: isPlaying ? Infinity : 0 }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-pixel text-[7px] text-gray-500">0:00</span>
                <span className="font-pixel text-[7px] text-gray-500">3:00</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button onClick={() => setCurrentTrack(prev => prev > 0 ? prev - 1 : tracks.length - 1)} className="p-2 bg-gray-100 border-2 border-gray-300 hover:border-jrpg-navy transition-colors">
                <SkipBack size={16} className="text-jrpg-navy" />
              </button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 rounded-full flex items-center justify-center border-4 border-jrpg-navy"
                style={{ backgroundColor: track.color }}
              >
                {isPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white ml-1" />}
              </motion.button>
              <button onClick={() => setCurrentTrack(prev => prev < tracks.length - 1 ? prev + 1 : 0)} className="p-2 bg-gray-100 border-2 border-gray-300 hover:border-jrpg-navy transition-colors">
                <SkipForward size={16} className="text-jrpg-navy" />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-3 mt-6">
              {volume > 0 ? <Volume2 size={14} className="text-jrpg-navy" /> : <VolumeX size={14} className="text-jrpg-navy" />}
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-200 appearance-none cursor-pointer"
              />
              <span className="font-pixel text-[8px] text-gray-500 w-8">{volume}%</span>
            </div>
          </div>
          <div className="h-2" style={{ backgroundColor: track.color }} />
        </motion.div>

        {/* Track List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border-4 border-jrpg-navy"
        >
          <div className="bg-jrpg-navy px-5 py-3">
            <span className="font-pixel text-[10px] text-jrpg-gold">PLAYLIST</span>
          </div>
          <div className="p-4">
            {tracks.map((t, i) => (
              <div
                key={t.id}
                onClick={() => { setCurrentTrack(i); setIsPlaying(true); }}
                className={`flex items-center gap-3 p-3 mb-2 cursor-pointer border-2 transition-all ${
                  i === currentTrack ? 'border-jrpg-navy bg-gray-50' : 'border-gray-200 hover:border-jrpg-navy/50'
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center border-2" style={{ borderColor: t.color, backgroundColor: `${t.color}20` }}>
                  <Music size={16} style={{ color: t.color }} />
                </div>
                <div className="flex-1">
                  <h4 className="font-pixel text-[10px] text-jrpg-navy">{t.title}</h4>
                  <p className="font-pixel text-[8px] text-gray-500">{t.artist}</p>
                </div>
                <span className="font-pixel text-[8px] text-gray-400">{t.bpm} BPM</span>
              </div>
            ))}
          </div>
        </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
