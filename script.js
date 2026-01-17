// ==========================================
// Audio Context Management
// ==========================================

let audioContext = null;

function getAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    return audioContext;
}

// ==========================================
// View Management
// ==========================================

function showView(viewId) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.add('hidden');
    });
    document.getElementById(viewId).classList.remove('hidden');

    // Initialize canvas when demo view is shown
    if (viewId === 'demo-view' && canvas) {
        resizeCanvas();
        clearCanvas();
    }
}

// Landing page buttons
document.getElementById('btn-demo').addEventListener('click', () => showView('demo-view'));
document.getElementById('btn-piano').addEventListener('click', () => showView('piano-view'));

// Back buttons
document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        showView(target);
    });
});

// ==========================================
// Demo View - Control Elements
// ==========================================

const durationSlider = document.getElementById('duration');
const durationValue = document.getElementById('duration-value');
const frequencySlider = document.getElementById('frequency');
const frequencyValue = document.getElementById('frequency-value');
const canvas = document.getElementById('waveform');
const canvasCtx = canvas ? canvas.getContext('2d') : null;

// Visualization state
let animationId = null;
let currentAnalyser = null;

// Set canvas size
function resizeCanvas() {
    if (!canvas || !canvasCtx) return;
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    canvasCtx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

window.addEventListener('resize', resizeCanvas);

// Control event listeners
durationSlider.addEventListener('input', () => {
    durationValue.textContent = durationSlider.value;
});

frequencySlider.addEventListener('input', () => {
    frequencyValue.textContent = frequencySlider.value;
});

function getDuration() {
    return parseFloat(durationSlider.value);
}

function getFrequency() {
    return parseFloat(frequencySlider.value);
}

// Visualization functions
function startVisualization(analyser) {
    if (!canvas || !canvasCtx) return;
    stopVisualization();
    currentAnalyser = analyser;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    function draw() {
        animationId = requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

        canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        canvasCtx.fillRect(0, 0, width, height);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = '#00d4ff';
        canvasCtx.beginPath();

        const sliceWidth = width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = (v * height) / 2;

            if (i === 0) {
                canvasCtx.moveTo(x, y);
            } else {
                canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        canvasCtx.lineTo(width, height / 2);
        canvasCtx.stroke();
    }

    draw();
}

function stopVisualization() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

function clearCanvas() {
    if (!canvas || !canvasCtx) return;
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    if (width === 0 || height === 0) return;
    canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    canvasCtx.fillRect(0, 0, width, height);
    canvasCtx.strokeStyle = '#00d4ff';
    canvasCtx.lineWidth = 2;
    canvasCtx.beginPath();
    canvasCtx.moveTo(0, height / 2);
    canvasCtx.lineTo(width, height / 2);
    canvasCtx.stroke();
}

// Helper to create analyser and connect to destination
function createAnalyserChain(ctx, sourceNode) {
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    sourceNode.connect(analyser);
    analyser.connect(ctx.destination);
    startVisualization(analyser);
    return analyser;
}

// Basic Waveforms
function playSine() {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const duration = getDuration();

    osc.type = 'sine';
    osc.frequency.value = getFrequency();
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    createAnalyserChain(ctx, gain);
    osc.start();
    osc.stop(ctx.currentTime + duration);
    setTimeout(() => { stopVisualization(); clearCanvas(); }, duration * 1000 + 100);
}

function playSquare() {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const duration = getDuration();

    osc.type = 'square';
    osc.frequency.value = getFrequency();
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    createAnalyserChain(ctx, gain);
    osc.start();
    osc.stop(ctx.currentTime + duration);
    setTimeout(() => { stopVisualization(); clearCanvas(); }, duration * 1000 + 100);
}

function playSawtooth() {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const duration = getDuration();

    osc.type = 'sawtooth';
    osc.frequency.value = getFrequency();
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    createAnalyserChain(ctx, gain);
    osc.start();
    osc.stop(ctx.currentTime + duration);
    setTimeout(() => { stopVisualization(); clearCanvas(); }, duration * 1000 + 100);
}

function playTriangle() {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const duration = getDuration();

    osc.type = 'triangle';
    osc.frequency.value = getFrequency();
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    createAnalyserChain(ctx, gain);
    osc.start();
    osc.stop(ctx.currentTime + duration);
    setTimeout(() => { stopVisualization(); clearCanvas(); }, duration * 1000 + 100);
}

// Filtered Sounds
function playLowpass() {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    const duration = getDuration();

    osc.type = 'sawtooth';
    osc.frequency.value = getFrequency();
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    filter.Q.value = 5;
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    createAnalyserChain(ctx, gain);
    osc.start();
    osc.stop(ctx.currentTime + duration);
    setTimeout(() => { stopVisualization(); clearCanvas(); }, duration * 1000 + 100);
}

function playHighpass() {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    const duration = getDuration();

    osc.type = 'sawtooth';
    osc.frequency.value = getFrequency();
    filter.type = 'highpass';
    filter.frequency.value = 2000;
    filter.Q.value = 5;
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    createAnalyserChain(ctx, gain);
    osc.start();
    osc.stop(ctx.currentTime + duration);
    setTimeout(() => { stopVisualization(); clearCanvas(); }, duration * 1000 + 100);
}

function playBandpass() {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    const duration = getDuration();

    osc.type = 'sawtooth';
    osc.frequency.value = getFrequency();
    filter.type = 'bandpass';
    filter.frequency.value = 1000;
    filter.Q.value = 10;
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    createAnalyserChain(ctx, gain);
    osc.start();
    osc.stop(ctx.currentTime + duration);
    setTimeout(() => { stopVisualization(); clearCanvas(); }, duration * 1000 + 100);
}

function playNotch() {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    const duration = getDuration();

    osc.type = 'sawtooth';
    osc.frequency.value = getFrequency();
    filter.type = 'notch';
    filter.frequency.value = 1000;
    filter.Q.value = 10;
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    createAnalyserChain(ctx, gain);
    osc.start();
    osc.stop(ctx.currentTime + duration);
    setTimeout(() => { stopVisualization(); clearCanvas(); }, duration * 1000 + 100);
}

// Envelope Shapes
function playPluck() {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const duration = getDuration();

    osc.type = 'sawtooth';
    osc.frequency.value = getFrequency();

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration * 0.3);
    gain.gain.setValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    createAnalyserChain(ctx, gain);
    osc.start();
    osc.stop(ctx.currentTime + duration);
    setTimeout(() => { stopVisualization(); clearCanvas(); }, duration * 1000 + 100);
}

function playPad() {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const duration = getDuration();

    osc.type = 'sine';
    osc.frequency.value = getFrequency();

    const attackTime = duration * 0.3;
    const releaseTime = duration * 0.3;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + attackTime);
    gain.gain.setValueAtTime(0.3, ctx.currentTime + duration - releaseTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);

    osc.connect(gain);
    createAnalyserChain(ctx, gain);
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.1);
    setTimeout(() => { stopVisualization(); clearCanvas(); }, duration * 1000 + 200);
}

