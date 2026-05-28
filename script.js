/* ==========================================================================
   GAME ENGINE: Sa Space Typing Adventure (โรงเรียนสา ม.1)
   Features: Synthesized 8-bit Audio, Cross-Layout Assist, Boss Fight System,
             Podium Leaderboard, Teacher Dashboard with Excel Export
   ========================================================================== */

// 🌐 CONFIG: Google Sheets Real-Time Sync URL
// วางลิงก์ Google Apps Script Web App ของคุณครูตรงนี้เพื่อซิงค์คะแนนข้ามเครื่องทั้งห้องเรียนฟรี!
const GOOGLE_SHEET_SYNC_URL = "https://script.google.com/macros/s/AKfycbyqs7UV35AfZXCmvPB9O91uimj1tPXdFsvR6oN3KFKAe3UNnh4zunRMKfN1pDZUN545iQ/exec";

// 1. KEYBOARD LAYOUT DEFINITION & MAPPINGS
const keyboardRows = [
    [
        { code: 'Backquote', en: '`', enShift: '~', th: 'clear', thShift: 'clear', labelEn: '`', labelTh: 'clear', finger: 1 },
        { code: 'Digit1', en: '1', enShift: '!', th: 'ๅ', thShift: '+', finger: 1 },
        { code: 'Digit2', en: '2', enShift: '@', th: '/', thShift: '๑', finger: 2 },
        { code: 'Digit3', en: '3', enShift: '#', th: '_', thShift: '๒', finger: 3 },
        { code: 'Digit4', en: '4', enShift: '$', th: 'ภ', thShift: '๓', finger: 4 },
        { code: 'Digit5', en: '5', enShift: '%', th: 'ถ', thShift: '๔', finger: 4 },
        { code: 'Digit6', en: '6', enShift: '^', th: 'ุ', thShift: 'ู', finger: 6 },
        { code: 'Digit7', en: '7', enShift: '&', th: 'ึ', thShift: '฿', finger: 6 },
        { code: 'Digit8', en: '8', enShift: '*', th: 'ค', thShift: '๕', finger: 7 },
        { code: 'Digit9', en: '9', enShift: '(', th: 'ต', thShift: '๖', finger: 8 },
        { code: 'Digit0', en: '0', enShift: ')', th: 'จ', thShift: '๗', finger: 9 },
        { code: 'Minus', en: '-', enShift: '_', th: 'ข', thShift: '๘', finger: 9 },
        { code: 'Equal', en: '=', enShift: '+', th: 'ช', thShift: '๙', finger: 9 },
        { code: 'Backspace', en: '⌫', th: '⌫', styleClass: 'key-backspace', finger: 9 }
    ],
    [
        { code: 'Tab', en: 'Tab', th: 'Tab', styleClass: 'key-tab', finger: 1 },
        { code: 'KeyQ', en: 'q', enShift: 'Q', th: 'ๆ', thShift: '๐', finger: 1 },
        { code: 'KeyW', en: 'w', enShift: 'W', th: 'ไ', thShift: '"', finger: 2 },
        { code: 'KeyE', en: 'e', enShift: 'E', th: 'ำ', thShift: 'ฎ', finger: 3 },
        { code: 'KeyR', en: 'r', enShift: 'R', th: 'พ', thShift: 'ฑ', finger: 4 },
        { code: 'KeyT', en: 't', enShift: 'T', th: 'ะ', thShift: 'ธ', finger: 4 },
        { code: 'KeyY', en: 'y', enShift: 'Y', th: 'ั', thShift: '๊', finger: 6 },
        { code: 'KeyU', en: 'u', enShift: 'U', th: 'ี', thShift: '๋', finger: 6 },
        { code: 'KeyI', en: 'i', enShift: 'I', th: 'ร', thShift: 'ณ', finger: 7 },
        { code: 'KeyO', en: 'o', enShift: 'O', th: 'น', thShift: 'ฯ', finger: 8 },
        { code: 'KeyP', en: 'p', enShift: 'P', th: 'ย', thShift: 'ญ', finger: 9 },
        { code: 'BracketLeft', en: '[', enShift: '{', th: 'บ', thShift: 'ฐ', finger: 9 },
        { code: 'BracketRight', en: ']', enShift: '}', th: 'ล', thShift: ',', finger: 9 },
        { code: 'Backslash', en: '\\', enShift: '|', th: 'ฃ', thShift: 'ฅ', finger: 9 }
    ],
    [
        { code: 'CapsLock', en: 'Caps', th: 'Caps', styleClass: 'key-caps', finger: 1 },
        { code: 'KeyA', en: 'a', enShift: 'A', th: 'ฟ', thShift: 'ฤ', finger: 1 },
        { code: 'KeyS', en: 's', enShift: 'S', th: 'ห', thShift: 'ฆ', finger: 2 },
        { code: 'KeyD', en: 'd', enShift: 'D', th: 'ก', thShift: 'ฏ', finger: 3 },
        { code: 'KeyF', en: 'f', enShift: 'F', th: 'ด', thShift: 'โ', finger: 4 },
        { code: 'KeyG', en: 'g', enShift: 'G', th: 'เ', thShift: 'ฌ', finger: 4 },
        { code: 'KeyH', en: 'h', enShift: 'H', th: '้', thShift: '็', finger: 6 },
        { code: 'KeyJ', en: 'j', enShift: 'J', th: '่', thShift: '๋', finger: 6 },
        { code: 'KeyK', en: 'k', enShift: 'K', th: 'า', thShift: 'ษ', finger: 7 },
        { code: 'KeyL', en: 'l', enShift: 'L', th: 'ส', thShift: 'ศ', finger: 8 },
        { code: 'Semicolon', en: ';', enShift: ':', th: 'ว', thShift: 'ซ', finger: 9 },
        { code: 'Quote', en: "'", enShift: '"', th: 'ง', thShift: '.', finger: 9 },
        { code: 'Enter', en: 'Enter', th: 'Enter', styleClass: 'key-enter', finger: 9 }
    ],
    [
        { code: 'ShiftLeft', en: 'Shift', th: 'Shift', styleClass: 'key-shift', finger: 1 },
        { code: 'KeyZ', en: 'z', enShift: 'Z', th: 'ผ', thShift: '(', finger: 1 },
        { code: 'KeyX', en: 'x', enShift: 'X', th: 'ป', thShift: ')', finger: 2 },
        { code: 'KeyC', en: 'c', enShift: 'C', th: 'แ', thShift: 'ฉ', finger: 3 },
        { code: 'KeyV', en: 'v', enShift: 'V', th: 'อ', thShift: 'ฮ', finger: 4 },
        { code: 'KeyB', en: 'b', enShift: 'B', th: 'ิ', thShift: 'ฺ', finger: 4 },
        { code: 'KeyN', en: 'n', enShift: 'N', th: 'ื', thShift: '์', finger: 6 },
        { code: 'KeyM', en: 'm', enShift: 'M', th: 'ท', thShift: 'ู', finger: 6 },
        { code: 'Comma', en: ',', enShift: '<', th: 'ม', thShift: 'ฬ', finger: 7 },
        { code: 'Period', en: '.', enShift: '>', th: 'ใ', thShift: 'ฯ', finger: 8 },
        { code: 'Slash', en: '/', enShift: '?', th: 'ฝ', thShift: 'ฦ', finger: 9 },
        { code: 'ShiftRight', en: 'Shift', th: 'Shift', styleClass: 'key-shift', finger: 9 }
    ],
    [
        { code: 'Space', en: 'Space', th: 'Space', styleClass: 'key-space', finger: 5 }
    ]
];

