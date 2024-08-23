let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let audioBuffer;

// Load audio
fetch('assets/keyboard-sound.mp3')
    .then(response => response.arrayBuffer())
    .then(data => audioContext.decodeAudioData(data))
    .then(buffer => {
        audioBuffer = buffer;
    });

// Fungsi untuk memulai sound
function playSound() {
    let source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start(0);
}