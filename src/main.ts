import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App)

app.use(createPinia())
app.use(router)

axios.defaults.headers.common = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `${localStorage.getItem('access_token')}`
}
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

app.mount('#app')
