
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