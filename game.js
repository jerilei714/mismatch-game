
const colors = ['red', 'blue', 'green', 'yellow'];
let pattern = [];
let playerPattern = [];
let level = 1;
let score = 0;

const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');

document.getElementById('resetBtn').addEventListener('click', resetGame);

startGame();

function startGame() {
    generatePattern(level);
    showPattern();
}

function generatePattern(level) {
    pattern = [];
    for (let i = 0; i < level; i++) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        pattern.push(colors[randomIndex]);
    }
}

function showPattern() {
    let index = 0;
    const intervalId = setInterval(() => {
        if (index < pattern.length) {
            flashButton(pattern[index]);
            index++;
        } else {
            clearInterval(intervalId);
        }
    }, 1000);
}

function flashButton(color) {
    const button = document.createElement('div');
    button.className = 'btn';
    button.style.backgroundColor = color;
    document.getElementById('pattern').appendChild(button);
    setTimeout(() => {
        button.style.backgroundColor = '';
    }, 500);
}

function handleClick(color) {
    playerPattern.push(color);
    checkPattern();
}

function checkPattern() {
    if (playerPattern.length === pattern.length) {
        // Check pattern
        for (let i = 0; i < pattern.length; i++) {
            if (playerPattern[i] !== pattern[i]) {
                // If pattern is incorrect, it's game over
                alert('Wrong Pattern! Game Over.');
                promptForUsername(score, level); // Prompt for username when game over
                return resetGame(); // Reset game after game over
            }
        }
        // If pattern is correct, level up
        score += Math.pow(2, level); // Update score
        level++; // Increment level
        playerPattern = [];
        scoreElement.textContent = score; 
        levelElement.textContent = level; 
        startGame(); 
    }
}

function resetGame() {
    level = 1;
    pattern = [];
    playerPattern = [];
    score = 0;
    scoreElement.textContent = score; 
    levelElement.textContent = level; 
    document.getElementById('pattern').innerHTML = '';
    startGame();
}

colors.forEach(color => {
    const button = document.createElement('div');
    button.className = 'btn';
    button.style.backgroundColor = color;
    button.addEventListener('click', () => handleClick(color));
    document.getElementById('buttons').appendChild(button);
});



