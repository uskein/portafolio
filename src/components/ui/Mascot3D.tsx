import { motion } from "framer-motion";

type Pose = "idle" | "combat" | "cast" | "read" | "hack" | "walk";

interface Mascot3DProps {
  pose?: Pose;
  size?: number;
  className?: string;
}

export default function Mascot3D({ pose = "idle", size = 200, className = "" }: Mascot3DProps) {
  return (
    <div className={`relative ${className}`} style={{ perspective: 600, width: size, height: size * 1.2 }}>
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={
          pose === "idle"
            ? { rotateY: [0, 8, -8, 0], rotateX: [0, 3, -2, 0], y: [0, -8, 0] }
            : pose === "combat"
            ? { rotateY: [-15, 15, -15], rotateX: [0, -5, 0], y: [0, -4, 0] }
            : pose === "cast"
            ? { rotateY: [0, 10, -5, 0], rotateX: [5, 0, 5], y: [0, -10, 0] }
            : pose === "hack"
            ? { rotateY: [5, -5, 5], rotateX: [0, -3, 0], y: [0, -3, 0] }
            : pose === "read"
            ? { rotateY: [10, 15, 10], rotateX: [5, 8, 5], y: [0, -5, 0] }
            : { rotateY: [0, 5, -5, 0], rotateX: [0, 2, -2, 0], y: [0, -6, 0] }
        }
        transition={{
          duration: pose === "combat" ? 1.5 : pose === "walk" ? 1.2 : 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* === GROUND SHADOW === */}
        <motion.div
          className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-p5-red/20"
          style={{ width: size * 0.5, height: size * 0.06, filter: "blur(8px)" }}
          animate={pose === "idle" ? { scaleX: [1, 0.8, 1], opacity: [0.2, 0.12, 0.2] } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* === CAPE (behind body) === */}
        <motion.div
          className="absolute"
          style={{
            width: size * 0.7,
            height: size * 0.55,
            left: "15%",
            bottom: "12%",
            background: "linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 60%, #050510 100%)",
            borderRadius: "0 0 40% 40%",
            transformOrigin: "top center",
            transform: "translateZ(-20px)",
            boxShadow: "inset 0 0 30px rgba(230,0,18,0.1)",
          }}
          animate={
            pose === "combat"
              ? { rotate: [0, 15, -10, 12, 0], skewX: [0, 5, -3, 4, 0] }
              : pose === "cast"
              ? { rotate: [-15, -20, -15], skewX: [-5, -8, -5] }
              : pose === "walk"
              ? { rotate: [0, 8, -4, 8, 0], skewX: [0, 3, -2, 3, 0] }
              : { rotate: [0, 3, -2, 3, 0], skewX: [0, 1, -1, 1, 0] }
          }
          transition={{
            duration: pose === "combat" ? 1.2 : pose === "walk" ? 0.8 : 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Cape inner lining */}
          <div
            className="absolute inset-2"
            style={{
              background: "linear-gradient(180deg, rgba(230,0,18,0.15) 0%, rgba(230,0,18,0.05) 100%)",
              borderRadius: "0 0 35% 35%",
            }}
          />
          {/* Cape folds */}
          <div className="absolute left-1/4 top-1/4 w-px h-1/2 bg-white/5" />
          <div className="absolute right-1/4 top-1/4 w-px h-1/2 bg-white/5" />
        </motion.div>

        {/* === LEGS === */}
        <motion.div
          className="absolute"
          style={{
            width: size * 0.35,
            height: size * 0.28,
            left: "32%",
            bottom: "4%",
            transform: "translateZ(10px)",
          }}
          animate={
            pose === "walk"
              ? { rotate: [0, 8, -8, 0] }
              : pose === "combat"
              ? { rotate: [-5, 5, -5] }
              : {}
          }
          transition={{ duration: pose === "walk" ? 0.6 : 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Left boot */}
          <div
            className="absolute left-0 bottom-0"
            style={{
              width: "45%",
              height: "100%",
              background: "linear-gradient(180deg, #0d0d1a 0%, #1a1a1a 100%)",
              borderRadius: "30% 30% 20% 20%",
              boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-p5-red/60 rounded-b" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-1 h-3 bg-p5-red/40 rounded" />
          </div>
          {/* Right boot */}
          <div
            className="absolute right-0 bottom-0"
            style={{
              width: "45%",
              height: "100%",
              background: "linear-gradient(180deg, #0d0d1a 0%, #1a1a1a 100%)",
              borderRadius: "30% 30% 20% 20%",
              boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-p5-red/60 rounded-b" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-1 h-3 bg-p5-red/40 rounded" />
          </div>
        </motion.div>

        {/* === BODY === */}
        <div
          className="absolute"
          style={{
            width: size * 0.5,
            height: size * 0.4,
            left: "25%",
            bottom: "25%",
            background: "linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%)",
            borderRadius: "15% 15% 5% 5%",
            transform: "translateZ(15px)",
            boxShadow: "inset 0 0 20px rgba(230,0,18,0.08), 0 4px 20px rgba(0,0,0,0.4)",
          }}
        >
          {/* Collar */}
          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2"
            style={{
              width: "80%",
              height: size * 0.06,
              background: "linear-gradient(180deg, #E60012 0%, #B8000F 100%)",
              borderRadius: "50% 50% 0 0",
              boxShadow: "0 0 12px rgba(230,0,18,0.5)",
            }}
          />
          {/* Belt */}
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-p5-darker">
            <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-p5-red rounded-sm" style={{ boxShadow: "0 0 8px rgba(230,0,18,0.6)" }} />
          </div>
          {/* Buttons */}
          <div className="absolute top-[30%] left-1/2 -translate-x-1/2 flex flex-col gap-2">
            <div className="w-1.5 h-1.5 bg-p5-red/70 rounded-full" />
            <div className="w-1.5 h-1.5 bg-p5-red/70 rounded-full" />
          </div>
        </div>

        {/* === LEFT ARM === */}
        <motion.div
          className="absolute"
          style={{
            width: size * 0.15,
            height: size * 0.32,
            left: "14%",
            bottom: "30%",
            background: "linear-gradient(180deg, #0d0d1a 0%, #1a1a1a 100%)",
            borderRadius: "40%",
            transformOrigin: "top center",
            transform: "translateZ(8px)",
          }}
          animate={
            pose === "combat"
              ? { rotate: [-40, -60, -30, -40] }
              : pose === "cast"
              ? { rotate: [20, 35, 15, 20] }
              : pose === "hack"
              ? { rotate: [10, 15, 8, 10] }
              : pose === "read"
              ? { rotate: [25, 30, 20, 25] }
              : pose === "walk"
              ? { rotate: [15, 5, 25, 15] }
              : { rotate: [5, 2, 8, 5] }
          }
          transition={{
            duration: pose === "combat" ? 1.2 : pose === "walk" ? 0.8 : 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Glove */}
          <div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: size * 0.1,
              height: size * 0.1,
              background: "radial-gradient(circle, #2d2d2d 40%, #1a1a1a 100%)",
              boxShadow: pose === "combat" ? "0 0 12px rgba(230,0,18,0.6)" : "none",
            }}
          />
          {/* Weapon in combat */}
          {pose === "combat" && (
            <motion.div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2"
              style={{ width: 3, height: size * 0.18, background: "linear-gradient(180deg, #C0C0C0 0%, #888 100%)", borderRadius: 2 }}
              animate={{ rotate: [0, -20, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-2 bg-p5-red rounded-sm" style={{ boxShadow: "0 0 8px rgba(230,0,18,0.8)" }} />
            </motion.div>
          )}
          {/* Book in read */}
          {pose === "read" && (
            <div
              className="absolute -bottom-2 -left-2"
              style={{
                width: size * 0.12,
                height: size * 0.08,
                background: "#F5F5F5",
                border: "1px solid #E60012",
                borderRadius: 2,
              }}
            >
              <div className="absolute top-1 left-1 right-1 space-y-0.5">
                <div className="h-px bg-gray-400" />
                <div className="h-px bg-gray-300 w-3/4" />
                <div className="h-px bg-gray-400" />
              </div>
            </div>
          )}
        </motion.div>

        {/* === RIGHT ARM === */}
        <motion.div
          className="absolute"
          style={{
            width: size * 0.15,
            height: size * 0.32,
            right: "14%",
            bottom: "30%",
            background: "linear-gradient(180deg, #0d0d1a 0%, #1a1a1a 100%)",
            borderRadius: "40%",
            transformOrigin: "top center",
            transform: "translateZ(8px)",
          }}
          animate={
            pose === "combat"
              ? { rotate: [25, 40, 15, 25] }
              : pose === "cast"
              ? { rotate: [-20, -35, -10, -20] }
              : pose === "hack"
              ? { rotate: [-8, -12, -5, -8] }
              : pose === "walk"
              ? { rotate: [-15, -5, -25, -15] }
              : { rotate: [-5, -2, -8, -5] }
          }
          transition={{
            duration: pose === "combat" ? 1.2 : pose === "walk" ? 0.8 : 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: pose === "walk" ? 0.4 : 0,
          }}
        >
          {/* Glove */}
          <div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: size * 0.1,
              height: size * 0.1,
              background: "radial-gradient(circle, #2d2d2d 40%, #1a1a1a 100%)",
            }}
          />
          {/* Gun in combat */}
          {pose === "combat" && (
            <div className="absolute -bottom-2 -right-3">
              <div style={{ width: size * 0.1, height: size * 0.04, background: "#2d2d2d", borderRadius: 3 }}>
                <motion.div
                  className="absolute -right-1 top-1/2 -translate-y-1/2 rounded-full"
                  style={{ width: 6, height: 6, background: "#FFD700" }}
                  animate={{ opacity: [0, 0.9, 0], scale: [0.5, 1.5, 0.5] }}
                  transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1 }}
                />
              </div>
            </div>
          )}
          {/* Laptop in hack */}
          {pose === "hack" && (
            <div className="absolute -bottom-4 -right-2">
              <div
                style={{
                  width: size * 0.18,
                  height: size * 0.12,
                  background: "#1a1a2e",
                  border: "1px solid #38BDF8",
                  borderRadius: 3,
                }}
              >
                <div className="absolute inset-1 bg-[#0a1628] rounded-sm overflow-hidden">
                  <motion.div
                    className="space-y-0.5 p-0.5"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className="h-px bg-[#38BDF8] w-3/4" />
                    <div className="h-px bg-[#059669] w-full" />
                    <div className="h-px bg-[#E60012] w-1/2" />
                  </motion.div>
                </div>
              </div>
            </div>
          )}
          {/* Magic in cast */}
          {pose === "cast" && (
            <motion.div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2"
              style={{ width: size * 0.15, height: size * 0.15 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 rounded-full border border-[#8B5CF6]/50" />
              <div className="absolute inset-1 rounded-full border border-[#E60012]/30" />
              {[0, 60, 120, 180, 240, 300].map((a) => (
                <div
                  key={a}
                  className="absolute w-1 h-1 bg-[#FFD700] rounded-full"
                  style={{
                    top: `${50 + 45 * Math.sin((a * Math.PI) / 180)}%`,
                    left: `${50 + 45 * Math.cos((a * Math.PI) / 180)}%`,
                  }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* === HEAD === */}
        <motion.div
          className="absolute"
          style={{
            width: size * 0.45,
            height: size * 0.45,
            left: "27%",
            bottom: "52%",
            transform: "translateZ(25px)",
          }}
          animate={
            pose === "read"
              ? { rotateY: [15, 20, 10, 15], rotateX: [5, 8, 3, 5] }
              : pose === "hack"
              ? { rotateY: [-3, -6, 0, -3], rotateX: [-2, -4, 0, -2] }
              : pose === "combat"
              ? { rotateY: [-5, -10, 0, -5], rotateX: [0, -3, 2, 0] }
              : { rotateY: [0, 5, -5, 0], rotateX: [0, 2, -2, 0] }
          }
          transition={{
            duration: pose === "combat" ? 1.2 : 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Head shape */}
          <div
            className="absolute inset-0 rounded-[45%]"
            style={{
              background: "radial-gradient(ellipse at 40% 35%, #e8c4a0 0%, #d4a574 50%, #c49464 100%)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 -3px 8px rgba(0,0,0,0.1)",
            }}
          />

          {/* Hair */}
          <div
            className="absolute -top-[15%] -left-[8%] -right-[8%] h-[55%]"
            style={{
              background: "linear-gradient(180deg, #1a1a1a 0%, #1a1a1a 70%, transparent 100%)",
              borderRadius: "50% 50% 30% 30%",
              clipPath: "polygon(10% 100%, 0% 40%, 15% 10%, 35% 0%, 65% 0%, 85% 10%, 100% 40%, 90% 100%)",
            }}
          />
          {/* Hair spikes */}
          <div className="absolute -top-[18%] left-[20%] w-3 h-5 bg-[#1a1a1a] rounded-b-full -rotate-12" />
          <div className="absolute -top-[22%] left-[40%] w-2.5 h-6 bg-[#1a1a1a] rounded-b-full rotate-3" />
          <div className="absolute -top-[16%] right-[20%] w-3 h-5 bg-[#1a1a1a] rounded-b-full rotate-12" />

          {/* Mask */}
          <div
            className="absolute top-[30%] left-[5%] right-[5%] h-[30%]"
            style={{
              background: "linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)",
              borderRadius: "40% 40% 35% 35%",
              border: "0.5px solid rgba(230,0,18,0.3)",
            }}
          >
            {/* Eye holes */}
            <div className="absolute top-[25%] left-[12%] w-[28%] h-[45%] bg-[#0a0a0a] rounded-[45%]" />
            <div className="absolute top-[25%] right-[12%] w-[28%] h-[45%] bg-[#0a0a0a] rounded-[45%]" />
            {/* Glowing eyes */}
            <motion.div
              className="absolute top-[35%] left-[18%] w-[16%] h-[25%] rounded-full"
              style={{
                background: "radial-gradient(circle, #E60012 30%, transparent 70%)",
                boxShadow: "0 0 10px rgba(230,0,18,0.8), 0 0 20px rgba(230,0,18,0.4)",
              }}
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-[35%] right-[18%] w-[16%] h-[25%] rounded-full"
              style={{
                background: "radial-gradient(circle, #E60012 30%, transparent 70%)",
                boxShadow: "0 0 10px rgba(230,0,18,0.8), 0 0 20px rgba(230,0,18,0.4)",
              }}
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </div>

          {/* Mouth */}
          {pose === "combat" ? (
            <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[25%] h-1 bg-[#1a1a1a] rounded-full" />
          ) : pose === "hack" ? (
            <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[20%] h-[3px] bg-[#1a1a1a] rounded" />
          ) : (
            <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[20%] h-1.5 border-b-2 border-[#1a1a1a] rounded-b-full" />
          )}

          {/* Cheek blush */}
          <div className="absolute bottom-[25%] left-[10%] w-[15%] h-[8%] bg-p5-red/20 rounded-full blur-sm" />
          <div className="absolute bottom-[25%] right-[10%] w-[15%] h-[8%] bg-p5-red/20 rounded-full blur-sm" />
        </motion.div>

        {/* === POSE EFFECTS === */}
        {pose === "combat" && (
          <>
            <motion.div
              className="absolute"
              style={{ left: "0%", top: "30%", width: size * 0.3, height: 2 }}
              animate={{ opacity: [0, 0.8, 0], scaleX: [0, 1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.6 }}
            >
              <div className="w-full h-full bg-gradient-to-r from-transparent via-[#E60012] to-transparent rounded-full" style={{ filter: "blur(1px)" }} />
            </motion.div>
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-[#FFD700]"
                style={{ width: 3, height: 3, left: `${10 + i * 8}%`, top: `${35 + (i % 2) * 5}%` }}
                animate={{ opacity: [0, 1, 0], y: [0, -15], scale: [0, 1.2, 0] }}
                transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </>
        )}

        {pose === "cast" && (
          <motion.div
            className="absolute text-[8px] font-mono text-[#8B5CF6]"
            style={{ right: "5%", top: "25%" }}
            animate={{ opacity: [0, 0.7, 0], y: [0, -20] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            arcane
          </motion.div>
        )}

        {pose === "hack" && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute font-mono text-[6px] text-[#38BDF8]"
                style={{ right: `${5 + i * 6}%`, top: `${40 + i * 4}%` }}
                animate={{ opacity: [0.2, 0.6, 0.2], y: [0, -8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              >
                {["01", "10", "11"][i]}
              </motion.div>
            ))}
          </>
        )}

        {pose === "read" && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-[#FFD700]"
                style={{ width: 2, height: 2, left: `${8 + i * 5}%`, top: `${38 + i * 3}%` }}
                animate={{ opacity: [0, 0.7, 0], y: [0, -10] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
              />
            ))}
          </>
        )}

        {pose === "walk" && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-[#d4a574]/30"
                style={{ width: 4, height: 4, left: `${35 + i * 8}%`, bottom: "2%" }}
                animate={{ x: [-5, -15], opacity: [0.3, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </>
        )}
      </motion.div>
    </div>
  );
}
