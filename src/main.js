import axios from 'axios'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
//axios.defaults.xsrfCookieName = "csrftoken"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')