// Flat character lookup table for instantly mapping target letters to KeyCodes and Fingers
const charToKey = {
    // English Lower
    'q': { code: 'KeyQ', finger: 1 }, 'w': { code: 'KeyW', finger: 2 }, 'e': { code: 'KeyE', finger: 3 }, 'r': { code: 'KeyR', finger: 4 },
    't': { code: 'KeyT', finger: 4 }, 'y': { code: 'KeyY', finger: 6 }, 'u': { code: 'KeyU', finger: 6 }, 'i': { code: 'KeyI', finger: 7 },
    'o': { code: 'KeyO', finger: 8 }, 'p': { code: 'KeyP', finger: 9 }, '[': { code: 'BracketLeft', finger: 9 }, ']': { code: 'BracketRight', finger: 9 },
    '\\': { code: 'Backslash', finger: 9 },
    'a': { code: 'KeyA', finger: 1 }, 's': { code: 'KeyS', finger: 2 }, 'd': { code: 'KeyD', finger: 3 }, 'f': { code: 'KeyF', finger: 4 },
    'g': { code: 'KeyG', finger: 4 }, 'h': { code: 'KeyH', finger: 6 }, 'j': { code: 'KeyJ', finger: 6 }, 'k': { code: 'KeyK', finger: 7 },
    'l': { code: 'KeyL', finger: 8 }, ';': { code: 'Semicolon', finger: 9 }, "'": { code: 'Quote', finger: 9 },
    'z': { code: 'KeyZ', finger: 1 }, 'x': { code: 'KeyX', finger: 2 }, 'c': { code: 'KeyC', finger: 3 }, 'v': { code: 'KeyV', finger: 4 },
    'b': { code: 'KeyB', finger: 4 }, 'n': { code: 'KeyN', finger: 6 }, 'm': { code: 'KeyM', finger: 6 }, ',': { code: 'Comma', finger: 7 },
    '.': { code: 'Period', finger: 8 }, '/': { code: 'Slash', finger: 9 },
    
    // English Upper
    'Q': { code: 'KeyQ', finger: 1 }, 'W': { code: 'KeyW', finger: 2 }, 'E': { code: 'KeyE', finger: 3 }, 'R': { code: 'KeyR', finger: 4 },
    'T': { code: 'KeyT', finger: 4 }, 'Y': { code: 'KeyY', finger: 6 }, 'U': { code: 'KeyU', finger: 6 }, 'I': { code: 'KeyI', finger: 7 },
    'O': { code: 'KeyO', finger: 8 }, 'P': { code: 'KeyP', finger: 9 }, '{': { code: 'BracketLeft', finger: 9 }, '}': { code: 'BracketRight', finger: 9 },
    '|': { code: 'Backslash', finger: 9 },
    'A': { code: 'KeyA', finger: 1 }, 'S': { code: 'KeyS', finger: 2 }, 'D': { code: 'KeyD', finger: 3 }, 'F': { code: 'KeyF', finger: 4 },
    'G': { code: 'KeyG', finger: 4 }, 'H': { code: 'KeyH', finger: 6 }, 'J': { code: 'KeyJ', finger: 6 }, 'K': { code: 'KeyK', finger: 7 },
    'L': { code: 'KeyL', finger: 8 }, ':': { code: 'Semicolon', finger: 9 }, '"': { code: 'Quote', finger: 9 },
    'Z': { code: 'KeyZ', finger: 1 }, 'X': { code: 'KeyX', finger: 2 }, 'C': { code: 'KeyC', finger: 3 }, 'V': { code: 'KeyV', finger: 4 },
    'B': { code: 'KeyB', finger: 4 }, 'N': { code: 'KeyN', finger: 6 }, 'M': { code: 'KeyM', finger: 6 }, '<': { code: 'Comma', finger: 7 },
    '>': { code: 'Period', finger: 8 }, '?': { code: 'Slash', finger: 9 },

    // Digits & Symbols
    '1': { code: 'Digit1', finger: 1 }, '2': { code: 'Digit2', finger: 2 }, '3': { code: 'Digit3', finger: 3 }, '4': { code: 'Digit4', finger: 4 },
    '5': { code: 'Digit5', finger: 4 }, '6': { code: 'Digit6', finger: 6 }, '7': { code: 'Digit7', finger: 6 }, '8': { code: 'Digit8', finger: 7 },
    '9': { code: 'Digit9', finger: 8 }, '0': { code: 'Digit0', finger: 9 }, '-': { code: 'Minus', finger: 9 }, '=': { code: 'Equal', finger: 9 },
    '!': { code: 'Digit1', finger: 1 }, '@': { code: 'Digit2', finger: 2 }, '#': { code: 'Digit3', finger: 3 }, '$': { code: 'Digit4', finger: 4 },
    '%': { code: 'Digit5', finger: 4 }, '^': { code: 'Digit6', finger: 6 }, '&': { code: 'Digit7', finger: 6 }, '*': { code: 'Digit8', finger: 7 },
    '(': { code: 'Digit9', finger: 8 }, ')': { code: 'Digit0', finger: 9 }, '_': { code: 'Minus', finger: 9 }, '+': { code: 'Equal', finger: 9 },
    ' ': { code: 'Space', finger: 5 },

    // Thai Kedmanee normal (lowercase equivalents)
    'ๅ': { code: 'Digit1', finger: 1 }, '/': { code: 'Digit2', finger: 2 }, '_': { code: 'Digit3', finger: 3 }, 'ภ': { code: 'Digit4', finger: 4 },
    'ถ': { code: 'Digit5', finger: 4 }, 'ุ': { code: 'Digit6', finger: 6 }, 'ึ': { code: 'Digit7', finger: 6 }, 'ค': { code: 'Digit8', finger: 7 },
    'ต': { code: 'Digit9', finger: 8 }, 'จ': { code: 'Digit0', finger: 9 }, 'ข': { code: 'Minus', finger: 9 }, 'ช': { code: 'Equal', finger: 9 },
    'ๆ': { code: 'KeyQ', finger: 1 }, 'ไ': { code: 'KeyW', finger: 2 }, 'ำ': { code: 'KeyE', finger: 3 }, 'พ': { code: 'KeyR', finger: 4 },
    'ะ': { code: 'KeyT', finger: 4 }, 'ั': { code: 'KeyY', finger: 6 }, 'ี': { code: 'KeyU', finger: 6 }, 'ร': { code: 'KeyI', finger: 7 },
    'น': { code: 'KeyO', finger: 8 }, 'ย': { code: 'KeyP', finger: 9 }, 'บ': { code: 'BracketLeft', finger: 9 }, 'ล': { code: 'BracketRight', finger: 9 },
    'ฃ': { code: 'Backslash', finger: 9 },
    'ฟ': { code: 'KeyA', finger: 1 }, 'ห': { code: 'KeyS', finger: 2 }, 'ก': { code: 'KeyD', finger: 3 }, 'ด': { code: 'KeyF', finger: 4 },
    'เ': { code: 'KeyG', finger: 4 }, '้': { code: 'KeyH', finger: 6 }, '่': { code: 'KeyJ', finger: 6 }, 'า': { code: 'KeyK', finger: 7 },
    'ส': { code: 'KeyL', finger: 8 }, 'ว': { code: 'Semicolon', finger: 9 }, 'ง': { code: 'Quote', finger: 9 },
    'ผ': { code: 'KeyZ', finger: 1 }, 'ป': { code: 'KeyX', finger: 2 }, 'แ': { code: 'KeyC', finger: 3 }, 'อ': { code: 'KeyV', finger: 4 },
    'ิ': { code: 'KeyB', finger: 4 }, 'ิ': { code: 'KeyB', finger: 4 }, 'ื': { code: 'KeyN', finger: 6 }, 'ท': { code: 'KeyM', finger: 6 }, 
    'ม': { code: 'Comma', finger: 7 }, 'ใ': { code: 'Period', finger: 8 }, 'ฝ': { code: 'Slash', finger: 9 },
    
    // Thai Kedmanee Shifted (uppercase equivalents)
    '+': { code: 'Digit1', finger: 1 }, '๑': { code: 'Digit2', finger: 2 }, '๒': { code: 'Digit3', finger: 3 }, '๓': { code: 'Digit4', finger: 4 },
    '๔': { code: 'Digit5', finger: 4 }, 'ู': { code: 'Digit6', finger: 6 }, '฿': { code: 'Digit7', finger: 6 }, '๕': { code: 'Digit8', finger: 7 },
    '๖': { code: 'Digit9', finger: 8 }, '๗': { code: 'Digit0', finger: 9 }, '๘': { code: 'Minus', finger: 9 }, '๙': { code: 'Equal', finger: 9 },
    '๐': { code: 'KeyQ', finger: 1 }, 'ฎ': { code: 'KeyE', finger: 3 }, 'ฑ': { code: 'KeyR', finger: 4 }, 'ธ': { code: 'KeyT', finger: 4 }, 
    '๊': { code: 'KeyY', finger: 6 }, 'ณ': { code: 'KeyI', finger: 7 }, 'ฯ': { code: 'KeyO', finger: 8 }, 'ญ': { code: 'KeyP', finger: 9 }, 
    'ฐ': { code: 'BracketLeft', finger: 9 }, ',': { code: 'BracketRight', finger: 9 }, 'ฅ': { code: 'Backslash', finger: 9 },
    'ฤ': { code: 'KeyA', finger: 1 }, 'ฆ': { code: 'KeyS', finger: 2 }, 'ฏ': { code: 'KeyD', finger: 3 }, 'โ': { code: 'KeyF', finger: 4 }, 
    'ฌ': { code: 'KeyG', finger: 4 }, '็': { code: 'KeyH', finger: 6 }, '๋': { code: 'KeyJ', finger: 6 }, 'ษ': { code: 'KeyK', finger: 7 }, 
    'ศ': { code: 'KeyL', finger: 8 }, 'ซ': { code: 'Semicolon', finger: 9 }, '.': { code: 'Quote', finger: 9 },
    '(': { code: 'KeyZ', finger: 1 }, ')': { code: 'KeyX', finger: 2 }, 'ฉ': { code: 'KeyC', finger: 3 }, 'ฮ': { code: 'KeyV', finger: 4 },
    'ฺ': { code: 'KeyB', finger: 4 }, '์': { code: 'KeyN', finger: 6 }, 'ู': { code: 'KeyM', finger: 6 }, 'ฬ': { code: 'Comma', finger: 7 },
    'ฯ': { code: 'Period', finger: 8 }, 'ฦ': { code: 'Slash', finger: 9 }
};

// Finger Display text map
const fingerNames = {
    1: 'นิ้วก้อยซ้าย 👈',
    2: 'นิ้วนางซ้าย 👈',
    3: 'นิ้วกลางซ้าย 👈',
    4: 'นิ้วชี้ซ้าย 👈',
    5: 'นิ้วหัวแม่มือ (Spacebar) 👍',
    6: 'นิ้วชี้ขวา 👉',
    7: 'นิ้วกลางขวา 👉',
    8: 'นิ้วนางขวา 👉',
    9: 'นิ้วก้อยขวา 👉'
};

// 2. RETRO SOUND EFFECTS GENERATOR (Web Audio API)
const SoundSynth = {
    ctx: null,
    muted: false,
    
    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },
    
    playTone(freq, type, duration, gainStart = 0.1) {
        if (this.muted || !this.ctx) return;
        
        try {
            const osc = this.ctx.createOscillator();
            const gainNode = this.ctx.createGain();
            
            osc.connect(gainNode);
            gainNode.connect(this.ctx.destination);
            
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            osc.type = type;
            
            gainNode.gain.setValueAtTime(gainStart, this.ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
            
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
            console.warn("Audio node creation failed", e);
        }
    },
    
    playClick() {
        this.playTone(600, 'sine', 0.05, 0.12);
    },
    
    playSuccess() {
        this.playTone(587.33, 'triangle', 0.08, 0.15); // D5
        setTimeout(() => this.playTone(880, 'sine', 0.12, 0.12), 60); // A5
    },
    
    playFail() {
        this.playTone(150, 'sawtooth', 0.22, 0.2);
    },
    
    playCombo(combo) {
        const pitchMultiplier = Math.min(combo, 15);
        const freq = 440 + (pitchMultiplier * 45); // Pitch grows as combo multiplies!
        this.playTone(freq, 'sine', 0.1, 0.15);
    },
    
    playLaser() {
        if (this.muted || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gainNode = this.ctx.createGain();
            osc.connect(gainNode);
            gainNode.connect(this.ctx.destination);
            
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(900, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.22);
            
            gainNode.gain.setValueAtTime(0.08, this.ctx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.22);
            
            osc.start();
            osc.stop(this.ctx.currentTime + 0.22);
        } catch (e) {}
    },
    
    playExplosion() {
        if (this.muted || !this.ctx) return;
        try {
            const bufferSize = this.ctx.sampleRate * 0.35;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            
            const noiseNode = this.ctx.createBufferSource();
            noiseNode.buffer = buffer;
            
            const gainNode = this.ctx.createGain();
            gainNode.gain.setValueAtTime(0.18, this.ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);
            
            const filterNode = this.ctx.createBiquadFilter();
            filterNode.type = 'lowpass';
            filterNode.frequency.setValueAtTime(500, this.ctx.currentTime);
            filterNode.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.35);
            
            noiseNode.connect(filterNode);
            filterNode.connect(gainNode);
            gainNode.connect(this.ctx.destination);
            
            noiseNode.start();
        } catch (e) {}
    },
    
    playVictory() {
        if (this.muted || !this.ctx) return;
        const melody = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50];
        melody.forEach((freq, idx) => {
            setTimeout(() => {
                this.playTone(freq, 'triangle', 0.2, 0.15);
            }, idx * 100);
        });
    }
};

