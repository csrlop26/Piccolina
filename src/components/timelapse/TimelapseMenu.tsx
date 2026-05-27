import { motion, AnimatePresence } from 'motion/react';
import { useTimelapse } from '../../hooks/useTimelapse';
import { PIZZA_MENU } from '../../data';
import { Flame, Maximize2, Plus, Minus, ShoppingBag } from 'lucide-react';
import CodeEditorOverlay from './CodeEditorOverlay';

export default function TimelapseMenu({ isActive, isAutoplay, onComplete }: { isActive?: boolean, isAutoplay?: boolean, onComplete?: () => void }) {
  const step = useTimelapse(25, isActive ?? true, isAutoplay ?? false, onComplete);

  const getCodeSnippet = (s: number) => {
    switch (s) {
      case 0: return "";
      case 1: return "// Menu Header\n<div className=\"header-bar\" />";
      case 2: return "<h1>NUESTRAS ESPECIALIDADES</h1>\nfont-family: 'Playfair Display';";
      case 3: return "/* Setup CSS Grid */\ndisplay: grid;\ngrid-template-columns: repeat(4, 1fr);\ngap: 2rem;";
      case 4: return "/* Load Card Wireframes */\n<div className=\"card\" />";
      case 5: return "/* Load pizza images */\n<img src=\"pizza.png\" />";
      case 6: return "/* Mask images to circles */\nclip-path: circle(44% at 50% 50%);";
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

      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-on-surface">
        
        {/* Header Area */}
        <motion.div 
          className={`flex flex-col sm:flex-row items-center sm:justify-between gap-4 mb-16 pb-6 transition-all duration-[1500ms] ${
            step >= 1 ? 'border-b border-on-surface opacity-100' : 'border-transparent opacity-0'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className={`p-2.5 rounded-xl shadow-sm flex items-center justify-center transition-colors duration-[1500ms] ${
              step >= 2 ? 'bg-primary text-white brutalist-border' : 'bg-gray-200 text-gray-400'
            }`}>
              <Flame className="w-6 h-6" />
            </span>
            <h2 className={`uppercase transition-all duration-[1500ms] ${
              step >= 2 ? 'font-display font-extrabold text-3xl md:text-4xl text-on-surface tracking-tight' : 'font-sans font-normal text-2xl text-gray-400 tracking-normal'
            }`}>
              {step >= 2 ? 'NUESTRAS ESPECIALIDADES' : 'LOREM IPSUM HEADING'}
            </h2>
          </div>
          <p className={`font-mono text-xs font-bold text-center sm:text-right tracking-wider transition-opacity duration-[1500ms] ${
            step >= 2 ? 'text-on-surface-variant opacity-100' : 'opacity-0'
          }`}>
            [ MASA MADRE DE HARINA ECOLÓGICA • 48H REPOSO ]
          </p>
        </motion.div>

        {/* Grid Area */}
        <div className={`grid transition-all duration-1000 ${
          step >= 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8' : 'grid-cols-1 gap-4'
        }`}>
          {PIZZA_MENU.map((pizza, idx) => (
            <motion.div
              key={pizza.id}
              className={`p-6 rounded-none flex flex-col justify-between h-full relative transition-all duration-[1500ms] ease-out ${
                step >= 4 ? 'bg-white brutalist-border opacity-100' : 'bg-transparent border-transparent opacity-0'
              } ${
                /* Simulate hover on the 3rd card at step 13 */
                step >= 13 && idx === 2 ? '-translate-y-2 shadow-xl' : 'translate-y-0 shadow-none'
              }`}
            >
              {/* Decorative sticker badge */}
              {pizza.bestSeller && step >= 10 && (
                <motion.div 
                  className={`absolute -top-3.5 -right-3.5 z-10 py-1 px-3 text-center text-[10px] font-black tracking-widest leading-none shadow-sm uppercase transition-all duration-[1500ms] ${
                    step >= 11 ? 'bg-primary text-white rotate-12 brutalist-border' : 'bg-gray-300 text-gray-500 rotate-0 border-transparent'
                  }`}
                >
                  MÁS VENDIDA
                </motion.div>
              )}

              <div>
                {/* Visual Container */}
                <div className={`relative mb-6 h-48 flex items-center justify-center rounded-xl overflow-visible transition-colors duration-[1500ms] ${
                  step >= 5 ? 'bg-surface-low/30 border border-on-surface/5' : 'bg-gray-100 border-transparent'
                }`}>
                  {step >= 5 ? (
                    <motion.img
                      src={pizza.image}
                      alt={pizza.name}
                      className={`w-40 h-40 object-cover transition-all duration-[1500ms] ease-out ${
                        /* Hover simulate */
                        step >= 13 && idx === 2 ? 'scale-110 rotate-6' : 'scale-100 rotate-0'
                      }`}
                      style={{ 
                        clipPath: step >= 6 ? 'circle(44% at 50% 50%)' : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' 
                      }}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200" />
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
                <div className={`flex justify-between items-start gap-2 mb-2 transition-opacity duration-[1500ms] ${
                  step >= 7 ? 'opacity-100' : 'opacity-0'
                }`}>
                  <h3 className={`uppercase leading-none transition-all duration-[1500ms] ${
                    step >= 8 ? 'font-display font-extrabold text-2xl text-on-surface tracking-tight' : 'font-sans font-normal text-lg text-gray-400 tracking-normal'
                  }`}>
                    {pizza.name}
                  </h3>
                  {pizza.label && step >= 10 && (
                    <span className={`text-[9px] font-mono tracking-wider font-extrabold px-2 py-0.5 rounded-sm brutalist-border ${
                      pizza.label === 'VEGGIE' ? 'bg-secondary-container text-on-secondary-container' : 'bg-on-surface text-background'
                    }`}>
                      {pizza.label}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className={`font-sans text-xs md:text-sm font-medium leading-relaxed mb-6 transition-all duration-[1500ms] ${
                  step >= 9 ? 'text-on-surface-variant opacity-100' : 'text-gray-300 opacity-0'
                }`}>
                  {pizza.description}
                </p>
              </div>

              {/* Sub-block price CTA Button */}
              <div className={`space-y-2 pt-4 transition-all duration-[1500ms] ${
                step >= 12 ? 'border-t border-on-surface/5 opacity-100' : 'border-transparent opacity-0'
              }`}>
                <button className={`w-full py-3.5 font-display font-extrabold text-xs tracking-widest uppercase transition-all duration-[1500ms] ${
                  step >= 12 ? 'bg-on-surface text-background brutalist-border' : 'bg-gray-200 text-gray-400 border border-gray-300'
                } ${step >= 13 && idx === 2 ? 'bg-primary text-white border-primary' : ''}`}>
                  {pizza.price.toFixed(2)}€ — AÑADIR
                </button>
              </div>
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
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                className={`relative w-full max-w-4xl flex flex-col md:flex-row overflow-hidden transition-all duration-[1500ms] ${
                  step >= 17 ? 'bg-white brutalist-border brutalist-shadow rounded-none' : 'bg-gray-200 border-transparent rounded-lg shadow-none'
                }`}
              >
                {/* Left side: Pizza Preview */}
                <div className={`md:w-1/2 p-8 flex items-center justify-center relative transition-colors duration-[1500ms] ${
                  step >= 17 ? 'bg-surface-low' : 'bg-gray-300'
                }`}>
                  {step >= 17 && (
                    <motion.img
                      initial={{ opacity: 0, rotate: -45 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ duration: 1 }}
                      src={PIZZA_MENU[2].image}
                      className="w-full max-w-[300px] drop-shadow-2xl"
                      style={{ clipPath: 'circle(46% at 50% 50%)' }}
                    />
                  )}
                </div>

                {/* Right side: Details */}
                <div className="md:w-1/2 flex flex-col h-[500px]">
                  <div className={`p-8 border-b transition-colors duration-[1500ms] ${
                    step >= 18 ? 'border-on-surface/10' : 'border-transparent'
                  }`}>
                    <h2 className={`transition-all duration-[1500ms] ${
                      step >= 18 ? 'font-display font-extrabold text-3xl uppercase text-on-surface opacity-100' : 'font-sans text-xl text-gray-400 opacity-0'
                    }`}>
                      {PIZZA_MENU[2].name}
                    </h2>
                    <p className={`transition-all duration-[1500ms] ${
                      step >= 18 ? 'text-primary font-display font-black text-xl mt-2 opacity-100' : 'text-gray-400 text-lg opacity-0'
                    }`}>
                      {PIZZA_MENU[2].price.toFixed(2)}€
                    </p>
                  </div>

                  <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    {/* Extra Toppings */}
                    <div className={`transition-opacity duration-[1500ms] ${step >= 19 ? 'opacity-100' : 'opacity-0'}`}>
                      <h4 className="font-display font-bold text-sm uppercase mb-4 tracking-wider">Extras & Toppings</h4>
                      <div className="space-y-3">
                        {['Stracciatella Di Bufala (+3.00€)', 'Aceite Picante (+0.00€)'].map((top, i) => (
                          <div key={i} className={`flex items-center justify-between p-3 transition-colors duration-[1500ms] ${
                            step >= 19 ? 'border brutalist-border' : 'border-transparent bg-gray-100'
                          } ${step >= 20 && i === 0 ? 'bg-secondary-container' : ''}`}>
                            <span className="text-sm font-medium">{top}</span>
                            <div className={`w-5 h-5 border flex items-center justify-center transition-colors duration-[1500ms] ${
                              step >= 20 && i === 0 ? 'bg-primary border-primary' : 'border-on-surface/30'
                            }`}>
                              {step >= 20 && i === 0 && <span className="text-white text-xs">✓</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className={`p-6 border-t transition-colors duration-[1500ms] flex items-center gap-4 ${
                    step >= 21 ? 'border-on-surface/10' : 'border-transparent'
                  }`}>
                    <div className={`flex items-center brutalist-border h-12 transition-opacity duration-[1500ms] ${
                      step >= 21 ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <button className="px-4 h-full hover:bg-surface-low"><Minus className="w-4 h-4" /></button>
                      <span className="px-4 font-mono font-bold border-x border-on-surface">1</span>
                      <button className="px-4 h-full hover:bg-surface-low"><Plus className="w-4 h-4" /></button>
                    </div>
                    
                    <button className={`flex-1 h-12 flex items-center justify-center gap-2 font-display font-extrabold text-sm tracking-widest uppercase transition-all duration-[1500ms] ${
                      step >= 21 ? 'bg-on-surface text-background brutalist-border hover:bg-primary opacity-100' : 'bg-gray-200 text-gray-400 opacity-0'
                    } ${step === 22 ? 'scale-95 bg-primary' : ''}`}>
                      <ShoppingBag className="w-4 h-4" />
                      Añadir al Carrito
                    </button>
                  </div>
                </div>
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
