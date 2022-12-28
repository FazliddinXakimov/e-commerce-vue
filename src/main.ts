import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia' 
import VueFeather from 'vue-feather';

createApp(App).component(VueFeather.name, VueFeather).use(createPinia()).mount('#app')