// 3. DEFAULT WORD AND SENTENCE LIBRARIES
const defaultVocab = {
    th: {
        easy: ['ฟ', 'ห', 'ก', 'ด', 'เ', '้', '่', 'า', 'ส', 'ว', 'ง'],
        words: [
            'บ้าน', 'โรงเรียน', 'คุณครู', 'คอมพิวเตอร์', 'นักเรียน', 'หนังสือ', 'สมุด', 'ปากกา', 'กระดาน', 'เล่นเกม',
            'ฝึกฝน', 'พิมพ์ดีด', 'ครูตู่', 'อำเภอเวียงสา', 'จังหวัดน่าน', 'โรงเรียนสา', 'เรียนสนุก', 'เพื่อนรัก', 'วิชาการ', 'ห้องสมุด',
            'ครูจินต์ชัญญา อิทธิประเวศน์', 'bit.ly/krujinsa', 'saschool', 'saschool1234', '@saschool.ac.th'
        ],
        sentences: [
            'โรงเรียนสา ตั้งอยู่ในอำเภอเวียงสา จังหวัดน่าน',
            'ครูจินต์ชัญญา อิทธิประเวศน์ สอนวิชาคอมพิวเตอร์อย่างตั้งใจ',
            'การฝึกพิมพ์สัมผัสทุกวันช่วยให้เราพิมพ์เร็วและคล่องตัวขึ้น',
            'พวกเรานักเรียนชั้นมัธยมศึกษาปีที่หนึ่งทุกคนรักการเรียนรู้',
            'ความสามัคคีและมิตรภาพในห้องเรียนทำให้การเรียนมีความสุขยิ่งขึ้น'
        ]
    },
    en: {
        easy: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
        words: [
            'cat', 'dog', 'sun', 'run', 'fun', 'sky', 'star', 'moon', 'school', 'teacher',
            'student', 'book', 'paper', 'desk', 'pencil', 'happy', 'smile', 'space', 'typing', 'game',
            'bit.ly/krujinsa', 'saschool', 'saschool1234', '@saschool.ac.th', 'nan'
        ],
        sentences: [
            'Practice makes perfect when learning how to type.',
            'Sa School is a beautiful high school located in Nan province.',
            'We love computer science and typing games in our classroom.',
            'Please visit bit.ly/krujinsa for your computer lessons.',
            'Always use standard home row keys to type faster without looking.'
        ]
    }
};

// 4. GAME STATE VARIABLES
let gameState = {
    username: '',
    avatar: '🧑‍🚀',
    currentLanguage: 'th', // 'th' or 'en'
    currentMode: 1, // 1: Key Finder, 2: Word, 3: Tournament, 4: Boss
    score: 0,
    combo: 0,
    maxCombo: 0,
    totalKeystrokes: 0,
    correctKeystrokes: 0,
    secondsLeft: 60,
    timerInterval: null,
    
    // Key Finder Mode
    targetChar: '',
    
    // Word/Tournament Mode
    wordQueue: [],
    currentWordIndex: 0,
    currentCharIndex: 0,
    wordsTypedCount: 0,
    
    // Boss Challenge Mode
    bossHpMax: 100,
    bossHp: 100,
    bossSentenceQueue: [],
    bossSentenceActive: '',
    bossTimerInterval: null,
    bossTimeLimit: 20, // seconds per sentence
    bossTimeLeft: 20
};

// 5. INITIALIZATION & ELEMENT REGISTRY
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    renderVirtualKeyboard();
    setupEventListeners();
    loadLeaderboard();
    loadCustomVocab();
    MarioRelaxGame.init();
    syncScoresWithCloud(); // ดึงคะแนนล่าสุดจาก Google Sheets (ถ้าเปิดใช้งาน)
}

// 6. EVENT LISTENERS SETUP
function setupEventListeners() {
    // Sound FX Toggle
    const soundBtn = document.getElementById('sound-toggle-btn');
    soundBtn.addEventListener('click', () => {
        SoundSynth.muted = !SoundSynth.muted;
        document.getElementById('sound-icon').textContent = SoundSynth.muted ? '🔇' : '🔊';
        SoundSynth.playClick();
    });

    // Teacher Panel Toggle
    const teacherBtn = document.getElementById('teacher-mode-btn');
    const closeTeacherBtn = document.getElementById('close-teacher-btn');
    const teacherModal = document.getElementById('teacher-modal');
    
    teacherBtn.addEventListener('click', () => {
        SoundSynth.playClick();
        SoundSynth.init();
        teacherModal.classList.add('active');
        document.getElementById('teacher-auth-zone').classList.remove('hidden');
        document.getElementById('teacher-panel-zone').classList.add('hidden');
        document.getElementById('teacher-password').value = '';
    });
    
    closeTeacherBtn.addEventListener('click', () => {
        SoundSynth.playClick();
        teacherModal.classList.remove('active');
    });

    // Teacher Login Bypasses/Verifications
    document.getElementById('teacher-login-btn').addEventListener('click', verifyTeacherPassword);
    document.getElementById('teacher-bypass-btn').addEventListener('click', () => {
        SoundSynth.playClick();
        enterTeacherPanel();
    });
    
    document.getElementById('teacher-password').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') verifyTeacherPassword();
    });

    // Avatar Selection Toggle
    const avatars = document.querySelectorAll('.avatar-option');
    avatars.forEach(el => {
        el.addEventListener('click', () => {
            avatars.forEach(x => x.classList.remove('active'));
            el.classList.add('active');
            gameState.avatar = el.getAttribute('data-avatar');
            SoundSynth.playClick();
        });
    });

    // Player Registration Submit
    document.getElementById('start-game-btn').addEventListener('click', registerPlayer);
    document.getElementById('register-form').addEventListener('submit', (e) => {
        e.preventDefault();
        registerPlayer();
    });

    // Lobby Screen: Choosing Game Modes
    const modeCards = document.querySelectorAll('.mode-card');
    modeCards.forEach(card => {
        card.addEventListener('click', () => {
            const mode = parseInt(card.getAttribute('data-mode'));
            launchGameMode(mode);
        });
    });

    // Quit active gameplay
    document.getElementById('quit-game-btn').addEventListener('click', quitGameplay);

    // Gameplay Screen: Language Toggles
    const thBtn = document.getElementById('lang-th-btn');
    const enBtn = document.getElementById('lang-en-btn');
    
    thBtn.addEventListener('click', () => {
        if (gameState.currentLanguage !== 'th') {
            gameState.currentLanguage = 'th';
            thBtn.classList.add('active');
            enBtn.classList.remove('active');
            SoundSynth.playClick();
            resetActiveMode();
        }
    });

    // Result screen Mario Jump button
    document.getElementById('result-mario-btn').addEventListener('click', () => {
        SoundSynth.playClick();
        launchGameMode(5);
    });

    enBtn.addEventListener('click', () => {
        if (gameState.currentLanguage !== 'en') {
            gameState.currentLanguage = 'en';
            enBtn.classList.add('active');
            thBtn.classList.remove('active');
            SoundSynth.playClick();
            resetActiveMode();
        }
    });

    // Leaderboard Screen Toggle from Lobby
    document.getElementById('view-leaderboard-btn').addEventListener('click', () => {
        SoundSynth.playClick();
        showScreen('leaderboard-screen');
    });
    document.getElementById('close-leaderboard-btn').addEventListener('click', () => {
        SoundSynth.playClick();
        updateLobbyStats();
        showScreen('lobby-screen');
    });

    // Result Screen Controls
    document.getElementById('result-retry-btn').addEventListener('click', () => {
        SoundSynth.playClick();
        launchGameMode(gameState.currentMode);
    });
    document.getElementById('result-lobby-btn').addEventListener('click', () => {
        SoundSynth.playClick();
        updateLobbyStats();
        showScreen('lobby-screen');
    });

    // Teacher Panel Tabs
    document.getElementById('tab-scores-btn').addEventListener('click', () => {
        switchTeacherTab('scores');
    });
    document.getElementById('tab-vocab-btn').addEventListener('click', () => {
        switchTeacherTab('vocab');
    });

    // Teacher controls
    document.getElementById('export-excel-btn').addEventListener('click', exportScoresToCSV);
    document.getElementById('reset-scores-btn').addEventListener('click', clearAllScores);
    document.getElementById('add-vocab-btn').addEventListener('click', addNewVocabItem);

    // Physical Keyboard Press Event Listener
    window.addEventListener('keydown', handlePhysicalKeystroke);
}

// 7. MULTI-SCREEN NAVIGATION UTILITY
function showScreen(screenId) {
    const screens = ['start-screen', 'lobby-screen', 'gameplay-screen', 'leaderboard-screen', 'result-screen'];
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (id === screenId) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
}

// 8. REGISTRATION & LOGIN
function registerPlayer() {
    const nameInput = document.getElementById('student-name').value.trim();
    if (!nameInput) return;
    
    gameState.username = nameInput;
    SoundSynth.init(); // Initialize Web Audio Context on explicit user interaction
    SoundSynth.playSuccess();
    
    // Update Lobby Visuals
    document.getElementById('lobby-avatar').textContent = gameState.avatar;
    document.getElementById('lobby-username').textContent = gameState.username;
    
    // Update player scores
    updateLobbyStats();
    
    syncScoresWithCloud(); // ดึงคะแนนล่าสุดข้ามเครื่องแบบเรียลไทม์เพื่ออัปเดตสถิติ
    showScreen('lobby-screen');
}

// ฟังก์ชันสำหรับอัปเดตคะแนนสะสมและ WPM สูงสุดในหน้า Lobby ของนักเรียนแต่ละคนให้เป็นปัจจุบันเสมอ
function updateLobbyStats() {
    if (!gameState.username) return;
    const history = getScoresHistory();
    const studentRecords = history.filter(r => r.name === gameState.username);
    if (studentRecords.length > 0) {
        const totalScore = studentRecords.reduce((sum, r) => sum + r.score, 0);
        const maxWpm = Math.max(...studentRecords.map(r => r.wpm));
        document.getElementById('player-total-score').textContent = totalScore;
        document.getElementById('player-max-wpm').textContent = Math.round(maxWpm);
    } else {
        document.getElementById('player-total-score').textContent = 0;
        document.getElementById('player-max-wpm').textContent = 0;
    }
}

// 9. TEACHER PANEL AUTHENTICATION & TABS
function verifyTeacherPassword() {
    const pass = document.getElementById('teacher-password').value.trim();
    if (pass === 'krujinsa' || pass === 'admin123') {
        SoundSynth.playSuccess();
        enterTeacherPanel();
    } else {
        SoundSynth.playFail();
        alert('❌ รหัสผ่านไม่ถูกต้อง! กรุณาลองใหม่อีกครั้ง');
    }
}

function enterTeacherPanel() {
    document.getElementById('teacher-auth-zone').classList.add('hidden');
    document.getElementById('teacher-panel-zone').classList.remove('hidden');
    switchTeacherTab('scores');
    populateTeacherScores();
    populateVocabLists();
}

