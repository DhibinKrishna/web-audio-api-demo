# Product Requirements Document (PRD)
## Web Audio API Demo

### 1. Overview

**Product Name:** Web Audio API Demo
**Version:** 1.0
**Type:** Single-page educational web application

#### 1.1 Purpose
An interactive demonstration application that showcases the capabilities of the Web Audio API through various sound synthesis techniques. The app serves as both an educational tool for developers learning Web Audio and a playground for exploring audio synthesis concepts.

#### 1.2 Target Users
- Web developers learning the Web Audio API
- Audio enthusiasts exploring browser-based sound synthesis
- Educators teaching web audio concepts
- Anyone curious about how digital audio works in browsers

---

### 2. Product Goals

| Goal | Description |
|------|-------------|
| **Educational** | Demonstrate core Web Audio API concepts through practical, audible examples |
| **Interactive** | Allow users to experiment with frequency and duration parameters |
| **Visual** | Provide real-time waveform visualization to connect audio concepts with visual representation |
| **Accessible** | Zero setup required - works directly in any modern browser |

---

### 3. Features

#### 3.1 Sound Categories

The application provides 20 distinct sounds organized into 5 categories:

##### 3.1.1 Basic Waveforms
Demonstrates the four fundamental `OscillatorNode` wave types:
- **Sine** - Pure tone, smooth waveform
- **Square** - Hollow, buzzy tone with odd harmonics
- **Sawtooth** - Bright, full harmonic spectrum
- **Triangle** - Softer than square, odd harmonics only

##### 3.1.2 Filtered Sounds
Demonstrates `BiquadFilterNode` filter types applied to a sawtooth wave:
- **Lowpass** - Removes frequencies above cutoff (800Hz, Q=5)
- **Highpass** - Removes frequencies below cutoff (2000Hz, Q=5)
- **Bandpass** - Passes only frequencies around center (1000Hz, Q=10)
- **Notch** - Removes frequencies around center (1000Hz, Q=10)

##### 3.1.3 Envelope Shapes
Demonstrates amplitude shaping via `GainNode` parameter automation:
- **Pluck** - Instant attack, fast exponential decay (string-like)
- **Pad** - Slow attack, sustained, slow release (synth pad)
- **Stab** - Short, punchy sound with abrupt cutoff
- **Swell** - Gradual volume increase then quick fade

##### 3.1.4 Modulation Effects
Demonstrates LFO (Low Frequency Oscillator) and FM (Frequency Modulation) synthesis:
- **Vibrato** - LFO modulates pitch (6Hz, ±20Hz depth)
- **Tremolo** - LFO modulates amplitude (8Hz rate)
- **FM Bass** - Frequency modulation for bass tones (1:1 ratio)
- **FM Bell** - Frequency modulation for bell-like timbres (1:1.4 ratio)

##### 3.1.5 Sound Effects
Demonstrates frequency sweeps and noise generation:
- **Laser** - Downward frequency sweep (3x to 0.2x base frequency)
- **Power Up** - Upward frequency sweep (0.5x to 2.5x base frequency)
- **Alarm** - Square wave LFO modulating pitch
- **Noise Burst** - White noise via `AudioBuffer` with random samples

#### 3.2 Global Controls

| Control | Range | Default | Purpose |
|---------|-------|---------|---------|
| **Frequency** | 20Hz - 2000Hz | 440Hz | Controls base pitch for oscillators |
| **Duration** | 1s - 5s | 2s | Controls sound length |

#### 3.3 Waveform Visualization

- Real-time canvas-based waveform display
- Uses `AnalyserNode.getByteTimeDomainData()` for time-domain data
- 60fps rendering via `requestAnimationFrame`
- Auto-cleanup when sound ends
- Responsive canvas sizing with devicePixelRatio support

#### 3.4 Piano View

