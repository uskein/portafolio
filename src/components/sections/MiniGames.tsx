import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, RotateCcw } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

function MemoryGame() {
  const [cards, setCards] = useState([
    { id: 1, value: "A", flipped: false, matched: false },
    { id: 2, value: "B", flipped: false, matched: false },
    { id: 3, value: "A", flipped: false, matched: false },
    { id: 4, value: "B", flipped: false, matched: false },
    { id: 5, value: "C", flipped: false, matched: false },
    { id: 6, value: "D", flipped: false, matched: false },
    { id: 7, value: "C", flipped: false, matched: false },
    { id: 8, value: "D", flipped: false, matched: false },
  ].sort(() => Math.random() - 0.5));
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matched, setMatched] = useState(0);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(id)) return;
    
    const newCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c);
    setCards(newCards);
    setFlippedCards([...flippedCards, id]);

    if (flippedCards.length === 1) {
      setMoves(moves + 1);
      const firstCard = cards.find(c => c.id === flippedCards[0]);
      const secondCard = cards.find(c => c.id === id);
      
      if (firstCard?.value === secondCard?.value) {
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.value === firstCard?.value ? { ...c, matched: true } : c
          ));
          setMatched(matched + 1);
          setFlippedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            flippedCards.includes(c.id) || c.id === id ? { ...c, flipped: false } : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setCards(cards.sort(() => Math.random() - 0.5).map(c => ({ ...c, flipped: false, matched: false })));
    setFlippedCards([]);
    setMoves(0);
    setMatched(0);
  };

  const symbols = ["🔥", "💧", "⚡", "🌿"];

  return (
    <div className="bg-white border-4 border-jrpg-navy">
      <div className="bg-jrpg-navy px-5 py-3 flex items-center justify-between">
        <span className="font-pixel text-[10px] text-jrpg-gold">MEMORY MATCH</span>
        <div className="flex items-center gap-4">
          <span className="font-pixel text-[9px] text-white/60">MOVES: {moves}</span>
          <span className="font-pixel text-[9px] text-jrpg-gold">MATCHED: {matched}/4</span>
        </div>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-4 gap-3">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              whileHover={{ scale: card.flipped || card.matched ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`aspect-square flex items-center justify-center border-4 cursor-pointer transition-all ${
                card.flipped || card.matched 
                  ? 'bg-gradient-to-br from-jrpg-gold/20 to-yellow-100 border-jrpg-gold' 
                  : 'bg-gradient-to-br from-jrpg-navy to-blue-900 border-jrpg-navy hover:border-jrpg-gold'
              }`}
            >
              {card.flipped || card.matched ? (
                <span className="text-2xl">{symbols[["A", "B", "C", "D"].indexOf(card.value)]}</span>
              ) : (
                <span className="font-pixel text-xl text-white/30">?</span>
              )}
            </motion.div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetGame}
          className="mt-4 w-full py-2.5 bg-jrpg-navy text-white font-pixel text-[10px] tracking-wider flex items-center justify-center gap-2 hover:bg-jrpg-navy/90 transition-colors"
        >
          <RotateCcw size={14} />
          <span>RESET GAME</span>
        </motion.button>
        {matched === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-4 bg-jrpg-gold/20 border-2 border-jrpg-gold text-center"
          >
            <Trophy size={24} className="text-jrpg-gold mx-auto mb-2" />
            <p className="font-pixel text-[11px] text-jrpg-navy">VICTORY!</p>
            <p className="font-pixel text-[9px] text-gray-600">Completed in {moves} moves</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function MiniGames() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();

  return (
    <section className="min-h-screen pt-28 pb-24 pl-44 pr-8 relative bg-bg pixel-grid-bg overflow-x-hidden">
      <div ref={titleRef} className="text-center mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={titleVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }}>
          <div className="inline-block relative">
            <div className="bg-white border-4 border-jrpg-navy relative">
              <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500" />
              <div className="px-12 py-6">
                <p className="font-pixel text-xs text-jrpg-red tracking-widest mb-2">[ MINI GAMES ]</p>
                <h2 className="font-pixel text-3xl md:text-4xl text-jrpg-navy tracking-wider">GAME CORNER</h2>
                <p className="font-pixel text-[10px] text-gray-500 mt-2">ENTERTAINMENT // BRAIN TRAINING</p>
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

      <div className="max-w-2xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="hidden lg:block lg:col-span-1" />
          <div className="lg:col-span-11">
            <MemoryGame />
          </div>
        </div>
      </div>
    </section>
  );
}
