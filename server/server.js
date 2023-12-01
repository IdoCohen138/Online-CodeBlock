const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
const dbUtil = require("./db/db");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

server.listen(process.env.PORT, () => {
  console.log(`Server is listening on Port: ${process.env.PORT}`);
});

const mentorSocket = new Map();

const dbPool = dbUtil.promisePool;

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('joinCodeBlock', (codeBlockTitle) => {

    console.log(`A user ${socket.id} choose code mission: ${codeBlockTitle}`);

    if (mentorSocket.has(codeBlockTitle)){
        socket.emit("isMentor", false);

        socket.emit("studentJoin", true);
        mentorSocket.get(codeBlockTitle).emit("studentJoin", true)
    
        console.log(`A user ${socket.id} is Student in ${codeBlockTitle} room`);

    }
    else {
        socket.emit("isMentor", true);

        console.log(`A user ${socket.id} is Mentor in ${codeBlockTitle} room`);

        mentorSocket.set(codeBlockTitle, socket);
    }
  });

    socket.on("changeCode", async (code, codeBlockTitle) => {
      try {
        const [rows] = await dbPool.query('SELECT code FROM solution WHERE title = ?', [codeBlockTitle]);

        const codeClean = cleanCode(code);
        const dataCodeClean = rows[0].code;
        const isCodeEqual = codeClean === dataCodeClean;
        
        mentorSocketRoom = mentorSocket.get(codeBlockTitle);
        if (mentorSocketRoom) {
          mentorSocketRoom.emit("presentCodeToMentor", code);
        }
        if (isCodeEqual){
          socket.emit('solved', isCodeEqual)
        }
      } catch (error) {
        console.error('Error checking from the database:', error);
      }
    });
  
  socket.on("mentorLeaveRoom", (mentorId, codeBlockName) => {
    console.log(`Mentor ${mentorId} leaving room ${codeBlockName}`);

    mentorSocket.delete(codeBlockName);
  
    socket.broadcast.emit("mentorLeftRoom", codeBlockName);
  });

  socket.on('disconnect', () => {

    console.log('Client disconnected:', socket.id);

    mentorSocket.forEach((value, key) => {
      if (value.id === socket.id) {

        console.log(`Removing mentor entry for socket.id ${socket.id}`);

        mentorSocket.delete(key);
      }
    });
  });

  function cleanCode(inputString) {
    let cleanedString = inputString.replace(/\/\/ Your code here/g, '');
  
    cleanedString = cleanedString.replace(/[\s\n]/g, '');
    
    return cleanedString;
  }
  
  
});
