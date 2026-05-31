import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTimelapse } from '../../hooks/useTimelapse';
import { Star, ArrowRight } from 'lucide-react';
import { IMAGES_RESOURCES } from '../../data';
import CodeEditorOverlay from './CodeEditorOverlay';
import DesignCursor from './DesignCursor';
import ColorSwatchPicker from './ColorSwatchPicker';
import TypewriterText from './TypewriterText';

const PROMO_TEXTS = [
  "20% DTO RECOGIDA LOCAL",
  "NUEVA PIZZA DE TEMPORADA",
  "MIÉRCOLES MITAD DE PRECIO",
  "ENVÍO GRATIS > 25€"
];

const REVIEWS = [
  { id: 1, author: "Mateo R.", text: "La mejor masa madre que he probado en Barcelona. El borde inflado y quemadito es espectacular." },
  { id: 2, author: "Laura G.", text: "Auténtico sabor a leña. Ingredientes de primerísima calidad." },
  { id: 3, author: "Carlos M.", text: "Local pequeñito pero con un encanto brutal. La pizza Trattoria es obligatoria." }
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

  // --- Design Cursor choreography ---
  const getCursorState = (s: number) => {
    switch (s) {
      case 3: return { x: '60%', y: '12%', visible: true, clicking: false, dragging: true, label: 'Scroll' };
      case 5: return { x: '40%', y: '55%', visible: true, clicking: false, dragging: true, label: 'Layout' };
      case 7: return { x: '70%', y: '55%', visible: true, clicking: false, dragging: true, label: 'Container' };
      case 10: return { x: '72%', y: '60%', visible: true, clicking: true, dragging: false, label: '' };
      case 12: return { x: '75%', y: '72%', visible: true, clicking: true, dragging: false, label: 'Next' };
      case 13: return { x: '75%', y: '72%', visible: true, clicking: true, dragging: false, label: 'Last' };
      default: return { x: '80%', y: '80%', visible: false, clicking: false, dragging: false, label: '' };
    }
  };

  const cursorState = getCursorState(step);

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${step >= 4 ? 'bg-background' : 'bg-white'}`}>
      <CodeEditorOverlay isVisible={isActive ?? true} codeSnippet={getCodeSnippet(step)} />

      {/* Design Cursor */}
      <DesignCursor
        x={cursorState.x}
        y={cursorState.y}
        isVisible={cursorState.visible}
        isClicking={cursorState.clicking}
        isDragging={cursorState.dragging}
        label={cursorState.label}
      />

      {/* Color swatch for card styling (Step 10) */}
      <ColorSwatchPicker
        isVisible={step === 10}
        colors={['#e5e7eb', '#f5f2ea', '#ffffff']}
        activeIndex={2}
        position={{ x: '78%', y: '50%' }}
        colorName="Card bg: white"
      />

      {/* Marquee Section */}
      <motion.section 
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: step >= 1 ? 1 : 0, opacity: step >= 1 ? 1 : 0 }}
        transition={{ 
          scaleY: { type: "spring", stiffness: 120, damping: 15 },
          opacity: { duration: 0 }
        }}
        style={{ originY: 0.5 }}
        className={`relative overflow-hidden transition-all duration-[1000ms] ${
          step >= 1 ? 'bg-on-surface py-12' : 'bg-gray-200 py-2 border-transparent'
        }`}
      >
        <div className="flex flex-col gap-4">
          {/* Row 1 */}
          <div className="flex whitespace-nowrap overflow-hidden select-none">
            <div className={`flex ${step >= 3 ? 'animate-marquee' : ''}`}>
              {[...Array(6)].map((_, i) => (
                <span key={i} className={`font-display text-7xl md:text-8xl font-extrabold mx-8 transition-colors duration-1000 ${
                  step >= 2 ? 'text-white opacity-15' : 'text-gray-600'
                }`}>
                  PIZZA ARTESANAL
                </span>
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex whitespace-nowrap overflow-hidden select-none">
            <div className={`flex ${step >= 3 ? 'animate-marquee-reverse' : ''}`}>
              {[...Array(6)].map((_, i) => (
                <span key={i} className={`font-display text-7xl md:text-8xl font-black mx-8 italic uppercase tracking-wider transition-colors duration-1000 ${
                  step >= 2 ? 'text-primary' : 'text-gray-600'
                }`}>
                  DELIVERY NOW
                </span>
              ))}
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex whitespace-nowrap overflow-hidden select-none">
            <div className={`flex ${step >= 3 ? 'animate-marquee' : ''}`}>
              {[...Array(6)].map((_, i) => (
                <span key={i} className={`font-display text-7xl md:text-8xl font-extrabold mx-8 transition-colors duration-1000 ${
                  step >= 2 ? 'text-white opacity-15' : 'text-gray-600'
                }`}>
                  HORNO DE LEÑA
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Interactive 3D Overlays */}
        {step >= 4 && (
          <>
            <motion.img
              src={IMAGES_RESOURCES.heroPizza}
              alt="Artesanal Floating"
              className="absolute top-1/2 left-1/4 -translate-y-1/2 w-36 md:w-48 rotate-45 pointer-events-none drop-shadow-2xl z-10 hidden sm:block opacity-90"
              style={{ clipPath: 'circle(43.5% at 50% 50%)' }}
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                y: ['-55%', '-45%', '-55%'],
                rotate: [45, 55, 45]
              }}
              transition={{
                scale: { type: "spring", stiffness: 150, damping: 12 },
                y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
              }}
              referrerPolicy="no-referrer"
            />
            <motion.img
              src={IMAGES_RESOURCES.storyPepperoni}
              alt="Pepperoni Floating"
              className="absolute top-1/2 right-1/4 -translate-y-1/2 w-44 md:w-56 -rotate-12 pointer-events-none drop-shadow-2xl z-10 hidden sm:block opacity-90"
              style={{ clipPath: 'circle(43.5% at 50% 50%)' }}
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                y: ['-45%', '-55%', '-45%'],
                rotate: [-12, -2, -12]
              }}
              transition={{
                scale: { type: "spring", stiffness: 150, damping: 12 },
                y: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 7, repeat: Infinity, ease: 'easeInOut' }
              }}
              referrerPolicy="no-referrer"
            />
          </>
        )}
      </motion.section>

      {/* Reviews Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Left Text */}
          <div className="flex-1 w-full text-center md:text-left">
            <h2 className={`tracking-tight leading-none mb-6 transition-all duration-1000 ${
              step >= 6 ? 'font-display font-black text-4xl md:text-6xl text-on-surface uppercase' : 'font-serif font-normal text-2xl text-gray-400 capitalize'
            }`}>
              {step >= 6 ? <TypewriterText text="LA GENTE HABLA" speed={25} /> : 'La opinión de la gente'}
            </h2>
            <p className="font-sans text-on-surface-variant max-w-md mx-auto md:mx-0">
              {step >= 6 ? <TypewriterText text="No te fíes de nosotros, fíate de los que ya han probado nuestra costra perfecta." speed={12} /> : ""}
            </p>
          </div>

          {/* Right Cards Stack */}
          <div className="flex-1 w-full relative h-[250px] flex items-center justify-center">
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
                    className={`absolute w-full max-w-sm p-8 transition-all duration-1000 ${
                      step >= 10 ? 'bg-surface-lowest brutalist-border brutalist-shadow rounded-none' : 'bg-transparent border border-dashed border-sky-400 rounded-none'
                    }`}
                    style={{ zIndex }}
                    initial={{ opacity: 0, y: 600, x: 300, scale: 0, rotate: 30 }}
                    animate={{
                      top: topOffset,
                      scale: scale,
                      y: step >= 8 ? 0 : 600,
                      x: step >= 8 ? 0 : 300,
                      opacity: step >= 8 ? 1 : 0,
                      rotate: step >= 10 ? (offset === 0 ? 0 : (offset % 2 === 0 ? 3 : -3)) : 10
                    }}
                    exit={{ opacity: 0, x: -500, y: 100, rotate: -35, scale: 0.8 }}
                    transition={{
                      opacity: { duration: 0 },
                      x: { type: "spring", stiffness: 180, damping: 16 },
                      y: { type: "spring", stiffness: 180, damping: 16 },
                      scale: { type: "spring", stiffness: 180, damping: 16 },
                      rotate: { type: "spring", stiffness: 180, damping: 16 }
                    }}
                  >
                    {step >= 8 ? (
                      <>
                        <div className="flex text-primary mb-4 gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <motion.span
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 200, damping: 10, delay: i * 0.05 }}
                            >
                              <Star className="w-4 h-4 fill-current" />
                            </motion.span>
                          ))}
                        </div>
                        <p className={`mb-6 leading-relaxed ${
                          step >= 10 ? 'font-display font-medium text-lg text-on-surface' : 'font-sans italic text-sm text-sky-500'
                        }`}>
                          <TypewriterText text={`"${review.text}"`} speed={10} />
                        </p>
                        <p className={`font-mono text-xs font-bold uppercase ${
                          step >= 10 ? 'text-on-surface/60' : 'text-sky-400'
                        }`}>
                          <TypewriterText text={`— ${review.author}`} speed={15} delay={400} />
                        </p>
                      </>
                    ) : (
                      <span className="font-mono text-sky-400 text-xs">[cargando reseña...]</span>
                    )}
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
