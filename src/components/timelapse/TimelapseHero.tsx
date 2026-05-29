import { motion } from 'motion/react';
import { useTimelapse } from '../../hooks/useTimelapse';
import { IMAGES_RESOURCES } from '../../data';
import CodeEditorOverlay from './CodeEditorOverlay';
import DesignCursor from './DesignCursor';
import ColorSwatchPicker from './ColorSwatchPicker';
import SelectionHandles from './SelectionHandles';
import TypewriterText from './TypewriterText';

export default function TimelapseHero({ isActive, isAutoplay, onComplete }: { isActive?: boolean, isAutoplay?: boolean, onComplete?: () => void }) {
  const step = useTimelapse(15, isActive ?? true, isAutoplay ?? false, onComplete);

  // --- Design Cursor choreography ---
  const getCursorState = (s: number) => {
    switch (s) {
      case 2: return { x: '50%', y: '45%', visible: true, clicking: true, dragging: false, label: 'Select text' };
      case 3: return { x: '48%', y: '42%', visible: true, clicking: true, dragging: false, label: 'Resize' };
      case 4: return { x: '57%', y: '48%', visible: true, clicking: false, dragging: false, label: '' };
      case 9: return { x: '50%', y: '50%', visible: true, clicking: false, dragging: true, label: 'Draw ellipse' };
      case 10: return { x: '55%', y: '55%', visible: true, clicking: true, dragging: false, label: '' };
      case 11: return { x: '50%', y: '20%', visible: true, clicking: false, dragging: true, label: 'Drop asset' };
      case 12: return { x: '50%', y: '50%', visible: true, clicking: true, dragging: false, label: 'clip-path' };
      default: return { x: '80%', y: '80%', visible: false, clicking: false, dragging: false, label: '' };
    }
  };

  // --- Color Swatch choreography ---
  // Step 4: Picking color for the "N" letter
  const getNColorSwatchState = (s: number) => {
    if (s === 4) return { visible: true, activeIndex: 0, colorName: '#94a3b8 Gray' };
    if (s === 4.5) return { visible: true, activeIndex: 1, colorName: '#3b82f6 Blue' }; // Won't actually hit 4.5 — we subdivide in the component
    return { visible: false, activeIndex: 0, colorName: '' };
  };

  // Step 10: Picking color for the coral plate
  const getPlateColorSwatchState = (s: number) => {
    if (s === 10) return { visible: true, activeIndex: 0, colorName: '#e2e8f0 Light' };
    return { visible: false, activeIndex: 0, colorName: '' };
  };

  // For the "N" color, we cycle through colors with a sub-step timer
  // activeIndex goes 0→1→2 across the step duration
  const nSwatchActive = step === 4 ? 2 : 0; // Final color (coral)
  const plateSwatchActive = step === 10 ? 2 : 0; // Final color (coral)

  const cursorState = getCursorState(step);

  // Map steps to fake code snippets
  const getCodeSnippet = (s: number) => {
    switch (s) {
      case 0: return "";
      case 1: return "// Initializing viewport...\nbody { background: #F6F3EC; }";
      case 2: return "// Injecting Hero Typeface\n@import url('Playfair Display');\nh1 { font-family: 'Playfair Display', serif; }";
      case 3: return "/* Scaling text... */\nh1 { font-size: clamp(46px, 13.5vw, 200px); }";
      case 4: return "/* Applying brand color to 'N' */\nspan.n { color: #e8563a; }";
      case 5: return "/* Loading Badge Element */\n<Badge text=\"TAKE A SLICE\" />\nposition: absolute;\nanimation: spin-slow 15s linear infinite;";
      case 6: return "/* Styling Badge */\n.badge { fill: #f4a340; }";
      case 7: return "/* Rendering badge icon */\n<svg class=\"badge-icon\" />\n/* slice shape SVG */\n.badge-icon { fill: #2d3922; }";
      case 8: return "/* Adding leaf accents */\n<Leaf className=\"leaf-top\" />\n<Leaf className=\"leaf-bottom\" />\nposition: absolute;";
      case 9: return "/* Drawing oval plate */\n<div className=\"plate\" />\nborder-radius: 50%;";
      case 10: return "/* Coloring plate */\n.plate { background-color: #e8563a; }";
      case 11: return "/* Fetching high-res Pizza asset... */\n<img src=\"pizza.png\" />";
      case 12: return "/* Removing background */\nimg { clip-path: circle(43.5% at 50% 50%); }";
      case 13: return "/* Applying 3D shadow */\nimg { filter: drop-shadow(0 28px 44px rgba(0,0,0,0.25)); }";
      case 14: return "/* Final Hero composite ready */\nconsole.log('Hero loaded!');";
      default: return "";
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-[1200ms] overflow-hidden relative flex flex-col ${
      step >= 1 && step < 10 ? 'blueprint-grid bg-slate-50' : (step >= 10 ? 'bg-background' : 'bg-white')
    }`} style={{ transitionTimingFunction: 'cubic-bezier(0.17, 0.67, 0.33, 0.96)' }}>
      
      {/* Code Editor overlay */}
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

      {/* Color Swatch for "N" color pick (Step 4) */}
      <ColorSwatchPicker
        isVisible={step === 4}
        colors={['#94a3b8', '#3b82f6', '#e8563a']}
        activeIndex={nSwatchActive}
        position={{ x: '60%', y: '42%' }}
        colorName="Brand Coral #e8563a"
      />

      {/* Color Swatch for Plate color pick (Step 10) */}
      <ColorSwatchPicker
        isVisible={step === 10}
        colors={['#e2e8f0', '#22c55e', '#e8563a']}
        activeIndex={plateSwatchActive}
        position={{ x: '60%', y: '58%' }}
        colorName="Plate #e8563a"
      />

      {/* Main hero wrapper */}
      <section className="relative flex-1 w-full h-full flex flex-col">

        {/* BACKGROUND TEXT: Huge bold "PICCOLINA" perfectly centered */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-30"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{
            opacity: step >= 2 ? 1 : 0,
            scale: step >= 3 ? [0.9, 1.08, 0.98, 1] : 0.9,
            rotate: step >= 3 ? [-4, 2, -1, 0] : 0,
            skewX: step === 3 ? [0, -10, 5, 0] : 0
          }}
          transition={{
            opacity: { duration: 0.4, ease: [0.17, 0.67, 0.33, 0.96] },
            scale: { type: "spring", stiffness: 140, damping: 16, delay: 0.1 },
            rotate: { type: "spring", stiffness: 140, damping: 16, delay: 0.15 },
            skewX: { duration: 0.6, ease: [0.17, 0.67, 0.33, 0.96], delay: 0.05 }
          }}
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* Selection Handles around the title — visible during steps 2-3 */}
            <SelectionHandles
              isVisible={step === 2 || step === 3}
              width={step >= 3 ? '1200' : '320'}
              height={step >= 3 ? '180' : '40'}
            />

            {/* Visual alignment outline for blueprint mode */}
            {step === 2 && (
              <div className="absolute -inset-4 border border-dashed border-sky-400 flex items-center justify-center">
                <span className="absolute -top-5 left-0 text-[9px] font-mono text-sky-500 bg-sky-100 px-1 rounded">w: 100% | h: 200px</span>
                <span className="absolute -bottom-5 right-0 text-[9px] font-mono text-sky-500 bg-sky-100 px-1 rounded">align: center</span>
                <div className="w-full h-[1px] bg-sky-200 absolute top-1/2 left-0" />
              </div>
            )}
            <h1
              className={`font-black text-on-surface leading-[0.88] transition-all duration-1000 ${
                step >= 3 ? 'font-display uppercase tracking-tighter' : 'font-serif tracking-normal capitalize text-gray-500'
              }`}
              style={{ 
                fontSize: step >= 3 ? 'clamp(46px, 13.5vw, 200px)' : 'clamp(28px, 6vw, 75px)',
                letterSpacing: step >= 3 ? '-0.05em' : '0.1em'
              }}
            >
              {step >= 3 ? (
                <>
                  <TypewriterText text="PICCOLI" speed={25} />
                  <span className={`transition-colors duration-1000 ${step >= 4 ? 'text-[#e8563a]' : 'text-inherit'}`}>
                    <TypewriterText text="N" speed={25} delay={175} />
                  </span>
                  <TypewriterText text="A" speed={25} delay={200} />
                </>
              ) : (
                step >= 2 ? <TypewriterText text="La Piccolina Restaurant" speed={20} /> : ""
              )}
            </h1>
          </div>
        </motion.div>

        {/* Floating pizza zone perfectly overlapping the text */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          
          {/* Rotating amber badge */}
          <motion.div
            className="absolute top-[14%] left-4 md:left-16 z-20 pointer-events-auto"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: step >= 5 ? 1 : 0,
              scale: step >= 5 ? 1 : 0,
              rotate: step >= 5 ? 0 : -60,
            }}
            transition={{
              opacity: { duration: 0 },
              scale: { type: "spring", stiffness: 150, damping: 12 },
              rotate: { type: "spring", stiffness: 150, damping: 12 }
            }}
          >
            <div className="relative w-[6.5rem] h-[6.5rem] animate-spin-slow">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                {/* Blueprint dashed ring (step 5) → becomes amber filled (step 6+) */}
                <circle
                  stroke={step === 5 ? '#38bdf8' : '#2d3922'}
                  strokeWidth="1.3"
                  strokeDasharray={step === 5 ? '4 3' : '3.8 2.8'}
                  cx="50" cy="50" r="46"
                  className="transition-all duration-700"
                />
                <circle
                  fill={step >= 6 ? '#f4a340' : 'transparent'}
                  cx="50" cy="50" r="40"
                  className="transition-all duration-[1000ms]"
                />
                {step >= 6 && (
                  <>
                    {/* Outer decorative dashed ring */}
                    <circle stroke="#2d3922" strokeWidth="0.7" strokeDasharray="2.2 2.2" cx="50" cy="50" r="44" />
                    {/* Inner ring */}
                    <circle stroke="#2d3922" strokeWidth="1.2" cx="50" cy="50" r="31" />
                    {/* TOP arc path */}
                    <path id="tlBadgeTop" d="M 14,50 A 36,36 0 1,1 86,50" fill="none" stroke="none"/>
                    {/* BOTTOM arc path — counter-clockwise for correct reading direction */}
                    <path id="tlBadgeBot" d="M 14,50 A 36,36 0 1,0 86,50" fill="none" stroke="none"/>
                    <text style={{ fontSize: '6.2px', fontWeight: 800, letterSpacing: '0.09em', fill: '#2d3922', textTransform: 'uppercase' }} textAnchor="middle">
                      <textPath xlinkHref="#tlBadgeTop" startOffset="50%">TAKE A SLICE</textPath>
                    </text>
                    <text style={{ fontSize: '6.2px', fontWeight: 800, letterSpacing: '0.09em', fill: '#2d3922', textTransform: 'uppercase' }} textAnchor="middle">
                      <textPath xlinkHref="#tlBadgeBot" startOffset="50%">LOVE PIZZA</textPath>
                    </text>
                  </>
                )}
              </svg>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: step >= 7 ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="absolute inset-0 flex items-center justify-center select-none"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3L3 19h18L12 3z" fill="#2d3922" opacity="0.85"/>
                  <path d="M12 7L6 17h12L12 7z" fill="#f4a340" opacity="0.6"/>
                  <circle cx="10" cy="14" r="1.3" fill="#e8563a"/>
                  <circle cx="14.5" cy="15" r="1" fill="#e8563a" opacity="0.75"/>
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* Basil leaves */}
          <motion.div
            className="absolute bottom-[22%] left-[7%] text-2xl select-none"
            initial={{ opacity: 0, scale: 0, x: -40, rotate: 45 }}
            animate={
              step >= 8
                ? {
                    opacity: 0.85,
                    scale: 1,
                    x: 0,
                    y: [0, -10, 0],
                    rotate: [12, 22, 12],
                  }
                : { opacity: 0, scale: 0, x: -40, rotate: 45 }
            }
            transition={
              step >= 8
                ? {
                    default: { type: 'spring', stiffness: 100, damping: 12 },
                    y: { repeat: Infinity, duration: 3.6, ease: [0.25, 0.46, 0.45, 0.94] },
                    rotate: { repeat: Infinity, duration: 4.2, ease: [0.25, 0.46, 0.45, 0.94] },
                    opacity: { duration: 0.4 }
                  }
                : { opacity: { duration: 0.3 } }
            }
          >
              <svg width="20" height="24" viewBox="0 0 20 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round">
                <path d="M10 2C8 6 6 8 6 12c0 3.3 3.6 5 10 5s10-1.7 10-5c0-4 -2-6 -4-10" />
                <path d="M8 10c-1 1-2 1-3 0" />
                <path d="M12 14c-1 1-2 1-3 0" />
              </svg>
            </motion.div>
          <motion.div
            className="absolute bottom-[18%] right-[7%] select-none"
            initial={{ opacity: 0, scale: 0, x: 40, rotate: -45 }}
            animate={
              step >= 8
                ? {
                    opacity: 0.85,
                    scale: 1,
                    x: 0,
                    y: [0, 8, 0],
                    rotate: [-12, -22, -12],
                  }
                : { opacity: 0, scale: 0, x: 40, rotate: -45 }
            }
            transition={
              step >= 8
                ? {
                    default: { type: 'spring', stiffness: 100, damping: 12 },
                    y: { repeat: Infinity, duration: 3.4, ease: [0.25, 0.46, 0.45, 0.94] },
                    rotate: { repeat: Infinity, duration: 3.8, ease: [0.25, 0.46, 0.45, 0.94] },
                    opacity: { duration: 0.4 }
                  }
                : { opacity: { duration: 0.3 } }
            }
          >
            <svg width="18" height="22" viewBox="0 0 18 22" fill="none" stroke="#22c55e" strokeWidth="1.4" strokeLinecap="round">
              <path d="M9 1C7 4 5 6 5 10c0 3 3 4 9 4s9-1 9-4c0-4 -2-6 -4-9" />
              <path d="M7 8c-1 0.8-1.5 0.8-2 0" />
              <path d="M11 12c-1 0.8-1.5 0.8-2 0" />
            </svg>
          </motion.div>

          {/* Coral oval plate & Pizza Wrapper */}
          <div className="relative flex items-center justify-center w-full h-full pointer-events-auto">
            
            {/* Coral oval plate perfectly centered behind pizza */}
            <motion.div
              className={`absolute rounded-full flex items-center justify-center ${step === 9 ? 'border-2 border-dashed border-sky-400 bg-sky-50/10' : ''}`}
              style={{
                width: 'clamp(300px, 58vw, 740px)',
                height: 'clamp(300px, 58vw, 740px)', // Perfectly circular
                backgroundColor: step >= 10 ? '#e8563a' : (step === 9 ? 'transparent' : 'transparent'),
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: step >= 9 ? [0, 1.12, 0.98, 1] : 0,
                opacity: step >= 9 ? 1 : 0
              }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 14
              }}
            >
              {/* Selection handles around the plate during step 9 */}
              <SelectionHandles
                isVisible={step === 9}
                width="740"
                height="740"
                color="#0d99ff"
              />

              {/* Compass blueprint details */}
              {step === 9 && (
                <div className="w-full h-full relative flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-sky-500 rounded-full" /> {/* Compass pivot */}
                  <div className="w-full h-[1px] bg-sky-300/40 absolute" />
                  <div className="h-full w-[1px] bg-sky-300/40 absolute" />
                  <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-sky-500 bg-sky-50 px-1 rounded">R: 350px</span>
                </div>
              )}
            </motion.div>

            {/* Pizza */}
            <motion.div
              className="relative z-10 select-none"
              style={{
                width: 'clamp(280px, 54vw, 700px)', // Slightly smaller than circle
                height: 'clamp(280px, 54vw, 700px)',
              }}
              initial={{ opacity: 0, y: -800, scale: 0 }}
              animate={{
                opacity: step >= 11 ? 1 : 0,
                y: step >= 11 ? 0 : -800,
                scale: step >= 11 ? [0.5, 1.15, 0.96, 1.02, 1] : 0,
                rotate: step >= 11 ? [-45, 12, -4, 2, 0] : -45,
                filter: step >= 13 ? 'drop-shadow(0 28px 44px rgba(0,0,0,0.25))' : 'drop-shadow(0 0px 0px rgba(0,0,0,0))'
              }}
              transition={{
                opacity: { duration: 0 },
                y: { type: "spring", stiffness: 150, damping: 12 },
                scale: { type: "spring", stiffness: 150, damping: 12 },
                rotate: { type: "spring", stiffness: 150, damping: 12 }
              }}
            >
              {/* Draft slice segments for pizza blueprint */}
              {step === 11 && (
                <div className="absolute inset-0 border border-dashed border-sky-400 rounded-full flex items-center justify-center bg-sky-50/20 z-20">
                  <div className="absolute w-full h-[1px] bg-sky-400/40" />
                  <div className="absolute h-full w-[1px] bg-sky-400/40" />
                  <div className="absolute w-full h-[1px] bg-sky-400/40 rotate-45" />
                  <div className="absolute w-full h-[1px] bg-sky-400/40 -rotate-45" />
                  <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-mono text-sky-600 bg-sky-100 px-1.5 py-0.5 rounded shadow-sm">wireframe: pizza_slices</span>
                </div>
              )}
              
              {step === 11 && (
                <div className="w-full h-full bg-gray-200 rounded-full absolute inset-0" />
              )}
              <img
                src={IMAGES_RESOURCES.heroPizza}
                alt="Pizza artesanal de horno de leña"
                className="w-full h-full object-cover"
                style={{
                  clipPath: step >= 12 ? 'circle(43.5% at 50% 50%)' : (step === 11 ? 'circle(43.5% at 50% 50%)' : 'circle(0%)'),
                  transition: 'clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  mixBlendMode: 'normal',
                }}
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>

        {/* Helper overlay hidden when finished */}
        {step < 15 && !isAutoplay && (
          <div className="absolute top-2 left-2 text-[10px] font-mono text-gray-400 opacity-50 select-none pointer-events-none z-50">
            TIMELAPSE MODE [HERO] - STEP {step}/15 - Press Right Arrow
          </div>
        )}
      </section>
    </div>
  );
}
