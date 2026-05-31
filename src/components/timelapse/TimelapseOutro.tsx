import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';
import { IMAGES_RESOURCES } from '../../data';

interface TimelapseOutroProps {
  isAutoplay?: boolean;
}

export default function TimelapseOutro({ isAutoplay = true }: TimelapseOutroProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isAutoplay) return;
    const timings = [400, 1000, 1800, 2600, 3500];
    const timeouts = timings.map((delay, i) =>
      setTimeout(() => setStep(i + 1), delay)
    );
    return () => timeouts.forEach(clearTimeout);
  }, [isAutoplay]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-background">

      {/* Background coral glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 520,
          height: 320,
          background: 'radial-gradient(ellipse, rgba(232,86,58,0.18) 0%, transparent 70%)',
          filter: 'blur(80px)',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Floating pizza */}
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: -20 }}
        animate={step >= 1 ? { opacity: 1, scale: 1, rotate: 8 } : {}}
        transition={{ type: 'spring', stiffness: 130, damping: 14 }}
        className="absolute top-[12%] right-[10%] pointer-events-none select-none"
      >
        <img
          src={IMAGES_RESOURCES.heroPizza}
          alt=""
          className="w-20 h-20 object-cover opacity-50"
          style={{ clipPath: 'circle(43.5% at 50% 50%)' }}
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Section complete label */}
      <motion.span
        initial={{ opacity: 0, y: -8 }}
        animate={step >= 1 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45 }}
        className="font-mono text-[10px] text-on-surface/35 uppercase tracking-widest mb-7 relative z-10"
      >
        Sitio web completo ✓
      </motion.span>

      {/* Main headline */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.84, y: 22 }}
        animate={step >= 1 ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ type: 'spring', stiffness: 150, damping: 17 }}
        className="font-display font-black text-on-surface uppercase text-center leading-[0.88] relative z-10"
        style={{ fontSize: 'clamp(40px, 12vw, 78px)', letterSpacing: '-0.04em' }}
      >
        ¿QUIERES<br />
        <span style={{ color: '#e8563a' }}>LA TUYA?</span>
      </motion.h2>

      {/* Sub-headline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={step >= 2 ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="font-sans text-sm text-on-surface/55 text-center max-w-[260px] mt-5 leading-relaxed relative z-10"
      >
        Diseño web premium para restaurantes, marcas y negocios que merecen destacar.
      </motion.p>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={step >= 3 ? { scaleX: 1 } : {}}
        transition={{ duration: 0.4 }}
        className="w-20 h-px bg-on-surface/20 mt-7 mb-7 relative z-10"
        style={{ transformOrigin: 'center' }}
      />

      {/* AugustoCS branding */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={step >= 3 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-2 relative z-10"
      >
        <p
          className="font-display font-black text-on-surface uppercase"
          style={{ fontSize: 'clamp(22px, 6vw, 34px)', letterSpacing: '-0.02em' }}
        >
          AugustoCS
        </p>
        <div className="flex items-center gap-2 text-on-surface/45">
          <Instagram className="w-3.5 h-3.5" />
          <p className="font-mono text-xs tracking-wider">@AugustoCS.studio</p>
        </div>
      </motion.div>

      {/* CTA button */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={step >= 4 ? { opacity: 1, y: 0 } : {}}
        transition={{ type: 'spring', stiffness: 200, damping: 16 }}
        className="mt-9 relative z-10"
      >
        <div
          className="bg-on-surface text-background px-8 py-4 font-display font-extrabold text-xs tracking-widest uppercase text-center brutalist-border"
          style={{ boxShadow: '4px 4px 0 #e8563a' }}
        >
          LINK EN BIO ↑
        </div>
      </motion.div>

      {/* Pulsing arrows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={step >= 5 ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
        className="absolute bottom-7 flex flex-col items-center gap-0.5 z-10"
      >
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ opacity: [0.15, 0.6, 0.15], y: [2, -2, 2] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
            className="font-mono text-[11px] text-on-surface/40 leading-none"
          >
            ▲
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
