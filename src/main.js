import { createApp, inject } from 'vue'
import './styles/index.scss'
import router from './router'
import {createPinia} from 'pinia'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase'
import App from './App.vue'

// pinia storage
const pinia = createPinia()

createApp(App)
.use(pinia)
.use(router)
.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth(),
  ],
})
.mount('#app')