function switchTeacherTab(tabName) {
    SoundSynth.playClick();
    const scoresBtn = document.getElementById('tab-scores-btn');
    const vocabBtn = document.getElementById('tab-vocab-btn');
    const scoresContent = document.getElementById('tab-scores-content');
    const vocabContent = document.getElementById('tab-vocab-content');
    
    if (tabName === 'scores') {
        scoresBtn.classList.add('active');
        vocabBtn.classList.remove('active');
        scoresContent.classList.add('active');
        vocabContent.classList.remove('active');
        populateTeacherScores();
    } else {
        vocabBtn.classList.add('active');
        scoresBtn.classList.remove('active');
        vocabContent.classList.add('active');
        scoresContent.classList.remove('active');
        populateVocabLists();
    }
}

// 10. GAMEPLAY LAUNCHER
function launchGameMode(mode) {
    gameState.currentMode = mode;
    gameState.score = 0;
    gameState.combo = 0;
    gameState.maxCombo = 0;
    gameState.totalKeystrokes = 0;
    gameState.correctKeystrokes = 0;
    gameState.secondsLeft = mode === 1 ? 45 : 60; // 45s for easy, 60s for words
    
    SoundSynth.playSuccess();
    showScreen('gameplay-screen');
    
    // Configure HUD Mode Label
    const modeTitles = {
        1: 'โหมด: ⌨️ ฝึกหาปุ่ม',
        2: 'โหมด: 📝 พิมพ์คำหรรษา',
        3: 'โหมด: 🏆 แข่งขันจัดอันดับ',
        4: 'โหมด: 👾 ศึกชิงแชมป์ปะทะบอส',
        5: 'โหมด: 🎮 พักผ่อนเก็บเหรียญ'
    };
    document.getElementById('game-mode-title').textContent = modeTitles[mode];
    
    // Hide all view panes inside gameplay
    document.getElementById('key-finder-arena').style.display = 'none';
    document.getElementById('word-typing-arena').style.display = 'none';
    document.getElementById('boss-challenge-arena').style.display = 'none';
    document.getElementById('mario-relax-arena').style.display = 'none';
    
    // Show keyboard container by default, but hide it in Mario mode to maximize canvas space
    if (mode === 5) {
        document.querySelector('.keyboard-container').style.display = 'none';
        document.querySelector('.timer-stat').style.display = 'none'; // hide timer in endless relax
    } else {
        document.querySelector('.keyboard-container').style.display = 'block';
        document.querySelector('.timer-stat').style.display = 'block';
    }
    
    // Configure specific gameplay setup
    resetActiveMode();
    initSidebarStats(); // Initialize room leaderboard and player telemetry
    if (mode !== 5) {
        startHUDTimer();
    }
}

function resetActiveMode() {
    clearInterval(gameState.timerInterval);
    clearInterval(gameState.bossTimerInterval);
    MarioRelaxGame.stop(); // Always stop Mario engine loop when shifting modes
    
    // Reset stats
    gameState.score = 0;
    gameState.combo = 0;
    gameState.totalKeystrokes = 0;
    gameState.correctKeystrokes = 0;
    
    updateHUDStats();
    
    // Mode arenas configurations
    if (gameState.currentMode === 1) {
        document.getElementById('key-finder-arena').style.display = 'flex';
        setupKeyFinderRound();
    } else if (gameState.currentMode === 2 || gameState.currentMode === 3) {
        document.getElementById('word-typing-arena').style.display = 'flex';
        setupWordTypingRound();
    } else if (gameState.currentMode === 4) {
        document.getElementById('boss-challenge-arena').style.display = 'flex';
        setupBossChallengeRound();
    } else if (gameState.currentMode === 5) {
        document.getElementById('mario-relax-arena').style.display = 'flex';
        MarioRelaxGame.start();
    }
}

function quitGameplay() {
    SoundSynth.playClick();
    clearInterval(gameState.timerInterval);
    clearInterval(gameState.bossTimerInterval);
    MarioRelaxGame.stop();
    clearKeyboardHighlights();
    updateLobbyStats();
    showScreen('lobby-screen');
}

// 11. KEY FINDER MODE LOGIC
function setupKeyFinderRound() {
    clearKeyboardHighlights();
    
    // Pick set of keys
    const lang = gameState.currentLanguage;
    const pool = defaultVocab[lang].easy;
    const randomIndex = Math.floor(Math.random() * pool.length);
    gameState.targetChar = pool[randomIndex];
    
    // Render Target Char
    const displayEl = document.getElementById('target-key-char');
    displayEl.textContent = gameState.targetChar.toUpperCase();
    
    // Trigger bounce animation
    displayEl.classList.remove('letter-pop');
    void displayEl.offsetWidth; // Trigger reflow
    displayEl.classList.add('letter-pop');
    
    // Fetch keyboard map item to highlight visual on keyboard
    const mapItem = charToKey[gameState.targetChar];
    if (mapItem) {
        const keycap = document.getElementById(`key-${mapItem.code}`);
        if (keycap) keycap.classList.add('key-target');
        
        // Show finger guides
        document.getElementById('finger-guide-text').textContent = fingerNames[mapItem.finger];
    } else {
        document.getElementById('finger-guide-text').textContent = '-';
    }
}

// 12. WORD TYPING & TOURNAMENT MODE LOGIC
function setupWordTypingRound() {
    // Generate word queues
    const lang = gameState.currentLanguage;
    const customList = getCustomVocabList(lang);
    const defaultList = defaultVocab[lang].words;
    const mergedList = [...defaultList, ...customList];
    
    // Shuffle words
    gameState.wordQueue = shuffleArray(mergedList).slice(0, 30);
    gameState.currentWordIndex = 0;
    gameState.currentCharIndex = 0;
    
    renderWordPreviews();
    renderActiveWord();
}

function renderWordPreviews() {
    const previewContainer = document.getElementById('word-preview-list');
    previewContainer.innerHTML = '';
    
    const startIdx = gameState.currentWordIndex + 1;
    const endIdx = Math.min(startIdx + 5, gameState.wordQueue.length);
    
    for (let i = startIdx; i < endIdx; i++) {
        const span = document.createElement('span');
        span.textContent = gameState.wordQueue[i];
        previewContainer.appendChild(span);
    }
}

function renderActiveWord() {
    const displayContainer = document.getElementById('current-word-display');
    displayContainer.innerHTML = '';
    
    const word = gameState.wordQueue[gameState.currentWordIndex] || 'จบด่าน';
    
    // Map individual characters to colorized spans
    for (let i = 0; i < word.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.textContent = word[i];
        
        if (i < gameState.currentCharIndex) {
            charSpan.className = 'char-correct';
        } else if (i === gameState.currentCharIndex) {
            charSpan.className = 'char-current';
            
            // Highlight this target character on keyboard
            clearKeyboardHighlights();
            const targetChar = word[i];
            const mapItem = charToKey[targetChar];
            if (mapItem) {
                const keycap = document.getElementById(`key-${mapItem.code}`);
                if (keycap) keycap.classList.add('key-target');
            }
        }
        
        displayContainer.appendChild(charSpan);
    }
}

// 13. BOSS CHALLENGE MODE LOGIC
function setupBossChallengeRound() {
    // Reset boss HP
    gameState.bossHp = gameState.bossHpMax;
    updateBossHpBar();
    
    // Load sentences
    const lang = gameState.currentLanguage;
    gameState.bossSentenceQueue = shuffleArray(defaultVocab[lang].sentences);
    gameState.currentWordIndex = 0;
    
    loadNextBossSentence();
}

function loadNextBossSentence() {
    if (gameState.currentWordIndex >= gameState.bossSentenceQueue.length) {
        // Reshuffle sentences if ran out
        const lang = gameState.currentLanguage;
        gameState.bossSentenceQueue = shuffleArray(defaultVocab[lang].sentences);
        gameState.currentWordIndex = 0;
    }
    
    gameState.bossSentenceActive = gameState.bossSentenceQueue[gameState.currentWordIndex];
    gameState.currentCharIndex = 0;
    gameState.bossTimeLeft = gameState.bossTimeLimit;
    
    renderBossSentence();
    startBossAttackTimer();
}

function renderBossSentence() {
    const displayContainer = document.getElementById('boss-sentence-display');
    displayContainer.innerHTML = '';
    
    const sentence = gameState.bossSentenceActive;
    
    for (let i = 0; i < sentence.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.textContent = sentence[i];
        
        if (i < gameState.currentCharIndex) {
            charSpan.className = 'char-correct';
        } else if (i === gameState.currentCharIndex) {
            charSpan.className = 'char-current';
            
            // Highlight on physical board
            clearKeyboardHighlights();
            const targetChar = sentence[i];
            const mapItem = charToKey[targetChar];
            if (mapItem) {
                const keycap = document.getElementById(`key-${mapItem.code}`);
                if (keycap) keycap.classList.add('key-target');
            }
        }
        
        displayContainer.appendChild(charSpan);
    }
}

function updateBossHpBar() {
    const pct = Math.max(0, (gameState.bossHp / gameState.bossHpMax) * 100);
    const hpBar = document.getElementById('boss-hp-bar');
    const hpText = document.getElementById('boss-hp-text');
    
    hpBar.style.width = `${pct}%`;
    hpText.textContent = `${gameState.bossHp} / ${gameState.bossHpMax} HP`;
    
    // Change boss sprite mood depending on HP
    const bossChar = document.getElementById('boss-character');
    if (gameState.bossHp <= 0) {
        bossChar.textContent = '💀💥';
    } else if (gameState.bossHp < 35) {
        bossChar.textContent = '👿🔥';
    } else if (gameState.bossHp < 70) {
        bossChar.textContent = '😡';
    } else {
        bossChar.textContent = '👾';
    }
}

function startBossAttackTimer() {
    clearInterval(gameState.bossTimerInterval);
    const fillBar = document.getElementById('boss-sentence-time-fill');
    
    gameState.bossTimerInterval = setInterval(() => {
        gameState.bossTimeLeft -= 0.1;
        const pct = (gameState.bossTimeLeft / gameState.bossTimeLimit) * 100;
        fillBar.style.width = `${Math.max(0, pct)}%`;
        
        if (gameState.bossTimeLeft <= 0) {
            // Boss attacks!
            clearInterval(gameState.bossTimerInterval);
            triggerBossCounterAttack();
        }
    }, 100);
}

function triggerBossCounterAttack() {
    SoundSynth.playFail();
    
    // Shake gameplay view
    const arena = document.getElementById('gameplay-arena');
    arena.classList.add('char-incorrect');
    setTimeout(() => arena.classList.remove('char-incorrect'), 400);
    
    // Deduct player's main timer by 5 seconds as penalty!
    gameState.secondsLeft = Math.max(0, gameState.secondsLeft - 5);
    gameState.combo = 0;
    updateHUDStats();
    
    // Reload a new sentence to keep flowing
    gameState.currentWordIndex++;
    loadNextBossSentence();
}

