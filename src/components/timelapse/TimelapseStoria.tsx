import { motion, AnimatePresence } from 'motion/react';
import { useTimelapse } from '../../hooks/useTimelapse';
import { IMAGES_RESOURCES } from '../../data';
import { BookOpen, X } from 'lucide-react';
import CodeEditorOverlay from './CodeEditorOverlay';

export default function TimelapseStoria({ isActive, isAutoplay, onComplete }: { isActive?: boolean, isAutoplay?: boolean, onComplete?: () => void }) {
  const step = useTimelapse(22, isActive ?? true, isAutoplay ?? false, onComplete);

  const getCodeSnippet = (s: number) => {
    switch (s) {
      case 0: return "";
      case 1: return "// Section scaffolding\ndisplay: flex;\njustify-content: center;";
      case 2: return "<div className=\"left-box\" />";
      case 3: return "content: 'NUESTRA HISTORIA';\n/* adding paragraph... */";
      case 4: return "font-family: 'Playfair Display', serif;\nfont-weight: 900;";
      case 5: return "text-transform: uppercase;\ncolor: #1A1A1A;\nfont-size: 3rem;";
      case 6: return "/* Style the paragraph */\nline-height: 1.6;\ncolor: #4B5563;";
      case 7: return "<button>Leer Manifiesto</button>\nbackground: #E5E7EB;";
      case 8: return "button {\n  background: #E86A33;\n  color: white;\n  box-shadow: 4px 4px 0 #000;\n}";
      case 9: return "<div className=\"polaroid\" />\nwidth: 384px;\naspect-ratio: 1/1;";
      case 10: return "<img src=\"pepperoni.jpg\" />";
      case 11: return "/* Add brutalist aesthetics */\nborder: 2px solid #000;\nbox-shadow: 8px 8px 0 rgba(0,0,0,0.1);";
      case 12: return "/* Tilt the polaroid */\ntransform: rotate(-6deg);";
      case 13: return "/* Storia section complete */\nopacity: 1;";
      
      // Modal Steps
      case 14: return "// Simulating User Click...\ndocument.getElementById('btn').click();";
      case 15: return "/* Open Manifesto Modal */\n<div className=\"modal-overlay\" />";
      case 16: return "/* Render Modal Box */\n<div className=\"modal-content\" />\nbackground: white;";
      case 17: return "/* Add Header */\n<h3>EL MANIFIESTO PICCOLINA</h3>\nfont-family: 'Playfair Display';";
      case 18: return "/* Load manifesto text */\n<p>01. LA CORTEZA...</p>\nfont-family: monospace;";
      case 19: return "/* Add close button */\n<button className=\"btn-close\">Entendido</button>\nbackground: #e8563a;";
      case 20: return "/* Modal Complete */\nconsole.log('Manifesto ready');";
      case 21: return "/* Simulating Close Click... */\nmodal.close();";
      case 22: return "/* Section Finished */";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen">
      <CodeEditorOverlay isVisible={isActive ?? true} codeSnippet={getCodeSnippet(step)} />

      <section className="relative py-20 min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background split */}
        <div className={`absolute top-0 left-0 w-full h-1/2 transition-colors duration-[1500ms] ${
          step >= 1 ? 'bg-background border-b border-on-surface' : 'bg-white'
        }`} />
        <div className={`absolute bottom-0 left-0 w-full h-1/2 transition-colors duration-[1500ms] ${
          step >= 1 ? 'bg-primary' : 'bg-gray-50'
        }`} />

        <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 w-full">
          
          {/* Left Box */}
          <motion.div 
            className={`flex-1 p-8 md:p-10 rounded-none transition-all duration-[1500ms] ease-out ${
              step >= 2 ? 'bg-white opacity-100 translate-y-0' : 'bg-transparent opacity-0 translate-y-10'
            } ${step >= 8 ? 'brutalist-shadow brutalist-border' : 'border border-gray-200'}`}
          >
            <span className={`text-xs px-2 py-1 uppercase rounded-sm font-mono tracking-widest mb-3 inline-block transition-colors duration-[1500ms] ${
              step >= 3 ? (step >= 8 ? 'bg-secondary-container text-on-secondary-container font-extrabold' : 'bg-gray-200 text-gray-500 font-normal') : 'opacity-0'
            }`}>
              TALLER ARTESANAL
            </span>
            
            <h2 className={`transition-all duration-[1500ms] mb-6 leading-none ${
              step >= 4 ? 'font-display font-extrabold' : 'font-sans font-normal'
            } ${
              step >= 5 ? 'text-3xl md:text-5xl uppercase tracking-tight text-on-surface' : 'text-2xl text-gray-400'
            } ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
              NUESTRA HISTORIA
            </h2>
            
            <p className={`text-sm md:text-base leading-relaxed mb-8 transition-colors duration-[1500ms] ${
              step >= 6 ? 'font-sans text-on-surface-variant font-medium' : 'font-sans text-gray-300'
            } ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
              Nacimos en un pequeño garaje de Barcelona, obsesionados únicamente por dar vida a la costra de masa madre perfecta. No somos una cadena masiva corporativa, somos un taller de sabor comprometido con la honestidad gastronómica. Cada una de nuestras pizzas es una estructura física diseñada para colapsar deliciosamente en tu paladar.
            </p>
            
            <button className={`px-6 py-3.5 flex items-center gap-2 transition-all duration-[1500ms] ${
              step >= 8 ? 'bg-secondary-container text-on-secondary-container font-display font-extrabold text-xs tracking-widest uppercase brutalist-border brutalist-shadow-hover' : 'bg-gray-100 text-gray-400 font-sans border border-gray-200'
            } ${step >= 7 ? 'opacity-100' : 'opacity-0'} ${step === 14 ? 'scale-95 bg-primary text-white' : ''}`}>
              {step >= 8 && <BookOpen className="w-4 h-4 text-primary" />}
              Leer Manifiesto
            </button>
          </motion.div>

          {/* Right Polaroid */}
          <div className="flex-1 relative flex items-center justify-center w-full">
            <motion.div
              className={`bg-white p-4 transition-all duration-[1500ms] ease-out max-w-sm select-none ${
                step >= 12 ? '-rotate-6' : 'rotate-0'
              } ${step >= 11 ? 'brutalist-border brutalist-shadow' : 'border border-gray-200'}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: step >= 9 ? 1 : 0, 
                scale: step >= 9 ? 1 : 0.8 
              }}
            >
              <div className={`w-full aspect-square flex items-center justify-center rounded-sm transition-colors duration-[1500ms] ${
                step >= 10 ? 'bg-transparent' : 'bg-gray-100'
              }`}>
                {step >= 10 && (
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    src={IMAGES_RESOURCES.storyPepperoni}
                    alt="Pepperoni artesanal"
                    className="w-full object-cover border border-on-surface/5"
                    style={{ clipPath: 'circle(46% at 50% 50%)' }}
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
              
              <div className={`pt-4 text-center transition-opacity duration-[1500ms] ${step >= 13 ? 'opacity-100' : 'opacity-0'}`}>
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-on-surface/80">PIZZA Nº 02 / PEPPERONI</p>
                <p className="font-display font-black text-xs text-primary uppercase">Cerezo & Roble • Horno de Leña</p>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Modal Animation */}
        <AnimatePresence>
          {step >= 15 && step < 22 && (
            <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-on-surface/60 backdrop-blur-sm"
              />
              
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                className={`relative w-full max-w-xl p-6 md:p-8 z-10 transition-all duration-[1500ms] ${
                  step >= 16 ? 'bg-surface-lowest brutalist-border brutalist-shadow rounded-none' : 'bg-gray-200 border-transparent rounded-lg shadow-none'
                }`}
              >
                <div className={`space-y-6 pt-4 font-semibold text-sm transition-opacity duration-[1500ms] ${step >= 17 ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="text-center">
                    <span className="text-primary font-mono text-xs tracking-widest uppercase">[ NUESTRO COMPROMISO ]</span>
                    <h3 className={`uppercase text-on-surface mt-1 transition-all duration-[1500ms] ${
                      step >= 17 ? 'font-display font-black text-2xl md:text-3xl' : 'font-sans font-normal text-xl'
                    }`}>
                      EL MANIFIESTO PICCOLINA
                    </h3>
                  </div>

                  <div className={`space-y-4 text-xs leading-relaxed bg-surface-lowest p-5 transition-all duration-[1500ms] ${
                    step >= 18 ? 'font-mono text-on-surface-variant border border-dashed border-on-surface/20 opacity-100' : 'font-sans text-gray-300 opacity-0'
                  }`}>
                    <p><strong className="text-primary font-bold">01. LA CORTEZA:</strong> 48 horas de fermentación fría...</p>
                    <p><strong className="text-primary font-bold">02. LOS TOMATES:</strong> San Marzano ecológicos...</p>
                    <p><strong className="text-primary font-bold">03. EL CALOR:</strong> Horno de piedra...</p>
                  </div>

                  <button
                    className={`w-full py-3 text-xs tracking-widest uppercase text-center transition-all duration-[1500ms] ${
                      step >= 19 ? 'bg-primary text-background font-display font-bold brutalist-border brutalist-shadow opacity-100' : 'bg-gray-300 text-gray-500 font-sans border-transparent opacity-0'
                    } ${step === 21 ? 'scale-95 bg-black' : ''}`}
                  >
                    Entendido, ¡Quiero Pizza!
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Helper overlay */}
        {step < 22 && !isAutoplay && (
          <div className="fixed top-2 left-2 text-[10px] font-mono text-gray-400 opacity-50 select-none pointer-events-none z-50">
            TIMELAPSE MODE [STORIA] - STEP {step}/22
          </div>
        )}

      </section>
    </div>
  );
}
