import { motion } from 'motion/react';
import { useTimelapse } from '../../hooks/useTimelapse';
import { IMAGES_RESOURCES } from '../../data';
import CodeEditorOverlay from './CodeEditorOverlay';

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

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${step >= 1 ? 'bg-surface-container' : 'bg-white'}`}>
      <CodeEditorOverlay isVisible={isActive ?? true} codeSnippet={getCodeSnippet(step)} />

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
            
            <div className={`relative z-10 flex items-center justify-center transition-all duration-[1500ms] ${
              step >= 2 ? 'scale-100' : 'scale-50 opacity-0'
            }`}>
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
                style={{ clipPath: 'circle(48% at 50% 50%)' }}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <h2 className={`transition-all duration-[1500ms] mb-4 leading-none tracking-tighter ${
            step >= 4 ? 'font-display font-black text-5xl md:text-7xl uppercase text-on-surface' : 'font-sans font-normal text-3xl text-gray-400'
          } ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
            VEN A PROBARLA
          </h2>
          
          <p className={`font-sans max-w-md mx-auto leading-relaxed mb-12 transition-all duration-[1500ms] ${
            step >= 4 ? 'font-bold text-sm md:text-base text-on-surface-variant' : 'text-gray-400'
          } ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
            Estamos en pleno barrio del Born en Barcelona. Sabores intensos, masa viva y cerveza artesanal bien fría.
          </p>

          <div className={`flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md transition-all duration-[1500ms] ${
            step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <button
              className={`flex-1 py-4 px-8 font-display font-extrabold text-sm tracking-widest uppercase transition-all duration-[1500ms] ${
                step >= 6 ? 'bg-primary text-white brutalist-border brutalist-shadow' : 'bg-gray-200 text-gray-500 border border-gray-300'
              } ${step === 7 ? 'scale-95 bg-[#c24125]' : ''}`}
            >
              Pide Delivery
            </button>
            
            <button
              className={`flex-1 py-4 px-8 font-display font-extrabold text-sm tracking-widest uppercase transition-all duration-[1500ms] ${
                step >= 6 ? 'bg-on-surface text-background brutalist-border brutalist-shadow' : 'bg-gray-200 text-gray-500 border border-gray-300'
              } ${step === 8 ? 'scale-95 bg-gray-800' : ''}`}
            >
              Ver Mapa
            </button>
          </div>

        </div>
      </section>

      {/* Helper overlay */}
      {step < 10 && !isAutoplay && (
        <div className="fixed top-2 left-2 text-[10px] font-mono text-gray-400 opacity-50 select-none pointer-events-none z-50">
          TIMELAPSE MODE [FOOTER] - STEP {step}/10
        </div>
      )}
    </div>
  );
}
