import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import VueFeather from 'vue-feather';
import router from "./router";
import Notifications from '@kyvg/vue3-notification'

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC6C-sttkycd6izgeIOVb9D1R8MI49lSaA",
  authDomain: "authentication-b0c9d.firebaseapp.com",
  projectId: "authentication-b0c9d",
  storageBucket: "authentication-b0c9d.appspot.com",
  messagingSenderId: "137740469812",
  appId: "1:137740469812:web:6c3e5af0fe8df8755c2c61"
};

initializeApp(firebaseConfig);



createApp(App).component(VueFeather.name, VueFeather).use(createPinia()).use(router).use(Notifications).mount('#app')
