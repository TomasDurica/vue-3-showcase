import '@unocss/reset/normalize.css'
import '@/styles/styles.css'
import 'uno.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './routes'

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')
