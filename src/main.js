import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import LottieAnimation from 'lottie-web-vue'


import 'vuetify/dist/vuetify.min.css'
// import './assets/scss/app.scss'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  LottieAnimation,
  render: h => h(App)
}).$mount('#app')
