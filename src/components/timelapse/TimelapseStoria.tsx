import { motion, AnimatePresence } from 'motion/react';
import { useTimelapse } from '../../hooks/useTimelapse';
import { IMAGES_RESOURCES } from '../../data';
import { BookOpen, X } from 'lucide-react';
import CodeEditorOverlay from './CodeEditorOverlay';
import TypewriterText from './TypewriterText';
import ConstructionBox from './ConstructionBox';
import DesignCursor from './DesignCursor';
import SelectionHandles from './SelectionHandles';
import ColorSwatchPicker from './ColorSwatchPicker';

export default function TimelapseStoria({ isActive, isAutoplay, onComplete }: { isActive?: boolean, isAutoplay?: boolean, onComplete?: () => void }) {
  const step = useTimelapse(22, isActive ?? true, isAutoplay ?? false, onComplete);

  // --- Design Cursor choreography ---
  const getCursorState = (s: number) => {
    switch (s) {
      case 2: return { x: '20%', y: '45%', visible: true, clicking: false, dragging: true, label: 'Drag card' };
      case 3: return { x: '25%', y: '35%', visible: true, clicking: true, dragging: false, label: '' };
      case 8: return { x: '25%', y: '55%', visible: true, clicking: true, dragging: false, label: '' };
      case 9: return { x: '72%', y: '25%', visible: true, clicking: false, dragging: true, label: 'Drop polaroid' };
      case 10: return { x: '72%', y: '40%', visible: true, clicking: true, dragging: false, label: '' };
      case 12: return { x: '73%', y: '45%', visible: true, clicking: false, dragging: true, label: 'Rotate' };
      case 14: return { x: '22%', y: '62%', visible: true, clicking: true, dragging: false, label: 'Click CTA' };
      case 21: return { x: '50%', y: '68%', visible: true, clicking: true, dragging: false, label: 'Close' };
      default: return { x: '80%', y: '80%', visible: false, clicking: false, dragging: false, label: '' };
    }
  };

  const cursorState = getCursorState(step);

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

      {/* Design Cursor */}
      <DesignCursor
        x={cursorState.x}
        y={cursorState.y}
        isVisible={cursorState.visible}
        isClicking={cursorState.clicking}
        isDragging={cursorState.dragging}
        label={cursorState.label}
      />

      {/* Color swatch for the button styling (Step 8) */}
      <ColorSwatchPicker
        isVisible={step === 8}
        colors={['#e5e7eb', '#1e40af', '#e8563a']}
        activeIndex={2}
        position={{ x: '28%', y: '64%' }}
        colorName="CTA #e8563a"
      />

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
          {step >= 2 && (
            <ConstructionBox
              isActive={step >= 8}
              showContentBeforeActive={step >= 2}
              className="flex-1 w-full"
              fillColor="bg-white"
              borderColor="#2d3922"
              borderWidth={1.5}
            >
              <div className={`p-8 md:p-10 rounded-none relative h-full w-full ${
                step >= 8 ? '' : 'bg-sky-50/10 border border-dashed border-sky-400'
              }`}>
                {step >= 2 && step < 8 && (
                  <div className="absolute top-1 right-2 text-[7px] font-mono text-sky-500 pointer-events-none select-none">
                    comp: storia_card_left | padding: 2.5rem
                  </div>
                )}

                {/* Selection handles around the title area during step 4 */}
                <div className="relative inline-block">
                  {step >= 4 && step <= 5 && (
                    <SelectionHandles
                      isVisible={true}
                      width="480"
                      height="48"
                    />
                  )}
                </div>

                <span className={`text-xs px-2 py-1 uppercase rounded-sm font-mono tracking-widest mb-3 inline-block transition-all duration-[1000ms] ${
                  step >= 8 
                    ? 'bg-secondary-container text-on-secondary-container font-extrabold brutalist-border' 
                    : (step >= 3 
                        ? 'bg-gray-200 text-gray-500 font-normal' 
                        : 'bg-transparent text-sky-500 border border-dashed border-sky-400')
                }`}>
                  {step >= 3 ? <TypewriterText text="TALLER ARTESANAL" speed={20} /> : "[badge_slot]"}
                </span>
                
                <h2 className={`transition-all duration-1000 mb-6 leading-none ${
                  step >= 4 ? 'font-display font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-on-surface' : 'font-serif font-normal text-2xl text-gray-500 capitalize'
                }`}>
                  {step >= 3 ? (
                    <TypewriterText text={step >= 4 ? 'NUESTRA HISTORIA' : 'La historia de la pizzería'} speed={25} />
                  ) : ''}
                </h2>
                
                <p className={`text-sm md:text-base leading-relaxed mb-8 transition-colors duration-[1000ms] ${
                  step >= 6 ? 'font-sans text-on-surface-variant font-medium' : 'font-sans text-gray-400/60'
                }`}>
                  {step >= 3 ? (
                    <TypewriterText 
                      text="Nacimos en un pequeño garaje de Barcelona, obsesionados únicamente por dar vida a la costra de masa madre perfecta. No somos una cadena masiva corporativa, somos un taller de sabor comprometido con la honestidad gastronómica. Cada una de nuestras pizzas es una estructura física diseñada para colapsar deliciosamente en tu paladar." 
                      speed={6} 
                    />
                  ) : ''}
                </p>
                
                <button className={`px-6 py-3.5 flex items-center justify-center lg:justify-start gap-2 transition-all duration-[1000ms] ${
                  step >= 8 
                    ? 'bg-secondary-container text-on-secondary-container font-display font-extrabold text-xs tracking-widest uppercase brutalist-border brutalist-shadow-hover' 
                    : (step === 7 
                        ? 'bg-gray-100 text-gray-400 font-sans border border-gray-200 text-xs' 
                        : 'bg-transparent text-sky-500 border border-dashed border-sky-400 font-mono text-[10px]')
                } ${step === 14 ? 'scale-95 bg-primary text-white' : ''}`}>
                  {step >= 8 && <BookOpen className="w-4 h-4 text-primary" />}
                  {step >= 7 ? <TypewriterText text="Leer Manifiesto" speed={25} /> : "[button_manifiesto]"}
                </button>
              </div>
            </ConstructionBox>
          )}

          {/* Right Polaroid */}
          <div className="flex-1 relative flex items-center justify-center w-full">
            {step >= 9 && (
              <motion.div
                className="max-w-sm w-full select-none relative"
                initial={{ opacity: 0, y: -800, scale: 0, rotate: 45 }}
                animate={{
                  opacity: step >= 9 ? 1 : 0,
                  y: step >= 9 ? 0 : -800,
                  scale: step >= 9 ? (step >= 11 ? [0.95, 1.08, 0.98, 1] : 1) : 0,
                  rotate: step >= 9 ? (step >= 12 ? -6 : [45, -15, 5, 0]) : 45
                }}
                transition={{
                  opacity: { duration: 0 },
                  y: { type: "spring", stiffness: 140, damping: 13 },
                  scale: { type: "spring", stiffness: 140, damping: 13 },
                  rotate: { type: "spring", stiffness: 140, damping: 13 }
                }}
              >
                {/* Selection handles around the polaroid during steps 9-10 */}
                <SelectionHandles
                  isVisible={step === 9 || step === 10}
                  width="340"
                  height="420"
                />

                <ConstructionBox
                  isActive={step >= 11}
                  showContentBeforeActive={step >= 9}
                  className="w-full"
                  fillColor="bg-white"
                  borderColor="#2d3922"
                  borderWidth={1.5}
                >
                  <div className={`p-4 rounded-none relative w-full ${
                    step >= 11 ? '' : 'border border-dashed border-sky-400'
                  }`}>
                    {/* Graphic design blueprint overlays */}
                    {step >= 9 && step < 11 && (
                      <div className="absolute inset-0 z-30 pointer-events-none border border-sky-500/30 flex flex-col justify-between p-2">
                        <div className="flex justify-between text-[8px] font-mono text-sky-500 bg-sky-50 px-1 rounded self-start">
                          box-model: polaroid_card
                        </div>
                        <div className="text-[8px] font-mono text-sky-500 bg-sky-50 px-1 rounded self-end">
                          w: 340px | h: 420px
                        </div>
                      </div>
                    )}

                    <div className={`w-full aspect-square flex items-center justify-center rounded-sm relative overflow-hidden transition-colors duration-[1500ms] ${
                      step >= 10 ? 'bg-transparent' : 'bg-sky-50/20 border border-dashed border-sky-300'
                    }`}>
                      {/* Visual crosshairs for picture box draft */}
                      {step === 9 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="absolute w-full h-[1px] bg-sky-300/30 rotate-45" />
                          <div className="absolute w-full h-[1px] bg-sky-300/30 -rotate-45" />
                          <span className="text-[9px] font-mono text-sky-400">placeholder: img_box</span>
                        </div>
                      )}

                      {step === 10 && (
                        <div className="absolute inset-0 z-20 border border-dashed border-sky-400 rounded-full flex items-center justify-center">
                          <span className="text-[8px] font-mono text-sky-500 bg-sky-50 px-1 rounded">clip: circle(43.5%)</span>
                        </div>
                      )}

                      {step >= 10 && (
                        <motion.img
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 180, damping: 12 }}
                          src={IMAGES_RESOURCES.storyPepperoni}
                          alt="Pepperoni artesanal"
                          className="w-full object-cover border border-on-surface/5"
                          style={{ clipPath: 'circle(43.5% at 50% 50%)' }}
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>
                    
                    <div className="pt-4 text-center">
                      <p className="font-mono text-xs font-bold uppercase tracking-wider text-on-surface/80">
                        {step >= 13 ? <TypewriterText text="PIZZA Nº 02 / PEPPERONI" speed={20} /> : <span className="text-sky-400 font-mono">[label_placeholder]</span>}
                      </p>
                      <p className="font-display font-black text-xs text-primary uppercase">
                        {step >= 13 ? <TypewriterText text="Cerezo & Roble • Horno de Leña" speed={20} /> : ""}
                      </p>
                    </div>
                  </div>
                </ConstructionBox>
              </motion.div>
            )}
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
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{
                  scale: [0.8, 1.08, 0.98, 1],
                  opacity: 1,
                  y: 0
                }}
                exit={{ scale: 0.8, opacity: 0, y: 30 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                className="relative w-full max-w-xl z-10"
              >
                <ConstructionBox
                  isActive={step >= 16}
                  showContentBeforeActive={step >= 15}
                  className="w-full"
                  fillColor="bg-surface-lowest"
                  borderColor="#2d3922"
                  borderWidth={1.5}
                >
                  <div className={`p-6 md:p-8 rounded-none relative w-full ${
                    step >= 16 ? '' : 'bg-gray-200 border border-dashed border-sky-400 shadow-none'
                  }`}>
                    <div className="space-y-6 pt-4 font-semibold text-sm">
                      <div className="text-center">
                        <span className="text-primary font-mono text-xs tracking-widest uppercase">[ NUESTRO COMPROMISO ]</span>
                        <h3 className={`text-on-surface mt-1 transition-all duration-1000 ${
                          step >= 17 ? 'font-display font-black text-2xl md:text-3xl uppercase' : 'font-serif font-normal text-xl capitalize text-gray-500'
                        }`}>
                          {step >= 17 ? <TypewriterText text="EL MANIFIESTO PICCOLINA" speed={20} /> : 'Nuestro manifiesto artesano'}
                        </h3>
                      </div>

                      <div className={`space-y-4 text-xs leading-relaxed bg-surface-lowest p-5 transition-all duration-[1000ms] ${
                        step >= 18 ? 'font-mono text-on-surface-variant border border-dashed border-on-surface/20' : 'font-sans text-sky-400 border border-dashed border-sky-400'
                      }`}>
                        {step >= 18 ? (
                          <>
                            <p><strong className="text-primary font-bold">01. LA CORTEZA:</strong> <TypewriterText text="48 horas de fermentación fría..." speed={10} /></p>
                            <p><strong className="text-primary font-bold">02. LOS TOMATES:</strong> <TypewriterText text="San Marzano ecológicos..." speed={10} delay={300} /></p>
                            <p><strong className="text-primary font-bold">03. EL CALOR:</strong> <TypewriterText text="Horno de piedra..." speed={10} delay={600} /></p>
                          </>
                        ) : (
                          "[cargando manifiesto...]"
                        )}
                      </div>

                      <button
                        className={`w-full py-3 text-xs tracking-widest uppercase text-center transition-all duration-[1000ms] ${
                          step >= 19 
                            ? 'bg-primary text-background font-display font-bold brutalist-border brutalist-shadow' 
                            : 'bg-transparent text-sky-500 border border-dashed border-sky-400 font-mono'
                        } ${step === 21 ? 'scale-95 bg-black' : ''}`}
                      >
                        {step >= 19 ? <TypewriterText text="Entendido, ¡Quiero Pizza!" speed={20} /> : "[button_confirm]"}
                      </button>
                    </div>
                  </div>
                </ConstructionBox>
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
