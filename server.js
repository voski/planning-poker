// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Game state
let players = {};
const fibonacci = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55];

// Handle socket connections
io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Handle new player joining
    socket.on('join', (name) => {
        players[socket.id] = { name, vote: null };
        io.emit('updatePlayers', Object.values(players));
    });

    // Handle player voting
    socket.on('vote', (vote) => {
        if (players[socket.id]) {
            players[socket.id].vote = vote;
            io.emit('updatePlayers', Object.values(players));
            checkVotes();
        }
    });

    // Handle resetting the game
    socket.on('reset', () => {
        console.log(`Reset initiated by: ${players[socket.id]?.name || socket.id}`);
        for (let id in players) {
            players[id].vote = null;
        }
        io.emit('updatePlayers', Object.values(players));
        // Additionally, hide the results on all clients
        io.emit('hideResults');
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        delete players[socket.id];
        io.emit('updatePlayers', Object.values(players));
    });
});

// Check if all players have voted
function checkVotes() {
    const allVoted = Object.values(players).every(player => player.vote !== null);
    if (allVoted) {
        io.emit('revealVotes', Object.values(players));
    }
}

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