function playStab() {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const duration = getDuration();

    osc.type = 'square';
    osc.frequency.value = getFrequency();

    const stabDuration = Math.min(0.15, duration * 0.2);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.setValueAtTime(0.25, ctx.currentTime + stabDuration);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + stabDuration + 0.1);

    osc.connect(gain);
    createAnalyserChain(ctx, gain);
    osc.start();
    osc.stop(ctx.currentTime + duration);
    setTimeout(() => { stopVisualization(); clearCanvas(); }, duration * 1000 + 100);
}

function playSwell() {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const duration = getDuration();

    osc.type = 'sine';
    osc.frequency.value = getFrequency();

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + duration * 0.9);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);

    osc.connect(gain);
    createAnalyserChain(ctx, gain);
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.1);
    setTimeout(() => { stopVisualization(); clearCanvas(); }, duration * 1000 + 200);
}

// Modulation Effects
function playVibrato() {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const gain = ctx.createGain();
    const duration = getDuration();

    osc.type = 'sine';
    osc.frequency.value = getFrequency();

    lfo.type = 'sine';
    lfo.frequency.value = 6;
    lfoGain.gain.value = 20;

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    osc.connect(gain);
    createAnalyserChain(ctx, gain);

    lfo.start();
    osc.start();
    osc.stop(ctx.currentTime + duration);
    lfo.stop(ctx.currentTime + duration);
    setTimeout(() => { stopVisualization(); clearCanvas(); }, duration * 1000 + 100);
}

