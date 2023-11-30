
import Vue from 'vue';
import App from './App.vue';
import Lobby from './components/Lobby.vue'; 


Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  components: {
    Lobby, 
  },
  data() {
    return {
      socket: null,
    };
  },
}).$mount('#app');
