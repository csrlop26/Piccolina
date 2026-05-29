import { motion, AnimatePresence } from 'motion/react';

interface SelectionHandlesProps {
  isVisible: boolean;
  width?: string;   // e.g. "1200", "340"
  height?: string;  // e.g. "180", "420"
  color?: string;   // selection border color
}

const HANDLE_SIZE = 6;

export default function SelectionHandles({
  isVisible,
  width = '340',
  height = '420',
  color = '#0d99ff'
}: SelectionHandlesProps) {
  // 8 handle positions: 4 corners + 4 midpoints
  const handles = [
    // Corners
    { top: -HANDLE_SIZE / 2, left: -HANDLE_SIZE / 2 },
    { top: -HANDLE_SIZE / 2, right: -HANDLE_SIZE / 2 },
    { bottom: -HANDLE_SIZE / 2, left: -HANDLE_SIZE / 2 },
    { bottom: -HANDLE_SIZE / 2, right: -HANDLE_SIZE / 2 },
    // Midpoints
    { top: -HANDLE_SIZE / 2, left: '50%', transform: 'translateX(-50%)' },
    { bottom: -HANDLE_SIZE / 2, left: '50%', transform: 'translateX(-50%)' },
    { top: '50%', left: -HANDLE_SIZE / 2, transform: 'translateY(-50%)' },
    { top: '50%', right: -HANDLE_SIZE / 2, transform: 'translateY(-50%)' }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Selection border */}
          <div
            className="absolute inset-0"
            style={{
              border: `1.5px solid ${color}`,
              boxShadow: `0 0 0 1px ${color}20`
            }}
          />

          {/* Handles */}
          {handles.map((style, idx) => (
            <motion.div
              key={idx}
              className="absolute bg-white rounded-[1px]"
              style={{
                width: HANDLE_SIZE,
                height: HANDLE_SIZE,
                border: `1.5px solid ${color}`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                ...style
              } as React.CSSProperties}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: idx * 0.02, type: 'spring', stiffness: 500, damping: 20 }}
            />
          ))}

          {/* Dimension label bottom center */}
          <motion.div
            className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.2 }}
          >
            <div
              className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-sm text-white"
              style={{ backgroundColor: color }}
            >
              {width} × {height}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
