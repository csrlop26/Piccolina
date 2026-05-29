let audioCtx: AudioContext | null = null;
let masterCompressor: DynamicsCompressorNode | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
    
    // Create master compressor to prevent clipping and keep sounds smooth
    masterCompressor = audioCtx.createDynamicsCompressor();
    masterCompressor.threshold.setValueAtTime(-12, audioCtx.currentTime); // start compressing above -12dB
    masterCompressor.knee.setValueAtTime(6, audioCtx.currentTime);       // smooth transition
    masterCompressor.ratio.setValueAtTime(4, audioCtx.currentTime);      // compression ratio
    masterCompressor.attack.setValueAtTime(0.005, audioCtx.currentTime); // quick attack
    masterCompressor.release.setValueAtTime(0.08, audioCtx.currentTime); // fast release
    masterCompressor.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Sonido de click de teclado mecánico ASMR (sintetizado de forma sutil y ultra corta).
 * Evita solapamientos molestos o sonido de ametralladora al escribir rápido.
 * @param isSpaceOrEnter Si es true, el sonido será ligeramente más grave.
 */
export function playKeyClick(isSpaceOrEnter: boolean = false) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const pitchFactor = 0.92 + Math.random() * 0.16;

    // 1. Dampened keycap impact (lowpass filtered noise for muted clack)
    const bufferSize = ctx.sampleRate * 0.015; // 15ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = isSpaceOrEnter ? 450 : 850 * pitchFactor;
    noiseFilter.Q.value = 2.0;

    const noiseGain = ctx.createGain();
    // Increased volumes significantly (previously 0.08 / 0.11)
    noiseGain.gain.setValueAtTime(isSpaceOrEnter ? 0.28 : 0.38, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    gainNodeToDestination(noiseGain);
    noiseSource.start(now);

    // 2. Lubed switch housing resonance (deep, warm triangle thock)
    const bodyOsc = ctx.createOscillator();
    const bodyGain = ctx.createGain();
    bodyOsc.type = 'triangle';
    
    const bodyFreq = isSpaceOrEnter ? 100 : 190 * pitchFactor;
    bodyOsc.frequency.setValueAtTime(bodyFreq, now);
    bodyOsc.frequency.exponentialRampToValueAtTime(bodyFreq * 0.8, now + 0.024);

    // Increased body gain (previously 0.15 / 0.12)
    bodyGain.gain.setValueAtTime(isSpaceOrEnter ? 0.48 : 0.38, now);
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.026);

    bodyOsc.connect(bodyGain);
    gainNodeToDestination(bodyGain);
    bodyOsc.start(now);
    bodyOsc.stop(now + 0.03);

  } catch (e) {
    console.debug('playKeyClick synthesis failed:', e);
  }
}

// Helper para conectar ganancias al destino final de audio (a través de compresor)
function gainNodeToDestination(gainNode: GainNode) {
  if (audioCtx && masterCompressor) {
    gainNode.connect(masterCompressor);
  } else if (audioCtx) {
    gainNode.connect(audioCtx.destination);
  }
}

/**
 * Sonido whoosh para transiciones.
 */
export function playWhoosh() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const duration = 0.45;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 1.5;
    filter.frequency.setValueAtTime(120, now);
    filter.frequency.exponentialRampToValueAtTime(1100, now + duration);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.001, now);
    // Increased peak gain (previously 0.04)
    gainNode.gain.linearRampToValueAtTime(0.12, now + 0.12);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noiseSource.connect(filter);
    filter.connect(gainNode);
    if (masterCompressor) {
      gainNode.connect(masterCompressor);
    } else {
      gainNode.connect(ctx.destination);
    }

    noiseSource.start(now);
    noiseSource.stop(now + duration);
  } catch (e) {
    console.debug('playWhoosh synthesis failed:', e);
  }
}

/**
 * Alerta de éxito ASMR (un doble click mecánico sutil e intercalado).
 * Sin beeps ni sonidos electrónicos.
 */
export function playSuccessChime() {
  try {
    // Primer clic sutil (barra)
    playKeyClick(true);
    
    // Segundo clic sutil a los 90ms (tecla normal)
    setTimeout(() => {
      playKeyClick(false);
    }, 90);
  } catch (e) {
    console.debug('playSuccessChime synthesis failed:', e);
  }
}
