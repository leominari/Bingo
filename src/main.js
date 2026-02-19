import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

// import 'vuetify/styles' // Can be imported here or in plugins/vuetify.js
// import './assets/scss/app.scss'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(vuetify)

app.mount('#app')
