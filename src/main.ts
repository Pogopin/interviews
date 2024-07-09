import './assets/main.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { initializeApp } from "firebase/app";
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';

import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import ProgressSpinner from 'primevue/progressspinner';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ConfirmDialog from 'primevue/confirmdialog';
import InlineMessage from 'primevue/inlinemessage';

import Tooltip from 'primevue/tooltip';

import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';
import Radio from 'primevue/radiobutton';
import Badge from 'primevue/badge';

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
app.use(ConfirmationService);
app.use(router);

app.directive('tooltip', Tooltip)
app.component('app-menubar', Menubar);
app.component('app-button', Button);
app.component('app-inputtext', InputText);
app.component('app-toast', Toast);
app.component('app-progress', ProgressSpinner);
app.component('app-card', Card);
app.component('app-datatable', DataTable);
app.component('app-column', Column);
app.component('app-dialog', ConfirmDialog);
app.component('app-message', InlineMessage);

app.component('app-input-number', InputNumber);
app.component('app-textarea', Textarea);
app.component('app-calendar', Calendar);
app.component('app-radio', Radio);
app.component('app-badge', Badge);

app.mount('#app');
