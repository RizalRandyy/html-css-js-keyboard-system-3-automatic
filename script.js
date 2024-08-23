let mengetik = false;
let keysPressed = {};

// Fungsi KeyDown
function handleKeyDown(event) {
    const text = document.getElementById('text');
    
    keysPressed[event.key] = true;
    
    if (!mengetik) {
        text.textContent = "";
        mengetik = true;
    }

    if (keysPressed["Enter"]) {
        event.preventDefault(); // Prevent default behavior
        startGame();
        return;
    } else if (event.key === "Backspace" && event.ctrlKey) {
        let kata = text.textContent.trim().split(" ");
        kata.pop();
        text.textContent = kata.join(" ") + " ";
    } else if (event.key === "Backspace") {
        text.textContent = text.textContent.slice(0, -1);
    } else if (event.key.length === 1) {
        text.textContent += event.key;
    }

    let keyElement = getKeyElement(event);
    if (keyElement) {
        keyElement.classList.add('key--active');
    }
    playSound();

    // endGame
    if (text.textContent === originalText) {
        endGame();
    }
}

// Fungsi KeyUp
function handleKeyUp(event) {
    delete keysPressed[event.key];

    let keyElement = getKeyElement(event);
    if (keyElement) {
        keyElement.classList.remove('key--active');
    }
}

// Fungsi untuk mengambil elemen
function getKeyElement(event) {
    const key = event.key.toUpperCase();
    let keyElement;

    switch (event.code) {
        case "Space":
            keyElement = document.getElementById('key-Space');
            event.preventDefault();
            break;
        case "Enter":
            keyElement = document.getElementById('key-Enter');
            break;
        case "Backslash":
            keyElement = document.getElementById("key-oneandhalf");
            break;
        case "Backspace":
            keyElement = document.getElementById('key-Backspace');
            break;
        case "CapsLock":
            keyElement = document.getElementById('key-CapsLock');
            break;
        case "Tab":
            keyElement = document.getElementById('key-Tab');
            event.preventDefault();
            break;
        case "ShiftLeft":
        case "ShiftRight":
            keyElement = document.getElementById('key-ShiftLeft');
            break;
        case "ControlLeft":
        case "ControlRight":
            keyElement = document.getElementById('key-ControlLeft');
            break;
        case "AltLeft":
        case "AltRight":
            keyElement = document.getElementById('key-MetaLeft');
            event.preventDefault();
            break;
        case "MetaLeft":
        case "MetaRight":
            keyElement = document.getElementById('key-AltLeft');
            event.preventDefault();
            break;
        default:
            if (event.code.startsWith("Arrow")) {
                keyElement = document.getElementById(`key-${event.code}`);
                event.preventDefault();
            } else {
                keyElement = document.getElementById(`key-${key}`);
            }
    }
    return keyElement;
}

// event listeners
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

// Function to simulate key presses with simultaneous keydown
function simulateCombinedKeyPress(keys) {
    keys.forEach(key => {
        let eventOptions = {
            key: key,
            code: key,
            bubbles: true,
            cancelable: true
        };

        // Handle special keys
        switch (key) {
            case 'Enter':
                eventOptions.code = 'Enter';
                eventOptions.keyCode = 13;
                eventOptions.which = 13;
                break;
            case 'Tab':
                eventOptions.code = 'Tab';
                eventOptions.keyCode = 9;
                eventOptions.which = 9;
                break;
        }

        // Simulate keydown
        let event = new KeyboardEvent('keydown', eventOptions);
        document.dispatchEvent(event);
    });

    // Simulate keyup after a short delay
    setTimeout(() => {
        keys.forEach(key => {
            let eventOptions = {
                key: key,
                code: key,
                bubbles: true,
                cancelable: true
            };

            // Handle special keys
            switch (key) {
                case 'Enter':
                    eventOptions.code = 'Enter';
                    eventOptions.keyCode = 13;
                    eventOptions.which = 13;
                    break;
                case 'Tab':
                    eventOptions.code = 'Tab';
                    eventOptions.keyCode = 9;
                    eventOptions.which = 9;
                    break;
            }

            let eventUp = new KeyboardEvent('keyup', eventOptions);
            document.dispatchEvent(eventUp);
        });
    }, 300); // Adjust delay if needed
}

function simulateKeyPress(key) {
    let eventOptions = {
        key: key,
        code: key,
        bubbles: true,
        cancelable: true
    };

    // Handle special keys
    if (key === 'Enter') {
        eventOptions.code = 'Enter';
        eventOptions.keyCode = 13;
        eventOptions.which = 13;
    } else if (key === 'Tab') {
        eventOptions.code = 'Tab';
        eventOptions.keyCode = 9;
        eventOptions.which = 9;
    } else if (key === ' ') {
        eventOptions.code = 'Space';
        eventOptions.keyCode = 32;
        eventOptions.which = 32;
    }

    // Simulate keydown
    let event = new KeyboardEvent('keydown', eventOptions);
    document.dispatchEvent(event);

    // Simulate keyup
    let eventUp = new KeyboardEvent('keyup', eventOptions);
    setTimeout(() => document.dispatchEvent(eventUp), 100); // Adjust delay if needed
}

// Function to type a message
function typeMessage(message, index = 0) {
    if (index < message.length) {
        simulateKeyPress(message[index]);
        setTimeout(() => typeMessage(message, index + 1), 500); // Adjust typing speed here
    }
}


function simulateEnterTabAndTypeMessage() {

    setTimeout(() => {
        simulateKeyPress('Enter');

        setTimeout(() => {
            let message = "Lets go your younger self must be proud!";
            typeMessage(message);
        }, 1000); // Delay 1 detik sebelum mengetik pesan
    }, 1000); 
}

// Call the function to start the process
simulateEnterTabAndTypeMessage();

let gameMulai = false;
const originalText = "Lets go your younger self must be proud!";

function startGame() {
    gameMulai = true;
    mengetik = true;
    const textGame = document.getElementById('text-game');
    const text = document.getElementById('text');
    text.textContent = "";
    textGame.textContent = originalText;
    text.classList.add('container-text--gameStart');
    textGame.classList.add('container-text--gameStart');
}

function endGame() {
    gameMulai = false;
    const textGame = document.getElementById('text-game');
    const text = document.getElementById('text');
    text.classList.remove('container-text--gameStart');
    text.textContent = "";
    textGame.classList.remove('container-text--gameStart');
    textGame.textContent = "";

    // Remove the active class from all keys
    const activeKeys = document.querySelectorAll('.key--active');
    activeKeys.forEach(key => key.classList.remove('key--active'));

    Swal.fire({
        title: 'Congratulations!',
        text: 'You completed the game',
        icon: 'success',
        confirmButtonText: 'Play Again',
        customClass: {
            confirmButton: 'swal-btn'
        },
        buttonsStyling: false // Set to false to use custom styling
    }).then((result) => {
        if (result.isConfirmed) {
            // Optionally restart the game here
            startGame();
        }
    });
}
