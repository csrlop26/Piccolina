import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { IMAGES_RESOURCES } from '../../data';

interface TimelapseIntroProps {
  isAutoplay?: boolean;
  onComplete?: () => void;
}

export default function TimelapseIntro({ isAutoplay = true, onComplete }: TimelapseIntroProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isAutoplay) return;
    const timings = [400, 1100, 1900, 2700];
    const timeouts = timings.map((delay, i) =>
      setTimeout(() => setStep(i + 1), delay)
    );
    const done = setTimeout(() => onComplete?.(), 4000);
    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [isAutoplay, onComplete]);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: '#0F0704' }}
    >
      {/* Ambient coral glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: step >= 1 ? 1 : 0, scale: step >= 1 ? 1 : 0.3 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        style={{
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(232,86,58,0.28) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Pizza drop */}
      <motion.div
        initial={{ y: -350, opacity: 0, scale: 0, rotate: -28 }}
        animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 110, damping: 13, delay: 0.08 }}
        className="relative z-10 mb-8"
      >
        <img
          src={IMAGES_RESOURCES.heroPizza}
          alt="La Trattoria"
          className="w-28 h-28 object-cover"
          style={{
            clipPath: 'circle(43.5% at 50% 50%)',
            filter: 'drop-shadow(0 24px 48px rgba(232,86,58,0.45))',
          }}
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* LA TRATTORIA title */}
      <motion.h1
        initial={{ opacity: 0, y: 24, scale: 0.88 }}
        animate={step >= 1 ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 160, damping: 18 }}
        className="font-display font-black text-white uppercase text-center relative z-10"
        style={{
          fontSize: 'clamp(38px, 11vw, 68px)',
          letterSpacing: '-0.04em',
          lineHeight: 0.9,
        }}
      >
        LA TRATTOR<span style={{ color: '#e8563a' }}>I</span>A
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={step >= 2 ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="font-mono text-[10px] text-white/40 uppercase tracking-[0.28em] mt-3 relative z-10"
      >
        Pizzería Artesanal · Barcelona
      </motion.p>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={step >= 2 ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-16 h-px bg-white/15 mt-6 mb-5 relative z-10"
        style={{ transformOrigin: 'left' }}
      />

      {/* Built by AugustoCS */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={step >= 3 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-0.5 relative z-10"
      >
        <p className="font-mono text-[9px] text-white/25 uppercase tracking-widest">
          Construido por
        </p>
        <p className="font-display font-black text-white/70 tracking-widest text-sm uppercase">
          AugustoCS
        </p>
      </motion.div>

      {/* Progress loading bar at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px]"
        style={{ background: '#e8563a' }}
        initial={{ width: '0%' }}
        animate={step >= 3 ? { width: '100%' } : {}}
        transition={{ duration: 1.0, ease: 'easeInOut' }}
      />
    </div>
  );
}
