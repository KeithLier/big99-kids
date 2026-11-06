import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { diagnostics, installGlobalErrorHandlers } from './utils/diagnostics'

const app = createApp(App)
app.config.errorHandler = () => diagnostics.report('vue_error')
installGlobalErrorHandlers(window)
app.use(router)
app.mount('#app')
