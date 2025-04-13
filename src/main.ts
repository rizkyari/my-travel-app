import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import { createBootstrap } from 'bootstrap-vue-next'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(createBootstrap())

app.mount('#app')
