const holes = document.querySelectorAll('.hole');
let score = 0;
let activeHole = null;
let gameInterval;
let gameTimer;
let timeLeft = 30; // 30-second game
let currentLevel = 1;
let moleSpeed = 1000; // Initial mole appearance speed (1 second)

// Timer and game over modal elements
const timerElement = document.getElementById('timer');
const gameOverModal = document.getElementById('gameOverModal');
const finalScoreElement = document.getElementById('finalScore');
const restartButton = document.getElementById('restartButton');

// Start the game
function startGame() {
    score = 0;
    timeLeft = 30;
    currentLevel = 1;
    moleSpeed = 1000;
    document.getElementById('score').textContent = `Score: ${score}`;
    timerElement.textContent = `Time: ${timeLeft}s`;
    gameOverModal.style.display = 'none';

    gameInterval = setInterval(showMole, moleSpeed);
    gameTimer = setInterval(updateTimer, 1000);
}

// Display mole in random hole
function showMole() {
    if (activeHole) {
        activeHole.classList.remove('active');
    }
    const randomHoleIndex = Math.floor(Math.random() * holes.length);
    activeHole = holes[randomHoleIndex];
    activeHole.classList.add('active');
}

// Update timer and check for game over
function updateTimer() {
    timeLeft--;
    timerElement.textContent = `Time: ${timeLeft}s`;

    if (timeLeft === 0) {
        endGame();
    } else if (score >= currentLevel * 10) {
        // Increase level every 10 points
        currentLevel++;
        moleSpeed = Math.max(500, moleSpeed - 100); // Decrease mole speed
        clearInterval(gameInterval);
        gameInterval = setInterval(showMole, moleSpeed);
    }
}

// End the game
function endGame() {
    clearInterval(gameInterval);
    clearInterval(gameTimer);
    if (activeHole) {
        activeHole.classList.remove('active');
    }
    finalScoreElement.textContent = `Your final score is: ${score}`;
    gameOverModal.style.display = 'flex';
}

// Restart the game
restartButton.addEventListener('click', startGame);

// Click event on holes to increase score
holes.forEach(hole => {
    hole.addEventListener('click', () => {
        if (hole.classList.contains('active')) {
            score++;
            document.getElementById('score').textContent = `Score: ${score}`;
            hole.classList.remove('active');
            activeHole = null;
        }
    });
});

startGame();
