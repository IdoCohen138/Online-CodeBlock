// app.js

import Vue from 'vue';
import App from './App.vue';
import Lobby from './components/Lobby.vue'; // Import your Lobby component

// Import other dependencies and configurations as needed

Vue.config.productionTip = false;

// Vue instance with Socket.io setup
new Vue({
  render: (h) => h(App),
  components: {
    Lobby, // Register the Lobby component
  },
  data() {
    return {
      socket: null,
    };
  },
  created() {
    // Connect to the Socket.io server
    this.socket = io(process.env.VUE_APP_SOCKET_SERVER);

    // Join the lobby on component creation
    this.socket.emit('joinLobby');

    // Handle updates from the server to update the sessions in the Lobby component
    this.socket.on('updateLobby', (sessions) => {
      this.$refs.lobby.updateSessions(sessions);
    });
  },
  methods: {
    // Add any global methods you might need
  },
}).$mount('#app');
