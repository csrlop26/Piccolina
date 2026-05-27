import { motion } from 'motion/react';
import { useTimelapse } from '../../hooks/useTimelapse';
import { IMAGES_RESOURCES } from '../../data';
import CodeEditorOverlay from './CodeEditorOverlay';

export default function TimelapseHero({ isActive, isAutoplay, onComplete }: { isActive?: boolean, isAutoplay?: boolean, onComplete?: () => void }) {
  const step = useTimelapse(15, isActive ?? true, isAutoplay ?? false, onComplete);

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
      case 7: return "/* Inserting emoji */\n.badge::after { content: '🍕'; }";
      case 8: return "/* Adding basil leaves */\n<div className=\"leaf\">🌿</div>\n<div className=\"leaf\">🌿</div>";
      case 9: return "/* Drawing oval plate */\n<div className=\"plate\" />\nborder-radius: 50%;";
      case 10: return "/* Coloring plate */\n.plate { background-color: #e8563a; }";
      case 11: return "/* Fetching high-res Pizza asset... */\n<img src=\"pizza.png\" />";
      case 12: return "/* Removing background */\nimg { clip-path: circle(48% at 50% 50%); }";
      case 13: return "/* Applying 3D shadow */\nimg { filter: drop-shadow(0 28px 44px rgba(0,0,0,0.25)); }";
      case 14: return "/* Final Hero composite ready */\nconsole.log('Hero loaded!');";
      default: return "";
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 overflow-hidden relative flex flex-col ${step >= 1 ? 'bg-background' : 'bg-white'}`}>
      
      {/* Code Editor overlay */}
      <CodeEditorOverlay isVisible={isActive ?? true} codeSnippet={getCodeSnippet(step)} />

      {/* Main hero wrapper */}
      <section className="relative flex-1 w-full h-full flex flex-col">

        {/* BACKGROUND TEXT: Huge bold "PICCOLINA" perfectly centered */}
        <motion.div
          className={`absolute inset-0 flex items-center justify-center select-none pointer-events-none z-30 transition-opacity duration-[1500ms] ${
            step >= 2 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h1
            className={`font-display font-black text-on-surface uppercase leading-[0.88] transition-all duration-[1500ms] ${
              step >= 3 ? 'text-[clamp(46px,13.5vw,200px)] tracking-tighter' : 'text-5xl tracking-widest'
            }`}
          >
            PICCOLI<span className={`transition-colors duration-[1500ms] ${step >= 4 ? 'text-[#e8563a]' : 'text-inherit'}`}>N</span>A
          </h1>
        </motion.div>

        {/* Floating pizza zone perfectly overlapping the text */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          
          {/* Rotating amber badge */}
          <motion.div
            className={`absolute top-[14%] left-4 md:left-16 z-20 pointer-events-auto transition-all duration-[1500ms] ${
              step >= 5 ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-30'
            }`}
          >
            <div className="relative w-[6.5rem] h-[6.5rem] animate-spin-slow">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <path d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" id="heroBadge" />
                <circle fill={step >= 6 ? "#f4a340" : "#E5E7EB"} cx="50" cy="50" r="38" className="transition-colors duration-[1500ms]" />
                <text style={{ fontSize: '6.5px', fontWeight: 700, letterSpacing: '0.2em', fill: '#2d3922', textTransform: 'uppercase' }}>
                  <textPath xlinkHref="#heroBadge">
                    • TAKE A SLICE • HORNO DE LEÑA • SOURDOUGH •
                  </textPath>
                </text>
              </svg>
              <div className={`absolute inset-0 flex items-center justify-center text-xl select-none transition-opacity duration-[1500ms] ${step >= 7 ? 'opacity-100' : 'opacity-0'}`}>🍕</div>
            </div>
          </motion.div>

          {/* Basil leaves */}
          <motion.div
            className={`absolute bottom-[22%] left-[7%] text-2xl select-none transition-all duration-[1500ms] ${step >= 8 ? 'opacity-85 translate-x-0 rotate-12' : 'opacity-0 -translate-x-5 rotate-25'}`}
          >🌿</motion.div>
          <motion.div
            className={`absolute bottom-[18%] right-[7%] text-xl select-none transition-all duration-[1500ms] ${step >= 8 ? 'opacity-85 translate-x-0 -rotate-12' : 'opacity-0 translate-x-5 -rotate-25'}`}
          >🌿</motion.div>

          {/* Coral oval plate & Pizza Wrapper */}
          <div className="relative flex items-center justify-center w-full h-full pointer-events-auto">
            
            {/* Coral oval plate perfectly centered behind pizza */}
            <motion.div
              className={`absolute rounded-full transition-all duration-[1500ms] ${
                step >= 9 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
              style={{
                width: 'clamp(300px, 58vw, 740px)',
                height: 'clamp(300px, 58vw, 740px)', // Perfectly circular
                backgroundColor: step >= 10 ? '#e8563a' : '#E5E7EB',
              }}
            />

            {/* Pizza */}
            <motion.div
              className={`relative z-10 select-none transition-all duration-[1500ms] ${
                step >= 11 ? 'opacity-100 translate-y-0 rotate-0 scale-100' : 'opacity-0 translate-y-32 -rotate-14 scale-90'
              }`}
              style={{
                width: 'clamp(280px, 54vw, 700px)', // Slightly smaller than circle
                height: 'clamp(280px, 54vw, 700px)',
                filter: step >= 13 ? 'drop-shadow(0 28px 44px rgba(0,0,0,0.25))' : 'none',
              }}
            >
              <div className={`w-full h-full bg-gray-200 rounded-full transition-opacity duration-1000 ${step >= 12 ? 'opacity-0 absolute inset-0' : 'opacity-100'}`} />
              <img
                src={IMAGES_RESOURCES.heroPizza}
                alt="Pizza artesanal de horno de leña"
                className={`w-full h-full object-cover transition-opacity duration-[1500ms] ${
                  step >= 11 ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  clipPath: step >= 12 ? 'circle(48% at 50% 50%)' : 'circle(100% at 50% 50%)',
                }}
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>

        {/* Helper overlay hidden when finished */}
        {step < 15 && (
          <div className="absolute top-2 left-2 text-[10px] font-mono text-gray-400 opacity-50 select-none pointer-events-none z-50">
            TIMELAPSE MODE [HERO] - STEP {step}/15 - Press Right Arrow
          </div>
        )}
      </section>
    </div>
  );
}
