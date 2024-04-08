// Initialize leaderboard array
let leaderboard = [];

// Function to prompt user for username when game over
// leaderboard.js

// Function to prompt user for username when game over
function promptForUsername(score, level) {
    let username = prompt('Game Over! Enter your username for the leaderboard:');
    if (username) {
        // Check if the username already exists in the leaderboard
        const isExistingUsername = leaderboard.some(entry => entry.username === username);
        if (isExistingUsername) {
            alert('Username already exists. Please enter a unique username.');
            promptForUsername(score, level); // Prompt again for username
        } else {
            addScoreToLeaderboard(username, score, level); // Store score, level, and username
            displayLeaderboard(); // Display leaderboard
        }
    } else {
        console.log('Username not provided. Score not added to leaderboard.');
    }
}

function addScoreToLeaderboard(username, score, level) {
    // Retrieve existing leaderboard data from local storage or initialize an empty array
    let leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];

    // Add the new score entry to the leaderboard data
    leaderboardData.push({ username, score, level });

    // Sort leaderboard data based on scores (highest to lowest)
    leaderboardData.sort((a, b) => b.score - a.score);

    // Store the updated leaderboard data back to local storage
    localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));
}

function displayLeaderboard() {

    let leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];

    const leaderboardContainer = document.getElementById('leaderboard');
    leaderboardContainer.innerHTML = '';

    leaderboardData.forEach((entry, index) => {
        const entryElement = document.createElement('div');
        entryElement.textContent = `${index + 1}. ${entry.username}: Score - ${entry.score}, Level - ${entry.level}`;
        leaderboardContainer.appendChild(entryElement);
    });
}

window.addEventListener('load', displayLeaderboard);