import { motion, AnimatePresence } from 'motion/react';
import { useTimelapse } from '../../hooks/useTimelapse';
import { PIZZA_MENU } from '../../data';
import { Flame, Maximize2, Plus, Minus, ShoppingBag } from 'lucide-react';
import CodeEditorOverlay from './CodeEditorOverlay';
import TypewriterText from './TypewriterText';
import ConstructionBox from './ConstructionBox';
import DesignCursor from './DesignCursor';
import SelectionHandles from './SelectionHandles';
import ColorSwatchPicker from './ColorSwatchPicker';

export default function TimelapseMenu({ isActive, isAutoplay, onComplete }: { isActive?: boolean, isAutoplay?: boolean, onComplete?: () => void }) {
  const step = useTimelapse(25, isActive ?? true, isAutoplay ?? false, onComplete);

  // --- Design Cursor choreography ---
  const getCursorState = (s: number) => {
    switch (s) {
      case 3: return { x: '50%', y: '30%', visible: true, clicking: false, dragging: true, label: 'Define grid' };
      case 10: return { x: '28%', y: '28%', visible: true, clicking: true, dragging: false, label: 'Add badge' };
      case 11: return { x: '30%', y: '26%', visible: true, clicking: false, dragging: false, label: '' };
      case 13: return { x: '65%', y: '45%', visible: true, clicking: false, dragging: false, label: 'Hover' };
      case 14: return { x: '67%', y: '52%', visible: true, clicking: true, dragging: false, label: 'Click' };
      case 20: return { x: '70%', y: '55%', visible: true, clicking: true, dragging: false, label: 'Select' };
      case 22: return { x: '72%', y: '82%', visible: true, clicking: true, dragging: false, label: 'Add' };
      default: return { x: '80%', y: '80%', visible: false, clicking: false, dragging: false, label: '' };
    }
  };

  const cursorState = getCursorState(step);

  const getCodeSnippet = (s: number) => {
    switch (s) {
      case 0: return "";
      case 1: return "// Menu Header\n<div className=\"header-bar\" />";
      case 2: return "<h1>NUESTRAS ESPECIALIDADES</h1>\nfont-family: 'Playfair Display';";
      case 3: return "/* Setup CSS Grid */\ndisplay: grid;\ngrid-template-columns: repeat(4, 1fr);\ngap: 2rem;";
      case 4: return "/* Load Card Wireframes */\n<div className=\"card\" />";
      case 5: return "/* Load pizza images */\n<img src=\"pizza.png\" />";
      case 6: return "/* Mask images to circles */\nclip-path: circle(43.5% at 50% 50%);";
      case 7: return "/* Load titles */\n<h3>MARGHERITA</h3>";
      case 8: return "h3 {\n  font-family: 'Playfair Display';\n  font-size: 1.5rem;\n}";
      case 9: return "/* Load descriptions */\np { color: #4B5563; }";
      case 10: return "/* Add \"Más Vendida\" badges */\n<div className=\"badge\">MÁS VENDIDA</div>";
      case 11: return ".badge {\n  transform: rotate(12deg);\n  background: #e8563a;\n}";
      case 12: return "/* Add Price Buttons */\n<button>AÑADIR</button>";
      case 13: return "/* Simulate Hover Interaction */\n.card:hover {\n  transform: translateY(-8px);\n  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);\n}";
      case 14: return "/* Simulating Click on Customize... */\ndocument.getElementById('customize').click();";
      
      // Modal Steps
      case 15: return "/* Open Customizer Modal */\n<div className=\"modal-overlay\" />";
      case 16: return "/* Render Modal Box */\n<div className=\"modal-container\" />";
      case 17: return "/* Load Pizza Preview */\n<img className=\"pizza-preview\" />";
      case 18: return "/* Load Details */\n<h2>MARGHERITA</h2>\n<p className=\"price\">12.50€</p>";
      case 19: return "/* Extra Toppings UI */\n<div className=\"toppings-grid\" />";
      case 20: return "/* Simulating Topping Select */\ntopping.toggle('Stracciatella');";
      case 21: return "/* Quantity UI */\n<QuantitySelector />";
      case 22: return "/* Simulating Add to Cart */\ncart.add(pizza, qty=1);";
      case 23: return "/* Closing Customizer */\nmodal.close();";
      case 24: return "/* Section Finished */";
      default: return "";
    }
  };

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

      {/* Color swatch for badge color (Step 11) */}
      <ColorSwatchPicker
        isVisible={step === 11}
        colors={['#1a1a1a', '#f4a340', '#e8563a']}
        activeIndex={2}
        position={{ x: '32%', y: '22%' }}
        colorName="Badge #e8563a"
      />

      {/* Color swatch for grid card hover effect (Step 13) */}
      <ColorSwatchPicker
        isVisible={step === 13}
        colors={['#2d3922', '#e8563a', '#f4a340']}
        activeIndex={1}
        position={{ x: '70%', y: '38%' }}
        colorName="Hover accent"
      />

      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-on-surface">
        
        {/* Header Area */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 mb-16 pb-6 relative">
          {/* Brutalist border line drawn horizontally */}
          <motion.div
            className="absolute bottom-0 left-0 h-[1px] bg-on-surface"
            initial={{ width: "0%" }}
            animate={{ width: step >= 1 ? "100%" : "0%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          <div className="flex items-center gap-3">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: step >= 2 ? 1 : (step >= 1 ? 0.8 : 0) }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className={`p-2.5 rounded-xl shadow-sm flex items-center justify-center transition-colors duration-[1000ms] ${
                step >= 2 ? 'bg-primary text-white brutalist-border' : 'bg-gray-200 text-gray-400'
              }`}
            >
              <Flame className="w-6 h-6" />
            </motion.span>
            <h2 className={`transition-all duration-1000 ${
              step >= 2 ? 'font-display font-extrabold text-3xl md:text-4xl text-on-surface tracking-tight uppercase' : 'font-serif font-normal text-2xl text-gray-400 tracking-normal capitalize'
            }`}>
              {step >= 2 ? <TypewriterText text="NUESTRAS ESPECIALIDADES" speed={20} /> : 'Nuestras especialidades de masa madre'}
            </h2>
          </div>
          <p className="font-mono text-xs font-bold text-center sm:text-right tracking-wider text-on-surface-variant">
            {step >= 2 ? <TypewriterText text="[ MASA MADRE DE HARINA ECOLÓGICA • 48H REPOSO ]" speed={15} /> : ""}
          </p>
        </div>

        {/* Grid Area */}
        <div className={`grid transition-all duration-1000 ${
          step >= 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8' : 'grid-cols-1 gap-4'
        }`}>
          {PIZZA_MENU.map((pizza, idx) => (
            <motion.div
              key={pizza.id}
              className="flex flex-col h-full w-full relative"
              initial={{ opacity: 0, y: 150, scale: 0 }}
              animate={{
                opacity: step >= 3 ? 1 : 0,
                y: step >= 3 ? (step >= 13 && idx === 2 ? -16 : 0) : 150,
                scale: step >= 3 ? (step >= 13 && idx === 2 ? [1, 1.15, 1.12] : 1) : 0,
                rotate: step >= 13 && idx === 2 ? [0, 3, 2] : 0
              }}
              transition={{
                opacity: { duration: 0 },
                y: { type: "spring", stiffness: 160, damping: 14, delay: step >= 3 && step < 13 ? idx * 0.08 : 0 },
                scale: { type: "spring", stiffness: 160, damping: 14, delay: step >= 3 && step < 13 ? idx * 0.08 : 0 },
                rotate: { type: "spring", stiffness: 160, damping: 14 }
              }}
            >
              {/* Selection handles around first card during step 4 */}
              {idx === 0 && (
                <SelectionHandles
                  isVisible={step === 4 || step === 5}
                  width="280"
                  height="450"
                />
              )}

              <ConstructionBox
                isActive={step >= 8}
                showContentBeforeActive={step >= 4}
                className="h-full w-full"
                fillColor="bg-white"
                borderColor="#2d3922"
                borderWidth={1.5}
                delay={idx * 0.08}
              >
                <div className={`p-6 rounded-none flex flex-col justify-between h-full relative w-full ${
                  step >= 8 ? '' : 'bg-sky-50/10 border border-dashed border-sky-400'
                }`}>
                  {/* Card blueprint guide metadata */}
                  {step >= 4 && step < 8 && (
                    <div className="absolute top-1 left-2 text-[7px] font-mono text-sky-500 z-20 pointer-events-none select-none">
                      comp: grid_card_{idx + 1}
                    </div>
                  )}

                  {/* Decorative sticker badge */}
                  {pizza.bestSeller && step >= 10 && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: step >= 11 ? 12 : 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      className={`absolute -top-3.5 -right-3.5 z-10 py-1 px-3 text-center text-[10px] font-black tracking-widest leading-none shadow-sm uppercase transition-all duration-[1000ms] ${
                        step >= 11 ? 'bg-primary text-white rotate-12 brutalist-border' : 'bg-gray-300 text-gray-500 border border-dashed border-sky-400'
                      }`}
                    >
                      {step >= 11 ? <TypewriterText text="MÁS VENDIDA" speed={20} /> : "STICKER"}
                    </motion.div>
                  )}

                  <div>
                    {/* Visual Container */}
                    <div className={`relative mb-6 h-48 flex items-center justify-center rounded-xl overflow-visible transition-colors duration-[1500ms] ${
                      step >= 8 ? 'bg-surface-low/30 border border-on-surface/5' : (step >= 4 ? 'bg-sky-50/15 border border-dashed border-sky-300' : 'bg-gray-100 border-transparent')
                    }`}>
                      {/* Grid image layout guides */}
                      {step >= 4 && step < 8 && (
                        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                          <div className="absolute w-full h-[1px] bg-sky-300/30" />
                          <div className="absolute h-full w-[1px] bg-sky-300/30" />
                          {step < 6 && <span className="text-[8px] font-mono text-sky-400 bg-sky-50/80 px-1 rounded">slot: {pizza.id}</span>}
                        </div>
                      )}

                      {step >= 5 ? (
                        <motion.img
                          initial={{ scale: 0 }}
                          animate={{ 
                            scale: step >= 13 && idx === 2 ? 1.1 : 1,
                            rotate: step >= 13 && idx === 2 ? 6 : 0
                          }}
                          transition={{ type: "spring", stiffness: 180, damping: 12 }}
                          src={pizza.image}
                          alt={pizza.name}
                          className="w-40 h-40 object-cover"
                          style={{ 
                            clipPath: step >= 6 ? 'circle(43.5% at 50% 50%)' : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                            transition: 'clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                          }}
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        step >= 4 && (
                          <div className="w-20 h-20 rounded-full border border-dashed border-sky-300 flex items-center justify-center font-mono text-[8px] text-sky-400">
                            loading...
                          </div>
                        )
                      )}
                      
                      {/* View Customizer trigger sticker on simulated hover */}
                      <button
                        className={`absolute bottom-2 right-2 p-1.5 bg-white brutalist-border rounded-full shadow-sm focus:outline-none transition-all duration-[1500ms] ${
                          step >= 13 && idx === 2 ? 'opacity-100 bg-secondary-container' : 'opacity-0'
                        } ${step === 14 && idx === 2 ? 'scale-90 bg-primary' : ''}`}
                      >
                        <Maximize2 className={`w-3.5 h-3.5 ${step === 14 ? 'text-white' : 'text-on-surface'}`} />
                      </button>
                    </div>

                    {/* Header labels */}
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className={`leading-none transition-all duration-1000 ${
                        step >= 8 ? 'font-display font-extrabold text-2xl text-on-surface tracking-tight uppercase' : 'font-serif font-normal text-lg text-gray-500 capitalize'
                      }`}>
                        {step >= 7 ? <TypewriterText text={pizza.name} speed={25} /> : ''}
                      </h3>
                      {pizza.label && step >= 10 && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                          className={`text-[9px] font-mono tracking-wider font-extrabold px-2 py-0.5 rounded-sm brutalist-border ${
                            pizza.label === 'VEGGIE' ? 'bg-secondary-container text-on-secondary-container' : 'bg-on-surface text-background'
                          }`}
                        >
                          {pizza.label}
                        </motion.span>
                      )}
                    </div>

                    {/* Description */}
                    <p className={`font-sans text-xs md:text-sm font-medium leading-relaxed mb-6 transition-all duration-[1000ms] ${
                      step >= 9 ? 'text-on-surface-variant' : 'text-gray-300/50'
                    }`}>
                        {step >= 9 ? <TypewriterText text={pizza.description} speed={12} /> : ''}
                    </p>
                  </div>

                  {/* Sub-block price CTA Button */}
                  <div className="space-y-2 pt-4 border-t border-on-surface/5">
                    <button className={`w-full py-3.5 font-display font-extrabold text-xs tracking-widest uppercase transition-all duration-[1000ms] ${
                      step >= 12 
                        ? (step >= 13 && idx === 2 ? 'bg-primary text-white border-primary brutalist-border' : 'bg-on-surface text-background brutalist-border') 
                        : 'bg-transparent text-sky-500 border border-dashed border-sky-400 font-mono text-[10px]'
                    }`}>
                      {step >= 12 ? <TypewriterText text={`${pizza.price.toFixed(2)}€ — AÑADIR`} speed={20} /> : `[btn_add_${pizza.id}]`}
                    </button>
                  </div>
                </div>
              </ConstructionBox>
            </motion.div>
          ))}
        </div>

        {/* Modal Animation */}
        <AnimatePresence>
          {step >= 16 && step < 24 && (
            <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-on-surface/60 backdrop-blur-sm"
              />
              
              <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 30 }}
                animate={{
                  scale: [0.85, 1.08, 0.98, 1],
                  opacity: 1,
                  y: 0
                }}
                exit={{ scale: 0.85, opacity: 0, y: 20 }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 16
                }}
                className="relative w-full max-w-4xl z-10"
              >
                <ConstructionBox
                  isActive={step >= 17}
                  showContentBeforeActive={step >= 16}
                  className="w-full"
                  fillColor="bg-white"
                  borderColor="#2d3922"
                  borderWidth={1.5}
                >
                  <div className={`flex flex-col md:flex-row overflow-hidden relative w-full ${
                    step >= 17 ? '' : 'bg-gray-200 border border-dashed border-sky-400 rounded-lg shadow-none'
                  }`}>
                    {/* Left side: Pizza Preview */}
                    <div className={`md:w-1/2 p-8 flex items-center justify-center relative transition-colors duration-[1500ms] ${
                      step >= 17 ? 'bg-surface-low' : 'bg-gray-300'
                    }`}>
                      {step >= 17 && (
                        <motion.img
                          initial={{ opacity: 0, rotateY: 180, scale: 0.6, rotate: -45 }}
                          animate={{
                            opacity: 1,
                            rotateY: 0,
                            scale: [0.6, 1.12, 1],
                            rotate: 0
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 120,
                            damping: 14,
                            duration: 1.2
                          }}
                          src={PIZZA_MENU[2].image}
                          className="w-full max-w-[300px] drop-shadow-2xl"
                          style={{ clipPath: 'circle(43.5% at 50% 50%)', perspective: 1000 }}
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>

                    {/* Right side: Details */}
                    <div className="md:w-1/2 flex flex-col h-[500px]">
                      <div className="p-8 border-b border-on-surface/10">
                        <h2 className="font-display font-extrabold text-3xl uppercase text-on-surface">
                          {step >= 18 ? <TypewriterText text={PIZZA_MENU[2].name} speed={25} /> : ''}
                        </h2>
                        <p className="text-primary font-display font-black text-xl mt-2">
                          {step >= 18 ? <TypewriterText text={`${PIZZA_MENU[2].price.toFixed(2)}€`} speed={20} /> : ''}
                        </p>
                      </div>

                      <div className="flex-1 overflow-y-auto p-8 space-y-8">
                        {/* Extra Toppings */}
                        {step >= 19 ? (
                          <div>
                            <h4 className="font-display font-bold text-sm uppercase mb-4 tracking-wider">
                              <TypewriterText text="Extras & Toppings" speed={20} />
                            </h4>
                            <div className="space-y-3">
                              {['Stracciatella Di Bufala (+3.00€)', 'Aceite Picante (+0.00€)'].map((top, i) => (
                                <div key={i} className={`flex items-center justify-between p-3 transition-all duration-[1000ms] ${
                                  step >= 19 ? 'border brutalist-border' : 'border border-dashed border-sky-400'
                                } ${step >= 20 && i === 0 ? 'bg-secondary-container' : 'bg-transparent'}`}>
                                  <span className="text-sm font-medium">
                                    <TypewriterText text={top} speed={15} delay={i * 200} />
                                  </span>
                                  <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                                    className={`w-5 h-5 border flex items-center justify-center transition-colors duration-[1000ms] ${
                                      step >= 20 && i === 0 ? 'bg-primary border-primary' : 'border-on-surface/30'
                                    }`}
                                  >
                                    {step >= 20 && i === 0 && <span className="text-white text-xs">✓</span>}
                                  </motion.div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="border border-dashed border-sky-400 p-4 text-sky-500 text-xs font-mono">
                            [toppings_placeholder]
                          </div>
                        )}
                      </div>

                      {/* Footer Actions */}
                      <div className="p-6 border-t border-on-surface/10 flex items-center gap-4">
                        {step >= 21 ? (
                          <>
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 200, damping: 12 }}
                              className="flex items-center brutalist-border h-12 bg-white"
                            >
                              <button className="px-4 h-full hover:bg-surface-low"><Minus className="w-4 h-4" /></button>
                              <span className="px-4 font-mono font-bold border-x border-on-surface">1</span>
                              <button className="px-4 h-full hover:bg-surface-low"><Plus className="w-4 h-4" /></button>
                            </motion.div>
                            
                            <motion.button 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                              className={`flex-1 h-12 flex items-center justify-center gap-2 font-display font-extrabold text-sm tracking-widest uppercase transition-all duration-[500ms] ${
                                step >= 21 ? 'bg-on-surface text-background brutalist-border hover:bg-primary' : ''
                              } ${step === 22 ? 'scale-95 bg-primary text-white' : ''}`}
                            >
                              <ShoppingBag className="w-4 h-4" />
                              <TypewriterText text="Añadir al Carrito" speed={20} />
                            </motion.button>
                          </>
                        ) : (
                          <div className="w-full h-12 border border-dashed border-sky-400 flex items-center justify-center text-sky-500 font-mono text-xs">
                            [button_actions_placeholder]
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ConstructionBox>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Helper overlay hidden when finished */}
        {step < 24 && !isAutoplay && (
          <div className="fixed top-2 left-2 text-[10px] font-mono text-gray-400 opacity-50 select-none pointer-events-none z-50">
            TIMELAPSE MODE [MENU] - STEP {step}/24
          </div>
        )}

      </section>
    </div>
  );
}
