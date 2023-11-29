const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Express route for serving the Vue.js app
app.use(express.static('public'));

// Socket.io connection handling
io.on('connection', socket => {
  console.log('Client connected:', socket.id);

  // Handle lobby events
  socket.on('joinLobby', () => {
    socket.join('lobby');
    io.to('lobby').emit('updateLobby', getSessionsFromDatabase());
  });

  socket.on('selectSession', sessionId => {
    // Handle session selection, emit events accordingly
  });

  // Handle code editing events
  socket.on('codeUpdate', data => {
    // Update the code in the database and emit to other clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Helper function to fetch sessions from the database
function getSessionsFromDatabase() {
  // Fetch sessions from the database
  // Return an array of sessions
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
