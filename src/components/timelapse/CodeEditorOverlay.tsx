import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CodeEditorOverlayProps {
  codeSnippet: string;
  isVisible: boolean;
}

export default function CodeEditorOverlay({ codeSnippet, isVisible }: CodeEditorOverlayProps) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!isVisible) return;
    
    // Reset displayed text when new snippet arrives
    setDisplayedText('');
    
    if (!codeSnippet) return;

    let i = 0;
    const speed = Math.max(10, 500 / codeSnippet.length); // Type everything in ~500ms
    
    const interval = setInterval(() => {
      setDisplayedText(codeSnippet.substring(0, i + 1));
      i++;
      if (i >= codeSnippet.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [codeSnippet, isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 w-80 rounded-lg overflow-hidden shadow-2xl border border-gray-700/50"
          style={{ backgroundColor: '#1E1E1E' }}
        >
          {/* Editor Header */}
          <div className="flex items-center px-4 py-2 bg-[#2D2D2D] border-b border-gray-700/50">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            </div>
            <div className="mx-auto text-[10px] font-mono text-gray-400 select-none">
              styles.css
            </div>
          </div>
          
          {/* Editor Body */}
          <div className="p-4 font-mono text-xs text-gray-300 min-h-[100px] whitespace-pre-wrap leading-relaxed">
            <span className="text-[#569CD6]">.piccolina-hero</span> {'{\n'}
            <span className="text-[#9CDCFE] pl-4">
              {displayedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-1.5 h-3.5 bg-gray-400 ml-0.5 align-middle"
              />
            </span>
            {'\n}'}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
