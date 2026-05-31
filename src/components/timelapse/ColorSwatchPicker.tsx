import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ColorSwatchPickerProps {
  isVisible: boolean;
  colors: string[];
  activeIndex: number;
  position?: { x: string; y: string };
  colorName?: string;
}

export default function ColorSwatchPicker({
  isVisible,
  colors,
  activeIndex,
  position = { x: '50%', y: '50%' },
  colorName,
}: ColorSwatchPickerProps) {
  // Ink splash: fires a unique key each time the active color changes
  const [splashKey, setSplashKey] = useState(0);
  const [splashColor, setSplashColor] = useState(colors[activeIndex] ?? '#e8563a');
  const prevIndex = useRef<number | null>(null);

  useEffect(() => {
    if (!isVisible) { prevIndex.current = null; return; }
    if (prevIndex.current !== null && prevIndex.current !== activeIndex) {
      setSplashColor(colors[activeIndex]);
      setSplashKey(k => k + 1);
    }
    prevIndex.current = activeIndex;
  }, [activeIndex, isVisible, colors]);

  return (
    <>
      {/* Ink splash — expands from picker center and fades out */}
      <AnimatePresence>
        {splashKey > 0 && (
          <motion.div
            key={splashKey}
            className="fixed rounded-full pointer-events-none z-[94]"
            style={{
              left: position.x,
              top: position.y,
              translateX: '-50%',
              translateY: '-50%',
              backgroundColor: splashColor,
            }}
            initial={{ width: 0, height: 0, opacity: 0.55 }}
            animate={{ width: 140, height: 140, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Palette panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed z-[95] pointer-events-none select-none"
            style={{ left: position.x, top: position.y }}
            initial={{ opacity: 0, y: 12, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            <div className="bg-gray-900/88 backdrop-blur-md rounded-lg p-2.5 shadow-2xl border border-gray-700/60">
              {/* Color swatches row */}
              <div className="flex items-center gap-1.5 mb-1.5">
                {colors.map((color, idx) => (
                  <motion.div
                    key={idx}
                    className="relative"
                    animate={{ scale: idx === activeIndex ? 1.22 : 0.9, opacity: idx === activeIndex ? 1 : 0.5 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  >
                    <div
                      className="w-5 h-5 rounded-full border-2 transition-all duration-200"
                      style={{
                        backgroundColor: color,
                        borderColor: idx === activeIndex ? '#fff' : 'rgba(255,255,255,0.15)',
                        boxShadow: idx === activeIndex ? `0 0 10px ${color}90` : 'none',
                      }}
                    />
                    {/* Checkmark on selected */}
                    {idx === activeIndex && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                      >
                        <span className="text-white text-[8px] font-bold drop-shadow-md">✓</span>
                      </motion.div>
                    )}
                    {/* Strike on rejected */}
                    {idx < activeIndex && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="w-6 h-[1.5px] bg-red-400/80 rotate-45 rounded" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Color name */}
              {colorName && (
                <motion.div
                  key={colorName}
                  className="text-[9px] font-mono text-gray-300 text-center mt-0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {colorName}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
