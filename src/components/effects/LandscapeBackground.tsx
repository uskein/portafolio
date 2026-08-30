import { motion } from "framer-motion";

interface LandscapeProps {
  variant?: "night" | "dawn" | "forest" | "city";
}

export default function LandscapeBackground({ variant = "night" }: LandscapeProps) {
  const skies: Record<string, { top: string; mid: string; bottom: string }> = {
    night: { top: "#e8e8dc", mid: "#deded0", bottom: "#d4d4c4" },
    dawn: { top: "#fff3e0", mid: "#ffe0b2", bottom: "#ffcc80" },
    forest: { top: "#e8f5e9", mid: "#c8e6c9", bottom: "#a5d6a7" },
    city: { top: "#e3f2fd", mid: "#bbdefb", bottom: "#90caf9" },
  };

  const sky = skies[variant];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${sky.top} 0%, ${sky.mid} 50%, ${sky.bottom} 100%)`,
        }}
      />

      {/* Pixel clouds */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {[...Array(8)].map((_, i) => (
          <g key={i} opacity="0.4">
            <rect
              x={`${10 + i * 12}%`}
              y={`${15 + (i % 3) * 8}%`}
              width="60"
              height="12"
              fill="#ffffff"
            />
            <rect
              x={`${10 + i * 12 + 1.5}%`}
              y={`${15 + (i % 3) * 8 - 2}%`}
              width="40"
              height="12"
              fill="#ffffff"
            />
            <rect
              x={`${10 + i * 12 + 0.5}%`}
              y={`${15 + (i % 3) * 8 + 1}%`}
              width="50"
              height="10"
              fill="#ffffff"
            />
          </g>
        ))}
      </svg>

      {/* Distant pixel mountains */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        style={{ height: "50%" }}
      >
        {/* Far mountains - stepped pixel style */}
        <path
          d="M0 400 L0 300 L80 300 L80 260 L160 260 L160 280 L240 280 L240 240 L320 240 L320 260 L400 260 L400 220 L480 220 L480 250 L560 250 L560 200 L640 200 L640 230 L720 230 L720 180 L800 180 L800 210 L880 210 L880 240 L960 240 L960 190 L1040 190 L1040 220 L1120 220 L1120 260 L1200 260 L1200 230 L1280 230 L1280 270 L1360 270 L1360 250 L1440 250 L1440 400 Z"
          fill="#b8b8a8"
          opacity="0.5"
        />

        {/* Mid mountains */}
        <path
          d="M0 400 L0 320 L120 320 L120 290 L240 290 L240 310 L360 310 L360 270 L480 270 L480 300 L600 300 L600 260 L720 260 L720 290 L840 290 L840 250 L960 250 L960 280 L1080 280 L1080 310 L1200 310 L1200 280 L1320 280 L1320 300 L1440 300 L1440 400 Z"
          fill="#a8a898"
          opacity="0.4"
        />

        {/* Pixel trees - far */}
        <g opacity="0.3">
          {[80, 200, 350, 500, 650, 800, 950, 1100, 1250].map((x, i) => (
            <g key={i} transform={`translate(${x}, ${310 - (i % 3) * 10})`}>
              <rect x="-8" y="-24" width="16" height="24" fill={i % 2 === 0 ? "#4ecca3" : "#3da885"} />
              <rect x="-4" y="-32" width="8" height="8" fill={i % 2 === 0 ? "#4ecca3" : "#3da885"} />
              <rect x="-2" y="0" width="4" height="8" fill="#795548" />
            </g>
          ))}
        </g>

        {/* Ground */}
        <rect x="0" y="370" width="1440" height="30" fill="#c8c8b8" />
        <rect x="0" y="375" width="1440" height="2" fill="#b8b8a8" opacity="0.5" />
      </svg>

      {/* Pixel floating elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2"
          style={{
            left: `${15 + i * 15}%`,
            top: `${60 + (i % 3) * 10}%`,
            backgroundColor: ["#f5c542", "#4ecca3", "#e94560", "#00d2d3"][i % 4],
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}
