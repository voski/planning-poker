// public/client.js
const socket = io();

// Elements
const joinSection = document.getElementById('join-section');
const joinForm = document.getElementById('join-form'); // Form element
const nameInput = document.getElementById('name-input');
const joinBtn = document.getElementById('join-btn');
const gameSection = document.getElementById('game-section');
const playersList = document.getElementById('players-list');
const cardsDiv = document.getElementById('cards');
const resetBtn = document.getElementById('reset-btn');
const resultsSection = document.getElementById('results-section');
const resultsDiv = document.getElementById('results');

// Fibonacci sequence for cards
const fibonacci = [1, 2, 3, 5, 8, 13, 21, 34, 55];

// Handle form submission
joinForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission (page reload)
    const name = nameInput.value.trim();
    if (name) {
        socket.emit('join', name);
        joinSection.style.display = 'none';
        gameSection.style.display = 'block';
        generateCards();
    }
});

// Generate vote cards
function generateCards() {
    cardsDiv.innerHTML = '';
    fibonacci.forEach(number => {
        const btn = document.createElement('button');
        btn.textContent = number;
        btn.addEventListener('click', () => {
            socket.emit('vote', number);
            // Optionally, disable voting after voting once
            // disableVoting();
        });
        cardsDiv.appendChild(btn);
    });
}

// Update players list
socket.on('updatePlayers', (players) => {
    playersList.innerHTML = '<h2>Players</h2><ul>' + players.map(p => `<li>${p.name}${p.vote ? ' (Voted)' : ''}</li>`).join('') + '</ul>';
});

// Reveal votes
socket.on('revealVotes', (players) => {
    resultsSection.style.display = 'block';
    resultsDiv.innerHTML = '<ul>' + players.map(p => `<li>${p.name}: ${p.vote}</li>`).join('') + '</ul>';
});

// Hide results (when reset is triggered)
socket.on('hideResults', () => {
    resultsSection.style.display = 'none';
    resultsDiv.innerHTML = ''; // Clear previous results
    // Optionally, reset any local UI elements if necessary
});

// Reset the game
resetBtn.addEventListener('click', () => {
    socket.emit('reset');
    // The 'hideResults' event will handle hiding the results section on all clients
});