- 8-key Sargam scale (Sa, Re, Ga, Ma, Pa, Da, Ni, Sa')
- Customizable Base Frequency (Sa) via slider (100Hz - 1000Hz)
- Customizable Duration via slider (0.1s - 2s)
- Waveform selection (Sine, Square, Sawtooth, Triangle)
- Dynamic frequency calculation based on 12-tone Equal Temperament

---

### 4. Technical Specifications

#### 4.1 Technology Stack

| Component | Technology |
|-----------|------------|
| Markup | HTML5 |
| Styling | CSS3 (Flexbox, Grid, Custom Properties) |
| Logic | Vanilla JavaScript (ES6+) |
| Audio | Web Audio API |
| Visualization | Canvas 2D API |

#### 4.2 Architecture

```
User Interaction (Button Click)
        ↓
Play Function (e.g., playSine())
        ↓
┌───────────────────────────────────────┐
│  AudioContext (singleton instance)    │
├───────────────────────────────────────┤
│  Source Node                          │
│  (OscillatorNode or AudioBufferSource)│
├───────────────────────────────────────┤
│  Effect Nodes (optional)              │
│  (BiquadFilterNode, LFO chain)        │
├───────────────────────────────────────┤
│  GainNode (amplitude envelope)        │
├───────────────────────────────────────┤
│  AnalyserNode (visualization)         │
├───────────────────────────────────────┤
│  AudioDestination (speakers)          │
└───────────────────────────────────────┘
```

#### 4.3 Audio Pattern

Each sound function follows this structure:
1. Get the shared `AudioContext` (singleton)
2. Build audio node graph (source → effects → gain → analyser → destination)
3. Schedule envelope using `setValueAtTime()`, `linearRampToValueAtTime()`, `exponentialRampToValueAtTime()`
4. Start/stop nodes with precise timing
5. Set timeout for visualization cleanup

#### 4.4 Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome | Full support |
| Firefox | Full support |
| Safari | Full support (with webkit prefix fallback) |
| Edge | Full support |

#### 4.5 File Structure

```
web_audio_api_demo/
├── index.html      # Page structure and UI elements
├── styles.css      # Visual styling and responsive design
├── script.js       # Audio logic and visualization
├── CLAUDE.md       # Development documentation
└── PRD.md          # This document
```

---

### 5. User Interface

#### 5.1 Layout

```
┌────────────────────────────────────────┐
│           Web Audio API Demo           │  ← Header
├────────────────────────────────────────┤
│    ┌──────────────────────────────┐    │
│    │    Waveform Visualizer       │    │  ← Canvas
│    └──────────────────────────────┘    │
├────────────────────────────────────────┤
│  [Frequency: 440Hz ════════○════]     │
│  [Duration: 2s     ════○════════]     │  ← Controls
├────────────────────────────────────────┤
│  Basic Waveforms                       │
│  [Sine] [Square] [Sawtooth] [Triangle] │
├────────────────────────────────────────┤
│  Filtered Sounds                       │
│  [Lowpass] [Highpass] [Bandpass] [Notch]│
├────────────────────────────────────────┤
│  Envelope Shapes                       │
│  [Pluck] [Pad] [Stab] [Swell]         │
├────────────────────────────────────────┤
│  Modulation Effects                    │
│  [Vibrato] [Tremolo] [FM Bass] [FM Bell]│
├────────────────────────────────────────┤
│  Sound Effects                         │
│  [Laser] [Power Up] [Alarm] [Noise]   │
└────────────────────────────────────────┘
```

#### 5.2 Visual Design

- **Color Scheme:** Dark theme with gradient accents
- **Background:** Linear gradient (#1a1a2e → #16213e)
- **Accent Color:** Cyan (#00d4ff) for highlights
- **Category Colors:** Each sound category has a unique gradient
- **Typography:** System font stack for optimal performance

#### 5.3 Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| > 600px | Full layout, side-by-side controls, 4-column button grid |
| ≤ 600px | Stacked controls, 2-column button grid, reduced padding |

---

### 6. Non-Functional Requirements

#### 6.1 Performance
- No external dependencies (zero network requests beyond initial load)
- Instant sound playback (< 10ms latency)
- Smooth 60fps visualization
- Minimal memory footprint (AudioContexts cleaned up after use)

#### 6.2 Accessibility
- Keyboard navigable (tab through buttons)
- Clear visual feedback on button hover/active states
- Sufficient color contrast for text readability
- Semantic HTML structure

#### 6.3 Deployment
- Static files only - no server-side processing required
- Can be served from any web server or opened directly from filesystem
- No build step or compilation needed

---

### 7. Future Considerations

Potential enhancements for future versions:

| Feature | Description |
|---------|-------------|
| **MIDI Support** | Connect external MIDI controllers |
| **Recording** | Export generated sounds as WAV/MP3 |
| **Presets** | Save and load frequency/duration combinations |
| **Additional Effects** | Reverb, delay, distortion via ConvolverNode/WaveShaperNode |
| **Frequency Spectrum** | FFT-based spectrum analyzer visualization |
| **Keyboard Input** | Play sounds via computer keyboard (musical keyboard layout) |
| **Touch Gestures** | Continuous parameter control via touch/drag |
| **Code Display** | Show the Web Audio API code for each sound |

---

### 8. Success Metrics

| Metric | Target |
|--------|--------|
| Initial load time | < 1 second |
| Sound playback latency | < 10ms |
| Browser compatibility | 95%+ of users |
| Mobile usability | Fully functional on touch devices |

---

### 9. Glossary

| Term | Definition |
|------|------------|
| **AudioContext** | The main interface for the Web Audio API; represents an audio-processing graph |
| **OscillatorNode** | Generates periodic waveforms (sine, square, etc.) |
| **GainNode** | Controls audio volume/amplitude |
| **BiquadFilterNode** | Implements common audio filters (lowpass, highpass, etc.) |
| **AnalyserNode** | Provides real-time frequency and time-domain analysis |
| **LFO** | Low Frequency Oscillator - oscillator used for modulation rather than audio |
| **FM Synthesis** | Frequency Modulation - one oscillator modulates another's frequency |
| **Envelope** | The shape of a sound's amplitude over time (attack, decay, sustain, release) |
