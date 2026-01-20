import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { initializeOpenObserve } from './config/openobserve'

// Initialize OpenObserve for monitoring and logging
initializeOpenObserve()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
