import { useState } from 'react';
import { Star, ArrowRight, Quote } from 'lucide-react';
import { REVIEWS_DATA } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function Reviews() {
  const [reviews, setReviews] = useState(REVIEWS_DATA);

  // Rotate reviews: Click on the top card to push it to the back
  const cycleReviews = () => {
    setReviews((prev) => {
      const copy = [...prev];
      const bottom = copy.shift(); // remove the front-most card
      if (bottom) {
        copy.push(bottom); // put it at the very back
      }
      return copy;
    });
  };

  return (
    <section className="py-20 px-6 bg-background overflow-hidden border-b border-on-surface">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-16 text-center tracking-tight leading-none uppercase">
          LO QUE DICEN NUESTROS CLIENTES
        </h2>

        {/* Pile Stack Card Container */}
        <div className="relative w-full max-w-md h-[360px] cursor-pointer" onClick={cycleReviews} title="Haz clic en las tarjetas para rotarlas">
          <AnimatePresence mode="popLayout">
            {reviews.map((rev, index) => {
              // The front-most card is the LAST item in our array for DOM stacking, or we can use index
              // Let's determine styling and positions based on position in stack
              // index === 0: Back card
              // index === 1: Middle card
              // index === 2: Front-most card
              const isFront = index === reviews.length - 1;
              const isMiddle = index === reviews.length - 2;
              const isBack = index === 0;

              let rotation = '-rotate-6';
              let translateVal = 'translate-y-0';
              let zIndexVal = 'z-10';
              let scaleVal = 0.95;

              if (isFront) {
                rotation = rev.rotateClass; // Standard custom rotations e.g. -rotate-2
                translateVal = 'translate-y-4 translate-x-1';
                zIndexVal = 'z-30';
                scaleVal = 1;
              } else if (isMiddle) {
                rotation = 'rotate-2';
                translateVal = '-translate-y-1 translate-x-3';
                zIndexVal = 'z-20';
                scaleVal = 0.98;
              } else if (isBack) {
                rotation = '-rotate-12';
                translateVal = '-translate-y-6 -translate-x-3';
                zIndexVal = 'z-10';
                scaleVal = 0.92;
              }

              return (
                <motion.div
                  key={rev.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ 
                    opacity: 1, 
                    scale: scaleVal, 
                  }}
                  exit={{ opacity: 0, scale: 0.8, x: -150, rotate: -45 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 150 }}
                  className={`absolute inset-0 p-6 md:p-8 brutalist-border flex flex-col justify-between ${rev.bgClass} ${rev.textClass} ${rotation} ${translateVal} ${zIndexVal} select-none transition-shadow ${
                    isFront ? 'brutalist-shadow' : 'shadow-md'
                  }`}
                  style={{
                    transformOrigin: 'center bottom'
                  }}
                >
                  <div>
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(rev.stars)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 fill-current`} />
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="font-display font-bold text-xl md:text-2xl leading-relaxed italic mb-6">
                      "{rev.text}"
                    </p>
                  </div>

                  {/* Review Quote symbol and Author Name */}
                  <div className="flex justify-between items-end border-t border-current/15 pt-4">
                    <span className="font-sans text-xs tracking-widest font-black uppercase">
                      — {rev.author}
                    </span>
                    <Quote className="w-8 h-8 opacity-25" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <button 
          onClick={cycleReviews}
          className="mt-12 flex items-center gap-2 text-xs font-mono font-bold uppercase hover:text-primary transition-colors focus:outline-none"
        >
          <span>Toca una tarjeta para ver más opiniones</span>
          <ArrowRight className="w-4 h-4 animate-pulse" />
        </button>
      </div>
    </section>
  );
}
