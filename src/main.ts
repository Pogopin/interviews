import './assets/main.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { initializeApp } from "firebase/app";
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';

import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import ProgressSpinner from 'primevue/progressspinner';
import Card from 'primevue/card';

import App from './App.vue';
import router from './router';


const firebaseConfig = {
  apiKey: "AIzaSyDxXKAqm1Bl61r-v-2YSgMH-bm7PkDFebw",
  authDomain: "interviews-c05e4.firebaseapp.com",
  projectId: "interviews-c05e4",
  storageBucket: "interviews-c05e4.appspot.com",
  messagingSenderId: "576364280889",
  appId: "1:576364280889:web:a62e6c75a3f9ad47d721e8"
};
// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App);

app.use(createPinia());
app.use(PrimeVue);
app.use(ToastService);
app.use(router);
app.component('app-menubar', Menubar);
app.component('app-button', Button);
app.component('app-inputtext', InputText);
app.component('app-toast', Toast);
app.component('app-progress', ProgressSpinner);
app.component('app-card', Card);

app.mount('#app');
