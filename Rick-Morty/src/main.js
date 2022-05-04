import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from "vue-query";



createApp(App).use(VueQueryPlugin).use(createPinia()).use(router).mount('#app')

