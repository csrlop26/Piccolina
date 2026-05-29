import { motion, AnimatePresence } from 'motion/react';
import { useTimelapse } from '../../hooks/useTimelapse';
import { IMAGES_RESOURCES } from '../../data';
import { Sparkles, Calendar, Clock, Users } from 'lucide-react';
import CodeEditorOverlay from './CodeEditorOverlay';
import TypewriterText from './TypewriterText';
import ConstructionBox from './ConstructionBox';
import DesignCursor from './DesignCursor';
import ColorSwatchPicker from './ColorSwatchPicker';
import SelectionHandles from './SelectionHandles';

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

  // --- Design Cursor choreography ---
  const getCursorState = (s: number) => {
    switch (s) {
      case 2: return { x: '25%', y: '50%', visible: true, clicking: false, dragging: true, label: 'Image container' };
      case 4: return { x: '20%', y: '75%', visible: true, clicking: true, dragging: false, label: 'Place badge' };
      case 5: return { x: '75%', y: '50%', visible: true, clicking: true, dragging: false, label: '' };
      case 11: return { x: '68%', y: '70%', visible: true, clicking: true, dragging: false, label: 'Click reserve' };
      case 14: return { x: '60%', y: '50%', visible: true, clicking: true, dragging: false, label: '4 Personas' };
      case 15: return { x: '50%', y: '65%', visible: true, clicking: true, dragging: false, label: 'Submit' };
      default: return { x: '80%', y: '80%', visible: false, clicking: false, dragging: false, label: '' };
    }
  };

  const cursorState = getCursorState(step);

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${step >= 1 ? 'bg-background' : 'bg-white'}`}>
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

      {/* Color swatch for content background (Step 5) */}
      <ColorSwatchPicker
        isVisible={step === 5}
        colors={['#f5f2ea', '#2d3922', '#e8563a']}
        activeIndex={2}
        position={{ x: '78%', y: '42%' }}
        colorName="Background #e8563a"
      />

      <section className={`flex flex-col lg:flex-row border-b transition-colors duration-[1500ms] ${
        step >= 1 ? 'border-on-surface' : 'border-transparent'
      }`}>
        {/* Slicing visual chef side */}
        <div className={`w-full lg:w-1/2 relative min-h-[350px] md:min-h-[480px] ${
          step >= 3 ? 'bg-gray-200' : (step === 2 ? 'bg-sky-50/10 border border-dashed border-sky-400' : 'bg-transparent')
        }`}>
          {step === 2 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute w-full h-[1px] bg-sky-300/30" />
              <div className="absolute h-full w-[1px] bg-sky-300/30" />
              <span className="text-[10px] font-mono text-sky-500 bg-sky-50 px-2 py-0.5 rounded shadow-sm z-10">media_container: wood_oven_image</span>
            </div>
          )}
          {step >= 3 && (
            <motion.img
              initial={{ scale: 0.9, rotateY: 15 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 12 }}
              src={IMAGES_RESOURCES.chefCut}
              alt="Corte manual de pizza artesanal"
              className="w-full h-full object-cover filter brightness-[0.88] select-none pointer-events-none"
              referrerPolicy="no-referrer"
            />
          )}
          
          {/* Overlay spinning badge element */}
          {step >= 4 && (
            <motion.div 
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="absolute bottom-8 right-8 animate-spin-slow"
            >
              <div className="bg-secondary-container w-20 h-20 rounded-full brutalist-border border-2 flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-on-secondary-container animate-pulse" />
              </div>
            </motion.div>
          )}
          
          {step >= 4 && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="absolute top-6 left-6 bg-white/95 px-3 py-1.5 rounded brutalist-border text-[10px] uppercase font-mono tracking-widest font-extrabold"
            >
              Horno de Encina 450ºC
            </motion.div>
          )}
        </div>

        {/* Earthy Red Content Side */}
        <div className="w-full lg:w-1/2 relative min-h-[400px] flex flex-col justify-center">
          {step >= 5 ? (
            <ConstructionBox
              isActive={step >= 6}
              showContentBeforeActive={step >= 5}
              className="w-full h-full"
              fillColor="bg-primary"
              borderColor="#2d3922"
              borderWidth={1.5}
            >
              <div className={`p-10 md:p-16 flex flex-col justify-center space-y-6 relative w-full text-white h-full ${
                step >= 6 ? '' : 'bg-sky-50/10 border border-dashed border-sky-400 text-sky-500'
              }`}>
                {step === 5 && (
                  <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none select-none">
                    <div className="text-[9px] font-mono bg-sky-100 text-sky-600 px-1.5 py-0.5 rounded self-start">layout: split_content_box</div>
                    <div className="text-[9px] font-mono bg-sky-100 text-sky-600 px-1.5 py-0.5 rounded self-end">w: 50% | padding: 4rem</div>
                  </div>
                )}
                <span className={`text-xs px-2.5 py-1 rounded-sm tracking-widest self-start transition-all duration-[1000ms] ${
                  step >= 7 
                    ? 'font-mono font-black bg-secondary-container text-on-secondary-container brutalist-border' 
                    : (step >= 6 
                        ? 'font-sans bg-gray-300 text-gray-500' 
                        : 'bg-transparent text-sky-500 border border-dashed border-sky-400 font-mono text-[10px]')
                }`}>
                  {step >= 6 ? <TypewriterText text="EXPERIENCIA COMUNITARIA" speed={20} /> : "[badge_slot]"}
                </span>
                <h2 className={`leading-none tracking-tight transition-all duration-1000 ${
                  step >= 7 ? 'font-display font-black text-4xl md:text-5xl text-white uppercase' : 'font-serif font-normal text-2xl text-gray-300 capitalize'
                }`}>
                  {step >= 6 ? (
                    <TypewriterText text={step >= 7 ? 'COMPARTE SIN PRISAS' : 'Comparte una mesa cooperativa'} speed={25} />
                  ) : ''}
                </h2>
                <p className={`font-sans text-sm md:text-base font-medium leading-relaxed max-w-lg transition-all duration-[1000ms] ${
                  step >= 8 ? 'text-background/90' : 'text-white/40'
                }`}>
                  {step >= 6 ? (
                    <TypewriterText 
                      text="Reserva un espacio comunitario en nuestra icónica mesa cooperativa. En La Piccolina el tiempo se ralentiza en el instante en que tu pizza toca la madera de la mesa. Disfruta con amigos, extraños y masa madre." 
                      speed={8} 
                    />
                  ) : ''}
                </p>
                
                {step >= 9 && (
                  <ConstructionBox
                    isActive={step >= 10}
                    showContentBeforeActive={step >= 9}
                    className="self-start"
                    fillColor="bg-white"
                    borderColor="#2d3922"
                    borderWidth={1.5}
                  >
                    <button
                      className={`px-8 py-4 font-display font-extrabold text-xs tracking-widest uppercase transition-all duration-[1000ms] text-on-surface w-full h-full relative ${
                        step >= 10 ? 'bg-white font-bold brutalist-border brutalist-shadow' : 'bg-transparent text-sky-500 border border-dashed border-sky-400'
                      } ${step === 11 ? 'scale-95 bg-gray-200' : ''}`}
                    >
                      {step >= 10 ? <TypewriterText text="Reservar Mesa Comunitaria" speed={20} /> : <span className="text-[8px] font-mono">[btn_reserve]</span>}
                    </button>
                  </ConstructionBox>
                )}
              </div>
            </ConstructionBox>
          ) : (
            <div className="p-10 md:p-16 flex flex-col justify-center space-y-6 bg-gray-100 text-gray-400 h-full w-full border border-transparent">
              <span className="text-xs px-2.5 py-1 rounded-sm tracking-widest self-start bg-gray-300 text-gray-500">
                EXPERIENCIA COMUNITARIA
              </span>
              <h2 className="leading-none tracking-tight font-serif font-normal text-2xl text-gray-300 capitalize">
                Comparte una mesa cooperativa
              </h2>
              <p className="font-sans text-sm md:text-base font-medium leading-relaxed max-w-lg text-gray-400">
                Reserva un espacio comunitario en nuestra icónica mesa cooperativa.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Reservation Reservation Modal Animation */}
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
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{
                scale: [0.85, 1.08, 0.98, 1],
                opacity: 1,
                y: 0
              }}
              exit={{ scale: 0.85, opacity: 0, y: 25 }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 15
              }}
              className="relative w-full max-w-lg z-10"
            >
              <ConstructionBox
                isActive={step >= 13}
                showContentBeforeActive={step >= 12}
                className="w-full"
                fillColor="bg-surface-lowest"
                borderColor="#2d3922"
                borderWidth={1.5}
              >
                <div className={`p-6 md:p-8 rounded-none relative w-full ${
                  step >= 13 ? '' : 'bg-gray-200 border border-dashed border-sky-400'
                }`}>
                  <div className="space-y-6">
                    <div className="text-center">
                      <span className="text-primary font-mono text-xs tracking-widest uppercase">
                        {step >= 13 ? <TypewriterText text="[ NUESTRA MESA ES TU MESA ]" speed={20} /> : ""}
                      </span>
                      <h3 className="font-display font-black text-2xl md:text-3xl uppercase text-on-surface mt-1">
                        {step >= 13 ? <TypewriterText text="Reservar" speed={20} /> : ""}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-mono text-[10px] font-bold text-on-surface/70 uppercase">Fecha</label>
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 12 }}
                            className="flex items-center brutalist-border bg-white px-3 py-2.5"
                          >
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span className="font-sans text-sm">Hoy, 20:30</span>
                          </motion.div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-mono text-[10px] font-bold text-on-surface/70 uppercase">Personas</label>
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.15 }}
                            className={`flex items-center brutalist-border px-3 py-2.5 transition-colors duration-[1000ms] ${
                              step >= 14 ? 'bg-secondary-container text-on-secondary-container font-bold' : 'bg-white'
                            }`}
                          >
                            <Users className="w-4 h-4 mr-2" />
                            <span className="font-sans text-sm">{step >= 14 ? '4 Personas' : '2 Personas'}</span>
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    <button
                      className={`w-full py-4 text-xs tracking-widest uppercase text-center transition-all duration-[1000ms] ${
                        step >= 13 ? 'bg-primary text-background font-display font-bold brutalist-border brutalist-shadow' : 'bg-transparent text-sky-500 border border-dashed border-sky-400 font-mono'
                      } ${step === 15 ? 'scale-95 bg-black text-white' : ''}`}
                    >
                      {step >= 13 ? <TypewriterText text="Confirmar Reserva" speed={20} /> : "[button_confirm]"}
                    </button>
                  </div>
                </div>
              </ConstructionBox>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Helper overlay */}
      {step < 17 && !isAutoplay && (
        <div className="fixed top-2 left-2 text-[10px] font-mono text-gray-400 opacity-50 select-none pointer-events-none z-50">
          TIMELAPSE MODE [SPLIT BLOCK] - STEP {step}/17
        </div>
      )}
    </div>
  );
}
