import Vue from 'vue'
import App from './App.vue'
import VueLoading from 'vuejs-loading-plugin'
import VueRouter from 'vue-router'
import router from './router'
import Toasted from 'vue-toasted';
import VueSimpleAlert from "vue-simple-alert";
import store from './vuex'
import vuetify from './plugins/vuetify';
import CountryFlag from 'vue-country-flag'
import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client"
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)
Vue.component('country-flag', CountryFlag)
Vue.use(VueSimpleAlert);
Vue.use(VueLoading,{text:'Please wait..'});
Vue.use(VueRouter);
Vue.use(Toasted,{duration:4000});
Vue.use(new VueSocketIO({

  connection: SocketIO('http://localhost:5000/') 
})
);


Vue.config.productionTip = false

new Vue({

  router:router,
  store:store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
