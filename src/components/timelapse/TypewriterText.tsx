import { useState, useEffect } from 'react';
import { playKeyClick } from '../../utils/audio';

interface TypewriterTextProps {
  text: string;
  speed?: number; // ms por carácter
  className?: string;
  delay?: number; // retraso antes de comenzar a escribir
}

export default function TypewriterText({ text, speed = 15, className = '', delay = 0 }: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let isMounted = true;
    setDisplayed('');
    let timeoutId: NodeJS.Timeout;

    const startTimeout = setTimeout(() => {
      let currentIdx = 0;

      function typeNext() {
        if (!isMounted) return;
        if (currentIdx >= text.length) return;

        const nextChar = text.charAt(currentIdx);
        setDisplayed(text.substring(0, currentIdx + 1));
        
        // Determinar si es una pausa natural
        const isPauseChar = nextChar === ' ' || nextChar === '\n' || nextChar === '.' || nextChar === ',';
        
        // Sonar en espacios/puntuación o con 15% de probabilidad en letras
        if (isPauseChar || Math.random() < 0.15) {
          playKeyClick(isPauseChar);
        }

        currentIdx++;

        // Velocidad rápida para letras (10-25ms), pausa para separadores (120-180ms)
        let nextDelay = 10 + Math.random() * 15;
        if (isPauseChar) {
          nextDelay = nextChar === '\n' ? 220 : 120;
        }

        timeoutId = setTimeout(typeNext, nextDelay);
      }

      typeNext();
    }, delay);

    return () => {
      isMounted = false;
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
    };
  }, [text, delay]);

  return <span className={className}>{displayed}</span>;
}