function triggerHeroAttackFX() {
    SoundSynth.playLaser();
    
    // Spawn Laser Beam
    const fxLayer = document.getElementById('fx-layer');
    const laser = document.createElement('div');
    laser.className = 'laser-beam';
    fxLayer.appendChild(laser);
    
    // Remove after anim
    setTimeout(() => {
        laser.remove();
        
        // Flash boss
        const bossChar = document.getElementById('boss-character');
        bossChar.classList.add('boss-hit');
        SoundSynth.playClick();
        
        setTimeout(() => bossChar.classList.remove('boss-hit'), 150);
        
        // Deduct Boss HP
        gameState.bossHp = Math.max(0, gameState.bossHp - 1);
        updateBossHpBar();
        
        // Check Victory
        if (gameState.bossHp <= 0) {
            triggerBossDefeat();
        }
    }, 400);
}

function triggerBossDefeat() {
    clearInterval(gameState.bossTimerInterval);
    clearInterval(gameState.timerInterval);
    SoundSynth.playVictory();
    
    // Super boom explosion particles
    SoundSynth.playExplosion();
    spawnExplosionParticles(35);
    
    // Add heavy score reward
    gameState.score += 500;
    updateHUDStats();
    
    setTimeout(() => {
        finishGameplaySession(true); // Game complete victory!
    }, 1200);
}

function spawnExplosionParticles(count) {
    const fxLayer = document.getElementById('fx-layer');
    const bossEl = document.getElementById('boss-character');
    const rect = bossEl.getBoundingClientRect();
    const containerRect = fxLayer.getBoundingClientRect();
    
    const bossCenterX = rect.left - containerRect.left + (rect.width / 2);
    const bossCenterY = rect.top - containerRect.top + (rect.height / 2);
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle-boom';
        
        const angle = Math.random() * Math.PI * 2;
        const speed = 50 + Math.random() * 150;
        const tx = Math.cos(angle) * speed;
        const ty = Math.sin(angle) * speed;
        
        particle.style.left = `${bossCenterX}px`;
        particle.style.top = `${bossCenterY}px`;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        fxLayer.appendChild(particle);
        setTimeout(() => particle.remove(), 500);
    }
}

// 14. KEYSTROKE CAPTURING & INTERPRETATION (CORE LOGIC)
function handlePhysicalKeystroke(e) {
    // Avoid checking when dialog modal is open or start screen is active
    if (document.getElementById('teacher-modal').classList.contains('active')) return;
    if (document.getElementById('start-screen').classList.contains('active')) return;
    if (!document.getElementById('gameplay-screen').classList.contains('active')) return;
    
    // Prevent default browser behaviors such as scroll or backspace navigation
    if (e.key === 'Backspace' || e.key === ' ') {
        e.preventDefault();
    }
    
    // Mario Relax Mode spacebar jump override
    if (gameState.currentMode === 5) {
        if (e.key === ' ') {
            MarioRelaxGame.jump();
        }
        return;
    }
    
    const pressedKey = e.key;
    const pressedCode = e.code;
    
    // Highlight physical keycap pressed on UI visual
    const keycap = document.getElementById(`key-${pressedCode}`);
    if (keycap) {
        keycap.classList.add('key-pressed');
        setTimeout(() => keycap.classList.remove('key-pressed'), 120);
    }
    
    // 1. KEY FINDER MODE HANDLER
    if (gameState.currentMode === 1) {
        gameState.totalKeystrokes++;
        
        const target = gameState.targetChar;
        const mapItem = charToKey[target];
        
        // CROSS-LAYOUT ASSISTANCE FEATURE:
        // Accept correct key even if keyboard is toggled to wrong input language (Thai Kedmanee <-> English QWERTY)
        const isMatch = (pressedKey.toLowerCase() === target.toLowerCase()) || 
                        (mapItem && pressedCode === mapItem.code);
                        
        if (isMatch) {
            // Correct Keystroke
            gameState.correctKeystrokes++;
            gameState.combo++;
            if (gameState.combo > gameState.maxCombo) gameState.maxCombo = gameState.combo;
            
            gameState.score += 10 * Math.floor(1 + (gameState.combo / 8));
            SoundSynth.playCombo(gameState.combo);
            
            // Pop floating combo alert on screen
            spawnFloatingComboText(`+${10 * Math.floor(1 + (gameState.combo / 8))}`);
            
            setupKeyFinderRound();
        } else {
            // Mistake Keystroke
            gameState.combo = 0;
            gameState.score = Math.max(0, gameState.score - 5);
            SoundSynth.playFail();
            
            // Flash keyboard container error glow
            flashErrorScreen();
        }
        updateHUDStats();
    }
    
    // 2. WORD TYPING / TOURNAMENT MODE HANDLER
    else if (gameState.currentMode === 2 || gameState.currentMode === 3) {
        const activeWord = gameState.wordQueue[gameState.currentWordIndex];
        if (!activeWord) return;
        
        gameState.totalKeystrokes++;
        const targetChar = activeWord[gameState.currentCharIndex];
        const mapItem = charToKey[targetChar];
        
        const isMatch = (pressedKey === targetChar) || (mapItem && pressedCode === mapItem.code);
        
        if (isMatch) {
            // Correct key
            gameState.correctKeystrokes++;
            gameState.currentCharIndex++;
            
            // Success sound
            SoundSynth.playTone(550 + (gameState.currentCharIndex * 40), 'sine', 0.08, 0.1);
            
            if (gameState.currentCharIndex >= activeWord.length) {
                // Word completed!
                gameState.combo++;
                if (gameState.combo > gameState.maxCombo) gameState.maxCombo = gameState.combo;
                
                gameState.score += (activeWord.length * 10) * Math.floor(1 + (gameState.combo / 5));
                gameState.wordsTypedCount++;
                
                SoundSynth.playSuccess();
                spawnFloatingComboText(`COMBO x${gameState.combo}!`);
                
                gameState.currentWordIndex++;
                gameState.currentCharIndex = 0;
                
                if (gameState.currentWordIndex >= gameState.wordQueue.length) {
                    finishGameplaySession(true);
                } else {
                    renderWordPreviews();
                    renderActiveWord();
                }
            } else {
                renderActiveWord();
            }
        } else {
            // Wrong key
            gameState.combo = 0;
            gameState.score = Math.max(0, gameState.score - 5);
            SoundSynth.playFail();
            flashErrorScreen();
            renderActiveWord();
        }
        updateHUDStats();
    }
    
    // 3. BOSS CHALLENGE MODE HANDLER
    else if (gameState.currentMode === 4) {
        const activeSentence = gameState.bossSentenceActive;
        if (!activeSentence) return;
        
        gameState.totalKeystrokes++;
        const targetChar = activeSentence[gameState.currentCharIndex];
        const mapItem = charToKey[targetChar];
        
        const isMatch = (pressedKey === targetChar) || (mapItem && pressedCode === mapItem.code);
        
        if (isMatch) {
            // Correct letter
            gameState.correctKeystrokes++;
            gameState.currentCharIndex++;
            
            // Hero attacks boss immediately!
            triggerHeroAttackFX();
            
            if (gameState.currentCharIndex >= activeSentence.length) {
                // Completed full sentence
                clearInterval(gameState.bossTimerInterval);
                gameState.combo++;
                if (gameState.combo > gameState.maxCombo) gameState.maxCombo = gameState.combo;
                
                gameState.score += 150 * Math.floor(1 + (gameState.combo / 3));
                SoundSynth.playExplosion();
                spawnExplosionParticles(15);
                
                // Deal big blast damage to Boss
                gameState.bossHp = Math.max(0, gameState.bossHp - 15);
                updateBossHpBar();
                
                if (gameState.bossHp <= 0) {
                    triggerBossDefeat();
                } else {
                    gameState.currentWordIndex++;
                    loadNextBossSentence();
                }
            } else {
                renderBossSentence();
            }
        } else {
            // Mistake
            gameState.combo = 0;
            gameState.score = Math.max(0, gameState.score - 5);
            SoundSynth.playFail();
            flashErrorScreen();
            renderBossSentence();
        }
        updateHUDStats();
    }
}

// 15. VISUAL FEEDBACK EFFECTS
function clearKeyboardHighlights() {
    const keys = document.querySelectorAll('.keycap');
    keys.forEach(k => k.classList.remove('key-target'));
}

function flashErrorScreen() {
    const gameplayEl = document.getElementById('gameplay-screen');
    gameplayEl.style.boxShadow = 'inset 0 0 40px rgba(239, 68, 68, 0.4)';
    setTimeout(() => {
        gameplayEl.style.boxShadow = 'none';
    }, 150);
}

function spawnFloatingComboText(txt) {
    const arena = document.getElementById('gameplay-arena');
    const pop = document.createElement('div');
    pop.className = 'combo-popup';
    pop.textContent = txt;
    
    // Spawn at center with slight random offsets
    pop.style.left = `calc(50% + ${Math.random() * 80 - 40}px)`;
    pop.style.top = `calc(50% + ${Math.random() * 40 - 20}px)`;
    
    arena.appendChild(pop);
    setTimeout(() => pop.remove(), 800);
}

// 16. METRICS COMPUTATION (WPM & ACCURACY)
function computeAccuracy() {
    if (gameState.totalKeystrokes === 0) return 100;
    return Math.round((gameState.correctKeystrokes / gameState.totalKeystrokes) * 100);
}

function computeWPM() {
    const totalMinutes = (gameState.currentMode === 1 ? 45 - gameState.secondsLeft : 60 - gameState.secondsLeft) / 60;
    if (totalMinutes <= 0) return 0;
    
    // standard 5-character keys typed divided by time spent
    const correctCount = gameState.correctKeystrokes;
    const wpm = (correctCount / 5) / totalMinutes;
    return Math.round(wpm);
}

function updateHUDStats() {
    const acc = computeAccuracy();
    const wpm = computeWPM();
    
    document.getElementById('game-score').textContent = gameState.score;
    document.getElementById('game-combo').textContent = gameState.combo;
    document.getElementById('game-wpm').textContent = wpm;
    document.getElementById('game-accuracy').textContent = `${acc}%`;
    
    updateSidebarStandings();
}

// 17. TIMERS & HUD TICKERS
function startHUDTimer() {
    clearInterval(gameState.timerInterval);
    const timerVal = document.getElementById('game-timer');
    timerVal.textContent = `${gameState.secondsLeft}s`;
    
    gameState.timerInterval = setInterval(() => {
        gameState.secondsLeft--;
        timerVal.textContent = `${gameState.secondsLeft}s`;
        
        // Compute stats live
        updateHUDStats();
        
        if (gameState.secondsLeft <= 0) {
            clearInterval(gameState.timerInterval);
            clearInterval(gameState.bossTimerInterval);
            finishGameplaySession(false); // Time out
        }
    }, 1000);
}

