import { useState, useEffect, useRef } from 'react';
import TimelapseHero from './TimelapseHero';
import TimelapseStoria from './TimelapseStoria';
import TimelapseMenu from './TimelapseMenu';
import TimelapseSplitBlock from './TimelapseSplitBlock';
import TimelapsePromosReviews from './TimelapsePromosReviews';
import TimelapseFooterCTA from './TimelapseFooterCTA';

import { playWhoosh } from '../../utils/audio';

const SECTIONS = ['hero', 'storia', 'menu', 'split', 'promos', 'footer'];

export default function TimelapseFull() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);

  // Sound transition whoosh effect
  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    playWhoosh();
  }, [activeIndex]);

  // Refs for smooth scrolling
  const heroRef = useRef<HTMLDivElement>(null);
  const storiaRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);
  const promosRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const refs = [heroRef, storiaRef, menuRef, splitRef, promosRef, footerRef];

  const moveToNextSection = () => {
    setActiveIndex((current) => {
      const next = Math.min(current + 1, SECTIONS.length - 1);
      if (next !== current) {
        refs[next].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return next;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Autoplay on Spacebar
      if (e.code === 'Space') {
        e.preventDefault();
        setIsAutoplay((prev) => !prev);
      }
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        moveToNextSection();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((current) => {
          const prev = Math.max(current - 1, 0);
          refs[prev].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return prev;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-white selection:bg-secondary-container selection:text-on-secondary-container overflow-x-hidden">
      {/* Main helper overlay for the entire movie (Hidden in Autoplay) */}
      {!isAutoplay && (
        <div className="fixed top-2 left-2 z-50 flex flex-col gap-1 pointer-events-none select-none">
          <div className={`text-[10px] font-mono font-bold px-2 py-1 rounded bg-black/80 text-white`}>
            MANUAL TIMELAPSE MODE
          </div>
          <div className="text-[10px] font-mono text-gray-500 bg-white/80 px-2 py-0.5 rounded border border-gray-200">
            Current Section: {SECTIONS[activeIndex].toUpperCase()}
          </div>
        </div>
      )}

      <div ref={heroRef} className="w-full">
        <TimelapseHero isActive={activeIndex === 0} isAutoplay={isAutoplay} onComplete={moveToNextSection} />
      </div>
      
      <div ref={storiaRef} className="w-full">
        <TimelapseStoria isActive={activeIndex === 1} isAutoplay={isAutoplay} onComplete={moveToNextSection} />
      </div>
      
      <div ref={menuRef} className="w-full">
        <TimelapseMenu isActive={activeIndex === 2} isAutoplay={isAutoplay} onComplete={moveToNextSection} />
      </div>

      <div ref={splitRef} className="w-full">
        <TimelapseSplitBlock isActive={activeIndex === 3} isAutoplay={isAutoplay} onComplete={moveToNextSection} />
      </div>

      <div ref={promosRef} className="w-full">
        <TimelapsePromosReviews isActive={activeIndex === 4} isAutoplay={isAutoplay} onComplete={moveToNextSection} />
      </div>

      <div ref={footerRef} className="w-full">
        <TimelapseFooterCTA isActive={activeIndex === 5} isAutoplay={isAutoplay} onComplete={() => console.log('Timelapse Complete')} />
      </div>
    </div>
  );
}
