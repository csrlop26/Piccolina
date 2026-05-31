import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import TimelapseIntro from './TimelapseIntro';
import TimelapseHero from './TimelapseHero';
import TimelapseStoria from './TimelapseStoria';
import TimelapseMenu from './TimelapseMenu';
import TimelapseSplitBlock from './TimelapseSplitBlock';
import TimelapsePromosReviews from './TimelapsePromosReviews';
import TimelapseFooterCTA from './TimelapseFooterCTA';
import TimelapseOutro from './TimelapseOutro';
import { playWhoosh } from '../../utils/audio';

// ─── Section registry ────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'intro',  label: '' },
  { id: 'hero',   label: '01 · Hero' },
  { id: 'storia', label: '02 · Nuestra Storia' },
  { id: 'menu',   label: '03 · Menú' },
  { id: 'split',  label: '04 · Experiencia' },
  { id: 'promos', label: '05 · Promos & Reviews' },
  { id: 'footer', label: '06 · Footer' },
  { id: 'outro',  label: '' },
] as const;

const LAST = SECTIONS.length - 1;

// ─── Cinematic zoom transition ───────────────────────────────────────────────

const variants = {
  enter: { opacity: 0, scale: 0.93, filter: 'blur(8px)' },
  center: { opacity: 1, scale: 1,    filter: 'blur(0px)' },
  exit:   { opacity: 0, scale: 1.07, filter: 'blur(8px)' },
};

const transition = {
  opacity: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  scale:   { type: 'spring', stiffness: 210, damping: 24, mass: 0.85 },
  filter:  { duration: 0.32 },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function TimelapseReelView() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const isFirstMount = useRef(true);

  // Play whoosh on every section change except the very first mount
  useEffect(() => {
    if (isFirstMount.current) { isFirstMount.current = false; return; }
    playWhoosh();
  }, [activeIndex]);

  const goToNext = useCallback(() => {
    setActiveIndex(i => Math.min(i + 1, LAST));
  }, []);

  const goToPrev = useCallback(() => {
    setActiveIndex(i => Math.max(i - 1, 0));
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space')      { e.preventDefault(); setIsAutoplay(p => !p); }
      if (e.key === 'ArrowDown')   { e.preventDefault(); goToNext(); }
      if (e.key === 'ArrowUp')     { e.preventDefault(); goToPrev(); }
      if (e.key === 'ArrowRight')  { e.preventDefault(); goToNext(); }
      if (e.key === 'ArrowLeft')   { e.preventDefault(); goToPrev(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goToNext, goToPrev]);

  const isEdge = activeIndex === 0 || activeIndex === LAST;
  const currentLabel = SECTIONS[activeIndex].label;

  return (
    <div className="fixed inset-0 bg-zinc-950 overflow-hidden">

      {/* ── Section canvas ─────────────────────────────────────────────── */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="absolute inset-0 overflow-hidden"
          >
            {activeIndex === 0 && (
              <TimelapseIntro isAutoplay={isAutoplay} onComplete={goToNext} />
            )}
            {activeIndex === 1 && (
              <TimelapseHero isActive isAutoplay={isAutoplay} onComplete={goToNext} />
            )}
            {activeIndex === 2 && (
              <TimelapseStoria isActive isAutoplay={isAutoplay} onComplete={goToNext} />
            )}
            {activeIndex === 3 && (
              <TimelapseMenu isActive isAutoplay={isAutoplay} onComplete={goToNext} />
            )}
            {activeIndex === 4 && (
              <TimelapseSplitBlock isActive isAutoplay={isAutoplay} onComplete={goToNext} />
            )}
            {activeIndex === 5 && (
              <TimelapsePromosReviews isActive isAutoplay={isAutoplay} onComplete={goToNext} />
            )}
            {activeIndex === 6 && (
              <TimelapseFooterCTA isActive isAutoplay={isAutoplay} onComplete={goToNext} />
            )}
            {activeIndex === 7 && (
              <TimelapseOutro isAutoplay={isAutoplay} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── HUD Overlay (hidden on intro / outro) ──────────────────────── */}
      {!isEdge && (
        <div className="fixed inset-0 pointer-events-none z-[200]">

          {/* Top-left: section label */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLabel}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.28 }}
              className="absolute top-4 left-4"
            >
              <span className="font-mono text-[10px] text-white uppercase tracking-widest bg-black/45 backdrop-blur-sm px-2.5 py-1.5 rounded-sm">
                {currentLabel}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Top-right: section progress dots (sections 1-6 only) */}
          <div className="absolute top-[18px] right-4 flex gap-1.5 items-center">
            {SECTIONS.slice(1, -1).map((s, i) => {
              const idx = i + 1;
              const isCurrent = idx === activeIndex;
              const isDone    = idx < activeIndex;
              return (
                <motion.div
                  key={s.id}
                  animate={{ scale: isCurrent ? 1.45 : 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="rounded-full transition-colors duration-400"
                  style={{
                    width:  isCurrent ? 8 : 6,
                    height: isCurrent ? 8 : 6,
                    background: isCurrent ? '#e8563a' : (isDone ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.18)'),
                  }}
                />
              );
            })}
          </div>

          {/* Bottom-left: autoplay status */}
          <div className="absolute bottom-5 left-4 flex items-center gap-1.5">
            <div
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                isAutoplay ? 'bg-primary animate-pulse' : 'bg-white/20'
              }`}
            />
            <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">
              {isAutoplay ? 'AUTOPLAY' : 'PAUSA'}
            </span>
          </div>

          {/* Bottom-right: watermark */}
          <div className="absolute bottom-5 right-4">
            <span className="font-mono text-[9px] text-white/25 uppercase tracking-widest">
              augustocs.com
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
