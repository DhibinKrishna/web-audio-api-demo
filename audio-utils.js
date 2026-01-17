// ==========================================
// Pure utility functions for audio calculations
// These are extracted for testability
// ==========================================

/**
 * Semitone offsets for Sargam notes relative to Sa
 */
const SEMITONE_MAP = {
    'sa': 0,
    're': 2,
    'ga': 4,
    'ma': 5,
    'pa': 7,
    'da': 9,
    'ni': 11,
    'sa2': 12
};

/**
 * Calculate frequency from base frequency and semitone offset
 * Formula: frequency = baseFreq * 2^(semitones/12)
 *
 * @param {number} baseFreq - Base frequency in Hz
 * @param {number} semitones - Number of semitones from base
 * @returns {number} Calculated frequency in Hz
 */
function calculateFrequency(baseFreq, semitones) {
    if (baseFreq <= 0) {
        throw new Error('Base frequency must be positive');
    }
    return baseFreq * Math.pow(2, semitones / 12);
}

/**
 * Get frequency for a Sargam note given base frequency
 *
 * @param {string} note - Note name (sa, re, ga, ma, pa, da, ni, sa2)
 * @param {number} baseFreq - Base frequency for Sa in Hz
 * @returns {number} Frequency in Hz
 */
function getNoteFrequency(note, baseFreq) {
    const noteLower = note.toLowerCase();
    if (!SEMITONE_MAP.hasOwnProperty(noteLower)) {
        throw new Error(`Unknown note: ${note}`);
    }
    return calculateFrequency(baseFreq, SEMITONE_MAP[noteLower]);
}

/**
 * Clamp a value between min and max
 *
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Validate frequency is within audible range
 *
 * @param {number} freq - Frequency in Hz
 * @returns {boolean} True if frequency is audible (20Hz - 20kHz)
 */
function isAudibleFrequency(freq) {
    return freq >= 20 && freq <= 20000;
}

/**
 * Get all note frequencies for a given base frequency
 *
 * @param {number} baseFreq - Base frequency for Sa in Hz
 * @returns {Object} Map of note names to frequencies
 */
function getAllNoteFrequencies(baseFreq) {
    const frequencies = {};
    for (const [note, semitones] of Object.entries(SEMITONE_MAP)) {
        frequencies[note] = calculateFrequency(baseFreq, semitones);
    }
    return frequencies;
}

// Export for use in other files (works with ES modules or global scope)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SEMITONE_MAP,
        calculateFrequency,
        getNoteFrequency,
        clamp,
        isAudibleFrequency,
        getAllNoteFrequencies
    };
}
