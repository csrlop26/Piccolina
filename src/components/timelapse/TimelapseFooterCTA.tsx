import { motion } from 'motion/react';
import { useTimelapse } from '../../hooks/useTimelapse';
import { IMAGES_RESOURCES } from '../../data';
import { MapPin, Clock, Instagram, Sparkles } from 'lucide-react';
import CodeEditorOverlay from './CodeEditorOverlay';
import TypewriterText from './TypewriterText';
import ScrambleText from './ScrambleText';
import ConstructionBox from './ConstructionBox';
import DesignCursor from './DesignCursor';
import ColorSwatchPicker from './ColorSwatchPicker';

export default function TimelapseFooterCTA({ isActive, isAutoplay, onComplete }: { isActive?: boolean, isAutoplay?: boolean, onComplete?: () => void }) {
  const step = useTimelapse(10, isActive ?? true, isAutoplay ?? false, onComplete);

  const getCodeSnippet = (s: number) => {
    switch (s) {
      case 0: return "";
      case 1: return "// Section Wrapper\n<section className=\"footer\" />\nbackground: #F6F3EC;";
      case 2: return "/* Add Logo SVG */\n<svg className=\"logo\" />";
      case 3: return "/* Load Text Content */\n<h2>VEN A PROBARLA</h2>\n<p>Estamos en el Born...</p>";
      case 4: return "/* Typography */\nfont-family: 'Playfair Display';\nfont-size: 5rem;\ntext-transform: uppercase;";
      case 5: return "/* Load CTA Buttons */\n<div className=\"buttons-row\" />";
      case 6: return "/* Style Buttons */\n.btn-primary { background: #e8563a; color: white; }\n.btn-secondary { background: #1A1A1A; color: white; }";
      case 7: return "/* Simulating Hover on Delivery... */\nbutton.hover();";
      case 8: return "/* Simulating Hover on Map... */\nbutton.hover();";
      case 9: return "/* Footer Complete! */\nconsole.log('Website built successfully!');";
      default: return "";
    }
  };

  // --- Design Cursor choreography ---
  const getCursorState = (s: number) => {
    switch (s) {
      case 2: return { x: '50%', y: '20%', visible: true, clicking: true, dragging: false, label: 'Add logo' };
      case 5: return { x: '42%', y: '55%', visible: true, clicking: false, dragging: true, label: 'Place buttons' };
      case 6: return { x: '45%', y: '57%', visible: true, clicking: true, dragging: false, label: '' };
      case 7: return { x: '42%', y: '56%', visible: true, clicking: true, dragging: false, label: 'Hover test' };
      case 9: return { x: '50%', y: '80%', visible: true, clicking: false, dragging: false, label: '✓ Built!' };
      default: return { x: '80%', y: '80%', visible: false, clicking: false, dragging: false, label: '' };
    }
  };

  const cursorState = getCursorState(step);

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${step >= 1 ? 'bg-surface-container' : 'bg-white'}`}>
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

      {/* Color swatch for CTA buttons (Step 6) */}
      <ColorSwatchPicker
        isVisible={step === 6}
        colors={['#2d3922', '#f4a340', '#e8563a']}
        activeIndex={2}
        position={{ x: '35%', y: '62%' }}
        colorName="CTA Primary #e8563a"
      />

      <section className={`py-24 overflow-hidden relative border-t transition-colors duration-[1500ms] ${
        step >= 1 ? 'border-on-surface' : 'border-transparent'
      }`}>
        <div className={`max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center relative z-10 transition-opacity duration-1000 ${
          step >= 1 ? 'opacity-100' : 'opacity-0'
        }`}>
          
          <div className="relative mb-8">
            <div className={`oval-shadow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 transition-opacity duration-[1500ms] ${
              step >= 2 ? 'opacity-10' : 'opacity-0'
            }`} />
            
            <motion.div 
              className="relative z-10 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: step >= 2 ? [0, 1.15, 0.98, 1] : 0,
                opacity: step >= 2 ? 1 : 0
              }}
              transition={{
                opacity: { duration: 0 },
                scale: { type: "spring", stiffness: 160, damping: 14 }
              }}
            >
              {/* Rotating badge replacing triangles */}
              <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
                <svg className="w-[180px] h-[180px]" viewBox="0 0 100 100">
                  <path d="M 50,50 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" fill="transparent" id="footerBadge" />
                  <text style={{ fontSize: '7.5px', fontWeight: 900, letterSpacing: '0.15em', fill: '#e8563a', textTransform: 'uppercase' }}>
                    <textPath xlinkHref="#footerBadge">
                      • 100% ARTESANAL • HORNO DE LEÑA
                    </textPath>
                  </text>
                </svg>
              </div>

              <img
                src={IMAGES_RESOURCES.heroPizza}
                alt="Pizza slice helper artwork"
                className="w-32 drop-shadow-md select-none pointer-events-none relative z-10"
                style={{ clipPath: 'circle(43.5% at 50% 50%)' }}
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          <h2 className={`transition-all duration-1000 mb-4 leading-none tracking-tighter ${
            step >= 4 ? 'font-display font-black text-5xl md:text-7xl uppercase text-on-surface' : 'font-serif font-normal text-3xl text-gray-500 capitalize'
          }`}>
            {step >= 3 ? (
              step >= 4
                ? <ScrambleText text="VEN A PROBARLA" scrambleDuration={130} speed={28} />
                : <TypewriterText text="Ven a visitarnos al Born" speed={25} />
            ) : ''}
          </h2>
          
          <p className={`font-sans max-w-md mx-auto leading-relaxed mb-12 transition-all duration-[1000ms] ${
            step >= 4 ? 'font-bold text-sm md:text-base text-on-surface-variant' : 'text-gray-400/60'
          }`}>
            {step >= 3 ? (
              <TypewriterText 
                text="Estamos en pleno barrio del Born en Barcelona. Sabores intensos, masa viva y cerveza artesanal bien fría." 
                speed={8} 
              />
            ) : ''}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md">
            {step >= 5 ? (
              <>
                <ConstructionBox
                  isActive={step >= 6}
                  showContentBeforeActive={step >= 5}
                  className="flex-1 w-full"
                  fillColor="bg-primary"
                  borderColor="#2d3922"
                  borderWidth={1.5}
                >
                  <button
                    className={`w-full py-4 px-8 font-display font-extrabold text-sm tracking-widest uppercase text-white relative h-full transition-all duration-[1000ms] ${
                      step >= 6 ? '' : 'bg-transparent text-sky-500 border border-dashed border-sky-400'
                    } ${step === 7 ? 'scale-95 bg-[#c24125]' : ''}`}
                  >
                    {step >= 6 ? <TypewriterText text="Pide Delivery" speed={20} /> : <span className="text-[8px] font-mono">[btn_delivery]</span>}
                  </button>
                </ConstructionBox>

                <ConstructionBox
                  isActive={step >= 6}
                  showContentBeforeActive={step >= 5}
                  className="flex-1 w-full"
                  fillColor="bg-on-surface"
                  borderColor="#2d3922"
                  borderWidth={1.5}
                  delay={0.1}
                >
                  <button
                    className={`w-full py-4 px-8 font-display font-extrabold text-sm tracking-widest uppercase text-background relative h-full transition-all duration-[1000ms] ${
                      step >= 6 ? '' : 'bg-transparent text-sky-500 border border-dashed border-sky-400'
                    } ${step === 8 ? 'scale-95 bg-gray-800' : ''}`}
                  >
                    {step >= 6 ? <TypewriterText text="Ver Mapa" speed={20} /> : <span className="text-[8px] font-mono">[btn_mapa]</span>}
                  </button>
                </ConstructionBox>
              </>
            ) : (
              <>
                <div className="flex-1 py-4 px-8 border border-dashed border-sky-400 text-sky-500 text-center font-mono text-xs">
                  [slot_button_1]
                </div>
                <div className="flex-1 py-4 px-8 border border-dashed border-sky-400 text-sky-500 text-center font-mono text-xs">
                  [slot_button_2]
                </div>
              </>
            )}
          </div>

        </div>
      </section>

      {/* Corporate Footer */}
      {step >= 9 && (
        <motion.footer
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            opacity: { duration: 0 },
            y: { type: "spring", stiffness: 100, damping: 15 }
          }}
          className="bg-on-surface text-background py-16 border-t-4 border-primary relative z-10"
          id="contatti"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            {/* Col 1 */}
            <div className="space-y-4">
              <h2 className="font-display text-3xl font-black text-primary uppercase tracking-tight">
                <TypewriterText text="La Trattoria" speed={25} />
              </h2>
              <p className="font-sans text-sm text-surface-container-highest/70 leading-relaxed max-w-xs">
                © {new Date().getFullYear()} La Trattoria Artisanal Pizzeria. Hecho con pasión, harina orgánica y fermentación lenta.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-secondary-container font-mono">
                <span>Diseñado por <a href="https://augustocs.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors font-medium">AugustoCS</a></span>
                <Sparkles className="w-3.5 h-3.5 text-secondary-container" />
              </div>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col gap-3">
              <h4 className="font-sans text-xs font-black tracking-widest text-secondary-container uppercase mb-2">
                <TypewriterText text="Explora" speed={25} />
              </h4>
              <a href="#" className="flex items-center gap-2 text-surface-container-highest/80 hover:text-white text-sm transition-colors font-medium">
                <Instagram className="w-4 h-4 text-primary" />
                Instagram
              </a>
              <a href="#" className="text-surface-container-highest/80 hover:text-white text-sm transition-colors font-medium">
                Política de Privacidad
              </a>
              <a href="#" className="text-surface-container-highest/80 hover:text-white text-sm transition-colors font-medium">
                Listado de Alérgenos
              </a>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col gap-3">
              <h4 className="font-sans text-xs font-black tracking-widest text-secondary-container uppercase mb-2">
                <TypewriterText text="Ubicación y Horarios" speed={25} />
              </h4>
              <div className="space-y-2 text-sm text-surface-container-highest/80 font-semibold">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p>Via della Conciliazione, 12<br />Barcelona, 08001</p>
                </div>
                <div className="flex items-start gap-2 pt-1 border-t border-white/5">
                  <Clock className="w-4 h-4 text-secondary-container mt-0.5 flex-shrink-0" />
                  <p>Martes — Domingo: 13:00 - 23:00</p>
                </div>
              </div>
            </div>
          </div>
        </motion.footer>
      )}

      {/* Helper overlay */}
      {step < 10 && !isAutoplay && (
        <div className="fixed top-2 left-2 text-[10px] font-mono text-gray-400 opacity-50 select-none pointer-events-none z-50">
          TIMELAPSE MODE [FOOTER] - STEP {step}/10
        </div>
      )}
    </div>
  );
}