function playTremolo() {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const gain = ctx.createGain();
    const duration = getDuration();

    osc.type = 'sine';
    osc.frequency.value = getFrequency();

    lfo.type = 'sine';
    lfo.frequency.value = 8;
    lfoGain.gain.value = 0.3;

    gain.gain.setValueAtTime(0.3, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    osc.connect(gain);
    createAnalyserChain(ctx, gain);

    lfo.start();
    osc.start();
    osc.stop(ctx.currentTime + duration);
    lfo.stop(ctx.currentTime + duration);
    setTimeout(() => { stopVisualization(); clearCanvas(); }, duration * 1000 + 100);
}

function playFmBass() {
    const ctx = getAudioContext();
    const carrier = ctx.createOscillator();
    const modulator = ctx.createOscillator();
    const modulatorGain = ctx.createGain();
    const gain = ctx.createGain();
    const duration = getDuration();

    const freq = Math.min(getFrequency(), 200);
    carrier.type = 'sine';
    carrier.frequency.value = freq;

    modulator.type = 'sine';
    modulator.frequency.value = freq;
    modulatorGain.gain.value = 100;

    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    modulator.connect(modulatorGain);
    modulatorGain.connect(carrier.frequency);
    carrier.connect(gain);
    createAnalyserChain(ctx, gain);

    modulator.start();
    carrier.start();
    carrier.stop(ctx.currentTime + duration);
    modulator.stop(ctx.currentTime + duration);
    setTimeout(() => { stopVisualization(); clearCanvas(); }, duration * 1000 + 100);
}

function playFmBell() {
    const ctx = getAudioContext();
    const carrier = ctx.createOscillator();
    const modulator = ctx.createOscillator();
    const modulatorGain = ctx.createGain();
    const gain = ctx.createGain();
    const duration = getDuration();

    const freq = getFrequency();
    carrier.type = 'sine';
    carrier.frequency.value = freq;

    modulator.type = 'sine';
    modulator.frequency.value = freq * 1.4;
    modulatorGain.gain.value = 500;
    modulatorGain.gain.exponentialRampToValueAtTime(1, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    modulator.connect(modulatorGain);
    modulatorGain.connect(carrier.frequency);
    carrier.connect(gain);
    createAnalyserChain(ctx, gain);

    modulator.start();
    carrier.start();
    carrier.stop(ctx.currentTime + duration);
    modulator.stop(ctx.currentTime + duration);
    setTimeout(() => { stopVisualization(); clearCanvas(); }, duration * 1000 + 100);
}

// Sound Effects
function playLaser() {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const duration = getDuration();

    const baseFreq = getFrequency();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(baseFreq * 3, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.2, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    createAnalyserChain(ctx, gain);
    osc.start();
    osc.stop(ctx.currentTime + duration);
    setTimeout(() => { stopVisualization(); clearCanvas(); }, duration * 1000 + 100);
}

function playPowerUp() {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const duration = getDuration();

    const baseFreq = getFrequency();
    osc.type = 'square';
    osc.frequency.setValueAtTime(baseFreq * 0.5, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.5, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.setValueAtTime(0.2, ctx.currentTime + duration * 0.8);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    createAnalyserChain(ctx, gain);
    osc.start();
    osc.stop(ctx.currentTime + duration);
    setTimeout(() => { stopVisualization(); clearCanvas(); }, duration * 1000 + 100);
}

function playAlarm() {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const gain = ctx.createGain();
    const duration = getDuration();

    osc.type = 'square';
    osc.frequency.value = getFrequency();

    lfo.type = 'square';
    lfo.frequency.value = 4;
    lfoGain.gain.value = 200;

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.setValueAtTime(0.2, ctx.currentTime + duration * 0.9);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    osc.connect(gain);
    createAnalyserChain(ctx, gain);

    lfo.start();
    osc.start();
    osc.stop(ctx.currentTime + duration);
    lfo.stop(ctx.currentTime + duration);
    setTimeout(() => { stopVisualization(); clearCanvas(); }, duration * 1000 + 100);
}

function playNoiseBurst() {
    const ctx = getAudioContext();
    const duration = getDuration();
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    noise.connect(gain);
    createAnalyserChain(ctx, gain);
    noise.start();
    setTimeout(() => { stopVisualization(); clearCanvas(); }, duration * 1000 + 100);
}

// Sound mapping
const sounds = {
    sine: playSine,
    square: playSquare,
    sawtooth: playSawtooth,
    triangle: playTriangle,
    lowpass: playLowpass,
    highpass: playHighpass,
    bandpass: playBandpass,
    notch: playNotch,
    pluck: playPluck,
    pad: playPad,
    stab: playStab,
    swell: playSwell,
    vibrato: playVibrato,
    tremolo: playTremolo,
    fmBass: playFmBass,
    fmBell: playFmBell,
    laser: playLaser,
    powerUp: playPowerUp,
    alarm: playAlarm,
    noiseBurst: playNoiseBurst
};

// Event listeners for demo sounds
document.querySelectorAll('button[data-sound]').forEach(button => {
    button.addEventListener('click', () => {
        const soundName = button.dataset.sound;
        if (sounds[soundName]) {
            sounds[soundName]();
        }
    });
});

// ==========================================
// Piano View
// ==========================================

let selectedWaveform = 'sine';

const pianoFrequencySlider = document.getElementById('piano-frequency');
const pianoFrequencyValue = document.getElementById('piano-frequency-value');
const pianoDurationSlider = document.getElementById('piano-duration');
const pianoDurationValue = document.getElementById('piano-duration-value');

// Use SEMITONE_MAP from audio-utils.js for consistency

function updatePianoKeyLabels() {
    if (!pianoFrequencySlider) return;
    const baseFreq = parseFloat(pianoFrequencySlider.value);
    
    document.querySelectorAll('.piano-key').forEach(key => {
        const note = key.dataset.note;
        if (SEMITONE_MAP.hasOwnProperty(note)) {
            const freq = calculateFrequency(baseFreq, SEMITONE_MAP[note]);
            key.textContent = Math.round(freq);
        }
    });
}

if (pianoFrequencySlider && pianoFrequencyValue) {
    updatePianoKeyLabels();
    pianoFrequencySlider.addEventListener('input', () => {
        pianoFrequencyValue.textContent = pianoFrequencySlider.value;
        updatePianoKeyLabels();
    });
}

if (pianoDurationSlider && pianoDurationValue) {
    pianoDurationSlider.addEventListener('input', () => {
        pianoDurationValue.textContent = pianoDurationSlider.value;
    });
}

// Waveform selector
document.querySelectorAll('.wave-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.wave-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedWaveform = btn.dataset.wave;
    });
});

// Play piano note
function playPianoNote(frequency) {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const duration = pianoDurationSlider ? parseFloat(pianoDurationSlider.value) : 0.5;

    osc.type = selectedWaveform;
    osc.frequency.value = frequency;

    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
}

// Helper to trigger a piano key
function triggerKey(key) {
    const note = key.dataset.note;
    if (SEMITONE_MAP.hasOwnProperty(note) && pianoFrequencySlider) {
        const baseFreq = parseFloat(pianoFrequencySlider.value);
        const freq = calculateFrequency(baseFreq, SEMITONE_MAP[note]);
        playPianoNote(freq);
    } else {
        const freq = parseFloat(key.dataset.freq);
        playPianoNote(freq);
    }
}

// Piano key event listeners
document.querySelectorAll('.piano-key').forEach(key => {
    // Play on click/press
    key.addEventListener('mousedown', (e) => {
        triggerKey(key);
    });

    // Play on drag enter (if mouse is down)
    key.addEventListener('mouseenter', (e) => {
        if (e.buttons === 1) { // 1 = Left mouse button
            triggerKey(key);
        }
    });
});

// Keyboard mapping for piano keys
const keyboardToNote = {
    'a': 'sa',
    's': 're',
    'd': 'ga',
    'f': 'ma',
    'j': 'pa',
    'k': 'da',
    'l': 'ni',
    ';': 'sa2'
};

document.addEventListener('keydown', (e) => {
    // Only respond when piano view is visible
    const pianoView = document.getElementById('piano-view');
    if (pianoView.classList.contains('hidden')) return;

    // Ignore if typing in an input
    if (e.target.tagName === 'INPUT') return;

    const note = keyboardToNote[e.key.toLowerCase()];
    if (note) {
        const key = document.querySelector(`.piano-key[data-note="${note}"]`);
        if (key) {
            triggerKey(key);
            // Visual feedback
            key.classList.add('active');
            setTimeout(() => key.classList.remove('active'), 100);
        }
    }
});
