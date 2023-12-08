import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-green/theme.css'
import 'primeicons/primeicons.css'

import MegaMenu from 'primevue/megamenu';
import Toast from 'primevue/toast';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext'
import Password from 'primevue/password';
import TreeTable from 'primevue/treetable';
import Column from 'primevue/column';
import ToastService from 'primevue/toastservice';
import VueAxios from "vue-axios";
import axios from "axios";
import ApiService from "@/core/service/ApiService";


const app = createApp(App)

app.use(ToastService)
app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(VueAxios, axios);

app.component('MegaMenu', MegaMenu)
    .component('Toast', Toast)
    .component('Dialog', Dialog)
    .component('Button', Button)
    .component('InputText', InputText)
    .component('Password', Password)
    .component('TreeTable', TreeTable)
    .component('Column', Column);

ApiService.init(app)

app.mount('#app')
