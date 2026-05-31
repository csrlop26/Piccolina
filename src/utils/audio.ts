let audioCtx: AudioContext | null = null;
let masterCompressor: DynamicsCompressorNode | null = null;
let lastKeyTime = 0;

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
  const nowMs = performance.now();
  if (nowMs - lastKeyTime < 50) return; // 50ms throttle
  lastKeyTime = nowMs;

  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Pitch variation: separate for normal keys vs space/enter
    const pitch = isSpaceOrEnter 
      ? 0.78 + Math.random() * 0.12  // space/enter is deeper
      : 0.88 + Math.random() * 0.22; // normal keys have more variation

    // 1. Crisp Plastic Keycap Snap (bandpass filtered noise)
    const noiseLen = ctx.sampleRate * 0.012; // 12ms burst
    const noiseBuffer = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseLen; i++) {
      noiseData[i] = Math.random() * 2 - 1;
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(isSpaceOrEnter ? 1200 : 2600 * pitch, now);
    noiseFilter.Q.setValueAtTime(3.0, now); // high Q for sharp click

    const noiseGain = ctx.createGain();
    // Lowered volumes to make it whisper-quiet
    noiseGain.gain.setValueAtTime(isSpaceOrEnter ? 0.05 : 0.07, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.008);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    gainNodeToDestination(noiseGain);
    noiseSource.start(now);

    // 2. Lubed Switch Housing bottom-out (deep body thock)
    const bodyOsc = ctx.createOscillator();
    bodyOsc.type = 'triangle';
    
    const startFreq = isSpaceOrEnter ? 85 : 175 * pitch;
    bodyOsc.frequency.setValueAtTime(startFreq, now);
    // Fast frequency drop (simulates switch bottoming out and damping)
    bodyOsc.frequency.exponentialRampToValueAtTime(startFreq * 0.7, now + 0.02);

    const bodyGain = ctx.createGain();
    // Lowered volumes to make it whisper-quiet
    bodyGain.gain.setValueAtTime(isSpaceOrEnter ? 0.11 : 0.08, now);
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.024);

    bodyOsc.connect(bodyGain);
    gainNodeToDestination(bodyGain);
    bodyOsc.start(now);
    bodyOsc.stop(now + 0.026);

    // 3. Hollow Case/Plate Resonance (mid-freq textural bandpassed noise)
    const resLen = ctx.sampleRate * 0.035; // 35ms case ring
    const resBuffer = ctx.createBuffer(1, resLen, ctx.sampleRate);
    const resData = resBuffer.getChannelData(0);
    for (let i = 0; i < resLen; i++) {
      resData[i] = Math.random() * 2 - 1;
    }
    const resSource = ctx.createBufferSource();
    resSource.buffer = resBuffer;

    const resFilter = ctx.createBiquadFilter();
    resFilter.type = 'bandpass';
    // Mid frequencies for hollow wood/plastic clack
    resFilter.frequency.setValueAtTime(isSpaceOrEnter ? 240 : 380 * pitch, now);
    resFilter.Q.setValueAtTime(4.0, now); // narrow band to sound resonant

    const resGain = ctx.createGain();
    // Lowered volumes to make it whisper-quiet
    resGain.gain.setValueAtTime(isSpaceOrEnter ? 0.04 : 0.02, now);
    resGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.032);

    resSource.connect(resFilter);
    resFilter.connect(resGain);
    gainNodeToDestination(resGain);
    resSource.start(now);
    resSource.stop(now + 0.035);

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
