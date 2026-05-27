import { useState, useEffect } from 'react';

export function useTimelapse(totalSteps: number, isActive: boolean = true, isAutoplay: boolean = false, onComplete?: () => void) {
  const [step, setStep] = useState(0);

  // Manual Control
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setStep((s) => Math.min(s + 1, totalSteps));
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setStep((s) => Math.max(s - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSteps, isActive]);

  // Autoplay Control
  useEffect(() => {
    if (!isActive || !isAutoplay) return;

    if (step >= totalSteps) {
      // Small delay before moving to next section so the user can digest the final state
      const timeout = setTimeout(() => {
        if (onComplete) onComplete();
      }, 1000); 
      return () => clearTimeout(timeout);
    }

    const interval = setInterval(() => {
      setStep((s) => {
        if (s < totalSteps) return s + 1;
        return s;
      });
    }, 1100); // 1.1 seconds between steps for faster movie mode

    return () => clearInterval(interval);
  }, [step, isActive, isAutoplay, totalSteps, onComplete]);

  return step;
}
