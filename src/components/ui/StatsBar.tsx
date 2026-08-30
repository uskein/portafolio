import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { cn } from "../../lib/utils";

interface StatsBarProps {
  name: string;
  level: number;
  maxLevel: number;
  delay?: number;
  icon?: string;
}

export default function StatsBar({ name, level, maxLevel, delay = 0, icon }: StatsBarProps) {
  const { ref, isVisible } = useScrollReveal(0.2);
  const percentage = (level / maxLevel) * 100;

  return (
    <div ref={ref} className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          {icon && (
            <span className="text-jrpg-red font-pixel text-[10px]">
              [{icon}]
            </span>
          )}
          <span className="font-pixel text-[10px] tracking-wider text-text-primary uppercase">
            {name}
          </span>
        </div>
        <span className="font-pixel text-[10px] text-jrpg-gold font-bold">
          Lv.{level}
        </span>
      </div>

      <div className="relative h-4 bg-gray-200 border-2 border-gray-400 overflow-hidden">
        <motion.div
          className={cn("absolute inset-y-0 left-0 bg-jrpg-red")}
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
        />
        {/* Pokemon-style tick marks */}
        {Array.from({ length: maxLevel }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-gray-500/30"
            style={{ left: `${((i + 1) / maxLevel) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}
