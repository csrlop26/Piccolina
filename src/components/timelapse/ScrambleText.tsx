import { useState, useEffect, useRef } from 'react';

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?';

function randomChar() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

interface ScrambleTextProps {
  text: string;
  /** ms before first char locks in (scramble-only phase) */
  scrambleDuration?: number;
  /** ms between each successive char locking in */
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export default function ScrambleText({
  text,
  scrambleDuration = 180,
  speed = 32,
  className,
  onComplete,
}: ScrambleTextProps) {
  const [chars, setChars] = useState<string[]>(() =>
    text.split('').map(c => (c === ' ' ? ' ' : randomChar()))
  );
  const completedRef = useRef(false);

  useEffect(() => {
    completedRef.current = false;
    // Reset to scrambled state
    setChars(text.split('').map(c => (c === ' ' ? ' ' : randomChar())));

    const start = Date.now();

    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const resolved = elapsed < scrambleDuration
        ? 0
        : Math.min(Math.floor((elapsed - scrambleDuration) / speed) + 1, text.length);

      setChars(
        text.split('').map((c, i) => {
          if (i < resolved) return c;
          if (c === ' ') return ' ';
          return randomChar();
        })
      );

      if (resolved >= text.length && !completedRef.current) {
        completedRef.current = true;
        clearInterval(tick);
        onComplete?.();
      }
    }, 40);

    return () => clearInterval(tick);
  }, [text, scrambleDuration, speed]);

  return (
    <span className={className} aria-label={text}>
      {chars.map((ch, i) =>
        ch === ' ' ? (
          // Render spaces as actual whitespace, not inline-block (which would collapse)
          <span key={i}>&nbsp;</span>
        ) : (
          <span
            key={i}
            style={{
              opacity: ch === text[i] ? 1 : 0.45,
            }}
          >
            {ch}
          </span>
        )
      )}
    </span>
  );
}
