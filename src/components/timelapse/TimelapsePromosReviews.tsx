import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTimelapse } from '../../hooks/useTimelapse';
import { Star, ArrowRight } from 'lucide-react';
import CodeEditorOverlay from './CodeEditorOverlay';

const PROMO_TEXTS = [
  "20% DTO RECOGIDA LOCAL",
  "NUEVA PIZZA DE TEMPORADA",
  "MIÉRCOLES MITAD DE PRECIO",
  "ENVÍO GRATIS > 25€"
];

const REVIEWS = [
  { id: 1, author: "Mateo R.", text: "La mejor masa madre que he probado en Barcelona. El borde inflado y quemadito es espectacular." },
  { id: 2, author: "Laura G.", text: "Auténtico sabor a leña. Ingredientes de primerísima calidad." },
  { id: 3, author: "Carlos M.", text: "Local pequeñito pero con un encanto brutal. La pizza Piccolina es obligatoria." }
];

export default function TimelapsePromosReviews({ isActive, isAutoplay, onComplete }: { isActive?: boolean, isAutoplay?: boolean, onComplete?: () => void }) {
  const step = useTimelapse(15, isActive ?? true, isAutoplay ?? false, onComplete);
  
  // Interaction state for reviews
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // Auto-advance reviews during the specific step
  useEffect(() => {
    if (step === 12) {
      const t = setTimeout(() => setActiveReviewIndex(1), 800);
      return () => clearTimeout(t);
    }
    if (step === 13) {
      const t = setTimeout(() => setActiveReviewIndex(2), 800);
      return () => clearTimeout(t);
    }
    if (step < 12) {
      setActiveReviewIndex(0);
    }
  }, [step]);

  const getCodeSnippet = (s: number) => {
    switch (s) {
      case 0: return "";
      case 1: return "// Mount Promotional Marquee\n<div className=\"marquee-wrapper\" />";
      case 2: return "/* Load Promo Texts */\nconst promos = fetchPromos();";
      case 3: return "/* Activate CSS Animation */\nanimation: scroll-left 20s linear infinite;";
      case 4: return "// Mount Reviews Section\n<section className=\"reviews\" />\nbackground: #F9FAFB;";
      case 5: return "/* Setup Layout */\ndisplay: flex;\njustify-content: space-between;";
      case 6: return "/* Typography */\nfont-family: 'Playfair Display';\nfont-size: 3rem;";
      case 7: return "/* Fetch Reviews Data... */\n<div className=\"cards-container\" />";
      case 8: return "/* Render Review Cards */\ncards.map(review => <Card />)";
      case 9: return "/* Apply Stack Layout */\nposition: absolute;\ntransform: translateY(index * 5px);";
      case 10: return "/* Polish Cards */\nbackground: white;\nbox-shadow: brutalist;\nopacity: 1;";
      case 11: return "/* Simulating User Interaction... */\ndocument.getElementById('next').click();";
      case 12: return "nextReview();\n// Removing top card...";
      case 13: return "nextReview();\n// Showing last review";
      case 14: return "/* Section Finished */";
      default: return "";
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${step >= 4 ? 'bg-background' : 'bg-white'}`}>
      <CodeEditorOverlay isVisible={isActive ?? true} codeSnippet={getCodeSnippet(step)} />

      {/* Marquee Section */}
      <div className={`relative overflow-hidden flex items-center h-12 transition-all duration-[1500ms] ${
        step >= 1 ? 'bg-secondary-container border-b border-on-surface opacity-100' : 'bg-gray-200 border-transparent opacity-0'
      }`}>
        <div className={`flex whitespace-nowrap items-center transition-opacity duration-1000 ${
          step >= 2 ? 'opacity-100' : 'opacity-0'
        } ${step >= 3 ? 'animate-marquee' : ''}`}>
          {[...PROMO_TEXTS, ...PROMO_TEXTS, ...PROMO_TEXTS].map((text, i) => (
            <div key={i} className="flex items-center mx-4">
              <span className={`text-[10px] tracking-widest uppercase transition-all duration-[1500ms] ${
                step >= 2 ? 'font-mono font-black text-on-secondary-container' : 'font-sans text-gray-400'
              }`}>
                {text}
              </span>
              <span className={`mx-4 text-xs transition-colors duration-1000 ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <section className={`py-24 px-6 md:px-12 max-w-7xl mx-auto transition-opacity duration-1000 ${
        step >= 4 ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className={`flex flex-col md:flex-row items-center gap-12 transition-all duration-[1500ms] ${
          step >= 5 ? 'opacity-100' : 'opacity-0'
        }`}>
          
          {/* Left Text */}
          <div className="flex-1 w-full text-center md:text-left">
            <h2 className={`uppercase tracking-tight leading-none mb-6 transition-all duration-[1500ms] ${
              step >= 6 ? 'font-display font-black text-4xl md:text-6xl text-on-surface' : 'font-sans font-normal text-2xl text-gray-400'
            }`}>
              LA GENTE HABLA
            </h2>
            <p className="font-sans text-on-surface-variant max-w-md mx-auto md:mx-0">
              No te fíes de nosotros, fíate de los que ya han probado nuestra costra perfecta.
            </p>
          </div>

          {/* Right Cards Stack */}
          <div className={`flex-1 w-full relative h-[250px] flex items-center justify-center transition-all duration-[1500ms] ${
            step >= 7 ? 'opacity-100' : 'opacity-0'
          }`}>
            <AnimatePresence>
              {REVIEWS.map((review, index) => {
                const isActiveReview = index === activeReviewIndex;
                const isPast = index < activeReviewIndex;
                
                // Hide past reviews
                if (isPast) return null;

                // Calculate visual stacking offset for upcoming reviews
                const offset = index - activeReviewIndex;
                const topOffset = step >= 9 ? offset * 12 : 0;
                const scale = step >= 9 ? 1 - offset * 0.05 : 1;
                const zIndex = 10 - offset;

                return (
                  <motion.div
                    key={review.id}
                    className={`absolute w-full max-w-sm p-8 transition-all duration-[1500ms] ${
                      step >= 10 ? 'bg-surface-lowest brutalist-border brutalist-shadow rounded-none' : 'bg-gray-200 border-transparent rounded-xl shadow-none'
                    }`}
                    style={{ zIndex }}
                    initial={step >= 12 ? { opacity: 0, x: 100 } : {}}
                    animate={{
                      top: topOffset,
                      scale: scale,
                      opacity: step >= 8 ? (step >= 10 ? 1 : 0.8) : 0,
                      rotate: step >= 10 ? (offset === 0 ? 0 : (offset % 2 === 0 ? 2 : -2)) : 0
                    }}
                    exit={{ opacity: 0, x: -100, rotate: -15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className={`flex text-primary mb-4 transition-opacity duration-1000 ${step >= 8 ? 'opacity-100' : 'opacity-0'}`}>
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className={`text-lg mb-6 leading-relaxed transition-all duration-1000 ${
                      step >= 8 ? 'font-display font-medium text-on-surface' : 'font-sans text-gray-400'
                    }`}>
                      "{review.text}"
                    </p>
                    <p className={`font-mono text-xs font-bold uppercase transition-colors duration-1000 ${
                      step >= 8 ? 'text-on-surface/60' : 'text-gray-500'
                    }`}>
                      — {review.author}
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Simulated interaction controls */}
            <div className={`absolute -bottom-8 right-0 flex gap-2 transition-opacity duration-1000 ${
              step >= 10 ? 'opacity-100' : 'opacity-0'
            }`}>
              <button 
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-500 ${
                  step === 11 || step === 12 ? 'bg-primary border-primary text-white scale-95' : 'bg-surface-low border-on-surface text-on-surface'
                }`}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Helper overlay */}
      {step < 15 && !isAutoplay && (
        <div className="fixed top-2 left-2 text-[10px] font-mono text-gray-400 opacity-50 select-none pointer-events-none z-50">
          TIMELAPSE MODE [PROMOS & REVIEWS] - STEP {step}/15
        </div>
      )}
    </div>
  );
}
