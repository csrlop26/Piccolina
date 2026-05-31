import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playKeyClick, playSuccessChime } from '../../utils/audio';

interface CodeEditorOverlayProps {
  codeSnippet: string;
  isVisible: boolean;
}

export default function CodeEditorOverlay({ codeSnippet, isVisible }: CodeEditorOverlayProps) {
  const [displayedText, setDisplayedText] = useState('');
  const prevLengthRef = useRef(0);
  const lastCompletedSnippetRef = useRef('');

  useEffect(() => {
    if (!isVisible) {
      setDisplayedText('');
      prevLengthRef.current = 0;
      lastCompletedSnippetRef.current = '';
      return;
    }
    
    // Reset displayed text when new snippet arrives
    setDisplayedText('');
    
    if (!codeSnippet) return;

    let i = 0;
    let timeoutId: NodeJS.Timeout;

    function typeNext() {
      if (!isVisible) return;
      if (i >= codeSnippet.length) return;

      setDisplayedText(codeSnippet.substring(0, i + 1));

      const char = codeSnippet[i];
      const isPauseChar = char === ' ' || char === '\n' || char === ';' || char === '{' || char === '}';

      // Reproducir sonido. 15% de probabilidad en letras normales, 100% en pausas.
      const shouldSound = isPauseChar || Math.random() < 0.15;
      if (shouldSound) {
        playKeyClick(isPauseChar);
      }

      i++;

      // Retrasos: rápido para código normal (8-16ms), pausa para separadores (80-140ms)
      let nextDelay = 8 + Math.random() * 8;
      if (isPauseChar) {
        nextDelay = char === '\n' ? 180 : 80;
      }

      timeoutId = setTimeout(typeNext, nextDelay);
    }

    typeNext();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [codeSnippet, isVisible]);

  // Sonido de éxito al terminar
  useEffect(() => {
    if (!isVisible) return;

    if (codeSnippet && displayedText === codeSnippet && lastCompletedSnippetRef.current !== codeSnippet) {
      lastCompletedSnippetRef.current = codeSnippet;
      playSuccessChime();
    }
  }, [displayedText, codeSnippet, isVisible]);

  // Tokenización simple de HTML/JSX para colorear código
  function tokenizeJSX(line: string) {
    const regex = /(<\/?[a-zA-Z0-9_]+|className="[^"]*"|text="[^"]*"|src="[^"]*"|\/?>|[{}]|🌿|🍕)/g;
    const parts = line.split(regex);
    return parts.map((part, idx) => {
      if (part.startsWith('<') || part.startsWith('</')) {
        return <span key={idx} className="text-[#569CD6]">{part}</span>; // Etiqueta HTML
      }
      if (part.startsWith('className=') || part.startsWith('text=') || part.startsWith('src=')) {
        const [attr, val] = part.split('=');
        return (
          <span key={idx}>
            <span className="text-[#9CDCFE]">{attr}</span>
            <span className="text-[#D4D4D4]">=</span>
            <span className="text-[#CE9178]">{val}</span>
          </span>
        );
      }
      if (part === '>' || part === '/>') {
        return <span key={idx} className="text-[#569CD6]">{part}</span>;
      }
      if (part === '🌿' || part === '🍕') {
        return <span key={idx} className="text-base select-none">{part}</span>;
      }
      return <span key={idx} className="text-[#D4D4D4]">{part}</span>;
    });
  }

  // Resaltado de sintaxis CSS/HTML dinámico
  function highlightCode(text: string) {
    if (!text) return null;
    const lines = text.split('\n');

    return lines.map((line, lineIdx) => {
      // Comentarios
      if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().endsWith('*/')) {
        return (
          <div key={lineIdx} className="text-[#6A9955] min-h-[1.25rem] whitespace-pre">
            {line}
          </div>
        );
      }
      
      // JSX / HTML
      if (line.includes('<') || line.includes('/>') || line.includes('className=')) {
        return (
          <div key={lineIdx} className="text-[#D4D4D4] min-h-[1.25rem] whitespace-pre">
            {tokenizeJSX(line)}
          </div>
        );
      }
      
      // Propiedades CSS standard
      if (line.includes(':')) {
        const parts = line.split(':');
        const prop = parts[0];
        const val = parts.slice(1).join(':');
        
        return (
          <div key={lineIdx} className="min-h-[1.25rem] whitespace-pre">
            <span className="text-[#9CDCFE]">{prop}</span>
            <span className="text-[#D4D4D4]">:</span>
            <span className="text-[#CE9178]">{val}</span>
          </div>
        );
      }
      
      // Selectores CSS / Llaves
      if (line.includes('{') || line.includes('}')) {
        const parts = line.split(/({|})/);
        return (
          <div key={lineIdx} className="min-h-[1.25rem] whitespace-pre">
            {parts.map((part, pIdx) => {
              if (part === '{' || part === '}') {
                return <span key={pIdx} className="text-[#D4D4D4]">{part}</span>;
              }
              return <span key={pIdx} className="text-[#DCDCAA]">{part}</span>;
            })}
          </div>
        );
      }
      
      // Texto normal
      return (
        <div key={lineIdx} className="text-[#D4D4D4] min-h-[1.25rem] whitespace-pre">
          {line}
        </div>
      );
    });
  }

  const lines = displayedText.split('\n');
  const totalLinesCount = Math.max(3, lines.length);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          className="fixed bottom-8 right-8 z-50 w-[420px] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-gray-800/80 bg-[#1E1E1E]"
        >
          {/* Barra superior de pestañas (IDE tabs) */}
          <div className="flex items-center justify-between bg-[#2D2D2D] border-b border-gray-900 select-none">
            <div className="flex items-center">
              {/* Botones de control estilo macOS */}
              <div className="flex gap-1.5 px-4">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              
              {/* Pestañas de archivos */}
              <div className="flex text-xs font-mono">
                <div className="px-3.5 py-2.5 bg-gray-800 text-gray-500 border-r border-gray-900 flex items-center gap-1.5">
                  <span className="text-[10px] text-gray-600">〈/〉</span>
                  <span>index.html</span>
                </div>
                <div className="px-4 py-2.5 bg-[#1E1E1E] text-yellow-500 font-bold border-r border-gray-900 flex items-center gap-1.5 relative">
                  <span className="text-[10px]">#</span>
                  <span>styles.css</span>
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-yellow-500" />
                </div>
                <div className="px-3.5 py-2.5 bg-gray-800 text-gray-500 border-r border-gray-900 flex items-center gap-1.5">
                  <span className="text-[10px] text-gray-600">⚛</span>
                  <span>App.tsx</span>
                </div>
              </div>
            </div>

            <div className="pr-4 text-[10px] font-mono text-gray-500">
              VSC / Timelapse
            </div>
          </div>
          
          {/* Cuerpo del Editor */}
          <div className="flex p-4 font-mono text-xs text-gray-300 min-h-[140px] leading-relaxed relative bg-[#1E1E1E]">
            {/* Números de línea */}
            <div className="w-8 select-none text-right pr-3 text-gray-600 border-r border-gray-800/40 flex flex-col">
              {Array.from({ length: totalLinesCount }).map((_, idx) => (
                <div key={idx} className="min-h-[1.25rem]">
                  {String(idx + 1).padStart(2, '0')}
                </div>
              ))}
            </div>
            
            {/* Contenido del Código */}
            <div className="pl-4 flex-1 overflow-x-auto relative">
              {highlightCode(displayedText)}
              
              {/* Cursor de escritura parpadeante */}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
                className="absolute inline-block w-1.5 h-3.5 bg-yellow-500"
                style={{
                  left: `${(lines[lines.length - 1]?.length || 0) * 7.25 + 16}px`,
                  top: `${(lines.length - 1) * 20 + 3}px`
                }}
              />
            </div>
          </div>

          {/* Barra de estado inferior estilo VS Code */}
          <div className="flex items-center justify-between px-3 py-1 bg-[#007ACC] text-[10px] text-white select-none font-sans font-medium">
            <div className="flex items-center gap-2">
              <span className="text-[8px]">⌥</span>
              <span>main*</span>
              <span className="text-blue-200">⟳</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Lín {lines.length}, Col 1</span>
              <span>Espacios: 2</span>
              <span>UTF-8</span>
              <span>CSS</span>
              <span className="bg-blue-800/50 px-1 rounded">✓ Prettier</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
