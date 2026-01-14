# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A single-page Web Audio API demonstration app built with vanilla HTML/CSS/JS. No build tools or dependencies required.

## Running the Demo

Open `index.html` directly in a browser, or use a local server:
```bash
python3 -m http.server 8000
```

## Architecture

### Multi-View Structure

The app uses a single-page architecture with three views:
- **Landing View** (`#landing-view`) - Mode selection (Demo/Piano)
- **Demo View** (`#demo-view`) - Full sound exploration with visualization
- **Piano View** (`#piano-view`) - Sargam note player

View switching is handled by `showView(viewId)` function which toggles `.hidden` class.

### Adding New Views

1. Add view section in `index.html` with `class="view hidden"` and unique id
2. Add back button with `data-target="landing-view"`
3. Add mode button in landing view
4. Add event listener in `script.js` for the new mode button
5. Add view-specific styles in `styles.css`

### Piano - Sargam Frequencies

8 unlabeled white keys spanning one full octave. Frequencies are dynamically calculated based on a user-selectable **Base Frequency (Sa)**.

| Note | Semitone Offset |
|------|----------------|
| Sa | 0 |
| Re | 2 |
| Ga | 4 |
| Ma | 5 |
| Pa | 7 |
| Da | 9 |
| Ni | 11 |
| Sa'| 12 |

Formula: `Frequency = BaseFreq * 2^(Semitone/12)`

### Piano Controls

- **Base Frequency** (100-1000Hz) - Sets the pitch of 'Sa'; affects all other keys.
- **Duration** (0.1-2s) - Controls the length of the note envelope.
- **Waveform** - Selects the oscillator type (Sine, Square, Sawtooth, Triangle).

### Audio Generation Pattern

All sounds in `script.js` follow this structure:
1. Use `getAudioContext()` to retrieve the singleton context (prevents resource limits)
2. Build node graph: source → [effects] → gain → analyser → destination
3. Schedule amplitude envelope using `gain.gain.setValueAtTime()` and ramp methods
4. Call `start()` and `stop()` with timing based on duration slider
5. Use `createAnalyserChain()` helper to connect visualization

### Waveform Visualization

Real-time waveform display using:
- `AnalyserNode` connected between gain and destination
- `getByteTimeDomainData()` to read waveform samples
- Canvas 2D API with `requestAnimationFrame` for smooth rendering
- Auto-cleanup via `setTimeout` when sound ends

### Global Controls

- **Frequency** (20-2000Hz) - Controls oscillator pitch; `getFrequency()` helper
- **Duration** (1-5s) - Controls sound length; `getDuration()` helper

### UI Layout

The Demo view uses a **sticky header** pattern:
- `.sticky-header` wraps the title, visualizer, and controls in Demo view
- Uses `position: sticky` to stay visible while scrolling through categories
- Background matches page gradient to prevent content showing through
- Responsive adjustments in mobile media query reduce header height

### Sound Categories

Each category demonstrates different Web Audio API techniques:

- **Basic Waveforms** - OscillatorNode with sine/square/sawtooth/triangle types
- **Filtered Sounds** - BiquadFilterNode (lowpass/highpass/bandpass/notch)
- **Envelope Shapes** - Amplitude envelopes via GainNode scheduling (pluck/pad/stab/swell)
- **Modulation Effects** - LFO modulation for vibrato/tremolo; FM synthesis for bass/bell
- **Sound Effects** - Frequency sweeps, white noise via AudioBuffer

### Adding New Sounds

1. Create a `playXxx()` function in `script.js` following existing patterns
2. Use `createAnalyserChain(ctx, gain)` instead of `gain.connect(ctx.destination)`
3. Add `setTimeout(() => { stopVisualization(); clearCanvas(); }, duration * 1000 + 100)` for cleanup
4. Add to `sounds` object mapping
5. Add button with `data-sound="xxx"` attribute in `index.html`
6. Optionally add category-specific button styling in `styles.css`

## Maintenance

When making significant changes to this codebase (new features, architectural changes, new controls), update this CLAUDE.md file to reflect those changes.
