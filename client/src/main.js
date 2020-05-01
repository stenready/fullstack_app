import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
Vue.use(VueToast);

Vue.config.productionTip=false


import filters from './filters'


new Vue({
  router,
  store,
  created() {
    let user=JSON.parse(localStorage.getItem('user'))
    if (user) {
      axios.defaults.headers.common['Authorization']=user.token
      store.state.auth.auth_triger=true
      store.state.auth.auth_user=user
    }
  },
  vuetify,
  render: h => h(App)
}).$mount('#app')
