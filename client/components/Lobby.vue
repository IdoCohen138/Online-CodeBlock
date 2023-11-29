<template>
    <div>
      <h2>Lobby</h2>
      <ul>
        <li v-for="session in sessions" @click="selectSession(session.id)">{{ session.name }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import io from 'socket.io-client';
  import dotenv from 'dotenv';

  dotenv.config();

  export default {
    data() {
      return {
        sessions: [],
      };
    },
    mounted() {
      this.socket = io(process.env.VUE_APP_SOCKET_SERVER);
      this.socket.emit('joinLobby');
  
      this.socket.on('updateLobby', sessions => {
        this.sessions = sessions;
      });
    },
    methods: {
      selectSession(sessionId) {
        this.socket.emit('selectSession', sessionId);
      },
    },
  };
  </script>
  