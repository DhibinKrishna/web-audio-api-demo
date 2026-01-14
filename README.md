# Web Audio API Demo

A single-page interactive demonstration of the Web Audio API built with vanilla HTML, CSS, and JavaScript. No build tools or dependencies required.

## Features

### Demo Mode

Explore various Web Audio API techniques with real-time waveform visualization:

- **Basic Waveforms** - Sine, Square, Sawtooth, Triangle
- **Filtered Sounds** - Lowpass, Highpass, Bandpass, Notch filters
- **Envelope Shapes** - Pluck, Pad, Stab, Swell
- **Modulation Effects** - Vibrato, Tremolo, FM Bass, FM Bell
- **Sound Effects** - Laser, Power Up, Alarm, Noise Burst

### Notes Mode

Play the notes with customizable:

- Base frequency
- Note duration
- Waveform type

## Getting Started

Open `index.html` directly in a browser, or use a local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`

## Project Structure

```
├── index.html    # Main HTML structure
├── styles.css    # Styling
├── script.js     # Web Audio API logic
└── CLAUDE.md     # Developer documentation
```

## License

MIT License - see [LICENSE](LICENSE) for details.