// 18. GAME OVER & SAVING SCORES
function finishGameplaySession(victory = false) {
    clearKeyboardHighlights();
    
    // Load stats
    const finalAccuracy = computeAccuracy();
    const finalWpm = computeWPM();
    const finalScore = gameState.score;
    
    // Save to LocalStorage score lists
    saveScoreRecord(finalScore, finalWpm, finalAccuracy);
    updateLobbyStats();
    
    // Populate result views
    document.getElementById('res-score').textContent = finalScore;
    document.getElementById('res-wpm').textContent = finalWpm;
    document.getElementById('res-accuracy').textContent = `${finalAccuracy}%`;
    document.getElementById('res-max-combo').textContent = gameState.maxCombo;
    
    // Customize Header
    const statusText = document.getElementById('result-status-text');
    const resultMedal = document.querySelector('.victory-medal');
    
    if (gameState.currentMode === 4) {
        if (victory) {
            statusText.innerHTML = '🎉 ยอดเยี่ยม! คุณสามารถปราบ **บอสคีย์บอร์ดมอนสเตอร์** ได้สำเร็จ!';
            resultMedal.textContent = '👑🛸';
            SoundSynth.playVictory();
        } else {
            statusText.innerHTML = '💀 เวลาหมดลงก่อน! ยานบอสหลบหนีไปได้...';
            resultMedal.textContent = '👾';
            SoundSynth.playFail();
        }
    } else {
        statusText.innerHTML = '🛰️ ยอดเยี่ยม! ภารกิจฝึกพิมพ์เสร็จสมบูรณ์เรียบร้อย';
        resultMedal.textContent = '🏆';
        SoundSynth.playVictory();
    }
    
    // Render stars reward system
    renderStarRewards(finalScore, finalAccuracy);
    
    showScreen('result-screen');
    loadLeaderboard(); // refresh top 5
}

function renderStarRewards(score, acc) {
    const container = document.getElementById('star-rewards-container');
    container.innerHTML = '';
    
    let starsEarned = 1;
    if (score > 400 && acc >= 90) starsEarned = 3;
    else if (score > 150 && acc >= 75) starsEarned = 2;
    
    for (let i = 1; i <= 3; i++) {
        const star = document.createElement('span');
        star.className = 'star-item';
        star.textContent = '⭐';
        if (i <= starsEarned) {
            setTimeout(() => star.classList.add('active'), i * 150);
        }
        container.appendChild(star);
    }
}

// 19. LOCAL STORAGE SCORE TRANSACTIONS
function saveScoreRecord(score, wpm, accuracy) {
    const history = getScoresHistory();
    const modeNames = {
        1: 'ฝึกหาปุ่ม',
        2: 'พิมพ์คำหรรษา',
        3: 'แข่งขันในห้อง',
        4: 'สู้บอสเอเลี่ยน'
    };
    
    const record = {
        timestamp: new Date().toLocaleString('th-TH'),
        name: gameState.username,
        avatar: gameState.avatar,
        mode: modeNames[gameState.currentMode] || 'ฝึกพิมพ์',
        score: score,
        wpm: wpm,
        accuracy: accuracy,
        combo: gameState.maxCombo
    };
    
    history.push(record);
    localStorage.setItem('sa_typing_scores', JSON.stringify(history));
    
    // ส่งข้อมูลไปยัง Google Sheets (หากคุณครูตั้งค่าตัวแปร GOOGLE_SHEET_SYNC_URL ไว้ที่บรรทัดแรก)
    if (GOOGLE_SHEET_SYNC_URL) {
        const urlParams = new URLSearchParams({
            name: record.name,
            avatar: record.avatar,
            mode: record.mode,
            score: record.score,
            wpm: record.wpm,
            accuracy: record.accuracy,
            combo: record.combo
        });
        
        fetch(`${GOOGLE_SHEET_SYNC_URL}?${urlParams.toString()}`)
            .then(res => res.json())
            .then(data => {
                console.log("Score successfully synced with cloud Google Sheet:", data);
                syncScoresWithCloud(); // ดึงประวัติที่อัปเดตแล้วลงเครื่องทันที
            })
            .catch(err => console.warn("Google Sheets Cloud Sync transmission failed:", err));
    }
}

function getScoresHistory() {
    const raw = localStorage.getItem('sa_typing_scores');
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch(e) {
        return [];
    }
}

// 19.5 CLOUD DATA SYNCHRONIZATION (Google Sheets Real-Time Sync)
async function syncScoresWithCloud() {
    if (!GOOGLE_SHEET_SYNC_URL) return;
    try {
        const response = await fetch(GOOGLE_SHEET_SYNC_URL);
        if (response.ok) {
            const cloudScores = await response.json();
            if (Array.isArray(cloudScores) && cloudScores.length > 0) {
                // บันทึกลง LocalStorage ทับตัวแปร เพื่อให้หน้าแสดงผลต่างๆ โหลดไปใช้งานต่อได้อย่างถูกต้องราบรื่น
                localStorage.setItem('sa_typing_scores', JSON.stringify(cloudScores));
                loadLeaderboard();
                populateTeacherScores();
                if (gameState.username) {
                    initSidebarStats();
                    updateLobbyStats();
                }
            }
        }
    } catch (e) {
        console.warn("Cloud score sync failed:", e);
    }
}

