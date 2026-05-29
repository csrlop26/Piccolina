import { motion, AnimatePresence } from 'motion/react';

interface DesignCursorProps {
  x: string;          // CSS position, e.g. '50%', '120px'
  y: string;          // CSS position
  isVisible: boolean;
  isClicking?: boolean;
  isDragging?: boolean;
  label?: string;
}

export default function DesignCursor({
  x,
  y,
  isVisible,
  isClicking = false,
  isDragging = false,
  label
}: DesignCursorProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed z-[100] pointer-events-none select-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            left: x,
            top: y
          }}
          exit={{ opacity: 0, scale: 0.3 }}
          transition={{
            left: { type: 'tween', ease: [0.17, 0.67, 0.33, 0.96], duration: 0.8 },
            top: { type: 'tween', ease: [0.17, 0.67, 0.33, 0.96], duration: 0.85 },
            opacity: { duration: 0.3 },
            scale: { duration: 0.2 }
          }}
        >
          {/* Cursor SVG — macOS-style arrow */}
          <motion.svg
            width="22"
            height="28"
            viewBox="0 0 22 28"
            fill="none"
            className="drop-shadow-lg"
            animate={{
              scale: isClicking ? 0.78 : 1,
              rotate: isDragging ? -15 : 0
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            {/* Shadow */}
            <path
              d="M2.5 1.5L2.5 22.5L7.5 17.5L12.5 25.5L16 23.5L11 15.5L18 14.5L2.5 1.5Z"
              fill="rgba(0,0,0,0.25)"
              transform="translate(1.5, 1.5)"
            />
            {/* White border */}
            <path
              d="M2 0.5L2 22L7 17L12 25L15.5 23L10.5 15L17.5 14L2 0.5Z"
              fill="white"
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Black fill */}
            <path
              d="M3 3L3 19.5L7 15.5L11.5 23L13.5 22L9 14L15 13.2L3 3Z"
              fill="#1a1a1a"
            />
          </motion.svg>

          {/* Click ripple effect */}
          <AnimatePresence>
            {isClicking && (
              <motion.div
                className="absolute top-0 left-0"
                initial={{ scale: 0, opacity: 0.7 }}
                animate={{ scale: 2.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <div className="w-5 h-5 rounded-full border-2 border-sky-400 bg-sky-400/20" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Drag indicator */}
          {isDragging && (
            <motion.div
              className="absolute -top-1 -left-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-3 h-3 rounded-full bg-sky-500 animate-pulse" />
            </motion.div>
          )}

          {/* Floating label */}
          <AnimatePresence>
            {label && (
              <motion.div
                className="absolute left-6 top-5 whitespace-nowrap"
                initial={{ opacity: 0, x: -5, y: 3 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-gray-900/90 backdrop-blur-sm text-white text-[10px] font-mono font-medium px-2 py-1 rounded shadow-lg border border-gray-700/50">
                  {label}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
