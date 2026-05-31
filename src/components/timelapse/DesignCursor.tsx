import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

interface DesignCursorProps {
  x: string;
  y: string;
  isVisible: boolean;
  isClicking?: boolean;
  isDragging?: boolean;
  label?: string;
  code?: string;
  absolute?: boolean;
}

// Trail: each ghost lags further behind with a softer spring
const TRAIL = [
  { stiffness: 72, damping: 17, scale: 0.76, opacity: 0.28 },
  { stiffness: 46, damping: 15, scale: 0.58, opacity: 0.15 },
  { stiffness: 28, damping: 13, scale: 0.42, opacity: 0.08 },
];

export default function DesignCursor({
  x,
  y,
  isVisible,
  isClicking,
  isDragging,
  label,
  code,
  absolute,
}: DesignCursorProps) {
  const shakeControls = useAnimation();
  const prevClicking = useRef(isClicking);

  // Shake the cursor the moment isClicking flips to true
  useEffect(() => {
    if (isClicking && !prevClicking.current) {
      shakeControls.start({
        x: [0, -6, 6, -4, 4, -2, 2, 0],
        transition: { duration: 0.38, ease: 'easeInOut' },
      });
    }
    prevClicking.current = isClicking;
  }, [isClicking, shakeControls]);

  if (!isVisible) return null;

  const pos = absolute ? 'absolute' : 'fixed';
  const fill = isDragging ? '#10b981' : '#1A1A1A';

  return (
    <>
      {/* Ghost trail — rendered below main cursor */}
      {TRAIL.map((cfg, i) => (
        <motion.div
          key={i}
          className={`${pos} pointer-events-none z-[39]`}
          animate={{ left: x, top: y }}
          transition={{ type: 'spring', stiffness: cfg.stiffness, damping: cfg.damping }}
          style={{ transform: 'translate(-20%, -20%)' }}
        >
          <svg
            width={22 * cfg.scale}
            height={22 * cfg.scale}
            viewBox="0 0 24 24"
            fill="none"
            style={{ opacity: cfg.opacity }}
          >
            <path d="M4.5 3V19.5L9.75 14.25H18L4.5 3Z" fill={fill} stroke="#ffffff" strokeWidth="1.5" />
          </svg>
        </motion.div>
      ))}

      {/* Main cursor */}
      <motion.div
        className={`${pos} pointer-events-none z-40 flex flex-col items-start gap-1.5`}
        animate={{ left: x, top: y }}
        transition={{ type: 'spring', stiffness: 155, damping: 14, mass: 0.9 }}
        style={{ transform: 'translate(-20%, -20%)' }}
      >
        {/* Cursor body — wraps in shake controls */}
        <motion.div animate={shakeControls} className="relative">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className="drop-shadow-[0_3px_6px_rgba(0,0,0,0.35)]"
          >
            <path d="M4.5 3V19.5L9.75 14.25H18L4.5 3Z" fill={fill} stroke="#ffffff" strokeWidth="1.5" />
          </svg>

          {/* Click ripple */}
          {isClicking && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0.9 }}
              animate={{ scale: 2.4, opacity: 0 }}
              transition={{ duration: 0.42 }}
              className="absolute -top-1 -left-1 w-6 h-6 border-2 border-amber-400 rounded-full"
            />
          )}

          {/* Drag pulse ring */}
          {isDragging && (
            <motion.div
              animate={{ scale: [1, 1.65, 1], opacity: [0.45, 0, 0.45] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-1 -left-1 w-6 h-6 border border-emerald-400 rounded-full"
            />
          )}
        </motion.div>

        {/* Tooltip label */}
        <div className="flex flex-col items-start gap-1 select-none">
          {label && (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-zinc-900 text-white font-mono text-[8px] px-1.5 py-0.5 rounded border border-zinc-700 shadow-md"
            >
              {label}
            </motion.div>
          )}

          {code && (
            <div className="bg-[#181817]/95 border border-zinc-800/80 rounded-md shadow-[0_10px_25px_rgba(0,0,0,0.5)] p-2 font-mono text-[8px] leading-relaxed text-zinc-300 backdrop-blur-sm max-w-[190px] whitespace-pre overflow-hidden">
              <div className="flex gap-1 mb-1 border-b border-zinc-800/40 pb-1">
                <span className="w-1 h-1 rounded-full bg-[#FF5F56]" />
                <span className="w-1 h-1 rounded-full bg-[#FFBD2E]" />
                <span className="w-1 h-1 rounded-full bg-[#27C93F]" />
              </div>
              <code className="text-sky-300 block">{code}</code>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