// 20. POPULATING TOURNAMENT LEADERBOARDS (TOP 5 PODIUM)
function loadLeaderboard() {
    const history = getScoresHistory();
    
    // Sort highest score first
    const sorted = history.sort((a, b) => b.score - a.score);
    
    // Render podium ranks 1, 2, 3
    const p1Name = document.getElementById('podium-1-name');
    const p1Score = document.getElementById('podium-1-score');
    const p1Avatar = document.getElementById('podium-1-avatar');
    
    const p2Name = document.getElementById('podium-2-name');
    const p2Score = document.getElementById('podium-2-score');
    const p2Avatar = document.getElementById('podium-2-avatar');
    
    const p3Name = document.getElementById('podium-3-name');
    const p3Score = document.getElementById('podium-3-score');
    const p3Avatar = document.getElementById('podium-3-avatar');
    
    // Default fallback labels
    p1Name.textContent = 'ว่างเปล่า'; p1Score.textContent = '--'; p1Avatar.textContent = '👽';
    p2Name.textContent = 'ว่างเปล่า'; p2Score.textContent = '--'; p2Avatar.textContent = '👽';
    p3Name.textContent = 'ว่างเปล่า'; p3Score.textContent = '--'; p3Avatar.textContent = '👽';
    
    if (sorted[0]) {
        p1Name.textContent = sorted[0].name;
        p1Score.textContent = `${sorted[0].score} คะแนน`;
        p1Avatar.textContent = sorted[0].avatar;
    }
    if (sorted[1]) {
        p2Name.textContent = sorted[1].name;
        p2Score.textContent = `${sorted[1].score} คะแนน`;
        p2Avatar.textContent = sorted[1].avatar;
    }
    if (sorted[2]) {
        p3Name.textContent = sorted[2].name;
        p3Score.textContent = `${sorted[2].score} คะแนน`;
        p3Avatar.textContent = sorted[2].avatar;
    }
    
    // Render Rank 4 & 5 to Table
    const tbody = document.getElementById('leaderboard-tbody');
    tbody.innerHTML = '';
    
    const remaining = sorted.slice(3, 10); // show up to top 10
    if (remaining.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted);">ยังไม่มีผู้พิชิตคะแนนอื่นๆ ในเครื่องนี้</td></tr>`;
    } else {
        remaining.forEach((record, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>#${index + 4}</strong></td>
                <td>${record.avatar} ${record.name}</td>
                <td>${record.mode}</td>
                <td><span class="color-pink">${record.score}</span></td>
                <td>${record.wpm}</td>
                <td>${record.accuracy}%</td>
            `;
            tbody.appendChild(tr);
        });
    }
}

// 21. TEACHER PANELS SCORES RENDERING
function populateTeacherScores() {
    const history = getScoresHistory();
    
    // Sort latest timestamp first
    const sorted = [...history].reverse();
    
    const tbody = document.getElementById('teacher-scores-tbody');
    tbody.innerHTML = '';
    
    if (sorted.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:var(--text-muted); padding: 20px;">ยังไม่มีประวัติการส่งคะแนนในห้องเรียนนี้</td></tr>`;
        return;
    }
    
    sorted.forEach((record, idx) => {
        // Find index in original array to allow deletion
        const originalIdx = history.indexOf(record);
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${record.timestamp}</td>
            <td>${record.avatar} <strong>${record.name}</strong></td>
            <td>ม.1</td>
            <td>${record.mode}</td>
            <td><span class="color-yellow">${record.score}</span></td>
            <td>${record.wpm}</td>
            <td>${record.accuracy}%</td>
            <td>
                <button class="delete-mini-btn" onclick="deleteSingleScore(${originalIdx})">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.deleteSingleScore = function(index) {
    if (!confirm('❓ คุณครูแน่ใจใช่ไหมครับว่าจะลบรายการคะแนนข้อนี้?')) return;
    const history = getScoresHistory();
    history.splice(index, 1);
    localStorage.setItem('sa_typing_scores', JSON.stringify(history));
    SoundSynth.playExplosion();
    populateTeacherScores();
    loadLeaderboard();
};

function clearAllScores() {
    if (!confirm('⚠️ คำเตือน: คุณครูต้องการจะรีเซ็ตคะแนนนักเรียนทั้งหมดเป็นศูนย์ใช่หรือไม่? (การกระทำนี้ไม่สามารถย้อนกลับได้)')) return;
    localStorage.removeItem('sa_typing_scores');
    SoundSynth.playExplosion();
    populateTeacherScores();
    loadLeaderboard();
    alert('🗑️ รีเซ็ตตารางคะแนนทั้งหมดเรียบร้อยแล้วครับ!');
}

// 22. EXPORT EXCEL-COMPATIBLE UTF-8 CSV
function exportScoresToCSV() {
    const history = getScoresHistory();
    if (history.length === 0) {
        alert('❌ ไม่มีรายการคะแนนให้ส่งออกครับ!');
        return;
    }
    
    // Add UTF-8 BOM so Excel opens Thai language letters correctly
    let csvContent = "\uFEFF";
    
    // Header
    csvContent += "ลำดับ,วันที่-เวลา,นักบินอวกาศ,โหมดพิมพ์ดีด,คะแนนดิบ,WPM (ความเร็ว),Accuracy (ความแม่นยำ %),Combo สูงสุด\n";
    
    history.forEach((record, idx) => {
        csvContent += `${idx + 1},${record.timestamp},"${record.name}",${record.mode},${record.score},${record.wpm},${record.accuracy}%,${record.combo}\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.setAttribute("href", url);
    link.setAttribute("download", `คะแนนฝึกพิมพ์_ม1_โรงเรียนสา_${new Date().toLocaleDateString('th-TH')}.csv`);
    document.body.appendChild(link);
    
    link.click();
    document.body.removeChild(link);
    SoundSynth.playVictory();
}

// 23. VOCABULARY BUILDER LOGIC
function loadCustomVocab() {
    if (!localStorage.getItem('sa_typing_custom_th')) {
        localStorage.setItem('sa_typing_custom_th', JSON.stringify([]));
    }
    if (!localStorage.getItem('sa_typing_custom_en')) {
        localStorage.setItem('sa_typing_custom_en', JSON.stringify([]));
    }
}

function getCustomVocabList(lang) {
    const key = lang === 'th' ? 'sa_typing_custom_th' : 'sa_typing_custom_en';
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch(e) {
        return [];
    }
}

function populateVocabLists() {
    const thList = document.getElementById('vocab-th-list');
    const enList = document.getElementById('vocab-en-list');
    
    thList.innerHTML = '';
    enList.innerHTML = '';
    
    const customTh = getCustomVocabList('th');
    const customEn = getCustomVocabList('en');
    
    // Render defaults first (read-only)
    defaultVocab.th.words.slice(0, 10).forEach(w => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${w}</span> <span style="font-size:0.7rem; color:var(--text-muted);">(ระบบ)</span>`;
        thList.appendChild(li);
    });
    
    customTh.forEach((w, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>${w}</strong></span> 
            <button class="delete-mini-btn" onclick="deleteCustomVocab('th', ${idx})">❌</button>
        `;
        thList.appendChild(li);
    });
    
    defaultVocab.en.words.slice(0, 10).forEach(w => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${w}</span> <span style="font-size:0.7rem; color:var(--text-muted);">(ระบบ)</span>`;
        enList.appendChild(li);
    });
    
    customEn.forEach((w, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>${w}</strong></span> 
            <button class="delete-mini-btn" onclick="deleteCustomVocab('en', ${idx})">❌</button>
        `;
        enList.appendChild(li);
    });
}

function addNewVocabItem() {
    const text = document.getElementById('new-vocab-text').value.trim();
    const lang = document.getElementById('new-vocab-lang').value;
    
    if (!text) {
        alert('❌ กรุณากรอกคำศัพท์ก่อนกดเพิ่มด้วยครับ!');
        return;
    }
    
    const customList = getCustomVocabList(lang);
    
    // Check duplicates
    if (customList.includes(text) || defaultVocab[lang].words.includes(text)) {
        alert('❌ คำศัพท์นี้มีอยู่แล้วในระบบ!');
        return;
    }
    
    customList.push(text);
    localStorage.setItem(lang === 'th' ? 'sa_typing_custom_th' : 'sa_typing_custom_en', JSON.stringify(customList));
    
    document.getElementById('new-vocab-text').value = '';
    SoundSynth.playSuccess();
    populateVocabLists();
}

window.deleteCustomVocab = function(lang, index) {
    if (!confirm('❓ ลบคำศัพท์เพิ่มเติมคำนี้ใช่ไหมครับ?')) return;
    const customList = getCustomVocabList(lang);
    customList.splice(index, 1);
    localStorage.setItem(lang === 'th' ? 'sa_typing_custom_th' : 'sa_typing_custom_en', JSON.stringify(customList));
    SoundSynth.playExplosion();
    populateVocabLists();
};

// 24. HELPER ALGORITHMS
function shuffleArray(arr) {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

// Render the virtual keyboard rows dynamically
function renderVirtualKeyboard() {
    const container = document.getElementById('virtual-keyboard');
    container.innerHTML = '';
    
    keyboardRows.forEach(row => {
        const rowEl = document.createElement('div');
        rowEl.className = 'keyboard-row';
        
        row.forEach(key => {
            const keyEl = document.createElement('div');
            keyEl.className = `keycap ${key.styleClass || ''}`;
            keyEl.setAttribute('id', `key-${key.code}`);
            keyEl.setAttribute('data-finger', key.finger);
            
            const enLabel = document.createElement('span');
            enLabel.className = 'key-en';
            enLabel.textContent = key.en;
            
            const thLabel = document.createElement('span');
            thLabel.className = 'key-th';
            thLabel.textContent = key.th;
            
            keyEl.appendChild(enLabel);
            keyEl.appendChild(thLabel);
            
            rowEl.appendChild(keyEl);
        });
        
        container.appendChild(rowEl);
    });
}

// 25. ENDLESS MARIO RELAX MINI-GAME MODULE
// 25. LIVE TELEMETRY CLASSROOM LEADERBOARD
let liveLeaderboardData = [];

function initSidebarStats() {
    const history = getScoresHistory();
    
    // 1. Personal Stats from history
    const studentRecords = history.filter(r => r.name === gameState.username);
    if (studentRecords.length > 0) {
        const maxWpm = Math.max(...studentRecords.map(r => r.wpm));
        const maxAcc = Math.max(...studentRecords.map(r => r.accuracy));
        
        document.getElementById('side-my-wpm').textContent = Math.round(maxWpm);
        document.getElementById('side-my-acc').textContent = Math.round(maxAcc);
    } else {
        document.getElementById('side-my-wpm').textContent = '0';
        document.getElementById('side-my-acc').textContent = '0';
    }
    
    // 2. Class Standings (Top 5)
    // group by player name to only keep their best score
    const bestScores = {};
    history.forEach(r => {
        if (!bestScores[r.name] || bestScores[r.name].score < r.score) {
            bestScores[r.name] = r;
        }
    });
    
    // Convert to array and filter out current user (we add active placeholder)
    liveLeaderboardData = Object.values(bestScores).filter(r => r.name !== gameState.username);
    
    // Add the active session placeholder for the player
    liveLeaderboardData.push({
        name: gameState.username,
        avatar: gameState.avatar,
        score: 0,
        isPlayer: true
    });
    
    updateSidebarStandings();
}

function updateSidebarStandings() {
    // Update player's active score in the standings list
    const playerRow = liveLeaderboardData.find(r => r.isPlayer);
    if (playerRow) {
        playerRow.score = gameState.score;
    }
    
    // Sort high score first
    const sorted = [...liveLeaderboardData].sort((a, b) => b.score - a.score).slice(0, 5);
    
    const tbody = document.getElementById('side-leaderboard-tbody');
    tbody.innerHTML = '';
    
    sorted.forEach((record, index) => {
        const isMe = record.isPlayer;
        const tr = document.createElement('tr');
        if (isMe) {
            tr.style.background = 'rgba(6, 182, 212, 0.18)';
            tr.style.fontWeight = 'bold';
        }
        tr.innerHTML = `
            <td style="padding: 6px;">#${index + 1}</td>
            <td style="padding: 6px;">${record.avatar} ${record.name}</td>
            <td style="padding: 6px; text-align: right; color:var(--warning);">${record.score}</td>
        `;
        tbody.appendChild(tr);
    });
}

// 26. ENDLESS MARIO RELAX MINI-GAME MODULE (WITH BRICK PLATFORMS & LADDERS)
const MarioRelaxGame = {
    canvas: null,
    ctx: null,
    animationId: null,
    isRunning: false,
    jumpTrigger: null,
    keydownHandler: null,
    keyupHandler: null,
    keys: {},
    
    // Physics & Entities
    player: {
        x: 80,
        y: 130,
        w: 36,
        h: 36,
        vy: 0,
        gravity: 0.5,
        jumpStrength: -9.5,
        isJumping: false,
        isClimbing: false,
        avatar: '🧑‍🚀',
        flashFrames: 0
    },
    
    groundY: 165,
    coins: [],
    obstacles: [],
    platforms: [],
    ladders: [],
    particles: [],
    clouds: [],
    coinsCollected: 0,
    gameSpeed: 4.2,
    spawnTimers: {
        coin: 0,
        obstacle: 0,
        platform: 0,
        cloud: 0
    },
    
    init() {
        this.canvas = document.getElementById('mario-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        
        // Tap/Click to jump
        this.canvas.removeEventListener('click', this.jumpTrigger);
        this.jumpTrigger = () => {
            this.jump();
        };
        this.canvas.addEventListener('click', this.jumpTrigger);
        
        // Reset button
        const resetBtn = document.getElementById('mario-reset-btn');
        if (resetBtn) {
            resetBtn.onclick = () => {
                SoundSynth.playClick();
                this.reset();
            };
        }
        
        // Setup Keyboard Event Listeners for smooth movement
        if (this.keydownHandler) {
            window.removeEventListener('keydown', this.keydownHandler);
            window.removeEventListener('keyup', this.keyupHandler);
        }
        
        this.keydownHandler = (e) => {
            if (gameState.currentMode === 5) {
                // Prevent scrolling on gaming keys
                if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space', 'KeyA', 'KeyD', 'KeyW', 'KeyS'].includes(e.code)) {
                    e.preventDefault();
                }
                this.keys[e.code] = true;
            }
        };
        
        this.keyupHandler = (e) => {
            if (gameState.currentMode === 5) {
                this.keys[e.code] = false;
            }
        };
        
        window.addEventListener('keydown', this.keydownHandler);
        window.addEventListener('keyup', this.keyupHandler);
    },
    
    reset() {
        this.keys = {};
        this.coinsCollected = 0;
        document.getElementById('mario-coin-count').textContent = '0';
        
        this.player.x = 80;
        this.player.y = this.groundY - this.player.h;
        this.player.vy = 0;
        this.player.isJumping = false;
        this.player.isClimbing = false;
        this.player.avatar = gameState.avatar || '🧑‍🚀';
        this.player.flashFrames = 0;
        
        this.coins = [];
        this.obstacles = [];
        this.platforms = [];
        this.ladders = [];
        this.particles = [];
        this.clouds = [];
        this.gameSpeed = 4.2;
        
        // Pre-spawn some clouds
        for (let i = 0; i < 3; i++) {
            this.clouds.push({
                x: Math.random() * 500 + 100,
                y: Math.random() * 60 + 20,
                speed: 0.3 + Math.random() * 0.3,
                emoji: ['☁️', '🌤️'][Math.floor(Math.random() * 2)]
            });
        }
        
        // Pre-spawn one platform & ladder to show immediately
        this.platforms.push({
            x: 350,
            y: 90,
            w: 120,
            h: 22,
            emoji: '🧱'
        });
        
        this.ladders.push({
            x: 390,
            y: 90,
            w: 24,
            h: this.groundY - 90,
            emoji: '🪜'
        });
    },
    
    start() {
        this.init();
        this.reset();
        this.isRunning = true;
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        this.loop();
    },
    
    stop() {
        this.isRunning = false;
        this.keys = {};
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    },
    
    jump() {
        if (!this.isRunning) return;
        if (this.player.isClimbing) {
            // Jump off the ladder!
            this.player.isClimbing = false;
            this.player.vy = this.player.jumpStrength * 0.85;
            this.player.isJumping = true;
            SoundSynth.playTone(450, 'sine', 0.12, 0.1);
        } else if (!this.player.isJumping) {
            this.player.vy = this.player.jumpStrength;
            this.player.isJumping = true;
            SoundSynth.playTone(450, 'sine', 0.12, 0.1); // jump sound
        }
    },
    
    loop() {
        if (!this.isRunning) return;
        
        this.update();
        this.draw();
        
        this.animationId = requestAnimationFrame(() => this.loop());
    },
    
    update() {
        // 1. Horizontal movement control
        if (this.keys['ArrowLeft'] || this.keys['KeyA']) {
            this.player.x = Math.max(10, this.player.x - 5.5);
        }
        if (this.keys['ArrowRight'] || this.keys['KeyD']) {
            this.player.x = Math.min(this.canvas.width - 40, this.player.x + 5.5);
        }
        
        // 2. Ladder Climbing Detection & Controls
        const px = this.player.x + 18; // center foot line
        let touchingLadder = false;
        let activeLadder = null;
        
        this.ladders.forEach(l => {
            // check overlap horizontally and vertically
            if (px >= l.x - 12 && px <= l.x + l.w + 12 && 
                this.player.y + this.player.h >= l.y && this.player.y <= l.y + l.h + 10) {
                touchingLadder = true;
                activeLadder = l;
            }
        });
        
        if (touchingLadder) {
            // Trigger climbing state if up/down is pressed
            if (this.keys['ArrowUp'] || this.keys['KeyW'] || this.keys['ArrowDown'] || this.keys['KeyS']) {
                this.player.isClimbing = true;
                this.player.isJumping = false;
                this.player.vy = 0;
            }
            
            // Climb actions
            if (this.player.isClimbing) {
                if (this.keys['ArrowUp'] || this.keys['KeyW'] || this.keys['Space']) {
                    this.player.y = Math.max(activeLadder.y - this.player.h, this.player.y - 3.8);
                }
                if (this.keys['ArrowDown'] || this.keys['KeyS']) {
                    this.player.y = Math.min(this.groundY - this.player.h, this.player.y + 3.8);
                }
            }
        } else {
            this.player.isClimbing = false;
        }
        
        // Jump override
        if (!this.player.isClimbing && (this.keys['ArrowUp'] || this.keys['KeyW'] || this.keys['Space'])) {
            this.jump();
        }
        
        // 3. Gravity Physics (Only applies if not climbing)
        if (this.player.isClimbing) {
            this.player.vy = 0;
        } else {
            this.player.y += this.player.vy;
            this.player.vy += this.player.gravity;
            
            // Check landing on floating brick platforms
            let onPlatform = false;
            const feetX = this.player.x + 18;
            const feetY = this.player.y + this.player.h;
            
            this.platforms.forEach(p => {
                // feet are touching platform top, horizontal align, and falling down
                if (feetX >= p.x - 4 && feetX <= p.x + p.w + 4 && 
                    feetY >= p.y && feetY <= p.y + 10 && 
                    this.player.vy >= 0) {
                    onPlatform = true;
                    this.player.y = p.y - this.player.h;
                    this.player.vy = 0;
                    this.player.isJumping = false;
                }
            });
            
            // Check landing on Ground
            const actualGroundY = this.groundY - this.player.h;
            if (this.player.y >= actualGroundY) {
                this.player.y = actualGroundY;
                this.player.vy = 0;
                this.player.isJumping = false;
            }
        }
        
        if (this.player.flashFrames > 0) {
            this.player.flashFrames--;
        }
        
        // 4. Entity Spawning
        // Clouds
        this.spawnTimers.cloud--;
        if (this.spawnTimers.cloud <= 0) {
            this.clouds.push({
                x: this.canvas.width + 50,
                y: Math.random() * 60 + 20,
                speed: 0.3 + Math.random() * 0.3,
                emoji: ['☁️', '🌤️'][Math.floor(Math.random() * 2)]
            });
            this.spawnTimers.cloud = 120 + Math.random() * 180;
        }
        
        // Platform & Ladder combined structures
        this.spawnTimers.platform--;
        if (this.spawnTimers.platform <= 0) {
            const platformX = this.canvas.width + 40;
            const platformY = 90; // float high
            const platformWidth = 140;
            
            this.platforms.push({
                x: platformX,
                y: platformY,
                w: platformWidth,
                h: 22,
                emoji: '🧱'
            });
            
            this.ladders.push({
                x: platformX + 50, // center on the platform
                y: platformY,
                w: 24,
                h: this.groundY - platformY,
                emoji: '🪜'
            });
            
            this.spawnTimers.platform = 240 + Math.random() * 120; // platform spawn interval
        }
        
        // Coins (often spawn on platforms!)
        this.spawnTimers.coin--;
        if (this.spawnTimers.coin <= 0) {
            // coin Y floats, either high (on platform: 60) or low (ground: 120)
            const coinY = Math.random() > 0.5 ? 55 : this.groundY - 30 - Math.random() * 45;
            this.coins.push({
                x: this.canvas.width + 30,
                y: coinY,
                collected: false
            });
            this.spawnTimers.coin = 60 + Math.random() * 70;
        }
        
        // Obstacles (Spawning on the ground)
        this.spawnTimers.obstacle--;
        if (this.spawnTimers.obstacle <= 0) {
            this.obstacles.push({
                x: this.canvas.width + 30,
                y: this.groundY - 26,
                emoji: ['👾', '🌵', '🍄'][Math.floor(Math.random() * 3)]
            });
            this.spawnTimers.obstacle = 140 + Math.random() * 130;
        }
        
        // 5. Motion scrolling and cleanup
        this.clouds.forEach(c => c.x -= c.speed);
        this.clouds = this.clouds.filter(c => c.x > -50);
        
        this.platforms.forEach(p => p.x -= this.gameSpeed);
        this.platforms = this.platforms.filter(p => p.x > -p.w);
        
        this.ladders.forEach(l => l.x -= this.gameSpeed);
        this.ladders = this.ladders.filter(l => l.x > -30);
        
        this.coins.forEach(coin => {
            coin.x -= this.gameSpeed;
            
            if (!coin.collected) {
                const dist = Math.hypot((coin.x - (this.player.x + 18)), (coin.y - (this.player.y + 18)));
                if (dist < 26) {
                    coin.collected = true;
                    this.coinsCollected++;
                    document.getElementById('mario-coin-count').textContent = this.coinsCollected;
                    
                    // iconic Mario coin sound arpeggio
                    SoundSynth.playTone(987.77, 'sine', 0.05, 0.08);
                    setTimeout(() => {
                        SoundSynth.playTone(1318.51, 'sine', 0.12, 0.06);
                    }, 50);
                    
                    // Sparkles particles
                    for (let i = 0; i < 4; i++) {
                        this.particles.push({
                            x: coin.x + 10,
                            y: coin.y + 10,
                            vx: Math.cos(Math.random() * Math.PI * 2) * 2,
                            vy: Math.sin(Math.random() * Math.PI * 2) * 2,
                            life: 15,
                            color: '#fbbf24'
                        });
                    }
                }
            }
        });
        this.coins = this.coins.filter(c => c.x > -30 && !c.collected);
        
        this.obstacles.forEach(obs => {
            obs.x -= this.gameSpeed;
            
            if (this.player.flashFrames === 0) {
                const dist = Math.hypot((obs.x - (this.player.x + 18)), (obs.y - (this.player.y + 18)));
                if (dist < 25) {
                    // CRASH!
                    this.player.flashFrames = 65; // Invincibility flash frames
                    this.coinsCollected = Math.max(0, this.coinsCollected - 2);
                    document.getElementById('mario-coin-count').textContent = this.coinsCollected;
                    
                    SoundSynth.playFail(); // Buzzer sound
                    
                    // Boom particles
                    for (let i = 0; i < 8; i++) {
                        this.particles.push({
                            x: obs.x + 10,
                            y: obs.y + 10,
                            vx: Math.cos(Math.random() * Math.PI * 2) * 3,
                            vy: Math.sin(Math.random() * Math.PI * 2) * 3,
                            life: 25,
                            color: '#ef4444'
                        });
                    }
                }
            }
        });
        this.obstacles = this.obstacles.filter(o => o.x > -30);
        
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
        });
        this.particles = this.particles.filter(p => p.life > 0);
        
        // Dynamic speed rise
        this.gameSpeed += 0.0003;
    },
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 1. Draw Space background
        this.ctx.fillStyle = '#060714';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 2. Draw Clouds
        this.clouds.forEach(c => {
            this.ctx.font = '28px sans-serif';
            this.ctx.fillText(c.emoji, c.x, c.y);
        });
        
        // 3. Draw Ladders (connecting ground to platforms)
        this.ladders.forEach(l => {
            const steps = Math.ceil(l.h / 18);
            for (let i = 0; i < steps; i++) {
                this.ctx.font = '16px sans-serif';
                this.ctx.fillText('🪜', l.x, l.y + (i * 18) + 14);
            }
        });
        
        // 4. Draw Platforms (brick rows)
        this.platforms.forEach(p => {
            const brickWidth = 20;
            const bricks = Math.ceil(p.w / brickWidth);
            for (let i = 0; i < bricks; i++) {
                this.ctx.font = '20px sans-serif';
                this.ctx.fillText('🧱', p.x + (i * brickWidth), p.y + 16);
            }
        });
        
        // 5. Draw Ground
        this.ctx.fillStyle = '#10b981';
        this.ctx.fillRect(0, this.groundY, this.canvas.width, this.canvas.height - this.groundY);
        
        this.ctx.fillStyle = '#059669';
        this.ctx.fillRect(0, this.groundY, this.canvas.width, 4); // border
        
        // ground details
        this.ctx.fillStyle = '#047857';
        const shift = Math.floor((this.gameSpeed * 1.6) % 40);
        for (let i = 0; i < this.canvas.width + 40; i += 40) {
            this.ctx.fillRect(i - shift, this.groundY + 12, 8, 4);
        }
        
        // 6. Draw Coins
        this.coins.forEach(coin => {
            this.ctx.font = '20px sans-serif';
            this.ctx.fillText('🪙', coin.x, coin.y + 16);
        });
        
        // 7. Draw Obstacles
        this.obstacles.forEach(obs => {
            this.ctx.font = '20px sans-serif';
            this.ctx.fillText(obs.emoji, obs.x, obs.y + 16);
        });
        
        // 8. Draw Particles
        this.particles.forEach(p => {
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(p.x, p.y, 4, 4);
        });
        
        // 9. Draw Player Avatar (selected dynamic character)
        if (this.player.flashFrames === 0 || Math.floor(this.player.flashFrames / 4) % 2 === 0) {
            this.ctx.font = '30px sans-serif';
            this.ctx.fillText(this.player.avatar, this.player.x, this.player.y + 26);
        }
    }
};
