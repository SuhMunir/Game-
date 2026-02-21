const dot = document.getElementById('dot');
const scoreDiv = document.getElementById('score');
const timerDiv = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const gameArea = document.getElementById('gameArea');

let score = 0;
let timeLeft = 30;
let timerInterval = null;
let gameActive = false;

function randomPosition() {
    const areaRect = gameArea.getBoundingClientRect();
    const dotSize = 40;
    const maxX = gameArea.clientWidth - dotSize;
    const maxY = gameArea.clientHeight - dotSize;
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
}

function showDot() {
    dot.style.display = 'block';
    randomPosition();
}

function hideDot() {
    dot.style.display = 'none';
}

function updateScore() {
    scoreDiv.textContent = `Score: ${score}`;
}

function updateTimer() {
    timerDiv.textContent = `Time: ${timeLeft}`;
}

function startGame() {
    score = 0;
    timeLeft = 30;
    gameActive = true;
    updateScore();
    updateTimer();
    hideDot();
    startBtn.disabled = true;

    showDot();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    gameActive = false;
    hideDot();
    startBtn.disabled = false;
    alert(`Time's up! Your score: ${score}`);
}

dot.addEventListener('click', () => {
    if (!gameActive) return;
    score++;
    updateScore();
    showDot();
});

startBtn.addEventListener('click', startGame);

// Prevent accidental selection
dot.onmousedown = (e) => { e.preventDefault(); };