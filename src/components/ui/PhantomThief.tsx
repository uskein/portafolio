import { motion } from "framer-motion";

type Pose = "idle" | "combat" | "cast" | "read" | "hack" | "walk";

interface PhantomThiefProps {
  pose?: Pose;
  size?: number;
  className?: string;
  glowColor?: string;
}

export default function PhantomThief({ pose = "idle", size = 200, className = "", glowColor = "#E60012" }: PhantomThiefProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={pose === "idle" ? { y: [0, -4, 0] } : { y: 0 }}
      transition={pose === "idle" ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
    >
      {/* Shadow on ground */}
      <motion.ellipse
        cx="100"
        cy="295"
        rx="30"
        ry="5"
        fill={glowColor}
        opacity={0.15}
        animate={pose === "idle" ? { rx: [30, 25, 30], opacity: [0.15, 0.1, 0.15] } : {}}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ filter: "blur(4px)" }}
      />

      <svg
        viewBox="0 0 200 300"
        width={size}
        height={size * 1.5}
        className="drop-shadow-lg"
        style={{ filter: `drop-shadow(0 0 12px ${glowColor}40)` } as React.CSSProperties}
      >
        <defs>
          <linearGradient id={`coatGrad-${pose}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="50%" stopColor="#0d0d1a" />
            <stop offset="100%" stopColor="#050510" />
          </linearGradient>
          <linearGradient id={`maskGrad-${pose}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#2d2d2d" />
          </linearGradient>
          <filter id={`glow-${pose}`}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={`redGlow-${pose}`}>
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor="#E60012" floodOpacity="0.6" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* === CAPE === */}
        <motion.g
          animate={
            pose === "combat"
              ? { rotate: [0, 12, -5, 8, 0] }
              : pose === "walk"
              ? { rotate: [0, 6, -3, 6, 0] }
              : pose === "cast"
              ? { rotate: -12 }
              : { rotate: [0, 2, -1, 2, 0] }
          }
          transition={
            pose === "combat"
              ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
              : pose === "walk"
              ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
              : pose === "idle"
              ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.4 }
          }
          style={{ transformOrigin: "100px 120px" }}
        >
          <path
            d="M 60 120 Q 50 180 40 260 Q 70 250 100 260 Q 130 250 160 260 Q 150 180 140 120 Z"
            fill={`url(#coatGrad-${pose})`}
            stroke="#E60012"
            strokeWidth="0.5"
            opacity="0.9"
          />
          <path
            d="M 65 130 Q 58 180 50 250 Q 75 240 100 250 Q 125 240 150 250 Q 142 180 135 130 Z"
            fill="none"
            stroke="#E60012"
            strokeWidth="0.3"
            opacity="0.3"
          />
          <path d="M 70 140 Q 65 200 55 245" fill="none" stroke="#2D2D3D" strokeWidth="0.5" opacity="0.4" />
          <path d="M 130 140 Q 135 200 145 245" fill="none" stroke="#2D2D3D" strokeWidth="0.5" opacity="0.4" />
        </motion.g>

        {/* === LEGS === */}
        <g>
          {/* Left leg */}
          <motion.g
            animate={
              pose === "walk"
                ? { x: -6, y: [0, -4, 0] }
                : pose === "combat"
                ? { x: -8 }
                : { x: 0, y: 0 }
            }
            transition={
              pose === "walk"
                ? { duration: 0.6, repeat: Infinity, repeatType: "reverse" }
                : { type: "spring", stiffness: 200, damping: 15 }
            }
          >
            <rect x="82" y="210" width="14" height="55" rx="4" fill="#0d0d1a" />
            <path d="M 78 255 L 78 270 Q 78 278 86 278 L 98 278 Q 100 278 100 270 L 100 255 Z" fill="#1a1a1a" />
            <path d="M 78 270 L 100 270" stroke="#E60012" strokeWidth="1" opacity="0.6" />
            <rect x="86" y="260" width="6" height="3" rx="1" fill="#E60012" opacity="0.8" />
          </motion.g>

          {/* Right leg */}
          <motion.g
            animate={
              pose === "walk"
                ? { x: 6, y: [0, -4, 0] }
                : pose === "combat"
                ? { x: 8 }
                : { x: 0, y: 0 }
            }
            transition={
              pose === "walk"
                ? { duration: 0.6, repeat: Infinity, repeatType: "reverse", delay: 0.3 }
                : { type: "spring", stiffness: 200, damping: 15 }
            }
          >
            <rect x="104" y="210" width="14" height="55" rx="4" fill="#0d0d1a" />
            <path d="M 100 255 L 100 270 Q 100 278 108 278 L 120 278 Q 122 278 122 270 L 122 255 Z" fill="#1a1a1a" />
            <path d="M 100 270 L 122 270" stroke="#E60012" strokeWidth="1" opacity="0.6" />
            <rect x="108" y="260" width="6" height="3" rx="1" fill="#E60012" opacity="0.8" />
          </motion.g>
        </g>

        {/* === BODY / COAT === */}
        <g>
          <path
            d="M 72 120 Q 70 160 68 210 L 132 210 Q 130 160 128 120 Z"
            fill={`url(#coatGrad-${pose})`}
          />
          <path
            d="M 72 120 Q 80 115 100 112 Q 120 115 128 120 L 125 135 Q 100 128 75 135 Z"
            fill="#E60012"
            opacity="0.9"
          />
          <rect x="72" y="170" width="56" height="5" rx="1" fill="#1a1a1a" />
          <rect x="95" y="168" width="10" height="9" rx="2" fill="#E60012" filter={`url(#glow-${pose})`} />
          <circle cx="100" cy="145" r="2" fill="#E60012" opacity="0.7" />
          <circle cx="100" cy="158" r="2" fill="#E60012" opacity="0.7" />
        </g>

        {/* === ARMS === */}
        <g>
          {/* Left arm */}
          <motion.g
            animate={
              pose === "combat"
                ? { rotate: [-45, -60, -30, -45] }
                : pose === "cast"
                ? { rotate: [30, 40, 20, 30] }
                : pose === "hack"
                ? { rotate: [10, 15, 5, 10] }
                : pose === "read"
                ? { rotate: [20, 25, 15, 20] }
                : pose === "walk"
                ? { rotate: [15, 5, 25, 15] }
                : { rotate: [0, -2, 2, 0] }
            }
            transition={{
              duration: pose === "combat" ? 1.2 : pose === "walk" ? 0.8 : 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "72px 125px" }}
          >
            <path d="M 72 125 Q 55 155 48 185" stroke="#0d0d1a" strokeWidth="12" strokeLinecap="round" fill="none" />
            <circle cx="48" cy="185" r="7" fill="#1a1a1a" />
            <circle cx="48" cy="185" r="5" fill="#2d2d2d" />
            {pose === "combat" && (
              <g filter={`url(#redGlow-${pose})`}>
                <motion.g
                  animate={{ rotate: [0, -20, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "48px 185px" }}
                >
                  <rect x="42" y="170" width="2" height="20" rx="1" fill="#C0C0C0" />
                  <rect x="40" y="168" width="6" height="4" rx="1" fill="#E60012" />
                </motion.g>
              </g>
            )}
            {pose === "read" && (
              <g>
                <rect x="30" y="175" width="18" height="14" rx="1" fill="#F5F5F5" stroke="#E60012" strokeWidth="0.5" />
                <line x1="33" y1="179" x2="45" y2="179" stroke="#1a1a1a" strokeWidth="0.5" />
                <line x1="33" y1="182" x2="42" y2="182" stroke="#1a1a1a" strokeWidth="0.5" />
                <line x1="33" y1="185" x2="44" y2="185" stroke="#1a1a1a" strokeWidth="0.5" />
              </g>
            )}
          </motion.g>

          {/* Right arm */}
          <motion.g
            animate={
              pose === "combat"
                ? { rotate: [22, 35, 10, 22] }
                : pose === "cast"
                ? { rotate: [-15, -25, -5, -15] }
                : pose === "hack"
                ? { rotate: [-5, -10, 0, -5] }
                : pose === "walk"
                ? { rotate: [-10, 0, -20, -10] }
                : { rotate: [0, 1, -1, 0] }
            }
            transition={{
              duration: pose === "combat" ? 1.2 : pose === "walk" ? 0.8 : 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: pose === "walk" ? 0.4 : 0,
            }}
            style={{ transformOrigin: "128px 125px" }}
          >
            <path d="M 128 125 Q 145 155 152 185" stroke="#0d0d1a" strokeWidth="12" strokeLinecap="round" fill="none" />
            <circle cx="152" cy="185" r="7" fill="#1a1a1a" />
            <circle cx="152" cy="185" r="5" fill="#2d2d2d" />
            {pose === "combat" && (
              <g>
                <rect x="152" y="175" width="18" height="6" rx="2" fill="#2d2d2d" />
                <rect x="168" y="177" width="4" height="2" rx="1" fill="#1a1a1a" />
                {/* Muzzle flash */}
                <motion.circle
                  cx="174"
                  cy="178"
                  r="4"
                  fill="#FFD700"
                  animate={{ opacity: [0, 0.8, 0], r: [2, 6, 2] }}
                  transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1 }}
                />
              </g>
            )}
            {pose === "cast" && (
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "152px 185px" }}
              >
                <circle cx="152" cy="185" r="15" fill="none" stroke="#8B5CF6" strokeWidth="1" opacity="0.6" />
                <circle cx="152" cy="185" r="10" fill="none" stroke="#E60012" strokeWidth="0.5" opacity="0.4" />
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <circle
                    key={angle}
                    cx={152 + Math.cos((angle * Math.PI) / 180) * 12}
                    cy={185 + Math.sin((angle * Math.PI) / 180) * 12}
                    r="1.5"
                    fill="#FFD700"
                  />
                ))}
              </motion.g>
            )}
            {pose === "hack" && (
              <g>
                <rect x="140" y="178" width="22" height="14" rx="2" fill="#1a1a2e" stroke="#38BDF8" strokeWidth="0.5" />
                <rect x="142" y="180" width="18" height="9" rx="1" fill="#0a1628" />
                <motion.g
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <line x1="144" y1="183" x2="152" y2="183" stroke="#38BDF8" strokeWidth="0.5" />
                  <line x1="144" y1="185" x2="156" y2="185" stroke="#059669" strokeWidth="0.5" />
                  <line x1="144" y1="187" x2="149" y2="187" stroke="#E60012" strokeWidth="0.5" />
                </motion.g>
                {/* Typing fingers */}
                <motion.g
                  animate={{ y: [0, -1, 0] }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                >
                  <circle cx="148" cy="193" r="1" fill="#d4a574" />
                  <circle cx="152" cy="193" r="1" fill="#d4a574" />
                </motion.g>
              </g>
            )}
          </motion.g>
        </g>

        {/* === HEAD === */}
        <motion.g
          animate={
            pose === "read"
              ? { rotate: [15, 18, 12, 15] }
              : pose === "hack"
              ? { rotate: [-3, -5, -1, -3] }
              : pose === "combat"
              ? { rotate: [-5, -8, -2, -5] }
              : { rotate: 0 }
          }
          transition={{
            duration: pose === "combat" ? 1.2 : 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "100px 85px" }}
        >
          <rect x="93" y="105" width="14" height="12" rx="3" fill="#d4a574" />
          <ellipse cx="100" cy="80" rx="24" ry="28" fill="#d4a574" />

          {/* Hair */}
          <path
            d="M 76 75 Q 75 55 85 48 Q 95 42 100 42 Q 105 42 115 48 Q 125 55 124 75 Q 120 68 110 65 Q 100 63 90 65 Q 80 68 76 75 Z"
            fill="#1a1a1a"
          />
          <path d="M 80 60 L 72 50 L 82 58" fill="#1a1a1a" />
          <path d="M 120 60 L 128 50 L 118 58" fill="#1a1a1a" />
          <path d="M 95 48 L 90 38 L 98 46" fill="#1a1a1a" />
          <path d="M 105 48 L 110 38 L 102 46" fill="#1a1a1a" />

          {/* Mask */}
          <path
            d="M 82 72 Q 85 68 100 66 Q 115 68 118 72 L 116 80 Q 108 82 100 82 Q 92 82 84 80 Z"
            fill={`url(#maskGrad-${pose})`}
            stroke="#E60012"
            strokeWidth="0.5"
          />
          <ellipse cx="90" cy="74" rx="6" ry="4" fill="#0a0a0a" />
          <ellipse cx="110" cy="74" rx="6" ry="4" fill="#0a0a0a" />

          {/* Glowing eyes */}
          <motion.ellipse
            cx="90"
            cy="74"
            rx="3"
            ry="2"
            fill={glowColor}
            filter={`url(#redGlow-${pose})`}
            animate={{ opacity: [0.5, 1, 0.5], ry: [2, 2.5, 2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.ellipse
            cx="110"
            cy="74"
            rx="3"
            ry="2"
            fill={glowColor}
            filter={`url(#redGlow-${pose})`}
            animate={{ opacity: [0.5, 1, 0.5], ry: [2, 2.5, 2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />

          <path d="M 88 70 Q 100 65 112 70" fill="none" stroke="#E60012" strokeWidth="0.5" opacity="0.5" />

          {/* Expression based on pose */}
          {pose === "combat" ? (
            <path d="M 92 90 Q 100 87 108 90" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
          ) : pose === "hack" ? (
            <path d="M 94 90 L 106 90" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
          ) : (
            <path d="M 92 90 Q 100 95 108 90" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
          )}
        </motion.g>

        {/* === ENVIRONMENT INTERACTION EFFECTS === */}
        {pose === "combat" && (
          <>
            {/* Slash trail */}
            <motion.path
              d="M 30 160 Q 50 140 70 160"
              fill="none"
              stroke="#E60012"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 0], opacity: [0, 0.8, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
            />
            {/* Impact sparks */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.circle
                key={i}
                cx={35 + Math.random() * 30}
                cy={150 + Math.random() * 20}
                r="1"
                fill="#FFD700"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: [0, -15] }}
                transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </>
        )}

        {pose === "cast" && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0], y: [0, -30, -60] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <text x="145" y="160" fill="#8B5CF6" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.7">
              arcane
            </text>
            <text x="160" y="155" fill="#A78BFA" fontSize="5" fontFamily="monospace" textAnchor="middle" opacity="0.5">
              power
            </text>
          </motion.g>
        )}

        {pose === "hack" && (
          <>
            {/* Data streams */}
            {[0, 1, 2].map((i) => (
              <motion.text
                key={i}
                x={135 + i * 12}
                y={170}
                fill="#38BDF8"
                fontSize="4"
                fontFamily="monospace"
                opacity="0.4"
                animate={{ y: [170, 160, 170], opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              >
                {["01", "10", "11"][i]}
              </motion.text>
            ))}
          </>
        )}

        {pose === "read" && (
          <>
            {/* Reading sparkles */}
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                cx={35 + i * 6}
                cy={170 - i * 4}
                r="0.8"
                fill="#FFD700"
                animate={{ opacity: [0, 0.8, 0], y: [0, -8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
              />
            ))}
          </>
        )}

        {pose === "walk" && (
          <>
            {/* Dust particles */}
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                cx={90 + i * 10}
                cy={280}
                r="1.5"
                fill="#d4a574"
                opacity="0.3"
                animate={{ x: [-10, -25], opacity: [0.3, 0], y: [0, -5] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </>
        )}
      </svg>
    </motion.div>
  );
}
