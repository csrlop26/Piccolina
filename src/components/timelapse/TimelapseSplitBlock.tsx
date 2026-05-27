import { motion, AnimatePresence } from 'motion/react';
import { useTimelapse } from '../../hooks/useTimelapse';
import { IMAGES_RESOURCES } from '../../data';
import { Sparkles, Calendar, Clock, Users } from 'lucide-react';
import CodeEditorOverlay from './CodeEditorOverlay';

export default function TimelapseSplitBlock({ isActive, isAutoplay, onComplete }: { isActive?: boolean, isAutoplay?: boolean, onComplete?: () => void }) {
  const step = useTimelapse(17, isActive ?? true, isAutoplay ?? false, onComplete);

  const getCodeSnippet = (s: number) => {
    switch (s) {
      case 0: return "";
      case 1: return "// Setup Flex Layout\ndisplay: flex;\nflex-direction: row;";
      case 2: return "/* Load Image Wrapper */\n<div className=\"left-col\" />";
      case 3: return "/* Apply Filter & Load Image */\nfilter: brightness(0.88);\n<img src=\"chef.jpg\" />";
      case 4: return "/* Add Badge Overlay */\nanimate: spin-slow;\n<Sparkles />";
      case 5: return "/* Style Right Side */\nbackground: #e8563a;\ncolor: white;";
      case 6: return "/* Load Text Content */\n<span className=\"label\" />\n<h2 />\n<p />";
      case 7: return "/* Typography */\nfont-family: 'Playfair Display';\nfont-size: 3rem;\ntext-transform: uppercase;";
      case 8: return "/* Paragraph */\nopacity: 0.9;\nline-height: relaxed;";
      case 9: return "/* CTA Button */\n<button>Reservar Mesa Comunitaria</button>";
      case 10: return "button {\n  background: #F6F3EC;\n  color: #1A1A1A;\n  box-shadow: 4px 4px 0 #000;\n}";
      case 11: return "/* Simulating Click on Reservar... */\ndocument.getElementById('btn-res').click();";
      
      // Modal
      case 12: return "/* Opening Reservation Modal */\n<div className=\"modal-overlay\" />";
      case 13: return "/* Render Form */\n<form className=\"modal-container\" />";
      case 14: return "/* Selecting Guests... */\nselect.value = '4 Personas';";
      case 15: return "/* Submitting Form... */\nform.submit();\nconsole.log('Reservation sent!');";
      case 16: return "/* Closing Modal */\nmodal.close();";
      case 17: return "/* Section Finished */";
      default: return "";
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${step >= 1 ? 'bg-background' : 'bg-white'}`}>
      <CodeEditorOverlay isVisible={isActive ?? true} codeSnippet={getCodeSnippet(step)} />

      <section className={`flex flex-col lg:flex-row border-b transition-colors duration-[1500ms] ${
        step >= 1 ? 'border-on-surface' : 'border-transparent'
      }`}>
        {/* Slicing visual chef side */}
        <div className={`w-full lg:w-1/2 relative min-h-[350px] md:min-h-[480px] transition-all duration-[1500ms] ${
          step >= 2 ? 'bg-gray-200' : 'bg-transparent'
        }`}>
          {step >= 3 && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              src={IMAGES_RESOURCES.chefCut}
              alt="Corte manual de pizza artesanal"
              className="w-full h-full object-cover filter brightness-[0.88] select-none pointer-events-none"
              referrerPolicy="no-referrer"
            />
          )}
          
          {/* Overlay spinning badge element */}
          <div className={`absolute bottom-8 right-8 transition-opacity duration-[1500ms] ${
            step >= 4 ? 'opacity-100 animate-spin-slow' : 'opacity-0'
          }`}>
            <div className="bg-secondary-container w-20 h-20 rounded-full brutalist-border border-2 flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-on-secondary-container animate-pulse" />
            </div>
          </div>
          
          <div className={`absolute top-6 left-6 bg-white/95 px-3 py-1.5 rounded brutalist-border text-[10px] uppercase font-mono tracking-widest font-extrabold transition-opacity duration-[1500ms] ${
            step >= 4 ? 'opacity-100' : 'opacity-0'
          }`}>
            Horno de Encina 450ºC
          </div>
        </div>

        {/* Earthy Red Content Side */}
        <div className={`w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center space-y-6 transition-colors duration-[1500ms] ${
          step >= 5 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
        } ${step < 1 ? 'opacity-0' : 'opacity-100'}`}>
          <span className={`text-xs px-2.5 py-1 uppercase rounded-sm tracking-widest self-start transition-all duration-[1500ms] ${
            step >= 6 ? 'font-mono font-black' : 'font-sans'
          } ${step >= 7 ? 'bg-secondary-container text-on-secondary-container' : 'bg-gray-300 text-gray-500'}`}>
            EXPERIENCIA COMUNITARIA
          </span>
          <h2 className={`uppercase leading-none tracking-tight transition-all duration-[1500ms] ${
            step >= 7 ? 'font-display font-black text-4xl md:text-5xl opacity-100' : 'font-sans font-normal text-2xl opacity-0'
          }`}>
            COMPARTE SIN PRISAS
          </h2>
          <p className={`font-sans text-sm md:text-base font-medium leading-relaxed max-w-lg transition-all duration-[1500ms] ${
            step >= 8 ? 'text-background opacity-90' : 'text-gray-400 opacity-0'
          }`}>
            Reserva un espacio comunitario en nuestra icónica mesa cooperativa. En La Piccolina el tiempo se ralentiza en el instante en que tu pizza toca la madera de la mesa. Disfruta con amigos, extraños y masa madre.
          </p>
          <button
            className={`inline-block px-8 py-4 font-display font-extrabold text-xs tracking-widest uppercase transition-all duration-[1500ms] self-start ${
              step >= 10 ? 'bg-background text-on-surface brutalist-border brutalist-shadow opacity-100' : (step >= 9 ? 'bg-gray-300 text-gray-500 border border-gray-400 opacity-100' : 'opacity-0')
            } ${step === 11 ? 'scale-95 bg-gray-200' : ''}`}
          >
            Reservar Mesa Comunitaria
          </button>
        </div>
      </section>

      {/* Reservation Modal Animation */}
      <AnimatePresence>
        {step >= 12 && step < 17 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-on-surface/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className={`relative w-full max-w-lg p-6 md:p-8 z-10 transition-all duration-[1500ms] ${
                step >= 13 ? 'bg-surface-lowest brutalist-border brutalist-shadow rounded-none' : 'bg-gray-200 border-transparent rounded-lg shadow-none'
              }`}
            >
              <div className={`space-y-6 transition-opacity duration-[1500ms] ${step >= 13 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-center">
                  <span className="text-primary font-mono text-xs tracking-widest uppercase">[ NUESTRA MESA ES TU MESA ]</span>
                  <h3 className="font-display font-black text-2xl md:text-3xl uppercase text-on-surface mt-1">
                    Reservar
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] font-bold text-on-surface/70 uppercase">Fecha</label>
                      <div className="flex items-center brutalist-border bg-white px-3 py-2.5">
                        <Calendar className="w-4 h-4 text-primary mr-2" />
                        <span className="font-sans text-sm">Hoy, 20:30</span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] font-bold text-on-surface/70 uppercase">Personas</label>
                      <div className={`flex items-center brutalist-border px-3 py-2.5 transition-colors duration-[1500ms] ${
                        step >= 14 ? 'bg-secondary-container text-on-secondary-container font-bold' : 'bg-white'
                      }`}>
                        <Users className="w-4 h-4 mr-2" />
                        <span className="font-sans text-sm">{step >= 14 ? '4 Personas' : '2 Personas'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  className={`w-full py-4 text-xs tracking-widest uppercase text-center transition-all duration-[1500ms] ${
                    step >= 13 ? 'bg-primary text-background font-display font-bold brutalist-border brutalist-shadow' : 'bg-gray-300 text-gray-500 font-sans border-transparent'
                  } ${step === 15 ? 'scale-95 bg-black text-white' : ''}`}
                >
                  Confirmar Reserva
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Helper overlay */}
      {step < 17 && (
        <div className="fixed top-2 left-2 text-[10px] font-mono text-gray-400 opacity-50 select-none pointer-events-none z-50">
          TIMELAPSE MODE [SPLIT BLOCK] - STEP {step}/17
        </div>
      )}
    </div>
  );
}
