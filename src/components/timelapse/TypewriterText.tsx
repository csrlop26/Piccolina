import { useState, useEffect } from 'react';

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

    const startTimeout = setTimeout(() => {
      let currentIdx = 0;
      const interval = setInterval(() => {
        if (!isMounted) return;
        
        if (currentIdx < text.length) {
          setDisplayed(text.substring(0, currentIdx + 1));
          currentIdx++;
        } else {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => {
      isMounted = false;
      clearTimeout(startTimeout);
    };
  }, [text, speed, delay]);

  return <span className={className}>{displayed}</span>;
}
